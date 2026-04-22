---
title: "RSS Dashboard Phase 6 引き継ぎ"
date: "2026-04-23"
status: "pending"
---

# Phase 6 実装引き継ぎ

## 完了項目
- ✅ `archive_rotation.py` 作成 (3ヶ月ローテーション・高スコア永続保持)
- ✅ `link_generator.py` 作成 (カテゴリ別 wiki-link 自動生成)

## 次の実施項目

### P1: スクリプト動作確認
```bash
cd /c/Users/kfuru/.secretary/ai-news/ai-news
python archive_rotation.py  # 90日超+score<3を archive/ へ移動
python link_generator.py    # feeds/*.md に related: フィールド追加
```

**確認ポイント**:
- archive/ ディレクトリが作成されるか
- link_generator.py 実行後、feeds/ の frontmatter に `related: [...]` が追加されるか
- 関連記事が正しくリンクされているか（同一 ai_category + score >= 3）

### P2: Stop hook 統合（オプション）
現在のStop hook:
```json
"hooks": { "Stop": { "command": "py \"C:/Users/kfuru/.secretary/ai-news/ai-news/sync_to_vault.py\"" } }
```

拡張パターン（推奨）:
```bash
py sync_to_vault.py && py link_generator.py && py archive_rotation.py
```
（月1回実行で feeds/ 整理 + wiki-link 自動生成）

### P3: 週次ワークフロー統合
- Phase 5: `ai-conversations/weekly-digest.md` で Dataview 集計（既稼働）
- Phase 6: archive/ と related: の活用方法を整理
  - 例: 高スコア記事 → 自動的に L2 昇格候補として表示
  - 例: related: のリンク → 知識グラフの可視化

## ファイル一覧
```
ai-news/
├── ai-news/
│   ├── sync_to_vault.py          (Phase 3b/4: JSON→Markdown)
│   ├── archive_rotation.py        (Phase 6: 新規)
│   └── link_generator.py          (Phase 6: 新規)
├── feeds/                         (sync_to_vault 生成)
├── archive/                       (archive_rotation 生成)
└── ai-conversations/
    └── weekly-digest.md           (Phase 5: Dataview dashboard)
```

## 設計判断
- **削除ロジック**: 90日超 AND score < 3 → archive/ へ移動（復帰可能）
- **リンク対象**: 同一 ai_category + score >= 3 + 上限5件
- **実行タイミング**: 月1回 cron 推奨（手動実行も OK）

## 引継ぎ実行コマンド
```
inbox/handoff-2026-04-23-rss-phase6.md を読んで実装続行して
```
