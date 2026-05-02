---
title: "denken-hoki-wiki HoukiOverviewSvg コンポーネント仕様"
category: "電験3種"
level: "published"
created: "2026-05-02"
last_reviewed: "2026-05-02"
understanding_score: 5
source: "P2+P3実装で確立（5ページ × section 1 全体像SVG展開）"
tags: ["電験3種", "法規", "React", "コンポーネント", "SVG", "水平展開"]
related: ["knowledge/houki/houki-wiki-page-guideline.md", ".claude/rules/denken-hoki-style.md"]
---

# HoukiOverviewSvg コンポーネント仕様

## TL;DR

`denken-hoki-wiki.html` の section 1「全体像」用ハブ＆スポーク型 SVG コンポーネント。**1ページ ~5分**で section 1 全体像が完成する props 駆動設計。残 StubPage 46本 実装で標準テンプレ化する。

## 配置

`C:\Users\kfuru\.secretary\denken-hoki-wiki.html`（MemTable 定義の直前）

## API（props）

```jsx
<HoukiOverviewSvg
  center={{ label: '...', sub: '...', theme: 'blue' }}    // 必須・本条
  top={{    label: '...', sub: '...', theme: 'red',    arrowLabel: '上位' }}
  left={{   label: '...', sub: '...', theme: 'orange', arrowLabel: '内訳' }}
  right={{  label: '...', sub: '...', theme: 'cyan',   arrowLabel: '内訳' }}
  bottom={{ label: '...', sub: '...', theme: 'green',  arrowLabel: '委任' }}
/>
```

| prop | 役割 | テーマ規範 |
|---|---|---|
| `center` | 本条（中央・太枠） | `blue`（青系） |
| `top` | 上位条文（省令・電気事業法等） | `red`（赤系） |
| `left` | 並立／例外／具体化 1 | `orange`（橙系） |
| `right` | 並立／例外／具体化 2 | `cyan`（水色系） |
| `bottom` | 委任先・関連 | `green`（緑系） |

`arrowLabel` は矢印に添えるラベル（「上位」「由来」「内訳」「委任」「具体化」「例外」「区分」など）。

## レイアウト仕様

- viewBox: `720 × 340`
- 中央 `295,140 - 425,205`（130×65・太枠 stroke 2.5）
- 上 `300,20 - 420,75`（120×55）
- 左 `85,140 - 245,200`（160×60）
- 右 `480,140 - 640,200`（160×60）
- 下 `300,265 - 420,320`（120×55）
- 矢印は `marker-end="url(#hoArr)"` で先端付き（CLAUDE.md `denken-hoki-style.md §2.1.3` 準拠）

## 使用例（実装済 5ページ）

| ページ | center | top | left | right | bottom |
|---|---|---|---|---|---|
| KojiShiHo | 電気工事士法 | 電気事業法 | 一般用工作物 | 自家用工作物 | 施行規則 |
| Setsuchi | 電技解釈第17条 | 電技省令第11条 | B種(150/Ig) | A・C・D種 | 解釈第18・19条 |
| Zetsuen | 解釈第14・15条 | 電技省令第5条 | 低圧(1.5倍) | 高圧/特高(1.25倍) | 中性点直接接地特例 |
| Rikkaku | 解釈第68・71条 | 電技省令第25・29条 | 第68条(高さ) | 第71条(離隔) | 第75・78条等 |
| DenAtsuKubun | 電技省令第2条 | 電気事業法 | 低圧 | 高圧 | 特別高圧 |

## 関係表とのセット運用（Paivio 二重符号化）

`HoukiOverviewSvg` だけではアクセシビリティ・検索性に欠けるため、必ず直後に `MemTable` で関係表（条文/役割/本条との関係）を併置する。`denken-hoki-style.md §2.1.3` の「重複ではなく相補」ルール準拠。

```jsx
<HoukiOverviewSvg ... />
<MemTable
  headers={["条文/規定", "役割", "本条との関係"]}
  rows={[ ... ]}
  source="出典：..."
/>
```

## StubPage 46本への展開フロー

1. ページの「条文タイプ」を判定（規範型A／実装型B／構造型C）
2. center に本条、top に上位、left/right に内訳/並立、bottom に委任先を割り当てる
3. arrowLabel をタイプ別に選択：
   - 規範型A: 上位／例外／委任
   - 実装型B: 由来／内訳／実装
   - 構造型C: 由来／区分／適用
4. 関係表 4行（出典付き）を MemTable で続ける

## 落とし穴

- `top/left/right/bottom` は省略可だが、**省略すると矢印も描画されない**（`Box` が `null` を返すため）
- `theme` の typo（`Blue` 等）はフォールバックして青になる（5色: blue/red/orange/green/cyan）
- viewBox 固定なので、文字が長すぎると箱からはみ出す → `label` は8〜12文字、`sub` は10〜14文字以内が目安

## 関連

- 上位ルール: `.claude/rules/denken-hoki-style.md §2.1.2 全体像SVGの必須化`
- ページ構造: `knowledge/houki/houki-wiki-page-guideline.md`
- 配置先: `denken-hoki-wiki.html`（function 定義はファイル内）
