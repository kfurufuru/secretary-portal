#!/usr/bin/env python3
"""
friday-review-generator.py - Friday Weekly Review & TOP3 Accuracy Assessment

毎週金曜夜 18:00 に実行。月曜TOP3と週末実績を対比し、
スコアリング精度を評価・学習し、来週のTOP3予測へ反映。

実行:
  python friday-review-generator.py
  python friday-review-generator.py --dry-run
"""

import argparse
import json
import logging
import os
import re
import sys
from datetime import date, timedelta, datetime
from pathlib import Path
from typing import Optional, Dict, List, Any
import time
import traceback

# Windows CP932対策
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr.encoding != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import anthropic

# ─── 設定値 ───────────────────────────────────────────────

SECRETARY_DIR = Path("C:/Users/kfuru/.secretary")
TODOS_DIR = SECRETARY_DIR / "todos"
REVIEWS_DIR = SECRETARY_DIR / "reviews"
LOGS_DIR = SECRETARY_DIR / "logs"
DIGITAL_TWIN_DIR = SECRETARY_DIR / "digital-twin"

LOGS_DIR.mkdir(exist_ok=True)
REVIEWS_DIR.mkdir(exist_ok=True)

MODEL_HAIKU = "claude-haiku-4-5-20251001"
MODEL_SONNET = "claude-sonnet-4-6"

# ─── ロギング設定 ───────────────────────────────────────

LOG_FILE = LOGS_DIR / "friday-review.log"


def setup_logger():
    logger = logging.getLogger("friday-review")
    logger.setLevel(logging.DEBUG)

    fh = logging.FileHandler(LOG_FILE, encoding="utf-8", mode="a")
    fh.setLevel(logging.DEBUG)

    ch = logging.StreamHandler(sys.stdout)
    ch.setLevel(logging.INFO)

    fmt = logging.Formatter('[%(asctime)s] %(levelname)s: %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
    fh.setFormatter(fmt)
    ch.setFormatter(fmt)

    logger.addHandler(fh)
    logger.addHandler(ch)

    return logger


logger = setup_logger()

# ─── ユーティリティ ───────────────────────────────────────


def check_api_key() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        logger.error("ERROR: ANTHROPIC_API_KEY が未設定です")
        sys.exit(1)
    return anthropic.Anthropic(api_key=api_key)


def call_with_retry(client, model: str, system_prompt: str, user_prompt: str, max_retries: int = 3) -> str:
    for attempt in range(1, max_retries + 1):
        try:
            response = client.messages.create(
                model=model,
                max_tokens=2000,
                timeout=30,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            )
            return response.content[0].text

        except anthropic.APITimeoutError:
            if attempt < max_retries:
                wait = 2 ** (attempt - 1)
                logger.warning(f"Timeout (attempt {attempt}/{max_retries}), retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise

        except anthropic.APIError as e:
            logger.error(f"API error: {e}")
            raise

    raise RuntimeError("Loop completed without return")


def parse_json_with_fallback(response_text: str, fallback: Optional[Dict] = None) -> Dict:
    """JSONパース。コードフェンス除去後にパース試行"""
    if fallback is None:
        fallback = {}

    text = response_text.strip()
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        logger.warning("Using fallback value")
        return fallback


# ─── データ収集 ──────────────────────────────────────────


def collect_week_todos(week_monday: date) -> Dict:
    """週のTODOファイルを収集"""
    all_tasks = []
    files_found = []
    completed = 0
    total = 0

    for i in range(7):
        target = week_monday + timedelta(days=i)
        fp = TODOS_DIR / f"{target.isoformat()}.md"
        if not fp.exists():
            continue

        files_found.append(str(fp))
        content = fp.read_text(encoding="utf-8", errors="replace")

        tasks = re.findall(r'- \[([ x])\] (.+)', content)
        for done, text in tasks:
            is_done = done.lower() == 'x'
            all_tasks.append({"text": text.strip(), "done": is_done, "date": target.isoformat()})
            total += 1
            if is_done:
                completed += 1

    return {
        "all_tasks": all_tasks,
        "files": files_found,
        "total": total,
        "completed": completed,
        "completion_rate": round(completed / total * 100, 1) if total > 0 else 0.0,
    }


def load_monday_top3(week_monday: date) -> Dict:
    """月曜日に生成されたTOP3を読み込む"""
    fp = TODOS_DIR / f"{week_monday.isoformat()}.md"
    if not fp.exists():
        return {"top3": [], "found": False}

    content = fp.read_text(encoding="utf-8", errors="replace")

    # TOP3タスク名を抽出 (### 1. タスク名 形式)
    top3_tasks = re.findall(r'### \d+\. (.+)', content)

    return {
        "top3": top3_tasks,
        "found": True,
        "filepath": str(fp),
    }


# ─── Haiku: 週次サマリ生成 ─────────────────────────────


def run_haiku_summary(week_data: Dict, monday_top3: Dict) -> Dict:
    """今週の実績をHaikuで要約"""
    logger.info("Phase 1 (Haiku): Summarizing week...")
    client = check_api_key()

    tasks_text = "\n".join([
        f"- [{'x' if t['done'] else ' '}] {t['text']}"
        for t in week_data["all_tasks"]
    ])
    top3_text = "\n".join([f"{i+1}. {t}" for i, t in enumerate(monday_top3.get("top3", []))])

    system_prompt = """タスク分析専門家として、今週の実績をJSON形式のみで要約してください。
コードブロック不要。JSONのみ出力。"""

    user_prompt = f"""今週のTODO実績:
完了率: {week_data['completion_rate']}% ({week_data['completed']}/{week_data['total']})

月曜日のTOP3予測:
{top3_text if top3_text else '（取得できず）'}

今週のタスク一覧:
{tasks_text[:1500] if tasks_text else '（データなし）'}

以下のJSON形式で要約してください:
{{
  "week_completion_rate": {week_data['completion_rate']},
  "top3_achieved": ["達成したTOP3タスク"],
  "top3_missed": ["未達成のTOP3タスク"],
  "top3_accuracy": 0.0,
  "key_achievements": ["今週の主な成果"],
  "key_blockers": ["主な障害・未完了原因"],
  "carry_over_tasks": ["来週に繰り越すタスク"],
  "week_quality_score": 7
}}"""

    fallback = {
        "week_completion_rate": week_data["completion_rate"],
        "top3_achieved": [],
        "top3_missed": monday_top3.get("top3", []),
        "top3_accuracy": 0.0,
        "key_achievements": ["分析失敗"],
        "key_blockers": ["API応答エラー"],
        "carry_over_tasks": [],
        "week_quality_score": 5,
    }

    resp = call_with_retry(client, MODEL_HAIKU, system_prompt, user_prompt)
    result = parse_json_with_fallback(resp, fallback)
    logger.info(f"✓ Haiku summary: accuracy={result.get('top3_accuracy', 0)}%")
    return result


# ─── Sonnet: 来週TOP3予測 ──────────────────────────────


def run_sonnet_next_week_prediction(summary: Dict, week_data: Dict) -> Dict:
    """今週実績をもとにSonnetで来週TOP3を予測"""
    logger.info("Phase 2 (Sonnet): Predicting next week TOP3...")
    client = check_api_key()

    achievements = "\n".join([f"- {a}" for a in summary.get("key_achievements", [])])
    blockers = "\n".join([f"- {b}" for b in summary.get("key_blockers", [])])
    carry_over = "\n".join([f"- {c}" for c in summary.get("carry_over_tasks", [])])

    system_prompt = """タスク優先度決定の専門家として、来週のTOP3を予測してください。
JSONのみ出力、コードブロック不要。"""

    user_prompt = f"""今週の振り返り:
- 完了率: {summary.get('week_completion_rate', 0)}%
- TOP3達成率: {summary.get('top3_accuracy', 0)}%
- 品質スコア: {summary.get('week_quality_score', 5)}/10
- 主な成果:
{achievements}
- 主な障害:
{blockers}
- 繰り越しタスク:
{carry_over}

ユーザー: 電計チームリーダー（三菱ケミカル）、電験3種受験準備中
優先度軸: 設備投資 > チーム育成 > 電験3種 > AI活用

来週（月曜基準）のTOP3予測:
{{
  "next_week_top3": [
    {{
      "rank": 1,
      "task": "タスク名",
      "rationale": "選定理由",
      "estimated_hours": 2,
      "is_carry_over": false
    }}
  ],
  "scoring_feedback": "今週のスコアリング精度への改善提案",
  "week_summary": "今週の一言総括",
  "risk_items": ["来週の要注意事項"]
}}"""

    fallback = {
        "next_week_top3": [
            {"rank": 1, "task": "手動でTOP3を設定してください", "rationale": "API失敗", "estimated_hours": 1, "is_carry_over": False}
        ],
        "scoring_feedback": "予測失敗",
        "week_summary": "振り返り生成失敗",
        "risk_items": [],
    }

    resp = call_with_retry(client, MODEL_SONNET, system_prompt, user_prompt)
    result = parse_json_with_fallback(resp, fallback)
    logger.info(f"✓ Sonnet prediction: {len(result.get('next_week_top3', []))} tasks")
    return result


# ─── レビューファイル生成 ──────────────────────────────


def generate_review_file(today: date, week_monday: date, summary: Dict, prediction: Dict) -> str:
    now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    next_monday = today + timedelta(days=(7 - today.weekday()))

    lines = [
        "---",
        f"date: {today.isoformat()}",
        "type: weekly-review",
        f"week: {week_monday.isoformat()} ～ {(week_monday + timedelta(days=6)).isoformat()}",
        f"generated_at: {now}",
        f"completion_rate: {summary.get('week_completion_rate', 0)}",
        f"top3_accuracy: {summary.get('top3_accuracy', 0)}",
        "---",
        "",
        f"# 週次振り返り {week_monday.isoformat()} ～ {(week_monday + timedelta(days=6)).isoformat()}",
        "",
        f"> {summary.get('week_summary', '')}",
        "",
        "## 実績サマリ",
        "",
        f"- 完了率: **{summary.get('week_completion_rate', 0)}%**",
        f"- TOP3達成率: **{summary.get('top3_accuracy', 0)}%**",
        f"- 品質スコア: **{summary.get('week_quality_score', 0)}/10**",
        "",
        "## TOP3達成状況",
        "",
        "### 達成 ✓",
    ]

    for t in summary.get("top3_achieved", []):
        lines.append(f"- [x] {t}")

    lines += ["", "### 未達成 ✗", ""]
    for t in summary.get("top3_missed", []):
        lines.append(f"- [ ] {t}")

    lines += [
        "",
        "## 主な成果",
        "",
    ]
    for a in summary.get("key_achievements", []):
        lines.append(f"- {a}")

    lines += [
        "",
        "## 主な障害",
        "",
    ]
    for b in summary.get("key_blockers", []):
        lines.append(f"- {b}")

    lines += [
        "",
        "## 来週繰り越し",
        "",
    ]
    for c in summary.get("carry_over_tasks", []):
        lines.append(f"- [ ] {c}")

    lines += [
        "",
        "---",
        "",
        f"## 来週TOP3予測（{next_monday.isoformat()} 月曜日）",
        "",
    ]

    for item in prediction.get("next_week_top3", []):
        carry = "（繰り越し）" if item.get("is_carry_over") else ""
        lines += [
            f"### {item['rank']}. {item['task']} {carry}",
            f"- 理由: {item.get('rationale', '')}",
            f"- 見積: {item.get('estimated_hours', '?')}h",
            "",
        ]

    lines += [
        "### スコアリング改善メモ",
        "",
        f"> {prediction.get('scoring_feedback', '')}",
        "",
        "### 要注意事項",
        "",
    ]
    for r in prediction.get("risk_items", []):
        lines.append(f"- ⚠️ {r}")

    lines += [
        "",
        "---",
        "",
        f"*自動生成 by friday-review-generator.py ({now})*",
    ]

    return "\n".join(lines)


# ─── メイン ────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description="Friday Weekly Review Generator")
    parser.add_argument("--dry-run", action="store_true", help="APIを呼ぶが、ファイル書き込みのみスキップ")
    parser.add_argument("--week-start", type=str, help="対象週の月曜日（YYYY-MM-DD）")

    args = parser.parse_args()

    today = date.today()
    if args.week_start:
        week_monday = date.fromisoformat(args.week_start)
    else:
        days_since_monday = today.weekday()
        week_monday = today - timedelta(days=days_since_monday)

    logger.info("=" * 60)
    logger.info("Friday Review: STARTED")
    logger.info("=" * 60)
    logger.info(f"対象週: {week_monday.isoformat()} ～ {(week_monday + timedelta(days=6)).isoformat()}")
    logger.info(f"実行日: {today.isoformat()}")

    start_time = time.time()

    try:
        logger.info("\n[Phase 1] Collecting week todos...")
        week_data = collect_week_todos(week_monday)
        logger.info(f"✓ {week_data['completed']}/{week_data['total']} tasks ({week_data['completion_rate']}%)")

        logger.info("\n[Phase 2] Loading Monday TOP3...")
        monday_top3 = load_monday_top3(week_monday)
        logger.info(f"✓ Monday TOP3: {'found' if monday_top3['found'] else 'not found'}")

        logger.info("\n[Phase 3] Running Haiku summary...")
        summary = run_haiku_summary(week_data, monday_top3)

        logger.info("\n[Phase 4] Running Sonnet next-week prediction...")
        prediction = run_sonnet_next_week_prediction(summary, week_data)

        logger.info("\n[Phase 5] Generating review file...")
        review_content = generate_review_file(today, week_monday, summary, prediction)

        output_path = REVIEWS_DIR / f"{today.isoformat()}-weekly-review.md"

        if args.dry_run:
            logger.info(f"\n[DRY-RUN] Would write to: {output_path}")
            logger.info("\n--- Preview (first 400 chars) ---")
            logger.info(review_content[:400])
        else:
            output_path.write_text(review_content, encoding="utf-8")
            logger.info(f"✓ Written: {output_path}")

        elapsed = round(time.time() - start_time, 1)
        logger.info("")
        logger.info("=" * 60)
        logger.info(f"Friday Review: SUCCESS ({elapsed}s)")
        logger.info("=" * 60)

    except Exception as e:
        logger.error("")
        logger.error("=" * 60)
        logger.error("Friday Review: FAILED")
        logger.error("=" * 60)
        logger.error(f"Error: {e}")
        logger.debug(traceback.format_exc())
        sys.exit(1)


if __name__ == "__main__":
    main()
