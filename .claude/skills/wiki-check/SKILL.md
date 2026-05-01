---
name: wiki-check
description: denken3-riron-wiki の全コンポーネントを1パスで品質評価するスキル。定義・ルーティング・セクション完全性を確認し、課題ページを即特定する。
triggers: ["wiki評価", "wikiチェック", "wiki品質チェック", "リロン評価", "riron評価", "wiki check"]
dependencies: ["evaluate_wiki.py"]
---

# Wiki Check スキル

## 概要

`evaluate_wiki.py` を実行して denken3-riron-wiki の全コンポーネント（35ページ/9章）を評価する。
エージェントが grep/find を10回以上繰り返す代わりに、Python1パスで完結（87%トークン削減）。

## 実行手順

### 基本実行（全評価）

```bash
python C:/Users/kfuru/.secretary/evaluate_wiki.py
```

### 課題のみ表示

```bash
python C:/Users/kfuru/.secretary/evaluate_wiki.py --issues-only
```

### 特定章のみ

```bash
python C:/Users/kfuru/.secretary/evaluate_wiki.py --chapter ch5
```

### 利用可能フラグ

| フラグ | 説明 |
|-------|------|
| `--chapter <id>` | ch1〜ch8, ref で絞り込み |
| `--issues-only` | 課題ありページのみ表示 |
| `--component <Name>` | 単一コンポーネント詳細 |
| `--json-only` | JSON出力のみ（ターミナル表なし） |

## 出力

- **ターミナル表**: Component / File / Lines / MetaStrip / LearningMap / §1-§6 / PageNav / Score
- **JSONレポート**: `C:/Users/kfuru/.secretary/wiki-evaluation.json`

## 評価項目

| 記号 | 意味 |
|-----|------|
| M | MetaStrip（難易度・重要度・出題頻度） |
| L | LearningMap（前提・次のトピック） |
| S1〜S6 | §1原理〜§6関連（コンテンツ章のみ対象） |
| Nav | PageNav（前後ナビ） |
| Score | 重み付き完全性スコア（コンテンツ章はフル評価、非コンテンツ章は簡易評価） |

## 対象ソースファイル

- `riron-pages-batch1.jsx` (b1) — CapacitorPage, AcPowerPage, ThreePhasePage, TransistorPage
- `riron-pages-batch2.jsx` (b2) — 9コンポーネント（電磁気・回路系）
- `riron-pages-batch3.jsx` (b3) — 7コンポーネント（Bridge, Semiconductor他）
- `riron-pages-strategy.jsx` (st) — 攻略・ガイド系
- `riron-components.jsx` (cm) — TrapPatternsPage
- `denken3-riron-wiki.html` (html) — ch8（効率的な勉強の仕方）11ページ

## 典型的な使い方

```
# セッション開始時に現状把握
python evaluate_wiki.py --issues-only

# ch5（電子理論）編集後の確認
python evaluate_wiki.py --chapter ch5

# 全章最終チェック
python evaluate_wiki.py
```
