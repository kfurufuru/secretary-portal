---
title: "promote.py アクセスログベース自動昇格機能"
category: "AI活用"
level: "published"
created: "2026-04-21"
last_reviewed: "2026-04-23"
understanding_score: 5
source: "inbox/handoff-2026-04-21-secretary.md"
tags: ["promote.py", "自動昇格", "アクセスログ", "ナレッジ管理", "ダッシュボード"]
related: ["knowledge/claude-code-knowledge-pipeline.md", "knowledge/portal-health-observability.md", "knowledge/agentic-graphrag-architecture.md"]
---
# promote.py アクセスログベース自動昇格機能

## TL;DR
- promote.py に `--auto-promote` オプションが追加され、クロスリファレンス数とアクセス日数でdraft→review→publishedを自動昇格できる
- しきい値: draft→review は refs≥2 or 30日内access≥3日、review→published は refs≥5 or access≥7日
- linter に `suggest_related_files`（クロスリンク自動提案）も同時追加済み

## ポイント
- 昇格判定の軸は「参照された回数（クロスリファレンス）」と「実際にアクセスされた日数」の2軸→どちらか一方を満たせば昇格する OR 条件
- アクセス数は自動計測ではなく `--log-access FILE` で手動記録する運用→記録漏れに注意
- `--access-stats` で統計を確認してからしきい値の妥当性を定期検証するフローが望ましい
- `--verbose` でスキップ理由が表示されるため、昇格しない原因のデバッグに活用できる
- `suggest_related_files` によるクロスリンク自動提案と組み合わせることで、refs カウントが自然に蓄積されやすくなる

## 詳細
## オプション一覧

| オプション | 説明 |
|---|---|
| `--auto-promote` | アクセスログ・クロスリファレンスをもとにステータスを自動昇格 |
| `--log-access FILE` | 指定ファイルへのアクセスを手動記録 |
| `--access-stats` | アクセスログの統計を表示 |
| `--verbose` | 昇格スキップ理由を詳細表示 |

## 昇格しきい値

- **draft → review**: クロスリファレンス数 ≥ 2、または過去30日のアクセス日数 ≥ 3日
- **review → published**: クロスリファレンス数 ≥ 5、または累計アクセス日数 ≥ 7日

## linter 追加機能

- `suggest_related_files`: 既存ファイルとの関連性を解析し、クロスリンクを自動提案する機能がlinterに追加済み。これにより refs カウントの自然な増加が期待できる。

## 落とし穴
- `--log-access` は手動記録のため、記録を怠るとアクセス日数カウントが過小評価される
- refs カウントはクロスリンクの「存在」に依存するため、リンクを張らずに参照しているケースはカウントされない
- しきい値はプロジェクト規模や更新頻度によって最適値が変わるため、`--access-stats` で定期的に実態を確認して調整する
- `--auto-promote` を初めて実行する前に `--verbose` で空振りなく昇格候補を確認することを推奨
- draft→review と review→published のしきい値が異なることを忘れず、published 手前のreviewファイルが滞留しないよう監視する

## 参考リンク
-

## メモ（実践接続）
- 週次サイクルで `py promote.py --auto-promote --verbose` を実行後、`--access-stats` でしきい値の実態を確認して調整する
- 手動 `--log-access` の記録漏れがアクセス日数カウント過小評価の最大リスク。記録ルーティンを週次レビューに組み込む

## 2026-04-23 追記: 知識ダッシュボード連動

- `promote.py` の `main()` 末尾に `business-skills/scan-dashboard.py` の自動実行を追加（`--dry-run` 以外）
- 昇格完了→ `business-skills/dashboard-data.json` 自動更新→ `python-dekirukoto.html` に L1/L2 件数反映
- 連動フロー: 月曜08:00 `promote.py --auto-promote` → scan-dashboard.py → ダッシュボード更新
- scan-dashboard.py は inbox/*.md（L1候補）と knowledge/*.md frontmatter（L2 draft/review/published）を分類
- 失敗時は `[WARN]` ログのみで promote 本体の処理は継続する（疎結合）
- 落とし穴: scan-dashboard.py を削除すると連動も切れるため、`business-skills/` のスクリプト群をまとめてバックアップ対象にする
