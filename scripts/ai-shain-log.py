#!/usr/bin/env python3
"""AI社員諮問ログ追記ヘルパー

使い方:
    python scripts/ai-shain-log.py \\
        --topic "work-rules保存先" \\
        --pattern unanimous \\
        --result "両repo .claude/rules/ に分離" \\
        --ochiai "両repo分離" \\
        --hiroyuki "両repo分離" \\
        --horie "両repo分離"

出力: .secretary/logs/ai-shain-consult.jsonl に1行JSONL追記。

pattern の値:
    unanimous  ... 全員一致
    majority   ... 2-1多数決
    split      ... バラバラ
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

# Windows UTF-8出力（feedback_encoding_grep 対策）
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

LOG_PATH = Path(r"C:\Users\kfuru\.secretary\logs\ai-shain-consult.jsonl")
VALID_PATTERNS = {"unanimous", "majority", "split"}


def main() -> int:
    parser = argparse.ArgumentParser(description="AI社員諮問ログ追記")
    parser.add_argument("--topic", required=True, help="諮問テーマ（短い件名）")
    parser.add_argument("--pattern", required=True, choices=sorted(VALID_PATTERNS), help="一致パターン")
    parser.add_argument("--result", required=True, help="採用判定の結論")
    parser.add_argument("--ochiai", required=True, help="落合の結論（200字以内）")
    parser.add_argument("--hiroyuki", required=True, help="ひろゆきの結論")
    parser.add_argument("--horie", required=True, help="ホリエモンの結論")
    parser.add_argument("--rescope-applied", action="store_true", help="rescope（v0.5圧縮）を適用したか")
    parser.add_argument("--minority-adopted", action="store_true", help="2-1で少数派を採用したか")
    parser.add_argument("--category", default="other", help="諮問カテゴリ（config/content/design/workflow/other 等・自由文字列）")
    parser.add_argument("--minority-persona", choices=["ochiai", "hiroyuki", "horie", "none"], default="none", help="2-1時の少数派ペルソナ（unanimous/splitの時はnone）")
    args = parser.parse_args()

    record = {
        "ts": datetime.now().isoformat(timespec="seconds"),
        "topic": args.topic,
        "category": args.category,
        "pattern": args.pattern,
        "result": args.result,
        "personas": {
            "ochiai": args.ochiai,
            "hiroyuki": args.hiroyuki,
            "horie": args.horie,
        },
        "minority_persona": args.minority_persona,
        "rescope_applied": args.rescope_applied,
        "minority_adopted": args.minority_adopted,
    }

    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")

    print(f"[OK] logged: {args.topic} ({args.pattern})")

    # ダッシュボード自動再ビルド（失敗しても本処理は成功扱い）
    try:
        import subprocess
        builder = Path(__file__).parent / "build_ai_shain_dashboard.py"
        if builder.exists():
            subprocess.run([sys.executable, str(builder)], check=False, capture_output=True, timeout=10)
            print("[OK] dashboard rebuilt")
    except Exception as e:
        print(f"[WARN] dashboard rebuild skipped: {e}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
