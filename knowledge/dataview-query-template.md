---
type: "dataview-dashboard"
created: 2026-04-23
updated: 2026-04-23
---

# Dataview Query Templates for .secretary Vault

AI News + Denken Study の統合検索・可視化クエリ集。RSS Dashboard との連携で L1→L2 の昇格プロセスを効率化。

---

## 📰 1. AI News + Denken Study 統合検索（最新順）

```dataview
TABLE file.ctime as "作成日", type as "種別", status as "状態"
FROM ("ai-news" OR "denken-study/knowledge-metabolism")
WHERE status = "published"
SORT file.ctime DESC
```

**用途**: Weekly digest 作成時に最新 ai-news・denken-study を一覧表示。

---

## 📊 2. RSS カテゴリ別 記事数（トレンド検出）

```dataview
TABLE category as "カテゴリ", length(rows) as "記事数"
FROM "ai-news"
WHERE status = "published"
GROUP BY category
SORT length(rows) DESC
```

**用途**: AI ニュースの主流トレンドを1週間単位で検出。

---

## 📚 3. Learning Metabolism - 理解度ダッシュボード

```dataview
TABLE theme as "テーマ", level as "理解度", updated_at as "最終更新"
FROM "denken-study/knowledge-metabolism"
WHERE level < 3
SORT updated_at DESC
```

**用途**: 未習熟テーマ（理解度 < 3）をリスト化。学習優先度の可視化。

---

## 🔗 4. Wiki-link 接続グラフ（知識ネットワーク可視化）

```dataview
LIST outgoing([[digital-twin/priorities-framework]])
FROM "ai-news"
```

**用途**: priorities-framework に接続する ai-news 記事を検出。意思決定との関連性マッピング。

---

## ⚡ 5. 今週の ai-news（日付フィルタ）

```dataview
TABLE date as "配信日", source as "ソース", title as "記事"
FROM "ai-news"
WHERE status = "published" AND date >= date(2026-04-21)
SORT date DESC
```

**用途**: Weekly digest「This Week's RSS」セクション用。

---

## 🎯 6. 優先度順 トラブルログ参照（Factory×Knowledge 連携）

```dataview
TABLE priority as "優先度", resolution_date as "解決日", status as "状態"
FROM "factory/trouble-log"
WHERE status = "resolved"
SORT resolution_date DESC
```

**用途**: 製造現場トラブルが knowledge に昇格した度数を追跡。

---

## 📈 7. Denken Study の進捗サマリー（月次レビュー用）

```dataview
TABLE file.ctime as "作成日", theme as "テーマ", level as "理解度"
FROM "denken-study/knowledge-metabolism"
WHERE file.ctime >= date(2026-03-23)
SORT file.ctime DESC
```

**用途**: 月1回の学習進捗レビュー。NotebookLM デジタルツイン分析の入力データ。

---

## 使い方

1. Obsidian で このファイルを開く
2. 上記 Dataview クエリを Obsidian が自動レンダリング（Table / List 表示）
3. 各クエリの下部「用途」セクションに従い、dashboard/weekly-digest に埋め込み

### 既存統合箇所
- `ai-conversations/weekly-digest.md`: Query 5 を「This Week's RSS」に統合
- `knowledge/notebooklm-py-integration.md`: Query 7 をデジタルツイン分析に活用
