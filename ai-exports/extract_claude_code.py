#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Claude Code セッションログ → 知識昇格スクリプト
~/.claude/projects/C--Users-kfuru--secretary/*.jsonl を解析し
知識候補をMarkdownとして ai-exports/processed/ に出力する

使い方:
  py ai-exports/extract_claude_code.py           # 全セッション
  py ai-exports/extract_claude_code.py --days 7  # 過去7日分
  py ai-exports/extract_claude_code.py --show    # 候補一覧だけ表示
"""

import json
import os
import re
import sys
import argparse
from datetime import datetime, timedelta, timezone
from pathlib import Path
from collections import defaultdict

# Windows端末の文字化け対策
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

SESSIONS_DIR = Path.home() / ".claude" / "projects" / "C--Users-kfuru--secretary"
OUTPUT_DIR = Path(__file__).parent / "processed"

# 知識として価値が高いキーワード（ユーザー発言に含まれると候補に上がる）
KNOWLEDGE_SIGNALS = [
    # 電験3種
    "電験", "理論", "電力", "機械", "法規", "インピーダンス", "リアクタンス",
    "変圧器", "誘導電動機", "同期機", "電技", "接地", "保護継電器",
    # 電気計装
    "計装", "PLC", "DCS", "SCADA", "インバータ", "防爆", "ノイズ",
    "シーケンス", "ラダー", "4-20mA", "センサー", "フィールドバス",
    # AI活用
    "プロンプト", "Claude", "ChatGPT", "自動化", "スクリプト", "API",
    "エージェント", "ナレッジ", "secretary", "スキル",
    # マネジメント
    "育成", "評価", "OJT", "部下", "チーム", "改善", "カイゼン",
    # 設備管理
    "設備投資", "仕様", "保全", "稟議", "メーカー", "トラブル",
]

# スキップすべき短い・無意味な発言
SKIP_PATTERNS = [
    r"^(ok|OK|はい|いいえ|ありがとう|了解|わかった|保存|実装|お願い)[\。\.]?$",
    r"^.{1,10}$",  # 10文字以下
]


def load_session(filepath: Path) -> list[dict]:
    """1つのJSONLファイルからメッセージを抽出"""
    messages = []
    try:
        with open(filepath, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    d = json.loads(line)
                    if d.get("type") in ("user", "assistant"):
                        msg = d.get("message", {})
                        role = msg.get("role", "")
                        content = msg.get("content", "")

                        # contentがリストの場合（tool_use等）はテキストのみ抽出
                        if isinstance(content, list):
                            text_parts = []
                            for block in content:
                                if isinstance(block, dict):
                                    if block.get("type") == "text":
                                        text_parts.append(block.get("text", ""))
                            content = " ".join(text_parts)

                        if role and isinstance(content, str) and content.strip():
                            messages.append({
                                "role": role,
                                "content": content.strip(),
                                "timestamp": d.get("timestamp", ""),
                            })
                except json.JSONDecodeError:
                    continue
    except Exception as e:
        pass
    return messages


def get_session_date(filepath: Path) -> str:
    """セッションの最初のタイムスタンプを取得"""
    try:
        with open(filepath, encoding="utf-8") as f:
            for line in f:
                try:
                    d = json.loads(line.strip())
                    if "timestamp" in d:
                        return d["timestamp"][:10]
                except:
                    continue
    except:
        pass
    return "0000-00-00"


def is_knowledge_worthy(text: str) -> tuple[bool, list[str]]:
    """テキストが知識候補かどうか判定し、マッチしたキーワードを返す"""
    # スキップパターン
    for pattern in SKIP_PATTERNS:
        if re.match(pattern, text, re.IGNORECASE):
            return False, []

    matched = [kw for kw in KNOWLEDGE_SIGNALS if kw in text]
    return len(matched) > 0, matched


def infer_category(keywords: list[str], content: str) -> str:
    """マッチしたキーワードからカテゴリを推定"""
    denken_kw = {"電験", "理論", "電力", "機械", "法規", "インピーダンス",
                 "リアクタンス", "変圧器", "誘導電動機", "同期機", "電技", "接地", "保護継電器"}
    ei_kw = {"計装", "PLC", "DCS", "SCADA", "インバータ", "防爆", "ノイズ",
             "シーケンス", "ラダー", "4-20mA", "センサー"}
    ai_kw = {"プロンプト", "Claude", "ChatGPT", "自動化", "スクリプト",
             "API", "エージェント", "ナレッジ", "secretary", "スキル"}
    mgmt_kw = {"育成", "評価", "OJT", "部下", "チーム"}
    facility_kw = {"設備投資", "仕様", "保全", "稟議", "メーカー", "トラブル"}

    kw_set = set(keywords)
    if kw_set & denken_kw:
        return "電験3種"
    if kw_set & ei_kw:
        return "電気計装"
    if kw_set & ai_kw:
        return "AI活用"
    if kw_set & mgmt_kw:
        return "組織・マネジメント"
    if kw_set & facility_kw:
        return "設備管理"
    return "その他"


def summarize_conversation(messages: list[dict]) -> dict | None:
    """会話をサマリー化して知識候補を生成"""
    if not messages:
        return None

    # ユーザー発言を収集
    user_msgs = [m["content"] for m in messages if m["role"] == "user"]
    asst_msgs = [m["content"] for m in messages if m["role"] == "assistant"]

    if not user_msgs or not asst_msgs:
        return None

    # 知識候補チェック
    all_user_text = " ".join(user_msgs)
    all_asst_text = " ".join(asst_msgs)
    worthy, keywords = is_knowledge_worthy(all_user_text + " " + all_asst_text)

    if not worthy:
        return None

    category = infer_category(keywords, all_user_text)
    date = messages[0].get("timestamp", "")[:10] if messages else ""

    # タイトル候補（最初の意味のあるユーザー発言）
    title = ""
    for msg in user_msgs:
        if len(msg) > 15:
            title = msg[:60].replace("\n", " ")
            break
    if not title:
        title = user_msgs[0][:60] if user_msgs else "（無題）"

    # 最も長いアシスタント応答を抜粋
    best_asst = max(asst_msgs, key=len) if asst_msgs else ""
    asst_excerpt = best_asst[:800].replace("\n", "\n> ") if best_asst else ""

    return {
        "date": date,
        "title": title,
        "category": category,
        "keywords": keywords,
        "user_question": user_msgs[0][:300] if user_msgs else "",
        "assistant_excerpt": asst_excerpt,
        "turn_count": len(messages),
    }


def main():
    parser = argparse.ArgumentParser(description="Claude Codeセッション → 知識昇格")
    parser.add_argument("--days", type=int, default=0, help="過去N日分（0=全件）")
    parser.add_argument("--show", action="store_true", help="一覧表示のみ（ファイル保存なし）")
    parser.add_argument("--min-turns", type=int, default=3, help="最低ターン数（デフォルト: 3）")
    args = parser.parse_args()

    if not SESSIONS_DIR.exists():
        print(f"セッションフォルダが見つかりません: {SESSIONS_DIR}")
        return

    since = None
    if args.days > 0:
        since = (datetime.now(tz=timezone.utc) - timedelta(days=args.days)).strftime("%Y-%m-%d")

    print(f"\n{'='*60}")
    print(f"Claude Code セッションログ 知識昇格スキャン")
    period = f"過去{args.days}日間" if args.days > 0 else "全期間"
    print(f"期間: {period} | 最低ターン数: {args.min_turns}")
    print(f"{'='*60}\n")

    jsonl_files = sorted(SESSIONS_DIR.glob("*.jsonl"))
    print(f"対象セッション数: {len(jsonl_files)}\n")

    candidates = []
    for filepath in jsonl_files:
        date = get_session_date(filepath)
        if since and date < since:
            continue

        messages = load_session(filepath)
        if len(messages) < args.min_turns:
            continue

        result = summarize_conversation(messages)
        if result:
            result["session_id"] = filepath.stem
            candidates.append(result)

    # カテゴリ別に集計
    by_category = defaultdict(list)
    for c in candidates:
        by_category[c["category"]].append(c)

    print(f"知識候補: {len(candidates)}件\n")

    # 表示
    for category, items in sorted(by_category.items()):
        print(f"\n## {category}（{len(items)}件）")
        print("-" * 50)
        for i, item in enumerate(items, 1):
            title_safe = item['title'].encode('utf-8', errors='replace').decode('utf-8', errors='replace')
            kw_safe = ', '.join(item['keywords'][:5])
            print(f"{i:2}. [{item['date']}] {title_safe}")
            print(f"    キーワード: {kw_safe}")

    if args.show:
        print("\n[--show モード: ファイル保存をスキップ]")
        return

    # Markdownファイルとして出力
    OUTPUT_DIR.mkdir(exist_ok=True)
    today = datetime.now().strftime("%Y-%m-%d")
    output_path = OUTPUT_DIR / f"claude_code_knowledge_{today}.md"

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"# Claude Code 知識昇格候補\n\n")
        f.write(f"生成日: {today} | 対象期間: {period} | 候補数: {len(candidates)}件\n\n")
        f.write(f"---\n\n")
        f.write(f"## 使い方\n\n")
        f.write(f"1. 各セクションを確認する\n")
        f.write(f"2. 「★昇格」とコメントしたものを `knowledge/` または `denken-study/` にファイル化する\n")
        f.write(f"3. 「AI週次整理」コマンドで一括確認することも可能\n\n")
        f.write(f"---\n\n")

        for category, items in sorted(by_category.items()):
            f.write(f"## {category}（{len(items)}件）\n\n")
            for item in items:
                f.write(f"### {item['title']}\n\n")
                f.write(f"- **日付**: {item['date']}\n")
                f.write(f"- **ターン数**: {item['turn_count']}\n")
                f.write(f"- **キーワード**: {', '.join(item['keywords'][:8])}\n")
                f.write(f"- **セッションID**: `{item['session_id']}`\n\n")
                f.write(f"**元の質問:**\n\n> {item['user_question'][:200]}\n\n")
                if item['assistant_excerpt']:
                    f.write(f"**回答抜粋:**\n\n> {item['assistant_excerpt'][:400]}\n\n")
                f.write(f"<!-- 昇格先: knowledge/ / denken-study/ / digital-twin/ / スキップ -->\n\n")
                f.write(f"---\n\n")

    print(f"\n{'='*60}")
    print(f"出力完了: {output_path}")
    print(f"候補 {len(candidates)}件 を確認してください")
    print(f"\n次のステップ:")
    print(f"  1. {output_path} を開いて候補を確認")
    print(f"  2. 「★昇格」とコメントを付ける")
    print(f"  3. 「AI週次整理」で一括ファイル化")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
