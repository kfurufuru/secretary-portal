#!/usr/bin/env python3
"""
denken_hoki_audit.py - denken-hoki-wiki.html 静的品質監査

3名査読（不動・江間・早川）の機械チェック可能項目を自動化。
50kトークンの再査読セッション → 0トークン（Python実行）に置換。

Usage:
    python denken_hoki_audit.py                  # 全ページ監査
    python denken_hoki_audit.py SetsuchiIchiran  # 特定ページのみ
    python denken_hoki_audit.py --strict         # WARNもFAIL扱い
    python denken_hoki_audit.py --quiet          # SUMMARYのみ
"""
from __future__ import annotations
import re
import sys
import io
from pathlib import Path
from collections import defaultdict

# Windows cp932 対策: stdout/stderr を UTF-8 化
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

WIKI_PATH = Path(__file__).parent / "denken-hoki-wiki.html"

# 監査対象ページ（実装済み・StubPage除外）
TARGET_PAGES = [
    "KojiShiHoPage",
    "SetsuchiIchiranPage",
    "ZetsuenIchiranPage",
    "RikkakuIchiranPage",
    "DenAtsuKubunPage",
]

# ページ固有の特殊チェック
SPECIAL_CHECKS = {
    "ZetsuenIchiranPage": [
        (
            "0.64倍 導出根拠ボックス",
            lambda body: "なぜ 0.64倍" in body and "1.1 × (1/√3)" in body,
            "B問題対策。中性点直接接地→相電圧抑制→1.1×(1/√3)の導出が必須",
        ),
    ],
    "SetsuchiIchiranPage": [
        (
            "B種 150/Ig の例外説明",
            lambda body: "300/Ig" in body or "1秒以内" in body,
            "1秒以内自動遮断時に 300/Ig に緩和される旨の記載",
        ),
    ],
}

ANSI = {
    "r": "\033[31m", "g": "\033[32m", "y": "\033[33m",
    "c": "\033[36m", "b": "\033[1m", "0": "\033[0m",
}


def extract_page_body(text: str, page_name: str) -> str | None:
    """function NAME(...) { ... } の本体を抽出（次のfunction定義 or '// ─' セパレータまで）。"""
    m = re.search(rf"function {page_name}\s*\(.*?\)\s*\{{", text)
    if not m:
        return None
    rest = text[m.end():]
    end_m = re.search(r"\n(?://\s*─|function )", rest)
    end = m.end() + (end_m.start() if end_m else len(rest))
    return text[m.start():end]


def audit_page(name: str, body: str) -> list[tuple[str, str, str]]:
    """Returns [(severity, check_name, message)]. severity ∈ {PASS, WARN, FAIL}."""
    results = []

    # ── A. 構造チェック（早川: 教育明瞭性） ──
    if 'id="overview"' in body:
        results.append(("PASS", "section 1 全体像", "存在"))
    else:
        results.append(("FAIL", "section 1 全体像",
                       '<h2 id="overview"> がない（denken-hoki-style.md §2.1）'))

    if 'id="terms"' in body:
        results.append(("PASS", "section 4 法規特有表現", "存在"))
    else:
        results.append(("FAIL", "section 4 法規特有表現",
                       '<h2 id="terms"> がない（denken-hoki-style.md §3）'))

    # ── B. 視覚要素チェック（早川） ──
    svg_count = body.count("<HoukiOverviewSvg")
    if svg_count >= 1:
        results.append(("PASS", "全体像SVG", f"HoukiOverviewSvg × {svg_count}"))
    else:
        results.append(("FAIL", "全体像SVG", "section 1 にSVGがない"))

    # ── C. 出典行カバレッジ（江間: 公式ソース原理主義） ──
    mem_tables = re.findall(r"<MemTable\b.*?(?:/>|</MemTable>)", body, re.DOTALL)
    if not mem_tables:
        results.append(("WARN", "MemTable", "MemTableが1つもない"))
    else:
        no_source = [t for t in mem_tables if "source=" not in t]
        if no_source:
            results.append(("FAIL", "出典行カバレッジ",
                           f"{len(no_source)}/{len(mem_tables)} MemTableに source prop なし（56.md事故再発防止）"))
        else:
            results.append(("PASS", "出典行カバレッジ",
                           f"全 {len(mem_tables)} MemTable に source prop あり"))

    # ── D. 版数表記チェック（江間） ──
    sources = re.findall(r'source="([^"]+)"', body)
    bad = [s for s in sources if not re.search(r"令和[\d元]+年", s)]
    if sources and bad:
        results.append(("FAIL", "版数表記",
                       f"{len(bad)}/{len(sources)} source に「令和N年」表記なし: {bad[0][:50]}..."))
    elif sources:
        results.append(("PASS", "版数表記",
                       f"全 {len(sources)} source に版数記載あり"))

    # ── E. 数値単位チェック（不動: 物理整合） ──
    tables_text = " ".join(mem_tables)
    UNITS = ["A", "MΩ", "Ω", "V", "kV", "m", "倍", "分", "mm", "kW"]
    units_found = [u for u in UNITS if u in tables_text]
    if len(units_found) < 2:
        results.append(("WARN", "数値単位",
                       f"単位 {len(units_found)} 種類のみ（≥2推奨）: {units_found}"))
    else:
        results.append(("PASS", "数値単位",
                       f"{len(units_found)} 種類: {units_found}"))

    # ── F. § 記号禁止（CLAUDE.md HTMLコーディングルール） ──
    if "§" in body:
        cnt = body.count("§")
        results.append(("FAIL", "§ 記号", f"§ × {cnt} 検出（文字化け原因）"))
    else:
        results.append(("PASS", "§ 記号", "なし"))

    # ── G. [要確認] フラグ残存（江間: 断言形式チェック） ──
    fix_count = body.count("[要確認]")
    if fix_count > 0:
        results.append(("WARN", "[要確認] フラグ",
                       f"{fix_count} 件残存（公式照合してフラグ除去推奨）"))
    else:
        results.append(("PASS", "[要確認] フラグ", "0件（全数値が断言形式）"))

    # ── H. section 1 関係表（早川: Paivio二重符号化） ──
    overview_match = re.search(r'id="overview".*?(?=<h2\b|$)', body, re.DOTALL)
    if overview_match:
        sec = overview_match.group()
        if "<MemTable" in sec:
            results.append(("PASS", "全体像 関係表", "SVGと表のセット運用OK"))
        else:
            results.append(("FAIL", "全体像 関係表",
                           "section 1 にMemTableなし（denken-hoki-style.md §2.1.3違反）"))

    # ── I. section 4 が3列表か（早川） ──
    terms_match = re.search(r'id="terms".*?(?=<h2\b|$)', body, re.DOTALL)
    if terms_match:
        sec = terms_match.group()
        # headers prop 内の項目数を数える
        h_match = re.search(r'headers=\{?\[([^\]]+)\]', sec)
        if h_match:
            n_cols = len(re.findall(r'"[^"]+"', h_match.group(1)))
            if n_cols >= 3:
                results.append(("PASS", "法規特有表現 列数", f"{n_cols}列（≥3OK）"))
            else:
                results.append(("FAIL", "法規特有表現 列数",
                               f"{n_cols}列（denken-hoki-style.md §3 ブロックA: 日常語/法規表現/試験での意味の3列必須）"))

    # ── J. ページ固有の特殊チェック ──
    for check_name, check_fn, hint in SPECIAL_CHECKS.get(name, []):
        if check_fn(body):
            results.append(("PASS", f"特殊:{check_name}", "OK"))
        else:
            results.append(("FAIL", f"特殊:{check_name}", hint))

    return results


def main() -> None:
    args = sys.argv[1:]
    strict = "--strict" in args
    quiet = "--quiet" in args
    args = [a for a in args if not a.startswith("--")]

    targets = TARGET_PAGES
    if args:
        targets = [a if a.endswith("Page") else a + "Page" for a in args]

    if not WIKI_PATH.exists():
        print(f"ERROR: {WIKI_PATH} not found")
        sys.exit(2)

    text = WIKI_PATH.read_text(encoding="utf-8")
    overall_pass = True
    summary: dict[str, dict[str, int]] = defaultdict(
        lambda: {"PASS": 0, "WARN": 0, "FAIL": 0}
    )

    for page in targets:
        body = extract_page_body(text, page)
        if body is None:
            print(f"{ANSI['r']}✗ {page}: function not found{ANSI['0']}")
            overall_pass = False
            continue

        if not quiet:
            print(f"\n{ANSI['c']}{ANSI['b']}━━━ {page} ━━━{ANSI['0']}")
        results = audit_page(page, body)
        for sev, check, msg in results:
            summary[page][sev] += 1
            if sev == "FAIL" or (strict and sev == "WARN"):
                overall_pass = False
            if not quiet:
                mark = {"PASS": f"{ANSI['g']}✓", "WARN": f"{ANSI['y']}⚠",
                        "FAIL": f"{ANSI['r']}✗"}[sev]
                print(f"  {mark} [{check}] {msg}{ANSI['0']}")

    # Summary
    print(f"\n{ANSI['c']}{ANSI['b']}━━━ SUMMARY ━━━{ANSI['0']}")
    for page, counts in summary.items():
        parts = []
        if counts["FAIL"]:
            parts.append(f"{ANSI['r']}{counts['FAIL']} FAIL{ANSI['0']}")
        if counts["WARN"]:
            parts.append(f"{ANSI['y']}{counts['WARN']} WARN{ANSI['0']}")
        parts.append(f"{ANSI['g']}{counts['PASS']} PASS{ANSI['0']}")
        print(f"  {page}: " + ", ".join(parts))

    print()
    if overall_pass:
        print(f"{ANSI['g']}{ANSI['b']}✓ All checks passed{ANSI['0']}")
        sys.exit(0)
    else:
        print(f"{ANSI['r']}{ANSI['b']}✗ Some checks failed{ANSI['0']}")
        sys.exit(1)


if __name__ == "__main__":
    main()
