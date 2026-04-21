---
title: "top3-monday APIキー認証エラー（401）の対処手順"
category: "AI活用"
level: "review"
created: "2026-04-21"
last_reviewed: "2026-04-21"
understanding_score: 2
source: "inbox/handoff-2026-04-21-secretary.md"
tags: ["APIキー", "認証エラー", "自動化", "トラブルシュート"]
related: []
---
# top3-monday APIキー認証エラー（401）の対処手順

## TL;DR
- 月曜08:08の自動実行でAnthropicのAPIキーが無効（401）となりTOP3が未生成
- 設定ファイルまたは環境変数のAPIキーを確認・更新して手動で再実行する
- 再発防止にキー更新フローを自動化スクリプトに組み込むことを検討

## ポイント
- 症状は `logs/top3-monday.log` の `Error code: 401 - invalid x-api-key`
- 原因は2系統：①設定ファイル `daily-review-config.json` のキーが古い、②環境変数 `ANTHROPIC_API_KEY` が未設定
- まず設定ファイルのキーを確認するワンライナーで現状を把握し、その後手動実行で動作確認する流れが定石
- `--dry-run` フラグで本番影響なく検証できる点を活用する

## 詳細
- 発生日時: 2026-04-21（月）08:08 自動実行
- 影響: 当週のTOP3が自動生成されずに欠落
- 設定ファイルパス: `C:/Users/kfuru/.secretary/daily-review-config.json`（キー名: `anthropic_api_key`）
- キー確認コマンド:
  ```bash
  python -c "import os, json; cfg=json.load(open('C:/Users/kfuru/.secretary/daily-review-config.json')); print(cfg.get('anthropic_api_key','')[:15]+'...')"
  ```
- キー更新後の手動再実行:
  ```bash
  python top3-generator.py --dry-run
  ```
- 環境変数 `ANTHROPIC_API_KEY` が設定されている場合は設定ファイルより優先される可能性があるため、両方を確認する

## 落とし穴
- 設定ファイルのキーを更新しても環境変数が古いキーを上書きしているケースがあるため、必ず両方を確認する
- `--dry-run` なしで実行すると本番データに影響が出る可能性があるので必ず先に `--dry-run` で検証する
- キーを確認・コピーする際にスペースや改行が混入しやすいので注意
- APIキーはログやチャットに貼り付けず、確認は先頭15文字マスク表示に留める

## 参考リンク
-

## メモ（実践接続）
-
