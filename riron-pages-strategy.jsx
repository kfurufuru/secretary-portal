/* riron-pages-strategy.jsx — HomePage / 攻略章 / 学習ガイド */

/* ============================================================
   1. HomePage
   ============================================================ */
const HomePage = ({ onNav }) => {
  const d = window.WIKI_DATA;
  return (
    <>
      <Crumbs items={[{ label: "ホーム" }]} onNav={onNav} />
      <PageHeader
        eyebrow="ELECTRICAL ENGINEER 3RD CLASS — THEORY"
        title="電験3種 理論Wiki"
        deck="第三種電気主任技術者試験「理論」科目に特化した、原理理解中心の学習Wiki。公式の物理的意味を押さえることで、暗記負荷を下げて応用力を高める。"
        meta={[
          { label: "対象試験", value: "電験3種 理論科目" },
          { label: "最終更新", value: "2026.04" },
          { label: "登録単元", value: "16" },
        ]}
      />
      <div className="content">

        <div className="stat-strip">
          <div className="stat">
            <div className="stat-label">合格率（過去5年平均）</div>
            <div className="stat-value">約 16%</div>
            <div className="stat-sub">他3科目の土台となる最重要科目</div>
          </div>
          <div className="stat">
            <div className="stat-label">出題数 / 配点</div>
            <div className="stat-value">A問題 14 + B問題 4</div>
            <div className="stat-sub">100点満点・合格 60点</div>
          </div>
          <div className="stat">
            <div className="stat-label">頻出 TOP 3</div>
            <div className="stat-value">交流回路・コンデンサ・三相</div>
            <div className="stat-sub">合計で出題の 約 39%</div>
          </div>
          <div className="stat">
            <div className="stat-label">推奨学習時間</div>
            <div className="stat-value">150 〜 250 時間</div>
            <div className="stat-sub">原理理解で時間短縮可能</div>
          </div>
        </div>

        <h2><span className="h-num">§1</span>はじめに</h2>
        <p>本Wikiは <strong>「理論は他3科目の土台」</strong> という前提に立つ。電力・機械・法規のいずれも、理論で扱う電気回路・電磁気・電子の基礎なくしては解けない。理論を「なんとなく」で済ませると、他3科目の学習効率が大幅に低下する。</p>

        <p>本Wikiの方針は明確である：</p>
        <ul>
          <li><strong>公式の物理的意味を理解する</strong> — 「なぜその式になるか」を口に出して説明できる状態を目指す</li>
          <li><strong>暗記負荷を下げる</strong> — 原理を押さえれば、派生公式は導出できる</li>
          <li><strong>引っかけパターンを事前に潰す</strong> — 受験生が落としやすい論点を37パターンで網羅</li>
          <li><strong>過去問の論点を解法として身につける</strong> — 数値・選択肢が変わっても解法は再利用される</li>
        </ul>
        <p style={{marginTop: 14}}>本文中の <span className="marker">黄色マーカー</span> 部分は、原理理解で必ず押さえるべき要点・物理的意味を示す。直前期はマーカー箇所を中心に総ざらいするのが効率的である。</p>

        <h2><span className="h-num">§2</span>単元一覧</h2>
        <p>章をクリックして該当ページへ移動する。<span className="diff-badge diff-advanced">応用</span> マークが付いた章は計算問題で頻出。理論は「電気回路 → 電磁気 → 電子 → 計測」の順で学ぶと前提知識のギャップが少ない。</p>

        {d.chapters.filter(c => c.id !== "ref" && c.id !== "ch7").map(ch => (
          <div key={ch.id}>
            <h3>{ch.num}. {ch.title}</h3>
            <div className="card-grid">
              {ch.pages.map(p => (
                <div key={p.id} className="card" onClick={() => onNav(p.id)}>
                  <div className="card-num">{p.num}</div>
                  <div className="card-title">{p.title}</div>
                  <div className="card-deck">
                    {pageDeckSummary(p.id)}
                  </div>
                  <div className="card-foot">
                    <span>{freqLabel(p.freq)}</span>
                    {p.featured && <span className="card-freq">★ 重点</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h2><span className="h-num">§3</span>出題傾向（直近10年）</h2>
        <p>過去10年間の理論科目における大きな単元別の出題比率。<strong>計算問題7〜9問・選択問題10問・記述問題ゼロ</strong>が定型構成。試験対策の優先順位の参考とする。</p>
        <div className="box">
          {d.freqData.map((f, i) => (
            <div key={i} className="freq-chart">
              <span className="label">{f.topic}</span>
              <div className="bar"><div className="bar-fill" style={{ width: `${f.pct * 4}%` }}>{f.count}問</div></div>
              <span className="pct">{f.pct}%</span>
            </div>
          ))}
        </div>

        <h2><span className="h-num">§4</span>学習戦略</h2>
        <Callout variant="tip" title="推奨アプローチ：電気回路 → 電磁気 → 電子 → 計測">
          電気回路（直流→交流→三相→RLC）で土台固め。ここで50点以上確保。電磁気で積み増し、電子理論は頻出4回路に絞る。計測は短期決戦で最後にまとめて。
        </Callout>

        <Callout variant="warn" title="3大引っかけ：事前に潰せ">
          ①電界Eと磁束密度Bの単位混同、②RC・RLの過渡で急変しない量の判断ミス、③FETの飽和領域をBJTの飽和と混同。引っかけパターン集（7.1）で事前に潰すこと。
        </Callout>

        <h2><span className="h-num">§5</span>攻略リンク</h2>
        <p>得点に直結する3つの攻略ページ。学習の各フェーズで参照する。</p>
        <div className="card-grid">
          <div className="card" onClick={() => onNav("trap-patterns")}>
            <div className="card-num">7.1</div>
            <div className="card-title">引っかけパターン集（37個）</div>
            <div className="card-deck">受験生が落としやすい論点を網羅。学習開始時から直前期まで継続参照する基本書。</div>
            <div className="card-foot">
              <span>★★★ 最優先</span>
              <span className="card-freq">★ 重点</span>
            </div>
          </div>
          <div className="card" onClick={() => onNav("last-3days")}>
            <div className="card-num">7.2</div>
            <div className="card-title">直前3日戦略</div>
            <div className="card-deck">Day3〜当日朝のチェックリスト。「知っているか」ではなく「説明できるか」を基準に確認。</div>
            <div className="card-foot">
              <span>直前期</span>
              <span className="card-freq">★ 重点</span>
            </div>
          </div>
          <div className="card" onClick={() => onNav("retake-strategy")}>
            <div className="card-num">7.3</div>
            <div className="card-title">再受験分析と戦略</div>
            <div className="card-deck">公式の出題方針・再出題傾向の実データから、最適な学習範囲（何年分・何周）を逆算。</div>
            <div className="card-foot">
              <span>計画策定時</span>
              <span className="card-freq">★ 重点</span>
            </div>
          </div>
        </div>
      </div>
      <PageNav next={{ id: "coulomb-field", title: "1.1 静電気・クーロンの法則" }} onNav={onNav} />
    </>
  );
};


/* ============================================================
   2. Last3DaysPage  (last-3days.md 完全移植)
   ============================================================ */
const Last3DaysPage = ({ onNav }) => (
  <>
    <PageHeader
      eyebrow="第7章 — STRATEGY"
      title="7.2 直前3日戦略"
      deck="理論科目で直前3日間に確認すべき最重要公式・計算パターンをDay別に整理する。「知っているかどうか」ではなく「なぜその式になるか」を口に出して説明できるかを基準とする。"
      meta={[
        { label: "対象期間", value: "試験3日前 〜 当日朝" },
        { label: "想定読了時間", value: "Day1あたり 60〜90分" },
        { label: "更新", value: "2026.04" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "trap-patterns", label: "7. 攻略" },
        { id: "last-3days", label: "7.2 直前3日戦略" },
      ]}
      onNav={onNav}
    />
    <div className="content">

      <h2 id="day3"><span className="h-num">§1</span>Day 3（試験3日前）— 電磁気・直流回路の公式確認</h2>

      <h3>静電気・コンデンサ</h3>
      <Callout variant="info" title="クーロンの法則 F = kQ₁Q₂/r² の係数kの根拠">
        <p><Eq tex="k = 1/(4\pi\varepsilon_0)" />。<Eq tex="\varepsilon_0 \approx 8.85 \times 10^{-12}" /> [F/m] は真空の誘電率。「kを丸暗記する」のではなく、<Eq tex="\varepsilon_0" /> から導出できると点が取れる。</p>
        <p>比誘電率 <Eq tex="\varepsilon_r" /> がある媒質では <Eq tex="k = 1/(4\pi\varepsilon_0\varepsilon_r)" /> と分母が増える（斥力・引力が弱まる）。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>クーロンの法則の距離依存（<Eq tex="r^2" /> に反比例）を説明できるか</li>
        <li>電界 <Eq tex="E = F/Q" /> と電位 <Eq tex="V = kQ/r" /> の違いを即答できるか</li>
        <li>コンデンサの直列合成（逆数の和）と並列合成（足し算）を抵抗と混同しないか → パターン2</li>
      </ul>

      <Callout variant="info" title="コンデンサのエネルギー W = CV²/2 の2分の1の根拠">
        <p>充電中の平均電圧は <Eq tex="V/2" />（0からVまで線形に上昇）。<Eq tex="W = Q \times V_{avg} = CV \times V/2 = CV^2/2" />。「なぜ1/2か」= 充電開始から完了まで電圧が0→Vと変化するから、平均をとると半分になる。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li><Eq tex="W = Q^2/(2C) = CV^2/2 = QV/2" /> の3形式を切り替えられるか → パターン3</li>
        <li>直列接続で各コンデンサの電荷が等しい理由を説明できるか</li>
      </ul>

      <h3>磁気・電磁力</h3>
      <Callout variant="info" title="フレミング左手（モーター）と右手（発電機）の選び方">
        <p>「何が欲しいか」で手を選ぶ。<strong>力Fが欲しい→左手（モーター）</strong>、<strong>起電力eが欲しい→右手（発電機）</strong>。</p>
        <p>左手：中指=電流 I、人差し指=磁束密度 B、親指=力 F（IBF の順）。<br/>右手：中指=誘起起電力 e、人差し指=磁束密度 B、親指=速度 v（eBv の順）。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li><Eq tex="F = BIL\sin\theta" /> の <Eq tex="\theta" /> が「電流と磁界の角」であることを確認できるか → パターン4</li>
        <li>誘導起電力 <Eq tex="e = BLv\sin\theta" /> の <Eq tex="\theta" /> が「速度と磁界の角」であることを確認できるか</li>
        <li>磁気回路の起磁力 <Eq tex="NI = Hl = \phi R_m" /> と電気回路のオームの法則の対応を説明できるか</li>
      </ul>

      <Callout variant="info" title="磁気抵抗 Rₘ = l/(μA) の意味">
        <p>電気抵抗 <Eq tex="R = \rho l/A" /> と対応。<Eq tex="\mu = \mu_0\mu_r" />（鉄心では <Eq tex="\mu_r" /> は数百〜数千）。空隙では <Eq tex="\mu_r = 1" /> なので磁気抵抗が急増する。鉄心区間と空隙区間で材料を必ず確認する。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>空隙の磁気抵抗 &gt; 鉄心の磁気抵抗（<Eq tex="\mu_r" />倍の差）を即答できるか → パターン5</li>
        <li>環状鉄心の起磁力計算（空隙あり・なし）を手順通り解けるか</li>
      </ul>

      <h3>直流回路</h3>
      <Callout variant="info" title="テブナンの定理の手順">
        <ol>
          <li>求めたい端子を開放し、開放電圧 <Eq tex="V_{oc}" /> を計算</li>
          <li>電源を短絡（電圧源→短絡、電流源→開放）して等価抵抗 <Eq tex="R_{th}" /> を計算</li>
          <li><Eq tex="I = V_{oc}/(R_{th} + R_L)" /> で負荷電流を求める</li>
        </ol>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>キルヒホッフの電圧則（KVL）・電流則（KCL）の符号を正しく扱えるか</li>
        <li>最大電力伝達条件 <Eq tex="R_L = R_{th}" /> のときの最大電力 <Eq tex="P_{max} = V_{oc}^2/(4R_{th})" /> を導けるか → パターン9</li>
        <li>並列抵抗の合成で「逆数を戻す」ステップを忘れないか → パターン7</li>
      </ul>

      <hr/>

      <h2 id="day2"><span className="h-num">§2</span>Day 2（試験2日前）— B問題の計算パターン確認</h2>

      <h3>三相交流</h3>
      <Callout variant="info" title="Y結線とΔ結線の√3の出る場所">
        <ul>
          <li><strong>Y結線</strong>: 線電圧 = <Eq tex="\sqrt{3}" /> × 相電圧 / 線電流 = 相電流（√3なし）</li>
          <li><strong>Δ結線</strong>: 線電圧 = 相電圧（√3なし） / 線電流 = <Eq tex="\sqrt{3}" /> × 相電流</li>
        </ul>
        <p><strong>「Y→電圧に√3、Δ→電流に√3」</strong> と整理する。混乱したら相回路を描いて、1相分の電圧・電流を基準に考え直す。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>Y-Δ変換時の相電圧・線電圧の関係を図なしで説明できるか → パターン13</li>
        <li>三相電力 <Eq tex="P = \sqrt{3}V_LI_L\cos\phi = 3V_PI_P\cos\phi" /> の2形式を使い分けられるか → パターン14</li>
        <li>三相不平衡時に中性点電流が発生する理由を説明できるか</li>
      </ul>

      <h3>RLC直列回路・共振</h3>
      <Callout variant="info" title="インピーダンス合成はベクトルで行う">
        <p><Eq tex="Z = \sqrt{R^2 + (X_L - X_C)^2}" />。直角三角形のベクトル合成。スカラー加算 <Eq tex="Z = R + X_L + X_C" /> は絶対に誤り。</p>
        <p>共振条件 <Eq tex="X_L = X_C \Rightarrow \omega L = 1/(\omega C) \Rightarrow \omega_0 = 1/\sqrt{LC}" />。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>直列共振時の電流最大・インピーダンス最小（<Eq tex="Z = R" />）を説明できるか</li>
        <li>Q値（尖鋭度）<Eq tex="Q = \omega_0 L / R" /> の大小が帯域幅に与える影響を説明できるか</li>
        <li>位相角 <Eq tex="\theta = \arctan\{(X_L - X_C)/R\}" /> の符号（誘導性か容量性か）を判定できるか</li>
      </ul>

      <h3>過渡現象</h3>
      <Callout variant="info" title="スイッチ投入直後のコンデンサ・インダクタの扱い">
        <ul>
          <li><strong>コンデンサ（初期電荷ゼロ）</strong>: <Eq tex="t=0^+" /> では<strong>短絡</strong>（電圧維持が不可→電流最大）</li>
          <li><strong>インダクタ（初期電流ゼロ）</strong>: <Eq tex="t=0^+" /> では<strong>開放</strong>（電流維持が不可→電流ゼロ）</li>
          <li>定常状態では逆転：コンデンサ→開放（充電完了）、インダクタ→短絡（電流一定）</li>
        </ul>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>時定数 <Eq tex="\tau = RC" />（CR回路）/ <Eq tex="\tau = L/R" />（LR回路）を即答できるか</li>
        <li><Eq tex="\tau" /> 後に「約63%」定常値に達する（≒100%ではない）ことを説明できるか → パターン19</li>
        <li>過渡応答の式 <Eq tex="i(t) = I_\infty + (I_0 - I_\infty)e^{-t/\tau}" /> を任意の初期値・定常値で使えるか</li>
      </ul>

      <hr/>

      <h2 id="day1"><span className="h-num">§3</span>Day 1（試験前日）— R08予測テーマの重点確認</h2>

      <h3>磁気回路（最優先：R06上〜R07上 3回連続空白）</h3>
      <Callout variant="warn" title="R08（2026年8月）最高確率テーマ">
        波分析より、磁気回路は直近3回連続で出題なし。環状鉄心の磁束密度・起磁力計算、またはヒステリシス特性の論述が出題候補。
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>環状鉄心（空隙あり）の計算手順：<Eq tex="NI = H_{\text{iron}}l_{\text{iron}} + H_{\text{gap}}l_{\text{gap}}" /> を適用できるか</li>
        <li>ヒステリシス損 <Eq tex="P_h \propto f B_m^{1.6}" />、渦電流損 <Eq tex="P_e \propto f^2 B_m^2" /> の周波数依存性を説明できるか</li>
        <li>残留磁気・保磁力の意味と用途（ハードとソフト磁性材料の使い分け）を説明できるか</li>
      </ul>

      <h3>オペアンプ（高確率：R07上空白）</h3>
      <Callout variant="info" title="仮想短絡（仮想接地）の適用条件">
        <p>負帰還がかかっているとき、差動入力電圧は限りなくゼロ。</p>
        <ul>
          <li>反転増幅: <Eq tex="V_{out} = -\frac{R_f}{R_i}V_{in}" />（マイナス符号を忘れない）</li>
          <li>非反転増幅: <Eq tex="V_{out} = \left(1 + \frac{R_f}{R_i}\right)V_{in}" /></li>
          <li>積分回路: 入力を時間積分した出力。<Eq tex="V_{out} = -\frac{1}{RC}\int V_{in}\,dt" /></li>
        </ul>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>反転・非反転増幅のゲイン式を抵抗値から直接導けるか（仮想接地を使った導出で）→ パターン17</li>
        <li>開ループゲインが有限の場合に「仮想接地が成立しない」条件を説明できるか</li>
      </ul>

      <h3>ブリッジ回路（中高確率：R07上空白）</h3>
      <Callout variant="info" title="ホイートストンブリッジの平衡条件の導出">
        <p>菱形回路で検流計電流ゼロ → 向かい合う辺の積が等しい：<Eq tex="R_1 R_4 = R_2 R_3" />。「覚える」より「キルヒホッフで計算すると平衡条件が出てくる」流れを追えること。平衡時は電源を含む経路で電流が流れ、検流計のみ電流ゼロ（全体がゼロではない）。</p>
      </Callout>

      <p><strong>確認事項：</strong></p>
      <ul>
        <li>平衡条件の「向かい合う辺の積」が指す辺を、菱形を描いて確認できるか</li>
        <li>「平衡=全電流ゼロ」の誤解を修正できるか（電流は流れる、検流計のみゼロ）</li>
        <li>未知抵抗を求める計算（<Eq tex="R_x = R_2 R_3/R_1" />）を平衡条件から導けるか</li>
      </ul>

      <hr/>

      <h2 id="morning"><span className="h-num">§4</span>当日朝 — 最重要確認表（5分で黙読）</h2>

      <table>
        <thead>
          <tr><th>項目</th><th>式・値</th></tr>
        </thead>
        <tbody>
          <tr><td>クーロンの法則</td><td><Eq tex="F = kQ_1Q_2/r^2,\ k = 1/(4\pi\varepsilon_0)" /></td></tr>
          <tr><td>コンデンサエネルギー</td><td><Eq tex="W = CV^2/2 = Q^2/(2C)" /></td></tr>
          <tr><td>磁気抵抗</td><td><Eq tex="R_m = l/(\mu_0\mu_r A)" />（空隙は <Eq tex="\mu_r = 1" />）</td></tr>
          <tr><td>誘導起電力</td><td><Eq tex="e = BLv\sin\theta" />（速度と磁界の角）</td></tr>
          <tr><td>インピーダンス合成</td><td><Eq tex="Z = \sqrt{R^2 + (X_L - X_C)^2}" />（ベクトル）</td></tr>
          <tr><td>共振条件</td><td><Eq tex="X_L = X_C \Rightarrow f_0 = 1/(2\pi\sqrt{LC})" /></td></tr>
          <tr><td>三相電力</td><td><Eq tex="P = \sqrt{3}V_LI_L\cos\phi" /></td></tr>
          <tr><td>Y結線の√3</td><td>線電圧 = <Eq tex="\sqrt{3}" /> × 相電圧</td></tr>
          <tr><td>Δ結線の√3</td><td>線電流 = <Eq tex="\sqrt{3}" /> × 相電流</td></tr>
          <tr><td>過渡時定数</td><td><Eq tex="\tau = RC" /> または <Eq tex="L/R" /></td></tr>
          <tr><td>t=0直後コンデンサ</td><td>短絡（初期電荷ゼロの場合）</td></tr>
          <tr><td>t=0直後インダクタ</td><td>開放（初期電流ゼロの場合）</td></tr>
          <tr><td>反転増幅ゲイン</td><td><Eq tex="A_v = -R_f/R_i" />（マイナス符号あり）</td></tr>
        </tbody>
      </table>

      <Callout variant="tip" title="当日朝の使い方">
        試験会場入場前、この表を5分で黙読するだけでよい。新しい知識を詰め込もうとしない。確認のみ。
      </Callout>

    </div>
    <PageNav
      prev={{ id: "trap-patterns", title: "7.1 引っかけパターン集" }}
      next={{ id: "retake-strategy", title: "7.3 再受験分析と戦略" }}
      onNav={onNav}
    />
  </>
);


/* ============================================================
   3. RetakeStrategyPage  (retake-analysis-and-strategy.md 移植)
   ============================================================ */
const RetakeStrategyPage = ({ onNav }) => (
  <>
    <PageHeader
      eyebrow="第7章 — STRATEGY"
      title="7.3 再受験分析と戦略"
      deck="電験3種「理論」の最適な学習範囲（何年分・何周）を、公式の出題方針と再出題傾向の実データから逆算する。学習計画策定時（試験3〜6ヶ月前）に読むドキュメント。"
      meta={[
        { label: "対象", value: "学習計画策定時（試験3〜6ヶ月前）" },
        { label: "想定読了時間", value: "30〜40分" },
        { label: "更新", value: "2026.04" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "trap-patterns", label: "7. 攻略" },
        { id: "retake-strategy", label: "7.3 再受験分析と戦略" },
      ]}
      onNav={onNav}
    />
    <div className="content">

      <Callout variant="info" title="読むタイミング">
        学習計画策定時（試験3〜6ヶ月前）に読むドキュメント。直前対策は「7.2 直前3日チェックリスト」を使う。
      </Callout>

      <h2 id="policy"><span className="h-num">§1</span>公式の出題方針</h2>
      <p>ECEE（電気技術者試験センター）の公式方針は、年度ごとに「問題作成方針」として公表されている。R7（2025年度）の問題作成方針より、以下の3点が明示されている：</p>
      <ol>
        <li>新作問題を中心としつつ、<strong>過去問題から必要に応じて構成する</strong></li>
        <li>技術革新・法令改正の動向を反映して<strong>修正を加える</strong></li>
        <li>出題範囲・難易度は学習指導要領に準拠</li>
      </ol>

      <p><strong>参考URL：</strong></p>
      <ul>
        <li>ECEE 過去問・出題方針: <a href="https://www.shiken.or.jp/chief/third/qa/" target="_blank" rel="noopener noreferrer">https://www.shiken.or.jp/chief/third/qa/</a></li>
        <li>R07問題作成方針 PDF: <a href="https://www.shiken.or.jp/ecee-overview/news/upload/R07denkenpolicy_az.pdf" target="_blank" rel="noopener noreferrer">https://www.shiken.or.jp/ecee-overview/news/upload/R07denkenpolicy_az.pdf</a></li>
      </ul>

      <Callout variant="info" title="公式方針からわかる前提">
        「過去問丸暗記で受かる試験」ではなく「<span className="marker">過去問の論点を理解した者が受かる試験</span>」。数値・選択肢が変わっても <strong>論点（解法パターン）</strong> は再利用される構造になっている。
      </Callout>

      <hr/>

      <h2 id="reuse"><span className="h-num">§2</span>再出題傾向：完全一致率の推移</h2>
      <p>近年の試験で「過去問と完全に同じ問題（数値・選択肢含めて一致）」がどれだけ出たかの実測値。</p>

      <table>
        <thead>
          <tr><th>年度</th><th>科目</th><th>完全一致率</th><th>類題含む一致率</th><th>備考</th></tr>
        </thead>
        <tbody>
          <tr><td>R5下期</td><td>全科目</td><td>ほぼ100%</td><td>ほぼ100%</td><td>機械の1問を除き選択肢順まで同一</td></tr>
          <tr><td>R7上期</td><td>理論</td><td>16.7%</td><td>94.4%（類題含む）</td><td>選択肢変更含めると 55.6%</td></tr>
          <tr><td>R7下期</td><td>理論</td><td>0%</td><td>83.3%（類題含む）</td><td>新傾向多数</td></tr>
          <tr><td>R7上期</td><td>法規</td><td>84.6%</td><td>—</td><td>安定</td></tr>
          <tr><td>R7下期</td><td>法規</td><td>—</td><td>30.8%（類題含む）</td><td>激減・年度ブレ大</td></tr>
        </tbody>
      </table>

      <p style={{fontSize: "0.9em", color: "#666"}}>出典: ブリュ「電験3種の出題傾向分析」<a href="https://brionac-yu-yake.jp/denken3-trend-analysis/" target="_blank" rel="noopener noreferrer">https://brionac-yu-yake.jp/denken3-trend-analysis/</a>（2026-04-26確認済み）</p>

      <Callout variant="warn" title="数値の解釈に注意">
        「完全一致率 = 数値・選択肢まで一致」と「類題含む = 同じ論点・解法」は別物。完全一致は年度により0〜100%と振れ幅が大きいため、<strong>狙うのは類題含む80%超のゾーン</strong>。つまり「同じ問題」を覚えるのではなく「同じ論点」を解けるようにすることが本質。
      </Callout>

      <hr/>

      <h2 id="characteristics"><span className="h-num">§3</span>理論の特性：解法パターン科目</h2>
      <p>理論は <strong>答えを覚える科目ではなく、解法を覚える科目</strong>。法規（条文・数値）や電力（設備諸元）と異なり、物理法則の組み合わせで解く構造。</p>
      <p>→ 同じ論点・同じ解法パターンが、数値や回路構成を変えて繰り返し出題される。</p>

      <h3>分野別優先度マトリクス</h3>
      <table>
        <thead>
          <tr><th>分野</th><th>優先度</th><th>再出題傾向</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td>直流・交流回路</td><td>★★★ 最優先</td><td>毎回の安定得点源</td><td>問5〜9で固定3〜4問。キルヒホッフ・テブナン・RLC共振は論点固定</td></tr>
          <tr><td>三相交流</td><td>★★★ 最優先</td><td>類題化しやすい</td><td>Y-Δ変換・線間↔相の変換で数値だけ差し替えて再利用</td></tr>
          <tr><td>電磁気</td><td>★★★ 高</td><td>毎年形を変えて出る</td><td>静電気・コンデンサ・電磁力が問1〜4でローテーション</td></tr>
          <tr><td>過渡現象</td><td>★★ 高</td><td>類題化されやすい</td><td>問10で全期固定。RC/RL の時定数論点が中心</td></tr>
          <tr><td>電子回路</td><td>★ 中</td><td>捨てると60点が不安定</td><td>半導体・オペアンプは出題周期あり。ゼロ戦略は危険</td></tr>
          <tr><td>計測</td><td>★ 中</td><td>出題は少なめ</td><td>ブリッジ・指示計の原理。深追い不要</td></tr>
        </tbody>
      </table>

      <Callout variant="warn" title="重点箇所">
        <strong>三相交流の相量→線量変換</strong>（相電圧 × √3 = 線間電圧、Y結線時）は失点パターンが多い。優先分野（★★★）の中でも最初に強化すること。
      </Callout>

      <hr/>

      <h2 id="range"><span className="h-num">§4</span>効率的な学習範囲</h2>

      <h3>まずやる：最新10回（2026-04-25時点）</h3>
      <p>R3上期〜R7下期の <strong>直近10回分</strong> を最優先で解く。</p>

      <table>
        <thead>
          <tr><th>周回優先度</th><th>年度・期</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td>1（最優先）</td><td>R7上期・下期</td><td>直近の出題傾向を最も反映</td></tr>
          <tr><td>2</td><td>R6上期・下期</td><td>完全一致候補が含まれる可能性</td></tr>
          <tr><td>3</td><td>R5上期・下期</td><td>R5下期は再出題率ほぼ100%の参考期</td></tr>
          <tr><td>4</td><td>R4上期・下期</td><td>類題ベースとして十分</td></tr>
          <tr><td>5</td><td>R3上期・下期</td><td>周期論点の確認用</td></tr>
        </tbody>
      </table>

      <p>→ 次回更新タイミング: <strong>R8上期試験後（2026年9月予定）</strong></p>

      <h3>余裕があれば：苦手分野だけ古い年度へ</h3>
      <p>最新10回を3周しても得点率が安定しない分野だけ、<strong>古い年度にピンポイント</strong>で戻る。</p>

      <table>
        <thead>
          <tr><th>古い年度に戻る価値</th><th>分野</th><th>理由</th></tr>
        </thead>
        <tbody>
          <tr><td>◎ 高い</td><td>三相交流・電磁気・過渡現象</td><td>物理法則ベースで論点が古びない。平成年代の良問が解法習得に有効</td></tr>
          <tr><td>○ 中</td><td>直流・交流回路</td><td>最新10回でカバー十分。ただし弱点なら戻る価値あり</td></tr>
          <tr><td>△ 低い</td><td>電子回路</td><td>半導体・オペアンプは古すぎると素子が現代と異なる場合あり</td></tr>
          <tr><td>× 不要</td><td>計測</td><td>直近10回で十分。深追いは費用対効果が低い</td></tr>
        </tbody>
      </table>

      <Callout variant="tip" title="法規との違い">
        法規は古い過去問が法令改正で<strong>不正解になるリスク</strong>がある（電気事業法・電技解釈の改正）。一方、<strong>理論は物理法則なので古い年度も有効</strong>。→ 苦手分野だけ平成年代まで戻る価値がある。
      </Callout>

      <hr/>

      <h2 id="rounds"><span className="h-num">§5</span>周回数の目安</h2>

      <table>
        <thead>
          <tr><th>フェーズ</th><th>範囲</th><th>周回数</th><th>期間目安</th></tr>
        </thead>
        <tbody>
          <tr><td>基礎固め</td><td>最新10回</td><td>1周（解説熟読）</td><td>2ヶ月</td></tr>
          <tr><td>解法定着</td><td>最新10回</td><td>2周目（解き直し）</td><td>1.5ヶ月</td></tr>
          <tr><td>仕上げ</td><td>最新10回</td><td>3周目（時間制限あり）</td><td>1ヶ月</td></tr>
          <tr><td>弱点補強</td><td>苦手分野のみ15〜20年分</td><td>1〜2周</td><td>1ヶ月</td></tr>
          <tr><td>直前対策</td><td>「7.2 直前3日チェックリスト」</td><td>—</td><td>試験3日前〜当日</td></tr>
        </tbody>
      </table>

      <p>合計: 最新10回×3周 + 苦手分野の古い年度1〜2周 = <strong>約5.5ヶ月</strong></p>

      <Callout variant="info" title="周回ごとの目的の違い">
        <ul>
          <li>1周目: 「なぜこの解法か」を理解する。解説熟読が中心。</li>
          <li>2周目: 解法を再現できるか確認。手が動くかどうかをチェック。</li>
          <li>3周目: 試験時間（90分）を意識して解く。時間配分の練習。</li>
        </ul>
      </Callout>

      <hr/>

      <h2 id="references"><span className="h-num">§6</span>参考情報</h2>

      <h3>公式</h3>
      <ul>
        <li>ECEE 過去問・出題方針: <a href="https://www.shiken.or.jp/chief/third/qa/" target="_blank" rel="noopener noreferrer">https://www.shiken.or.jp/chief/third/qa/</a></li>
        <li>R07問題作成方針 PDF: <a href="https://www.shiken.or.jp/ecee-overview/news/upload/R07denkenpolicy_az.pdf" target="_blank" rel="noopener noreferrer">https://www.shiken.or.jp/ecee-overview/news/upload/R07denkenpolicy_az.pdf</a></li>
      </ul>

      <h3>再出題分析</h3>
      <ul>
        <li>ブリュ「電験3種の出題傾向分析」: <a href="https://brionac-yu-yake.jp/denken3-trend-analysis/" target="_blank" rel="noopener noreferrer">https://brionac-yu-yake.jp/denken3-trend-analysis/</a></li>
        <li>電気の部屋「過去問の使い回し分析」: <a href="https://denginoheya.com/denken/denken3/past_issues/" target="_blank" rel="noopener noreferrer">https://denginoheya.com/denken/denken3/past_issues/</a></li>
      </ul>

      <h3>学習範囲の議論</h3>
      <ul>
        <li>せでぃあ「過去問15年分推奨」: <a href="https://cediablog.com/denken3-kakomon-15years/" target="_blank" rel="noopener noreferrer">https://cediablog.com/denken3-kakomon-15years/</a></li>
        <li>電験review「過去問10年分で十分」: <a href="https://denken-review.com/archives/10730" target="_blank" rel="noopener noreferrer">https://denken-review.com/archives/10730</a></li>
      </ul>

      <p style={{fontSize: "0.9em", color: "#666", marginTop: 24}}>最終更新: 2026-04-25 / 次回更新: R08試験後（2026年9月予定）</p>

    </div>
    <PageNav
      prev={{ id: "last-3days", title: "7.2 直前3日戦略" }}
      next={{ id: "trends", title: "A 出題傾向データ" }}
      onNav={onNav}
    />
  </>
);


/* ============================================================
   4. GuidePage  (beginner.md + by-weakness.md + last-minute.md 統合)
   ============================================================ */
const GuidePage = ({ onNav }) => (
  <>
    <PageHeader
      eyebrow="リファレンス — REFERENCE"
      title="C 学習ガイド"
      deck="ゼロから理論を制覇する初学者ロードマップ・弱点別の過去問逆引き・直前圧縮版確認・得点戦略を統合した総合ガイド。学習フェーズに応じて該当節を参照する。"
      meta={[
        { label: "全STEP数", value: "16" },
        { label: "推奨期間", value: "週10〜15時間で3〜4ヶ月" },
        { label: "更新", value: "2026.04" },
      ]}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { id: "glossary", label: "リファレンス" },
        { id: "guide", label: "C 学習ガイド" },
      ]}
      onNav={onNav}
    />
    <div className="content">

      <h2 id="roadmap"><span className="h-num">§1</span>学習ロードマップ（12週モデル）</h2>
      <p>理論をゼロから始める方向けの学習順序。16テーマをフェーズ順に積み上げることで、「前提知識が足りなくて詰まる」を防ぐ。全体の目安は週10〜15時間で3〜4ヶ月。</p>

      <h3>前提知識チェックリスト</h3>
      <p>以下が「なんとなく分かる」レベルにあれば、スタートできる。</p>
      <ul>
        <li>オームの法則（V = IR）を式として書ける</li>
        <li>電流・電圧・抵抗の関係を言葉で説明できる</li>
        <li>サインカーブ（sin、cos）が何を表すか分かる</li>
        <li>中学レベルの分数・比の計算ができる</li>
      </ul>

      <Callout variant="info" title="三角関数が不安な場合">
        sin・cosが苦手でもSTEP 4までは進める。STEP 4（交流回路基礎）に入る前に数学ツール（複素数・フェーザー・三角関数セクション）を確認すること。
      </Callout>

      <h3>推奨学習順序（STEP 1〜16）</h3>

      <h4>STEP 1 — 直流回路（目安: 2〜3日）</h4>
      <p>電気回路の根幹。キルヒホッフの法則・テブナンの定理まで確実に押さえる。ここが曖昧だと全テーマに影響する。<br/>
      項目: オームの法則 / 直列・並列合成抵抗 / KCL・KVL / テブナンの定理・重ね合わせの理</p>

      <h4>STEP 2 — 静電気（目安: 1〜2日）</h4>
      <p>電荷・電界・電位の概念。クーロンの法則から電位まで一本道。直流回路の「電圧」概念と対応させると理解しやすい。</p>

      <h4>STEP 3 — コンデンサ（目安: 1〜2日）</h4>
      <p>静電気の応用。静電容量・誘電体・エネルギー蓄積の仕組み。直列・並列の合成は抵抗と逆になる点に注意。</p>

      <h4>STEP 4 — 交流回路基礎（目安: 3〜4日） — 最初の壁</h4>
      <Callout variant="warn" title="複素数とフェーザーが登場する">
        ここで詰まる人が最も多い。焦らず「なぜ複素数を使うか」から理解すること。
      </Callout>
      <p>項目: 正弦波交流の表現（振幅・角周波数・位相） / 実効値（V = Vm / √2） / フェーザー表現 / ELIのICE</p>

      <h4>STEP 5 — RLC回路（目安: 2〜3日）</h4>
      <p>交流回路基礎の延長。インピーダンスの概念を導入。共振条件（XL = XC）と共振周波数・Q値まで押さえる。</p>

      <h4>STEP 6 — 交流電力（目安: 1〜2日）</h4>
      <p>有効電力・無効電力・皮相電力の三角関係。力率改善の考え方まで。計算パターンが決まっているので得点しやすいテーマ。</p>

      <h4>STEP 7 — 三相交流（目安: 3〜4日） — 2番目の壁</h4>
      <Callout variant="warn" title="Y結線とΔ結線の変換で混乱しやすい">
        「線間電圧と相電圧」「線電流と相電流」の関係を図で整理すること。
      </Callout>
      <p><strong>突破のコツ：</strong></p>
      <ol>
        <li>まずY結線だけで計算の流れを完全に習得する</li>
        <li>Δ結線は「Y→Δ等価変換」で統一して解くと混乱しない</li>
        <li>√3 の出どころを毎回確認する（Y: 線間 = √3 × 相電圧 / Δ: 線電流 = √3 × 相電流）</li>
      </ol>

      <h4>STEP 8 — 電磁力（目安: 1〜2日）</h4>
      <p>フレミングの左手・右手の使い分け。電磁誘導・ファラデーの法則。「左手 = 力、右手 = 起電力」で覚える。</p>

      <h4>STEP 9 — 磁気回路（目安: 1〜2日）</h4>
      <p>電気回路との対応関係で理解する（起磁力 ↔ 電圧、磁束 ↔ 電流、磁気抵抗 ↔ 抵抗）。この対応を頭に入れると、電気回路の計算テクニックをそのまま転用できる。</p>

      <h4>STEP 10 — インダクタンス（目安: 1〜2日）</h4>
      <p>自己インダクタンスと相互インダクタンス。コイルのエネルギー蓄積式（W = LI²/2）まで。RLC回路での XL = ωL と接続して理解する。</p>

      <h4>STEP 11 — 過渡現象（目安: 2〜3日）</h4>
      <p>RC回路とRL回路の充放電。時定数 τ = RC または τ = L/R。「時定数の時間で63%まで変化する」だけ覚えれば計算パターンは決まっている。</p>

      <h4>STEP 12 — 半導体（目安: 1日）</h4>
      <p>N型・P型の違い、PN接合・ダイオードの整流作用。概念整理が中心。計算よりも用語の定義問題が多い。</p>

      <h4>STEP 13 — トランジスタ（目安: 2日）</h4>
      <p>バイポーラトランジスタの動作原理と電流増幅率（hFE）。IC = hFE × IB、IE = IB + IC の2式が基本。</p>

      <h4>STEP 14 — オペアンプ（目安: 1日）</h4>
      <p>反転増幅・非反転増幅の利得計算。仮想短絡（イマジナリショート）の概念を理解すれば計算は公式に当てはめるだけ。</p>

      <h4>STEP 15 — 計器の原理（目安: 1日）</h4>
      <p>可動コイル・可動鉄片・整流型の特徴と適用範囲。「可動コイル = 直流専用、可動鉄片 = 交直両用」が頻出。</p>

      <h4>STEP 16 — ブリッジ回路（目安: 1日）</h4>
      <p>ホイートストンブリッジの平衡条件（R1R4 = R2R3）。平衡・不平衡の両方の計算パターンを押さえる。</p>

      <h3>学習の目安ペース</h3>
      <table>
        <thead>
          <tr><th>週あたりの学習時間</th><th>全STEPを一周する期間</th></tr>
        </thead>
        <tbody>
          <tr><td>週 5〜7時間</td><td>約4〜5ヶ月</td></tr>
          <tr><td>週10〜12時間</td><td>約3〜4ヶ月</td></tr>
          <tr><td>週15〜20時間</td><td>約2〜3ヶ月</td></tr>
        </tbody>
      </table>

      <Callout variant="tip" title="一周した後は">
        全STEP完了後は§2「弱点別・過去問逆引き」に切り替えて弱点を特定する。「知識チェック」で理解度スコアが低いテーマから復習する。
      </Callout>

      <hr/>

      <h2 id="weakness"><span className="h-num">§2</span>弱点別・過去問逆引き</h2>
      <p>過去問を解いて間違えた問題を、対応テーマに紐付けて集中学習するためのパス。「どこを直せばいいか」を素早く特定し、無駄なく弱点を潰す。</p>

      <h3>「位相差の±符号でいつも迷う」人向け</h3>
      <p><strong>原因</strong>: ELIのICEを丸暗記しているが、フェーザー図との対応で「進む＝角度が大きい＝正」なのか混乱している。</p>
      <p><strong>対策</strong>: 交流回路基礎の「フェーザー図の読み方」で「反時計回りが正の位相（進み）」を確認 → ELIのICEを図で確認（暗記ではなく原理から追う）。</p>
      <Callout variant="tip" title="判定基準">
        フェーザー図で「基準ベクトルより反時計回り＝進み位相＝正の位相角」。「進む」「遅れる」は常に電圧を基準に表現される点に注意。
      </Callout>

      <h3>「インピーダンスでスカラー加算してしまう」人向け</h3>
      <p><strong>原因</strong>: 抵抗・コイル・コンデンサのインピーダンスをベクトル量ではなくスカラー量として扱っている。RとXL、XCは90°位相がずれているため、単純加算は不可。</p>
      <Callout variant="warn" title="絶対に誤りの式">
        Z = R + XL + XC はスカラー加算であり、<strong>常に誤り</strong>。R と (XL − XC) は互いに直交するベクトルなので、合成はピタゴラスで行う。
      </Callout>

      <h3>「過渡現象の初期値・最終値の設定が苦手」人向け</h3>
      <table>
        <thead>
          <tr><th>素子</th><th>t=0⁺（初期電荷/電流ゼロの場合）</th><th>t=∞（定常状態）</th></tr>
        </thead>
        <tbody>
          <tr><td>コンデンサ</td><td>短絡（電流が流れる）</td><td>開放（充電完了）</td></tr>
          <tr><td>インダクタ</td><td>開放（電流が流れない）</td><td>短絡（電流一定）</td></tr>
        </tbody>
      </table>
      <Callout variant="tip" title="覚え方ではなく理解">
        コンデンサは「電圧を急変できない」→ t=0⁺では電圧ゼロ＝短絡と等価。インダクタは「電流を急変できない」→ t=0⁺では電流ゼロ＝開放と等価。
      </Callout>

      <h3>「三相交流の√3がわからない」人向け</h3>
      <table>
        <thead>
          <tr><th>結線</th><th>電圧の関係</th><th>電流の関係</th></tr>
        </thead>
        <tbody>
          <tr><td>Y結線</td><td>線電圧 = <strong>√3</strong> × 相電圧</td><td>線電流 = 相電流</td></tr>
          <tr><td>Δ結線</td><td>線電圧 = 相電圧</td><td>線電流 = <strong>√3</strong> × 相電流</td></tr>
        </tbody>
      </table>
      <Callout variant="tip" title="確認の仕方">
        「√3はどこか？」→ Y結線なら「電圧側」、Δ結線なら「電流側」と即答できるまで反復。
      </Callout>

      <h3>「コンデンサと直流の関係が混乱する」人向け</h3>
      <table>
        <thead>
          <tr><th>状況</th><th>コンデンサの扱い</th></tr>
        </thead>
        <tbody>
          <tr><td>定常状態（直流が十分流れた後）</td><td><strong>開放</strong>（充電完了で電流ゼロ）</td></tr>
          <tr><td>スイッチ投入直後（初期電荷ゼロ）</td><td><strong>短絡</strong>（電圧がゼロ、電流最大）</td></tr>
          <tr><td>交流回路</td><td>インピーダンス XC = 1/(2πfC) をもつ素子</td></tr>
        </tbody>
      </table>

      <h3>「磁気回路の出発点がわからない」人向け</h3>
      <table>
        <thead>
          <tr><th>電気回路</th><th>磁気回路</th><th>対応</th></tr>
        </thead>
        <tbody>
          <tr><td>電流 I [A]</td><td>磁束 φ [Wb]</td><td>流れるもの</td></tr>
          <tr><td>起電力 V [V]</td><td>起磁力 NI [A]</td><td>駆動力</td></tr>
          <tr><td>抵抗 R [Ω]</td><td>磁気抵抗 Rm [A/Wb]</td><td>流れにくさ</td></tr>
          <tr><td>オームの法則 V = IR</td><td>NI = φ × Rm</td><td>同じ構造</td></tr>
        </tbody>
      </table>
      <Callout variant="tip" title="解き方の手順">
        磁気回路の問題は「電気回路の問題に置き換えて解く」だけ。Rm = l/(μA) で磁気抵抗を求めたら、あとは電気回路と同じ手順で計算できる。
      </Callout>

      <h3>「Q値の式を直列・並列で間違える」人向け</h3>
      <table>
        <thead>
          <tr><th>回路</th><th>Q値の式</th><th>物理的意味</th></tr>
        </thead>
        <tbody>
          <tr><td>直列RLC</td><td>Q = ωL/R = 1/(ωCR)</td><td>電流が最大のとき電圧拡大率</td></tr>
          <tr><td>並列RLC</td><td>Q = R/(ωL) = ωCR</td><td>電圧が最大のとき電流拡大率</td></tr>
        </tbody>
      </table>
      <Callout variant="tip" title="混同しない方法">
        「直列のQ」は「Rが分母（Rが大きいと損失が多くQが下がる）」。「並列のQ」は「Rが分子（Rが大きいと電流が分散しにくくQが上がる）」。直並列での「Rの役割の逆転」を理解すると間違えにくい。
      </Callout>

      <h3>「オペアンプの仮想接地をいつ使えばいいかわからない」人向け</h3>
      <p><strong>仮想接地の適用手順：</strong></p>
      <ol>
        <li>負帰還があるか確認（出力から入力の－端子への帰還経路があるか）</li>
        <li>ある場合：V+ = V−（差動入力電圧＝0）と置く</li>
        <li>ない場合：仮想接地は使えない（オープンループ動作）</li>
      </ol>
      <Callout variant="info" title="電験3種の試験では">
        出題されるオペアンプ回路はほぼすべて負帰還あり。仮想接地を使ってKCLを立てれば、ゲイン式は必ず導出できる。
      </Callout>

      <h3>「力率改善でtanφとsinφを使い分けられない」人向け</h3>
      <p><strong>力率改善の計算ルート：</strong></p>
      <pre style={{background: "#f5f5f5", padding: "12px", borderRadius: "4px", fontSize: "0.9em"}}>
{`改善前: tanφ1 = Q1/P, sinφ1 = Q1/S1
改善後: tanφ2 = Q2/P
補償無効電力: ΔQ = Q1 − Q2 = P(tanφ1 − tanφ2)
コンデンサ容量: C = ΔQ/(ωV²) または ΔQ = V²ωC`}
      </pre>
      <Callout variant="tip" title="tanφとsinφのどちらを使うか">
        有効電力Pが既知のとき → <strong>tanφを使う</strong>（Q = P tanφ）。皮相電力Sが既知のとき → <strong>sinφを使う</strong>（Q = S sinφ）。力率改善の問題では有効電力Pが与えられることが多いのでtanφが主役。
      </Callout>

      <h3>問題タイプ → テーマ対応表</h3>
      <table>
        <thead>
          <tr><th>問題のキーワード / 内容</th><th>参照すべきテーマ</th></tr>
        </thead>
        <tbody>
          <tr><td>オームの法則、キルヒホッフ、テブナン、重ね合わせ</td><td>直流回路</td></tr>
          <tr><td>ブリッジ回路、平衡条件、ホイートストン</td><td>ブリッジ回路</td></tr>
          <tr><td>実効値、フェーザー、位相、角周波数</td><td>交流回路基礎</td></tr>
          <tr><td>インピーダンス、共振、Q値、半値幅</td><td>RLC回路</td></tr>
          <tr><td>有効電力、無効電力、力率、皮相電力</td><td>交流電力</td></tr>
          <tr><td>Y結線、Δ結線、三相電力、線間電圧</td><td>三相交流</td></tr>
          <tr><td>時定数、RC回路、RL回路、充放電</td><td>過渡現象</td></tr>
          <tr><td>クーロン力、電界、電位、電束密度</td><td>静電気</td></tr>
          <tr><td>静電容量、誘電体、コンデンサエネルギー</td><td>コンデンサ</td></tr>
          <tr><td>フレミング、電磁誘導、ファラデー、ローレンツ力</td><td>電磁力</td></tr>
          <tr><td>磁気回路、透磁率、起磁力、磁気抵抗</td><td>磁気回路</td></tr>
          <tr><td>自己インダクタンス、相互インダクタンス、結合係数</td><td>インダクタンス</td></tr>
          <tr><td>PN接合、ダイオード、整流作用</td><td>半導体</td></tr>
          <tr><td>トランジスタ、hFE、増幅回路、バイアス</td><td>トランジスタ</td></tr>
          <tr><td>オペアンプ、反転増幅、非反転増幅、イマジナリショート</td><td>オペアンプ</td></tr>
          <tr><td>可動コイル、可動鉄片、倍率器、分流器、計器記号</td><td>計器の原理</td></tr>
        </tbody>
      </table>

      <hr/>

      <h2 id="last-minute"><span className="h-num">§3</span>直前対策（圧縮版）</h2>
      <p>試験前日〜当日朝に「5秒で思い出す」だけ確認するためのページ。新しいことを学ぶ場所ではない。知っていることを「頭から取り出しやすい状態」にするために使う。</p>

      <Callout variant="warn" title="このページの使い方">
        前日に全部読んでも逆効果。自分が不安なテーマだけピンポイントで確認すること。「あ、そうだった」と思えればOK。「全然わからない」なら今更やっても間に合わない。
      </Callout>

      <h3>電気回路（5秒で思い出す）</h3>
      <Callout variant="tip" title="直流回路">
        <strong>V = IR、KCL（電流の和=0）、KVL（電圧の和=0）、テブナン（1つの電源+1つの抵抗に等価変換）</strong>
      </Callout>
      <Callout variant="tip" title="交流回路基礎">
        <strong>V = Vm/√2（実効値）、ELIのICE（コイルは電圧が進む、コンデンサは電流が進む）</strong>
      </Callout>
      <Callout variant="tip" title="RLC回路">
        <strong>Z = √(R² + (XL - XC)²)、共振条件 = XL = XC（そのとき Z = R が最小）</strong>
      </Callout>
      <Callout variant="tip" title="交流電力">
        <strong>P = VIcosφ（有効電力）、Q = VIsinφ（無効電力）、S² = P² + Q²（皮相電力）</strong>
      </Callout>
      <Callout variant="tip" title="三相交流">
        <strong>Y結線: 線間電圧 = √3 × 相電圧、線電流 = 相電流</strong><br/>
        <strong>Δ結線: 線間電圧 = 相電圧、線電流 = √3 × 相電流</strong>
      </Callout>
      <Callout variant="tip" title="過渡現象">
        <strong>τ = RC または τ = L/R（時定数）、時定数の時間で63%まで変化する</strong>
      </Callout>
      <Callout variant="tip" title="ブリッジ回路">
        <strong>平衡条件: R1R4 = R2R3（対角の積が等しい）、平衡時は中間抵抗に電流が流れない</strong>
      </Callout>

      <h3>電磁気（5秒で思い出す）</h3>
      <Callout variant="tip" title="静電気">
        <strong>F = Q1Q2/(4πε₀r²)（クーロンの法則）、平行平板: E = V/d、C = ε₀εrS/d</strong>
      </Callout>
      <Callout variant="tip" title="コンデンサ">
        <strong>C = ε₀εrS/d、直列は逆数の和の逆数（抵抗の並列と同じ計算）、並列は足し算</strong><br/>
        <strong>エネルギー W = CV²/2 = Q²/(2C)</strong>
      </Callout>
      <Callout variant="tip" title="電磁力">
        <strong>F = BIL（電磁力）、e = BLv（誘導起電力）、左手 = 力（モータ）、右手 = 起電力（発電）</strong>
      </Callout>
      <Callout variant="tip" title="磁気回路">
        <strong>φ = NI/Rm（磁束 = 起磁力/磁気抵抗）、電気回路との対応（φ↔I、NI↔V、Rm↔R）</strong>
      </Callout>
      <Callout variant="tip" title="インダクタンス">
        <strong>e = -L × dI/dt（自己誘導起電力）、W = LI²/2（コイルのエネルギー）</strong><br/>
        <strong>相互インダクタンス M = k√(L1L2)（k: 結合係数）</strong>
      </Callout>

      <h3>電子理論・電気計測（5秒で思い出す）</h3>
      <Callout variant="tip" title="半導体">
        <strong>N型 = 電子が多数キャリア（ドナー添加）、P型 = 正孔が多数キャリア（アクセプタ添加）</strong><br/>
        <strong>PN接合の順方向 = 電流が流れる、逆方向 = 電流がほぼ流れない</strong>
      </Callout>
      <Callout variant="tip" title="トランジスタ">
        <strong>IC = hFE × IB（コレクタ電流 = 電流増幅率 × ベース電流）、IE = IB + IC</strong>
      </Callout>
      <Callout variant="tip" title="オペアンプ">
        <strong>反転増幅: Av = -Rf/Ri（マイナスは位相反転）</strong><br/>
        <strong>非反転増幅: Av = 1 + Rf/Ri（常に1以上）</strong>
      </Callout>
      <Callout variant="tip" title="計器の原理">
        <strong>可動コイル形 = 直流専用（永久磁石で動く）</strong><br/>
        <strong>可動鉄片形 = 交直両用（実効値を指示）</strong><br/>
        <strong>倍率器 = 電圧計の直列抵抗、分流器 = 電流計の並列抵抗</strong>
      </Callout>

      <h3>試験当日のタイムライン</h3>
      <table>
        <thead>
          <tr><th>タイミング</th><th>やること</th></tr>
        </thead>
        <tbody>
          <tr><td>試験前日の夜</td><td>「5秒で思い出す」を不安なテーマだけ確認。新しいことは一切やらない</td></tr>
          <tr><td>当日の朝（家）</td><td>「7.2 直前3日戦略」の「当日朝 — 最重要確認表」を5分で黙読</td></tr>
          <tr><td>試験会場（開始前）</td><td>三相交流の √3 の使い分けだけ頭の中で確認</td></tr>
          <tr><td>試験中（問題を読んだ直後）</td><td>キーワードを見て「どのテーマか」を§2の対応表と照合</td></tr>
          <tr><td>試験中（計算後）</td><td>答えを出したら「答えの妥当性を確認」で異常値チェック</td></tr>
        </tbody>
      </table>

      <Callout variant="info" title="当日の心構え">
        理論は計算量が多い。時間配分を意識して「解けない問題に粘りすぎない」こと。得点しやすいテーマを先に片付けてから、難しい問題に戻る。
      </Callout>

      <hr/>

      <h2 id="score-strategy"><span className="h-num">§4</span>得点戦略</h2>
      <p>分野別の出題数と目標得点を逆算する。理論は100点満点・合格60点。安定して合格圏に乗せるには「電気回路で50点・電磁気で18点・電子で13点・計測で5点」を目安にする。</p>

      <h3>分野別 配点・目標得点マトリクス</h3>
      <table>
        <thead>
          <tr><th>分野</th><th>出題数（目安）</th><th>配点</th><th>目標正答率</th><th>目標得点</th></tr>
        </thead>
        <tbody>
          <tr><td>電気回路（直流・交流・三相・RLC・電力）</td><td>9〜10問</td><td>約55点</td><td>90%</td><td><strong>50点</strong></td></tr>
          <tr><td>電磁気（静電気・コンデンサ・電磁力・磁気回路）</td><td>3〜4問</td><td>約20点</td><td>90%</td><td><strong>18点</strong></td></tr>
          <tr><td>電子（半導体・トランジスタ・オペアンプ）</td><td>2〜3問</td><td>約15点</td><td>87%</td><td><strong>13点</strong></td></tr>
          <tr><td>計測（指示計・ブリッジ）</td><td>1問</td><td>約5点</td><td>100%</td><td><strong>5点</strong></td></tr>
          <tr><td><strong>合計</strong></td><td>15〜18問</td><td>100点</td><td>—</td><td><strong>86点</strong></td></tr>
        </tbody>
      </table>

      <Callout variant="tip" title="目標86点の意味">
        合格ラインは60点なので、各分野で目標通り取れれば余裕で合格。実戦では計算ミス・読み違いで20点程度は失点する想定でも、なお合格圏内に収まる設計。
      </Callout>

      <h3>得点を確実にするための優先順位</h3>
      <ol>
        <li><strong>電気回路で50点を確実に取る</strong> — 直流・交流・三相・RLC・電力の5本柱。問5〜9で固定3〜4問は安定得点源。ここを落とすと合格は厳しい。</li>
        <li><strong>電磁気で積み増し</strong> — 静電気・コンデンサ・電磁力が問1〜4でローテーション。原理を押さえれば派生問題も解ける。</li>
        <li><strong>電子は頻出4回路に絞る</strong> — 反転増幅・非反転増幅・BJT基本回路・FET基本回路。深追いせず、頻出パターンだけ確実に。</li>
        <li><strong>計測は短期決戦</strong> — 公式数が少なく、直前期に取り組むのが効率的。可動コイル・可動鉄片の使い分けと、倍率器・分流器が定番。</li>
      </ol>

      <Callout variant="warn" title="捨て科目の判断基準">
        残り期間が1ヶ月以内で、正答率が低く出題頻度も低いテーマは「捨てる」判断もあり得る。ただし、捨てるのは「確実に得点できるテーマが6割以上カバーできている」場合に限る。理論は他3科目の土台なので、原則として捨てない方針が安全。
      </Callout>

      <h3>試験まで1ヶ月の場合の絞り込み戦略</h3>
      <p>時間が限られている場合は、出題頻度×自分の正答率で優先順位をつける。</p>

      <table>
        <thead>
          <tr><th></th><th>正答率が高い（60%以上）</th><th>正答率が低い（60%未満）</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>出題頻度が高い</strong></td><td>維持（軽くおさらい）</td><td><strong>最優先で強化</strong></td></tr>
          <tr><td><strong>出題頻度が低い</strong></td><td>放置でOK</td><td>捨て科目候補</td></tr>
        </tbody>
      </table>

      <h3>最優先テーマ（試験1ヶ月前に確保すべき5テーマ）</h3>
      <ol>
        <li><strong>三相交流</strong> — 毎年出る・配点高い</li>
        <li><strong>RLC回路</strong> — 共振問題は計算パターンが固定</li>
        <li><strong>直流回路</strong> — 基礎固め直し</li>
        <li><strong>交流電力</strong> — 力率改善は公式適用で得点できる</li>
        <li><strong>過渡現象</strong> — 時定数さえ覚えれば計算は速い</li>
      </ol>

      <h3>よくある「間違えのパターン」別チェックリスト</h3>

      <h4>計算は合っているのに答えが違う</h4>
      <ul>
        <li>単位換算を間違えていないか（kΩ → Ω, μF → F）</li>
        <li>実効値と最大値を取り違えていないか</li>
        <li>√3 を掛け忘れ・割り忘れていないか（三相）</li>
        <li>逆数に戻し忘れていないか（並列合成・直列コンデンサ）</li>
      </ul>

      <h4>公式は知っているのに適用できない</h4>
      <ul>
        <li>問題の回路図を正しく読めているか（Y/Δの区別）</li>
        <li>どの値が「相量」でどの値が「線量」か確認したか</li>
        <li>フェーザー図を描いて位相関係を確認したか</li>
      </ul>

      <h4>そもそも解き方が分からない</h4>
      <p>→ §2「弱点別・過去問逆引き」の対応表で参照テーマを特定する。原理から再学習する。</p>

    </div>
    <PageNav
      prev={{ id: "glossary", title: "B 用語集・索引" }}
      next={{ id: "formulas", title: "D 公式集" }}
      onNav={onNav}
    />
  </>
);


/* ============================================================
   Export to window
   ============================================================ */
Object.assign(window, { HomePage, Last3DaysPage, RetakeStrategyPage, GuidePage });
