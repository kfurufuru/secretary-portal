---
title: 電験3種 法規Wiki — デザインリファクタリング 引継ぎ
date: 2026-05-01
status: 未着手（次セッションで実施）
previous_session: 法規Wikiガイドライン作成・電気工作物の分類ページ作成
---

# 法規Wiki デザインリファクタリング 引継ぎ

## このセッションでやったこと

| 作業 | ファイル | 状態 |
|------|---------|------|
| 法規Wikiページ作成ガイドライン（12セクション形式） | `knowledge/houki/houki-wiki-page-guideline.md` | 完了 |
| 電気工作物の分類ページ新規作成 | `denken-wiki/docs/themes/kosakubutsu-bunrui.md` | 完了・push済み |
| themes/index.md にリンク追加 | `denken-wiki/docs/themes/index.md` | 完了・push済み |
| mkdocs.yml ナビゲーション追加 | `denken-wiki/mkdocs.yml` | 完了・push済み |
| カラーガイドライン追記 | `knowledge/houki/houki-wiki-page-guideline.md` | 完了 |

---

## 次セッションのメインタスク：デザインリファクタリング

### 問題

**現状**: MkDocs Material **ダーク**テーマ（slate scheme、ティール＃009485ヘッダー）
**目標**: **ライト**背景のカードベースUI（下記スクリーンショット参照）

2つのUIが別物に見えるため統一が必要。

### 目標デザイン（ユーザー提示のスクリーンショット）

URL: `https://kfurufuru.github.io/denken-wiki/themes/`

```
特徴:
- 背景: ライトベージュ (#F7F5EF)
- カードグリッド: 2列、角丸、白サーフェス
- アクセント: ティールグリーン (#2F6F73)
- リンク: ブルー (#3B6EA8)
- ハイライト: 黄 (#FFF3B0)
- 各カードに: アイコン・テーマ名・説明文・条文範囲・「過去問を見る (N)」リンク
- フッター: 学習ヒントカード（サイドバー）・テーマ学習方法カード（横幅広）
```

### 使用するCSS変数（確定済み）

```css
:root {
  --color-bg:        #F7F5EF;  /* ページ背景 */
  --color-surface:   #FFFFFF;  /* カード背景 */
  --color-text:      #1F2933;  /* 本文 */
  --color-muted:     #5F6B7A;  /* 補足 */
  --color-primary:   #2F6F73;  /* ティール（アクセント） */
  --color-link:      #3B6EA8;  /* リンク */
  --color-highlight: #FFF3B0;  /* マーカー黄 */
  --color-border:    #E5E1D8;  /* 枠線 */
}
```

---

## 実装方針（2択、次セッションで決定）

### 案A: MkDocs カラーを全面変更（軽量・リスク小）

```yaml
# mkdocs.yml
theme:
  palette:
    - scheme: default
      primary: custom
      accent: teal
```

```css
/* custom.css に追加 */
:root {
  --md-primary-fg-color:     #2F6F73;
  --md-accent-fg-color:      #3B6EA8;
  --md-default-bg-color:     #F7F5EF;
  --md-default-fg-color:     #1F2933;
  --md-typeset-a-color:      #3B6EA8;
  --md-code-bg-color:        #FFFFFF;
}
.md-header { background-color: #2F6F73; }
.md-tabs  { background-color: #2F6F73; }
```

**効果**: サイト全体がライト背景に。カードUIにはならないが色は統一される。
**工数**: 30分

### 案B: themes/index ページをカードHTMLで完全書き直し（目標デザインに完全準拠）

- `docs/themes/index.md` を削除
- `docs/themes/index.html` を作成（カードグリッドHTML）
- MkDocs の `not_in_nav` or `exclude_docs` で markdown版を非表示に
- テーマアイコン・説明文・過去問数をカードに組み込む

**効果**: スクリーンショット通りのカードUIが実現
**工数**: 1〜2時間
**リスク**: MkDocs のナビゲーションとHTMLが混在するため要検証

### 推奨

**案A を先に実行**（30分でカラー統一）→ **案B を次々セッション**（カードUI）。

---

## 現在のファイル構成（重要箇所）

```
C:\Users\kfuru\Projects\denken-wiki\
├── mkdocs.yml                          ← palette: primary: teal（要変更）
├── docs/
│   ├── stylesheets/
│   │   └── custom.css                  ← カラー変数追加先
│   ├── themes/
│   │   ├── index.md                    ← カードUIに変換対象
│   │   └── kosakubutsu-bunrui.md       ← 今回新規作成（12セクション形式）
│   └── index.md                        ← ホームページ
└── overrides/                          ← 存在しない（必要なら作成）
```

## テーマ別カードの必要データ

themes/index.html を作る際に必要なデータ（現在 index.md の表から取得可）:

| テーマ名 | ファイル | 条文範囲 | 頻出度 | 過去問数（概算） |
|---------|---------|---------|--------|----------------|
| 接地工事 | setsuchi.md | 省令11条,解釈17〜19条 | ★★★★★ | 128 |
| 絶縁性能・耐圧試験 | zetsuen.md | 省令5条,58条 | ★★★★★ | 96 |
| 架空電線路 | kachiku-densen.md | 解釈68〜109条 | ★★★★★ | 125 |
| 地中電線路 | chichuu-densen.md | 解釈120〜142条 | ★★★☆☆ | 74 |
| 保護装置 | hogo-sochi.md | 省令14〜15条 | ★★★★☆ | 132 |
| 電気工作物の分類 | kosakubutsu-bunrui.md | 事業法38条,施行規則48条 | ★★★☆☆ | 47 |

---

## 引継ぎ実行方法

次セッション開始時：

```
inbox/handoff-2026-05-01-denken-wiki-houki.md を読んで実装続行して
```

まず案Aのカラー変更から実施。custom.css と mkdocs.yml を編集し push → GitHub Actions 確認 → 案Bに進む。
