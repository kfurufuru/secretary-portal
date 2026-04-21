---
title: "top3-monday APIキー認証エラー（401）の対処手順"
category: "AI活用"
level: "published"
created: "2026-04-21"
last_reviewed: "2026-04-22"
understanding_score: 5
source: "inbox/handoff-2026-04-21-secretary.md + denken-study/feynman-sessions/top3-monday-401-error-2026-04-22.md"
verification_method: "コード走査（top3-generator.py）"
tags: ["APIキー", "認証エラー", "自動化", "トラブルシュート", "Python", "Anthropic SDK"]
related: ["denken-study/feynman-sessions/top3-monday-401-error-2026-04-22.md"]
---
# top3-monday APIキー認証エラー（401）の対処手順

## TL;DR
- 月曜08:08の自動実行でAnthropicのAPIキーが無効（401）となりTOP3が未生成
- 設定ファイルまたは環境変数のAPIキーを確認・更新して手動で再実行する
- 再発防止にキー更新フローを自動化スクリプトに組み込むことを検討

## ポイント
- 症状は `logs/top3-monday.log` の `Error code: 401 - invalid x-api-key`
- 原因は2系統：①設定ファイル `daily-review-config.json` のキーが古い、②環境変数 `ANTHROPIC_API_KEY` が未設定
- **環境変数が優先される**。設定ファイル更新だけでは無効。必ず両方確認する
- `--dry-run` はAPIまで実行される（Phase 2・3の Haiku・Sonnet分析が走る）。ファイル書き込みのみスキップ
- 診断フロー: 環変確認 → 設定ファイル確認 → `--dry-run` で検証 → 本番実行

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
- **環境変数が存在すれば設定ファイルは読まれない**（top3-generator.py の `check_api_key()` で `if not api_key:` で判定、78-91行）
- リトライ対象：Timeout（APITimeoutError）のみ、3回・指数バックオフ
- 401エラーはリトライされない。ログ出力後、即座に例外終了

## 落とし穴
- 設定ファイルのキーを更新しても環境変数が古いキーを上書きしているケースがあるため、必ず両方を確認する
- `--dry-run` なしで実行すると本番データに影響が出る可能性があるので必ず先に `--dry-run` で検証する
- キーを確認・コピーする際にスペースや改行が混入しやすいので注意
- APIキーはログやチャットに貼り付けず、確認は先頭15文字マスク表示に留める

## 参考リンク
-

## メモ（実践接続）
- 設定ファイルと環境変数の両方確認が鉄則。片方だけ更新して「直った」と思うのが再発の典型パターン
- キー更新後は必ず `--dry-run` で先に検証。本番実行は確認後のみ
