---
title: 引継ぎ: electromagnetic-force ページ改善（続き）
date: 2026-04-30
status: handoff
---

# 引継ぎ: electromagnetic-force Wiki改善（優先度B以降）

## 続きの実装コマンド
```
inbox/handoff-2026-04-30-wiki-electromagnetic-force.md を読んで実装続行して
```

## 完了済み（優先度A — 前セッションで適用済み）

| # | 内容 | 結果 |
|---|------|------|
| A1 | SVGラベル `F=BIL` → `F=BILsinθ` + figcaptionに指の対応追加 | 完了 |
| A2 | TrapBlock①：FBI記憶法「親指F・人差し指B・中指I、左手のみ電動機有効」を明示 | 完了 |
| A3 | TrapBlock新規追加：「θ≠90°のとき全長Lをそのまま代入するミス」 | 完了 |

検証: `wiki_verify.py electromagnetic-force` → JSエラーなし・h2=11・TOC正常

---

## 未完了タスク（優先度B）

### B1: SVG色コード統一（B=青・I=緑・F=赤）

**問題**: 現在のSVG（5枚）で矢印色がバラバラ。B（磁界）・I（電流）・F（力）に統一色を適用していない。

**目標色**:
- 力 F → `#e53935`（赤）
- 磁界 B → `#1565c0`（青）
- 電流 I → `#2e7d32`（緑）

**対象SVG**: 電磁力ページ内の `<svg>` 要素5枚
```
Grep で "emf13" や "svg viewBox" を使って行番号を特定してから修正
```

**実装手順**:
1. `Grep pattern="<svg.*aria-label" path=denken3-riron-wiki.html` → electromagnetic-force ページの5枚を特定
2. 各SVGのI（電流）矢印色を `#e65100`(現状のオレンジ) → `#2e7d32`（緑）に変更
3. 凡例テキスト（"× ＝ B（紙面奥）" など）を B=青・I=緑・F=赤で色付け
4. `wiki_verify.py electromagnetic-force` で確認

### B2: 左手則 vs 右手則 比較SVG追加

**問題**: 左手（電動機）と右手（発電機）を並べた視覚的比較がない。テキスト説明だけで混同リスクが高い。

**追加場所**: 比較表（`<h2 id="comparison">` セクション）の直後、`<table className="data-table">` の前

**SVG仕様**:
- 横幅 400px、2列並び（左：左手則、右：右手則）
- 左手側: 親指←（F）・人差し指奥（B）・中指↑（I）を矢印で図示
- 右手側: 親指→（v）・人差し指奥（B）・中指↑（e）を矢印で図示
- ラベル: 左側に「電動機（左手）」、右側に「発電機（右手）」

**実装手順**:
1. `Grep pattern='id="comparison"'` で比較セクションの行番号を特定
2. `Read` で ±20行確認
3. SVGを `<figure>` でラップして比較表の直前に挿入
4. `wiki_verify.py electromagnetic-force` で確認

---

## 優先度C（任意）

- **C1**: T（テスラ）単位変換の注記（`1T = 1 Wb/m² = 10,000 Gauss`）を公式表のどこかに追加
- **C2**: アンペアの法則の適用条件「対称性が必要」を既存説明に追記

---

## ファイル・環境情報

| 項目 | 値 |
|------|---|
| 対象ファイル | `C:\Users\kfuru\.secretary\denken3-riron-wiki.html`（約11,000行） |
| ローカルサーバー | `http://localhost:8092/denken3-riron-wiki.html#electromagnetic-force` |
| 検証ツール | `python wiki_verify.py electromagnetic-force` |
| 監査ファイル | `inbox/wiki-clarity-audit-electromagnetic-force.md` |
| 編集フロー | Grep → Read ±20行 → Edit → wiki_verify.py（HTMLファイル全体Read禁止） |

## 注意事項

- `§` 記号使用禁止（数字＋ピリオド形式で）
- 数式は `<Eq tex="..." />` を使う（生テキスト $...$ はレンダリングされない）
- `preview_snapshot` / `preview_screenshot` 禁止（代わりに `wiki_verify.py` を使う）
- ブラウザスクリーンショット（MCP Chrome）はセッション全体で最大1枚
