---
date: 2026-04-22
topic: knowledge/ draft残り4件の対応
status: pending
---

# 引継ぎ: knowledge/ ドラフト残件

## 完了済み（本日review昇格）
- `knowledge/mcp-claude-integration.md` → review
- `knowledge/agentic-graphrag-architecture.md` → review

## 要対応（4件）

### フェインマンセッション後に再評価（score:2）
「フェインマン [テーマ]」コマンドで理解度を3以上に上げてから level: review に更新。

1. `knowledge/promote-py-auto-promote-access-log.md`
   - テーマ: promote.py アクセスログベース自動昇格機能
   - 現状: 実装済みだが記事の理解度整理が未完

2. `knowledge/top3-monday-api-key-401-error.md`
   - テーマ: APIキー認証エラー（401）の対処手順
   - 現状: トラブル対処済みだが手順の言語化が粗い

### 人間レビュー必須（score:1、記事化不可ルール）
内容を読んで「使える知見があるか」判断。あれば本文を書き直してscore:3以上に更新。なければ削除。

3. `knowledge/ideas-from-news/2026-04-20.md`
4. `knowledge/ideas-from-news/2026-04-21.md`

## 次のアクション
```
フェインマン promote.py自動昇格
フェインマン APIキー認証エラー401
```
その後 `py promote.py --list-drafts` で残件確認。
