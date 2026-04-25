"""
JSON → Markdown Sync for Obsidian Vault
========================================
news.json の出力を .secretary/ai-news/feeds/ に Markdown 化して保存。
Stop hook で実行：セッション終了時に新着記事を自動昇格。

使い方:
  py sync_to_vault.py              # 通常実行
  py sync_to_vault.py --dry-run    # プレビューのみ
  py sync_to_vault.py --list       # 既存ファイル一覧
"""

import json
import sys
import logging
import argparse
from datetime import datetime
from pathlib import Path

# ──────────────────────────────────────────────
# 設定読み込み
# ──────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"

with open(CONFIG_PATH, encoding="utf-8") as f:
    CFG = json.load(f)

SECRETARY_PATH = Path(CFG["secretary_path"])
NEWS_JSON_PATH = Path(CFG["news_json_path"])
FEEDS_DIR = SECRETARY_PATH / "ai-news" / "feeds"
LOG_PATH = SCRIPT_DIR / "sync_to_vault.log"

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
# メイン処理
# ──────────────────────────────────────────────

def ensure_feeds_dir():
    """ai-news/feeds/ ディレクトリが存在しなければ作成"""
    FEEDS_DIR.mkdir(parents=True, exist_ok=True)
    log.info(f"Feeds directory: {FEEDS_DIR}")


def json_to_markdown(item: dict) -> str:
    """news.json アイテムを Markdown に変換"""
    title = item.get("title", "Untitled")
    url = item.get("url", "")
    source = item.get("source", "Unknown")
    category = item.get("category", "その他")
    published = item.get("published", "")
    score = item.get("score", 0)
    ja_summary = item.get("ja_summary", item.get("summary", ""))
    reason = item.get("reason", "")
    ai_category = item.get("ai_category", "ニュース")

    # Extract date from published (ISO 8601)
    try:
        pub_date = published.split("T")[0] if published else datetime.now().strftime("%Y-%m-%d")
    except:
        pub_date = datetime.now().strftime("%Y-%m-%d")

    # Frontmatter
    frontmatter = f"""---
title: "{title}"
source: "{source}"
category: "{category}"
url: "{url}"
date: {pub_date}
published_at: "{published}"
ai_category: "{ai_category}"
score: {score}
type: "ai-news"
status: "inbox"
---"""

    # Body
    body = f"""## スコア: {score}/3

**情報源**: {source} ({category})
**カテゴリ**: {ai_category}
**リンク**: [{title}]({url})

### 日本語サマリー

{ja_summary}

### 採点理由

{reason}

---

*自動昇格: L1(inbox) → L2(knowledge) 候補*
*Stop hook で生成: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*
"""

    return frontmatter + "\n\n" + body


def sync_news_to_vault(dry_run: bool = False):
    """news.json を読んで Markdown ファイルを生成"""
    ensure_feeds_dir()

    try:
        with open(NEWS_JSON_PATH, encoding="utf-8") as f:
            news_items = json.load(f)
    except FileNotFoundError:
        log.error(f"news.json not found: {NEWS_JSON_PATH}")
        return 0
    except json.JSONDecodeError as e:
        log.error(f"Invalid JSON: {e}")
        return 0

    if not isinstance(news_items, list):
        log.error("news.json should be a list of items")
        return 0

    count = 0
    for item in news_items:
        title = item.get("title", "Untitled")
        url = item.get("url", "")
        category = item.get("category", "その他")
        published = item.get("published", "")
        score = item.get("score", 0)

        # ファイル名生成: YYYY-MM-DD-[source]-[slugified title].md
        try:
            pub_date = published.split("T")[0] if published else datetime.now().strftime("%Y-%m-%d")
        except:
            pub_date = datetime.now().strftime("%Y-%m-%d")

        # Safe filename from title
        safe_title = "".join(c if c.isalnum() or c in "_-" else "_" for c in title[:50]).rstrip("_-")
        filename = f"{pub_date}-{safe_title}.md"
        filepath = FEEDS_DIR / filename

        if filepath.exists():
            log.info(f"  [SKIP] {filename} (already exists)")
            continue

        markdown_content = json_to_markdown(item)

        if dry_run:
            log.info(f"  [DRY-RUN] {filename}")
            log.info(f"    Title: {title}")
            log.info(f"    Score: {score}")
        else:
            try:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(markdown_content)
                log.info(f"  [CREATED] {filename} (score: {score})")
                count += 1
            except Exception as e:
                log.error(f"  [ERROR] Failed to write {filename}: {e}")

    log.info(f"Sync completed: {count} new files created")
    return count


def list_feeds():
    """既存 feeds ファイル一覧"""
    ensure_feeds_dir()
    files = sorted(FEEDS_DIR.glob("*.md"))
    if not files:
        print("No feeds files found")
        return
    print(f"Found {len(files)} feed files:")
    for f in files:
        size = f.stat().st_size
        mtime = datetime.fromtimestamp(f.stat().st_mtime).strftime("%Y-%m-%d %H:%M")
        print(f"  {f.name} ({size} bytes, {mtime})")


def main():
    parser = argparse.ArgumentParser(description="Sync news.json to Obsidian Vault")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing")
    parser.add_argument("--list", action="store_true", help="List existing feeds")
    args = parser.parse_args()

    log.info("=== JSON to Markdown Sync Started ===")

    if args.list:
        list_feeds()
    else:
        sync_news_to_vault(dry_run=args.dry_run)

    log.info("=== Sync Completed ===")


if __name__ == "__main__":
    main()
