#!/usr/bin/env python3
"""hoki_check.py — denken-hoki-wiki（React SPA）品質チェッカ

検出項目:
  [id]  hoki-data.js の page.id ↔ renderPage case ↔ function 定義の三項整合
  [cta] DenkenWikiCTA url の参照先（denken-wiki 側 .md / themes/ ディレクトリ）が存在するか
  [tag] MetaStrip tags の「電技解釈第X条」「電技省令第X条」「事業法§X」等の条番号と
        同ページ本文で実際に言及されている条番号の整合（tags にあって本文ゼロ → 過剰）
  [yr]  targets="..." 句の年度トークン（R07/R06下/H29 等）が kakomon.yml にエントリ
        として存在するか（厳密な主題マッチではなく「その年度が法規DBに登録されているか」）

Usage:
  python hoki_check.py                              # 既定: hoki-pages.jsx + hoki-data.js
  python hoki_check.py --jsx hoki-pages.jsx --data hoki-data.js
  python hoki_check.py --kakomon /path/to/kakomon.yml
  python hoki_check.py --skip cta                   # 特定チェックをスキップ
  python hoki_check.py --only id,tag                # 特定チェックだけ実行

Exit code: 0=OK, 1=issues found
"""
import argparse
import io
import re
import sys
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# ─────────────────────────────────────────────
# パス既定値
# ─────────────────────────────────────────────
BASE = Path(__file__).resolve().parent
DEFAULT_JSX = BASE / "hoki-pages.jsx"
DEFAULT_DATA = BASE / "hoki-data.js"
DEFAULT_DENKEN_WIKI = Path("C:/Users/kfuru/Projects/denken-wiki")
DEFAULT_KAKOMON = DEFAULT_DENKEN_WIKI / "_data" / "kakomon.yml"

# ─────────────────────────────────────────────
# パターン定義
# ─────────────────────────────────────────────
# hoki-data.js: { id:"xxx-yyy", num:"...", title:"..." } の id 抽出
DATA_ID_PATTERN = re.compile(r"\bid\s*:\s*[\"']([a-z0-9][a-z0-9-]*)[\"']")

# renderPage 内: case 'xxx-yyy':
CASE_PATTERN = re.compile(r"case\s+[\"']([a-z0-9][a-z0-9-]*)[\"']\s*:")

# return React.createElement(SomePage, ...) または ({...}) で参照される関数名
COMP_REF_PATTERN = re.compile(
    r"React\.createElement\(\s*([A-Z][A-Za-z0-9_]*)\b"
)

# 関数定義: function FooPage({ ... }) ... または const FooPage = (...) => ...
FUNC_DEF_PATTERN = re.compile(
    r"(?:function\s+([A-Z][A-Za-z0-9_]*)\s*\(|const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*\(?[^=]{0,40}=>)"
)

# DenkenWikiCTA の url 属性
CTA_URL_PATTERN = re.compile(
    r'<DenkenWikiCTA[^>]*?\burl\s*=\s*[\"\']([^\"\']+)[\"\']',
    re.DOTALL,
)

# MetaStrip 内の tags={[...]} 配列の中身
METASTRIP_TAGS_PATTERN = re.compile(
    r"<MetaStrip[^>]*?\btags\s*=\s*\{\s*\[(.*?)\]\s*\}",
    re.DOTALL,
)

# tags 内の条文番号らしき文字列（「第227条」「第220条〜第231条」「§43」等を許容）
ARTICLE_REF_IN_TAGS = re.compile(
    r"第(\d+)条(?:第(\d+)項)?(?:〜第(\d+)条)?"
)

# 本文中の条文番号引用（緩めに）
ARTICLE_REF_IN_BODY = re.compile(r"第(\d+)条")

# targets="..." 属性
TARGETS_ATTR_PATTERN = re.compile(
    r'\btargets\s*=\s*[\"\']([^\"\']+)[\"\']'
)

# 年度トークン: R07/R06上/R05下/H29 等
YEAR_TOKEN_PATTERN = re.compile(r"(R0?[1-9]|R1[0-9]|H0?[1-9]|H[12][0-9]|H3[01])(上|下)?")

# ページ関数の境界（function XxxPage(... から次の function YyyPage(... 直前まで）
PAGE_FUNC_START = re.compile(
    r"^\s*function\s+([A-Z][A-Za-z0-9_]*Page)\s*\(",
    re.MULTILINE,
)


# ─────────────────────────────────────────────
# パース補助
# ─────────────────────────────────────────────
def parse_data_ids(data_text: str) -> set:
    """hoki-data.js から page id を全抽出。chapter id (sec00 等) も入るが無害。"""
    return set(DATA_ID_PATTERN.findall(data_text))


def parse_render_cases(jsx_text: str) -> dict:
    """renderPage 関数の case → component 名 を抽出。
    戻り値: { 'top': 'HomePage', 'koji-shi-ho': 'KojiShiHoPage', ... }
    """
    # renderPage の関数ブロックを切り出す（次の最上位 function 定義まで）
    start = jsx_text.find("window.renderPage")
    if start < 0:
        return {}
    # 次の `^function ` または末尾まで
    rest = jsx_text[start:]
    m = re.search(r"\n//\s*─", rest)
    block = rest[: m.start()] if m else rest[:8000]
    cases = {}
    pos = 0
    while True:
        cm = CASE_PATTERN.search(block, pos)
        if not cm:
            break
        case_id = cm.group(1)
        # 続く createElement の最初の引数を取得
        after = block[cm.end() : cm.end() + 400]
        rm = COMP_REF_PATTERN.search(after)
        if rm:
            cases[case_id] = rm.group(1)
        pos = cm.end()
    return cases


def parse_function_defs(jsx_text: str) -> set:
    """JSX 内で定義されている PascalCase 関数名（コンポーネント名）を抽出"""
    names = set()
    for m in FUNC_DEF_PATTERN.finditer(jsx_text):
        n = m.group(1) or m.group(2)
        if n:
            names.add(n)
    return names


def slice_page_blocks(jsx_text: str) -> list:
    """各 XxxPage 関数のソース範囲を切り出す。
    戻り値: [(name, start_line, end_line, body_text), ...]
    """
    matches = list(PAGE_FUNC_START.finditer(jsx_text))
    blocks = []
    for i, m in enumerate(matches):
        name = m.group(1)
        start = m.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(jsx_text)
        body = jsx_text[start:end]
        start_line = jsx_text.count("\n", 0, start) + 1
        end_line = start_line + body.count("\n")
        blocks.append((name, start_line, end_line, body))
    return blocks


def line_of(jsx_text: str, char_index: int) -> int:
    return jsx_text.count("\n", 0, char_index) + 1


# ─────────────────────────────────────────────
# Check 1: page id ↔ function 整合
# ─────────────────────────────────────────────
def check_id_function(data_text: str, jsx_text: str) -> list:
    issues = []
    data_ids = parse_data_ids(data_text)
    case_map = parse_render_cases(jsx_text)
    func_defs = parse_function_defs(jsx_text)

    # data_ids には chapter id (sec00..) も混入するので明示除外
    page_ids = {i for i in data_ids if not i.startswith("sec")}

    case_ids = set(case_map.keys())

    # data にあって case にない（renderPage 未登録）
    for pid in sorted(page_ids - case_ids):
        issues.append(("id", 0, f"page id '{pid}' は hoki-data.js にあるが renderPage の case に未登録"))

    # case にあって data にない（孤立 case）
    for cid in sorted(case_ids - page_ids):
        issues.append(("id", 0, f"renderPage case '{cid}' に対応する page id が hoki-data.js に無い"))

    # case が参照する component が JSX 内に存在しない
    for cid, comp in sorted(case_map.items()):
        if comp not in func_defs:
            issues.append(("id", 0, f"renderPage case '{cid}' → {comp}（関数定義が JSX 内に存在しない）"))

    return issues


# ─────────────────────────────────────────────
# Check 2: DenkenWikiCTA URL 存在確認
# ─────────────────────────────────────────────
def check_cta_urls(jsx_text: str, denken_wiki_root: Path) -> list:
    issues = []
    if not denken_wiki_root.exists():
        issues.append(("cta", 0, f"denken-wiki ルートが存在しない: {denken_wiki_root}"))
        return issues

    for m in CTA_URL_PATTERN.finditer(jsx_text):
        url = m.group(1)
        lineno = line_of(jsx_text, m.start())
        # https://kfurufuru.github.io/denken-wiki/<path>/[?query] を docs/<path>.md にマップ
        prefix = "https://kfurufuru.github.io/denken-wiki/"
        if not url.startswith(prefix):
            continue
        path_part = url[len(prefix):]
        # クエリ・フラグメント除去
        path_part = path_part.split("?")[0].split("#")[0].rstrip("/")
        if not path_part:
            continue
        # 候補1: docs/<path>.md
        cand1 = denken_wiki_root / "docs" / (path_part + ".md")
        # 候補2: docs/<path>/index.md
        cand2 = denken_wiki_root / "docs" / path_part / "index.md"
        # 候補3: docs/<path>/ ディレクトリ（テーマページなど）
        cand3 = denken_wiki_root / "docs" / path_part
        if cand1.exists() or cand2.exists() or (cand3.exists() and cand3.is_dir()):
            continue
        issues.append(("cta", lineno, f"DenkenWikiCTA url の参照先が denken-wiki に存在しない: {url}"))

    return issues


# ─────────────────────────────────────────────
# Check 3: MetaStrip tags 条文番号 ↔ 本文整合
# ─────────────────────────────────────────────
def check_tags_consistency(jsx_text: str) -> list:
    issues = []
    blocks = slice_page_blocks(jsx_text)
    for name, start_line, _end_line, body in blocks:
        tm = METASTRIP_TAGS_PATTERN.search(body)
        if not tm:
            continue
        tags_raw = tm.group(1)
        tags_line = start_line + body.count("\n", 0, tm.start())
        # tags 内の条文番号を「明示的単独」と「範囲被覆」に分けて抽出
        explicit_singles = set()  # 明示的に単独で書かれた条番号
        range_covered = set()     # 範囲タグでだけ被覆される条番号
        for am in ARTICLE_REF_IN_TAGS.finditer(tags_raw):
            start = int(am.group(1))
            if am.group(3):  # 範囲タグ: 第X条〜第Y条
                end = int(am.group(3))
                if end - start > 200:
                    end = start + 200
                # 範囲タグでは端点も「範囲被覆」扱い（個別タグとして付けたわけではない）
                for n in range(start, end + 1):
                    range_covered.add(n)
            else:
                explicit_singles.add(start)
        # 端点の二重所属を解消（既に explicit にあるならそちらを優先）
        range_only = range_covered - explicit_singles
        if not explicit_singles and not range_only:
            continue
        # 本文（tags 自身を除外）から条文番号引用を抽出
        body_wo_tags = body[: tm.start()] + body[tm.end():]
        body_articles = {int(m.group(1)) for m in ARTICLE_REF_IN_BODY.finditer(body_wo_tags)}
        # 明示的単独タグで本文に出てこないもの → 過剰タグ警告
        for n in sorted(explicit_singles - body_articles):
            issues.append((
                "tag",
                tags_line,
                f"{name}: tags に明示単独で「第{n}条」あるが本文未言及",
            ))
    return issues


# ─────────────────────────────────────────────
# Check 4: targets= 年度トークン vs kakomon.yml
# ─────────────────────────────────────────────
def parse_kakomon_years(kakomon_path: Path) -> set:
    """kakomon.yml から登録済み year トークンを抽出。重い yaml ライブラリは使わず正規表現。"""
    try:
        text = kakomon_path.read_text(encoding="utf-8")
    except Exception:
        return set()
    years = set()
    for m in re.finditer(r'^\s*-?\s*year:\s*[\"\']?(R0?[1-9]|R1[0-9]|H0?[1-9]|H[12][0-9]|H3[01])(上|下)?[\"\']?',
                        text, re.MULTILINE):
        y = m.group(1) + (m.group(2) or "")
        years.add(y)
        # 上下両方が存在する年度も「上下指定なし」のクエリにヒットさせるため bare 形式も登録
        years.add(m.group(1))
    return years


def _normalize_year_tokens(tok: str) -> list:
    """年度トークンを kakomon.yml 照合用に複数バリアント生成。
    例: 'R5下' → ['R5下', 'R05下', 'R5', 'R05']
        'H30' → ['H30']
    """
    m = re.match(r"^(R|H)(\d{1,2})(上|下)?$", tok)
    if not m:
        return [tok]
    era, num, half = m.group(1), m.group(2), m.group(3) or ""
    padded = f"{era}{int(num):02d}"
    unpadded = f"{era}{int(num)}"
    variants = {tok}
    for base in (padded, unpadded):
        variants.add(base + half)
        variants.add(base)
    return list(variants)


def check_targets_vs_kakomon(jsx_text: str, kakomon_years: set) -> list:
    issues = []
    if not kakomon_years:
        issues.append(("yr", 0, "kakomon.yml から年度を抽出できなかった（パス確認）"))
        return issues
    for m in TARGETS_ATTR_PATTERN.finditer(jsx_text):
        value = m.group(1)
        lineno = line_of(jsx_text, m.start())
        # プレースホルダ・記述文はスキップ
        if value.strip() in {"—", "-"}:
            continue
        if value.startswith("—"):
            continue  # 「—（単独出題なし...）」のような誠実な未出題表記
        if "周辺問題に出題" in value or "（直接出題" in value or "（単独出題なし" in value:
            continue
        # トークン抽出
        for ym in YEAR_TOKEN_PATTERN.finditer(value):
            tok = ym.group(1) + (ym.group(2) or "")
            variants = _normalize_year_tokens(tok)
            if any(v in kakomon_years for v in variants):
                continue
            issues.append((
                "yr",
                lineno,
                f"targets='{value[:30]}...' の年度トークン '{tok}' が kakomon.yml に未登録",
            ))
    return issues


# ─────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────
ALL_CHECKS = ("id", "cta", "tag", "yr")


def main():
    parser = argparse.ArgumentParser(description="hoki-wiki 品質チェッカ")
    parser.add_argument("--jsx", default=str(DEFAULT_JSX), help="hoki-pages.jsx のパス")
    parser.add_argument("--data", default=str(DEFAULT_DATA), help="hoki-data.js のパス")
    parser.add_argument("--denken-wiki", default=str(DEFAULT_DENKEN_WIKI),
                        help="denken-wiki リポジトリのルート")
    parser.add_argument("--kakomon", default=str(DEFAULT_KAKOMON),
                        help="kakomon.yml のパス")
    parser.add_argument("--only", default="", help="実行するチェック（カンマ区切り: id,cta,tag,yr）")
    parser.add_argument("--skip", default="", help="スキップするチェック")
    args = parser.parse_args()

    jsx_path = Path(args.jsx)
    data_path = Path(args.data)
    denken_wiki = Path(args.denken_wiki)
    kakomon = Path(args.kakomon)

    if not jsx_path.exists():
        print(f"jsx が存在しない: {jsx_path}", file=sys.stderr)
        sys.exit(2)
    if not data_path.exists():
        print(f"data が存在しない: {data_path}", file=sys.stderr)
        sys.exit(2)

    only = set(t.strip() for t in args.only.split(",") if t.strip())
    skip = set(t.strip() for t in args.skip.split(",") if t.strip())

    def enabled(name: str) -> bool:
        if only:
            return name in only
        return name not in skip

    jsx_text = jsx_path.read_text(encoding="utf-8")
    data_text = data_path.read_text(encoding="utf-8")

    all_issues = []
    counts = {k: 0 for k in ALL_CHECKS}

    if enabled("id"):
        for kind, ln, msg in check_id_function(data_text, jsx_text):
            all_issues.append((kind, ln, msg))
            counts[kind] += 1

    if enabled("cta"):
        for kind, ln, msg in check_cta_urls(jsx_text, denken_wiki):
            all_issues.append((kind, ln, msg))
            counts[kind] += 1

    if enabled("tag"):
        for kind, ln, msg in check_tags_consistency(jsx_text):
            all_issues.append((kind, ln, msg))
            counts[kind] += 1

    if enabled("yr"):
        years = parse_kakomon_years(kakomon)
        for kind, ln, msg in check_targets_vs_kakomon(jsx_text, years):
            all_issues.append((kind, ln, msg))
            counts[kind] += 1

    rel_jsx = str(jsx_path.name)
    for kind, ln, msg in all_issues:
        loc = f"{rel_jsx}:{ln}" if ln else rel_jsx
        print(f"[{kind}] {loc} {msg}")

    print()
    print(
        f"Found: {counts['id']} id-mismatches, {counts['cta']} dead CTA URLs, "
        f"{counts['tag']} stale tag refs, {counts['yr']} unregistered year tokens"
    )
    sys.exit(1 if all_issues else 0)


if __name__ == "__main__":
    main()
