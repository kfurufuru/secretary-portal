---
description: Notion連携・AI会話ナレッジ同期の手順
paths:
  - "ai-conversations/**"
  - "ai-exports/**"
---

# Notion連携ルール

## AI知識インボックス
- **DB**: 🤖 AI知識インボックス
- **URL**: https://www.notion.so/223b37de41c74f08abfd5aef35b7e5c4
- **DataSource ID**: c684e016-983a-49af-a74b-06fe49416c5a

## フロー
Notionでキャプチャ → 週1同期（月曜朝） → knowledge/へ昇格

## AI履歴一括取り込み
1. `py ai-exports/process_exports.py [オプション]` を実行
2. `ai-exports/processed/processed_YYYY-MM-DD.json` を読み込む
3. 各会話を分析・分類（電験3種/設備管理/AI活用/メモ/スキップ）
4. Notionに一括登録（最大100件/回）
5. inbox/ → processed/ へ移動案内
