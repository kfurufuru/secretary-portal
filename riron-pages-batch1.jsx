/* riron-pages-batch1.jsx — 理論基幹4ページ: capacitor / ac-power / three-phase / transistor */

// CapacitorPage (1.1 コンデンサ)
const CapacitorPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★" importance="S" frequency="高" />
    <LearningMap
      prereqs={[{id:"seidenki", title:"静電気"}]}
      current="コンデンサ"
      nexts={[{id:"denjiryoku", title:"電磁力"}]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="1.2 — CAPACITOR"
      title="コンデンサ"
      deck="電荷を蓄える受動素子。直流は通さず交流は通す。静電容量・エネルギー・直並列合成が頻出。"
      meta={[
        { label: "重要度", value: "S" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★" },
      ]}
    />
    <Crumbs items={[{id:"home",label:"ホーム"},{label:"1. 静電気・電子"}]} onNav={onNav} />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="water-tank" icon="💧">
      コンデンサは電荷を溜める水槽。容量 C [F] が水槽のサイズ、電圧 V [V] が水位、電荷 Q [C] が溜まった水の量。
      エネルギーは電界に蓄えられる（電池は化学エネルギー、コンデンサは電界エネルギー）。直流は定常状態で電流ゼロ。
    </Analogy>
    <p>コンデンサは電荷を蓄える受動素子。直流状態では電流が流れず、交流では周波数が高いほど容易に電流を通す。静電容量・蓄積エネルギー・直並列合成が頻出論点。</p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable layer="A" rows={[
      { formula: "C = \\frac{Q}{V}", meaning: "静電容量の定義。1Vかけたとき溜まるクーロン数", when: "常に成立", notWhen: "—" },
      { formula: "C = \\varepsilon_0 \\varepsilon_r \\frac{S}{d}", meaning: "平行平板コンデンサの容量", when: "平行平板均一電界", notWhen: "不均一電界・球形など" },
      { formula: "W = \\frac{1}{2}CV^2", meaning: "蓄積エネルギー（V基準）", when: "常に成立", notWhen: "—" },
      { formula: "W = \\frac{Q^2}{2C}", meaning: "蓄積エネルギー（Q基準）", when: "常に成立", notWhen: "—" },
    ]} />

    <h3>直列・並列合成</h3>
    <FormulaTable layer="B" rows={[
      { formula: "\\frac{1}{C} = \\frac{1}{C_1} + \\frac{1}{C_2}", meaning: "直列合成（抵抗の並列計算と同じ式形）", when: "直列接続", notWhen: "—" },
      { formula: "C = C_1 + C_2", meaning: "並列合成（抵抗の直列計算と同じ式形）", when: "並列接続", notWhen: "—" },
    ]} />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ表</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>直列接続</th>
          <th>並列接続</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>合成容量</td>
          <td>小さくなる（逆数の和の逆数）</td>
          <td>大きくなる（足し算）</td>
        </tr>
        <tr>
          <td>各素子の電荷 Q</td>
          <td><strong>等しい</strong>（電荷保存）</td>
          <td>異なる（<Eq tex="Q_i = C_i V" />）</td>
        </tr>
        <tr>
          <td>各素子の電圧 V</td>
          <td>異なる（<Eq tex="V_i = Q/C_i" />）</td>
          <td><strong>等しい</strong>（並列は同電圧）</td>
        </tr>
      </tbody>
    </table>

    <h3>誘電体挿入時の変化</h3>
    <Callout variant="warn" title="定電圧 vs 定電荷の引っかけ">
      <p><strong>定電圧（電源接続中）</strong>：<Eq tex="C' = \\varepsilon_r C_0" />、<Eq tex="Q' = \\varepsilon_r Q_0" />、<Eq tex="W' = \\varepsilon_r W_0" />（エネルギー増加）</p>
      <p><strong>定電荷（電源切り離し後）</strong>：<Eq tex="C' = \\varepsilon_r C_0" />、<Eq tex="V' = V_0 / \\varepsilon_r" />、<Eq tex="W' = W_0 / \\varepsilon_r" />（エネルギー減少）</p>
    </Callout>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> 4μFと12μFのコンデンサを直列接続したときの合成静電容量を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p>直列合成：<Eq tex="\\frac{1}{C} = \\frac{1}{4} + \\frac{1}{12} = \\frac{3+1}{12} = \\frac{4}{12}" /></p>
      <p>したがって <Eq tex="C = 3 \\mu\\text{F}" /></p>
      <p><strong>ポイント：</strong>コンデンサの直列は抵抗の並列と同じ計算。合成容量は単独の容量より小さくなる。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="勘違い①：直列・並列計算が抵抗と同じだと思いがち">
      直列のとき合成容量は「逆数の和」（小さくなる）、並列のとき「足し算」（大きくなる）。抵抗と逆転する。
    </Callout>
    <Callout variant="warn" title="勘違い②：直列接続で各コンデンサの電荷が違うと思いがち">
      直列接続の各コンデンサの Q は等しい（電荷保存則）。電圧分担は <Eq tex="V_i = Q/C_i" /> で計算する。
    </Callout>
    <Callout variant="warn" title="勘違い③：エネルギー公式を混用してミスしがち">
      <Eq tex="W = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{QV}{2}" /> はすべて同じ値。与えられているのが V か Q かで使い分けるだけ。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>静電気 — クーロン力・電界・電位の基礎</li>
      <li>直流回路 — コンデンサの充放電（過渡現象）</li>
      <li>交流回路 — リアクタンス・力率改善用コンデンサ</li>
    </ul>

    <PageNav prev={{id:"coulomb-field", title:"1.1 静電気・クーロンの法則"}} next={{id:"electromagnetic-force", title:"1.3 電磁力"}} onNav={onNav} />
  </>
);

// AcPowerPage (2.3 交流電力)
const AcPowerPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★" importance="A" frequency="高" />
    <LearningMap
      prereqs={[{id:"ac-basics", title:"交流回路基礎"}]}
      current="交流電力"
      nexts={[{id:"rlc-resonance", title:"RLC共振"}]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="2.3 — AC POWER"
      title="交流電力"
      deck="交流電力の3成分（有効・無効・皮相）と力率の理解。設備容量の設計・力率改善の根拠となる実務直結知識。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "高" },
        { label: "難易度", value: "★★★★" },
      ]}
    />
    <Crumbs items={[{id:"home",label:"ホーム"},{label:"2. 交流回路"}]} onNav={onNav} />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="work-energy" icon="⚙️">
      交流電力は「実際に仕事をする部分（有効電力）」と「エネルギーを往復させるだけの部分（無効電力）」に分かれる。
      力率 cosφ は皮相電力のうち有効電力が占める割合。工場の電気代は力率が低いと割増料金が発生する。
    </Analogy>
    <p>交流電力は3つの成分に分解される：有効電力（仕事に変わる）、無効電力（往復するだけ）、皮相電力（設備容量）。力率改善はコンデンサ並列接続で無効電力を打ち消す実務技術。</p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable layer="A" rows={[
      { formula: "P = VI\\cos\\varphi", meaning: "有効電力。実際に消費されるエネルギー", when: "正弦波単相交流", notWhen: "非正弦波（高調波含む）" },
      { formula: "Q = VI\\sin\\varphi", meaning: "無効電力。L・Cとの間でエネルギー往復", when: "正弦波単相交流", notWhen: "—" },
      { formula: "S = VI", meaning: "皮相電力。電気設備の容量設計基準", when: "常時使用可", notWhen: "—" },
    ]} />

    <h3>応用・変換</h3>
    <FormulaTable layer="B" rows={[
      { formula: "S^2 = P^2 + Q^2", meaning: "電力三角形。P・Q・Sは直角三角形を形成", when: "正弦波定常", notWhen: "—" },
      { formula: "P = I^2 R", meaning: "抵抗成分のみの有効電力", when: "純抵抗", notWhen: "L・C混在回路" },
    ]} />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ表</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>種類</th>
          <th>有効電力 P</th>
          <th>無効電力 Q</th>
          <th>皮相電力 S</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>単位</td>
          <td>W（ワット）</td>
          <td>var（バール）</td>
          <td>VA（ボルトアンペア）</td>
        </tr>
        <tr>
          <td>意味</td>
          <td>消費される仕事</td>
          <td>往復するエネルギー</td>
          <td>設備の容量</td>
        </tr>
        <tr>
          <td>公式</td>
          <td><Eq tex="VI\\cos\\varphi" /></td>
          <td><Eq tex="VI\\sin\\varphi" /></td>
          <td><Eq tex="VI" /></td>
        </tr>
      </tbody>
    </table>

    <h2 id="power-improvement"><span className="h-num">§4</span>力率改善（コンデンサ補償）</h2>
    <Callout variant="tip" title="力率改善の計算手順">
      <p>1. 現状の無効電力：<Eq tex="Q_1 = P\\tan\\varphi_1" /></p>
      <p>2. 目標の無効電力：<Eq tex="Q_2 = P\\tan\\varphi_2" /></p>
      <p>3. 必要な補償容量：<Eq tex="Q_C = Q_1 - Q_2" /></p>
      <p>4. コンデンサ容量：<Eq tex="C = \\frac{Q_C}{\\omega V^2}" /></p>
    </Callout>

    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      有効電力・無効電力・皮相電力の3成分は、受変電容量設計・力率管理・電気料金計算の根幹。プラントの基本料金は力率で上下する。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr><td>受変電設備の容量設計</td><td>皮相電力 S=P/cosφ</td><td>設備容量はkVAで決まる。kWだけ見ると過小設計</td></tr>
        <tr><td>高圧受電の電気料金（基本料金）</td><td>力率 cosφ</td><td>力率85%基準で割引／割増。進相コンデンサで改善</td></tr>
        <tr><td>進相コンデンサ容量の計算</td><td>Q=P(tanφ₁−tanφ₂)</td><td>改善前後の力率角から必要kvar容量を逆算して選定</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§5</span>例題</h2>
    <p><strong>問:</strong> 100V・5Aの交流回路で力率が0.8（遅れ）のとき、有効電力・無効電力・皮相電力を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p><Eq tex="P = 100 \\times 5 \\times 0.8 = 400\\text{ W}" /></p>
      <p><Eq tex="\\sin\\varphi = \\sqrt{1 - 0.64} = 0.6" /> より <Eq tex="Q = 100 \\times 5 \\times 0.6 = 300\\text{ var}" /></p>
      <p><Eq tex="S = 100 \\times 5 = 500\\text{ VA}" /></p>
      <p><strong>ポイント：</strong>sinφを求めるには <Eq tex="\\sin^2\\varphi + \\cos^2\\varphi = 1" /> を使う。</p>
    </details>

    <h2 id="traps"><span className="h-num">§6</span>引っかけポイント</h2>
    <Callout variant="warn" title="勘違い①：無効電力の単位を [W] と書く">
      無効電力の単位は <strong>[var]</strong>（バール）。有効電力 [W] と無効電力 [var] と皮相電力 [VA] は異なる単位。
    </Callout>
    <Callout variant="warn" title="勘違い②：力率計算で cosφ と sinφ を逆に使う">
      有効 <Eq tex="P = VI\\cos\\varphi" />、無効 <Eq tex="Q = VI\\sin\\varphi" />。コサインが有効、サインが無効。
    </Callout>
    <Callout variant="warn" title="勘違い③：P + Q = S と足し算してしまう">
      <Eq tex="S^2 = P^2 + Q^2" /> の関係（直角三角形）。足し算ではなく直角三角形の斜辺。
    </Callout>

    <h2 id="related"><span className="h-num">§7</span>関連項目</h2>
    <ul>
      <li>交流回路基礎 — インピーダンス・力率の定義</li>
      <li>RLC共振 — 共振周波数での力率最大</li>
      <li>三相交流 — 三相電力の計算（√3が登場）</li>
    </ul>

    <PageNav prev={{id:"ac-basics", title:"2.2 交流回路基礎"}} next={{id:"rlc-resonance", title:"2.4 RLC共振"}} onNav={onNav} />
  </>
);

// ThreePhasePage (4.1 三相交流)
const ThreePhasePage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★★" importance="S" frequency="高" />
    <LearningMap
      prereqs={[{id:"ac-basics", title:"交流回路基礎"}, {id:"ac-power", title:"交流電力"}]}
      current="三相交流"
      nexts={[{id:"transient", title:"過渡現象"}]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="4.1 — THREE-PHASE AC"
      title="三相交流"
      deck="120°ずつ位相をずらした3つの交流。3本の電線で単相の√3倍の電力を伝送できる効率的なシステム。"
      meta={[
        { label: "重要度", value: "S" },
        { label: "出題頻度", value: "高（B問題で10点）" },
        { label: "難易度", value: "★★★★★" },
      ]}
    />
    <Crumbs items={[{id:"home",label:"ホーム"},{label:"4. 電力系統"}]} onNav={onNav} />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="three-phase" icon="⚡⚡⚡">
      3つの水車が120°ずつ位相をずらして川に落ちるイメージ。1つが低いときは別の2つが補う→常に安定した合成力が得られる。
      Y結線は「星形」で中性点あり。Δ結線は「三角形」でループを形成。
    </Analogy>
    <p>線間電圧と相電圧の√3倍の関係がY/Δで逆になる点が試験の最頻出ポイント。Y結線は電圧に√3、Δ結線は電流に√3。</p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable layer="A" rows={[
      { formula: "V_L = \\sqrt{3} V_P", meaning: "Y結線：線間電圧は相電圧の√3倍", when: "対称三相・Y結線", notWhen: "Δ結線（VL=VP）" },
      { formula: "I_L = I_P", meaning: "Y結線：線電流と相電流は等しい", when: "Y結線", notWhen: "Δ結線" },
      { formula: "I_L = \\sqrt{3} I_P", meaning: "Δ結線：線電流は相電流の√3倍", when: "対称三相・Δ結線", notWhen: "Y結線" },
      { formula: "P = \\sqrt{3} V_L I_L \\cos\\varphi", meaning: "三相有効電力（線間電圧・線電流で表す）", when: "対称三相（Y・Δ共通）", notWhen: "不平衡負荷" },
    ]} />

    <h3>応用・変換</h3>
    <FormulaTable layer="B" rows={[
      { formula: "Z_Y = Z_\\Delta / 3", meaning: "Y-Δ等価変換（Y側のインピーダンス）", when: "平衡三相のみ", notWhen: "不平衡負荷" },
      { formula: "\\tan\\varphi = \\frac{\\sqrt{3}(W_1 - W_2)}{W_1 + W_2}", meaning: "2電力計法で力率角を算出", when: "対称三相3線式", notWhen: "4線式" },
    ]} />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ表</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>Y結線（星形）</th>
          <th>Δ結線（三角形）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>線間電圧 vs 相電圧</td>
          <td><Eq tex="V_L = \\sqrt{3} V_P" /></td>
          <td><Eq tex="V_L = V_P" /></td>
        </tr>
        <tr>
          <td>線電流 vs 相電流</td>
          <td><Eq tex="I_L = I_P" /></td>
          <td><Eq tex="I_L = \\sqrt{3} I_P" /></td>
        </tr>
        <tr>
          <td>中性点</td>
          <td>あり</td>
          <td>なし</td>
        </tr>
      </tbody>
    </table>

    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      三相交流は工場の受変電・電動機・変圧器すべての基盤。√3の扱いと星形/三角形の電圧・電流関係を誤ると機器選定ミスに直結する。
    </Callout>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr><td>三相受電盤の主回路設計</td><td>線間電圧＝√3×相電圧</td><td>6.6kV配電・400V/200V低圧の関係を即算</td></tr>
        <tr><td>三相電動機の消費電力測定</td><td>P=√3・V_l・I_l・cosφ</td><td>線間電圧・線電流から消費電力（kW）算出</td></tr>
        <tr><td>地絡保護方式の選定</td><td>Y結線中性点の接地</td><td>中性点接地方式で地絡電流の大きさと検出回路が決まる</td></tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> Y結線の三相電源で相電圧が200Vのとき、線間電圧を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p><Eq tex="V_L = \\sqrt{3} \\times 200 \\approx 346\\text{ V}" /></p>
      <p><strong>考え方：</strong>Y結線では線間電圧は「2つの相電圧ベクトルの差」。120°ずれた等しいベクトルの差は元の√3倍になる（余弦定理）。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="勘違い①：Y結線で IL = √3 IP としてしまう（ΔとYの混同）">
      Y結線は <Eq tex="I_L = I_P" />。√3が出るのはΔ結線の電流と Y結線の電圧のみ。
    </Callout>
    <Callout variant="warn" title="勘違い②：三相電力を単相×3で計算して√3を忘れる">
      線間電圧・線電流で表す場合は <Eq tex="P = \\sqrt{3} V_L I_L \\cos\\varphi" />。√3は必須。
    </Callout>
    <Callout variant="warn" title="勘違い③：不平衡負荷で「1相分×3」の計算をしてしまう">
      1相分×3が使えるのは平衡三相のみ。不平衡負荷は各相を個別計算してベクトル合成。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>交流電力 — 単相と三相での力率の違い</li>
      <li>交流回路基礎 — インピーダンス・ベクトル図</li>
      <li>同期機 — 三相発電の原理</li>
    </ul>

    <PageNav prev={{id:"transient", title:"3.2 過渡現象"}} next={{id:"semiconductor", title:"5.1 半導体・ダイオード"}} onNav={onNav} />
  </>
);

// TransistorPage (5.2 トランジスタ・FET)
const TransistorPage = ({ onNav }) => (
  <>
    <MetaStrip difficulty="★★★★" importance="A" frequency="高" />
    <LearningMap
      prereqs={[{id:"semiconductor", title:"半導体"}]}
      current="トランジスタ"
      nexts={[{id:"op-amp", title:"オペアンプ"}]}
      onNav={onNav}
    />
    <PageHeader
      eyebrow="5.2 — TRANSISTOR / FET"
      title="トランジスタ・FET"
      deck="小さい信号で大きな電流を制御するスイッチ兼増幅器。直流動作点・バイアス回路計算が毎年出題。"
      meta={[
        { label: "重要度", value: "A" },
        { label: "出題頻度", value: "高（毎年1〜2問、問13・問18）" },
        { label: "難易度", value: "★★★★" },
      ]}
    />
    <Crumbs items={[{id:"home",label:"ホーム"},{label:"5. 電子理論"}]} onNav={onNav} />

    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>
    <Analogy type="faucet" icon="🚰">
      バイポーラトランジスタは「電流で電流を制御」する。ベース電流 IB が小さくても、hFE 倍に増幅されたコレクタ電流 IC が流れる。蛇口のバルブのように、少ない力で大流量を制御する。
      FETは「電圧で電流を制御」する。ゲートに電圧を加えるだけで電流路を制御でき、入力電流がほぼゼロ。
    </Analogy>
    <p>トランジスタは増幅デバイス。直流動作点（Q点）の設定、電流増幅率 hFE、エミッタ接地・ベース接地・コレクタ接地の3接地方式が基本。FETは電圧制御でBJTと原理が異なる。</p>

    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>
    <FormulaTable layer="A" rows={[
      { formula: "h_{FE} = \\frac{I_C}{I_B}", meaning: "電流増幅率：ベース電流の何倍のコレクタ電流が流れるか", when: "アクティブ領域（増幅動作）", notWhen: "飽和・遮断領域" },
      { formula: "I_E = I_B + I_C", meaning: "キルヒホッフの電流則：3端子の電流収支", when: "常に成立（全動作領域）", notWhen: "—" },
      { formula: "P_C = V_{CE} \\times I_C", meaning: "コレクタ損失：トランジスタの発熱量", when: "定常動作時", notWhen: "—" },
    ]} />

    <h3>直流動作点計算（電流帰還バイアス）</h3>
    <FormulaTable layer="B" rows={[
      { formula: "V_B = V_{CC} \\cdot \\frac{R_2}{R_1 + R_2}", meaning: "ベース電圧（分圧）", when: "hFE が十分大きい", notWhen: "hFE が小さい場合は精密計算必要" },
      { formula: "V_E = V_B - V_{BE}", meaning: "エミッタ電圧（VBE ≈ 0.6V）", when: "常に成立", notWhen: "—" },
      { formula: "I_C \\approx I_E = \\frac{V_E}{R_E}", meaning: "コレクタ電流（エミッタ電流）", when: "常に成立", notWhen: "—" },
    ]} />

    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ表</h2>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>BJT（バイポーラ）</th>
          <th>FET（電界効果型）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>制御方式</td>
          <td>電流制御（ベース電流）</td>
          <td>電圧制御（ゲート電圧）</td>
        </tr>
        <tr>
          <td>入力インピーダンス</td>
          <td>低い（数百Ω〜数kΩ）</td>
          <td>非常に高い（MOSFETは≈∞）</td>
        </tr>
        <tr>
          <td>入力電流</td>
          <td>有り（IB）</td>
          <td>ほぼゼロ</td>
        </tr>
        <tr>
          <td>用途</td>
          <td>高速スイッチング・線形増幅</td>
          <td>低消費電力・VLSI</td>
        </tr>
      </tbody>
    </table>

    <h3>接地方式の比較</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>エミッタ接地</th>
          <th>ベース接地</th>
          <th>コレクタ接地（エミッタフォロワ）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>電圧利得</td>
          <td>大（反転）</td>
          <td>大（非反転）</td>
          <td>≈1（非反転）</td>
        </tr>
        <tr>
          <td>電流利得</td>
          <td>大（hFE倍）</td>
          <td>≈1</td>
          <td>大</td>
        </tr>
        <tr>
          <td>入力インピーダンス</td>
          <td>中程度</td>
          <td>低い</td>
          <td>高い</td>
        </tr>
        <tr>
          <td>主な用途</td>
          <td>汎用増幅</td>
          <td>高周波増幅</td>
          <td>インピーダンス変換</td>
        </tr>
      </tbody>
    </table>

    <h2 id="examples"><span className="h-num">§4</span>例題</h2>
    <p><strong>問:</strong> hFE=100のNPNトランジスタにベース電流 IB=0.02mA が流れているとき、コレクタ電流 IC とエミッタ電流 IE を求めよ。</p>
    <details>
      <summary>解答</summary>
      <p><Eq tex="I_C = h_{FE} \\times I_B = 100 \\times 0.02 = 2\\text{ mA}" /></p>
      <p><Eq tex="I_E = I_B + I_C = 0.02 + 2 = 2.02\\text{ mA}" /></p>
      <p><strong>ポイント：</strong>IE = IB + IC（3端子の電流収支）。IC は IB の hFE 倍。</p>
    </details>

    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>
    <Callout variant="warn" title="勘違い①：hFE が大きいほど電圧利得も自動的に大きくなると思いがち">
      電圧利得は hFE だけでなく負荷抵抗 RC と内部インピーダンス hie の比にも依存する。hFE と電圧利得は別物。
    </Callout>
    <Callout variant="warn" title="勘違い②：IE = IB + IC を忘れて3端子電流計算を誤る">
      エミッタ電流は必ずベースとコレクタの和。キルヒホッフの電流則は常に成立する。
    </Callout>
    <Callout variant="warn" title="勘違い③：FET も BJT と同じように「入力電流でバイアスを考える」">
      MOSFETのゲート入力インピーダンスは理想的には無限大（実際は静電容量のみ）。入力電流はほぼゼロ。
    </Callout>

    <h2 id="related"><span className="h-num">§6</span>関連項目</h2>
    <ul>
      <li>半導体 — PN接合・キャリア・電子</li>
      <li>オペアンプ — トランジスタを使った集積回路</li>
      <li>パワーエレクトロニクス — MOSFETの応用</li>
    </ul>

    <PageNav prev={{id:"semiconductor", title:"5.1 半導体"}} next={{id:"op-amp", title:"5.3 オペアンプ"}} onNav={onNav} />
  </>
);

// エクスポート
Object.assign(window, { CapacitorPage, AcPowerPage, ThreePhasePage, TransistorPage });
