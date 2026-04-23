# -*- coding: utf-8 -*-
"""
link_checker.py — Secretary システム HTMLリンク検証ツール

使い方:
  py health-monitor/link_checker.py                  # 全HTMLファイルをスキャン
  py health-monitor/link_checker.py --file portal-v2.html  # 単一ファイル
  py health-monitor/link_checker.py --fix            # 修正コマンド候補を出力
  py health-monitor/link_checker.py --check-external # 外部URLも検証（遅い）
"""

import os
import re
import json
import sys
import argparse
import difflib
import urllib.request
import urllib.error
from html.parser import HTMLParser
from pathlib import Path
from datetime import datetime, timezone

# Windows コンソールの UTF-8 出力を強制する
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ========== 定数 ==========

SECRETARY_ROOT = Path(__file__).resolve().parent.parent  # .secretary/
RESULTS_JSON = Path(__file__).resolve().parent / "link-check-results.json"

# スキップするCDNドメイン
CDN_SKIP_DOMAINS = [
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "unpkg.com",
    "cdn.jsdelivr.net",
    "cdnjs.cloudflare.com",
]

# ========== HTMLパーサー ==========

class LinkExtractor(HTMLParser):
    """HTMLからhref/srcリンクを行番号付きで抽出する"""

    def __init__(self):
        super().__init__()
        self.links = []  # [(line, attr_name, url), ...]
        self._line_offset = 0

    def handle_starttag(self, tag, attrs):
        for attr_name, attr_val in attrs:
            if attr_name in ("href", "src") and attr_val:
                # 空・アンカーのみ・javascript: は除外
                val = attr_val.strip()
                if val and not val.startswith("#") and not val.lower().startswith("javascript:"):
                    self.links.append((self.getpos()[0], attr_name, val))


def extract_links(html_path: Path):
    """HTMLファイルからリンクを抽出して返す"""
    try:
        content = html_path.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        return [], str(e)
    parser = LinkExtractor()
    parser.feed(content)
    return parser.links, None


# ========== リンク分類 ==========

def classify_link(url: str):
    """
    URLを分類する。
    戻り値: "cdn" | "external" | "localhost" | "relative"
    """
    lower = url.lower()
    if lower.startswith("http://") or lower.startswith("https://"):
        # CDN判定
        for cdn in CDN_SKIP_DOMAINS:
            if cdn in lower:
                return "cdn"
        if lower.startswith("http://localhost") or lower.startswith("http://127.0.0.1"):
            return "localhost"
        return "external"
    # data: / mailto: / tel: などは無視
    if ":" in url and not url.startswith(".") and not url.startswith("/"):
        return "skip"
    return "relative"


# ========== 類似ファイル候補 ==========

def find_similar_files(missing_name: str, all_html_files: list[Path], root: Path):
    """
    欠損ファイル名に対して類似ファイルを候補として返す。
    difflib.SequenceMatcher で類似度 0.4 以上のものを最大3件。
    """
    target = Path(missing_name).name.lower()
    candidates = []
    for f in all_html_files:
        ratio = difflib.SequenceMatcher(None, target, f.name.lower()).ratio()
        if ratio >= 0.4:
            rel = f.relative_to(root)
            candidates.append((ratio, str(rel).replace("\\", "/")))
    candidates.sort(key=lambda x: -x[0])
    return candidates[:3]


# ========== 外部URL検証 ==========

def check_external_url(url: str, timeout: int = 5):
    """HEAD リクエストで外部URLを検証する"""
    try:
        req = urllib.request.Request(url, method="HEAD",
                                     headers={"User-Agent": "Mozilla/5.0 LinkChecker/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, None
    except urllib.error.HTTPError as e:
        return e.code, None
    except Exception as e:
        return None, str(e)


# ========== メイン検証ロジック ==========

def check_file(html_path: Path, all_html_files: list[Path], root: Path,
               check_external: bool = False):
    """
    1ファイルのリンクを全件検証する。
    戻り値: dict { ok, broken, warnings, links: [...] }
    """
    links_raw, read_err = extract_links(html_path)
    if read_err:
        return {"error": read_err, "ok": 0, "broken": 0, "warnings": 0, "links": []}

    html_dir = html_path.parent
    result_links = []
    ok_count = 0
    broken_count = 0
    warn_count = 0

    for line_no, attr_name, url in links_raw:
        link_type = classify_link(url)
        entry = {
            "line": line_no,
            "attr": attr_name,
            "href": url,
            "type": link_type,
            "status": "ok",
            "reason": None,
            "suggestion": None,
        }

        if link_type == "cdn" or link_type == "skip":
            # CDN・スキップ対象はカウントしない
            continue

        elif link_type == "localhost":
            status_code, err = check_external_url(url, timeout=1)
            if status_code is not None and status_code < 400:
                entry["status"] = "ok"
                ok_count += 1
            else:
                entry["status"] = "warning"
                entry["reason"] = "localhost_server_down" if err else f"localhost_http_{status_code}"
                warn_count += 1

        elif link_type == "external":
            if check_external:
                status_code, err = check_external_url(url)
                if err or (status_code is not None and status_code >= 400):
                    entry["status"] = "broken"
                    entry["reason"] = f"http_{status_code}" if status_code else f"error: {err}"
                    broken_count += 1
                else:
                    ok_count += 1
            else:
                # デフォルトはスキップ（カウントもしない）
                continue

        elif link_type == "relative":
            # URLの?クエリ・#フラグメントを除去
            clean_url = url.split("?")[0].split("#")[0]
            if not clean_url:
                ok_count += 1
            else:
                target_path = (html_dir / clean_url).resolve()
                if target_path.exists():
                    ok_count += 1
                else:
                    entry["status"] = "broken"
                    entry["reason"] = "file_not_found"
                    broken_count += 1
                    # 類似ファイル候補を探す
                    candidates = find_similar_files(clean_url, all_html_files, root)
                    if candidates:
                        best_ratio, best_path = candidates[0]
                        entry["suggestion"] = f"{best_path} (類似度: {best_ratio:.1f})"

        result_links.append(entry)

    return {
        "ok": ok_count,
        "broken": broken_count,
        "warnings": warn_count,
        "links": result_links,
    }


# ========== 出力フォーマット ==========

def fmt_relative(html_path: Path, root: Path) -> str:
    try:
        return str(html_path.relative_to(root)).replace("\\", "/")
    except ValueError:
        return str(html_path)


def print_results(all_results: list[dict], root: Path, show_fix: bool = False):
    """コンソール出力（日本語）"""
    total_links = 0
    total_ok = 0
    total_broken = 0
    total_warnings = 0

    print()
    print("🔗 リンクチェック結果")
    print()

    for file_result in all_results:
        rel_path = fmt_relative(file_result["path"], root)
        data = file_result["data"]

        if "error" in data:
            print(f"📄 {rel_path}")
            print(f"  ⛔ 読み込みエラー: {data['error']}")
            print()
            continue

        ok = data["ok"]
        broken = data["broken"]
        warnings = data["warnings"]
        links = data["links"]

        total_links += ok + broken + warnings
        total_ok += ok
        total_broken += broken
        total_warnings += warnings

        # ファイルに問題がなければ簡潔に
        if broken == 0 and warnings == 0:
            print(f"📄 {rel_path}")
            print(f"  ✅ {ok} links OK")
            print()
            continue

        print(f"📄 {rel_path}")
        if ok > 0:
            print(f"  ✅ {ok} links OK")

        # 壊れたリンク
        broken_links = [l for l in links if l["status"] == "broken"]
        if broken_links:
            print(f"  ❌ {len(broken_links)} broken links:")
            for l in broken_links:
                reason_ja = {
                    "file_not_found": "ファイルが存在しません",
                }.get(l["reason"], l["reason"] or "不明なエラー")
                print(f"    L{l['line']}: {l['attr']}=\"{l['href']}\" → {reason_ja}")
                if l["suggestion"]:
                    print(f"      💡 候補: {l['suggestion']}")
                if show_fix:
                    print(f"      🔧 要修正: href=\"{l['href']}\" を確認してください")

        # 警告リンク
        warn_links = [l for l in links if l["status"] == "warning"]
        if warn_links:
            print(f"  ⚠️  {len(warn_links)} warning:")
            for l in warn_links:
                if l["reason"] == "localhost":
                    print(f"    L{l['line']}: {l['attr']}=\"{l['href']}\" → localhostサーバ確認が必要")
                else:
                    print(f"    L{l['line']}: {l['attr']}=\"{l['href']}\" → {l['reason']}")

        print()

    # サマリー
    print("━" * 40)
    print(f"合計: {total_links} links / {total_ok} OK / {total_broken} broken / {total_warnings} warning")
    print()

    return total_broken


# ========== JSON出力 ==========

def write_json(all_results: list[dict], root: Path, output_path: Path):
    """結果をJSONファイルに書き出す"""
    total_links = 0
    total_ok = 0
    total_broken = 0
    total_warnings = 0
    files_json = []

    for file_result in all_results:
        rel_path = fmt_relative(file_result["path"], root)
        data = file_result["data"]

        if "error" in data:
            files_json.append({"file": rel_path, "error": data["error"], "links": []})
            continue

        ok = data["ok"]
        broken = data["broken"]
        warnings = data["warnings"]

        total_links += ok + broken + warnings
        total_ok += ok
        total_broken += broken
        total_warnings += warnings

        # 壊れ・警告のみJSONに含める（OKは省略してサイズ節約）
        problem_links = [
            {
                "line": l["line"],
                "attr": l["attr"],
                "href": l["href"],
                "status": l["status"],
                "reason": l["reason"],
                "suggestion": l["suggestion"],
            }
            for l in data["links"]
            if l["status"] in ("broken", "warning")
        ]

        files_json.append({
            "file": rel_path,
            "ok": ok,
            "broken": broken,
            "warnings": warnings,
            "links": problem_links,
        })

    result = {
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "total_links": total_links,
        "ok": total_ok,
        "broken": total_broken,
        "warnings": total_warnings,
        "files": files_json,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"📝 結果を保存しました: {output_path}")


# ========== エントリポイント ==========

def main():
    parser = argparse.ArgumentParser(
        description="Secretary システム HTMLリンク検証ツール",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--file", metavar="PATH",
        help="単一ファイルのみチェック（相対パスはスクリプト実行ディレクトリから）",
    )
    parser.add_argument(
        "--fix", action="store_true",
        help="壊れたリンクの修正コマンド候補を出力する（ファイルは変更しない）",
    )
    parser.add_argument(
        "--check-external", action="store_true",
        help="外部URLもHTTP HEADリクエストで検証する（タイムアウト5秒）",
    )
    parser.add_argument(
        "--root", metavar="DIR",
        help=f"Secretaryルートディレクトリ（デフォルト: {SECRETARY_ROOT}）",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve() if args.root else SECRETARY_ROOT

    # スキャン対象HTMLファイルの収集
    if args.file:
        target = Path(args.file)
        if not target.is_absolute():
            target = Path.cwd() / target
        target = target.resolve()
        if not target.exists():
            print(f"エラー: ファイルが見つかりません: {target}", file=sys.stderr)
            sys.exit(2)
        html_files = [target]
    else:
        html_files = sorted(p for p in root.rglob("*.html")
                            if not any(part in {".claude", "node_modules", ".git", "__pycache__"}
                                       for part in p.parts))

    if not html_files:
        print("HTMLファイルが見つかりませんでした。")
        sys.exit(0)

    print(f"対象: {len(html_files)} HTMLファイル | ルート: {root}")
    if args.check_external:
        print("外部URLチェック: 有効（遅い場合があります）")

    all_html_files = sorted(p for p in root.rglob("*.html")
                            if not any(part in {".claude", "node_modules", ".git", "__pycache__"}
                                       for part in p.parts))

    # 各ファイルを検証
    all_results = []
    for html_path in html_files:
        data = check_file(html_path, all_html_files, root,
                          check_external=args.check_external)
        all_results.append({"path": html_path, "data": data})

    # コンソール出力
    broken_count = print_results(all_results, root, show_fix=args.fix)

    # JSON保存
    write_json(all_results, root, RESULTS_JSON)

    # 終了コード: 壊れたリンクがあれば1
    sys.exit(1 if broken_count > 0 else 0)


if __name__ == "__main__":
    main()
