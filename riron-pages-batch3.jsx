/* riron-pages-batch3.jsx — 電験3種理論Wiki リファレンス5ページ + 薄い単元3ページ */

const { useState } = React;

/* ============================================================================
   薄いページ（50〜80行）
   ============================================================================ */

const BridgeCircuitPage = ({ onNav }) => (
  <>
    <div className="meta-strip">
      <span className="difficulty">★★</span>
      <span className="importance">B</span>
      <span className="frequency">中</span>
    </div>
    <div className="page-header">
      <div className="eyebrow">第2章 電気回路</div>
      <h1>2.5 ブリッジ回路</h1>
      <p className="deck">4本の素子が十字に組まれた回路。対角辺の積が等しいとき「平衡」となり、検流計に電流が流れない。</p>
      <div className="meta-list">
        <span>4/26更新</span>
        <span>重要度 A</span>
      </div>
    </div>
    <div className="crumbs">
      <a href="#" onClick={() => onNav('rlc-resonance')}>RLC回路・共振</a> →
      <span>ブリッジ回路</span> →
      <a href="#" onClick={() => onNav('inductance')}>インダクタンス</a>
    </div>
    <h2 id="principle">§1 原理</h2>
    <p>ブリッジ回路は天秤のイメージ。左皿と右皿のバランスが取れると指針がゼロになる（検流計に電流が流れない）。平衡条件は「向かい合う辺の積が等しい」。これを使えば未知素子の値を他の既知素子から計算できる。</p>
    <div className="callout callout-tip">
      <strong>5秒で思い出す</strong><br/>
      平衡条件 = 向かい合う辺の積が等しい（$R_1 R_4 = R_2 R_3$）。平衡のとき検流計 $I_g = 0$。
    </div>
    <h2 id="formulas">§2 公式</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>条件</th></tr></thead>
      <tbody>
        <tr><td>$R_1 R_4 = R_2 R_3$</td><td>ホイートストンブリッジの平衡条件</td><td>直流・抵抗</td></tr>
        <tr><td>{String.raw`$R_x = \dfrac{R_1 \cdot R_3}{R_2}$`}</td><td>平衡状態から未知抵抗を求める</td><td>平衡時</td></tr>
        <tr><td>{String.raw`$I_g = \dfrac{V_{th}}{R_{th} + R_g}$`}</td><td>不平衡時の検流計電流（テブナン）</td><td>不平衡時</td></tr>
      </tbody>
    </table>
    <h2 id="examples">§3 例題</h2>
    <p><strong>問題</strong>: ホイートストンブリッジで {String.raw`$R_1=100\Omega$`}、{String.raw`$R_2=200\Omega$`}、{String.raw`$R_3=150\Omega$`} のとき、平衡条件から未知抵抗 $R_4$ を求めよ。</p>
    <p><strong>解答</strong>: {String.raw`$R_1 \times R_4 = R_2 \times R_3 \Rightarrow R_4 = \dfrac{200 \times 150}{100} = 300\Omega$`}</p>
    <h2 id="related">§4 関連</h2>
    <ul>
      <li>テブナンの定理（不平衡時の解法）</li>
      <li>マクスウェルブリッジ（交流）、ウィーンブリッジ</li>
      <li>計器の原理と測定法</li>
    </ul>
    <div className="page-nav">
      <a className="nav-prev" href="#" onClick={() => onNav('rlc-resonance')}>← RLC回路・共振</a>
      <a className="nav-next" href="#" onClick={() => onNav('inductance')}>インダクタンス →</a>
    </div>
  </>
);

const TransientPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★" importance="B" frequency="中" />
    <LearningMap
      prereqs={[{id:"dc-circuit", title:"直流回路"},{id:"capacitance", title:"コンデンサ（静電容量）"},{id:"inductance", title:"インダクタンス"}]}
      current="過渡現象"
      nexts={[]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="3.2 — TRANSIENT PHENOMENA"
      title="過渡現象"
      deck="スイッチON/OFFの瞬間から定常状態に落ち着くまでの「変化の過程」。時定数 τ が変化の速さを決める。"
      meta={[
        { label: "重要度", value: "B" },
        { label: "出題頻度", value: "中（毎年1問、問10に固定）" },
        { label: "難易度", value: "★★★★" },
      ]}
    />
    <Crumbs items={[{id:"home",label:"ホーム"},{label:"3. 電磁誘導・過渡"}]} onNav={onNav} />

    <h2 id="principle"><span className="h-num">1.</span>原理（なぜ起きるか）</h2>
    <Analogy type="tank" icon="💧">
      貯水タンクに水を注ぐイメージ：最初は勢いよく増え、満杯に近づくほどゆっくりになる。コンデンサへの充電やコイルへの電流増加も同じ指数カーブを描く。時定数 τ（タウ）は「変化の速さ」の物差しで、τ 秒後に「残り変化量の約37%が残っている」（≒ 63%変化した状態）。
    </Analogy>
    <p>解法の鉄則は<strong>初期値と最終値を先に求める</strong>こと。あとは一般式 <Eq tex="f(t) = f(\\infty) + [f(0) - f(\\infty)]\\,e^{-t/\\tau}" /> に当てはめるだけ。τ 後 = 63%変化、5τ 後 ≒ 99%（実用上の定常到達目安）。</p>

    <h2 id="formulas"><span className="h-num">2.</span>公式</h2>
    <FormulaTable layer="A" rows={[
      { formula: "\\tau = RC", meaning: "RC回路の時定数", when: "直列RC（1次回路）", notWhen: "複数のR・Cが混在する複雑な回路" },
      { formula: "\\tau = \\frac{L}{R}", meaning: "RL回路の時定数", when: "直列RL（1次回路）", notWhen: "複数のL・Rが混在する複雑な回路" },
      { formula: "f(t) = f(\\infty) + [f(0) - f(\\infty)]\\,e^{-t/\\tau}", meaning: "過渡現象の一般式：初期値→最終値への指数変化", when: "1次回路全般", notWhen: "2次以上のLC回路（減衰振動）" },
      { formula: "e^{-1} \\approx 0.368", meaning: "τ 後の残存率（≒ 63%変化）", when: "数値計算の目安", notWhen: "—" },
    ]} />

    <h3>応用変換（レイヤーB）</h3>
    <FormulaTable layer="B" rows={[
      { formula: "t=0^+\\text{：C→短絡、L→開放}（初期値ゼロ）", meaning: "スイッチ直後の等価回路置換", when: "初期値ゼロの場合", notWhen: "初期値あり（C→電圧源、L→電流源として扱う）" },
      { formula: "t\\to\\infty\\text{：C→開放、L→短絡}", meaning: "直流定常状態の等価回路置換", when: "直流定常状態", notWhen: "交流定常状態" },
      { formula: "5\\tau\\text{ 後} \\approx 99\\%\\text{ 定常値}", meaning: "実用上「定常に達した」と見なす目安", when: "1次回路", notWhen: "—" },
    ]} />

    <h2 id="comparison"><span className="h-num">3.</span>比較・まとめ表</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>RC回路</th>
          <th>RL回路</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>時定数</td>
          <td><Eq tex="\\tau = RC" /></td>
          <td><Eq tex="\\tau = L/R" /></td>
        </tr>
        <tr>
          <td>t=0⁺ の C/L</td>
          <td>短絡（充電ゼロ時）または電圧源</td>
          <td>開放（電流ゼロ時）または電流源</td>
        </tr>
        <tr>
          <td>t→∞ の C/L</td>
          <td>開放</td>
          <td>短絡</td>
        </tr>
        <tr>
          <td>急変不可の量</td>
          <td>コンデンサ電圧 v_C（連続）</td>
          <td>インダクタ電流 i_L（連続）</td>
        </tr>
      </tbody>
    </table>

    <h3>t=0直後 vs t=∞ での各素子の扱い</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>素子</th>
          <th>t=0⁺（初期値ゼロ）</th>
          <th>t→∞（直流定常）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>コンデンサ C</td>
          <td><strong>短絡</strong>（V=0を維持）</td>
          <td><strong>開放</strong></td>
        </tr>
        <tr>
          <td>インダクタ L</td>
          <td><strong>開放</strong>（I=0を維持）</td>
          <td><strong>短絡</strong></td>
        </tr>
        <tr>
          <td>抵抗 R</td>
          <td>そのまま</td>
          <td>そのまま</td>
        </tr>
      </tbody>
    </table>

    <h3>充電過程 vs 放電過程（RC回路）</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>充電過程</th>
          <th>放電過程</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>v_C(0)</td>
          <td>0</td>
          <td>V₀</td>
        </tr>
        <tr>
          <td>v_C(∞)</td>
          <td>E（電源電圧）</td>
          <td>0</td>
        </tr>
        <tr>
          <td>v_C(t)</td>
          <td><Eq tex="E(1 - e^{-t/\\tau})" /></td>
          <td><Eq tex="V_0\\,e^{-t/\\tau}" /></td>
        </tr>
        <tr>
          <td>i(t)</td>
          <td><Eq tex="\\dfrac{E}{R}\\,e^{-t/\\tau}" /></td>
          <td><Eq tex="-\\dfrac{V_0}{R}\\,e^{-t/\\tau}" /></td>
        </tr>
      </tbody>
    </table>

    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      過渡現象は「定常状態に落ち着くまでの暴れ」。電動機始動・コンデンサ投入・リレー遮断など、現場で突入電流や誘導サージが発生するのはすべてこの物理が動いている。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr><td>電動機始動時の突入電流</td><td>RL回路の過渡応答</td><td>始動電流は定格の5〜7倍、保護協調と起動方式（スターデルタ等）選定</td></tr>
        <tr><td>進相コンデンサ投入時の突入電流</td><td>RC回路の過渡</td><td>突入電流抑制リアクトル（直列リアクトル）を設置して緩和</td></tr>
        <tr><td>リレーコイル切断時のサージ電圧</td><td>L di/dt によるサージ</td><td>コイル両端にサージキラー（ダイオード・バリスタ）必須</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">4.</span>例題</h2>
    <p><strong>問1:</strong> R=1kΩ、C=100μF のRC直列回路にDC10Vを印加した。時定数 τ と、τ 後のコンデンサ電圧を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p><Eq tex="\\tau = RC = 1000 \\times 100 \\times 10^{-6} = 0.1\\text{ s}" display /></p>
      <p><Eq tex="v_C(\\tau) = 10(1 - e^{-1}) \\approx 10 \\times 0.632 = 6.32\\text{ V}" display /></p>
      <p><strong>ポイント：</strong>τ 後には最終値の約63.2%まで充電される。</p>
    </details>

    <p><strong>問2:</strong> スイッチ切り替え前の定常状態でコンデンサに8Vが充電されている。切り替え後の回路では最終値が0V、時定数が0.05sである。切り替え後の v_C(t) を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>初期値 <Eq tex="f(0) = 8\\text{ V}" />、最終値 <Eq tex="f(\\infty) = 0\\text{ V}" />、<Eq tex="\\tau = 0.05\\text{ s}" /></p>
      <p><Eq tex="v_C(t) = 0 + [8 - 0]\\,e^{-t/0.05} = 8\\,e^{-20t}\\text{ V}" display /></p>
      <p><strong>ポイント：</strong>切り替え前の電圧が切り替え後の初期値になる（コンデンサ電圧は急変不可）。</p>
    </details>

    <h2 id="traps"><span className="h-num">5.</span>引っかけポイント</h2>
    <Callout variant="warn" title="勘違い①：t=0直後にコンデンサを「開放」として扱う">
      初期電荷ゼロのコンデンサは t=0⁺ で短絡に等しい（電圧=0を維持）。電流は最大値で流れ始め、徐々に減少する。コンデンサは「電荷を蓄えるから電流が流れない」ではなく、「電圧が急変できない」素子。
    </Callout>
    <Callout variant="warn" title="勘違い②：1τ後に定常値に達したと思い込む">
      1τ 後は約63%変化した状態。100%に近づくのは理論上無限大時間かかる。実用上は 5τ 後（≒99%）を定常到達の目安とする。「τ で定常達成」は誤り。
    </Callout>
    <Callout variant="warn" title="勘違い③：RL回路で t=0直後のインダクタを「短絡」として扱う">
      初期電流ゼロのインダクタは t=0⁺ で開放に等しい（電流は急変できない）。電流はゼロから徐々に増加する。
    </Callout>
    <Callout variant="warn" title="勘違い④：RC回路とRL回路の時定数式を取り違える（H25問4・R01問3）">
      次元チェックが有効。<Eq tex="\\tau = L/R" /> は [H]/[Ω]=[s]、<Eq tex="\\tau = CR" /> は [F]·[Ω]=[s] と確認する。RL回路の微分方程式を解くと指数係数は R/L → 時定数は L/R。
    </Callout>
    <Callout variant="note" title="複雑な回路の時定数はテブナン抵抗で求める（R02問10）">
      C またはL を取り外し、全電圧源を短絡・全電流源を開放して端子間の合成抵抗 R_th を求める。時定数は <Eq tex="\\tau = R_{th}C" />（RC回路）または <Eq tex="\\tau = L/R_{th}" />（RL回路）。
    </Callout>

    <h2 id="related"><span className="h-num">6.</span>関連項目</h2>
    <ul>
      <li>直流回路 — キルヒホッフの法則・テブナンの定理（時定数計算の基礎）</li>
      <li>コンデンサ（静電容量） — エネルギー蓄積・電圧急変不可の原理</li>
      <li>インダクタンス — エネルギー蓄積・電流急変不可の原理</li>
      <li>RLC回路 — LC振動・共振（2次回路への発展）</li>
    </ul>

    <PageNav prev={{id:"inductance", title:"3.1 インダクタンス"}} next={{id:"three-phase", title:"3.3 三相交流"}} onNav={onNav} />
  </>
);

// last-updated: 2026-04-27 | v0.9 | RULE監査：H3ラベル・実務セクション・TrapBlock・marker適用
const SemiconductorPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="A" frequency="中" />
    <LearningMap
      prereqs={[{id:"dc-circuit", title:"直流回路"},{id:"electromagnetic-force", title:"電磁力"}]}
      current="半導体・ダイオード"
      nexts={[{id:"transistor", title:"トランジスタ"}]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="5.1 — SEMICONDUCTOR / DIODE"
      title="半導体・ダイオード"
      deck="条件によって導体にも絶縁体にもなれる物質。ドーピングとPN接合で「電流の弁」を作る。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "中（毎年1問、問11に固定）" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs items={[{id:"home",label:"ホーム"},{label:"5. 電子理論"}]} onNav={onNav} />

    <h2 id="principle"><span className="h-num">1.</span>原理（なぜ起きるか）</h2>
    <Analogy type="valve" icon="🔧">
      ダイオードは「電流の弁」。弁は一方向には水を通し、逆方向には通さない。PN接合のダイオードはアノード（P側）が高電位のときだけ電流を流し、逆方向は遮断する。
      純粋なシリコンはほぼ絶縁体だが、微量の不純物（ドーパント）を加えると電気的性質が激変する。これがドーピング。N型とP型を接合させると、電流を一方向にしか通さないダイオードができる。
    </Analogy>
    <Callout variant="tip" title="5秒で思い出す">
      半導体 ＝ 不純物で性質が変わる「変化できる素材」。PN接合 ＝ 電流の一方通行弁。
    </Callout>
    <p>半導体は不純物で性質が変わる「変化できる素材」。PN接合は電流の一方通行弁として機能し、整流回路・定電圧回路・発光素子など幅広く応用される。</p>

    <h2 id="formulas"><span className="h-num">2.</span>公式</h2>
    <h3>レイヤーA：基本概念</h3>
    <FormulaTable layer="A" rows={[
      { formula: "V_F \\approx 0.6 \\sim 0.7\\text{ V}", meaning: "シリコンダイオードの順方向電圧降下（導通閾値）", when: "シリコンPN接合ダイオード", notWhen: "ゲルマニウム（≈0.3V）、LEDは色により異なる" },
      { formula: "V_{avg} = \\dfrac{V_m}{\\pi}\\text{（半波整流）}", meaning: "半波整流回路の出力平均電圧", when: "純抵抗負荷・理想ダイオード", notWhen: "フィルタあり・負荷が誘導性の場合は不適" },
      { formula: "V_{avg} = \\dfrac{2V_m}{\\pi}\\text{（全波整流）}", meaning: "全波整流回路の出力平均電圧（半波の2倍）", when: "純抵抗負荷・ブリッジ整流または中点タップ", notWhen: "フィルタあり・負荷が誘導性の場合は不適" },
    ]} />

    <h3>レイヤーB：応用変換</h3>
    <FormulaTable layer="B" rows={[
      { formula: "V_Z\\text{（ツェナー電圧）}", meaning: "逆方向に一定電圧を超えるとブレークダウンして定電圧を維持", when: "電圧安定化回路", notWhen: "電流が最大定格を超えると破壊" },
      { formula: "\\lambda \\propto \\frac{1}{E_g}\\text{（LED）}", meaning: "順方向電流でエネルギーギャップに応じた波長の光を放出", when: "GaAs・GaP等の化合物半導体", notWhen: "シリコンは間接遷移型のため発光不可" },
      { formula: "\\rho \\downarrow\\text{ as }T\\uparrow\\text{（半導体）}", meaning: "温度上昇→キャリア増加→抵抗減少（NTC特性）", when: "真性半導体・不純物半導体", notWhen: "金属とは逆（金属は温度↑で抵抗↑）" },
      { formula: "C \\propto \\dfrac{1}{\\sqrt{V_R}}\\text{（バラクタ）}", meaning: "逆バイアス電圧を大きくするほど空乏層が広がり静電容量が小さくなる", when: "逆バイアス印加時", notWhen: "順バイアスでは通常ダイオードと同じ動作" },
      { formula: "\\text{光起電力効果（太陽電池）}", meaning: "PN接合に光を当てると電子・正孔対が生成され、内蔵電界で分離されてP側がプラスの起電力が発生", when: "半導体PN接合", notWhen: "光が当たらなければ起電力は発生しない" },
    ]} />
    <Callout variant="note" title="バラクタダイオードの原理（R02 出題）">
      逆バイアス電圧 <Eq tex="V_R" /> を大きくするほど空乏層が広がり、静電容量 <Eq tex="C" /> が小さくなる（<Eq tex="C \propto \dfrac{1}{\sqrt{V_R}}" />）。バラクタダイオードは逆バイアスで使う。順バイアスをかけると電流が流れてしまい可変容量素子として機能しない。
    </Callout>
    <Callout variant="note" title="太陽電池の動作原理（R01・H20 出題）">
      太陽電池はPN接合ダイオードに光を当てたもの。光が当たると電子・正孔対が生成され、PN接合の内蔵電界によって電子はN側へ、正孔はP側へ引き寄せられる。P側がプラス（高電位）、N側がマイナス（低電位）になる。光起電力効果（フォトボルタイック効果）と光電効果（金属表面から電子が飛び出す）を混同しないこと。
    </Callout>

    <h2 id="comparison"><span className="h-num">3.</span>比較・まとめ表</h2>
    <h3>N型半導体 vs P型半導体</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>N型</th>
          <th>P型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ドーパント</td>
          <td>リン（P）・ヒ素（As）など（5価）</td>
          <td>ボロン（B）など（3価）</td>
        </tr>
        <tr>
          <td>多数キャリア</td>
          <td><span className="marker">電子（負の電荷）</span></td>
          <td><span className="marker">正孔（ホール、正の電荷）</span></td>
        </tr>
        <tr>
          <td>少数キャリア</td>
          <td>正孔</td>
          <td>電子</td>
        </tr>
        <tr>
          <td>不純物の呼称</td>
          <td><span className="marker">ドナー（電子を供与する）</span></td>
          <td><span className="marker">アクセプター（電子を受け取る）</span></td>
        </tr>
        <tr>
          <td>電気的中性</td>
          <td>中性（ドーパント核が正電荷を持つ）</td>
          <td>中性（ドーパント核が負電荷の不足）</td>
        </tr>
      </tbody>
    </table>

    <h3>順バイアス vs 逆バイアス</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>順バイアス</th>
          <th>逆バイアス</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>P側への印加</td>
          <td>＋（高電位）</td>
          <td>−（低電位）</td>
        </tr>
        <tr>
          <td>電流</td>
          <td>大きく流れる（<Eq tex="V_F" /> 以上で急増）</td>
          <td>ほぼ流れない（逆飽和電流のみ）</td>
        </tr>
        <tr>
          <td>空乏層</td>
          <td><span className="marker">薄くなる（縮小）</span></td>
          <td><span className="marker">厚くなる（拡大）</span></td>
        </tr>
        <tr>
          <td>例外動作</td>
          <td>—</td>
          <td>ツェナー降伏・アバランシェ降伏</td>
        </tr>
      </tbody>
    </table>

    <h3>真性半導体 vs 不純物半導体</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>真性半導体</th>
          <th>不純物半導体（N型・P型）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>組成</td>
          <td>純粋なシリコン・ゲルマニウム</td>
          <td>ドーパントを微量添加</td>
        </tr>
        <tr>
          <td>キャリア密度</td>
          <td>低い（室温では非常に少ない）</td>
          <td>高い（ドーパント濃度に依存）</td>
        </tr>
        <tr>
          <td>電子と正孔の数</td>
          <td>等しい</td>
          <td>多数キャリアが圧倒的に多い</td>
        </tr>
        <tr>
          <td>導電率</td>
          <td>低い</td>
          <td>高い（温度でも変化）</td>
        </tr>
      </tbody>
    </table>

    <h3>半導体 vs 金属の温度特性</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>半導体</th>
          <th>金属（導体）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>温度↑ → 抵抗</td>
          <td><span className="marker">減少（キャリア増加）</span></td>
          <td>増加（格子振動で散乱増加）</td>
        </tr>
        <tr>
          <td>温度係数</td>
          <td><span className="marker">負（NTC）</span></td>
          <td><span className="marker">正（PTC）</span></td>
        </tr>
        <tr>
          <td>応用</td>
          <td>サーミスタ（温度センサ）</td>
          <td>測温抵抗体（RTD）</td>
        </tr>
      </tbody>
    </table>

    <Callout variant="note" title="ドナー・アクセプターの覚え方（H18・H25・R03 出題）">
      ドナー（Donor）＝与える人：5価の原子（リン・ヒ素）は共有結合に4個使い、余った1個の電子をシリコンに供与する。これが自由電子になる → N型。
      アクセプター（Acceptor）＝受け取る人：3価の原子（ボロン）は共有結合に3個しか提供できず、1か所が「電子の空き」（正孔）になる → P型。
      穴埋め問題では「5価の不純物を加えると（　）が生成され、電子が多数キャリアとなる」という形式が頻出。答えは「ドナー」「N型半導体」の順番で入る。
    </Callout>
    <Callout variant="note" title="ダイオードの電圧方向を回路図から判断する手順（R04下・H19 出題）">
      判断の3ステップ：(1) 回路図でダイオードのアノード（A）とカソード（K）を特定する（三角形の底辺側がアノード＝P型、頂点側の棒がカソード＝N型）。(2) アノード・カソードそれぞれの電位を回路から読み取る。(3) アノード電位 {'>'} カソード電位 → 順バイアス（電流が流れる）、アノード電位 {'<'} カソード電位 → 逆バイアス（電流がほぼ流れない）。
    </Callout>

    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      半導体素子はセンサ・整流・定電圧回路の核心部品。現場で「なぜこの素子が選ばれているか」を理解することでトラブル解析と設備更新の判断力が上がる。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>制御盤の24VDC電源ユニット（ブリッジ整流回路）</td>
          <td>PN接合の一方通行性・全波整流の出力電圧式</td>
          <td>ダイオードの <Eq tex="V_F \approx 0.6\text{ V}" /> 分の電圧降下を考慮して二次電圧を設計し、出力24V以上を確保する</td>
        </tr>
        <tr>
          <td>制御回路の定電圧保護（サージ吸収・クランプ）</td>
          <td>ツェナーダイオードの逆降伏特性</td>
          <td>ツェナー電圧と電力定格を確認し、直列抵抗で電流制限。最大定格を超えると素子破壊するため保護協調が必要</td>
        </tr>
        <tr>
          <td>温度センサ選定（サーミスタ vs 熱電対）</td>
          <td>半導体の負温度係数（NTC）・ゼーベック効果</td>
          <td>サーミスタは温度↑→抵抗↓のNTC特性（半導体）。熱電対はゼーベック効果を利用した起電力型であり、原理・配線方式・計装回路が全く異なる</td>
        </tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">4.</span>例題</h2>
    <p><strong>問:</strong> シリコンPN接合ダイオードに順方向電圧を印加する。導通開始電圧はおよそ何Vか。また逆方向に電圧を印加したとき、電流は流れるか。</p>
    <details>
      <summary>解答</summary>
      <p>導通開始電圧 <Eq tex="\\approx 0.6 \\sim 0.7\\text{ V}" />。逆方向には微小な逆飽和電流が流れる（完全には遮断されない）。</p>
      <p><strong>ポイント：</strong>シリコンの順方向電圧降下は約0.6〜0.7V。ゲルマニウムは約0.2〜0.3V。逆バイアスでも電流が完全ゼロにはならない点に注意。</p>
    </details>

    <h2 id="traps"><span className="h-num">5.</span>引っかけポイント</h2>

    <TrapBlock
      correct="N型半導体は全体として電気的中性。N型の『N』は多数キャリアが電子（Negative charge carrier）の意味であり、物質全体の帯電状態を示すものではない。"
      trap="N型＝負電荷の物質なのでN型全体が負に帯電していると思い込む。"
      cite="H25問11・R03問11 出題"
      steps={[
        "N型半導体ではドナー原子（5価）が正の核を持ち、放出した自由電子（−）と釣り合っている",
        "全体の電荷 ＝ 正核 + 自由電子 ＝ 中性（電荷の総和はゼロ）",
        "『N型』は『多数キャリアが電子』という意味。『負に帯電している』という意味ではない",
      ]}
    />

    <TrapBlock
      correct="逆バイアス時も微小な逆飽和電流 I_s が流れる。完全ゼロにはならない。"
      trap="逆バイアスなら電流は完全にゼロになると思い込む。"
      cite="H29問11・H25問11 出題"
      steps={[
        "逆方向では空乏層が拡大し電流がほぼ遮断される状態になる",
        "少数キャリアによる逆飽和電流 I_s はゼロではなく、温度依存性が高い（温度上昇で急増）",
        "ツェナー降伏電圧に達すると急激に大電流が流れる（ツェナーダイオードはこれを意図的に利用する）",
      ]}
    />

    <TrapBlock
      correct="アノード（P側）が高電位のとき順バイアス。電流方向はアノード → カソード。"
      trap="回路図上の記号の向きと実物の接続方向を混同し、バイアス方向を誤る。"
      cite="R04下問11・H19問11 出題"
      steps={[
        "回路図でダイオード記号を確認（三角の底辺側＝アノード＝P型、頂点側の棒＝カソード＝N型）",
        "アノードとカソードそれぞれの電位を回路から読み取る",
        "アノード電位 {'>'} カソード電位 → 順バイアス（電流が流れる）、逆なら逆バイアス（ほぼ遮断）",
      ]}
    />

    <TrapBlock
      correct="太陽電池は光照射でP側がプラス（順方向と同じ極性）の起電力が発生する。"
      trap="光電効果と混同してN側がプラスになると思い込む、または光を当てると逆方向に起電力が発生すると誤解する。"
      cite="R01問11・H20問11 出題"
      steps={[
        "光照射でPN接合内に電子・正孔対が生成される",
        "内蔵電界によって電子はN側へ、正孔はP側へ引き寄せられる",
        "P側に正電荷が偏る → P側がプラス（高電位）＝ 順方向と同じ極性",
      ]}
    />

    <TrapBlock
      correct="バラクタダイオードは逆バイアスで使う可変容量素子。逆バイアスを強くするほど空乏層が広がり静電容量は小さくなる。"
      trap="順バイアスで大きな静電容量が得られると思い込む、または逆バイアスと容量の増減関係を逆に覚える。"
      cite="R02問11 出題"
      steps={[
        "バラクタダイオードは逆バイアスで使うことを確認（順バイアスでは電流が流れ容量素子として機能しない）",
        "逆バイアス電圧↑ → 空乏層が広がる → 静電容量 C が小さくなる（C ∝ 1/√V_R）",
        "容量の大小と電圧の大小が逆の関係になることを押さえる",
      ]}
    />

    <TrapBlock
      correct="順バイアスで空乏層は縮小、逆バイアスで空乏層は拡大する。"
      trap="順バイアスで空乏層が広がると思い込む（電流が流れる＝空乏層が広がるという誤った類推）。"
      cite="H25問15・R01問15 出題"
      steps={[
        "順バイアス：外部電圧が内蔵電位（ビルトインポテンシャル）を打ち消す方向に働く → 空乏層縮小 → 電流が流れやすくなる",
        "逆バイアス：外部電圧が内蔵電位を強める方向に働く → 空乏層拡大 → 電流が流れにくくなる",
        "逆バイアスで拡大した空乏層がコンデンサとして機能する → バラクタダイオードの動作原理",
      ]}
    />

    <h2 id="correct-vs-wrong"><span className="h-num">6.</span>正答者 vs 誤答者</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>観点</th>
          <th>誤答者</th>
          <th>正答者</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>N型の電荷</td>
          <td>「N＝負電荷」なのでN型全体が負に帯電していると思う</td>
          <td>N型はドナー（陽イオン）と電子が釣り合い、全体は電気的中性</td>
        </tr>
        <tr>
          <td>ダイオードの向き</td>
          <td>カソード（N側）→アノード（P側）に電流が流れると思う</td>
          <td>アノード（P側）→カソード（N側）が順方向（電流が流れる向き）</td>
        </tr>
        <tr>
          <td>温度特性</td>
          <td>「半導体も金属も温度↑なら抵抗↑」と思い込む</td>
          <td>半導体は温度↑→キャリア増加→抵抗↓（金属とは逆）</td>
        </tr>
        <tr>
          <td>逆バイアスで電流</td>
          <td>「逆方向なら電流完全ゼロ」と思い込む</td>
          <td>微小な逆飽和電流が流れる（温度依存あり）</td>
        </tr>
        <tr>
          <td>PN接合の空乏層</td>
          <td>順バイアスで空乏層が拡大すると思う</td>
          <td>順バイアスで空乏層は縮小、逆バイアスで拡大</td>
        </tr>
      </tbody>
    </table>

    <h2 id="exam-history"><span className="h-num">7.</span>出題実績</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>年度</th>
          <th>問</th>
          <th>形式</th>
          <th>何が問われたか</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>R07上</td><td>問11</td><td>穴埋</td><td>ホール素子の動作原理</td></tr>
        <tr><td>R06下</td><td>問11</td><td>論説</td><td>電界効果トランジスタの種類や特徴</td></tr>
        <tr><td>R06上</td><td>問11</td><td>論説</td><td>バイポーラトランジスタと電界効果トランジスタ</td></tr>
        <tr><td>R05下</td><td>問11</td><td>穴埋</td><td>FETの動作原理</td></tr>
        <tr><td>R05上</td><td>問11</td><td>穴埋</td><td>ホール素子の動作原理</td></tr>
        <tr><td>R05上</td><td>問12</td><td>穴埋</td><td>異なる2種類の金属を接合した際の特性</td></tr>
        <tr><td>R04下</td><td>問11</td><td>穴埋</td><td>各ダイオードに加える電圧の方向</td></tr>
        <tr><td>R04上</td><td>問11</td><td>穴埋</td><td>電界効果トランジスタの特徴</td></tr>
        <tr><td>R03</td><td>問11</td><td>論説</td><td>真性半導体及び不純物半導体の特徴</td></tr>
        <tr><td>R02</td><td>問11</td><td>穴埋</td><td>可変容量ダイオード（バラクタダイオード）</td></tr>
        <tr><td>R01</td><td>問11</td><td>穴埋</td><td>太陽電池</td></tr>
        <tr><td>H30</td><td>問11</td><td>論説</td><td>半導体素子</td></tr>
        <tr><td>H29</td><td>問11</td><td>論説</td><td>半導体のpn接合</td></tr>
        <tr><td>H28</td><td>問11</td><td>論説</td><td>半導体</td></tr>
        <tr><td>H27</td><td>問11</td><td>穴埋</td><td>半導体レーザ</td></tr>
        <tr><td>H26</td><td>問12</td><td>論説</td><td>半導体のpn接合を利用した素子</td></tr>
        <tr><td>H25</td><td>問11</td><td>穴埋</td><td>不純物半導体</td></tr>
        <tr><td>H24</td><td>問11</td><td>論説</td><td>半導体集積回路（IC）</td></tr>
        <tr><td>H23</td><td>問11</td><td>穴埋</td><td>電界効果トランジスタ（MOSFET）</td></tr>
        <tr><td>H22</td><td>問11</td><td>穴埋</td><td>ホール効果の原理</td></tr>
        <tr><td>H21</td><td>問11</td><td>論説</td><td>真性半導体と不純物半導体の特徴</td></tr>
        <tr><td>H20</td><td>問11</td><td>穴埋</td><td>pn接合した半導体の太陽電池の原理</td></tr>
        <tr><td>H19</td><td>問11</td><td>穴埋</td><td>各ダイオードに加える電圧の方向</td></tr>
        <tr><td>H18</td><td>問11</td><td>穴埋</td><td>不純物半導体の特徴と不純物の知識</td></tr>
      </tbody>
    </table>

    <h2 id="hall"><span className="h-num">8.</span>🌡️ ホール効果・熱起電力（★★★★★）</h2>
    <h3>ゼーベック効果とペルチェ効果</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>効果</th>
          <th>現象</th>
          <th>利用例</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ゼーベック効果</td>
          <td>2種類の金属を両端で接合し、接合部に温度差を与えると起電力が発生する</td>
          <td>熱電対・熱電温度センサ</td>
        </tr>
        <tr>
          <td>ペルチェ効果</td>
          <td>閉回路に外部から電流を流すと、一方の接合部で吸熱、他方で発熱する（ゼーベック効果の逆）</td>
          <td>電子冷却器（熱電冷却モジュール）</td>
        </tr>
      </tbody>
    </table>

    <h3>ホール電圧の式</h3>
    <p>p型半導体に電流 <Eq tex="I" /> を流し、電流に対して垂直方向に磁束密度 <Eq tex="B" /> の磁界を加えると、電流と磁界の両方に直交する方向にホール電圧 <Eq tex="V_H" /> が発生する。</p>
    <p><Eq tex="V_H = R_H \\cdot \\dfrac{BI}{d}" display /></p>
    <table className="data-table">
      <thead>
        <tr>
          <th>記号</th>
          <th>意味</th>
          <th>単位</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><Eq tex="V_H" /></td><td>ホール電圧</td><td>V</td></tr>
        <tr><td><Eq tex="R_H" /></td><td>ホール係数（材料固有）</td><td>m³/C</td></tr>
        <tr><td><Eq tex="B" /></td><td>磁束密度</td><td>T</td></tr>
        <tr><td><Eq tex="I" /></td><td>電流</td><td>A</td></tr>
        <tr><td><Eq tex="d" /></td><td>磁界方向の半導体の厚さ</td><td>m</td></tr>
      </tbody>
    </table>

    <h3>p型とn型でのホール電圧の向き</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>型</th>
          <th>キャリア</th>
          <th>偏り</th>
          <th>ホール電圧の向き</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>p型</td>
          <td>正孔（ホール）</td>
          <td>正孔が偏った側が高電位（＋）</td>
          <td>電流・磁界に直交する特定方向</td>
        </tr>
        <tr>
          <td>n型</td>
          <td>電子</td>
          <td>電子（負電荷）が偏った側が低電位（−）</td>
          <td>p型と逆向き</td>
        </tr>
      </tbody>
    </table>
    <Callout variant="note" title="ホール電圧の向きを図から判断する手順（R07上・R05上 出題）">
      p型半導体の場合（キャリア＝正孔）：(1) 電流の方向を確認する。(2) 正孔は電流と同じ方向に動く。(3) 磁界によるローレンツ力を考える（電流方向に人差し指、磁界方向に中指、力の方向に親指）。(4) 正孔が偏った側が高電位（＋）になる。n型半導体の場合：電子は電流と逆方向に動き、偏る方向はp型と同じ側でも、電子（負電荷）が偏るのでその側が低電位（−）になる。つまりホール電圧の向きがp型と逆になる。
    </Callout>
    <ul>
      <li>磁界センサ（ホール素子）</li>
      <li>電流センサ（非接触電流計測）</li>
      <li>位置・回転検出（ブラシレスモータの回転子位置検出）</li>
    </ul>

    <h2 id="photoelectric"><span className="h-num">9.</span>電子放出と光電効果</h2>
    <h3>電子放出の4種類</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>種類</th>
          <th>メカニズム</th>
          <th>主な材料・用途</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>熱電子放出</td>
          <td>高温加熱により自由電子が仕事関数を超えるエネルギーを得て飛び出す</td>
          <td>タングステン、タンタル（真空管・電子銃）</td>
        </tr>
        <tr>
          <td>光電子放出（光電効果）</td>
          <td>金属表面に光（電磁波）が当たり電子が飛び出す。限界振動数 <Eq tex="\\nu_0" /> 以上で発生</td>
          <td>光電管、光センサ</td>
        </tr>
        <tr>
          <td>二次電子放出</td>
          <td>高速電子が衝突し、内部電子がエネルギーをもらい飛び出す</td>
          <td>光電子増倍管</td>
        </tr>
        <tr>
          <td>電界放出（冷陰極放出）</td>
          <td>強電界印加でトンネル効果により電子が飛び出す</td>
          <td>電界放出型ディスプレイ（FED）</td>
        </tr>
      </tbody>
    </table>

    <h3>光電効果の公式</h3>
    <FormulaTable layer="B" rows={[
      { formula: "K_0 = h\\nu - W", meaning: "飛び出す電子の最大運動エネルギー（h：プランク定数、ν：光の振動数、W：仕事関数）", when: "振動数 ν ≥ 限界振動数 ν₀", notWhen: "ν < ν₀ のときは光をいくら強くしても光電子は出ない" },
      { formula: "\\nu_0 = \\dfrac{W}{h}", meaning: "限界振動数（カットオフ周波数）：K₀=0となるギリギリの振動数", when: "仕事関数Wが既知のとき", notWhen: "—" },
      { formula: "\\lambda_0 = \\dfrac{c}{\\nu_0}", meaning: "限界波長：光の速さ c = νλ より変換", when: "限界振動数ν₀が既知のとき", notWhen: "—" },
    ]} />
    <Callout variant="warn" title="光を「強く」しても限界振動数以下では光電子は出ない">
      光の強さ＝光子（フォトン）の数。1個の光子のエネルギーは <Eq tex="h\\nu" /> で振動数のみで決まり、光の強さには関係しない。振動数 <Eq tex="\\nu {'<'} \\nu_0" /> なら光をいくら強くしても光電子は飛び出さない。振動数一定で光を強くすると光電子の数は増えるが、最大運動エネルギー <Eq tex="K_0" /> は変わらない。振動数を上げると <Eq tex="K_0" /> が増加する。
    </Callout>

    <PageNav prev={{id:"three-phase", title:"三相交流"}} next={{id:"transistor", title:"トランジスタ"}} onNav={onNav} />
    <p style={{fontSize:"0.8em", color:"var(--ink-mute)", marginTop:"2rem"}}>
      最終改定: 2026-04-27 | v0.9
    </p>
  </>
);

/* ============================================================================
   リファレンスページ（5ページ）
   ============================================================================ */

const TrendsPage = ({ onNav }) => {
  const freqData = window.WIKI_DATA?.freqData || [
    { topic: "電磁気", pct: 25, count: 6 },
    { topic: "電気回路", pct: 40, count: 9 },
    { topic: "電子理論", pct: 18, count: 4 },
    { topic: "計測", pct: 12, count: 3 },
  ];

  return (
    <>
      <div className="page-header">
        <div className="eyebrow">リファレンス — REFERENCE</div>
        <h1>A 出題傾向データ</h1>
        <p className="deck">直近10年の理論科目出題分布。過去問演習の優先順位を決める基礎資料。</p>
      </div>
      <div className="crumbs">
        <a href="#" onClick={() => onNav('retake-strategy')}>再受験分析</a> →
        <span>出題傾向データ</span> →
        <a href="#" onClick={() => onNav('glossary')}>用語集</a>
      </div>
      <h2 id="ratio">§1 単元別出題比率</h2>
      <div className="freq-chart">
        {freqData.map(d => (
          <div key={d.topic} className="freq-row">
            <span className="freq-label">{d.topic}</span>
            <div className="freq-bar" style={{width: d.pct + "%"}}></div>
            <span className="freq-pct">{d.pct}%</span>
          </div>
        ))}
      </div>
      <h2 id="b-questions">§2 B問題（計算複合）の出題傾向</h2>
      <p>理論科目のB問題（問15〜18）は4問で構成。電気回路2問・電磁気1問・電子理論or計測1問のパターンが定番。</p>
      <div className="callout callout-tip">
        <strong>B問題の攻略法</strong><br/>
        B問題は難しく見えるが、A問題と同じ公式を複数組み合わせるだけ。1問完答より部分点を確実に取る戦略が有効。
      </div>
      <h2 id="trend-table">§3 分野別・年度別傾向</h2>
      <table>
        <thead><tr><th>年度</th><th>電磁気</th><th>電気回路</th><th>電子理論</th><th>計測</th></tr></thead>
        <tbody>
          <tr><td>R5</td><td>3問</td><td>9問</td><td>4問</td><td>2問</td></tr>
          <tr><td>R4</td><td>4問</td><td>8問</td><td>4問</td><td>2問</td></tr>
          <tr><td>R3</td><td>3問</td><td>9問</td><td>5問</td><td>1問</td></tr>
          <tr><td>R2</td><td>4問</td><td>8問</td><td>4問</td><td>2問</td></tr>
          <tr><td>R1</td><td>3問</td><td>9問</td><td>4問</td><td>2問</td></tr>
        </tbody>
      </table>
      <div className="callout callout-warn">
        <strong>注意</strong><br/>
        電気回路は毎年40〜45%（8〜9問）で最高頻度。次いで電子理論（4〜5問）。電磁気は3〜4問が基本。
      </div>
      <div className="page-nav">
        <a className="nav-prev" href="#" onClick={() => onNav('retake-strategy')}>← 再受験分析</a>
        <a className="nav-next" href="#" onClick={() => onNav('glossary')}>用語集 →</a>
      </div>
    </>
  );
};

const GlossaryPage = ({ onNav }) => {
  const [activeGroup, setActiveGroup] = useState("全部");
  const groups = ["全部", "あ", "か", "さ", "た", "な", "は", "ま", "や", "ら"];

  const glossaryData = [
    { term: "アノード", reading: "あのーど", letter: "あ", def: "PN接合ダイオードのP側。順バイアスで正電位になる側。" },
    { term: "カソード", reading: "かそーど", letter: "か", def: "PN接合ダイオードのN側。順バイアスで負電位になる側。" },
    { term: "共振周波数", reading: "きょうしんしゅうはすう", letter: "き", def: "LC回路で誘導性リアクタンスと容量性リアクタンスが等しくなる周波数。f₀ = 1/(2π√LC)。" },
    { term: "ゴリンホ短絡法", reading: "ごりんほたんさくほう", letter: "ご", def: "テブナンの等価抵抗を求める手法。電源をゼロにして端子間を見た合成抵抗。" },
    { term: "シリコン", reading: "しりこん", letter: "し", def: "電験で最重要の半導体材料。PN接合ダイオード・トランジスタに使用。順方向電圧降下≈0.6〜0.7V。" },
    { term: "スイッチング", reading: "すいっちんぐ", letter: "す", def: "回路のON/OFF切り替え。過渡現象の発生原因。" },
    { term: "ダイオード", reading: "だいおーど", letter: "だ", def: "PN接合を利用した素子。順方向では電流を通す。逆方向では通さない（一方通弁）。" },
    { term: "テブナンの定理", reading: "てぶなんのていり", letter: "て", def: "複雑な回路を『開放電圧Vth』と『等価抵抗Rth』の等価電源に置き換える定理。" },
    { term: "ドーピング", reading: "どーぴんぐ", letter: "ど", def: "純粋なシリコンに微量の不純物（リン・ボロン）を加えること。N型・P型を作る。" },
    { term: "ノード", reading: "のーど", letter: "の", def: "回路上の接続点（節点）。複数の素子が交差する場所。キルヒホッフ電流則の適用点。" },
    { term: "バンドギャップ", reading: "ばんどぎゃっぷ", letter: "は", def: "価電子帯と伝導帯のエネルギー差。Si: 1.12eV。この値で導体・半導体・絶縁体が決まる。" },
    { term: "ホール効果", reading: "ほーるこうか", letter: "ほ", def: "半導体に電流と磁界を与えると、両方に直交する方向に起電力が発生する現象。センサに応用。" },
    { term: "マクスウェルブリッジ", reading: "ますくうぇるぶりっじ", letter: "ま", def: "交流ブリッジ。インダクタンスを抵抗とコンデンサで測定する。平衡条件: L = R₁R₃C。" },
    { term: "余弦則", reading: "よげんそく", letter: "よ", def: "交流電力で有効電力 P = VI cosφ を求める。cosφ は力率。" },
    { term: "ローレンツ力", reading: "ろーれんつりょく", letter: "ろ", def: "磁界中を動く電荷に働く力。フレミング左手則で方向判定。ホール効果・電動機原理。" },
  ];

  const filtered = activeGroup === "全部" ? glossaryData : glossaryData.filter(g => g.letter === activeGroup);

  return (
    <>
      <div className="page-header">
        <div className="eyebrow">リファレンス — REFERENCE</div>
        <h1>B 用語集・索引</h1>
        <p className="deck">理論科目の重要用語89項目（五十音順）。出題の引っかけワードも掲載。</p>
      </div>
      <div className="crumbs">
        <a href="#" onClick={() => onNav('trends')}>出題傾向</a> →
        <span>用語集</span> →
        <a href="#" onClick={() => onNav('guide')}>学習ガイド</a>
      </div>
      <div className="glossary-filter">
        {groups.map(g => (
          <button
            key={g}
            className={"glossary-btn" + (activeGroup === g ? " active" : "")}
            onClick={() => setActiveGroup(g)}
          >
            {g}
          </button>
        ))}
      </div>
      <dl className="glossary-list">
        {filtered.map(g => (
          <div key={g.term} className="glossary-item">
            <dt>{g.term} <span className="glossary-reading">{g.reading}</span></dt>
            <dd>{g.def}</dd>
          </div>
        ))}
      </dl>
      <div className="page-nav">
        <a className="nav-prev" href="#" onClick={() => onNav('trends')}>← 出題傾向データ</a>
        <a className="nav-next" href="#" onClick={() => onNav('guide')}>学習ガイド →</a>
      </div>
    </>
  );
};

const FormulaListPage = ({ onNav }) => (
  <>
    <div className="page-header">
      <div className="eyebrow">リファレンス — REFERENCE</div>
      <h1>D 公式集</h1>
      <p className="deck">全分野の主要公式一覧。試験直前の確認用早見表。</p>
    </div>
    <div className="crumbs">
      <a href="#" onClick={() => onNav('guide')}>学習ガイド</a> →
      <span>公式集</span> →
      <a href="#" onClick={() => onNav('circuit-patterns')}>回路パターン集</a>
    </div>
    <h2 id="em">§1 電磁気</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>単位</th></tr></thead>
      <tbody>
        <tr><td>{String.raw`$F = k\dfrac{Q_1 Q_2}{r^2}$`}</td><td>クーロンの法則</td><td>N</td></tr>
        <tr><td>{String.raw`$C = \dfrac{\varepsilon S}{d}$`}</td><td>平行板コンデンサの静電容量</td><td>F</td></tr>
        <tr><td>{String.raw`$e = -N\dfrac{d\Phi}{dt}$`}</td><td>ファラデーの法則</td><td>V</td></tr>
        <tr><td>{String.raw`$L = \dfrac{\mu_0\mu_r N^2 A}{l}$`}</td><td>自己インダクタンス</td><td>H</td></tr>
      </tbody>
    </table>
    <h2 id="circuit">§2 電気回路</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>単位</th></tr></thead>
      <tbody>
        <tr><td>$V = IR$</td><td>オームの法則</td><td>V</td></tr>
        <tr><td>{String.raw`$Z = \sqrt{R^2 + (X_L - X_C)^2}$`}</td><td>直列RLCのインピーダンス</td><td>Ω</td></tr>
        <tr><td>{String.raw`$f_0 = \dfrac{1}{2\pi\sqrt{LC}}$`}</td><td>共振周波数</td><td>Hz</td></tr>
        <tr><td>{String.raw`$P = VI\cos\varphi$`}</td><td>交流有効電力</td><td>W</td></tr>
        <tr><td>{String.raw`$P_{max} = \dfrac{V_{th}^2}{4R_{th}}$`}</td><td>最大電力（Rth = RL のとき）</td><td>W</td></tr>
      </tbody>
    </table>
    <h2 id="electron">§3 電子理論</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>単位</th></tr></thead>
      <tbody>
        <tr><td>{String.raw`$\beta = \dfrac{I_C}{I_B}$`}</td><td>トランジスタ直流電流増幅率</td><td>—</td></tr>
        <tr><td>{String.raw`$A_v = -\dfrac{R_f}{R_i}$`}</td><td>オペアンプ反転増幅率</td><td>—</td></tr>
        <tr><td>{String.raw`$V_o = -\dfrac{1}{RC}\int V_i dt$`}</td><td>オペアンプ積分回路</td><td>V</td></tr>
      </tbody>
    </table>
    <h2 id="measurement">§4 計測</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>単位</th></tr></thead>
      <tbody>
        <tr><td>{String.raw`$R_x = \dfrac{R_1 \cdot R_3}{R_2}$`}</td><td>ホイートストンブリッジの平衡条件</td><td>Ω</td></tr>
        <tr><td>{String.raw`$V_{avg} = \dfrac{2V_m}{\pi}$`}</td><td>全波整流の出力平均電圧</td><td>V</td></tr>
      </tbody>
    </table>
    <div className="callout callout-warn">
      <strong>試験での注意</strong><br/>
      数値計算は数式を整理してから代入することで計算ミスを防ぐ。特に複合問題（B問題）では複数公式の組み合わせになる。
    </div>
    <div className="page-nav">
      <a className="nav-prev" href="#" onClick={() => onNav('guide')}>← 学習ガイド</a>
      <a className="nav-next" href="#" onClick={() => onNav('circuit-patterns')}>回路パターン集 →</a>
    </div>
  </>
);

const CircuitPatternsPage = ({ onNav }) => (
  <>
    <div className="page-header">
      <div className="eyebrow">リファレンス — REFERENCE</div>
      <h1>E 回路パターン集</h1>
      <p className="deck">頻出回路の解法パターン。「この形を見たらこう解く」の辞書として使う。</p>
    </div>
    <div className="crumbs">
      <a href="#" onClick={() => onNav('formulas')}>公式集</a> →
      <span>回路パターン集</span>
    </div>
    <h2 id="pattern1">§1 直列・並列の合成</h2>
    <p><strong>これを見たら</strong>: 抵抗・コイル・コンデンサが一列につながっている → 直列 / 両端が共通の節点に接続されている → 並列</p>
    <p><strong>計算手順</strong>:</p>
    <ol>
      <li>最も内側（深い）の部分から合成を始める</li>
      <li><strong>直列</strong>: {String.raw`$Z_{合} = Z_1 + Z_2 + \cdots$`}（単純に足す）</li>
      <li><strong>並列</strong>: {String.raw`$1/Z_{合} = 1/Z_1 + 1/Z_2 + \cdots$`}（逆数の和）</li>
      <li>外側に向かって順に合成し、全体の合成インピーダンスを得る</li>
    </ol>
    <h2 id="pattern2">§2 テブナン等価変換</h2>
    <p><strong>これを見たら</strong>: 「特定の2端子間（A-B間）の電圧・電流を求めよ」という問題</p>
    <p><strong>計算手順</strong>:</p>
    <ol>
      <li><strong>開放端子電圧</strong> $V_{th}$ を求める</li>
      <li><strong>テブナン抵抗</strong> $R_{th}$ を求める（電源をゼロにして合成抵抗を計算）</li>
      <li><strong>等価回路に置き換える</strong>: $V_{th}$ を起電力とし $R_{th}$ を直列に接続</li>
    </ol>
    <h2 id="pattern3">§3 ブリッジ回路の平衡判定</h2>
    <p><strong>これを見たら</strong>: 4つの素子がひし形（ブリッジ形）に配置されている</p>
    <p><strong>計算手順</strong>:</p>
    <ol>
      <li><strong>平衡の確認</strong>: {String.raw`$Z_1 \cdot Z_4 = Z_2 \cdot Z_3$`} かどうかを確認する</li>
      <li><strong>平衡の場合</strong>: 検流計に電流は流れない。単純な直並列回路として計算する</li>
      <li><strong>非平衡の場合</strong>: テブナン等価変換（パターン2）を適用する</li>
    </ol>
    <h2 id="pattern4">§4 RLC直列回路のインピーダンス計算</h2>
    <p><strong>これを見たら</strong>: R, L, C が一列に接続された直列回路</p>
    <p><strong>計算手順</strong>:</p>
    <ol>
      <li><strong>各素子のインピーダンスを書く</strong>: $Z_R = R$, $Z_L = jX_L$, $Z_C = -jX_C$</li>
      <li><strong>合成インピーダンス</strong>: $Z = R + j(X_L - X_C)$</li>
      <li><strong>大きさと位相を求める</strong>: {String.raw`$|Z| = \sqrt{R^2 + (X_L - X_C)^2}$`}, {String.raw`$\tan\varphi = (X_L - X_C)/R$`}</li>
      <li><strong>電流を計算</strong>: $I = V/|Z|$</li>
      <li><strong>共振条件</strong>: $X_L = X_C$ → {String.raw`$\omega_0 = 1/\sqrt{LC}$`}</li>
    </ol>
    <div className="callout callout-tip">
      <strong>パターン集の使い方</strong><br/>
      まず回路の「形」を素早く判断してパターン番号を特定する。次に手順に沿って数値を当てはめる。
    </div>
    <div className="page-nav">
      <a className="nav-prev" href="#" onClick={() => onNav('formulas')}>← 公式集</a>
      <span>（最後ページ）</span>
    </div>
  </>
);

/* ============================================================================
   エクスポート
   ============================================================================ */

Object.assign(window, {
  BridgeCircuitPage,
  TransientPage,
  SemiconductorPage,
  TrendsPage,
  GlossaryPage,
  FormulaListPage,
  CircuitPatternsPage,
});
