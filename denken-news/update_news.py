#!/usr/bin/env python3
"""update_news.py - 電験ニュース自動更新スクリプト

Claude Code CLI (OAuth認証、--dangerously-skip-permissions) を使って
電験3種ニュースを週次で自動生成・更新する。

Claudeに直接ファイル編集を指示するため、JSON抽出・バリデーション不要。
Anthropic APIキー不要。claude コマンド（Claude Code CLI）が必要。

Usage:
    py denken-news/update_news.py              # 本番実行（3記事生成）
    py denken-news/update_news.py --max 5      # 最大5記事追加
    py denken-news/update_news.py --dry-run    # プロンプトのみ表示
"""
import argparse
import json
import re
import subprocess
import shutil
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SECRETARY  = Path("C:/Users/kfuru/.secretary")
NEWS_JSON  = SECRETARY / "denken-news" / "news.json"
INDEX_HTML = SECRETARY / "denken-news" / "index.html"
LOG_FILE   = SECRETARY / "logs" / "denken-news-update.log"
JST        = timezone(timedelta(hours=9))

CLAUDE_BIN = shutil.which("claude") or r"C:\Users\kfuru\AppData\Roaming\npm\claude.cmd"


def log(msg: str) -> None:
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.now(JST).strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def embed_inline_data() -> None:
    """news.json の内容を index.html の window.__NEWS_DATA__ に同期する"""
    try:
        data = json.loads(NEWS_JSON.read_text(encoding="utf-8"))
        html = INDEX_HTML.read_text(encoding="utf-8")
        inline = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        new_tag = f"<script>window.__NEWS_DATA__ = {inline};</script>"
        updated, n = re.subn(
            r"<script>window\.__NEWS_DATA__\s*=\s*\{.*?\};</script>",
            new_tag, html, flags=re.DOTALL,
        )
        if n == 0:
            log("  embed: marker not found in index.html, skip")
            return
        INDEX_HTML.write_text(updated, encoding="utf-8")
        log(f"  embed: index.html synced ({len(data['articles'])} articles)")
    except Exception as e:
        log(f"  embed ERROR: {e}")


def build_prompt(n: int) -> str:
    today = datetime.now(JST).strftime("%Y-%m-%d")
    return (
        f"Read file {NEWS_JSON}. "
        f"Generate exactly {n} new study articles about recent Japanese electrical engineering "
        f"topics NOT already in the file. "
        f"Each article must use the same JSON structure as existing articles: "
        f"id(next available integer), title, source, source_url, date({today}), "
        f"summary(array of 3 strings), subjects(array: 理論/電力/機械/法規), "
        f"priority(A/B/C), topics(array), keywords(array), exam_angle(string), "
        f"quiz(object with question and hint), difficulty(1-5 integer). "
        f"Prepend the new articles to the beginning of the 'articles' array. "
        f"Update meta.last_updated to '{today}T00:00:00+09:00' and meta.total_articles. "
        f"Write the updated JSON back to the same file. "
        f"Reply only: 'Done. Added N articles.' where N is the count."
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--max",     type=int, default=3)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    log("=== denken-news update start ===")
    prompt = build_prompt(args.max)

    if args.dry_run:
        print("=== PROMPT ===")
        print(prompt)
        log("  dry-run: exit")
        return

    try:
        result = subprocess.run(
            [CLAUDE_BIN, "--dangerously-skip-permissions", "--print", "-p", prompt],
            capture_output=True, timeout=300, shell=False,
            cwd=str(SECRETARY),
        )
        stdout = result.stdout.decode("utf-8", errors="replace").strip()
        stderr = result.stderr.decode("utf-8", errors="replace").strip()

        if result.returncode != 0:
            log(f"  ERROR (exit={result.returncode}): {stderr[:300]}")
        else:
            log(f"  Claude: {stdout[:200]}")

    except subprocess.TimeoutExpired:
        log("  WARN: claude CLI timed out (300s) — syncing whatever was written")
    except Exception as e:
        log(f"  ERROR: {e}")
        return

    embed_inline_data()
    log("=== done ===")


if __name__ == "__main__":
    main()
