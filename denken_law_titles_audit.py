"""denken-wiki kijun/*.md の H1 タイトルが省令の条見出しと一致するかを検証する。

事故記録：2026-05-03 旧 20.md の H1 が「第20条 発電所等への取扱者以外の者の立入の防止」
だったが、本来の第20条は「電線路等の感電又は火災の防止」。条文番号と内容の不一致が
三段監修の数値照合だけでは検出できなかった。

denken-hoki-style.md §7.3 R6「条文番号・タイトル・本文の三点照合」の機械化版。

使い方：
  python denken_law_titles_audit.py                  # 全 kijun/*.md スキャン
  python denken_law_titles_audit.py --strict         # MISMATCH があれば exit 2（CI用）
  python denken_law_titles_audit.py --json           # JSON出力
  python denken_law_titles_audit.py --refresh        # e-Gov XML を再取得（キャッシュ無視）

データソース：
  - 電気設備に関する技術基準を定める省令（lawid=409M50000400052）
  - e-Gov 法令検索 API: https://laws.e-gov.go.jp/api/1/lawdata/{lawid}
  - キャッシュ: ./refs/egov-409M50000400052.xml（再取得は --refresh）

出力凡例：
  ✅ H1 の条見出しが公式と一致
  ❌ H1 の条見出しが公式と不一致 → 条文番号 or タイトルの誤り
  ⚠️  記事の条文番号が省令に存在しない → 解釈条文 or 別法令の可能性
"""

from __future__ import annotations

import json
import re
import sys
import urllib.request
from dataclasses import dataclass, asdict
from pathlib import Path

WIKI_KIJUN = Path(r"C:\Users\kfuru\Projects\denken-wiki\docs\articles\kijun")
CACHE_PATH = Path(__file__).parent / "refs" / "egov-409M50000400052.xml"
EGOV_URL = "https://laws.e-gov.go.jp/api/1/lawdata/409M50000400052"

KANSUJI = {
    "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10,
}


def kanji_to_int(s: str) -> int | None:
    """漢数字（一〜百）→ int。「二十」「二十一」「百」等に対応。"""
    if not s:
        return None
    if s == "百":
        return 100
    n = 0
    if "十" in s:
        head, _, tail = s.partition("十")
        n = (KANSUJI.get(head, 1) if head else 1) * 10
        if tail:
            n += KANSUJI.get(tail, 0)
        return n
    if len(s) == 1 and s in KANSUJI:
        return KANSUJI[s]
    return None


@dataclass
class Finding:
    file_path: str
    article_num: int | None
    h1_title: str
    expected_title: str | None
    status: str  # OK / MISMATCH / NOT_IN_SHOREI / NO_H1
    section2_present: bool = False  # §2.1 必須セクション「条文原文」の存在


def fetch_egov_xml(refresh: bool = False) -> str:
    """e-Gov 法令検索 API から省令 XML を取得（キャッシュあり）"""
    if not refresh and CACHE_PATH.exists():
        return CACHE_PATH.read_text(encoding="utf-8")
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(EGOV_URL, timeout=20) as resp:
        xml = resp.read().decode("utf-8")
    CACHE_PATH.write_text(xml, encoding="utf-8")
    return xml


def parse_egov_articles(xml: str) -> dict[int, str]:
    """XML から {条番号 (int): 条見出し (str)} を抽出。

    ArticleTitle の漢数字（第二十条）と ArticleCaption（電線路等の感電又は火災の防止）をペアで取る。
    枝番（第十五条の二）は無視。
    """
    article_pattern = re.compile(
        r"<Article\s[^>]*Num=\"(\d+)\"[^>]*>\s*"
        r"<ArticleCaption>（([^）]+)）</ArticleCaption>",
        re.DOTALL,
    )
    result: dict[int, str] = {}
    for m in article_pattern.finditer(xml):
        num = int(m.group(1))
        caption = m.group(2).strip()
        if num not in result:  # 重複時は先勝ち
            result[num] = caption
    return result


H1_PATTERN = re.compile(
    r"^#\s*(?:電気設備技術基準|電技省令)\s*第([一二三四五六七八九十百〇\d]+)条\s*[—\-]\s*(.+?)\s*$",
    re.MULTILINE,
)


def parse_h1(text: str) -> tuple[int | None, str | None]:
    """記事の H1 から条番号と見出しを抽出"""
    m = H1_PATTERN.search(text)
    if not m:
        return None, None
    num_str = m.group(1)
    title = m.group(2).strip()
    if num_str.isdigit():
        num = int(num_str)
    else:
        num = kanji_to_int(num_str)
    return num, title


def normalize_title(s: str) -> str:
    """全角空白・記号を統一して比較用にする"""
    s = s.strip()
    s = s.replace("　", "")
    s = s.replace(" ", "")
    return s


SECTION2_PATTERN = re.compile(
    r"^##\s+.*条文原文",
    re.MULTILINE,
)


def has_section2(text: str) -> bool:
    """記事内に section 2「条文原文」（## 📜 条文原文 / ## 2. 条文原文 等）が存在するか。

    denken-hoki-style.md §2.1 で全タイプ必須セクション。2026-05-03 監査で
    11/21記事に欠落していた事故の再発防止用。
    """
    return bool(SECTION2_PATTERN.search(text))


def audit_file(path: Path, official_map: dict[int, str]) -> Finding:
    text = path.read_text(encoding="utf-8")
    rel = str(path.relative_to(WIKI_KIJUN.parent))
    num, h1_title = parse_h1(text)
    sec2 = has_section2(text)

    if num is None or h1_title is None:
        return Finding(
            file_path=rel,
            article_num=num,
            h1_title=h1_title or "",
            expected_title=None,
            status="NO_H1",
            section2_present=sec2,
        )

    expected = official_map.get(num)
    if expected is None:
        return Finding(
            file_path=rel,
            article_num=num,
            h1_title=h1_title,
            expected_title=None,
            status="NOT_IN_SHOREI",
            section2_present=sec2,
        )

    if normalize_title(h1_title) == normalize_title(expected):
        return Finding(
            file_path=rel,
            article_num=num,
            h1_title=h1_title,
            expected_title=expected,
            status="OK",
            section2_present=sec2,
        )
    return Finding(
        file_path=rel,
        article_num=num,
        h1_title=h1_title,
        expected_title=expected,
        status="MISMATCH",
        section2_present=sec2,
    )


def format_human(findings: list[Finding]) -> str:
    out = []
    counts = {"OK": 0, "MISMATCH": 0, "NOT_IN_SHOREI": 0, "NO_H1": 0}
    section2_missing = 0
    for f in findings:
        counts[f.status] = counts.get(f.status, 0) + 1
        sec2_marker = "" if f.section2_present else " [§2欠落]"
        if not f.section2_present:
            section2_missing += 1
        if f.status == "OK":
            out.append(f"  [OK]{sec2_marker} {f.file_path} 第{f.article_num}条 {f.h1_title}")
        elif f.status == "MISMATCH":
            out.append(
                f"  [NG]{sec2_marker} {f.file_path} 第{f.article_num}条\n"
                f"        H1: {f.h1_title}\n"
                f"        正: {f.expected_title}"
            )
        elif f.status == "NOT_IN_SHOREI":
            out.append(
                f"  [WARN]{sec2_marker} {f.file_path} 第{f.article_num}条 は省令に存在しない（解釈 or 別法令の可能性）"
            )
        elif f.status == "NO_H1":
            out.append(f"  [SKIP]{sec2_marker} {f.file_path} H1 パース失敗")
    out.append("\n=== Summary ===")
    out.append(f"  OK: {counts['OK']}")
    out.append(f"  MISMATCH: {counts['MISMATCH']}")
    out.append(f"  NOT_IN_SHOREI: {counts['NOT_IN_SHOREI']}")
    out.append(f"  NO_H1: {counts['NO_H1']}")
    out.append(f"  §2 条文原文 欠落: {section2_missing}（denken-hoki-style.md §2.1 違反）")
    return "\n".join(out)


def main(argv: list[str]) -> int:
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except AttributeError:
            pass

    output_json = "--json" in argv
    strict = "--strict" in argv
    refresh = "--refresh" in argv

    xml = fetch_egov_xml(refresh=refresh)
    official_map = parse_egov_articles(xml)
    if not official_map:
        print("[ERROR] e-Gov XML から条見出しを抽出できませんでした", file=sys.stderr)
        return 3

    files = sorted(p for p in WIKI_KIJUN.glob("*.md") if p.name != "index.md")
    findings = [audit_file(f, official_map) for f in files]

    if output_json:
        print(json.dumps([asdict(f) for f in findings], ensure_ascii=False, indent=2))
    else:
        print(format_human(findings))

    if strict:
        mismatch = sum(1 for f in findings if f.status == "MISMATCH")
        section2_missing = sum(1 for f in findings if not f.section2_present)
        if mismatch > 0 or section2_missing > 0:
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
