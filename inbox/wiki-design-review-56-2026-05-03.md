---
title: 56.md デザイン監修レポート（アイブ・ラムス・佐藤可士和・ショガー合議）
created: 2026-05-03
target: denken-wiki/docs/articles/kijun/56.md
version: v4.4
reviewers: [ジョナサン・アイブ, ディーター・ラムス, 佐藤可士和, スティーブ・ショガー]
status: 改善提案（実装は未着手）
---

# 56.md デザイン監修レポート

## 結論（BLUF）

56.md は**内容は完成度が高い**（不動・江間・早川が監修済・数値検証PASS）が、**視覚デザインに装飾過多が10箇所**ある。優先度高3件を修正すれば、装飾的ノイズを 60%削減 + 保守性向上できる。

| # | 改善項目 | 影響範囲 | 工数 | 優先度 |
|---|---|---|---|---|
| 1 | 冒頭メタ表の二重表記（🔥🔥 + ★★☆☆☆）を1方式に統一 | 全条文記事 | 5分 | **高** |
| 2 | 装飾絵文字（📊📜⚡🔌📏🔧📚🎯）の削減 | 1ファイル | 10分 | **高** |
| 3 | inline `<style>` ブロック（60行）を custom.css に移動 | 全条文記事の全体像SVG | 20分 | **高** |
| 4 | admonition 7種類 → 4種類に圧縮（tip/note統合、abstract/info統合） | 全条文記事 | 30分 | 中 |
| 5 | ==マーカー==使用を section 13（正解選択肢）のみに限定 | 1ファイル | 10分 | 中 |
| 6 | section 14 委任フロー表を section 1 と統合・圧縮 | 1ファイル | 15分 | 中 |
| 7 | SVG内 font-size 固定値 → CSS変数化（design-tokens 連携） | SVG 2件 | 15分 | 低 |
| 8 | linear-gradient 乱用（全体像クロス図の5色グラデ） | CSS | 10分 | 低 |
| 9 | section 12 ひっかけ番号付きリストの 🔴🟡🟢 を残す（意味あり） | — | — | 維持 |
| 10 | セルフチェック折りたたみ（??? question）の使用パターンは効果的 | — | — | 維持 |

---

## 1. ラムス10原則チェックリスト

| # | 原則 | 評価 | 根拠 |
|---|---|---|---|
| 1 | Innovative | ✅ | 全体像ハブ&スポーク図は効果的（denken-hoki-style.md §2.1.2 確立済） |
| 2 | Useful | ✅ | 学習者の認知順序（森→要点→かみ砕き）が正しい |
| 3 | Aesthetic | ⚠️ | 全体像クロス図のlinear-gradient 5色＋shadow、色数過多 |
| 4 | Understandable | ⚠️ | 絵文字10種類混在（📊📜⚡🔌📏🔧📚🎯🔴🟡🟢🔥）、何が重要か瞬時に分からない |
| 5 | Unobtrusive | ❌ | inline `<style>` 60行・shadowアニメーション、本文を圧迫 |
| 6 | Honest | ⚠️ | admonition 7種類（abstract/info/tip/warning/example/note/success）の意味の差が曖昧 |
| 7 | Long-lasting | ❌ | inline CSS は将来の一括保守を阻害（19テーマに同パターン展開済の場合・修正コスト爆発） |
| 8 | Thorough | ✅ | 出典・監修ログ・数値検証日 完備 |
| 9 | Eco-friendly | ✅ | 軽量HTML（557行・SVG 2件） |
| 10 | As little as possible | ❌ | section 14 と section 1 の表が部分重複・装飾要素過多 |

**総合評価**: 10原則のうち **3違反 / 3警告 / 4合格**。装飾削減で「合格 8 / 警告 2 / 違反 0」を目指す。

---

## 2. アイブ「装飾削減」観点 — 優先度高3件の詳細

### 改善1: 冒頭メタ表の二重表記

**現状**（L4-5）:
```markdown
- **出題頻度**: 🔥🔥 ★★☆☆☆（過去14年で 2 回出題）
```

🔥🔥 と ★★☆☆☆ は**同じ情報を2方法で表記**している。アイブ原則：「2つの方法で同じことを表現するときは、1つを削れ。」

**改善案**:
```markdown
- **出題頻度**: ★★☆☆☆（過去14年で 2 回出題）
```

🔥 系統は section 6 要素1（電圧区分の試験頻度列）でも使用されているため、**全廃ではなく「メタ表は★、本文中の頻度マーカーは🔥」と役割分担**する。

**横展開**: 全条文記事（5.md, 14.md, 22.md, 56.md, 58.md...）で同パターン。grep で一括置換可能。

```bash
grep -nE "🔥+ ★+|★+ 🔥+" denken-wiki/docs/articles/kijun/*.md
```

### 改善2: 装飾絵文字の削減

**現状**（L24・L522-542）:
- 全体像クロス図の各ノード冒頭: 📜 ⚡ 🔌 📏 🔧
- section 16 最終チェックのカテゴリヘッダ: 📜 🔌 📚 🎯

**判定**: いずれも**装飾絵文字**。原則6 Honest違反（情報密度が上がっていない・ノイズ）。

**残すべき絵文字**（意味あり）:
- 🔴🟡🟢（section 12 優先度マーカー）→ 視覚的優先度区分として機能
- ✅ ❌ ⚠️（チェック・警告）→ 状態表示として機能

**削減すべき絵文字**:
- 📜 ⚡ 🔌 📏 🔧 📚 🎯 🔥 📊 → 全部装飾。**削除推奨**

ラムス原則4: hierarchy は色と太さ（bold）で作る。絵文字で見出しを「目立たせる」のは fake hierarchy。

### 改善3: inline `<style>` ブロックを custom.css に移動

**現状**（L24 の終端 `</style>` まで約60行）:
```html
<div class="article-overview-cross">
  <!-- マークアップ ~30行 -->
</div>
<style>
  .article-overview-cross{...}
  .article-overview-cross .ov-row{...}
  /* ...全60行のCSS... */
</style>
```

**問題**:
- 同パターンが全条文記事（推定19テーマ × 各記事数本）に展開されている場合、**1箇所修正で全体に反映できない**
- inline CSS は MkDocs Material のstyle読み込み順序の制御外
- 現在 design-tokens.css が利用可能なのに、独自色（`#ffe5e5`/`#ffcdd2`/`#ffefdc` 等のリテラル）を直書き

**改善案**:

1. inline `<style>` ブロックの中身を `custom.css` の末尾に「Article Overview Cross」セクションとして移動
2. 色リテラルを design-tokens.css 経由で表現:
   - `#ffe5e5` → `var(--color-danger-bg)` (要追加) または既存 admonition warning パターン
   - `#bbdefb` → `var(--accent-100)`
   - `#dcedc8` → `var(--color-success)` 系
3. `box-shadow` を `var(--shadow-sm)` / `var(--shadow-md)` に置換
4. `border-radius: 10px` → `var(--radius-md)` または `var(--radius-lg)`
5. 各記事の `<style>` ブロックは削除し、マークアップ `<div class="article-overview-cross">...</div>` のみ残す

**効果**: 全記事でクロス図デザインが統一・修正は custom.css 1箇所のみ。Long-lasting原則準拠。

---

## 3. 佐藤可士和「情報整理」観点 — 重複の検出

### 重複1: section 1 全体像表 vs section 14 委任フロー表

**section 1**（L26-33）— 6行の表:
| 条文 | 役割 | 第56条との関係 |

**section 14**（L490-496）— 5行の表:
| ステップ | 条文 | 内容 |

両者は**同じ情報を異なる視点で再掲**している。佐藤可士和原則: 「整理とは、捨てる勇気」。

**判定**: section 14 の委任フロー表は **section 1 のサマリ＋詳細補足** に圧縮可能。section 14 は条文リンク（箇条書き）と関連解釈条文番号のみに絞る。

**削減見込み**: 7行 → 0行（表削除・補足コメントに圧縮）

### 維持すべき要素（圧縮しない）

- **section 11 試験で問われること** と **section 12 頻出ひっかけ**: 観点が違う（出題パターン分類 vs 誤答パターン）。denken-hoki-style.md §2.3 で別セクション必須化されているため**維持**
- **セルフチェック折りたたみ**（5箇所）: 学習者の能動性を引き出す効果あり・**維持**

---

## 4. ショガー「実装」観点 — design-tokens.css 連携

inline `<style>` ブロックを custom.css に移動するとき、既存の直書きカラーをトークン化:

| 直書き | 推奨置換 |
|---|---|
| `#ffe5e5,#ffcdd2` (上方ノード bg) | `var(--color-danger-bg, #ffebee)` |
| `#c62828` (上方ノード border) | `var(--color-danger)` |
| `#ffefdc,#ffe0b2` (左ノード bg) | warm-tip 系（要トークン追加） |
| `#bbdefb,#64b5f6` (中央ノード bg) | `var(--accent-100), var(--accent-300)` |
| `#cfe9fc,#b3e5fc` (右ノード bg) | `var(--accent-50), var(--accent-100)` |
| `#dcedc8,#c8e6c9` (下方ノード bg) | success系（要トークン追加） |
| `box-shadow:0 2px 5px rgba(0,0,0,.07)` | `var(--shadow-sm)` |
| `box-shadow:0 4px 10px rgba(0,0,0,.12)` | `var(--shadow-md)` |
| `border-radius:10px` | `var(--radius-md)` |

**追加トークンの提案**（design-tokens.css の次回更新時）:

```css
/* セマンティック背景（admonition / overview node 用） */
--color-danger-bg:  #FFEBEE;
--color-warning-bg: #FFF3E0;
--color-success-bg: #E8F5E9;
--color-info-bg:    var(--accent-50);
```

---

## 5. 「Wiki監修」コマンド適用例

このレポートは「Wiki監修 56.md」コマンドの**デザイン監修班のみ発言**パターンの初運用例。

不動・江間・早川（内容班）は今回沈黙。理由: v4.4で内容PASS済・数値検証完了済のため、**新たな内容変更は不要**と判定。CLAUDE.md L82-90「文脈駆動」運用ルールが正しく機能した。

---

## 6. 早川 義晴（教育明瞭性）からの一言

> 「装飾削減はぜひ進めてください。ただし、絵文字削除を急ぎすぎないように。学習者にとって 📜（条文）/⚡（過電流）/🔌（配線）の絵文字は**索引アイコン**として機能している側面もあります。section 16 最終チェックの絵文字は『科目分類』のメタ情報として有用なので、削るときは『削った後の代替（カテゴリラベル）』を必ず用意してください。」

→ アイブ・ラムスの「削減」原則と早川の「学習者目線」の折衷案: **section 16 の絵文字は文字ラベル（「条文」「配線」「物理」「試験」）に置換**する。完全削除ではなく、**装飾→意味のある分類見出し**に昇格させる。

---

## 7. 次の一手

| 優先度 | アクション | 担当 | 工数 |
|---|---|---|---|
| **P1** | 改善1（メタ表二重表記）を全条文記事で一括修正 | ふるたち本人 | 30分 |
| **P2** | 改善3（inline style → custom.css 移動）を 56.md でPilot実施 | ショガー | 20分 |
| **P3** | デザイントークン追加（`--color-danger-bg` 等の semantic-bg 4色） | ショガー | 10分 |
| P4 | 改善2（装飾絵文字削減）を 56.md で実施 | アイブ + 早川 | 15分 |
| P5 | 56.md Pilot成功後、他条文記事に横展開（残18記事） | デザイン班 | 各15分 |

実施は別セッションで段階的に進める。今回はレビューレポートのみ。

---

## 8. レビュー所感（合議）

- **アイブ**: 「Internally consistent な設計を保ちつつ、装飾を10件削るだけで quality が一段上がる。inline styleの分離が最重要。」
- **ラムス**: 「原則6 Honest と原則10 Less の違反が重なっている。順序立てて削れば直る。」
- **佐藤可士和**: 「section 14 の表は不要。1箇所で言うべきことを2箇所で言うのは情報整理の敗北。」
- **ショガー**: 「全部 design-tokens.css に乗せ替え可能。実装は機械的。」
- **早川**: 「内容は完成済なので、デザイン整理だけに集中できる良いタイミング。」

---

*作成日: 2026-05-03 | 対象: denken-wiki/docs/articles/kijun/56.md (v4.4) | 監修: F-DENKEN-WIKI監修部 デザイン班 | 関連: [design-tokens-adoption-2026-05-03.md](design-tokens-adoption-2026-05-03.md)*
