#!/usr/bin/env python3
"""
trending-news/digest_generator.py
===================================
news.json を読み込み、Haiku + Sonnet の2段パイプラインで
日次バズニュースダイジェストを生成して knowledge/ に保存する。

処理フロー:
  Stage A (Haiku)  : top20件からカテゴリまたぎ接続3組を発見（why_now付き）
  Stage B (Sonnet) : 製造業エンジニア視点のダイジェスト生成（JSON→Markdown）

出力先: knowledge/ideas-from-news/YYYY-MM-DD-trending.md

Usage:
    py trending-news/digest_generator.py              # 本番実行
    py trending-news/digest_generator.py --dry-run    # API不使用（構造確認）
    py trending-news/digest_generator.py --date 2026-04-27  # 日付指定
"""
import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

try:
    import anthropic
    from dotenv import load_dotenv
except ImportError as e:
    print(f"[ERROR] 必要なパッケージが不足しています: {e}")
    print("  pip install anthropic python-dotenv")
    sys.exit(1)

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ── パス設定（タスクスケジューラ対応）────────────────────────
BASE_DIR  = Path(__file__).parent.resolve()
SECRETARY = BASE_DIR.parent
NEWS_JSON = BASE_DIR / "news.json"
OUTPUT_DIR = SECRETARY / "knowledge" / "ideas-from-news"
JST = timezone(timedelta(hours=9))

# ── API キー ─────────────────────────────────────────────────
load_dotenv(BASE_DIR / ".env", override=True)
load_dotenv(SECRETARY / "ai-news" / "ai-news" / ".env", override=False)
API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

HAIKU_MODEL  = "claude-haiku-4-5-20251001"
SONNET_MODEL = "claude-sonnet-4-6"


# ── 1. データ読み込み ─────────────────────────────────────────
def load_news(top_n: int = 20) -> list[dict]:
    """news.json からスコア上位 top_n 件を返す"""
    if not NEWS_JSON.exists():
        print(f"[ERROR] news.json が見つかりません: {NEWS_JSON}")
        print("  先に collector.py を実行してください")
        sys.exit(1)
    data  = json.loads(NEWS_JSON.read_text(encoding="utf-8"))
    items = data.get("items", [])
    return sorted(items, key=lambda x: x.get("score", 0), reverse=True)[:top_n]


# ── Stage A: Haiku でクロスカテゴリ接続発見 ──────────────────
HAIKU_SYSTEM = """あなたはバズニュース分析の専門家です。
製造業エンジニア管理職（三菱ケミカル、36歳）の視点で情報の接続を発見してください。
必ずJSONのみ返してください。"""

HAIKU_PROMPT = """以下のニュース{n}件から、カテゴリをまたぐ「意外な接続」を3組特定してください。

ニュースリスト（index番号付き）:
{items_json}

以下のJSON配列で返してください（コードブロック不要）:
[
  {{
    "pair": [0, 4],
    "connection": "なぜ関連するか1行",
    "why_now": "なぜ今週このタイミングで重要か1行",
    "business_angle": "製造業エンジニア管理職にとっての具体的な意味"
  }}
]
"""

def find_connections(client: anthropic.Anthropic, items: list[dict]) -> list[dict]:
    """Stage A: Haiku でカテゴリまたぎ接続を発見"""
    items_input = [
        {"index": i, "title": item["title"], "category": item["category"], "score": item["score"]}
        for i, item in enumerate(items)
    ]
    prompt = HAIKU_PROMPT.format(n=len(items), items_json=json.dumps(items_input, ensure_ascii=False))
    try:
        resp = client.messages.create(
            model=HAIKU_MODEL,
            max_tokens=1024,
            system=HAIKU_SYSTEM,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = resp.content[0].text.strip()
        json_match = re.search(r'\[.*\]', raw, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
    except Exception as e:
        print(f"[WARN] Stage A 失敗: {e}")
    return []


# ── Stage B: Sonnet でダイジェスト生成 ───────────────────────
SONNET_SYSTEM = """あなたはF社（三菱ケミカル設備技術部）専属ニュースエディターです。
ユーザー: 36歳・電気エンジニア管理職・電計チームリーダー
視点: 業務直結 > 投資判断 > 社会変化 > 雑学
禁止: 抽象論・「〜かもしれません」・一般論
必須: 数値・固有名詞・今週試せるアクション（断定調）
必ずJSONのみ返してください（コードブロック不要）。"""

SONNET_PROMPT = """以下の情報をもとに日次ダイジェストを生成してください。

## 今日のトップニュース（スコア順）
{items_json}

## クロスカテゴリ接続
{connections_json}

以下のJSON形式で返してください:
{{
  "headline": "今日を20字以内で表すキャッチコピー",
  "tech_summary": "AI/テック動向を3-5行。製品名・数値必須",
  "business_summary": "経済/ビジネス動向を3行",
  "japan_domestic": "日本国内ニュースを2-3行",
  "trend_summary": "X/コミュニティトレンドを2行",
  "cross_connections": [
    {{"title": "接続タイトル", "insight": "インサイト1行", "why_now": "なぜ今1行"}}
  ],
  "action_today": "今日試せるアクション1つ（断定調・具体的・50字以内）",
  "sources_used": [
    {{"title": "記事タイトル（短縮可）", "url": "...", "score": 82}}
  ]
}}
"""

def generate_digest(client: anthropic.Anthropic, items: list[dict], connections: list[dict]) -> dict:
    """Stage B: Sonnet でダイジェストJSON生成"""
    items_input = [
        {"title": item["title"], "category": item["category"],
         "score": item["score"], "source": item.get("source_name", item.get("source", "")),
         "url": item["url"]}
        for item in items
    ]
    prompt = SONNET_PROMPT.format(
        items_json=json.dumps(items_input, ensure_ascii=False),
        connections_json=json.dumps(connections, ensure_ascii=False),
    )
    resp = client.messages.create(
        model=SONNET_MODEL,
        max_tokens=2048,
        system=SONNET_SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = resp.content[0].text.strip()
    json_match = re.search(r'\{.*\}', raw, re.DOTALL)
    if not json_match:
        raise ValueError(f"JSONオブジェクトが見つかりません: {raw[:200]!r}")
    return json.loads(json_match.group())


# ── Markdown 生成 ─────────────────────────────────────────────
def render_markdown(digest: dict, items: list[dict], date_str: str) -> str:
    headline = digest.get("headline", "")
    today_dt = datetime.strptime(date_str, "%Y-%m-%d").strftime("%Y年%m月%d日")

    lines = [
        "---",
        f'title: "トレンドダイジェスト {date_str}"',
        f'category: "AI活用"',
        f'level: "draft"',
        f'created: "{date_str}"',
        f'last_reviewed: "{date_str}"',
        f'understanding_score: 1',
        f'source: "trending-news/news.json → Claude自動生成"',
        f'tags: ["trending", "daily-digest", "news-curation"]',
        "---",
        "",
        f"# トレンドダイジェスト {today_dt}",
        "",
        f"> {headline}",
        "",
        "## AI / テック",
        digest.get("tech_summary", ""),
        "",
        "## 経済 / ビジネス",
        digest.get("business_summary", ""),
        "",
        "## 日本国内",
        digest.get("japan_domestic", ""),
        "",
        "## トレンド",
        digest.get("trend_summary", ""),
        "",
        "## クロス接続の発見",
        "",
        "| 接続 | インサイト | なぜ今 |",
        "|------|-----------|-------|",
    ]

    for conn in digest.get("cross_connections", []):
        title   = conn.get("title", "")
        insight = conn.get("insight", "")
        why_now = conn.get("why_now", "")
        lines.append(f"| {title} | {insight} | {why_now} |")

    lines += [
        "",
        "## 今日のアクション",
        "",
        f"**→ {digest.get('action_today', '')}**",
        "",
        "## ソース（上位20件）",
        "",
        "| タイトル | ソース | スコア |",
        "|---------|--------|--------|",
    ]

    for s in (digest.get("sources_used") or [])[:20]:
        title = s.get("title", "")
        url   = s.get("url", "")
        score = s.get("score", 0)
        lines.append(f"| [{title}]({url}) | — | {score} |")

    lines += ["", "---", f"*生成日時: {datetime.now(JST).strftime('%Y-%m-%d %H:%M JST')}*", ""]
    return "\n".join(lines)


# ── メイン ────────────────────────────────────────────────────
def main() -> None:
    parser = argparse.ArgumentParser(description="Trending News Digest Generator")
    parser.add_argument("--dry-run",    action="store_true", help="API不使用（構造確認）")
    parser.add_argument("--date",       default="",          help="出力日付 YYYY-MM-DD（省略=今日）")
    parser.add_argument("--regenerate", action="store_true", help="既存ファイルを上書き")
    args = parser.parse_args()

    date_str = args.date or datetime.now(JST).strftime("%Y-%m-%d")
    output_path = OUTPUT_DIR / f"{date_str}-trending.md"
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if output_path.exists() and not args.regenerate:
        print(f"[SKIP] 既存ファイルあり: {output_path}")
        print("  上書きするには --regenerate を指定してください")
        return

    items = load_news(top_n=20)
    print(f"ニュース読み込み: {len(items)} 件 (top by score)")

    if args.dry_run:
        print("[DRY-RUN] 以下の記事でダイジェストを生成する予定:")
        for i, item in enumerate(items):
            print(f"  {i+1:2d}. [{item['score']:3d}] {item.get('source_name',''):14s} {item['title'][:55]}")
        mock_digest = {
            "headline": "（dry-run）",
            "tech_summary": "（dry-run）",
            "business_summary": "（dry-run）",
            "japan_domestic": "（dry-run）",
            "trend_summary": "（dry-run）",
            "cross_connections": [{"title": "接続例", "insight": "インサイト", "why_now": "なぜ今"}],
            "action_today": "（dry-run）",
            "sources_used": [],
        }
        md = render_markdown(mock_digest, items, date_str)
        print("\n--- MARKDOWN プレビュー（先頭30行）---")
        print("\n".join(md.splitlines()[:30]))
        return

    if not API_KEY:
        print("[ERROR] ANTHROPIC_API_KEY が設定されていません")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=API_KEY)

    print("Stage A: Haiku でクロスカテゴリ接続を発見中...")
    connections = find_connections(client, items)
    print(f"  接続 {len(connections)} 組 発見")

    print("Stage B: Sonnet でダイジェストを生成中...")
    digest = generate_digest(client, items, connections)

    md = render_markdown(digest, items, date_str)
    output_path.write_text(md, encoding="utf-8")
    print(f"保存完了: {output_path}")


if __name__ == "__main__":
    main()
