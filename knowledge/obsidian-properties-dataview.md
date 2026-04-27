---
title: "Obsidian Properties を使いこなす5つのテクニック"
category: "AI活用"
level: "published"
created: "2026-04-27"
last_reviewed: "2026-04-27"
understanding_score: 4
source: "スクリーンショット（保存版インフォグラフィック）"
tags: ["Obsidian", "Dataview", "Properties", "フロントマター", "自動化"]
related: ["knowledge/dataview-query-template.md", "knowledge/obsidian-notion-workflow.md"]
---

# Obsidian Properties を使いこなす5つのテクニック

**TL;DR**: Properties（フロントマター）は「タグ付け」ではなく「構造化データ」。Dataview と組み合わせると vault が自動インデックス化し、情報管理効率が10倍上がる。

---

## 5つのプロパティと用途

### 1. `status` (draft / review / done)
ノートの進捗を一目で把握。タスク管理・ワークフローに最適。

```dataview
TABLE status, file.link
WHERE status != "done"
SORT status
```

→ 未完了ノートだけ抽出。weekly review の起点に使う。

---

### 2. `created` / `updated`
作成日・更新日を自動記録。情報の「鮮度」を可視化できる。

```dataview
TABLE created, updated, file.link
SORT updated DESC
```

→ 陳腐化した知識ノートの発見に使う（`updated` が3ヶ月以上前＝見直し候補）。

---

### 3. `tags` + Dataview
タグを組み合わせて動的なインデックスを自動生成。メモの整理が圧倒的にラクになる。

```dataview
LIST FROM #Obsidian
SORT file.name
```

→ `#電験3種` `#Claude` などカテゴリタグで動的目次を自動生成。frontmatter `tags:` と `#インラインタグ` 両方対応。

---

### 4. `rating` (1-5)
情報の重要度をスコアで管理。高評価ノートだけを抽出して集中インプット。

```dataview
TABLE rating, file.link
WHERE rating >= 4
SORT rating DESC
```

→ `.secretary` の `understanding_score` と同義。rating ≥ 4 = 繰り返し参照する核心知識。

---

### 5. `source_url`
元ネタへのリンクを保存。ワンクリックで参照元にアクセス。リサーチ効率が爆上がり。

```dataview
TABLE source_url, file.link
WHERE source_url
```

→ 出典を残すことで「なぜこれを書いたか」が後から追える。knowledge ファイルの `source:` フィールドに相当。

---

## .secretary への適用

| Properties キー | .secretary での対応フィールド | 備考 |
|----------------|----------------------------|------|
| `status` | `level` (draft/review/published) | 昇格ワークフローと一致 |
| `created` / `updated` | `created` / `last_reviewed` | 既にスキーマ定義済み |
| `tags` | `tags: []` | 既にスキーマ定義済み |
| `rating` | `understanding_score` (1-5) | 意味は完全一致 |
| `source_url` | `source` | URL形式で統一推奨 |

**落とし穴**: `updated` は Obsidian が自動更新しない。Templater + `tp.file.last_modified_date` で自動化するか、手動更新を徹底する。

---

## 実践メモ

- Dataview の `WHERE` は Properties を直接参照できる（`file.tags` より高速）
- `rating >= 4` クエリを weekly review ダッシュボードに組み込むと「核心知識棚卸し」が毎週自動表示される
- `source_url` を `source: "https://..."` 形式で統一すると Dataview でリンク列が生成される
