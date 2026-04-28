---
title: TransistorPage P3実装引継ぎ
date: 2026-04-28
status: in-progress
---

# 引継ぎ：denken3-riron-wiki.html TransistorPage P3実装

## 前回セッションでの完了状況

- **P1完了**: ミニクイズ(§3後)・FET例題3・理解度セルフチェック5問 追加済み
- **P2完了**: FET水門アナロジー・Q点シーソーCallout・3段階構造表移動・IC-VCE特性SVG・MOSFET ID-VGS特性SVG 追加済み
- **§プレフィックス全修正完了**: §1〜§7 全て確認済み

## 未完了タスク（P3実装）

### 1. RIRON-WIKI-RULES.md 更新
ファイルの末尾（最終行 1493行）に以下2ルールを追記する（Read してから Edit）：

**追加内容の概要**:
- RULE-43: §N プレフィックス保持バグパターンと検証手順
- RULE-44: 並列エージェント単一ファイル編集の安全ルール

**CHANGELOG追加行** (行1111の後に挿入):
```
| 2026-04-28 | RULE-43（§Nプレフィックス保持・バグパターン・検証手順）・RULE-44（並列エージェント安全ルール）追加。TransistorPage P3実装完了。 |
```

### 2. denken3-riron-wiki.html P3修正（8件）

**重要**: 編集前に必ず `Read offset=5130 limit=30` でファイルの現状を確認すること。

#### (A) BUG修正 + #13 覚え方（同時）
- **場所**: 行5413付近 `</details>` の直後
- **問題**: `$(cat /tmp/svg_insert.txt)` という文字列がJSXに混入している（stale shell command）
- **Fix**: この行を削除し、§3接地方式の覚え方テキストを挿入

old_string（ユニーク）:
```
    </details>

$(cat /tmp/svg_insert.txt)
<figure style={{margin:"0.8rem 0",textAlign:"center"}}>      <svg viewBox
```

new_string:
```
    </details>
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.4rem 0 0.8rem"}}>💡 <strong>覚え方</strong>：入力端子と出力端子を決めれば、残りの端子が自動的に共通端子（接地）になる。</p>

    <figure style={{margin:"0.8rem 0",textAlign:"center"}}>      <svg viewBox
```

#### (B) #2 TL;DR Callout
- **場所**: 行5144 `<MetaStrip ... />` の直後・`<LearningMap` の直前

old_string:
```
    <MetaStrip difficulty="★★★★" importance="A" frequency="高" />
    <LearningMap
```

new_string:
```
    <MetaStrip difficulty="★★★★" importance="A" frequency="高" />
    <Callout variant="tip" title="ひとことで言うと">
      <strong>トランジスタ</strong>＝半導体3端子素子で「小信号→大電流」を作る増幅・スイッチ素子。<strong>BJT</strong>（電流制御：IC = hFE × IB）と<strong>FET</strong>（電圧制御：ゲート電流≈0）の2種。直流動作点（Q点）・バイアス回路・3接地方式が試験の核心。
    </Callout>
    <LearningMap
```

#### (C) #17 3定数対比表
- **場所**: 行5247 BJT→FET遷移段落の直後・`<h3>FET公式` の直前

old_string:
```
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.6rem 0"}}>↑ ここまでBJT（電流制御）。次のFETは電圧制御で式の構造が変わる。</p>

    <h3>FET公式（電圧制御型）</h3>
```

new_string:
```
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.6rem 0"}}>↑ ここまでBJT（電流制御）。次のFETは電圧制御で式の構造が変わる。</p>
    <p style={{fontSize:"0.9rem",fontWeight:600,margin:"0.6rem 0 0.3rem"}}>3つの定数を混同しない：</p>
    <table className="data-table" style={{fontSize:"0.9rem",margin:"0.2rem 0 0.8rem"}}>
      <thead><tr><th>定数</th><th>値</th><th>役割</th><th>使う場面</th></tr></thead>
      <tbody>
        <tr><td><strong>VBE</strong></td><td><span className="marker">0.6V</span></td><td>PN接合の順方向降下電圧（Si物性定数）</td><td>VE = VB − 0.6 で常時使用</td></tr>
        <tr><td><strong>VCE(sat)</strong></td><td><span className="marker">0.2V</span></td><td>飽和領域への境界電圧（試験用目安）</td><td>能動か飽和かの判定（検算のみ）</td></tr>
        <tr><td><strong>Vth</strong></td><td><span className="marker">素子依存</span></td><td>MOSFETのチャネル形成閾値電圧</td><td>ID = k(VGS−Vth)² / VGS {'>'} Vth の確認</td></tr>
      </tbody>
    </table>

    <h3>FET公式（電圧制御型）</h3>
```

#### (D) #15 Av符号統一（3箇所）

**D-1: 「5秒で思い出す」Callout（行5222付近）**

old_string（ユニーク部分）:
```
電圧利得 Av ≈ hFE·RC/<Tooltip label="h-パラメータ入力インピーダンス。エミッタ接地時のベース-エミッタ間交流抵抗（数百Ω〜数kΩ）">hie</Tooltip>。
```

new_string:
```
電圧利得 Av ≈ −hFE·RC/<Tooltip label="h-パラメータ入力インピーダンス。エミッタ接地時のベース-エミッタ間交流抵抗（数百Ω〜数kΩ）">hie</Tooltip>（エミッタ接地は反転）。
```

**D-2: 接地方式表の支配因子行（行5399付近）**

old_string:
```
負荷抵抗 RC と hFE の積（Av ≈ hFE·RC/hie）。RC が2倍になると電圧利得も2倍（比例）
```

new_string:
```
負荷抵抗 RC と hFE の積（Av ≈ −hFE·RC/hie、マイナス＝位相反転）。RC が2倍になると電圧利得の絶対値も2倍（比例）
```

**D-3: MinimumSet（行5582付近）**

old_string:
```
"Av ≈ hFE · RC / hie",
```

new_string:
```
"Av ≈ −hFE · RC / hie（エミッタ接地：反転）",
```

#### (E) #14 実務橋渡し文
- **場所**: 実務Callout（`プラント電気・計装での使われどころ`）の直後・tableの直前

old_string:
```
      プラントのインバータ・サーボドライバ出力段にはIGBT（バイポーラとMOSFETの複合デバイス）が搭載されている。故障モード（短絡固着/開放固着）の違いを理解することが現地での緊急停止判断に直結する。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th>
```

new_string:
```
      プラントのインバータ・サーボドライバ出力段にはIGBT（バイポーラとMOSFETの複合デバイス）が搭載されている。故障モード（短絡固着/開放固着）の違いを理解することが現地での緊急停止判断に直結する。
    </Callout>
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.6rem 0"}}>現場では、トランジスタ知識は<span className="marker">故障モードの判別</span>・<span className="marker">波形の非対称検出</span>・<span className="marker">発熱計算</span>の3用途に集約される。試験で身につけた hFE・VCE・RDS(on) はそのままこの3つに対応する。</p>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th>
```

#### (F) #16 用語集3行追加（能動領域・飽和領域・遮断領域）
- **場所**: 用語集表の VBE 行（行5722-5725）の直後・`</tbody>` の直前

old_string:
```
          <td>シリコン BJT の順バイアス降下電圧。バイアス設計の定数として VBE ≈ 0.6V を使用</td>
        </tr>
      </tbody>
    </table>

    <PageNav prev={{id:"semiconductor", title:"5.1 半導体"}}
```

new_string:
```
          <td>シリコン BJT の順バイアス降下電圧。バイアス設計の定数として VBE ≈ 0.6V を使用</td>
        </tr>
        <tr>
          <td><strong>能動領域</strong></td>
          <td>能動（増幅）領域<br/><small>Active region</small></td>
          <td>VCE {'>'} VCE(sat)（≈0.2V）かつ IB {'>'} 0 のとき。IC = hFE × IB が成立する増幅動作の領域</td>
        </tr>
        <tr>
          <td><strong>飽和領域</strong></td>
          <td>飽和領域<br/><small>Saturation region</small></td>
          <td>VCE ≤ VCE(sat)（≈0.2V）のとき。IC = hFE×IB は不成立。スイッチON状態に対応</td>
        </tr>
        <tr>
          <td><strong>遮断領域</strong></td>
          <td>遮断領域<br/><small>Cutoff region</small></td>
          <td>IB ≈ 0 のとき。IC ≈ 0。スイッチOFF状態に対応</td>
        </tr>
      </tbody>
    </table>

    <PageNav prev={{id:"semiconductor", title:"5.1 半導体"}}
```

## バージョン更新も忘れずに

`last-updated: 2026-04-28 | v1.8` に更新（TransistorPage先頭コメント行5132付近）

old_string:
```
  // last-updated: 2026-04-28 | v1.7 | 図解をWikipedia Commonsの実回路図に差し替え
```

new_string:
```
  // last-updated: 2026-04-28 | v1.8 | P3: TL;DR・Av符号統一・3定数対比表・覚え方・実務橋渡し・用語集拡充
```

## 完了確認チェック

```bash
grep -n '$(cat /tmp' denken3-riron-wiki.html   # → 0件であることを確認
grep -n 'ひとことで言うと' denken3-riron-wiki.html  # → 存在確認
grep -n '3つの定数を混同' denken3-riron-wiki.html   # → 存在確認
grep -n '覚え方.*入力端子' denken3-riron-wiki.html  # → 存在確認
grep -n '故障モードの判別' denken3-riron-wiki.html  # → 存在確認
grep -n '能動領域' denken3-riron-wiki.html          # → 用語集行が存在
```

## 次の一手

P3完了後、ブラウザで `http://localhost:8092/denken3-riron-wiki.html#transistor` を開いて目視確認。
