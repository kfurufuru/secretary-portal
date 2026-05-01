#!/usr/bin/env python3
"""
PostToolUse hook: knowledge/ ファイルの Read を access_log.jsonl に記録する。
Claude Code が knowledge/ 配下のファイルを読むたびに自動実行される。
"""
import json, sys
from datetime import datetime
from pathlib import Path

ACCESS_LOG = Path("C:/Users/kfuru/.secretary/logs/access_log.jsonl")

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    # tool_input.file_path が knowledge/ を含む場合のみ記録
    file_path = data.get("tool_input", {}).get("file_path", "")
    if "knowledge/" not in file_path.replace("\\", "/"):
        sys.exit(0)

    # knowledge/ 以降の相対パスを抽出
    normalized = file_path.replace("\\", "/")
    idx = normalized.find("knowledge/")
    rel_path = normalized[idx:]

    entry = {
        "timestamp": datetime.now().isoformat(),
        "path": rel_path,
        "source": "claude-read-hook"
    }

    ACCESS_LOG.parent.mkdir(parents=True, exist_ok=True)
    with open(ACCESS_LOG, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

if __name__ == "__main__":
    main()
