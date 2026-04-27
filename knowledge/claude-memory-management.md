---
title: Claude Memory 管理設計
date: 2026-04-26
updated: 2026-04-26
category: AI活用
level: published
tags: [Claude Code, Memory, 知識管理, ダッシュボード, 自動化]
related: ["[[claude-code-knowledge-pipeline]]", "[[cc-playbook]]", "knowledge/ai-agent-architecture.md"]
source: inbox/handoff-2026-04-25-memory-dashboard.md
understanding_score: 4
---

# Claude Memory 管理設計

## TL;DR

Claude CodeのMemoryは4分類（User/Feedback/Project/Reference）で管理する。Projectには `expires:` フィールドを付与して陳腐化を防ぐ。32件+アーカイブ7件を `memory-dashboard.html` で可視化・管理済み。

---

## Memory 4分類の設計思想

| 分類 | 役割 | 更新頻度 | 典型ファイル例 |
|------|------|----------|--------------|
| **User** | 属性・思考スタイル・価値観・好みの永続情報 | 月1回以下 | `user_profile.md` `user_preferences_ui.md` |
| **Feedback** | 行動修正・ルール・禁止事項（過去の誤りから生成） | 随時 | `feedback_completion_rules.md` |
| **Project** | 進行中プロジェクトの引継ぎ・設計判断・未完タスク | 週1回〜 | `project_denken_mailer.md` |
| **Reference** | 外部ツール・環境・リソースへのポインタ | 変更時のみ | `reference_tools.md` |

### 分類の判断基準

- **User vs Feedback**: Userは「私はこういう人間だ」の情報。Feedbackは「Claude Codeはこう動くべき」の命令
- **Project vs Reference**: Projectはタスクが完了したら失効する。Referenceはツールが廃止されるまで有効
- **迷ったらFeedback**: 行動ルール系はFeedbackに統一（User肥大化を防ぐ）

---

## expires 運用（Projectメモリのライフサイクル）

Project分類は全件に `expires: YYYY-MM-DD` を必須フィールドとして付与する。

```yaml
# project memoryのfrontmatter例
title: 電験メーラーv4 引継ぎ
expires: 2026-07-01
```

### 期限設定の目安

| プロジェクト状態 | expires |
|--------------|---------|
| アクティブ開発中 | 3ヶ月後 |
| 保守フェーズ | 6ヶ月後 |
| 試験日・イベント固定 | イベント翌日 |
| 明確な完了条件なし | 1年後（再評価必須） |

### expires管理フロー

1. `memory-dashboard.html` でバッジ色を確認（緑=余裕 / 黄=30日以内 / 赤=期限切れ）
2. 期限切れProjectは「アーカイブ」ボタンで非表示化（削除ではなく退避）
3. 復活が必要な場合は「↩復活」ボタンで即時リストア

---

## 統合パターン（Feedbackの圧縮）

関連性が高い複数のFeedbackファイルは1ファイルに統合して管理コストを下げる。

### 統合の条件

- 同一の行動領域に属する（例: 「完了宣言」と「確認URL提示」はセット）
- 個別ファイルが3行以下で内容が薄い
- 統合後も意味が明確に伝わる

### 実施済み統合例（2026-04-25）

| 統合後ファイル | 統合元ファイル（3件→1件） |
|-------------|----------------------|
| `feedback_completion_rules.md` | completion_declaration + verification_url |
| `feedback_implementation_discipline.md` | design_first_verify + verify_api + no_unasked_changes |
| `feedback_denken_content_rules.md` | mailer_style + denken_no_mnemonics |

削除済み元ファイル7件: feedback_mailer_style / feedback_completion_declaration / feedback_denken_no_mnemonics / feedback_verify_api_before_claim / feedback_design_first_verify / feedback_no_unasked_changes / feedback_verification_url

---

## memory-dashboard.html 機能仕様

**場所**: `C:/Users/kfuru/.secretary/memory-dashboard.html`
**確認URL**: `http://localhost:8092/memory-dashboard.html`

### 主要機能

| 機能 | 詳細 |
|------|------|
| タイプ別フィルター | User / Feedback / Project / Reference で絞り込み |
| リアルタイム検索 | ファイル名・タイトルのキーワード検索 |
| 有効期限バッジ | 緑（余裕）/ 黄（30日以内）/ 赤（期限切れ）を自動判定 |
| アーカイブ機能 | 削除済み7件を薄く表示、↩復活ボタン付き |

### 現状件数（2026-04-26時点）

- User: 5件 / Feedback: 17件 / Project: 6件 / Reference: 4件 = **計32件**
- アーカイブ: 7件（ダッシュボードで閲覧・復活可能）

---

## 落とし穴

- **User肥大化の罠**: 行動ルール系をUserに入れると参照時に過負荷になる。Feedbackへ移動する
- **Project expires未設定**: expires未設定Projectは「永久に生き続ける」。設定を忘れると陳腐化情報がセッションを汚染する
- **統合しすぎの罠**: 無関係な内容を1ファイルに詰めると検索性が低下。統合は同一行動領域のみ

---

## 実践メモ

- 月1回 `memory-dashboard.html` を開いて期限切れProjectをアーカイブする
- 新規Feedbackを追加したら既存の類似ファイルと統合できないか確認する
- Memoryが40件を超えたら `/anthropic-skills:consolidate-memory` で圧縮を検討する
