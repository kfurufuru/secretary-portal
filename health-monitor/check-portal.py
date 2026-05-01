# -*- coding: utf-8 -*-
"""
check-portal.py — portal-v2.html 月次健全性チェック

検知項目:
  1. dead link (href="#" / 存在しないローカルファイルパス)
  2. ハードコードされた科目別％が portal-summary.json と 10pt以上乖離
  3. <span class="more"> など禁止装飾要素の混入

実行:
  python health-monitor/check-portal.py

出力:
  health-monitor/portal-check-results.json
"""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from datetime import datetime, timezone

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ========== 定数 ==========

SECRETARY_ROOT = Path(__file__).resolve().parent.parent
TARGET_HTML = SECRETARY_ROOT / "portal-v2.html"
PORTAL_SUMMARY = SECRETARY_ROOT / "denken3-study-dashboard" / "data" / "portal-summary.json"
RESULTS_JSON = Path(__file__).resolve().parent / "portal-check-results.json"

DEVIATION_THRESHOLD_PT = 10  # ポイント
SUBJECTS = ["理論", "電力", "機械", "法規"]


# ========== HTMLパーサー ==========

class PortalParser(HTMLParser):
    """portal-v2.html から検査対象要素を行番号付きで抽出"""

    def __init__(self):
        super().__init__()
        self.dead_anchors = []        # href="#" のみの要素 [(line, tag)]
        self.local_links = []         # ローカルパスのリンク [(line, href)]
        self.span_more = []           # <span class="more"> [(line, classes)]
        self.div_link = []            # <div class="link"> [(line, classes)]

    def handle_starttag(self, tag, attrs):
        line = self.getpos()[0]
        attrs_d = dict(attrs)

        # href="#" 検知（aタグ）
        if tag == "a":
            href = attrs_d.get("href", "")
            if href.strip() == "#":
                self.dead_anchors.append((line, tag))
            elif href and not href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "#", "data:")):
                self.local_links.append((line, href))

        # 禁止装飾要素検知
        cls = attrs_d.get("class", "")
        if cls:
            cls_set = cls.split()
            if tag == "span" and "more" in cls_set:
                self.span_more.append((line, cls))
            if tag == "div" and "link" in cls_set:
                self.div_link.append((line, cls))


# ========== チェック関数 ==========

def check_dead_links(parser: PortalParser):
    """dead link 検知"""
    issues = []

    # href="#" のみの要素
    for line, tag in parser.dead_anchors:
        issues.append({
            "type": "dead_anchor",
            "severity": "warn",
            "line": line,
            "message": f'<{tag} href="#"> が残存（プレースホルダー疑い）',
        })

    # 存在しないローカルファイル
    for line, href in parser.local_links:
        # クエリ・アンカー除去
        path_part = href.split("#")[0].split("?")[0]
        if not path_part:
            continue
        target = (SECRETARY_ROOT / path_part).resolve()
        if not target.exists():
            issues.append({
                "type": "broken_local_link",
                "severity": "error",
                "line": line,
                "href": href,
                "resolved": str(target),
                "message": f"ローカルファイルが存在しない: {href}",
            })

    return issues


def check_hardcoded_pct(html_text: str, summary: dict):
    """ハードコードされた科目別％と portal-summary.json の乖離検知"""
    issues = []

    if not summary:
        return [{
            "type": "summary_unreadable",
            "severity": "warn",
            "message": "portal-summary.json が読めなかった",
        }]

    # data-subject="理論" 等の周辺から style="width:NN%" or pct">NN%< を抽出
    # 正規表現でブロック単位に切り出す
    # <div class="sub" data-subject="理論">...</div> の塊を取得
    pattern = re.compile(
        r'data-subject="(理論|電力|機械|法規)"[^>]*>(.*?)</div>\s*</div>',
        re.DOTALL,
    )

    found = {}
    for m in pattern.finditer(html_text):
        subj = m.group(1)
        block = m.group(2)
        # pct">NN%< 形式（プレースホルダー "—" は除外）
        pct_match = re.search(r'class="pct"[^>]*>\s*(\d+)\s*%', block)
        # width:NN%（fetch前のフォールバック）— 0% 以外で乖離があれば古びと判定
        width_match = re.search(r'width\s*:\s*(\d+)\s*%', block)

        hardcoded = None
        if pct_match:
            hardcoded = int(pct_match.group(1))
        elif width_match:
            w = int(width_match.group(1))
            # 0% は「fetch前の純粋なフォールバック」なので無視。0%以外なら古びチェック対象
            if w > 0:
                hardcoded = w
        # "—" などプレースホルダーは hardcoded=None のまま
        found[subj] = hardcoded

    for subj in SUBJECTS:
        hardcoded = found.get(subj)
        truth_obj = summary.get("subjects", {}).get(subj)
        truth_pct = truth_obj.get("pct") if isinstance(truth_obj, dict) else None

        if hardcoded is None:
            # プレースホルダー（fetch依存）→ 問題なし
            continue
        if truth_pct is None:
            # truth が未定義（電力/機械/法規 = null など）でハードコードがあれば警告
            issues.append({
                "type": "stale_hardcoded_pct",
                "severity": "warn",
                "subject": subj,
                "hardcoded": hardcoded,
                "truth": None,
                "message": f"{subj}: ハードコード {hardcoded}% だが summary では未定義",
            })
            continue
        diff = abs(hardcoded - truth_pct)
        if diff >= DEVIATION_THRESHOLD_PT:
            issues.append({
                "type": "stale_hardcoded_pct",
                "severity": "error",
                "subject": subj,
                "hardcoded": hardcoded,
                "truth": truth_pct,
                "deviation_pt": diff,
                "message": f"{subj}: ハードコード {hardcoded}% vs 実際 {truth_pct}% ({diff}pt 乖離)",
            })

    return issues


def check_forbidden_decorations(parser: PortalParser):
    """<span class='more'> / <div class='link'> 検知"""
    issues = []
    for line, cls in parser.span_more:
        issues.append({
            "type": "forbidden_span_more",
            "severity": "error",
            "line": line,
            "class": cls,
            "message": '<span class="more"> が混入（クリック装飾要素は禁止）',
        })
    for line, cls in parser.div_link:
        issues.append({
            "type": "forbidden_div_link",
            "severity": "error",
            "line": line,
            "class": cls,
            "message": '<div class="link"> が混入（クリック装飾要素は禁止）',
        })
    return issues


# ========== main ==========

def main():
    if not TARGET_HTML.exists():
        print(f"[ERROR] ターゲットHTMLが存在しない: {TARGET_HTML}", file=sys.stderr)
        sys.exit(1)

    html_text = TARGET_HTML.read_text(encoding="utf-8", errors="replace")

    parser = PortalParser()
    parser.feed(html_text)

    summary = None
    if PORTAL_SUMMARY.exists():
        try:
            summary = json.loads(PORTAL_SUMMARY.read_text(encoding="utf-8"))
        except Exception as e:
            print(f"[WARN] portal-summary.json 読込失敗: {e}", file=sys.stderr)

    checks = {
        "dead_links": check_dead_links(parser),
        "hardcoded_pct": check_hardcoded_pct(html_text, summary),
        "forbidden_decorations": check_forbidden_decorations(parser),
    }

    total_issues = sum(len(v) for v in checks.values())
    errors = sum(1 for v in checks.values() for i in v if i.get("severity") == "error")
    warnings = sum(1 for v in checks.values() for i in v if i.get("severity") == "warn")

    result = {
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "target": "portal-v2.html",
        "summary_source": str(PORTAL_SUMMARY.relative_to(SECRETARY_ROOT)) if PORTAL_SUMMARY.exists() else None,
        "deviation_threshold_pt": DEVIATION_THRESHOLD_PT,
        "total_issues": total_issues,
        "errors": errors,
        "warnings": warnings,
        "checks": checks,
    }

    RESULTS_JSON.write_text(
        json.dumps(result, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"[OK] portal-v2.html チェック完了")
    print(f"  total_issues={total_issues}  errors={errors}  warnings={warnings}")
    print(f"  out: {RESULTS_JSON}")

    # 詳細を簡易出力
    for cat, items in checks.items():
        if items:
            print(f"\n[{cat}] {len(items)}件")
            for i in items:
                sev = i.get("severity", "?")
                msg = i.get("message", "")
                line = i.get("line", "-")
                print(f"  - ({sev}) line {line}: {msg}")

    sys.exit(0 if errors == 0 else 2)


if __name__ == "__main__":
    main()
