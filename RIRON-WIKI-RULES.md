# 理論Wiki（改）品質ルールブック
<!-- last updated: 2026-04-27 | session: riron-wiki migration -->

このファイルは「理論Wiki（改）」の執筆・移植・レビューで守るべきルールを定義する。
別セッション開始時に Claude に「RIRON-WIKI-RULES.md を読んで」と伝えるだけで即戦力になる。

---

## 標準ページ構成（セクション順）

```
§原理   id="principle"     （必須）
§公式   id="formulas"      （必須）
§比較   id="comparison"    （必須）
§実務   id="practical"     ← NEW（比較の直後、例題の直前）
§例題   id="examples"      （必須）
§引っかけ id="traps"       （必須）
§正答者vs誤答者 id="correct-vs-wrong" （必須）
§出題実績 id="exam-history"（必須）
§テーマ固有セクション       （任意：半導体=ホール効果など）
```

---

## RULE-01 ページヘッダー3点セット

すべてのページ冒頭に以下3コンポーネントを置く（順番固定）。

```jsx
<MetaStrip difficulty="★★★" importance="A" frequency="中" />
<LearningMap
  prereqs={[{id:"xxx", title:"前提テーマ"}]}
  current="テーマ名"
  nexts={[{id:"yyy", title:"次テーマ"}]}
  onNav={onNav}
/>
<PageHeader
  eyebrow="X.Y — ENGLISH_NAME"
  title="テーマ名"
  deck="1〜2行の核心をつく説明文。"
  meta={[
    { label: "重要度", value: "A" },
    { label: "出題頻度", value: "高（毎年1問、問XX）" },
    { label: "難易度", value: "★★★" },
  ]}
/>
<Crumbs items={[{id:"home",label:"ホーム"},{label:"X. 章名"}]} onNav={onNav} />
```

**importance ランク基準**（reference_denken_importance_rule.md 準拠）
- S: 毎年複数問・配点高・計算必須
- A: 毎年1問以上・絶対落とせない
- B: 隔年出題・余裕があれば
- C: 稀・時間があれば

---

## RULE-02 原理セクション「5秒で思い出す」必須

`<Analogy>` ブロックの**直後**に `<Callout variant="tip" title="5秒で思い出す">` を置く。
試験当日に「これだけ思い出せばOK」の1〜2行に絞る。

```jsx
<h2 id="principle"><span className="h-num">1.</span>原理（なぜ起きるか）</h2>
<Analogy type="xxx" icon="🔧">
  アナロジー説明文
</Analogy>
<Callout variant="tip" title="5秒で思い出す">
  ○○ ＝ ○○の「○○」。○○ ＝ ○○。（具体的に1〜2行）
</Callout>
<p>原理の補足説明文</p>
```

---

## RULE-03 公式テーブル：レイヤーA／B を H3 で明示分割

```jsx
<h2 id="formulas"><span className="h-num">2.</span>公式</h2>
<h3>レイヤーA：基本概念</h3>
<FormulaTable layer="A" rows={[
  { formula: "...", meaning: "...", when: "...", notWhen: "..." },
]} />

<h3>レイヤーB：応用変換</h3>
<FormulaTable layer="B" rows={[
  { formula: "...", meaning: "...", when: "...", notWhen: "..." },
]} />
```

`layer="A"` プロパティだけでなく H3 の「レイヤーA：基本概念」テキストも必ず書く。
視覚的に「ここまでは基本・ここから応用」とわかる分割が目的。

---

## RULE-04 実務セクション（比較表の直後・例題の直前）

**位置**：`<h2 id="comparison">` セクションの最後の要素の直後、`<h2 id="examples">` の直前。

```jsx
<h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
<Callout variant="tip" title="プラント電気・計装での使われどころ">
  （導入文1〜2行：「○○は○○の現場で○○に使われる」の形式）
</Callout>
<table className="data-table">
  <thead>
    <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
  </thead>
  <tbody>
    <tr><td>具体シーン</td><td>関係する物理法則</td><td>現場技術者の具体判断・行動</td></tr>
    {/* 3行固定 */}
  </tbody>
</table>
```

**コンテンツ原則**（feedback_denken_content_rules.md 準拠）
- 固有のエピソード・個人名は禁止。一般的なプラント電気・計装シーンで書く。
- 計算式は使わず、因果の言語化で書く（「○○すると○○になる」の形式）。

---

## RULE-05 引っかけポイント：最低3個、Callout warn

```jsx
<h2 id="traps"><span className="h-num">5.</span>引っかけポイント</h2>
<Callout variant="warn" title="勘違い①：〜と思いがち">
  実際は〜。（1〜3行で正解を明示）
</Callout>
<Callout variant="warn" title="勘違い②：〜">...</Callout>
<Callout variant="warn" title="勘違い③：〜">...</Callout>
```

過去問で実際に誤答を誘う選択肢が使われたものを優先。
「パターンXX」が判明している場合はタイトルに `パターンXX：` を付ける。

---

## RULE-06 正答者 vs 誤答者テーブル：5行以上

```jsx
<h2 id="correct-vs-wrong"><span className="h-num">6.</span>正答者 vs 誤答者</h2>
<table className="data-table">
  <thead>
    <tr><th>観点</th><th>❌ 誤答者</th><th>✅ 正答者</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>観点名</td>
      <td>誤答者の典型的な思い込み</td>
      <td>正答者の正確な理解フレーム</td>
    </tr>
    {/* 最低5行 */}
  </tbody>
</table>
```

---

## RULE-07 出題実績テーブル：H18以降を4列で記載

```jsx
<h2 id="exam-history"><span className="h-num">7.</span>出題実績</h2>
<table className="data-table">
  <thead>
    <tr><th>年度</th><th>問</th><th>形式</th><th>何が問われたか</th></tr>
  </thead>
  <tbody>
    <tr><td>R07上</td><td>問XX</td><td>穴埋 or 論説</td><td>出題内容の要約</td></tr>
    {/* H18〜最新まで */}
  </tbody>
</table>
```

テーブル直後に出題頻度サマリを1行添える：
```jsx
<p>→ 出題頻度: ★★★★（毎年度1問、問XXに固定）</p>
```

---

## RULE-08 Callout variant の使い分け

| variant | 用途 | 表示スタイル |
|---|---|---|
| `tip` | 「5秒で思い出す」「実務での使われどころ」「覚え方」 | 緑系 |
| `warn` | 引っかけポイント・よくある勘違い | 黄/橙系 |
| `note` | 補足説明・出題実績メモ・判断手順 | 青系 |
| `info` | Level 3 実務との接点 | 灰系 |

---

## RULE-09 admonition の畳み方（feedback_admonition_visibility.md 準拠）

- **常時表示**（`!!!` 相当 = JSXで直接記述）：説明コンテンツ・引っかけ・実務
- **折りたたみ**（`details` タグ）：quiz解答・Level 2/3 数学的補足

```jsx
{/* 常時表示 */}
<Callout variant="note" title="タイトル">内容</Callout>

{/* 折りたたみ（例題解答） */}
<details>
  <summary>解答</summary>
  <p>...</p>
</details>
```

---

## RULE-10 ページフッター：PageNav 必須

```jsx
<PageNav
  prev={{id:"xxx", title:"X.X テーマ名"}}
  next={{id:"yyy", title:"Y.Y テーマ名"}}
  onNav={onNav}
/>
```

---

## RULE-11 JSX エスケープ規則

```jsx
// NG: <, > をそのまま使う
<td>VL > VP → 順バイアス</td>

// OK: JSX エスケープ
<td>VL {'>'} VP → 順バイアス</td>
<td>アノード電位 {'<'} カソード電位</td>
```

数式は `<Eq tex="..." />` コンポーネントを使う（文字列としてテキスト中に書かない）。

---

## 移植品質チェックリスト（旧GH Pages→理論Wiki（改））

新しいページを移植・新規作成したら以下を確認する：

- [ ] **M1** MetaStrip importance が正しいランク（S/A/B/C）になっているか
- [ ] **M2** LearningMap の prereqs / nexts が接続されているか
- [ ] **M3** 「5秒で思い出す」が原理セクション末に存在するか
- [ ] **M4** 公式が「レイヤーA：基本概念」「レイヤーB：応用変換」のH3で分割されているか
- [ ] **M5** テーマ固有の重要セクション（ホール効果★★★★★等）が適切な見出しレベルになっているか
- [ ] **M6** 深掘りが必要な箇所に Level 2/3 の `<details>` 補足があるか
- [ ] **M7** ページ末に最終確認日・バージョン表記があるか（任意、目標v1.0時に付与）
- [ ] **M8** 略語（FET・MOSFET・等）に省略説明があるか
- [ ] **M9** テーマ固有の補足公式・図解・計算例が網羅されているか
- [ ] **M10** 「実務でどう活きる」セクション（RULE-04）があるか

---

## ルール追加・変更方法

このファイルに直接 `RULE-XX: タイトル` 形式で追記する。
会話中に「これいいな」と思ったら：
> **「RIRON-WIKI-RULES.md に RULE-XX として追加して」**

で即反映。ファイル末尾の CHANGELOG に日付と変更内容を1行記録する。

---

## CHANGELOG

| 日付 | 変更内容 |
|---|---|
| 2026-04-27 | 初版作成（RULE-01〜11・移植チェックリストM1〜M10） |
