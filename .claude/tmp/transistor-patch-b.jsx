=== 修正B1: 動作領域表（行5261付近 </table> 後に挿入） ===

<h3>BJTの動作領域（IC-VCE特性）</h3>
<table className="data-table">
  <thead>
    <tr><th>領域</th><th>条件</th><th>ICの挙動</th><th>用途</th><th>VCEの目安</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>遮断領域</strong></td>
      <td>IB = 0（ベース電流なし）</td>
      <td>IC ≈ 0（電流ほぼ流れない）</td>
      <td>スイッチOFF</td>
      <td>VCE ≈ VCC</td>
    </tr>
    <tr>
      <td><span className="marker"><strong>能動（増幅）領域</strong></span></td>
      <td>VCE {'>'} VCE(sat)（≈0.2V）</td>
      <td>IC = hFE × IB（線形増幅）</td>
      <td>増幅回路・Q点設定</td>
      <td>VCC/2 付近</td>
    </tr>
    <tr>
      <td><strong>飽和領域</strong></td>
      <td>VCE {'<'} VCE(sat)（≈0.2V）</td>
      <td>ICは増えず一定（IC ≠ hFE×IB）</td>
      <td>スイッチON</td>
      <td>VCE ≈ 0.2V</td>
    </tr>
  </tbody>
</table>
<Callout variant="tip" title="動作領域の見分け方">
  VCE(sat) ≈ 0.2V が境界。計算した VCE が 0.2V 以下なら飽和領域＝ICの計算値は使えない（飽和電流に張り付く）。能動領域でのみ IC = hFE × IB が成立する。
</Callout>

=== 修正B2: 例題2（行5274付近 例題1の直後に挿入） ===

<Callout variant="note" title="例題2：直流動作点（Q点）計算">
  電源 VCC = 12V、R1 = 47kΩ、R2 = 10kΩ、RE = 1kΩ、RC = 3.9kΩ、VBE = 0.6V の電流帰還バイアス回路がある。直流動作点（IC, VCE）を求めよ。
</Callout>
<details>
  <summary>解答・解説（4ステップ）</summary>
  <p><strong>STEP1：ベース電圧 VB（分圧計算）</strong></p>
  <p><Eq tex="V_B = V_{CC} \cdot \frac{R_2}{R_1 + R_2} = 12 \times \frac{10}{57} \approx 2.1\text{ V}" /></p>
  <p><strong>STEP2：エミッタ電圧 VE</strong></p>
  <p><Eq tex="V_E = V_B - V_{BE} = 2.1 - 0.6 = 1.5\text{ V}" /></p>
  <p><strong>STEP3：エミッタ電流（≈コレクタ電流）</strong></p>
  <p><Eq tex="I_C \approx I_E = \frac{V_E}{R_E} = \frac{1.5}{1000} = 1.5\text{ mA}" /></p>
  <p><strong>STEP4：コレクタ-エミッタ間電圧 VCE</strong></p>
  <p><Eq tex="V_{CE} = V_{CC} - I_C(R_C + R_E) = 12 - 1.5 \times 10^{-3} \times (3900 + 1000) \approx 4.65\text{ V}" /></p>
  <p><strong>確認：</strong>VCE = 4.65V {'>'} 0.2V → 能動領域 ✓（IC = hFE × IB の式が使える）</p>
</details>
<Callout variant="tip" title="この例題のツボ">
  「VB（分圧）→ VE（−0.6V）→ IE（÷RE）→ IC（≈IE）→ VCE（VCC−IC×(RC+RE)）」の4ステップが電験バイアス計算の黄金パターン。最後に VCE {'>'} 0.2V を確認して能動領域を保証する。
</Callout>

=== 修正B3: 正答者vs誤答者のAv式修正（行5329付近） ===

変更前: （行5329）
<td>電圧利得 Av = −gm·RC（コレクタ抵抗依存）。hFE は電流比であり電圧利得とは別の量</td>

変更後:
<td>電圧利得 Av ≈ −hFE·RC/hie（BJT）または −gm·RC（FET）。hFE は電流比。RC・hie も利得を左右する</td>
