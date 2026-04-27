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
    <div className="meta-strip">
      <span className="difficulty">★★★★</span>
      <span className="importance">B</span>
      <span className="frequency">中</span>
    </div>
    <div className="page-header">
      <div className="eyebrow">第3章 電磁誘導・過渡</div>
      <h1>3.2 過渡現象</h1>
      <p className="deck">スイッチON/OFFの瞬間から定常状態に落ち着くまでの「変化の過程」。時定数τが変化の速さを決める。</p>
      <div className="meta-list">
        <span>4/26更新</span>
        <span>重要度 B</span>
      </div>
    </div>
    <div className="crumbs">
      <a href="#" onClick={() => onNav('inductance')}>インダクタンス</a> →
      <span>過渡現象</span> →
      <a href="#" onClick={() => onNav('three-phase')}>三相交流</a>
    </div>
    <h2 id="principle">§1 原理</h2>
    <p>コップに水を注ぐイメージ：最初は勢いよく増え、満杯に近づくほどゆっくりになる。電圧・電流の変化も同じカーブを描く。時定数τ（タウ）は「変化の速さ」の物差し。τ秒後に「残り変化量の約37%が残っている」→つまり約63%が変化した状態。</p>
    <div className="callout callout-tip">
      <strong>5秒で思い出す</strong><br/>
      τ後 = 63%変化。5τ後 ≒ 定常値到達。RC回路は {String.raw`$\tau = RC$`}、RL回路は {String.raw`$\tau = L/R$`}。
    </div>
    <h2 id="formulas">§2 公式</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>条件</th></tr></thead>
      <tbody>
        <tr><td>{String.raw`$\tau = RC$`}</td><td>RC回路の時定数</td><td>直列RC（1次回路）</td></tr>
        <tr><td>{String.raw`$\tau = L/R$`}</td><td>RL回路の時定数</td><td>直列RL（1次回路）</td></tr>
        <tr><td>{String.raw`$f(t) = f(\infty) + [f(0) - f(\infty)]e^{-t/\tau}$`}</td><td>過渡現象の一般式</td><td>1次回路全般</td></tr>
      </tbody>
    </table>
    <h2 id="examples">§3 例題</h2>
    <p><strong>問題</strong>: {String.raw`$R=1k\Omega$`}、{String.raw`$C=100\mu F$`} のRC直列回路にDC10Vを印加した。時定数τと、τ後のコンデンサ電圧を求めよ。</p>
    <p><strong>解答</strong>: {String.raw`$\tau = 1000 \times 100 \times 10^{-6} = 0.1s$`}、{String.raw`$v_C(\tau) = 10(1-e^{-1}) \approx 6.32V$`}</p>
    <h2 id="related">§4 関連</h2>
    <ul>
      <li>テブナンの定理（複雑な回路の時定数）</li>
      <li>RC直並列回路（H22問10）</li>
      <li>LCの振動現象</li>
    </ul>
    <div className="page-nav">
      <a className="nav-prev" href="#" onClick={() => onNav('inductance')}>← インダクタンス</a>
      <a className="nav-next" href="#" onClick={() => onNav('three-phase')}>三相交流 →</a>
    </div>
  </>
);

const SemiconductorPage = ({ onNav }) => (
  <>
    <div className="meta-strip">
      <span className="difficulty">★★★</span>
      <span className="importance">B</span>
      <span className="frequency">中</span>
    </div>
    <div className="page-header">
      <div className="eyebrow">第5章 電子理論</div>
      <h1>5.1 半導体・ダイオード</h1>
      <p className="deck">条件によって導体にも絶縁体にもなれる物質。ドーピングとPN接合で「電流の弁」を作る。</p>
      <div className="meta-list">
        <span>4/26更新</span>
        <span>重要度 A</span>
      </div>
    </div>
    <div className="crumbs">
      <a href="#" onClick={() => onNav('three-phase')}>三相交流</a> →
      <span>半導体・ダイオード</span> →
      <a href="#" onClick={() => onNav('transistor')}>トランジスタ</a>
    </div>
    <h2 id="principle">§1 原理</h2>
    <p>純粋なシリコンはほぼ絶縁体。そこに微量の不純物（ドーパント）を加えると電気的性質が激変する。これがドーピング。N型とP型を接合させると、電流を一方向にしか通さないダイオードができる。バルブ（弁）のアナロジーが使える。</p>
    <div className="callout callout-tip">
      <strong>5秒で思い出す</strong><br/>
      半導体 = 不純物で性質が変わる「変化できる素材」。PN接合 = 電流の一方通行弁。
    </div>
    <h2 id="formulas">§2 公式</h2>
    <table>
      <thead><tr><th>公式</th><th>意味</th><th>条件</th></tr></thead>
      <tbody>
        <tr><td>{String.raw`$V_F \approx 0.6 \sim 0.7V$`}</td><td>シリコンダイオードの順方向電圧</td><td>PN接合ダイオード</td></tr>
        <tr><td>{String.raw`$V_{avg} = \dfrac{V_m}{\pi}$`}</td><td>半波整流の出力平均電圧</td><td>純抵抗負荷</td></tr>
        <tr><td>{String.raw`$V_{avg} = \dfrac{2V_m}{\pi}$`}</td><td>全波整流の出力平均電圧</td><td>純抵抗負荷</td></tr>
      </tbody>
    </table>
    <h2 id="examples">§3 例題</h2>
    <p><strong>問題</strong>: シリコンPN接合ダイオードに順方向電圧を印加する。導通開始電圧はおよそ何Vか。また逆方向に電圧を印加したとき、電流は流れるか。</p>
    <p><strong>解答</strong>: 導通開始電圧≈0.6〜0.7V。逆方向には微小な逆飽和電流が流れる（完全には遮断されない）。</p>
    <h2 id="related">§4 関連</h2>
    <ul>
      <li>ツェナーダイオード（定電圧特性）</li>
      <li>バラクタダイオード（可変容量）</li>
      <li>太陽電池（光起電力効果）</li>
    </ul>
    <div className="page-nav">
      <a className="nav-prev" href="#" onClick={() => onNav('three-phase')}>← 三相交流</a>
      <a className="nav-next" href="#" onClick={() => onNav('transistor')}>トランジスタ →</a>
    </div>
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
