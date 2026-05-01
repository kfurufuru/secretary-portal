---
title: "MkDocs Material 3重ナビ問題 — 一覧ページでの hide:toc パターン"
category: "AI活用"
level: "published"
created: "2026-05-01"
last_reviewed: "2026-05-01"
understanding_score: 4
source: "denken-wiki/articles/index.md 改修セッション 2026-05-01"
tags: ["MkDocs", "Material", "UI設計", "Wiki", "denken-wiki"]
related: ["knowledge/portal-health-observability.md"]
---

# MkDocs Material 3重ナビ問題

## TL;DR

MkDocs Material は **左サイド（自動生成セクションnav）+ 中央本文 + 右TOC（h2/h3階層）** の3カラム構成を取る。一覧ページ（リンクの羅列が本体のページ）では中央と右TOCが重複し、ユーザーが「どれをクリックすべきか迷う」UI崩壊が起きる。**front-matter に `hide: [toc]` を1行追加するだけで解消**。

## 問題の構造

| 位置 | 生成元 | 想定用途 |
|------|--------|---------|
| 左サイド | `mkdocs.yml` の `nav:` 定義（または自動収集） | サイト全体のセクション間移動 |
| 中央 | Markdown 本文 | コンテンツ表示 |
| 右TOC | 本文の h2/h3 から自動抽出 | 同一ページ内ジャンプ |

### 重複が起きる条件

- 中央本文が「リンクの一覧」（カテゴリ別の項目並べ）
- 各カテゴリが h2/h3 で見出し化されている
- → 中央のリンクリストと右TOCが**同じ見出し階層**を別形式で表示

denken-wiki/articles/ では：
- 左: 200+条文がフラットに並ぶ（電気設備技術基準 → 第1条/第2条/...）
- 中央: 「電気事業法 16件」「第1章 総則 7件」+ 各条文リンク
- 右TOC: 「電気事業法 16件」「第1章 総則 7件」（中央の見出しを抽出しただけ）

ユーザー指摘「左サイド、右サイド、中央の3か所に条文が並んでいる」が的確。

## 解決パターン

### パターンA: 一覧ページのみTOC非表示（推奨・5秒）

```markdown
---
hide:
  - toc
---

# ページタイトル
```

- メリット: 工数最小・ピンポイント・他ページに影響なし
- デメリット: ページ内ジャンプ機能は失われる
- 適用条件: ページ本体が「カテゴリ別リンクハブ」で、ページ内ジャンプが不要

### パターンB: ナビも非表示（さらに広く使う）

```yaml
hide:
  - navigation
  - toc
```

- 用途: ランディングページや法令体系図など、コンテンツ自体が主役のページ

### パターンC: TOCを左サイドに統合（全ページ）

```yaml
# mkdocs.yml
theme:
  features:
    - toc.integrate
```

- 全ページで右TOCが左サイドに統合される（重複構造そのものが消える）
- デメリット: 既存の他ページのUXも変わるため事前検討必須

## 判断フロー

```
ページを編集中、左/中央/右で同じ情報が並んでいる？
├─ NO → 何もしない
└─ YES → ページの目的は？
    ├─ 「カテゴリ別ハブ」→ パターンA（hide: [toc]）
    ├─ 「ランディング・体系図」→ パターンB（nav+toc両方）
    └─ 「全ページで統一したい」→ パターンC（toc.integrate）
```

## 落とし穴

1. **GitHub Pages デプロイ後はハードリフレッシュ必須**: ブラウザキャッシュで旧UIが残る。`Ctrl+Shift+R` または `?v=YYYYMMDD` クエリ追加で確認
2. **toc.integrate を後から有効化すると全ページの右TOCが消えて混乱する**: 大規模Wikiでは事前にユーザー告知
3. **front-matter は最初の3行に置く**: 本文の途中だと無視される

## 実践メモ

denken-wiki/articles/index.md（2026-05-01 適用）：

- before: 中央=箇条書き80リンク + 右TOC=見出し14個 → 重複80%
- after: `hide: [toc]` で右TOC消去 → 中央が画面幅広く使える、左サイド（直リンク）と中央（カテゴリ別）の2軸構成
- 工数: 5秒
- 他Wiki展開予定: denken3-riron-wiki / denken3-kikai-wiki / denken-news の一覧ページに同パターン適用検討

## 関連

- [[mkdocs-material-features-japanese-headings.md]]（未作成・将来）— 長い日本語見出しで TOC が読みにくくなる問題への CSS 対応
