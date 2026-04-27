/* riron-pages-batch2.jsx — 9単元ページ
   Generated: 2026-04-26
   Pages: CoulombFieldPage, ElectromagneticForcePage, MagneticCircuitPage,
          DcCircuitPage, AcBasicsPage, RlcResonancePage, InductancePage,
          OpAmpPage, MeasurementPage
*/

/* ============================================================
   1.1 クーロン力と電界
   ============================================================ */
const CoulombFieldPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="A" frequency="高" />
    <LearningMap
      prereqs={[{ id: "home", title: "ホーム" }]}
      current="1.1 クーロン力と電界"
      nexts={[{ id: "capacitor", title: "1.2 コンデンサ" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第1章 — CHAPTER 1 電磁気"
      title="1.1 クーロン力と電界"
      deck="電荷が作る「力の場」と「位置エネルギー」の話。重力と同じ距離の逆二乗則が成り立つ。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "coulomb-field", label: "1.1 クーロン力と電界" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="gravity" icon="🌍">
      重力と同じ「距離の逆二乗則」に従う。電界は「その場に置いた +1C の電荷が受ける力の向きと大きさの地図」。電位は「高さ」のアナロジー：高いところから低いところへ電荷は動く。電池の+極が「山の頂上」、−極が「谷底」のイメージ。
    </Analogy>
    <p>
      電界と電位の関係：急峻な「坂（電位差）」ほど電界が強い。<strong>平坦な場所（等電位面）では電界がゼロ</strong>。電位 V はスカラー量なので、複数の点電荷がある場合は符号だけ考慮して代数和で求められる。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "F = Q_1 Q_2 / (4\\pi\\varepsilon_0 r^2)",
          meaning: "クーロンの法則：2電荷間の静電力",
          when: "真空中・点電荷",
          notWhen: "誘電体中（ε₀→ε₀εr に置換）",
        },
        {
          formula: "E = Q / (4\\pi\\varepsilon_0 r^2)",
          meaning: "点電荷が作る電界の強さ",
          when: "真空中・点電荷から距離 r",
          notWhen: "分布電荷・複数電荷（重ね合わせが必要）",
        },
        {
          formula: "V = Q / (4\\pi\\varepsilon_0 r)",
          meaning: "点電荷が作る電位（無限遠基準）",
          when: "真空中・点電荷から距離 r",
          notWhen: "—",
        },
        {
          formula: "W = Q(V_A - V_B)",
          meaning: "電荷 Q を VB → VA へ移動させる仕事",
          when: "任意の電界中（経路によらない）",
          notWhen: "—",
        },
        {
          formula: "E = V/d",
          meaning: "平行平板間の一様電界",
          when: "均一な電場（平行平板コンデンサ）",
          notWhen: "点電荷・球対称など",
        },
        {
          formula: "C = 4\\pi\\varepsilon_0 r",
          meaning: "孤立した導体球（半径 r）の静電容量",
          when: "球形導体・無限遠基準",
          notWhen: "平行平板など他の形状",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>項目</th><th>クーロン力</th><th>重力</th></tr>
      </thead>
      <tbody>
        <tr><td>法則</td><td>F ∝ Q₁Q₂/r²</td><td>F ∝ m₁m₂/r²</td></tr>
        <tr><td>距離依存</td><td>逆二乗</td><td>逆二乗</td></tr>
        <tr><td>向き</td><td>異符号：引力、同符号：斥力</td><td>常に引力</td></tr>
        <tr><td>重ね合わせ</td><td>成立（線形）</td><td>成立</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>項目</th><th>導体</th><th>絶縁体（誘電体）</th></tr>
      </thead>
      <tbody>
        <tr><td>静電平衡時の内部電界</td><td><strong>ゼロ</strong></td><td>ゼロでない場合あり</td></tr>
        <tr><td>電荷の分布</td><td><strong>表面のみ</strong></td><td>体積全体に分布可</td></tr>
        <tr><td>内部の電位</td><td><strong>一定（等電位体）</strong></td><td>位置によって異なる</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 真空中で 2μC と 3μC の点電荷が 1m 離れている。クーロン力の大きさを求めよ。（k=9×10⁹ N·m²/C²）</p>
    <details>
      <summary>解答</summary>
      <p>F = k×Q₁×Q₂/r² = 9×10⁹ × 2×10⁻⁶ × 3×10⁻⁶ / 1² = <strong>0.054 N</strong></p>
      <p>同符号なので斥力。クーロンの法則 F = kQ₁Q₂/r²。</p>
    </details>
    <p><strong>問:</strong> +Q₁ と −Q₂ の 2 点電荷がある。電位がゼロになる点は何箇所か。</p>
    <details>
      <summary>解答</summary>
      <p>異符号の場合、V=0 となる点は<strong>2箇所</strong>（2電荷の内側に 1 点、外側に 1 点）。同符号では V=0 の点は存在しない。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="電界の向きは電子の動く向きではない">
      電界の向きは「正電荷が受ける力の向き」＝ +極（高電位）から −極（低電位）へ。電子の移動方向は逆（−から+へ移動）。
    </Callout>
    <Callout variant="warn" title="誘電体中はε₀→ε₀εr に置換">
      誘電体（比誘電率 εr）中ではクーロン力は F = Q₁Q₂/(4πε₀εr r²)。εr＞1 なので真空中より力が弱くなる。問題文に「比誘電率」が出たら必ず確認。
    </Callout>
    <Callout variant="tip" title="仕事が問われたら「まず電位を求める」">
      電位はスカラーなので向きを気にせず足し算できる。W=QΔV が最短手順。電界の積分を直接計算しようとすると時間を消費する。
    </Callout>
    <Callout variant="warn" title="釣り合い位置は大きい電荷側ではなく小さい電荷側に近い">
      同符号の 2 点電荷 Q₁、Q₂（Q₁＜Q₂）間の釣り合い位置は x = √Q₁/(√Q₁+√Q₂)×d。Q₁ の方が小さいので Q₁ に近い側（Q₂ から遠い側）に存在する。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>コンデンサ（1.2）：平行平板コンデンサの電界 E=V/d はここの延長</li>
      <li>磁気回路（1.4）：電気回路との双対アナロジー</li>
      <li>直流回路（2.1）：電位計算は直流回路の電圧計算と同じ手順</li>
    </ul>

    <PageNav
      prev={{ id: "home", title: "ホーム" }}
      next={{ id: "capacitor", title: "1.2 コンデンサ" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   1.3 電磁力
   ============================================================ */
const ElectromagneticForcePage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="A" frequency="高" />
    <LearningMap
      prereqs={[{ id: "capacitor", title: "1.2 コンデンサ" }]}
      current="1.3 電磁力"
      nexts={[{ id: "magnetic-circuit", title: "1.4 磁気回路" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第1章 — CHAPTER 1 電磁気"
      title="1.3 電磁力"
      deck="電流が磁界から受ける力（モーター原理）と、磁界の変化で起電力が生まれる現象（発電機原理）の2本柱。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "electromagnetic-force", label: "1.3 電磁力" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="right-hand" icon="✋">
      <strong>左手 = モーター（電動機）</strong>：電流（中指）が磁界（人差し指）の中に入ると力（親指）が生まれる。電気エネルギー → 運動エネルギー。<br />
      <strong>右手 = 発電機</strong>：導体（中指）を磁界（人差し指）の中で動かすと起電力（親指方向）が生まれる。運動エネルギー → 電気エネルギー。
    </Analogy>
    <p>
      レンツの法則は「変化を嫌う自然の反抗」。<strong>磁束が増えれば打ち消そうとする誘導電流が流れる</strong>。逆に磁束が減れば維持しようとする電流が流れる。「変化の方向」を見ることが重要。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "F = BIL\\sin\\theta",
          meaning: "電流 I を持つ長さ L の導体が磁束密度 B の磁界から受ける力",
          when: "直線導体・均一磁界",
          notWhen: "θ=0（B と I が平行）のとき F=0",
        },
        {
          formula: "e = BLv\\sin\\theta",
          meaning: "速度 v で動く長さ L の導体に生じる誘導起電力",
          when: "直線導体・均一磁界",
          notWhen: "θ=0 のとき e=0",
        },
        {
          formula: "e = -N\\frac{d\\phi}{dt}",
          meaning: "ファラデーの法則。N巻きコイルで磁束が変化するときの誘導起電力",
          when: "常に成立",
          notWhen: "—",
        },
        {
          formula: "H = I / (2\\pi r)",
          meaning: "長直線電流による磁界（距離 r）",
          when: "無限長の直線電流",
          notWhen: "有限長の電線",
        },
        {
          formula: "H = NI / (2r)",
          meaning: "半径 r の円形コイル（N ターン）中心の磁界強度",
          when: "円形コイル・中心点のみ",
          notWhen: "中心以外の点",
        },
        {
          formula: "F/l = \\mu_0 I_1 I_2 / (2\\pi d)",
          meaning: "平行導体間に働く力（単位長さ当たり）",
          when: "無限長の平行導体",
          notWhen: "—",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>項目</th><th>左手（電動機）</th><th>右手（発電機）</th></tr>
      </thead>
      <tbody>
        <tr><td>目的</td><td>電気 → 力（運動）</td><td>力（運動） → 電気</td></tr>
        <tr><td>親指の向き</td><td>力 F（動く方向）</td><td>速度 v（動く方向）</td></tr>
        <tr><td>人差し指</td><td>磁界 B</td><td>磁界 B</td></tr>
        <tr><td>中指</td><td>電流 I（与えた電流）</td><td>起電力 e（生じる電流）</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>形状</th><th>中心の磁界 H</th></tr>
      </thead>
      <tbody>
        <tr><td>無限長直線（距離 r）</td><td>H = I/(2πr)</td></tr>
        <tr><td>半径 r の円形コイル（N ターン・中心）</td><td>H = NI/(2r)</td></tr>
        <tr><td>環状ソレノイド（磁路長 l、N ターン）</td><td>H = NI/l</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 磁束密度 B=0.5T 中で、有効長 L=0.2m の導体に電流 I=10A が流れている。B と I が直角のとき、電磁力 F を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>F = BIL = 0.5 × 10 × 0.2 = <strong>1 N</strong></p>
      <p>B と I が直交（θ=90°）なら sinθ=1 で最大の力。</p>
    </details>
    <p><strong>問:</strong> 同方向に電流を流した2本の平行導体間に働く力の向きは？</p>
    <details>
      <summary>解答</summary>
      <p><strong>引き合う（吸引力）</strong>。逆方向電流は反発力。日常感覚と逆なので注意。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="フレミング左手と右手の混同">
      力（F）が欲しい → 左手（モーター）、起電力（e）が欲しい → 右手（発電機）。試験中に迷ったら「電動機か発電機か」を先に確認する。
    </Callout>
    <Callout variant="warn" title="レンツの法則：「磁束の向きと逆」ではなく「磁束の変化を打ち消す向き」">
      磁束が増加しているなら打ち消すために元の磁束と逆向きの磁界を作る電流が流れる。磁束が減少しているなら同じ向きの電流が流れる。変化を見ること。
    </Callout>
    <Callout variant="warn" title="同方向電流が引き合う（直感と逆）">
      同方向電流 → 吸引、逆方向電流 → 反発。「反対のものが引き合う」という日常感覚とは逆。
    </Callout>
    <Callout variant="tip" title="円形コイルの磁界は π がない">
      円形コイル中心：H = NI/(2r)。直線電流：H = I/(2πr)。円形は π が分母にない分、同じ半径なら直線より磁界が π 倍強い。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>磁気回路（1.4）：アンペアの周回路則 H·l = NI の発展</li>
      <li>インダクタンス（3.1）：自己誘導・相互誘導の定量化</li>
      <li>交流の基礎（2.2）：RLC 回路のリアクタンス XL = ωL</li>
    </ul>

    <PageNav
      prev={{ id: "capacitor", title: "1.2 コンデンサ" }}
      next={{ id: "magnetic-circuit", title: "1.4 磁気回路" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   1.4 磁気回路
   ============================================================ */
const MagneticCircuitPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★" importance="A" frequency="中" />
    <LearningMap
      prereqs={[{ id: "electromagnetic-force", title: "1.3 電磁力" }]}
      current="1.4 磁気回路"
      nexts={[{ id: "dc-circuit", title: "2.1 直流回路" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第1章 — CHAPTER 1 電磁気"
      title="1.4 磁気回路"
      deck="磁束が閉じた経路を流れる回路。電気回路と1:1対応するため「磁気のオームの法則」として解析できる。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "中" },
        { label: "難易度", value: "★★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "magnetic-circuit", label: "1.4 磁気回路" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="electric-circuit" icon="🔌">
      磁気回路は電気回路の完全なアナロジー。起磁力 F=NI が電圧源、磁束 φ が電流、磁気抵抗 Rm が抵抗に対応する。「磁気のオームの法則」：NI = φ × Rm。
    </Analogy>
    <p>
      鉄心は透磁率が空気の数百〜数千倍。<strong>空隙（エアギャップ）は細くても磁気抵抗が支配的</strong>になる。1mm の空隙でも 0.5m の鉄心（μr=2000）の 4 倍の磁気抵抗になる場合がある。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "F = NI \\text{ [A]}",
          meaning: "起磁力。コイルの巻き数と電流の積",
          when: "常に成立",
          notWhen: "—",
        },
        {
          formula: "R_m = l / (\\mu A) \\text{ [H}^{-1}\\text{]}",
          meaning: "磁気抵抗。長さ大・断面積小・透磁率低で増大",
          when: "均一断面の直線磁路",
          notWhen: "漏れ磁束あり・テーパ形状",
        },
        {
          formula: "\\phi = NI / R_m = NI \\mu A / l",
          meaning: "磁気のオームの法則",
          when: "閉磁路・漏れ磁束無視",
          notWhen: "漏れ磁束が大きい場合",
        },
        {
          formula: "B = \\mu_0 \\mu_r H \\text{ [T]}",
          meaning: "磁束密度 = 透磁率 × 磁界強度",
          when: "均一・等方性材料",
          notWhen: "磁気飽和領域",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>電気回路</th><th>磁気回路</th><th>単位</th></tr>
      </thead>
      <tbody>
        <tr><td>起電力 V</td><td>起磁力 F = NI</td><td>[V] vs [A]</td></tr>
        <tr><td>電流 I</td><td>磁束 φ</td><td>[A] vs [Wb]</td></tr>
        <tr><td>抵抗 R</td><td>磁気抵抗 Rm</td><td>[Ω] vs [H⁻¹]</td></tr>
        <tr><td>導電率 σ</td><td>透磁率 μ</td><td>[S/m] vs [H/m]</td></tr>
        <tr><td>V = IR</td><td>NI = φ Rm</td><td>—</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>分類</th><th>比透磁率 μr</th><th>代表物質</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>強磁性体</strong></td><td>≫1（数百〜数万）</td><td>鉄・ニッケル・コバルト</td></tr>
        <tr><td>常磁性体</td><td>≳1（ほぼ1）</td><td>アルミニウム・白金</td></tr>
        <tr><td>反磁性体</td><td>＜1</td><td>銅・金・水</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 磁路長 l=0.5m、断面積 A=10cm²、比透磁率 μr=1000 の鉄心コアの磁気抵抗 Rm を求めよ。（μ₀=4π×10⁻⁷）</p>
    <details>
      <summary>解答</summary>
      <p>Rm = l/(μ₀ μr A) = 0.5 / (4π×10⁻⁷ × 1000 × 10×10⁻⁴) ≈ <strong>3.98×10⁵ H⁻¹</strong></p>
      <p>磁気抵抗 = 磁路長 ÷（透磁率×断面積）。電気抵抗 R=l/(σA) と対応。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="エアギャップの磁気抵抗は非常に大きい">
      ギャップは長さが数mm以下でも μr=1 のため磁気抵抗が非常に大きい。鉄心（μr〜2000）と比べると同じ長さで 2000 倍の磁気抵抗になる。
    </Callout>
    <Callout variant="warn" title="軟磁性体と硬磁性体の違い">
      軟磁性体（珪素鋼板）：ループが細い → ヒステリシス損が小さい → 変圧器・電動機の鉄心に使う。硬磁性体：ループが太い → 保磁力大・残留磁気大 → 永久磁石に使う。
    </Callout>
    <Callout variant="tip" title="ヒステリシスループの用語">
      残留磁気 Br：H=0 にしても B が残る値（縦軸交点）。保磁力 Hc：B をゼロに戻すのに必要な逆向き H（横軸交点）。ループ面積 ∝ ヒステリシス損。
    </Callout>
    <Callout variant="warn" title="磁力線は必ず閉じた曲線">
      電気力線は正電荷で発生して負電荷で終わる（閉じていない）。磁力線は N 極から出て S 極に入り、磁石内部でも S→N 方向につながり全体として閉じている。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>電磁力（1.3）：アンペアの周回路則 H·l = NI が基礎</li>
      <li>インダクタンス（3.1）：L = μN²A/l は磁気回路から直接導出</li>
      <li>引っかけパターン集（7.1）：ヒステリシス・磁気シールドは頻出論説</li>
    </ul>

    <PageNav
      prev={{ id: "electromagnetic-force", title: "1.3 電磁力" }}
      next={{ id: "dc-circuit", title: "2.1 直流回路" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   2.1 直流回路
   ============================================================ */
const DcCircuitPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="S" frequency="高" />
    <LearningMap
      prereqs={[{ id: "magnetic-circuit", title: "1.4 磁気回路" }]}
      current="2.1 直流回路"
      nexts={[{ id: "ac-basics", title: "2.2 交流の基礎" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第2章 — CHAPTER 2 電気回路"
      title="2.1 直流回路"
      deck="オーム・KVL・KCL・テブナンの4本柱で直流回路の9割が解ける。毎年2〜3問出題の最重要単元。"
      meta={[
        { label: "重要度", value: "S" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "dc-circuit", label: "2.1 直流回路" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="water-flow" icon="💧">
      電流は水流、電圧は水圧、抵抗は管の細さ。管が細いほど流れにくく、太い管が並列にあれば水（電流）は太い方に多く流れる。V = IR ── 電圧＝抵抗×電流。蛇口を絞ると（R↑）、圧力差（V）が生まれる。
    </Analogy>
    <p>
      テブナンの定理：どんな複雑な線形回路も、ある 2 端子から外を見ると、必ず 1 つの電圧源（Vth）と 1 つの抵抗（Rth）の直列接続に見える。「Vth = 何V押しているか / Rth = どれだけ抵抗しているか」。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "V = IR",
          meaning: "オームの法則：抵抗に電流が流れると電圧降下が生じる",
          when: "線形抵抗素子",
          notWhen: "非線形素子（ダイオード・白熱電球等）",
        },
        {
          formula: "\\sum V = 0 \\text{（KVL）}",
          meaning: "閉ループを一周すると電圧の代数和はゼロ",
          when: "直流・低周波の集中定数回路",
          notWhen: "高周波・電磁誘導が無視できない回路",
        },
        {
          formula: "\\sum I = 0 \\text{（KCL）}",
          meaning: "節点に流入する電流の和＝流出する電流の和",
          when: "直流・低周波の集中定数回路",
          notWhen: "高周波（変位電流が無視できない回路）",
        },
        {
          formula: "P = VI = I^2 R = V^2/R",
          meaning: "消費電力の3表現。既知の量に応じて使い分ける",
          when: "線形抵抗",
          notWhen: "—",
        },
        {
          formula: "P_{max} = V_{th}^2 / (4R_{th})",
          meaning: "最大電力定理。R=Rth のとき負荷電力が最大",
          when: "線形回路・テブナン等価後",
          notWhen: "非線形回路",
        },
        {
          formula: "V_{端子} = E - Ir",
          meaning: "内部抵抗 r を持つ電源の端子電圧",
          when: "電流 I が流れるとき",
          notWhen: "開放時（I=0）は端子電圧 = 起電力",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>項目</th><th>直列接続</th><th>並列接続</th></tr>
      </thead>
      <tbody>
        <tr><td>電流</td><td>全素子で同じ I</td><td>各素子で分流</td></tr>
        <tr><td>電圧</td><td>各素子で分圧（和が全体電圧）</td><td>全素子で同じ V</td></tr>
        <tr><td>合成抵抗</td><td>Rs = R₁+R₂+⋯（増える）</td><td>1/Rp = 1/R₁+1/R₂+⋯（減る）</td></tr>
        <tr><td>電力</td><td>P = I²R → R 大ほど P 大</td><td>P = V²/R → R 大ほど P 小</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>観点</th><th>キルヒホッフ（KVL/KCL）</th><th>テブナン等価</th></tr>
      </thead>
      <tbody>
        <tr><td>使い場面</td><td>回路全体の電流・電圧を全部求めたい</td><td>特定の負荷抵抗に流れる電流だけ求めたい</td></tr>
        <tr><td>計算量</td><td>方程式が多い（素子数に比例）</td><td>2ステップ（Vth と Rth のみ）</td></tr>
      </tbody>
    </table>

    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      受変電・制御盤の配線設計では、直流回路の基礎が電圧降下計算・保護協調・信号整合のすべてに使われる。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr><td>DC24V制御電源で長距離PLC配線</td><td>V=IR の電圧降下</td><td>配線距離・線径から末端電圧を試算、定格90%確保</td></tr>
        <tr><td>短絡電流計算で遮断器の容量選定</td><td>テブナン等価回路</td><td>系統を1電源+1抵抗に縮約、遮断容量がIs超えるか判定</td></tr>
        <tr><td>信号源と入力回路の整合（最大電力）</td><td>最大電力定理</td><td>電力最大はRload=Rth時。ただし効率は50%で損失大</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 10Ω と 40Ω が並列接続された回路に 100V が印加されている。合成抵抗と全電流を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>1/R = 1/10 + 1/40 = 5/40 → R = <strong>8Ω</strong>、全電流 I = 100/8 = <strong>12.5A</strong></p>
      <p>並列の合成抵抗は逆数の和の逆数。最後に逆数に戻すのを忘れない。</p>
    </details>
    <p><strong>問:</strong> 内部抵抗 r=1Ω、起電力 E=12V の電源から I=4A が流れている。端子電圧を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>V端子 = E - Ir = 12 - 4×1 = <strong>8V</strong></p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="並列合成抵抗：逆数に戻すのを忘れる">
      1/Rp = 1/4 + 1/4 = 1/2 → Rp = 2Ω。「1/2Ω」と答えるミスが多い。最後に必ずひっくり返す。
    </Callout>
    <Callout variant="warn" title="テブナン：Rth を求めるとき電源をゼロにする">
      Vth を求めるときは電源を生かしたまま端子を開放。Rth を求めるときは電圧源→短絡・電流源→開放にしてから端子間の合成抵抗を計算。
    </Callout>
    <Callout variant="warn" title="最大電力 ≠ 最大効率">
      電力が最大になるのは R=Rth のとき（効率は 50%）。効率が最大（≈100%）になるのは R→∞ のとき（電力はほぼ 0）。
    </Callout>
    <Callout variant="tip" title="消費電力の使い分け">
      直列（電流一定）→ P=I²R → R 大ほど P 大。並列（電圧一定）→ P=V²/R → R 大ほど P 小。「どちらが大きいか」の問題で逆答する頻出ミス。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>交流の基礎（2.2）：オームの法則を複素数に拡張したものがインピーダンス</li>
      <li>ブリッジ回路（2.5）：キルヒホッフの直接応用</li>
      <li>過渡現象（3.2）：スイッチ切換後の RC/RL 回路</li>
    </ul>

    <PageNav
      prev={{ id: "magnetic-circuit", title: "1.4 磁気回路" }}
      next={{ id: "ac-basics", title: "2.2 交流の基礎" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   2.2 交流の基礎
   ============================================================ */
const AcBasicsPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★" importance="S" frequency="高" />
    <LearningMap
      prereqs={[{ id: "dc-circuit", title: "2.1 直流回路" }]}
      current="2.2 交流の基礎"
      nexts={[{ id: "ac-power", title: "2.3 交流電力" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第2章 — CHAPTER 2 電気回路"
      title="2.2 交流の基礎"
      deck="正弦波・実効値・フェーザーを理解することで、RLC回路や電力計算への扉が開く。"
      meta={[
        { label: "重要度", value: "S" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "ac-basics", label: "2.2 交流の基礎" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="wave" icon="🌊">
      交流は「時間とともに向きが変わる電圧・電流」。川の流れが行ったり来たりするイメージ。実効値（RMS）は「この交流と同じ発熱量をもたらす直流電圧は何V？」という換算値。コンセントの 100V はこの「実効値」。最大値は約 141V。
    </Analogy>
    <p>
      位相：同じ周波数の波でも、山が来るタイミングにズレがある。時計でいえば針の角度のズレ。フェーザー表現は実効値と位相角を複素数で一本化したもの。定常解析に威力を発揮する。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "v(t) = V_m \\sin(\\omega t + \\varphi)",
          meaning: "瞬時値の時間変化。振幅・角速度・初位相の3要素で波形が決まる",
          when: "正弦波交流全般",
          notWhen: "非正弦波（ひずみ波）には直接使えない",
        },
        {
          formula: "V = V_m / \\sqrt{2}",
          meaning: "正弦波の実効値。電力計算はこの値を使う",
          when: "正弦波のみ",
          notWhen: "矩形波・三角波など他の波形は係数が異なる",
        },
        {
          formula: "\\omega = 2\\pi f",
          meaning: "角速度と周波数の変換。1秒間に何ラジアン進むか",
          when: "常時使用可",
          notWhen: "—",
        },
        {
          formula: "X_C = 1 / (\\omega C)",
          meaning: "容量性リアクタンス。周波数が高いほど小さくなり電流が流れやすい",
          when: "正弦波定常状態",
          notWhen: "直流（f=0）では XC→∞（遮断）",
        },
        {
          formula: "X_L = \\omega L",
          meaning: "誘導性リアクタンス。周波数が高いほど大きくなり電流が流れにくい",
          when: "正弦波定常状態",
          notWhen: "直流（f=0）では XL=0（短絡）",
        },
        {
          formula: "V = \\sqrt{V_0^2 + V_1^2 + V_3^2 + \\cdots}",
          meaning: "ひずみ波の実効値。各周波数成分の二乗和の平方根",
          when: "高調波を含むひずみ波",
          notWhen: "単一周波数の正弦波",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>素子</th><th>電流 vs 電圧</th><th>覚え方</th></tr>
      </thead>
      <tbody>
        <tr><td>抵抗 R</td><td>同位相（ズレなし）</td><td>素直に従う</td></tr>
        <tr><td>インダクタ L</td><td>電流が電圧より <strong>90° 遅れ</strong></td><td>ELI：電圧(E)→電流(I)の順</td></tr>
        <tr><td>コンデンサ C</td><td>電流が電圧より <strong>90° 進み</strong></td><td>ICE：電流(I)→電圧(E)の順</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th></th><th>実効値 V</th><th>最大値 Vm</th></tr>
      </thead>
      <tbody>
        <tr><td>換算</td><td>V = Vm/√2</td><td>Vm = √2·V</td></tr>
        <tr><td>使う場面</td><td>電力計算・機器定格</td><td>絶縁設計・波形観察</td></tr>
        <tr><td>日常例</td><td>コンセント 100V</td><td>≒141V</td></tr>
      </tbody>
    </table>

    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      交流回路の複素インピーダンスは、電動機・変圧器・ケーブルの電流計算から保護リレー整定まで、交流系統設計の共通言語となる。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr><td>インバータ駆動電動機の電流評価</td><td>インピーダンス Z=R+jX</td><td>周波数で X が変わる→低速時に誘導性リアクタンス低下</td></tr>
        <tr><td>ケーブル長による位相ズレ検討</td><td>進み・遅れ電流の発生</td><td>進み・遅れを予測し保護リレーの誤動作判定に活用</td></tr>
        <tr><td>機器銘板の力率からkVA換算</td><td>S=VI（皮相電力）</td><td>銘板cosφとP[kW]からS=P/cosφで電源容量チェック</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 最大値が 141V の正弦波交流電圧の実効値を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>実効値 = 141/√2 ≈ <strong>100V</strong>。フェーザー表示（位相 0 基準）= 100∠0° [V]</p>
    </details>
    <p><strong>問:</strong> RL 直列回路で R=3Ω、XL=4Ω。インピーダンス Z と位相差 φ を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>Z = √(3²+4²) = <strong>5Ω</strong>、tanφ = 4/3 → φ ≈ 53.1°（電流が電圧より遅れ）</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="コンセント 100V は最大値ではなく実効値">
      最大値は 100√2 ≈ 141V。絶縁設計では最大値を使う。
    </Callout>
    <Callout variant="warn" title="コイルは電流遅れ、コンデンサは電流進み">
      ELI the ICEman が定番。L（コイル）は電圧 E → 電流 I の順（電流遅れ）。C（コンデンサ）は電流 I → 電圧 E の順（電流進み）。「コイルが進み」と逆に覚えると全問題が崩れる。
    </Callout>
    <Callout variant="warn" title="ひずみ波の実効値は二乗和の平方根">
      V = V₁ + V₃ ではなく V = √(V₁²+V₃²)。実効値の足し算は誤り。（R05下・H29 頻出）
    </Callout>
    <Callout variant="tip" title="瞬時値が特定値に達する時刻は1周期に2回">
      arcsin だけでは解が1つしか出ない。第1象限（t₁）と第2象限（t₂）の2解がある。「最初に到達する時刻」か「次に到達する時刻」かを確認。（R07上・H21 頻出）
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>RLC 共振（2.4）：インピーダンスの周波数依存性の発展</li>
      <li>交流電力（2.3）：実効値・力率・有効電力・無効電力</li>
      <li>三相交流（4.1）：単相交流の3本版</li>
    </ul>

    <PageNav
      prev={{ id: "dc-circuit", title: "2.1 直流回路" }}
      next={{ id: "ac-power", title: "2.3 交流電力" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   2.4 RLC 共振
   ============================================================ */
const RlcResonancePage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★★" importance="S" frequency="高" />
    <LearningMap
      prereqs={[{ id: "ac-power", title: "2.3 交流電力" }]}
      current="2.4 RLC 共振"
      nexts={[{ id: "bridge-circuit", title: "2.5 ブリッジ回路" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第2章 — CHAPTER 2 電気回路"
      title="2.4 RLC 共振"
      deck="インピーダンス合成・共振条件・Q値を理解することで、フィルタ設計や電力品質の問題に対応できる。"
      meta={[
        { label: "重要度", value: "S" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "rlc-resonance", label: "2.4 RLC 共振" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="mechanical" icon="⚙️">
      RLC 回路はバネ（C）・質量（L）・ダンパー（R）の機械振動系と数学的に同型。共振はブランコが最大に揺れる状態。XL = XC のとき、インピーダンスが最小（直列）または最大（並列）になり、電流・電圧が極端な挙動を示す。
    </Analogy>
    <p>
      Q値：共振の「鋭さ」。Q大きい = 共振ピークが細く高い = 選択性が高い（ラジオのチューニングに利用）。直列共振時はコイル・コンデンサの電圧が入力の Q 倍に拡大されるため、高Q回路では過電圧に注意。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}",
          meaning: "直列RLCの合成インピーダンス大きさ",
          when: "直列接続・正弦波定常",
          notWhen: "並列回路には直接使えない（逆数で考える）",
        },
        {
          formula: "f_0 = 1 / (2\\pi\\sqrt{LC})",
          meaning: "共振周波数。L・Cだけで決まり Rは無関係",
          when: "直列・並列ともに同じ式",
          notWhen: "—",
        },
        {
          formula: "Q = \\omega_0 L / R = 1 / (\\omega_0 CR)",
          meaning: "直列共振のQ値。共振時の電圧拡大率でもある",
          when: "直列RLC共振",
          notWhen: "並列共振では Q = R/(ω₀L) と逆転する",
        },
        {
          formula: "I_{max} = V/R",
          meaning: "直列共振時の電流。リアクタンス成分が相殺されRのみ残る",
          when: "直列共振点のみ",
          notWhen: "共振点以外では I < V/R",
        },
        {
          formula: "Z_{共振} \\approx L / (Cr)",
          meaning: "並列共振インピーダンス（コイルに巻線抵抗 r がある場合・高Q近似）",
          when: "高Q近似（Q≫1）",
          notWhen: "低Q回路では誤差大",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th></th><th>直列RLC</th><th>並列RLC</th></tr>
      </thead>
      <tbody>
        <tr><td>インピーダンス</td><td><strong>共振時 最小（= R）</strong></td><td><strong>共振時 最大（= R）</strong></td></tr>
        <tr><td>電流</td><td><strong>共振時 最大</strong></td><td><strong>共振時 最小</strong></td></tr>
        <tr><td>Q値の定義</td><td>Q = ω₀L/R</td><td>Q = R/(ω₀L)</td></tr>
        <tr><td>用途</td><td>選択フィルタ</td><td>タンク回路</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>条件</th><th>回路の性質</th><th>電流の位相</th></tr>
      </thead>
      <tbody>
        <tr><td>XL &gt; XC</td><td>誘導性</td><td>電圧より遅れ</td></tr>
        <tr><td>XL &lt; XC</td><td>容量性</td><td>電圧より進み</td></tr>
        <tr><td>XL = XC</td><td>共振（純抵抗的）</td><td>電圧と同位相</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> R=10Ω、XL=20Ω、XC=12Ω の直列RLC回路のインピーダンスの大きさと位相角を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>Z = √(10²+(20-12)²) = √(100+64) = √164 ≈ <strong>12.8Ω</strong></p>
      <p>tanφ = 8/10 → φ ≈ 38.7°（誘導性：電流が電圧より遅れ）</p>
    </details>
    <p><strong>問:</strong> R=10Ω、L=10mH、C=10μF の直列RLC回路の共振周波数と Q 値を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>ω₀ = 1/√(LC) = 1/√(10×10⁻³ × 10×10⁻⁶) = 10⁴ rad/s → f₀ ≈ <strong>1591 Hz</strong></p>
      <p>Q = ω₀L/R = 10⁴ × 10×10⁻³ / 10 = <strong>10</strong>。コイル電圧は入力の 10 倍に拡大。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="直列インピーダンスはベクトル合成">
      Z = R + XL + XC とスカラーで足してはいけない。Z = √(R²+(XL-XC)²)。直角三角形を思い出す。
    </Callout>
    <Callout variant="warn" title="並列共振のQ値は直列と逆数">
      直列：Q = ω₀L/R。並列：Q = R/(ω₀L)。並列回路ではRが大きいほど電流を制限してQが上がる（直列とは逆）。問題文で「並列」と書いてあれば必ず確認する。
    </Callout>
    <Callout variant="warn" title="共振時でもコイル・コンデンサの電圧は消えない">
      共振時は VL と VC が打ち消し合うが、それぞれの大きさは QVs。Q=10 なら各素子に入力の 10 倍の電圧がかかる。高Q回路では過電圧に注意。
    </Callout>
    <Callout variant="tip" title="RC 回路に「共振」はない">
      共振は L と C が両方ないと起きない。RC 回路はコンデンサのインピーダンスが周波数で変わるだけ。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>交流の基礎（2.2）：リアクタンス XL・XC の定義</li>
      <li>インダクタンス（3.1）：L の物理的実体</li>
      <li>ブリッジ回路（2.5）：平衡条件を RLC に拡張</li>
    </ul>

    <PageNav
      prev={{ id: "ac-power", title: "2.3 交流電力" }}
      next={{ id: "bridge-circuit", title: "2.5 ブリッジ回路" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   3.1 インダクタンス
   ============================================================ */
const InductancePage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★" importance="A" frequency="中" />
    <LearningMap
      prereqs={[{ id: "bridge-circuit", title: "2.5 ブリッジ回路" }]}
      current="3.1 インダクタンス"
      nexts={[{ id: "transient", title: "3.2 過渡現象" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第3章 — CHAPTER 3 電磁エネルギー"
      title="3.1 インダクタンス"
      deck="コイルは「電流の変化を嫌がる素子」。磁界にエネルギーを蓄え、電流変化に逆らう起電力を発生させる。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "中" },
        { label: "難易度", value: "★★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "inductance", label: "3.1 インダクタンス" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="flywheel" icon="🌀">
      フライホイール（はずみ車）は回転の変化に抵抗する。インダクタも同じで、電流が急に増えようとすると逆起電力で抵抗し、電流が急に減ろうとすると維持しようとする。「電流の慣性」がインダクタンスの本質。
    </Analogy>
    <p>
      エネルギーの蓄え方が違う：コンデンサは電界に蓄える（電荷 → 電圧）、インダクタは磁界に蓄える（電流 → 磁束）。双対の概念として一緒に整理する。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "e = -L\\,dI/dt",
          meaning: "電流が変化するとコイルは逆起電力を生じる（レンツの法則）",
          when: "線形コイル、均一磁界",
          notWhen: "鉄心が磁気飽和している場合",
        },
        {
          formula: "L = \\mu_0 \\mu_r N^2 A / l \\text{ [H]}",
          meaning: "コイルの構造（巻数・断面積・長さ・透磁率）でLが決まる。L は N² に比例",
          when: "均一磁界の場合",
          notWhen: "漏れ磁束が大きい場合は近似",
        },
        {
          formula: "W = LI^2/2 \\text{ [J]}",
          meaning: "コイルに蓄えられるエネルギーは電流の2乗に比例",
          when: "電流が定常状態",
          notWhen: "過渡状態では瞬時値が変化",
        },
        {
          formula: "L_{和動} = L_1 + L_2 + 2M",
          meaning: "磁束が同方向に強め合う和動直列接続の合成インダクタンス",
          when: "直列かつ磁束が同方向",
          notWhen: "磁束が逆方向（差動）では符号反転",
        },
        {
          formula: "L_{差動} = L_1 + L_2 - 2M",
          meaning: "磁束が逆方向に弱め合う差動直列接続の合成インダクタンス",
          when: "直列かつ磁束が逆方向",
          notWhen: "和動接続では符号反転",
        },
        {
          formula: "k = M / \\sqrt{L_1 L_2} \\quad (0 \\le k \\le 1)",
          meaning: "結合係数：どれだけ磁束が共有されているか。k=1 は理想変圧器",
          when: "常に定義可能",
          notWhen: "k=1 は理想値（現実は k<1）",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>項目</th><th>コンデンサ（C）</th><th>インダクタ（L）</th></tr>
      </thead>
      <tbody>
        <tr><td>蓄えるエネルギー</td><td>電界</td><td>磁界</td></tr>
        <tr><td>エネルギー式</td><td>W = CV²/2</td><td>W = LI²/2</td></tr>
        <tr><td>急変を嫌うもの</td><td>電圧（V）</td><td>電流（I）</td></tr>
        <tr><td>直流定常状態</td><td>開放（電流ゼロ）</td><td>短絡（電圧ゼロ）</td></tr>
        <tr><td>インピーダンス</td><td>Z = 1/(jωC)</td><td>Z = jωL</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>接続</th><th>コンデンサ C</th><th>インダクタ L（相互結合なし）</th></tr>
      </thead>
      <tbody>
        <tr><td>直列</td><td>1/C = 1/C₁+1/C₂（小さくなる）</td><td>L = L₁+L₂（大きくなる）</td></tr>
        <tr><td>並列</td><td>C = C₁+C₂（大きくなる）</td><td>1/L = 1/L₁+1/L₂（小さくなる）</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> L=50mH のコイルに 5A の電流が流れているとき、蓄えられているエネルギーを求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>W = LI²/2 = 0.05 × 25/2 = <strong>0.625 J</strong></p>
      <p>運動エネルギー mv²/2 との対応で覚える。</p>
    </details>
    <p><strong>問:</strong> 和動接続で L=120mH、差動接続で L=40mH のとき、相互インダクタンス M と結合係数 k を求めよ（L₁=L₂ とする）。</p>
    <details>
      <summary>解答</summary>
      <p>M = (L和動 - L差動)/4 = (120-40)/4 = <strong>20mH</strong></p>
      <p>L₁+L₂=80mH → L₁=L₂=40mH。k = M/√(L₁L₂) = 20/√(40×40) = 20/40 = <strong>0.5</strong></p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="自己誘導のマイナス符号はレンツの法則">
      e = -L(dI/dt) のマイナスは「変化を妨げる向き」を示す物理的意味がある。符号を落とすとエネルギーの授受が逆転する。
    </Callout>
    <Callout variant="warn" title="直列接続でも相互結合があれば L₁+L₂ ではない">
      相互結合がある場合は必ず ±2M を加減する。和動か差動かは同名端子の向きで判別。
    </Callout>
    <Callout variant="warn" title="k=1 は現実には存在しない">
      k=1 は「漏れ磁束がゼロ」の理想変圧器の条件。現実のコイルは必ず漏れ磁束があるので k&lt;1。
    </Callout>
    <Callout variant="tip" title="巻数を2倍にすると L は4倍">
      L = μN²A/l なので L は N² に比例。巻数を2倍にするとLは4倍。「巻数とLの関係を求めよ」は頻出。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>電磁力（1.3）：ファラデーの法則 e = -Ndφ/dt が基礎</li>
      <li>磁気回路（1.4）：L = μN²A/l の導出元</li>
      <li>RLC 共振（2.4）：インピーダンス XL = ωL として登場</li>
    </ul>

    <PageNav
      prev={{ id: "bridge-circuit", title: "2.5 ブリッジ回路" }}
      next={{ id: "transient", title: "3.2 過渡現象" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   5.3 演算増幅器（オペアンプ）
   ============================================================ */
const OpAmpPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="B" frequency="低" />
    <LearningMap
      prereqs={[{ id: "transistor", title: "5.2 トランジスタ" }]}
      current="5.3 演算増幅器"
      nexts={[{ id: "measurement", title: "6.1 電気・電子計測" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第5章 — CHAPTER 5 電子回路"
      title="5.3 演算増幅器"
      deck="2つの入力の差を増幅する素子。負帰還をかけることで安定した増幅回路を構成する。仮想接地が計算の鍵。"
      meta={[
        { label: "重要度", value: "B" },
        { label: "出題頻度", value: "低（パターン固定で得点源）" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "op-amp", label: "5.3 演算増幅器" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="ideal-amplifier" icon="🔌">
      オペアンプは「2つの入力の差を無限大に増幅する素子」。そのままでは出力が飽和するため、出力の一部を入力に戻す<strong>負帰還（フィードバック）</strong>をかけて安定した増幅回路を作る。
    </Analogy>
    <p>
      負帰還が働くと、＋入力と－入力の電圧差はほぼゼロになる（<strong>仮想接地 / イマジナリーショート</strong>）。この近似がオペアンプ回路の計算を一気に簡単にする。計算の手順：「仮想接地で電圧を決める → キルヒホッフで電流を追う → 出力電圧を求める」の3ステップ。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "A_v = -R_f / R_i",
          meaning: "反転増幅回路のゲイン。マイナスは位相反転を意味する",
          when: "負帰還あり・理想オペアンプ",
          notWhen: "負帰還なし（コンパレータ動作）",
        },
        {
          formula: "A_v = 1 + R_f / R_i",
          meaning: "非反転増幅回路のゲイン。必ず1以上",
          when: "負帰還あり・理想オペアンプ",
          notWhen: "—",
        },
        {
          formula: "A_v = 1 \\text{（ボルテージフォロワ）}",
          meaning: "Rf=0・Ri=∞ の非反転増幅。インピーダンス変換に使う",
          when: "—",
          notWhen: "—",
        },
        {
          formula: "V_o = -(R_f/R_1 \\cdot V_1 + R_f/R_2 \\cdot V_2)",
          meaning: "反転加算回路。複数入力を重みづけして加算し位相反転して出力",
          when: "反転入力に複数入力",
          notWhen: "—",
        },
        {
          formula: "V_o(t) = -(V_i / RC) \\cdot t",
          meaning: "積分回路のステップ入力応答。出力が時間に比例して直線的に変化",
          when: "一定電圧 Vi を加えたとき",
          notWhen: "直流入力を長時間加えると飽和",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>項目</th><th>反転増幅</th><th>非反転増幅</th></tr>
      </thead>
      <tbody>
        <tr><td>ゲイン公式</td><td>Av = -Rf/Ri（マイナス）</td><td>Av = 1+Rf/Ri（プラス）</td></tr>
        <tr><td>位相</td><td>反転（180°ずれる）</td><td>同位相（ずれなし）</td></tr>
        <tr><td>入力インピーダンス</td><td>Ri（比較的低い）</td><td>ほぼ無限大（高インピーダンス）</td></tr>
        <tr><td>ゲイン範囲</td><td>|Av| は 0 以上</td><td>Av ≥ 1（1未満にできない）</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>特性</th><th>理想オペアンプ</th><th>実際のオペアンプ</th></tr>
      </thead>
      <tbody>
        <tr><td>入力インピーダンス</td><td>∞（入力電流ゼロ）</td><td>有限（数MΩ〜GΩ）</td></tr>
        <tr><td>出力インピーダンス</td><td>0</td><td>有限（数十Ω〜）</td></tr>
        <tr><td>開ループゲイン</td><td>∞</td><td>有限（10⁵〜10⁶）</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 反転増幅回路で Ri=10kΩ、Rf=100kΩ のとき、電圧利得 Av と入力電圧 Vi=0.5V に対する出力電圧 Vo を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>Av = -Rf/Ri = -100/10 = <strong>-10</strong></p>
      <p>Vo = Av × Vi = -10 × 0.5 = <strong>-5V</strong>（入力と逆位相）</p>
    </details>
    <p><strong>問:</strong> 積分回路で R=10kΩ、C=1μF のとき、Vi=1V のステップ入力を加えた 0.1 秒後の出力電圧を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>Vo = -(Vi/RC)×t = -(1/(10×10³ × 1×10⁻⁶)) × 0.1 = -0.1/0.01 = <strong>-10V</strong></p>
      <p>RC = 0.01s（時定数）。出力にマイナスがつく（位相反転）。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="反転増幅のゲインにマイナスをつけ忘れる">
      Av = -Rf/Ri。マイナスは「出力が入力と逆位相になる」ことを意味する。出力電圧を求めるときはマイナスを忘れると符号が逆になる。
    </Callout>
    <Callout variant="warn" title="仮想接地は負帰還がかかっているときのみ有効">
      コンパレータ動作（負帰還なし）や正帰還回路には適用できない。まず回路に負帰還があるか確認してから使う。
    </Callout>
    <Callout variant="warn" title="シュミットトリガで仮想接地を使わない">
      シュミットトリガは正帰還なので仮想接地が成立しない。＋入力の電圧を R₁・R₂ の分圧で求め、Vi（－入力）と大小比較して出力を判定する。（R04上 問13）
    </Callout>
    <Callout variant="tip" title="非反転増幅は入力が+端子→ゲインに1が付く">
      区別のコツ：「＋入力に信号が入る → 非反転 → ゲインに 1 が付く（Av = 1+Rf/Ri）」と接続で覚える。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>直流回路（2.1）：仮想接地後の電流計算は KVL/KCL と同じ</li>
      <li>電気・電子計測（6.1）：計装アンプとして計測器に内蔵</li>
      <li>トランジスタ（5.2）：オペアンプの内部素子</li>
    </ul>

    <PageNav
      prev={{ id: "transistor", title: "5.2 トランジスタ" }}
      next={{ id: "measurement", title: "6.1 電気・電子計測" }}
      onNav={onNav}
    />
  </>
);

/* ============================================================
   6.1 電気・電子計測
   ============================================================ */
const MeasurementPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="A" frequency="低" />
    <LearningMap
      prereqs={[{ id: "op-amp", title: "5.3 演算増幅器" }]}
      current="6.1 電気・電子計測"
      nexts={[{ id: "trap-patterns", title: "7.1 引っかけパターン集" }]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="第6章 — CHAPTER 6 計測"
      title="6.1 電気・電子計測"
      deck="電気計器は「電流→力→指針」の変換機構。種類によって動作原理が異なり、交直の使い分けが試験の核心。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "低（年度差が大きい）" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "measurement", label: "6.1 電気・電子計測" },
      ]}
      onNav={onNav}
    />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="pointer" icon="📏">
      電気計器は「電流を機械的な力に変換して指針を動かす」仕組み。どの力を使うか（電磁力・熱・整流）によって種類が分かれ、それが「交流に使えるか」を決める。可動コイル型は直流専用。交流を測りたければ整流回路を追加するか、別の種類を使う。
    </Analogy>
    <p>
      レンジ拡大の基本：<strong>倍率器（直列接続）</strong>で電圧計のレンジを、<strong>分流器（並列接続）</strong>で電流計のレンジを拡大する。電流計は内部抵抗が低いほど良い、電圧計は内部抵抗が高いほど良い。
    </p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable
      layer="A"
      rows={[
        {
          formula: "R_m = (n-1) \\times R_v",
          meaning: "倍率器の抵抗。n 倍のレンジにするために直列に追加する抵抗値",
          when: "電圧計のレンジ拡大",
          notWhen: "—",
        },
        {
          formula: "R_s = R_v / (n-1)",
          meaning: "分流器の抵抗。n 倍のレンジにするために並列に追加する抵抗値",
          when: "電流計のレンジ拡大",
          notWhen: "—",
        },
        {
          formula: "P = VI\\cos\\phi",
          meaning: "電力計の指示値。有効電力を直接読める",
          when: "電流力計型の電力計",
          notWhen: "無効電力・皮相電力は直読できない",
        },
        {
          formula: "\\varepsilon = (W_{計器} - W_{真値}) / W_{真値} \\times 100\\,[\\%]",
          meaning: "誤差率。計器の積算値と真値の差を真値で割る",
          when: "電力量計の誤差計算",
          notWhen: "—",
        },
        {
          formula: "\\text{分解能} = \\text{測定レンジ} / 2^n",
          meaning: "A-D変換の分解能。ビット数 n が増えると分解能が細かくなる",
          when: "ディジタル計器の精度評価",
          notWhen: "—",
        },
      ]}
    />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ</h2>
    <table>
      <thead>
        <tr><th>計器の種類</th><th>動作原理</th><th>使用回路</th><th>特徴</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>可動コイル型</strong></td><td>電流と磁界の電磁力</td><td><strong>直流のみ</strong></td><td>感度が高い・精度良い</td></tr>
        <tr><td>可動鉄片型</td><td>磁化された鉄片間の反発力</td><td>交流・直流</td><td>構造が簡単・安価</td></tr>
        <tr><td><strong>電流力計型</strong></td><td>固定・可動コイル間の電磁力</td><td>交流・直流</td><td>真の有効電力を直読</td></tr>
        <tr><td><strong>整流形</strong></td><td>整流回路 + 可動コイル型</td><td><strong>交流</strong></td><td>正弦波以外は波形誤差が出る</td></tr>
        <tr><td>熱電形</td><td>電流による発熱 → 熱起電力</td><td>交流・直流</td><td>周波数特性が良い・真の実効値</td></tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr><th>項目</th><th>電圧計</th><th>電流計</th></tr>
      </thead>
      <tbody>
        <tr><td>接続方法</td><td>測定対象に<strong>並列</strong>接続</td><td>測定対象に<strong>直列</strong>接続</td></tr>
        <tr><td>望ましい内部抵抗</td><td><strong>高い</strong>（∞に近いほど良い）</td><td><strong>低い</strong>（0に近いほど良い）</td></tr>
        <tr><td>レンジ拡大方法</td><td>倍率器（直列に抵抗追加）</td><td>分流器（並列に抵抗追加）</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 内部抵抗 Rv=1kΩ の電圧計を使って 10 倍のレンジに拡大したい。倍率器の抵抗 Rm を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>Rm = (n-1)×Rv = (10-1)×1000 = <strong>9kΩ</strong></p>
      <p>倍率器は電圧計と直列に接続。Rm = (n-1)×Rv（n は測定倍率）。</p>
    </details>
    <p><strong>問:</strong> 2電力計法で W₁=400W、W₂=200W のとき、三相電力と力率を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>P = W₁ + W₂ = <strong>600W</strong></p>
      <p>tanφ = √3(W₁-W₂)/(W₁+W₂) = √3×200/600 = √3/3 → φ=30° → <strong>cos30° ≈ 0.866</strong></p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="可動コイル型は直流専用">
      交流（50/60Hz）では電流の向きが正負に交互に反転するため力も反転し、指針が振れない。交流を測るには整流形（整流器+可動コイル）または可動鉄片型・電流力計型を使う。
    </Callout>
    <Callout variant="warn" title="2電力計法：力率0.5以下でW<0になる">
      力率 cosφ＜0.5（φ＞60°）のとき、一方の電力計がマイナスを指示する。P=W₁+W₂ は変わらないが W₂ がマイナスなので P=W₁−|W₂| と計算する。指針がマイナスに振れたら接続を逆にして読む。
    </Callout>
    <Callout variant="warn" title="整流形は正弦波以外で波形誤差が出る">
      整流形は常に「正弦波の波形率 1.11」で実効値換算する。矩形波（波形率 1.0）では実際より約 11% 大きく表示してしまう。「True RMS」計器でないと非正弦波の正確な実効値は測れない。
    </Callout>
    <Callout variant="tip" title="高抵抗負荷には電流計前置き、低抵抗負荷には電圧計前置き">
      電圧計・電流計の接続誤差：高抵抗負荷 → 電流計前置き（V が A+負荷に並列）。低抵抗負荷 → 電圧計前置き（A が直列）。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>直流回路（2.1）：倍率器・分流器の計算は分圧・分流の法則と同じ</li>
      <li>交流電力（2.3）：2電力計法は三相電力測定で使用</li>
      <li>電磁力（1.3）：電流力計型・可動コイル型の動作原理</li>
    </ul>

    <PageNav
      prev={{ id: "op-amp", title: "5.3 演算増幅器" }}
      next={{ id: "trap-patterns", title: "7.1 引っかけパターン集" }}
      onNav={onNav}
    />
  </>
);

Object.assign(window, {
  CoulombFieldPage,
  ElectromagneticForcePage,
  MagneticCircuitPage,
  DcCircuitPage,
  AcBasicsPage,
  RlcResonancePage,
  InductancePage,
  OpAmpPage,
  MeasurementPage,
});
