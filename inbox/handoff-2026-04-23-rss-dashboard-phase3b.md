---
title: "RSS Dashboard 統合 Phase 3b 引継ぎ"
date: 2026-04-23
status: "handoff"
---

# RSS Dashboard + Dataview 統合 — Phase 3b→4 実行引継ぎ

## 現在地

**Phase 3b（Sync Converter テスト）が検証完了。次は実行フェーズ。**

### 完了した検証
- ✅ config.json パス修正: `news_json_path` を `C:/Users/kfuru/.secretary/ai-news/ai-news/news.json` に更新
- ✅ sync_to_vault.py --dry-run 実行成功: 16 記事を Markdown に変換（0 ファイル書込 = 正常）
- ✅ ファイル名生成・スコア抽出・frontmatter 構造 すべて動作確認

### Persona レビュー結果（実行判定）
- **ひろゆき (運用実務)**: ✅ 動作面問題なし。Archive ルール（3ヶ月超記事移動）検討推奨
- **落合陽一 (複雑系)**: ⚠️ wiki-link 自動生成・Notion 分離は Phase 6 で検討。現段階は OK
- **ホリエモン (ROI)**: ✅ 20-25 分で効果出す。ただし Phase 4（Stop hook）必須
- **マンガー (盲点)**: feeds/ 集計ダッシュボード・score 分布レビュー仕組み = 後発タスク

**総合判定**: 実行ゴーサイン。Phase 4（Stop hook）まで先行する。

---

## 次のタスク（実行順）

### 1️⃣ Phase 3b 実行（実ファイル生成）
**場所**: `C:\Users\kfuru\.secretary\ai-news\ai-news\`

```bash
py sync_to_vault.py
```

**期待値**: 
- `ai-news/feeds/YYYY-MM-DD-*.md` が 16 ファイル生成される
- frontmatter + Markdown body が正しくフォーマットされている
- sync_to_vault.log に「[CREATED] ファイル名」が記録される

**検証**: feeds/ 内のいずれかのファイルを Obsidian で開いて frontmatter が有効か確認。

---

### 2️⃣ Phase 4 実行（Stop Hook 統合）
**ファイル**: `.claude/settings.json` または `.claude/hooks/` 配下

**作業内容**:
1. `.claude/settings.json` に Stop hook セクション追加（or 拡張）
   ```json
   {
     "hooks": {
       "Stop": {
         "command": "py \"C:/Users/kfuru/.secretary/ai-news/ai-news/sync_to_vault.py\""
       }
     }
   }
   ```
2. セッション終了時に自動実行される確認

**判定**: 次のセッション終了時に feeds/ にファイルが追加されることで検証。

---

### 3️⃣ Phase 5（Dashboard 統合）— 後発
`ai-conversations/weekly-digest.md` に Dataview クエリセクション追加。

---

## 重要な制約・注意

| 項目 | 内容 | Action |
|------|------|--------|
| **feeds/ 管理** | 5,400 files/年の肥大化予想。3ヶ月超は archive/ 移動検討 | Phase 5 後に実装 |
| **wiki-link** | 現在、L1→L2 昇格時に手動で [[知識記事]] を張る。自動化は Phase 6 | 現段階は受け入れ |
| **score 追跡** | news.json の score (1-5) が Claude 主観。分布 review 機構がない | 月1回集計追加（後発） |
| **RSS URL 管理** | config.json の 30+ URL が古舘個人最適化。チーム展開時は Notion DB 化必須 | Phase 6 計画段階で検討 |

---

## コマンド早見

```bash
# Phase 3b 検証（既実施）
py sync_to_vault.py --dry-run

# Phase 3b 実行（次）
py sync_to_vault.py

# feeds 一覧確認
py sync_to_vault.py --list

# sync ログ確認
cat sync_to_vault.log
```

---

## 関連ファイル

- 🔧 `sync_to_vault.py` — JSON → Markdown 変換スクリプト（本体）
- ⚙️ `config.json` — パス設定（既に修正済み）
- 📋 `knowledge/dataview-query-template.md` — Dataview クエリ集
- 📄 `.claude/plans/vivid-stirring-pascal.md` — 全体計画書

---

**次セッションで**: このファイルを読んで Phase 3b → Phase 4 を実行して。
