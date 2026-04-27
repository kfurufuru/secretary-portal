---
name: 電験Wiki M-rule追加作業 引き継ぎ
description: denken3-riron-wiki.html のM-ruleチェックリスト残タスクの引き継ぎ
type: project
---

# denken3-riron-wiki.html M-rule追加 引き継ぎ

## 対象ファイル

`C:\Users\kfuru\.secretary\denken3-riron-wiki.html`
プレビュー: `http://localhost:8092/denken3-riron-wiki.html`
ルール定義: `C:\Users\kfuru\.secretary\RIRON-WIKI-RULES.md`

---

## 本セッション完了済み（触らなくていい）

| M-rule | 内容 | 対象ページ |
|--------|------|-----------|
| M14 | 旧 `Callout variant="warn"` → `TrapBlock` 変換 | Capacitor/AcPower/ThreePhase/Transistor/Transient（16ブロック） |
| M3 | `<Callout variant="tip" title="5秒で思い出す">` を Analogy 直後に追加 | 全15テーマページ |
| M7 | `// last-updated: YYYY-MM-DD | vX.X | ...` コメントを各ページ先頭に追加 | 全15テーマページ |
| M10 | `<h2 id="practical">実務でどう活きる</h2>` + 3行テーブル追加 | 全15テーマページ |

---

## 現在のページバージョン

| バージョン | ページ |
|-----------|--------|
| v0.9 | Capacitor, AcPower, ThreePhase, Transistor, Transient, Semiconductor |
| v0.8 | DcCircuit, AcBasics, CoulombField, ElectromagneticForce, MagneticCircuit, RlcResonance, Inductance, OpAmp, Measurement |

v1.0 条件: **M1〜M26全チェック通過**（RIRON-WIKI-RULES.md 参照）

---

## 残タスク（優先度順）

### 優先度：高

#### M4 — 公式レイヤー分割
**ルール（RULE-03）**: 公式を `<FormulaTable layer="A">` と `<FormulaTable layer="B">` に分割する。
- 確認方法: `grep -n 'FormulaTable' denken3-riron-wiki.html` で layer 属性なしのものを探す
- 対処: layer="B" ブロック（応用変換・複合公式）が未追加のページに追加

#### M6 — details 補足
**ルール（RULE-08）**: 深掘り箇所に `<details><summary>...</summary>...</details>` を追加。
- 確認方法: `grep -n '<details>' denken3-riron-wiki.html` で件数チェック
- 対象候補: CoulombFieldPage, MagneticCircuitPage, RlcResonancePage — 計算例が薄い

### 優先度：中

#### M9 — テーマ固有補足
各ページに出題実績の高い計算パターン・比較表が揃っているか。
- 確認方法: RIRON-WIKI-RULES.md の M9 欄を読んでから各ページ確認
- 対象候補: MagneticCircuit（磁気回路の複合問題）、RlcResonance（Q値計算）

#### M11〜M26 — 未監査
前セッションで M1〜M10 は概ね対応済み。M11以降（RIRON-WIKI-RULES.md 参照）は未確認。

---

## 確認方法

```bash
# 残存する旧形式（warn Callout）がないか確認
grep -n 'variant="warn"' denken3-riron-wiki.html

# 5秒で思い出す 件数確認（15件が正）
grep -c '5秒で思い出す' denken3-riron-wiki.html

# 実務セクション 件数確認（15件が正）
grep -c 'id="practical"' denken3-riron-wiki.html

# last-updated コメント 件数確認（15件が正）
grep -c 'last-updated:' denken3-riron-wiki.html
```

---

## 続行コマンド

```
inbox/handoff-2026-04-28-denken-wiki.md を読んで実装続行して
```
