"""
AI News Idea Generator
======================
news.json からニュースを抽出し、Haiku + Sonnet 2段階パイプラインで
6カテゴリの革新アイデアを生成する。

処理フロー:
  Stage A (Haiku): 多様性選抜 + 掛け合わせクラスタ抽出
  Stage B (Sonnet): 6カテゴリのアイデア創発
  → ideas.json + knowledge/ideas-from-news/YYYY-MM-DD.md に保存

使い方:
  py idea_generator.py              # 通常実行
  py idea_generator.py --dry-run    # APIスキップ、ダミーアイデア生成
  py idea_generator.py --regenerate # 当日分を上書き再生成
"""

import json
import os
import sys
import logging
import argparse
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path

try:
    import anthropic
    from dotenv import load_dotenv
except ImportError as e:
    print(f"[ERROR] 必要なパッケージが不足しています: {e}")
    print("  pip install anthropic python-dotenv")
    sys.exit(1)

# ──────────────────────────────────────────────
# 設定読み込み
# ──────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"

load_dotenv((SCRIPT_DIR / ".env").resolve(), override=True)

with open(CONFIG_PATH, encoding="utf-8") as f:
    CFG = json.load(f)

API_KEY        = CFG.get("anthropic_api_key") or os.environ.get("ANTHROPIC_API_KEY", "")
MODEL_CLUSTER  = CFG.get("model_idea_cluster", "claude-haiku-4-5-20251001")
MODEL_IDEA     = CFG.get("model_idea", "claude-sonnet-4-6")
NEWS_JSON      = Path(CFG.get("news_json_path", str(SCRIPT_DIR / "news.json")))
IDEAS_JSON     = Path(CFG.get("ideas_json_path", str(SCRIPT_DIR / "ideas.json")))
OBSIDIAN_DIR   = Path(CFG.get("ideas_obsidian_dir",
                               str(SCRIPT_DIR.parent / "knowledge" / "ideas-from-news")))
POOL_SIZE      = int(CFG.get("idea_news_pool_size", 12))

# ──────────────────────────────────────────────
# ログ設定
# ──────────────────────────────────────────────
log = logging.getLogger("idea_generator")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)

# ──────────────────────────────────────────────
# 1. ニュース多様性選抜（Python決定論）
# ──────────────────────────────────────────────
JST = timezone(timedelta(hours=9))

def select_diverse_news(news_items: list[dict], n: int = POOL_SIZE) -> list[dict]:
    """直近7日のscore>=3から、ai_categoryとsourceで分散させてn件選抜"""
    now = datetime.now(tz=JST)
    cutoff = now - timedelta(days=7)

    recent = []
    for item in news_items:
        pub_str = item.get("published", "")
        if not pub_str:
            continue
        try:
            pub = datetime.fromisoformat(pub_str.replace("Z", "+00:00"))
            if pub.tzinfo is None:
                pub = pub.replace(tzinfo=JST)
            if pub >= cutoff and (item.get("score") or 0) >= 3:
                recent.append(item)
        except Exception:
            continue

    if not recent:
        recent = [i for i in news_items if (i.get("score") or 0) >= 2][:n * 2]

    # カテゴリ・ソース別にラウンドロビン
    by_cat: dict[str, list[dict]] = {}
    for item in recent:
        cat = item.get("ai_category") or item.get("category") or "未分類"
        by_cat.setdefault(cat, []).append(item)

    selected: list[dict] = []
    queues = list(by_cat.values())
    i = 0
    while len(selected) < n and any(queues):
        q = queues[i % len(queues)]
        if q:
            selected.append(q.pop(0))
        i += 1

    log.info(f"select_diverse_news: {len(recent)}件から{len(selected)}件選抜")
    return selected[:n]

# ──────────────────────────────────────────────
# 2. Stage A: Haikuでクラスタ抽出
# ──────────────────────────────────────────────
def cluster_news_haiku(client: anthropic.Anthropic, news_subset: list[dict]) -> str:
    """Haikuでニュース同士の面白い掛け合わせペア・視点を抽出してSonnetへのコンテキストとして返す"""
    items_text = "\n".join([
        f"[{i}] {item.get('title','')}: {(item.get('ja_summary','') or item.get('summary',''))[:120]}"
        for i, item in enumerate(news_subset)
    ])

    prompt = f"""以下の{len(news_subset)}件のAIニュースから、「掛け合わせると面白い」ペアや共通テーマを5-6組特定してください。

{items_text}

JSON配列で返してください（コードブロック不要）:
[
  {{"indices": [0, 3], "theme": "なぜこの組み合わせが面白いかを1行で", "angle": "驚き発見|日常応用|個人成長|仕事好転|Claude Code改善|クロスドメイン のどれかに近いか"}},
  ...
]"""

    resp = client.messages.create(
        model=MODEL_CLUSTER,
        max_tokens=600,
        messages=[{"role": "user", "content": prompt}],
    )
    return resp.content[0].text.strip()

# ──────────────────────────────────────────────
# 3. Stage B: Sonnetで6カテゴリアイデア創発
# ──────────────────────────────────────────────
IDEA_SYSTEM = """あなたはF社のAI社員チームの集合知です。以下5名の視点を自由に組み合わせて発想します。

【F社AI社員の視点】
- マンガー: メンタルモデル横展。異分野の概念を掛け算する
- ホリエモン: 今日から動ける具体行動。小さく速く試す
- 池谷裕二: 脳科学・行動変容。習慣化・記憶定着の角度
- 落合陽一: AI workflow・Claude Codeの使い方ジャンプ
- 明石家さんま: 「思わず誰かに話したくなる」驚き角度

【ユーザー前提】
- 36歳・電気エンジニア管理職・三菱ケミカル設備技術部・電計チームリーダー
- 思考: 合理主義・実務重視・結論先・抽象論嫌い
- アクションは断定調・数値付き・今日から実行可能
- 禁止: 「させていただく」「なるべく」「努力します」"""

def generate_ideas_sonnet(
    client: anthropic.Anthropic,
    news_subset: list[dict],
    cluster_context: str,
) -> list[dict]:
    """Sonnetで6カテゴリのアイデアを生成"""
    items_text = "\n".join([
        f"[{i}] title={item.get('title','')} | summary={((item.get('ja_summary','') or item.get('summary',''))[:150])}"
        for i, item in enumerate(news_subset)
    ])

    prompt = f"""以下のニュースリストとクラスタ分析をもとに、6カテゴリのアイデアを各1個生成してください。

【ニュース ({len(news_subset)}件)】
{items_text}

【クラスタ分析 (Haiku事前分析)】
{cluster_context}

【6カテゴリ】（各1アイデア、計6個）
1. 🎯 驚き発見: ニュース同士の意外な共通点・対立構造の発見
2. 🏠 日常応用: 36歳エンジニア管理職の日常生活で今日試せること
3. 🌱 個人成長: 学習・スキル獲得・人格形成への応用
4. 💼 仕事好転: 三菱ケミカル設備技術部（電気・計装）業務での活用
5. 🤖 Claude Code改善: Claude CodeやAI workflowの効率化
6. 🔗 クロスドメイン: 全く違う分野同士の予想外の架け橋

JSON配列で返してください（コードブロック不要）:
[
  {{
    "category": "驚き発見",
    "title": "30字以内のキャッチー見出し",
    "summary": "1-2行の要約（80字以内）",
    "hypothesis": "なぜ面白いか・どこが意外か（80-150字）",
    "action": "今日から試せる具体アクション1つ（断定調・数値付き）",
    "source_news_indices": [0, 3],
    "persona_tag": "○○視点"
  }},
  ...（計6個）
]"""

    resp = client.messages.create(
        model=MODEL_IDEA,
        max_tokens=3000,
        system=IDEA_SYSTEM,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = resp.content[0].text.strip()
    log.debug(f"Sonnet raw: {raw[:300]!r}")

    json_match = re.search(r'\[.*\]', raw, re.DOTALL)
    if not json_match:
        raise ValueError(f"JSON配列が見つかりません: {raw[:200]!r}")
    ideas = json.loads(json_match.group())

    now_str = datetime.now(tz=JST).strftime("%Y%m%d")
    for i, idea in enumerate(ideas):
        idea["id"] = f"{now_str}-{i+1:02d}"
        idea["saved_at"] = datetime.now(tz=JST).isoformat()
        # source_news_indices → 実際のURLに変換
        indices = idea.pop("source_news_indices", [])
        idea["source_news"] = [
            {"title": news_subset[idx].get("title", ""), "url": news_subset[idx].get("url", "")}
            for idx in indices if idx < len(news_subset)
        ]

    return ideas

# ──────────────────────────────────────────────
# 4. アイデア保存
# ──────────────────────────────────────────────
CATEGORY_EMOJI = {
    "驚き発見": "🎯",
    "日常応用": "🏠",
    "個人成長": "🌱",
    "仕事好転": "💼",
    "Claude Code改善": "🤖",
    "クロスドメイン": "🔗",
}

def save_ideas_json(ideas: list[dict], regenerate: bool = False) -> None:
    """ideas.json に追記（最新50件保持、id重複除去）"""
    if IDEAS_JSON.exists():
        try:
            data = json.loads(IDEAS_JSON.read_text(encoding="utf-8"))
            existing_list = data.get("ideas", [])
        except Exception:
            existing_list = []
    else:
        existing_list = []

    today_prefix = datetime.now(tz=JST).strftime("%Y%m%d")
    if regenerate:
        # 当日分を削除して上書き
        existing_list = [i for i in existing_list if not i.get("id", "").startswith(today_prefix)]

    existing_ids = {item["id"] for item in existing_list}
    new_items = [i for i in ideas if i["id"] not in existing_ids]

    merged = new_items + existing_list
    merged = merged[:50]  # 最新50件

    output = {
        "generated_at": datetime.now(tz=JST).isoformat(),
        "ideas": merged,
    }
    IDEAS_JSON.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"ideas.json に {len(new_items)}件追加（合計{len(merged)}件）")

def save_to_obsidian(ideas: list[dict], date_str: str) -> None:
    """knowledge/ideas-from-news/YYYY-MM-DD.md を生成"""
    OBSIDIAN_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OBSIDIAN_DIR / f"{date_str}.md"

    sections = []
    for idea in ideas:
        cat = idea.get("category", "")
        emoji = CATEGORY_EMOJI.get(cat, "💡")
        sources = " / ".join([
            f"[{s['title']}]({s['url']})" for s in idea.get("source_news", [])
        ]) or "—"
        sections.append(f"""## {emoji} {cat}: {idea.get('title', '')}
- **要約**: {idea.get('summary', '')}
- **なぜ面白いか**: {idea.get('hypothesis', '')}
- **今日のアクション**: {idea.get('action', '')}
- **元ニュース**: {sources}
- **視点**: {idea.get('persona_tag', '')}""")

    content = f"""---
title: "革新アイデア {date_str}"
category: "AI活用"
level: "draft"
created: "{date_str}"
last_reviewed: "{date_str}"
understanding_score: 1
source: "ai-news/ideas.json"
tags: ["ideas-from-news", "ai-news", "cross-pollination"]
related: []
---

# 革新アイデア {date_str}

> news.json から自動生成。良いものは level: draft → review に更新 → "アイデア書き出し" でNotionへ。

{chr(10).join(chr(10).join(["", s]) for s in sections)}
"""
    out_path.write_text(content, encoding="utf-8")
    log.info(f"Obsidian draft: {out_path}")

# ──────────────────────────────────────────────
# 5. dry-run ダミー生成
# ──────────────────────────────────────────────
DUMMY_IDEAS = [
    {"category": "驚き発見",     "title": "[DRY-RUN] AIと人間の協調パターン発見", "summary": "ダミー要約。", "hypothesis": "ダミー仮説。", "action": "明日10分試す。", "persona_tag": "マンガー視点"},
    {"category": "日常応用",     "title": "[DRY-RUN] 朝の情報整理を5分に圧縮", "summary": "ダミー要約。", "hypothesis": "ダミー仮説。", "action": "明日試す。", "persona_tag": "ホリエモン視点"},
    {"category": "個人成長",     "title": "[DRY-RUN] 電験学習に間隔反復AI活用", "summary": "ダミー要約。", "hypothesis": "ダミー仮説。", "action": "明日試す。", "persona_tag": "池谷視点"},
    {"category": "仕事好転",     "title": "[DRY-RUN] 設備投資稟議AI下書き20分", "summary": "ダミー要約。", "hypothesis": "ダミー仮説。", "action": "明日試す。", "persona_tag": "落合視点"},
    {"category": "Claude Code改善","title":"[DRY-RUN] hooks自動化で作業30%減", "summary": "ダミー要約。", "hypothesis": "ダミー仮説。", "action": "明日試す。", "persona_tag": "落合視点"},
    {"category": "クロスドメイン","title": "[DRY-RUN] 製造業×LLM意外な接点",  "summary": "ダミー要約。", "hypothesis": "ダミー仮説。", "action": "明日試す。", "persona_tag": "マンガー視点"},
]

def make_dummy_ideas() -> list[dict]:
    now_str = datetime.now(tz=JST).strftime("%Y%m%d")
    ideas = []
    for i, base in enumerate(DUMMY_IDEAS):
        idea = dict(base)
        idea["id"] = f"{now_str}-{i+1:02d}"
        idea["saved_at"] = datetime.now(tz=JST).isoformat()
        idea["source_news"] = [{"title": "ダミーニュース", "url": "https://example.com"}]
        ideas.append(idea)
    return ideas

# ──────────────────────────────────────────────
# main
# ──────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="AI News Idea Generator")
    parser.add_argument("--dry-run",    action="store_true", help="APIスキップ、ダミー生成")
    parser.add_argument("--regenerate", action="store_true", help="当日分を上書き再生成")
    args = parser.parse_args()

    today = datetime.now(tz=JST).strftime("%Y-%m-%d")
    obsidian_path = OBSIDIAN_DIR / f"{today}.md"

    if obsidian_path.exists() and not args.regenerate and not args.dry_run:
        log.info(f"本日分は生成済みです: {obsidian_path}  (--regenerate で強制再生成)")
        return

    # news.json 読み込み
    if not NEWS_JSON.exists():
        log.error(f"news.json が見つかりません: {NEWS_JSON}")
        sys.exit(1)
    news_items = json.loads(NEWS_JSON.read_text(encoding="utf-8"))
    log.info(f"news.json: {len(news_items)}件読み込み")

    if args.dry_run:
        log.info("[DRY-RUN] ダミーアイデアを生成します")
        ideas = make_dummy_ideas()
    else:
        if not API_KEY:
            log.error("ANTHROPIC_API_KEY が設定されていません")
            sys.exit(1)
        client = anthropic.Anthropic(api_key=API_KEY)

        # ステップ1: 多様性選抜
        selected = select_diverse_news(news_items, n=POOL_SIZE)
        if len(selected) < 3:
            log.warning(f"選抜件数が少なすぎます（{len(selected)}件）。全ニュースから最新12件を使います")
            selected = news_items[:12]

        # Stage A: Haikuでクラスタ抽出
        log.info(f"Stage A (Haiku): {len(selected)}件のクラスタ抽出中...")
        cluster_ctx = cluster_news_haiku(client, selected)
        log.info(f"Stage A 完了: {cluster_ctx[:100]!r}...")

        # Stage B: Sonnetでアイデア創発
        log.info("Stage B (Sonnet): 6カテゴリアイデア生成中...")
        ideas = generate_ideas_sonnet(client, selected, cluster_ctx)
        log.info(f"Stage B 完了: {len(ideas)}件生成")

    # 保存
    save_ideas_json(ideas, regenerate=args.regenerate)
    save_to_obsidian(ideas, today)

    log.info("完了！")
    log.info(f"  ideas.json:  {IDEAS_JSON}")
    log.info(f"  Obsidian:    {obsidian_path}")

if __name__ == "__main__":
    main()
