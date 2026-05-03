#!/usr/bin/env python3
"""
denken_hoki_link_check.py - denken-hoki-wiki.html の ext: フィールド死活確認

Phase 3 P1 - 試験前必須スクリプト。
mkdocs本サイト（kfurufuru.github.io/denken-wiki/）のslug変更で
Hubの誘導リンクが死ぬのを週次検出する。

Usage:
    python scripts/denken_hoki_link_check.py             # 全ext: チェック
    python scripts/denken_hoki_link_check.py --quiet     # SUMMARYのみ
    python scripts/denken_hoki_link_check.py --no-write  # レポート書き出さない
    python scripts/denken_hoki_link_check.py --timeout 10 # HEADリクエストタイムアウト

Output:
    stdout: PASS/FAIL/WARN per ext URL
    file: inbox/link-check-YYYY-MM-DD.md（FAILがあれば）
    exit: 0=全PASS / 1=FAIL有 / 2=エラー
"""
from __future__ import annotations
import argparse
import io
import re
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import datetime
from pathlib import Path

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
WIKI = ROOT / "denken-hoki-wiki.html"
INBOX = ROOT / "inbox"
DEFAULT_BASE = "https://kfurufuru.github.io/denken-wiki/"
USER_AGENT = "denken-hoki-link-check/1.0 (+kfurufuru/secretary-portal)"

ANSI = {
    "r": "\033[31m", "g": "\033[32m", "y": "\033[33m",
    "c": "\033[36m", "b": "\033[1m", "0": "\033[0m",
}


def extract_exts(text: str) -> list[tuple[str, str]]:
    """ext: "..." または ext: '...' を抽出して (page_id, ext) を返す。
    ページ id とのマッピングは、ext と同じ行/近傍の id: または pageId: から推定。"""
    results = []
    # WIKI_DATA 内: { id:"setsuchi-ichiran", ..., ext:"themes/..." }
    for m in re.finditer(
        r'\{\s*id:\s*["\']([^"\']+)["\'][^}]*?ext:\s*["\']([^"\']+)["\']',
        text,
    ):
        results.append((m.group(1), m.group(2)))
    # HOT_TOPICS 内: { ..., pageId: 'xxx', ..., ext: 'themes/...' }
    for m in re.finditer(
        r'\{[^}]*?pageId:\s*["\']([^"\']+)["\'][^}]*?ext:\s*["\']([^"\']+)["\']',
        text,
    ):
        results.append((m.group(1), m.group(2)))
    # ext のみ抽出（id 不明なケースのフォールバック）
    all_exts = set(re.findall(r'ext:\s*["\']([^"\']+)["\']', text))
    captured = {ext for _, ext in results}
    for ext in all_exts - captured:
        results.append(("?unknown?", ext))
    return results


def head_check(url: str, timeout: int = 10) -> tuple[int, str]:
    """HEAD（失敗時 GET）で URL の生死確認。(status_code, message) を返す。"""
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, "OK"
    except urllib.error.HTTPError as e:
        # HEAD 拒否のサイトは GET で再試行
        if e.code in (405, 501):
            try:
                req_get = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
                with urllib.request.urlopen(req_get, timeout=timeout) as r:
                    return r.status, "OK (GET fallback)"
            except urllib.error.HTTPError as e2:
                return e2.code, str(e2)
            except Exception as e2:
                return -1, str(e2)
        return e.code, str(e)
    except urllib.error.URLError as e:
        return -1, str(e.reason)
    except Exception as e:
        return -1, str(e)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--quiet", action="store_true", help="SUMMARY のみ出力")
    parser.add_argument("--no-write", action="store_true", help="レポートファイル書き出さない")
    parser.add_argument("--timeout", type=int, default=10, help="HEADリクエストtimeout (sec)")
    parser.add_argument("--base", default=DEFAULT_BASE, help="MKDOCS BASE URL")
    args = parser.parse_args()

    if not WIKI.exists():
        print(f"ERROR: {WIKI} not found")
        sys.exit(2)

    text = WIKI.read_text(encoding="utf-8")
    pairs = extract_exts(text)

    # ext を一意化（同じ ext が複数 page から参照されることがある）
    by_ext: dict[str, list[str]] = defaultdict(list)
    for pid, ext in pairs:
        by_ext[ext].append(pid)

    if not by_ext:
        print(f"{ANSI['y']}⚠ ext: フィールドが見つかりませんでした{ANSI['0']}")
        sys.exit(0)

    print(f"{ANSI['c']}{ANSI['b']}━━━ denken-hoki ext: link check ━━━{ANSI['0']}")
    print(f"対象: {len(by_ext)} 個のユニーク ext URL")
    print(f"BASE: {args.base}")
    print()

    results: list[tuple[str, str, str, int, str, list[str]]] = []
    # severity, ext, url, status, msg, page_ids
    for i, (ext, pids) in enumerate(sorted(by_ext.items()), 1):
        url = args.base.rstrip("/") + "/" + ext.lstrip("/")
        status, msg = head_check(url, timeout=args.timeout)
        if status == 200:
            sev = "PASS"
            color = ANSI["g"]; mark = "✓"
        elif status in (301, 302, 303, 307, 308):
            sev = "WARN"
            color = ANSI["y"]; mark = "→"
        elif status == 404:
            sev = "FAIL"
            color = ANSI["r"]; mark = "✗"
        elif status == -1:
            sev = "FAIL"
            color = ANSI["r"]; mark = "✗"
        else:
            sev = "WARN"
            color = ANSI["y"]; mark = "?"

        if not args.quiet:
            print(f"{color}{mark} [{status}] {ext}{ANSI['0']}")
            if sev != "PASS":
                print(f"   pages: {pids}")
                print(f"   url: {url}")
                print(f"   msg: {msg[:80]}")

        results.append((sev, ext, url, status, msg, pids))

    # SUMMARY
    counts = defaultdict(int)
    for sev, *_ in results:
        counts[sev] += 1

    print(f"\n{ANSI['c']}{ANSI['b']}━━━ SUMMARY ━━━{ANSI['0']}")
    parts = []
    if counts["FAIL"]:
        parts.append(f"{ANSI['r']}{counts['FAIL']} FAIL{ANSI['0']}")
    if counts["WARN"]:
        parts.append(f"{ANSI['y']}{counts['WARN']} WARN{ANSI['0']}")
    parts.append(f"{ANSI['g']}{counts['PASS']} PASS{ANSI['0']}")
    print(f"  total {len(results)} URL: " + ", ".join(parts))

    # レポート書き出し（FAILがあれば）
    has_fail = counts["FAIL"] > 0
    has_warn = counts["WARN"] > 0
    if (has_fail or has_warn) and not args.no_write:
        date = datetime.now().strftime("%Y-%m-%d")
        report_path = INBOX / f"link-check-{date}.md"
        INBOX.mkdir(exist_ok=True)
        with report_path.open("w", encoding="utf-8") as f:
            f.write(f"# denken-hoki link check report - {date}\n\n")
            f.write(f"**対象**: `denken-hoki-wiki.html` の ext: フィールド\n")
            f.write(f"**BASE**: {args.base}\n")
            f.write(f"**結果**: total {len(results)} URL")
            if counts["FAIL"]:
                f.write(f" / **{counts['FAIL']} FAIL**")
            if counts["WARN"]:
                f.write(f" / {counts['WARN']} WARN")
            f.write(f" / {counts['PASS']} PASS\n\n")
            if has_fail:
                f.write("## FAIL（要対応）\n\n")
                f.write("| status | ext | URL | 影響pages |\n|---|---|---|---|\n")
                for sev, ext, url, status, msg, pids in results:
                    if sev == "FAIL":
                        f.write(f"| {status} | `{ext}` | {url} | {', '.join(pids)} |\n")
                f.write("\n")
            if has_warn:
                f.write("## WARN（リダイレクト等）\n\n")
                f.write("| status | ext | URL | 影響pages |\n|---|---|---|---|\n")
                for sev, ext, url, status, msg, pids in results:
                    if sev == "WARN":
                        f.write(f"| {status} | `{ext}` | {url} | {', '.join(pids)} |\n")
                f.write("\n")
            f.write(f"\n_Generated by `scripts/denken_hoki_link_check.py` at {datetime.now().isoformat(timespec='seconds')}_\n")
        print(f"\n{ANSI['y']}📄 レポート: {report_path.relative_to(ROOT)}{ANSI['0']}")

    sys.exit(1 if has_fail else 0)


if __name__ == "__main__":
    main()
