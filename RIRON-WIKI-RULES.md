# 理論Wiki（改）品質ルールブック
<!-- last updated: 2026-04-27 | session: riron-wiki migration -->

このファイルは「理論Wiki（改）」の執筆・移植・レビューで守るべきルールを定義する。
別セッション開始時に Claude に「RIRON-WIKI-RULES.md を読んで」と伝えるだけで即戦力になる。

---

## RULE-00 Wiki 役割分担定義（最優先）

2つの理論 Wiki は **役割が異なる**。混在・混同禁止。

| | 理論Wiki（旧） | 理論Wiki（改） |
|---|---|---|
| URL | https://kfurufuru.github.io/denken-wiki-riron/ | file:///C:/Users/kfuru/.secretary/denken3-riron-wiki.html |
| 基盤 | MkDocs + GitHub Pages | 単一 HTML（JSX in JS） |
| 役割 | 公開・SEO・外部共有用 | 実験・高速改修・本命コンテンツ |
| 正本 | ❌ 旧は参照元 | ✅ **改が正本** |
| 移植方向 | 旧 → 改（一方向） | — |

**編集ルール**
- コンテンツ追加・改修は**すべて「改」に対して行う**
- 「旧」は過去問マッピングなどレガシー参照用として保持するが、新規コンテンツは書かない
- 「どちらに書くべきか」迷ったら常に「改」

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

## RULE-05 引っかけポイント：TrapBlock 3層構造（正解→誤解→判別ステップ）

**why**: 旧 `Callout variant="warn"` は誤解をタイトルに置く構造のため、誤情報優位効果（先に読んだ誤情報が記憶に焼き付く現象）で逆効果になっていた。`<TrapBlock>` は「正解を最上段で先に脳に刻む → 誤解は補足扱い → 行動知識（判別ステップ）」の順で、5秒で正解を把握でき、判別ロジックが手順化される。

```jsx
<h2 id="traps"><span className="h-num">5.</span>引っかけポイント</h2>

<TrapBlock
  correct="1文で正しい原則を断定。学習者が最初に読む内容。"
  trap="誤解パターンを1文で。補足扱いなので長く書かない。"
  cite="R07上・H25 出題"
  steps={[
    "判別の第1ステップ（観察・特定）",
    "判別の第2ステップ（条件判定）",
    "判別の第3ステップ（結論）",
  ]}
/>
```

**必須要件**
- 1ページに最低3個
- 過去問で実際に誤答を誘う選択肢が使われたものを優先
- `cite` には出題年度を必ず記載（マーカー要件 RULE-12 と連動）
- `steps` は3〜4個。手順化された行動知識にする（「○○を確認 → ○○なら○○」形式）

**禁止**
- 旧 `<Callout variant="warn" title="勘違い①：...">` 構造の新規追加
- `correct` に複数文を詰め込むこと（1文厳守）
- `trap` に「なぜ間違えるか」の長文解説を入れること（→ `steps` で吸収）

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

## RULE-12 比較セクション（§比較）の形式

**位置**：`<h2 id="comparison">` — 公式セクションの直後、実務セクションの直前。

```jsx
<h2 id="comparison"><span className="h-num">3.</span>比較・整理</h2>
<table className="data-table">
  <thead>
    <tr>
      <th>観点</th>
      <th>A（例：N型）</th>
      <th>B（例：P型）</th>
      {/* 候補が3つ以上の場合はC列を追加 */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>観点名（キャリア・温度特性 等）</td>
      <td>Aの特徴</td>
      <td>Bの特徴</td>
    </tr>
    {/* 最低4行 */}
  </tbody>
</table>
```

**列構成ルール**
- 第1列「観点」は学習者が混同しやすい軸を選ぶ（過去問頻出の比較軸を優先）
- 比較候補が2つ：A / B の2列構成
- 比較候補が3〜4つ：3〜4列構成（列幅 `style={{width:"22%"}}` 等で均等化）
- セル内に過去問で問われた語句があれば `<span className="marker">` を付与（RULE-12→旧RULE-12を参照）

---

## RULE-13 例題セクション（§例題）の構造

**位置**：`<h2 id="examples">` — 比較セクションの直後、引っかけの直前。

```jsx
<h2 id="examples"><span className="h-num">4.</span>例題</h2>

{/* 例題ブロック（1問ずつ繰り返し） */}
<Callout variant="note" title="例題X：問題文タイトル（出題年度があれば記載）">
  （問題文。選択肢形式 or 穴埋め形式で提示）
</Callout>

<details>
  <summary>解答・解説</summary>
  <p>ステップ①：…</p>
  <p>ステップ②：…</p>
  <p><strong>答え：選択肢X</strong></p>
</details>

<Callout variant="tip" title="この例題のツボ">
  1〜2行で「なぜその答えか」の核心を言い切る。
</Callout>
```

**構造ルール**
- 順序固定：「問題文Callout → details折りたたみ解答 → tipツボ」
- `<details>` はスマホ表示を必ず確認してから採用（長い解説の場合のみ折りたたみ）
- 例題は最低2問、理想3〜5問（過去問の実出題を含める）
- 過去問からの引用は `title="例題X：… (R04 問XX)"` のように年度・問番号を明記

---

## RULE-14 過去問出題箇所はマーカーでハイライト

**why**: 学習者は「どこが過去問で問われたか」を一目で識別したい。出題された具体フレーズに `<span className="marker">` を付与することで、表・本文の中でも視覚的にスキャンできる。直前期の総ざらいで効率が劇的に上がる。

```jsx
{/* 表セル内 */}
<td><span className="marker">正孔が偏った側が高電位（＋）</span></td>

{/* Callout 本文内 */}
<Callout variant="note" title="バラクタダイオードの原理（R02 出題）">
  <span className="marker">逆バイアス電圧 V_R を大きくするほど空乏層が広がり、静電容量 C が小さくなる</span>。
</Callout>
```

**マーキング基準**
- 過去問の選択肢・穴埋め解答で**そのまま正答キーワードとして問われた語句**のみ
- 一般説明文・前提知識・導入文には付けない（マーカーが多すぎると無効化）
- 1ページあたり目安 5〜15箇所（少なすぎても効果なし、多すぎても識別性低下）
- マーキングした箇所には可能な限り `cite` 情報（出題年度）を近くに併記

**`marker` クラス挙動**（既存CSS）
- ライトモード: 黄色（`oklch(0.92 0.18 95)`）の下半分グラデーション
- ダークモード: 黄色の半透明（`oklch(0.55 0.16 95 / 0.55)`）

---

## RULE-15 テーブルは className="data-table" を必須化

**why**: プレーン `<table>` だとボーダー・ヘッダー背景・ストライプが適用されず、画像で確認した通り「表が見にくい」状態になる。CSS は `table.data` / `table.data-table` / `.content table` の3パターンに対応しているが、**新規追加は `className="data-table"` で統一**する。

```jsx
{/* OK */}
<table className="data-table">
  <thead>
    <tr><th>項目</th><th>N型</th><th>P型</th></tr>
  </thead>
  <tbody>
    <tr><td>...</td><td>...</td><td>...</td></tr>
  </tbody>
</table>

{/* NG: クラスなし */}
<table>
  <thead>...</thead>
</table>
```

**ヘッダー必須**
- `<thead>` を必ず置く（背景色・太字を効かせるため）
- 列数が多い場合は `style={{width:"XX%"}}` で列幅を明示

---

## RULE-17 カラーパレット制約：学習集中色合いを維持

**why**: 学習サイトでは派手な赤・原色は集中阻害要因になる。CSS変数 `--danger` は試験的に hue 25（赤系）から hue 45-50（amber系）に移行済み。今後の追加要素もこの方針を踏襲する。

**色トークン使用ルール**

| トークン | 用途 | 制約 |
|---|---|---|
| `--ok` / `--ok-soft` | 正解・成功・実務tip | hue 155前後の緑系を維持 |
| `--accent` / `--accent-soft` | 強調・キー情報・判別法 | hue 155-260前後（forest/aubergine） |
| `--warn` / `--warn-soft` | 注意喚起・追加情報 | hue 50-70前後の amber/yellow |
| `--danger` / `--danger-soft` | 誤解・引っかけ | **hue 45-50 amber系厳守**。hue 0-30の赤は禁止 |

**禁止**
- 直接 `color: red` / `#ff0000` / `crimson` などのリテラル指定
- `--danger` を hue 25以下（赤系）に戻すこと
- `<span style={{color: "red"}}>` のようなインライン赤色指定（→ `<span className="marker">` か CSS変数を使う）

---

## 移植品質チェックリスト（旧GH Pages→理論Wiki（改））

新しいページを移植・新規作成したら以下を確認する：

- [ ] **M1** MetaStrip importance が正しいランク（S/A/B/C）になっているか
- [ ] **M2** LearningMap の prereqs / nexts が接続されているか
- [ ] **M3** 「5秒で思い出す」が原理セクション末に存在するか
- [ ] **M4** 公式が「レイヤーA：基本概念」「レイヤーB：応用変換」のH3で分割されているか
- [ ] **M5** テーマ固有の重要セクション（ホール効果★★★★★等）が適切な見出しレベルになっているか
- [ ] **M6** 深掘りが必要な箇所に Level 2/3 の `<details>` 補足があるか
- [ ] **M7** ページ末に最終確認日・バージョン表記があるか（**必須**。`v1.0 | 最終確認: YYYY-MM-DD` 形式）
- [ ] **M8** 略語（FET・MOSFET・等）に省略説明があるか
- [ ] **M9** テーマ固有の補足公式・図解・計算例が網羅されているか
- [ ] **M10** 「実務でどう活きる」セクション（RULE-04）があるか
- [ ] **M11** 比較セクションが「観点×候補」の列構成になっているか（RULE-12）
- [ ] **M12** 例題が「問題Callout → details解答 → tipツボ」の順序になっているか（RULE-13）
- [ ] **M13** 過去問で問われた具体フレーズに `<span className="marker">` が付与されているか（RULE-15）
- [ ] **M14** 引っかけポイントが `<TrapBlock>` 形式になっているか（RULE-05）
- [ ] **M15** すべての表に `className="data-table"` が付いているか（RULE-16）
- [ ] **M16** 赤系リテラルカラー・hue 25以下の `--danger` 上書きが無いか（RULE-17）

---

## RULE-18 ページ改定日の記録

ページを追加・改修したら**必ず改定日を2箇所に記録**する。

### ① JSXコンポーネント先頭コメント（機械可読・ソース追跡用）

```jsx
const SemiconductorPage = ({ onNav }) => (
  // last-updated: 2026-04-27 | v1.0 | M1/M3/M5移植・実務セクション追加
  <>
    <MetaStrip ... />
```

書式：`// last-updated: YYYY-MM-DD | vX.X | 変更内容の要約（30字以内）`

### ② ページ末尾の表示テキスト（学習者向け・信頼度指標）

```jsx
    <PageNav prev={...} next={...} onNav={onNav} />
    <p style={{fontSize:"0.8em", color:"var(--ink-mute)", marginTop:"2rem"}}>
      最終改定: 2026-04-27 | v1.0
    </p>
  </>
);
```

### バージョン番号の意味

| バージョン | 状態 |
|---|---|
| v0.5 | 骨格のみ（公式・比較表はあるが薄い） |
| v0.7 | 構造・公式・数値検証済み（引っかけ・出題実績あり） |
| v0.9 | 実務・正答者vs誤答者・マーカー追加済み。最終確認前 |
| v1.0 | M1〜M16 チェックリスト全通過・過去問実出題との照合済み |

**ルール**
- 改修後はバージョン番号を必ず上げる（v0.7 → v0.9 など）
- v1.0 は M1〜M16 チェックリストを全て ✅ にしてから付与
- 日付だけ更新してバージョンを据え置くのは禁止

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
| 2026-04-27 | RULE-05 を `<TrapBlock>` 構造に刷新（誤情報優位効果対策）。RULE-15（過去問マーカー）・RULE-16（data-table必須）・RULE-17（カラー制約 amber化）追加。M13〜M16 をチェックリスト追加 |
| 2026-04-27 | RULE-00（Wiki役割分担定義）・RULE-12（比較セクション形式）・RULE-13（例題セクション構造）追加。M7を「任意→必須」に格上げ。M11〜M12追加。RULE番号を整合（旧12→15・旧13→16・旧14→17） |
| 2026-04-27 | RULE-18（ページ改定日の記録）追加。バージョン番号体系・2箇所記録ルール・v1.0付与条件を定義。チェックリスト M1〜M16 を対象とするよう更新 |
