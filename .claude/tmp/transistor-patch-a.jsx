=== 修正A1: hie凡例（行5166付近 <h2 id="formulas"> 直後に挿入） ===
<Callout variant="note" title="h-パラメータ記号の読み方">
  <strong>hFE</strong>（フォワード電流利得）= IC/IB の比。<strong>hie</strong>（入力インピーダンス）= エミッタ接地時のベース-エミッタ間交流抵抗（数百Ω〜数kΩ）。電圧利得 Av = hFE·RC/hie はこの2つを組み合わせた式。
</Callout>

=== 修正A2: FET公式（行5179付近 </FormulaTable> 直後に挿入） ===
<h3>FET公式（電圧制御型）</h3>
<FormulaTable layer="B" rows={[
  { formula: "I_D = k(V_{GS} - V_{th})^2", meaning: "ドレイン電流（エンハンスメント型MOSFETの飽和領域）", when: "VGS > Vth（飽和領域）", notWhen: "VGS ≤ Vth（遮断領域）" },
  { formula: "g_m = \\frac{\\partial I_D}{\\partial V_{GS}}", meaning: "相互コンダクタンス：ゲート電圧1Vあたりのドレイン電流変化（A/V）", when: "飽和領域", notWhen: "—" },
  { formula: "A_v \\approx -g_m R_D", meaning: "FETエミッタ接地の電圧利得（反転、マイナス符号）", when: "エミッタ接地等価回路", notWhen: "他の接地方式" },
]} />
