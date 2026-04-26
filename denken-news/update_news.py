#!/usr/bin/env python3
"""update_news.py - 電験ニュース自動更新スクリプト

Claude Code CLI (OAuth認証) を使って電験3種ニュースを週次で自動生成・更新する。
Anthropic APIキー不要。claude コマンド（Claude Code CLI）が必要。

Usage:
    py denken-news/update_news.py              # 本番実行（3記事生成）
    py denken-news/update_news.py --dry-run    # プロンプトのみ表示
    py denken-news/update_news.py --max 5      # 最大5記事追加
    py denken-news/update_news.py --rss-only   # RSS変換のみ（直接生成なし）
"""
import argparse
import json
import re
import subprocess
import sys
from datetime import date, datetime, timezone, timedelta
from pathlib import Path

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import requests
import feedparser

# ============================================================
# CONFIG
# ============================================================
SECRETARY = Path("C:/Users/kfuru/.secretary")
NEWS_DIR  = SECRETARY / "denken-news"
NEWS_JSON = NEWS_DIR / "news.json"
LOG_FILE  = SECRETARY / "logs" / "denken-news-update.log"
MAX_KEEP  = 25
JST       = timezone(timedelta(hours=9))

RSS_FEEDS = [
    {"url": "https://solarjournal.jp/feed/",         "source": "SOLAR JOURNAL",    "source_url": "https://solarjournal.jp/"},
    {"url": "https://www.meti.go.jp/press/feed.rss", "source": "経済産業省",         "source_url": "https://www.meti.go.jp/"},
]

# ============================================================
# PROMPT TEMPLATES
# ============================================================
ARTICLE_SCHEMA = """{
  "title": "記事タイトル（50字以内）",
  "source": "情報源名",
  "source_url": "URL",
  "date": "YYYY-MM-DD",
  "summary": ["論点1（50字以内）", "論点2（50字以内）", "論点3（50字以内）"],
  "subjects": ["理論" or "電力" or "機械" or "法規" の該当する科目],
  "priority": "A" or "B" or "C",
  "topics": ["関連テーマ3〜5個"],
  "keywords": ["キーワード4〜6個"],
  "exam_angle": "試験での出題視点（80字以内）",
  "quiz": {"question": "試験形式の問い", "hint": "30字以内のヒント"},
  "difficulty": 1〜5の整数
}"""

RULES = """ルール（厳守）：
- 計算式・数式を文章中に書かない（概念を言葉で説明する）
- 語呂合わせ禁止（因果理解ベース）
- スマホ最適化（短文・箇条書き）
- 試験に出る「なぜ」「どちらが」の視点を必ず含める
- priority A = 頻出テーマ・法改正・直近ニュース性高い、B = 関連テーマ、C = 参考"""

PROMPT_FROM_RSS = """あなたは電験3種受験生（36歳・電気エンジニア管理職）の学習支援AIです。
以下のニュース記事を電験3種試験の論点と結びつけた学習コンテンツに変換してください。

{rules}

出力はJSON配列のみ（前置き・後置き禁止）：
{schema}

電験3種に無関係なニュースは除外し、該当なければ [] を返す。

---
{news_text}"""

PROMPT_GENERATE = """あなたは電験3種受験生（36歳・電気エンジニア管理職）の学習支援AIです。
日本の電気・エネルギー分野の最新動向をもとに、電験3種学習に役立つ記事を {n} 本生成してください。

{rules}

既存記事タイトル（重複禁止）：
{existing}

テーマ候補（偏りなく選ぶ）：
電技解釈・電気事業法の改正、系統安定化・保護リレー、再エネ統合・出力制御、
電気保安制度・主任技術者、変電・配電技術の最新動向、電動機・変圧器の効率規制、
スマートグリッド・VPP、水素・燃料電池・蓄電池、省エネ法・トップランナー制度

今日の日付: {today}
出力はJSON配列のみ（前置き・後置き禁止）：
{schema}"""


# ============================================================
# UTILITIES
# ============================================================
def log(msg: str) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(JST).strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def load_news_json() -> dict:
    if NEWS_JSON.exists():
        return json.loads(NEWS_JSON.read_text(encoding="utf-8"))
    return {
        "meta": {"last_updated": datetime.now(JST).isoformat(), "total_articles": 0, "version": "1.0.0"},
        "exam_info": {},
        "articles": [],
    }


def save_news_json(data: dict) -> None:
    NEWS_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def fetch_rss(feed_info: dict, days_back: int = 14) -> list[dict]:
    cutoff = datetime.now(JST) - timedelta(days=days_back)
    items  = []
    try:
        resp = requests.get(
            feed_info["url"], timeout=10,
            headers={"User-Agent": "Mozilla/5.0 (compatible; DenkenNewsBot/1.0)"}
        )
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)
        for entry in feed.entries[:20]:
            pub = None
            for attr in ("published_parsed", "updated_parsed"):
                if hasattr(entry, attr) and getattr(entry, attr):
                    pub = datetime(*getattr(entry, attr)[:6], tzinfo=timezone.utc)
                    break
            if pub and pub.astimezone(JST) < cutoff:
                continue
            title   = getattr(entry, "title", "").strip()
            summary = re.sub(r"<[^>]+>", "", getattr(entry, "summary", "")).strip()
            link    = getattr(entry, "link", feed_info["source_url"])
            if not title:
                continue
            items.append({
                "title":      title,
                "summary":    summary[:300],
                "link":       link,
                "source":     feed_info["source"],
                "source_url": feed_info["source_url"],
                "date":       pub.astimezone(JST).strftime("%Y-%m-%d") if pub else date.today().isoformat(),
            })
    except Exception as e:
        log(f"  RSS fetch failed ({feed_info['url']}): {e}")
    return items


def call_claude_cli(prompt: str, dry_run: bool = False) -> list[dict]:
    """claude CLIを呼び出してJSON配列を得る"""
    if dry_run:
        print("=== PROMPT (先頭500字) ===")
        print(prompt[:500])
        print("...")
        return []

    try:
        result = subprocess.run(
            ["claude", "-p", prompt, "--print"],
            capture_output=True, text=True, encoding="utf-8",
            timeout=120
        )
        if result.returncode != 0:
            log(f"  claude CLI error: {result.stderr[:200]}")
            return []
        raw = result.stdout.strip()
        match = re.search(r"\[.*\]", raw, re.DOTALL)
        if not match:
            log(f"  No JSON array found in claude output. Raw: {raw[:200]}")
            return []
        return json.loads(match.group())
    except subprocess.TimeoutExpired:
        log("  claude CLI timed out (120s)")
        return []
    except Exception as e:
        log(f"  claude CLI exception: {e}")
        return []


# ============================================================
# MAIN
# ============================================================
def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run",   action="store_true")
    parser.add_argument("--max",       type=int, default=3)
    parser.add_argument("--days-back", type=int, default=10)
    parser.add_argument("--rss-only",  action="store_true")
    args = parser.parse_args()

    log("=== denken-news update start ===")
    today  = datetime.now(JST).strftime("%Y-%m-%d")
    data   = load_news_json()
    ex_map = {a.get("title", "") for a in data["articles"]}
    ex_list = [a.get("title", "") for a in data["articles"]]
    log(f"  Existing: {len(data['articles'])} articles")

    new_articles: list[dict] = []

    # --- RSS → Claude変換 ---
    raw_all: list[dict] = []
    for feed in RSS_FEEDS:
        items = fetch_rss(feed, days_back=args.days_back)
        log(f"  RSS {feed['source']}: {len(items)} items")
        raw_all.extend(items)

    seen: set[str] = set()
    raw_new = [i for i in raw_all if i["title"] not in ex_map and i["title"] not in seen and not seen.add(i["title"])]  # type: ignore[func-returns-value]

    if raw_new:
        news_text = "\n\n".join(
            f"【{i['source']}】{i['date']}\nタイトル: {i['title']}\n概要: {i['summary']}\nURL: {i['link']}"
            for i in raw_new[:args.max * 2]
        )
        prompt = PROMPT_FROM_RSS.format(rules=RULES, schema=ARTICLE_SCHEMA, news_text=news_text)
        log(f"  Converting {len(raw_new[:args.max*2])} RSS items via Claude CLI...")
        converted = call_claude_cli(prompt, dry_run=args.dry_run)
        new_articles.extend(converted)
        log(f"  RSS→Claude: {len(converted)} articles")

    # --- 直接生成（不足分補完）---
    need = args.max - len(new_articles)
    if need > 0 and not args.rss_only:
        existing_str = "\n".join(f"- {t}" for t in ex_list[:30])
        prompt = PROMPT_GENERATE.format(
            n=need, rules=RULES, schema=ARTICLE_SCHEMA,
            existing=existing_str, today=today,
        )
        log(f"  Generating {need} articles via Claude CLI (direct)...")
        generated = call_claude_cli(prompt, dry_run=args.dry_run)
        new_articles.extend(generated)
        log(f"  Direct generate: {len(generated)} articles")

    if args.dry_run:
        log("  dry-run: exit")
        return

    if not new_articles:
        log("  No new articles.")
        return

    max_id = max((a.get("id", 0) for a in data["articles"]), default=0)
    for i, art in enumerate(new_articles[:args.max], start=1):
        art["id"] = max_id + i

    data["articles"] = new_articles[:args.max] + data["articles"]
    data["articles"] = data["articles"][:MAX_KEEP]
    data["meta"]["last_updated"]   = datetime.now(JST).isoformat()
    data["meta"]["total_articles"] = len(data["articles"])

    save_news_json(data)
    log(f"  Saved. Added={min(len(new_articles), args.max)}, Total={len(data['articles'])}")
    log("=== done ===")


if __name__ == "__main__":
    main()
