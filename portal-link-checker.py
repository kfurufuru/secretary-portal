#!/usr/bin/env python3
"""
portal-link-checker.py
ポータル (portal-v2.html) のリンクを自動検査し、結果を
health-monitor/link-check-results.json に書き出す。

検査内容:
  - ローカル相対パスの存在確認
  - 重複 URL 検出
  - 孤立ローカル HTML（portal 未掲載）の検出
"""

import json
import os
import re
from collections import Counter
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).parent
PORTAL   = BASE_DIR / "portal-v2.html"
OUT_DIR  = BASE_DIR / "health-monitor"
OUT_FILE = OUT_DIR / "link-check-results.json"

# ローカル HTML として存在を確認すべき拡張子
LOCAL_EXTS = {".html", ".json", ".md"}

# 意図的に除外するパス（動的生成・worktree等）
SKIP_PATTERNS = [".claude/", "worktrees/", "#", "javascript:"]


def extract_hrefs(html: str) -> list[str]:
    return re.findall(r'href=["\']([^"\']+)["\']', html)


def is_local(href: str) -> bool:
    return not href.startswith(("http://", "https://", "//", "mailto:"))


def check_local(href: str) -> bool:
    # anchor-only や動的パスは除外
    if href.startswith("#") or href == "javascript:void(0)":
        return True
    path = BASE_DIR / href
    return path.exists()


def scan_orphan_htmls(all_hrefs: list[str]) -> list[str]:
    """BASE_DIR 直下の .html で portal に掲載されていないもの"""
    local_hrefs = {h.lstrip("./") for h in all_hrefs if is_local(h)}
    orphans = []
    for f in BASE_DIR.glob("*.html"):
        rel = f.name
        if rel == "portal-v2.html":
            continue
        if rel not in local_hrefs:
            orphans.append(rel)
    return sorted(orphans)


def main():
    if not PORTAL.exists():
        print(f"ERROR: {PORTAL} が見つかりません")
        return

    html = PORTAL.read_text(encoding="utf-8")
    hrefs = extract_hrefs(html)

    results = {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "broken": 0,
        "warnings": 0,
        "broken_links": [],
        "duplicate_links": [],
        "orphan_htmls": [],
        "summary": "",
    }

    # --- 重複 URL ---
    counts = Counter(hrefs)
    dups = [{"url": url, "count": cnt} for url, cnt in counts.items() if cnt > 1 and url != "#"]
    results["duplicate_links"] = dups
    if dups:
        results["warnings"] += len(dups)

    # --- ローカルリンク存在確認 ---
    broken = []
    for href in hrefs:
        if any(p in href for p in SKIP_PATTERNS):
            continue
        if not is_local(href):
            continue
        if not check_local(href):
            broken.append(href)

    results["broken_links"] = sorted(set(broken))
    results["broken"] = len(results["broken_links"])

    # --- 孤立 HTML ---
    orphans = scan_orphan_htmls(hrefs)
    results["orphan_htmls"] = orphans
    if orphans:
        results["warnings"] += len(orphans)

    # --- サマリ ---
    parts = []
    if results["broken"] > 0:
        parts.append(f"❌ 壊れたリンク {results['broken']}件")
    if dups:
        parts.append(f"⚠️ 重複 {len(dups)}件")
    if orphans:
        parts.append(f"📂 孤立HTML {len(orphans)}件")
    if not parts:
        parts.append("✅ 異常なし")
    results["summary"] = " / ".join(parts)

    OUT_DIR.mkdir(exist_ok=True)
    OUT_FILE.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")

    import sys
    err = sys.stderr
    err.write(f"[portal-link-checker] {results['summary']}\n")
    err.write(f"  -> {OUT_FILE}\n")
    if results["broken_links"]:
        err.write("\nBROKEN:\n")
        for l in results["broken_links"]:
            err.write(f"  NG {l}\n")
    if dups:
        err.write("\nDUPLICATES:\n")
        for d in dups:
            err.write(f"  DUP {d['url']} ({d['count']})\n")
    if orphans:
        err.write("\nORPHANS (portal未掲載):\n")
        for o in orphans:
            err.write(f"  {o}\n")


if __name__ == "__main__":
    main()
