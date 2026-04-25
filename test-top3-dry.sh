#!/bin/bash
# DRY-RUN テスト用スクリプト（APIなし）

echo "=== TOP3 Generator DRY-RUN Test ==="
echo ""
echo "ファイルが正しく生成されたか確認:"
ls -lh top3-generator.py
echo ""
echo "依存フォルダの確認:"
ls -ld logs/ todos/ digital-twin/
echo ""
echo "Skillファイルの確認:"
ls -lh ./.claude/scheduled-tasks/top3-monday-fixation/SKILL.md
echo ""
echo "✓ Test Complete"
