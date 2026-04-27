# 引き継ぎ: 電験3種 理論Wiki — 実務セクション追加 + ソース乖離修正

## 現在の状態（2026-04-27 13:00）

### 問題：ソースJSXとビルド済みHTMLが乖離している

別セッションで `SemiconductorPage` を **HTMLファイルに直接編集**した。
ソースJSXは古いまま → 次に `python build-riron-wiki.py` を実行すると**Semiconductor修正が全消し**される。

| ファイル | 更新時刻 | SemiconductorPage の状態 |
|---|---|---|
| `denken3-riron-wiki.html` | 12:36 | ✅ 新しい7セクション版（FormulaTable・MetaStrip・§6/§7まで揃った完全版） |
| `riron-pages-batch3.jsx` | 09:10 | ❌ 古い4セクション・素のdiv版（MetaStripも無い） |

### HTMLに入っている新セクション（別セッションが追加済み）

`SemiconductorPage` はHTML上で以下の7セクション構成になった：
- §1 原理（Analogyコンポーネント + 解説文）
- §2 公式（FormulaTable layer=A + layer=B）
- §3 比較・まとめ表（4テーブル：N型/P型・順逆バイアス・真性/不純物・半導体/金属温度特性）
- §4 例題（details折りたたみ）
- §5 引っかけポイント（Callout warn × 5個）
- **§6 正答者 vs 誤答者** ← NEW（5行比較テーブル）
- **§7 出題実績** ← NEW（R07〜H22の年度別出題テーブル）

---

## やるべきこと（優先順）

### Step 1: batch3.jsx の SemiconductorPage を HTML版に同期 ← 最優先

`denken3-riron-wiki.html` の行5915〜6220付近（SemiconductorPage の全体）を
`riron-pages-batch3.jsx` の `const SemiconductorPage = ...` 部分と差し替える。

**抽出方法：**
```
HTML 5915行目: const SemiconductorPage = ({ onNav }) => (
HTML 6220行目: );  ← SemiconductorPage の終わり（次行が空行 or TransistorPage）
```

**注意：**
- HTML内のセミコロン・JSX構文はそのまま使える（build時にそのままBabelでコンパイルされる）
- `Object.assign(window, { ..., SemiconductorPage, ... });` の登録はbatch3.jsx末尾に既にある。変更不要。

### Step 2: 5ページに「実務でどう活きる」セクション追加

対象：`dc-circuit` / `ac-basics` / `ac-power` / `three-phase` / `transient`
配置：`§3比較・まとめ` の直後、`§4例題` の直前（h2 id="examples" の前）

**マークアップパターン（既存Componentのみ・新規Component不要）：**
```jsx
<h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
<Callout variant="tip" title="プラント電気・計装での使われどころ">
  （導入文1〜2行）
</Callout>
<table className="data-table">
  <thead>
    <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
  </thead>
  <tbody>
    <tr><td>...</td><td>...</td><td>...</td></tr>
    {/* 3行固定 */}
  </tbody>
</table>
```

**各ページの内容（Claude生成：一般実務シーン・固有エピソードなし）：**

#### 2.1 直流回路（`riron-pages-batch2.jsx` DcCircuitPage の h2 id="examples" 直前）
| 現場シーン | 効いている物理 | 技術者の判断 |
|---|---|---|
| DC24V制御電源で長距離PLC配線 | V=IR の電圧降下 | 配線距離・線径から末端電圧を試算、定格90%確保 |
| 短絡電流計算で遮断器の容量選定 | テブナン等価回路 | 系統を1電源+1抵抗に縮約、遮断容量がIs超えるか判定 |
| 信号源と入力回路の整合（最大電力） | 最大電力定理 | 電力最大はRload=Rth時。ただし効率は50%で損失大 |

導入文：「受変電・制御盤の配線設計では、直流回路の基礎が電圧降下計算・保護協調・信号整合のすべてに使われる。」

#### 2.2 交流の基礎（`riron-pages-batch2.jsx` AcBasicsPage の h2 id="examples" 直前）
| 現場シーン | 効いている物理 | 技術者の判断 |
|---|---|---|
| インバータ駆動電動機の電流評価 | インピーダンス Z=R+jX | 周波数で X が変わる→低速時に誘導性リアクタンス低下 |
| ケーブル長による位相ズレ検討 | 進み・遅れ電流の発生 | 進み・遅れを予測し保護リレーの誤動作判定に活用 |
| 機器銘板の力率からkVA換算 | S=VI（皮相電力） | 銘板cosφとP[kW]からS=P/cosφで電源容量チェック |

導入文：「交流回路の複素インピーダンスは、電動機・変圧器・ケーブルの電流計算から保護リレー整定まで、交流系統設計の共通言語となる。」

#### 2.3 交流電力（`riron-pages-batch1.jsx` AcPowerPage の h2 id="examples" 直前）
| 現場シーン | 効いている物理 | 技術者の判断 |
|---|---|---|
| 受変電設備の容量設計 | 皮相電力 S=P/cosφ | 設備容量はkVAで決まる。kWだけ見ると過小設計 |
| 高圧受電の電気料金（基本料金） | 力率 cosφ | 力率85%基準で割引／割増。進相コンデンサで改善 |
| 進相コンデンサ容量の計算 | Q=P(tanφ₁−tanφ₂) | 改善前後の力率角から必要kvar容量を逆算して選定 |

導入文：「有効電力・無効電力・皮相電力の3成分は、受変電容量設計・力率管理・電気料金計算の根幹。プラントの基本料金は力率で上下する。」

#### 4.1 三相交流（`riron-pages-batch1.jsx` ThreePhasePage の h2 id="examples" 直前）
| 現場シーン | 効いている物理 | 技術者の判断 |
|---|---|---|
| 三相受電盤の主回路設計 | 線間電圧＝√3×相電圧 | 6.6kV配電・400V/200V低圧の関係を即算 |
| 三相電動機の消費電力測定 | P=√3・V_l・I_l・cosφ | 線間電圧・線電流から消費電力（kW）算出 |
| 地絡保護方式の選定 | Y結線中性点の接地 | 中性点接地方式で地絡電流の大きさと検出回路が決まる |

導入文：「三相交流は工場の受変電・電動機・変圧器すべての基盤。√3の扱いと星形/三角形の電圧・電流関係を誤ると機器選定ミスに直結する。」

#### 3.2 過渡現象（`riron-pages-batch3.jsx` TransientPage の h2 id="examples" 直前）
| 現場シーン | 効いている物理 | 技術者の判断 |
|---|---|---|
| 電動機始動時の突入電流 | RL回路の過渡応答 | 始動電流は定格の5〜7倍、保護協調と起動方式（スターデルタ等）選定 |
| 進相コンデンサ投入時の突入電流 | RC回路の過渡 | 突入電流抑制リアクトル（直列リアクトル）を設置して緩和 |
| リレーコイル切断時のサージ電圧 | L di/dt によるサージ | コイル両端にサージキラー（ダイオード・バリスタ）必須 |

導入文：「過渡現象は「定常状態に落ち着くまでの暴れ」。電動機始動・コンデンサ投入・リレー遮断など、現場で突入電流や誘導サージが発生するのはすべてこの物理が動いている。」

---

### Step 3: TransientPage の確認

`riron-pages-batch3.jsx` の `TransientPage`（L61〜L112）が正常な新形式か確認する。
古い素のdiv形式のままなら、Semiconductorと同様に HTML版と同期が必要。

---

### Step 4: ビルド → 確認

```bash
cd C:/Users/kfuru/.secretary
python build-riron-wiki.py
```

確認URL：
- `file:///C:/Users/kfuru/.secretary/denken3-riron-wiki.html#semiconductor` — §6/§7が残っているか
- `file:///C:/Users/kfuru/.secretary/denken3-riron-wiki.html#dc-circuit` — 実務セクションが§3後・§4前にあるか
- 残り4ページ（ac-basics/ac-power/three-phase/transient）同様に確認

---

## ファイル構成（修正対象のみ）

```
C:\Users\kfuru\.secretary\
├── riron-pages-batch1.jsx  ← AcPower / ThreePhase に §実務 追加
├── riron-pages-batch2.jsx  ← DcCircuit / AcBasics に §実務 追加
├── riron-pages-batch3.jsx  ← SemiconductorPage をHTML版に同期 / TransientPage確認 / Transient §実務 追加
└── denken3-riron-wiki.html ← ビルド出力（直接編集しない）
```

## ビルドコマンド
```bash
cd C:/Users/kfuru/.secretary
python build-riron-wiki.py
```

## 注意点
- `build-riron-wiki.py` は `denken3-kikai-wiki.html` を構造テンプレとして読む（riron-wiki.htmlは出力先）
- JSX内 `<` は `{'<'}` にエスケープ（既存コードの書き方を踏襲）
- KaTeX数式は `<Eq tex="..." />` を使う（String.raw旧方式でも動くが統一する）
