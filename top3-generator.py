#!/usr/bin/env python3
"""
top3-generator.py - Monday TOP3 Fixation Skill実装

月曜08:00に前週のTODO進捗を分析し、今週のTOP3を自動生成・固定化する。

実行:
  python top3-generator.py
  python top3-generator.py --dry-run
  python top3-generator.py --previous-week 2026-04-13
"""

import argparse
import json
import logging
import os
import re
import sys
import time
from datetime import date, timedelta, datetime
from pathlib import Path
from typing import Optional, Dict, List, Any
import shutil
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
LOGS_DIR = SECRETARY_DIR / "logs"
DIGITAL_TWIN_DIR = SECRETARY_DIR / "digital-twin"
LOGS_DIR.mkdir(exist_ok=True)

MODEL_HAIKU = "claude-haiku-4-5-20251001"
MODEL_SONNET = "claude-sonnet-4-6"
API_TIMEOUT_SEC = 30

# ─── ロギング設定 ───────────────────────────────────────

LOG_FILE = LOGS_DIR / "top3-monday.log"


def setup_logger():
    """ファイル + stdout へのハイブリッドロギング"""
    logger = logging.getLogger("top3-generator")
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


def call_with_retry(
    client: anthropic.Anthropic,
    model: str,
    system_prompt: str,
    user_prompt: str,
    max_retries: int = 3
) -> str:
    for attempt in range(1, max_retries + 1):
        try:
            response = client.messages.create(
                model=model,
                max_tokens=2000,
                timeout=API_TIMEOUT_SEC,
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
                logger.error(f"API timeout after {max_retries} retries")
                raise

        except anthropic.APIConnectionError as e:
            logger.error(f"API connection error: {e}")
            raise

        except anthropic.APIError as e:
            logger.error(f"API error: {e}")
            raise

    raise RuntimeError("Unexpected: loop completed without return")


def parse_json_with_fallback(response_text: str, fallback: Optional[Dict] = None) -> Dict:
    """JSONパース。コードフェンス除去後にパース試行"""
    if fallback is None:
        fallback = {}

    # コードフェンス除去 (```json ... ``` or ``` ... ```)
    text = response_text.strip()
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        logger.error(f"Response (first 300 chars): {response_text[:300]}")
        logger.warning("Using fallback value")
        return fallback


# ─── Phase 1: TODOデータ収集 ───────────────────────────────


def collect_previous_week_todos(week_start: date) -> Dict:
    """前週（week_start ～ week_start+6）のTODOファイルを収集・解析"""
    all_tasks = []
    files_found = []
    completed_count = 0
    total_count = 0

    for i in range(7):
        target_date = week_start + timedelta(days=i)
        filepath = TODOS_DIR / f"{target_date.isoformat()}.md"

        if not filepath.exists():
            continue

        files_found.append(str(filepath))
        content = filepath.read_text(encoding="utf-8", errors="replace")

        # タスク抽出 (- [ ] / - [x])
        tasks = re.findall(r'- \[([ x])\] (.+)', content)
        for done, task_text in tasks:
            is_done = done.lower() == 'x'
            task_obj = {
                "text": task_text.strip(),
                "done": is_done,
                "date": target_date.isoformat(),
            }

            # 優先度抽出
            if "優先度: 高" in task_text:
                task_obj["priority"] = "high"
            elif "優先度: 低" in task_text:
                task_obj["priority"] = "low"
            else:
                task_obj["priority"] = "normal"

            # 期限抽出
            deadline_match = re.search(r'期限: (\d{4}-\d{2}-\d{2})', task_text)
            if deadline_match:
                task_obj["deadline"] = deadline_match.group(1)

            all_tasks.append(task_obj)
            total_count += 1
            if is_done:
                completed_count += 1

    completion_rate = (completed_count / total_count * 100) if total_count > 0 else 0.0

    return {
        "all_tasks": all_tasks,
        "files": files_found,
        "total_count": total_count,
        "completed_count": completed_count,
        "completion_rate": round(completion_rate, 1),
        "week_start": week_start.isoformat(),
        "week_end": (week_start + timedelta(days=6)).isoformat(),
    }


# ─── Phase 2: Haiku分析 ─────────────────────────────────


def run_haiku_analysis(todos_data: Dict) -> Dict:
    """前週TODOをHaikuで分析し、傾向・課題を抽出する"""
    logger.info("Phase 1 (Haiku): Starting analysis...")
    client = check_api_key()

    tasks_summary = "\n".join([
        f"- [{'x' if t['done'] else ' '}] {t['text']} (優先度:{t['priority']})"
        for t in todos_data["all_tasks"]
    ])

    system_prompt = """あなたはタスク分析の専門家です。
前週のTODOリストを分析し、以下のJSON形式で回答してください。
マークダウンのコードブロックは不要。JSONのみ出力してください。"""

    user_prompt = f"""前週（{todos_data['week_start']} ～ {todos_data['week_end']}）のTODOリスト:

{tasks_summary}

完了率: {todos_data['completion_rate']}% ({todos_data['completed_count']}/{todos_data['total_count']})

以下のJSON形式で分析結果を返してください:
{{
  "completion_rate": {todos_data['completion_rate']},
  "priority_distribution": {{"high": 0, "normal": 0, "low": 0}},
  "overdue_count": 0,
  "deadline_critical_count": 0,
  "categories": ["カテゴリ1", "カテゴリ2"],
  "top_challenges": ["課題1", "課題2"],
  "incomplete_important_tasks": ["未完了重要タスク1"],
  "patterns": "繰り返しパターンの説明"
}}"""

    fallback = {
        "completion_rate": todos_data["completion_rate"],
        "priority_distribution": {"high": 0, "normal": todos_data["total_count"], "low": 0},
        "overdue_count": 0,
        "deadline_critical_count": 0,
        "categories": ["未分類"],
        "top_challenges": ["データ不足"],
        "incomplete_important_tasks": [],
        "patterns": "分析失敗",
    }

    response_text = call_with_retry(client, MODEL_HAIKU, system_prompt, user_prompt)
    result = parse_json_with_fallback(response_text, fallback)

    logger.info(f"✓ Haiku analysis complete: {result.get('completion_rate', 0)}% completion")
    return result


# ─── Phase 3: Sonnetスコアリング ─────────────────────────


def run_sonnet_scoring(haiku_analysis: Dict, todos_data: Dict) -> Dict:
    """Haiku分析結果をもとにSonnetでTOP3をスコアリング・決定する"""
    logger.info("Phase 2 (Sonnet): Scoring & prioritization...")
    client = check_api_key()

    # CLAUDE.md から行動原則を要約
    claude_md_summary = """
ユーザープロフィール:
- 電気エンジニア管理職・電計チームリーダー（三菱ケミカル、36歳）
- 優先度: 設備投資 > チーム育成 > 電験3種 > AI活用
- 電験3種受験準備中（2026年受験予定）
- 合理主義・実務重視・結論先"""

    challenges_text = "\n".join([f"- {c}" for c in haiku_analysis.get("top_challenges", [])])
    incomplete_text = "\n".join([f"- {t}" for t in haiku_analysis.get("incomplete_important_tasks", [])])

    system_prompt = """あなたはタスク優先度決定の専門家です。
5軸スコアリング（各10点満点）でTOP3タスクを選定し、JSON形式のみで回答してください。
スコアリング軸:
1. 期限緊急度 (10点): 残り日数が少ないほど高得点
2. 業務インパクト (10点): 設備停止影響 > チーム進捗 > 個人 > 学習
3. 学習効果 (10点): 電験・AI・電気計装の横展可能性
4. 完了難度 (10点): 低いほど高得点（実行確率）
5. 継続性 (10点): 積み残しほど高得点
JSONのみ出力、コードブロック不要。"""

    user_prompt = f"""前週分析結果:
- 完了率: {haiku_analysis.get('completion_rate', 0)}%
- カテゴリ: {', '.join(haiku_analysis.get('categories', []))}
- 主な課題:
{challenges_text}
- 重要な未完了タスク:
{incomplete_text}
- パターン: {haiku_analysis.get('patterns', '')}

{claude_md_summary}

今週（来週月曜基準）のTOP3タスクを選定してください:
{{
  "top3": [
    {{
      "rank": 1,
      "task": "タスク名",
      "score": 42,
      "score_breakdown": {{"deadline": 8, "impact": 9, "learning": 7, "difficulty": 9, "continuity": 9}},
      "rationale": "選定理由（1-2文）",
      "estimated_hours": 2,
      "category": "カテゴリ"
    }}
  ],
  "notes": "今週の全体コメント",
  "at_risk_tasks": ["要注意タスク"]
}}"""

    fallback = {
        "top3": [
            {
                "rank": 1,
                "task": "手動でTOP3を設定してください",
                "score": 0,
                "score_breakdown": {"deadline": 0, "impact": 0, "learning": 0, "difficulty": 0, "continuity": 0},
                "rationale": "APIスコアリング失敗のためフォールバック",
                "estimated_hours": 1,
                "category": "未分類",
            }
        ],
        "notes": "スコアリング失敗。手動でTOP3を設定してください。",
        "at_risk_tasks": [],
    }

    response_text = call_with_retry(client, MODEL_SONNET, system_prompt, user_prompt)
    result = parse_json_with_fallback(response_text, fallback)

    logger.info(f"✓ Sonnet scoring complete: {len(result.get('top3', []))} candidates")
    return result


# ─── Phase 4: TODOファイル生成 ──────────────────────────


def generate_todo_file(today: date, haiku_analysis: Dict, sonnet_scoring: Dict) -> str:
    """TOP3スコアリング結果からTODOファイルを生成する"""
    now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    top3 = sonnet_scoring.get("top3", [])

    lines = [
        "---",
        f"date: {today.isoformat()}",
        "type: todo",
        "top3_auto_generated: true",
        f"generated_at: {now}",
        f"completion_rate_prev_week: {haiku_analysis.get('completion_rate', 0)}",
        "---",
        "",
        f"# {today.isoformat()} （月曜日）",
        "",
        "## 最優先 [P1: 必須]",
        "",
    ]

    for item in top3:
        rank = item.get("rank", "?")
        task = item.get("task", "不明")
        score = item.get("score", 0)
        rationale = item.get("rationale", "")
        est_hours = item.get("estimated_hours", "?")
        category = item.get("category", "未分類")

        lines += [
            f"### {rank}. {task}",
            f"- [ ] 実施 | 優先度: 高 | カテゴリ: {category}",
            f"  - スコア: {score}/50 | 見積: {est_hours}h",
            f"  - 理由: {rationale}",
            "",
        ]

    lines += [
        "## 通常 [P2: 予定]",
        "",
        "- [ ] （手動入力）",
        "",
        "## 余裕があれば [P3: オプション]",
        "",
        "- [ ] （手動入力）",
        "",
        "---",
        "",
        "## 進捗メモ",
        "",
        "> （随時記入）",
        "",
        "## 金曜振り返りチェックリスト",
        "",
        f"- [ ] P1-1「{top3[0]['task'] if top3 else '?'}」完了確認",
        f"- [ ] P1-2「{top3[1]['task'] if len(top3) > 1 else '?'}」完了確認",
        f"- [ ] P1-3「{top3[2]['task'] if len(top3) > 2 else '?'}」完了確認",
        "- [ ] 未完了タスクを来週に繰り越し or キャンセル判断",
        "",
        "---",
        "",
        f"*TOP3自動生成 by top3-generator.py ({now})*",
        f"*前週完了率: {haiku_analysis.get('completion_rate', 0)}%*",
        f"*全体メモ: {sonnet_scoring.get('notes', '')}*",
    ]

    return "\n".join(lines)


def safe_write_todo_file(filepath: Path, content: str) -> bool:
    """バックアップ付き安全書き込み"""
    try:
        if filepath.exists():
            backup = filepath.with_suffix(".md.bak")
            shutil.copy2(filepath, backup)
            logger.info(f"Backup created: {backup}")

        filepath.write_text(content, encoding="utf-8")
        logger.info(f"✓ Written: {filepath}")
        return True

    except Exception as e:
        logger.error(f"✗ Failed to write {filepath}: {e}")
        return False


# ─── メイン ────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description="Monday TOP3 Fixation Generator")
    parser.add_argument("--dry-run", action="store_true", help="APIを呼ぶが、ファイル書き込みのみスキップ")
    parser.add_argument("--previous-week", type=str, help="分析対象週の開始日（YYYY-MM-DD）")

    args = parser.parse_args()

    today = date.today()
    if args.previous_week:
        week_start = date.fromisoformat(args.previous_week)
    else:
        days_since_monday = today.weekday()
        if days_since_monday == 0:
            week_start = today - timedelta(days=7)
        else:
            week_start = today - timedelta(days=days_since_monday + 7)

    logger.info("=" * 60)
    logger.info("TOP3 Fixation: STARTED")
    logger.info("=" * 60)
    logger.info(f"分析対象: {week_start.isoformat()} ～ {(week_start + timedelta(days=6)).isoformat()}")
    logger.info(f"実行日: {today.isoformat()}")

    start_time = time.time()

    try:
        logger.info("\n[Phase 1] Collecting previous week todos...")
        todos_data = collect_previous_week_todos(week_start)
        logger.info(f"✓ Analyzed {len(todos_data['all_tasks'])} tasks from {len(todos_data['files'])} files")

        logger.info("\n[Phase 2] Running Haiku analysis...")
        haiku_analysis = run_haiku_analysis(todos_data)

        logger.info("\n[Phase 3] Running Sonnet scoring...")
        sonnet_scoring = run_sonnet_scoring(haiku_analysis, todos_data)

        logger.info("\n[Phase 4] Generating todo file...")
        todo_content = generate_todo_file(today, haiku_analysis, sonnet_scoring)

        if args.dry_run:
            logger.info("\n[DRY-RUN] Would write to:")
            logger.info(f"  {TODOS_DIR / f'{today.isoformat()}.md'}")
            logger.info("\n--- Content Preview (first 500 chars) ---")
            logger.info(todo_content[:500])
        else:
            success = safe_write_todo_file(TODOS_DIR / f"{today.isoformat()}.md", todo_content)
            if not success:
                raise RuntimeError("Failed to write todo file")

        elapsed = round(time.time() - start_time, 1)
        logger.info("")
        logger.info("=" * 60)
        logger.info(f"TOP3 Fixation: SUCCESS ({elapsed}s)")
        logger.info("=" * 60)

        if sonnet_scoring.get("top3"):
            for item in sonnet_scoring["top3"]:
                logger.info(f"  P{item['rank']}: {item['task']} (score={item['score']})")

    except Exception as e:
        logger.error("")
        logger.error("=" * 60)
        logger.error("TOP3 Fixation: FAILED")
        logger.error("=" * 60)
        logger.error(f"Error: {e}")
        logger.debug(traceback.format_exc())
        sys.exit(1)


if __name__ == "__main__":
    main()
