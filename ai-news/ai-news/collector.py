"""
AI News Collector
=================
毎朝自動実行されるニュース収集スクリプト。

処理フロー:
  1. RSSフィード収集
  2. キーワードフィルタ（無料・Python処理）
  3. Claude API で上位20件を要約・スコアリング（Haiku使用）
  4. inbox.txt（OneDrive）の手動URLも処理
  5. news.json に出力
  6. スコア上位3件を today's todos に自動追記
  7. エラーはログファイルに記録

使い方:
  py collector.py
  py collector.py --dry-run   # APIを使わずフィルタ結果だけ確認
"""

import json
import os
import sys
import logging
import argparse
import re
from datetime import datetime, timezone
from pathlib import Path

# --- サードパーティ（pip install feedparser anthropic requests python-dotenv）
try:
    import feedparser
    import anthropic
    import requests
    from dotenv import load_dotenv
except ImportError as e:
    print(f"[ERROR] 必要なパッケージが不足しています: {e}")
    print("  pip install feedparser anthropic requests python-dotenv")
    sys.exit(1)

# ──────────────────────────────────────────────
# 設定読み込み
# ──────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"

# .env からAPIキーを読み込む（なければ環境変数 ANTHROPIC_API_KEY にフォールバック）
load_dotenv((SCRIPT_DIR / ".env").resolve(), override=True)

with open(CONFIG_PATH, encoding="utf-8") as f:
    CFG = json.load(f)

API_KEY = (
    os.environ.get("ANTHROPIC_API_KEY")
    or CFG.get("anthropic_api_key")
    or ""
)
if not API_KEY:
    print("[ERROR] ANTHROPIC_API_KEY が設定されていません。ai-news/.env を確認してください。")
    sys.exit(1)
MODEL_SUMMARY    = CFG["model_summary"]
MODEL_DEEP       = CFG["model_deep"]
MAX_ITEMS        = CFG["max_items_per_run"]
TOP_N_TODOS      = CFG["top_score_to_todos"]
SECRETARY_PATH   = Path(CFG["secretary_path"])
INBOX_PATH       = Path(CFG["inbox_path"])
NEWS_JSON        = Path(CFG["news_json_path"])
RSS_SOURCES      = CFG["rss_sources"]
FILTER_KEYWORDS  = [kw.lower() for kw in CFG["filter_keywords"]]

LOG_PATH = SCRIPT_DIR / "collector.log"

# ──────────────────────────────────────────────
# ロギング設定
# ──────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)

# ──────────────────────────────────────────────
# 1. RSS 収集
# ──────────────────────────────────────────────
def fetch_rss(sources: list[dict]) -> list[dict]:
    """全RSSソースを取得し、rawアイテムリストを返す"""
    items = []
    # Redditはデフォルトfeedparserだとブロックされるためrequestsで取得
    reddit_headers = {"User-Agent": "Mozilla/5.0 (compatible; AI-News-Collector/1.0)"}
    for src in sources:
        try:
            log.info(f"  RSS取得: {src['name']}")
            if "reddit.com" in src["url"]:
                resp = requests.get(src["url"], headers=reddit_headers, timeout=10)
                feed = feedparser.parse(resp.content)
            else:
                feed = feedparser.parse(src["url"])
            for entry in feed.entries[:30]:  # ソースあたり最大30件
                title   = entry.get("title", "")
                summary = entry.get("summary", entry.get("description", ""))
                link    = entry.get("link", "")
                pub     = entry.get("published", entry.get("updated", ""))
                items.append({
                    "title":    title,
                    "summary":  _strip_html(summary)[:500],
                    "url":      link,
                    "source":   src["name"],
                    "category": src["category"],
                    "published": pub,
                })
        except Exception as e:
            log.warning(f"  RSS取得失敗 {src['name']}: {e}")
    log.info(f"RSS合計: {len(items)} 件取得")
    return items

def _strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text).strip()

# ──────────────────────────────────────────────
# 2. キーワードフィルタ（無料・Python）
# ──────────────────────────────────────────────
def keyword_filter(items: list[dict]) -> list[dict]:
    """タイトル＋サマリーにキーワードが含まれるものだけ残す。
    GitHub/YouTubeはタイトル一致のみでも通す。"""
    PRIORITY_CATEGORIES = {"GitHub", "YouTube"}
    PRIORITY_KEYWORDS = {"claude code", "claude", "anthropic", "mcp"}

    matched = []
    for item in items:
        text = (item["title"] + " " + item["summary"]).lower()
        hits = [kw for kw in FILTER_KEYWORDS if kw in text]

        # GitHub/YouTubeはタイトルにpriority keywordがあれば無条件通過
        if item["category"] in PRIORITY_CATEGORIES:
            title_lower = item["title"].lower()
            if any(pk in title_lower for pk in PRIORITY_KEYWORDS):
                item["_keyword_hits"] = hits or ["priority_source"]
                matched.append(item)
                continue

        if hits:
            item["_keyword_hits"] = hits
            matched.append(item)

    log.info(f"フィルタ後: {len(matched)} 件（→ 上位{MAX_ITEMS}件をAPIへ）")
    # 重複URL除去
    seen_urls = set()
    deduped = []
    for item in matched:
        if item["url"] not in seen_urls:
            seen_urls.add(item["url"])
            deduped.append(item)
    return deduped[:MAX_ITEMS]

# ──────────────────────────────────────────────
# 3. inbox.txt の手動URLを処理
# ──────────────────────────────────────────────
def fetch_inbox_urls() -> list[dict]:
    """inbox.txt からURLを読み込み、ページ本文を取得してrawアイテム化"""
    if not INBOX_PATH.exists():
        return []

    urls = [line.strip() for line in INBOX_PATH.read_text(encoding="utf-8").splitlines()
            if line.strip().startswith("http")]
    if not urls:
        return []

    log.info(f"inbox.txt: {len(urls)} 件のURLを処理")
    items = []
    for url in urls:
        try:
            resp = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            # タイトルだけ抽出
            title_match = re.search(r"<title>(.*?)</title>", resp.text, re.IGNORECASE)
            title = title_match.group(1).strip() if title_match else url
            items.append({
                "title":    title,
                "summary":  "",
                "url":      url,
                "source":   "手動追加",
                "category": "手動",
                "published": datetime.now(timezone.utc).isoformat(),
                "_keyword_hits": ["manual"],
            })
        except Exception as e:
            log.warning(f"  inbox URL取得失敗 {url}: {e}")

    # 処理済みURLをクリア
    INBOX_PATH.write_text("", encoding="utf-8")
    log.info("inbox.txt をクリアしました")
    return items

# ──────────────────────────────────────────────
# 4. Claude API で要約・スコアリング
# ──────────────────────────────────────────────
SYSTEM_PROMPT = """あなたは生成AI情報のキュレーターです。
ユーザーは三菱ケミカルの電気エンジニア管理職（36歳）で、生成AIを業務活用したい実務家です。
「理論より実際に動かして試せるか」を最重視します。"""

def analyze_items(items: list[dict], dry_run: bool = False) -> list[dict]:
    """Claude APIで各アイテムを要約・スコアリング"""
    if dry_run:
        log.info("[DRY-RUN] API呼び出しをスキップ")
        for item in items:
            item.update({"ja_summary": "(dry-run)", "score": 3, "reason": "-",
                         "ai_category": item["category"], "try_hint": "-"})
        return items

    client = anthropic.Anthropic(api_key=API_KEY)
    results = []

    for i, item in enumerate(items):
        log.info(f"  API [{i+1}/{len(items)}]: {item['title'][:60]}")
        prompt = f"""以下のAIニュース記事を分析してください。

タイトル: {item['title']}
URL: {item['url']}
ソース: {item['source']}
本文抜粋: {item['summary'][:400]}

以下の形式でJSONのみ返してください（コードブロック不要）:
{{
  "ja_summary": "【必須構造】1文目(句点で終わる): 自分(製造業エンジニア)にとって何が嬉しいか・何ができるようになるかを結論先行で1文。句点(。)を必ず入れる。2文目以降: 具体的な中身を補足。抽象論・一般論禁止",
  "score": 1から5の整数で評価。🔴試す(5=今すぐ手を動かして試したい / 4=近いうちに試す価値あり) / 🟡知る(3=参考情報として知っておく / 2=ニュースとして把握する程度) / ⚪スキップ(1=自分の業務に関係薄い),
  "reason": "スコアの理由を1行で",
  "ai_category": "ツール/テクニック/ニュース/論文/チュートリアル のいずれか",
  "try_hint": "🔴評価(score 4以上)のみ: 明日から実際に試すとしたら最初の1アクションを1行で具体的に（例: 「Claude.aiで〇〇を入力して試す」「pip install して動かす」）。score 3以下は空文字"
}}"""

        try:
            resp = client.messages.create(
                model=MODEL_SUMMARY,
                max_tokens=400,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}],
            )
            raw = resp.content[0].text.strip()
            log.debug(f"  APIレスポンス: {raw[:200]!r}")
            # JSONオブジェクトを応答テキストから抽出（コードブロック内外を問わない）
            json_match = re.search(r'\{.*\}', raw, re.DOTALL)
            if not json_match:
                raise ValueError(f"JSONオブジェクトが見つかりません: {raw[:100]!r}")
            parsed = json.loads(json_match.group())
            item.update(parsed)
        except Exception as e:
            log.warning(f"  API解析失敗: {e}")
            item.update({"ja_summary": item["summary"][:200], "score": 2,
                         "reason": "解析エラー", "ai_category": item["category"],
                         "try_hint": ""})
        results.append(item)

    return results

# ──────────────────────────────────────────────
# 5. news.json に保存（既存データとマージ）
# ──────────────────────────────────────────────
def save_news(items: list[dict]) -> list[dict]:
    """既存JSONとマージして保存。URLで重複排除。最大200件保持。"""
    existing = []
    if NEWS_JSON.exists():
        try:
            existing = json.loads(NEWS_JSON.read_text(encoding="utf-8"))
        except Exception:
            existing = []

    existing_urls = {item["url"] for item in existing}
    new_items = [item for item in items if item["url"] not in existing_urls]

    # 新しいものを先頭に
    merged = new_items + existing
    merged = merged[:200]  # 最大200件

    NEWS_JSON.write_text(json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"news.json 保存: 新規{len(new_items)}件 / 合計{len(merged)}件")
    return merged

# ──────────────────────────────────────────────
# 6. スコア上位 N 件を今日の todos に追記
# ──────────────────────────────────────────────
def append_to_todos(items: list[dict]) -> None:
    """スコア上位N件を今日のTODOファイルに追記"""
    top = sorted(items, key=lambda x: x.get("score", 0), reverse=True)[:TOP_N_TODOS]
    top = [item for item in top if item.get("score", 0) >= 4]
    if not top:
        log.info("スコア4以上のアイテムなし。todos追記スキップ")
        return

    today = datetime.now().strftime("%Y-%m-%d")
    todos_path = SECRETARY_PATH / "todos" / f"{today}.md"

    lines = [f"\n\n## 🤖 AI News ピックアップ ({today})\n"]
    for item in top:
        hint = f" → {item['try_hint']}" if item.get("try_hint") else ""
        lines.append(
            f"- [ ] 【試す】{item['title'][:60]} | "
            f"スコア: {item['score']} | {item['url']}{hint} | "
            f"優先度: 高 | 期限: {today}\n"
        )

    if todos_path.exists():
        with open(todos_path, "a", encoding="utf-8") as f:
            f.writelines(lines)
        log.info(f"todos追記: {todos_path} に {len(top)} 件")
    else:
        log.warning(f"todosファイルが存在しません: {todos_path}（追記スキップ）")

# ──────────────────────────────────────────────
# メイン
# ──────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="AI News Collector")
    parser.add_argument("--dry-run", action="store_true", help="APIを使わずフィルタ結果だけ確認")
    args = parser.parse_args()

    log.info("=" * 60)
    log.info(f"AI News Collector 開始: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    log.info("=" * 60)

    # 1. RSS収集
    rss_items = fetch_rss(RSS_SOURCES)

    # 2. キーワードフィルタ
    filtered = keyword_filter(rss_items)

    # 3. inbox手動URL
    inbox_items = fetch_inbox_urls()

    # 全アイテム統合（手動を優先して先頭）
    all_items = inbox_items + filtered
    all_items = all_items[:MAX_ITEMS]

    if not all_items:
        log.info("収集アイテムなし。終了")
        return

    # 4. Claude APIで分析
    analyzed = analyze_items(all_items, dry_run=args.dry_run)

    # 5. JSON保存（dry-runはスキップ）
    if not args.dry_run:
        merged = save_news(analyzed)
        # 6. todos追記
        append_to_todos(analyzed)
    else:
        log.info("[DRY-RUN] news.json・todos への書き込みをスキップ")

    log.info("完了!")
    log.info(f"ダッシュボード: {CFG['dashboard_path']}")

if __name__ == "__main__":
    main()
