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
import os
import re
import shutil
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
SECRETARY  = Path("C:/Users/kfuru/.secretary")
NEWS_DIR   = SECRETARY / "denken-news"
NEWS_JSON  = NEWS_DIR / "news.json"
INDEX_HTML = NEWS_DIR / "index.html"
LOG_FILE   = SECRETARY / "logs" / "denken-news-update.log"
MAX_KEEP   = 25
JST        = timezone(timedelta(hours=9))

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

PROMPT_FROM_RSS = """TASK: Convert each news article below into a structured JSON object for a Japanese electrical engineering exam study system.

OUTPUT FORMAT: Return ONLY a JSON array. Start with [ and end with ]. No explanation, no markdown, no prose.

REQUIRED JSON STRUCTURE for each item:
{schema}

CONTENT RULES:
{rules}

FILTER: If a news item is irrelevant to Japanese electrical engineering (denken 3rd grade exam), exclude it. Return [] if none qualify.

NEWS ITEMS TO CONVERT:
{news_text}"""

PROMPT_GENERATE = """TASK: Generate {n} JSON objects about recent Japanese electrical engineering topics for a study system.

OUTPUT FORMAT: Return ONLY a JSON array starting with [ and ending with ]. No explanation, no markdown, no prose.

REQUIRED JSON STRUCTURE for each object:
{schema}

CONTENT RULES:
{rules}

DO NOT REPEAT these existing titles:
{existing}

TOPIC SUGGESTIONS (choose diverse, avoid repeats):
- 電技解釈・電気事業法の改正, 系統安定化・保護リレー, 再エネ統合・出力制御
- 電気保安制度・主任技術者, 変電・配電技術, 電動機・変圧器の効率規制
- スマートグリッド・VPP, 水素・燃料電池・蓄電池, 省エネ法・トップランナー制度

DATE CONTEXT: Today is {today}. Use recent-sounding dates for article dates."""


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


def embed_inline_data(data: dict) -> None:
    """index.html の window.__NEWS_DATA__ インラインスクリプトを最新 data で上書きする"""
    if not INDEX_HTML.exists():
        log("  embed: index.html not found, skip")
        return
    html = INDEX_HTML.read_text(encoding="utf-8")
    inline_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    new_tag = f"<script>window.__NEWS_DATA__ = {inline_json};</script>"
    updated, n = re.subn(
        r"<script>window\.__NEWS_DATA__\s*=\s*\{.*?\};</script>",
        new_tag, html, flags=re.DOTALL,
    )
    if n == 0:
        log("  embed: marker not found in index.html, skip")
        return
    INDEX_HTML.write_text(updated, encoding="utf-8")
    log("  embed: index.html inline data updated")


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


REQUIRED_KEYS = {"title", "source", "date", "summary", "subjects", "priority", "exam_angle", "quiz"}

def _valid_article(art: dict) -> bool:
    if not isinstance(art, dict):
        return False
    if not REQUIRED_KEYS.issubset(art.keys()):
        return False
    if not isinstance(art.get("summary"), list) or not art["summary"]:
        return False
    if not isinstance(art.get("quiz"), dict) or "question" not in art["quiz"]:
        return False
    if art.get("priority") not in ("A", "B", "C"):
        return False
    return True


def call_claude_cli(prompt: str, dry_run: bool = False) -> list[dict]:
    """claude CLIを呼び出してJSON配列を得る"""
    if dry_run:
        print("=== PROMPT (先頭500字) ===")
        print(prompt[:500])
        print("...")
        return []

    try:
        # Locate claude CLI (npm global install on Windows)
        claude_bin = shutil.which("claude") or r"C:\Users\kfuru\AppData\Roaming\npm\claude.cmd"
        # Run from temp dir (no CLAUDE.md) so secretary context is not loaded.
        # --system-prompt alone is insufficient because CLAUDE.md overrides it.
        tmp_dir = Path(os.environ.get("TEMP", r"C:\Windows\Temp")) / "denken_update"
        tmp_dir.mkdir(parents=True, exist_ok=True)
        result = subprocess.run(
            [claude_bin,
             "--system-prompt", "You are a JSON generator. Output ONLY a raw JSON array, nothing else.",
             "-p", prompt, "--print"],
            capture_output=True,    # bytes mode
            timeout=120, shell=False,
            cwd=str(tmp_dir),
        )
        if result.returncode != 0:
            err = result.stderr.decode("utf-8", errors="replace")[:200]
            log(f"  claude CLI error: {err}")
            return []
        # Decode stdout: try utf-8, fall back to cp932 (Windows Japanese)
        stdout_bytes = result.stdout
        for enc in ("utf-8", "utf-8-sig", "cp932"):
            try:
                raw = stdout_bytes.decode(enc).strip()
                break
            except UnicodeDecodeError:
                continue
        else:
            raw = stdout_bytes.decode("utf-8", errors="replace").strip()
        match = re.search(r"\[.*\]", raw, re.DOTALL)
        if not match:
            log(f"  No JSON array found in claude output. Raw: {raw[:200]}")
            return []
        parsed = json.loads(match.group())
        # Validate structure: only keep correctly-shaped article objects
        valid = [a for a in parsed if _valid_article(a)]
        if len(valid) < len(parsed):
            log(f"  Filtered {len(parsed)-len(valid)} malformed objects")
        return valid
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
    embed_inline_data(data)
    log(f"  Saved. Added={min(len(new_articles), args.max)}, Total={len(data['articles'])}")
    log("=== done ===")


if __name__ == "__main__":
    main()
