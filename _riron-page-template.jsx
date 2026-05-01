// ============================================================
// _riron-page-template.jsx
// 電験3種 理論wiki — ページ新規作成テンプレート
// 正典: TransistorPage (denken3-riron-wiki.html 行5135-5765)
// バージョン: v1.0  作成: 2026-04-28
// ============================================================
//
// 使い方:
//   1. このファイルをコピーして `_template` を削除、ページIDに改名
//   2. すべての [TODO: ...] を埋める
//   3. img/ フォルダに回路図PNGを用意する（後述）
//   4. SVG特性グラフをトピックに合わせて書き換える
//   5. RULE-43: h-num を必ず連番で確認してから貼り付ける
//
// 必要な画像ファイル（img/{topic}/ に置く）:
//   - {topic}-principle.png   : 原理図（§1 Callout内 img）
//   - {topic}-circuit-A.png   : 回路図A（§3 横並び）
//   - {topic}-circuit-B.png   : 回路図B（§3 横並び）
//   - {topic}-circuit-C.png   : 回路図C（§3 横並び、3方式比較の場合）
//   - {topic}-example.png     : 例題回路図（§4 img）
// ============================================================

const [TODO_PAGE_ID]Page = ({ onNav }) => (
  // last-updated: [TODO: YYYY-MM-DD] | v0.1
  <>
    {/* ====================================================
        BLOCK 1: ヘッダー群
        ==================================================== */}

    {/* PageHeader: タイトル・難易度・更新日を構造化表示 */}
    <PageHeader
      eyebrow="[TODO: X.Y] — [TODO: 副題（例: バイポーラ接合型・電界効果型）]"
      title="[TODO: ページタイトル]"
      deck="[TODO: 3行以内のサマリー。何を学ぶか・試験頻度・核心を入れる]"
      meta={[
        { label: "重要度", value: "[TODO: A/B/C]" },
        { label: "出題頻度", value: "[TODO: 高/中/低（問XX・問XX）]" },
        { label: "難易度", value: "[TODO: ★★★～★★★★★]" },
      ]}
      updatedAt="[TODO: YYYY.MM.DD]"
    />
    <MetaStrip
      difficulty="[TODO: ★★★]"
      importance="[TODO: A]"
      frequency="[TODO: 高]"
    />

    {/* TL;DR Callout: 必須。ページを30秒で掴む。核心公式・制御方式・試験頻出点を3〜5文で凝縮 */}
    <Callout variant="tip" title="ひとことで言うと">
      [TODO: 核心を3〜5文で凝縮。太字で重要語・markerで核心公式を強調。
       例）<strong>トランジスタ</strong>＝半導体3端子素子で「小信号→大電流」…]
    </Callout>

    <LearningMap
      prereqs={[
        { id: "[TODO: prev-id]", title: "[TODO: 前提ページ]" },
      ]}
      current="[TODO: このページタイトル]"
      nexts={[
        { id: "[TODO: next-id]", title: "[TODO: 次のページ]" },
      ]}
      onNav={onNav}
    />
    <Crumbs
      items={[
        { id: "home", label: "ホーム" },
        { label: "[TODO: 分野名（例: 5. 電子理論）]" },
      ]}
      onNav={onNav}
    />

    {/* FieldOverview: tree propは必須。概念ツリーで出題ウェイトを可視化 */}
    <FieldOverview
      fieldName="[TODO: フィールド名]"
      whatIs="[TODO: 80字以内で「何者か」「どこで使われるか」「現代での位置づけ」を述べる]"
      components={[
        { name: "[TODO: 主要コンポーネント1]", role: "[TODO: 役割]", testWeight: "high" },
        { name: "[TODO: 主要コンポーネント2]", role: "[TODO: 役割]", testWeight: "high" },
        { name: "[TODO: サブコンポーネント]",  role: "[TODO: 役割]", testWeight: "mid" },
        { name: "[TODO: 応用コンポーネント]",  role: "[TODO: 役割]", testWeight: "low" },
      ]}
      examScope="[TODO: 電験3種・理論「問XX」で頻出。何が試験範囲で何が範囲外かを明記]"
      prevNext={{
        prev: { id: "[TODO: prev-id]", title: "[TODO: 前ページ]", reason: "[TODO: 前提知識の接続]" },
        next: { id: "[TODO: next-id]", title: "[TODO: 次ページ]", reason: "[TODO: この知識がどう発展するか]" },
      }}
      tree={[
        {
          name: "[TODO: 大分類1]",
          testWeight: "high",
          note: "[TODO: 1行メモ]",
          children: [
            { name: "[TODO: 小分類1-1]", testWeight: "high", note: "[TODO: 1行メモ]" },
            { name: "[TODO: 小分類1-2]", testWeight: "mid" },
          ],
        },
        {
          name: "[TODO: 大分類2]",
          testWeight: "high",
          note: "[TODO: 1行メモ]",
        },
      ]}
      onNav={onNav}
    />

    {/* ====================================================
        §1 原理（なぜ起きるか）
        目的: 物理メカニズムを因果チェーンで説明 + 直感比喩 + 図
        ==================================================== */}
    <h2 id="principle"><span className="h-num">§1</span>原理（なぜ起きるか）</h2>

    {/* Analogy 1: 日常物品への第1比喩（蛇口・ダム・バルブなど） */}
    <Analogy type="[TODO: faucet/dam/valve]" icon="[TODO: 絵文字]">
      [TODO: Tooltipで専門用語を補足しながら、日常物品への比喩で原理を説明する。
       例）バイポーラトランジスタは「電流で電流を制御」する。ベース電流 IB が小さくても...]
    </Analogy>

    {/* Analogy 2: 別角度の第2比喩（あれば。原理の異なる側面を照らす） */}
    <Analogy type="[TODO: 2つ目の比喩キー]" icon="[TODO: 絵文字]">
      [TODO: 第1比喩では見えなかった側面を別の比喩で補足]
    </Analogy>

    {/* 物理メカニズムCallout: imgで原理図を入れる（G2対応: 図は必ずここで入れる） */}
    <Callout variant="note" title="[TODO: なぜ〜が起きるか（物理メカニズム）]">
      <img
        src="img/[TODO: topic]/[TODO: principle-diagram].png"
        alt="[TODO: 図の説明。Source情報もあれば記載]"
        style={{width:"100%",maxWidth:"500px",display:"block",margin:"0.4rem auto 0.8rem",borderRadius:"6px",background:"white"}}
      />
      [TODO: 因果チェーン: A → B → C の文章。markerで核心式を強調。
       例）BJTはPN接合×2の3層構造（NPN）。中央のベース層は数μmと薄いため…]
    </Callout>

    {/* 5秒Callout: 核心を箇条書きではなく1文で言い切る */}
    <Callout variant="tip" title="5秒で思い出す">
      [TODO: Tooltipで専門用語を補足。markerで核心公式を1〜2個ハイライト。
       例）BJT は電流制御（<span className="marker">IC = hFE × IB</span>）。FET は電圧制御…]
    </Callout>
    <p>[TODO: 概要文。3端子・制御方式・試験の核心を1〜2文で述べる]</p>

    {/* 概念イメージCallout（Q点・動作点など日常比喩で説明できる概念があれば） */}
    <Callout variant="tip" title="[TODO: 概念名]のイメージ（[TODO: 比喩道具]）">
      [TODO: シーソー・ダムの水門・ゲートなど日常物品への比喩でイメージを固める。
       「中央に設定すると…」「端に寄ると…」のような条件と結果の対比を入れる]
    </Callout>


    {/* ====================================================
        §2 公式
        目的: レイヤーA（基礎）→B（応用）の段階的提示 + 定数比較 + SVGグラフ
        ==================================================== */}
    <h2 id="formulas"><span className="h-num">§2</span>公式</h2>

    {/* 公式を見る前の前提Callout（記号の読み方・物理的前提） */}
    <Callout variant="note" title="[TODO: 記号の読み方 / この公式を使う前提]">
      [TODO: 記号の物理的意味を説明。例）hFE（フォワード電流利得）= IC/IB の比。]
    </Callout>

    {/* レイヤーA: デバイス単体の基本式（3〜4式） */}
    <FormulaTable layer="A" rows={[
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
    ]} />
    {/* 橋渡しテキスト: 「ここまでは〇〇。次は〇〇に進む」で読者を誘導 */}
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.6rem 0"}}>
      ↑ ここまでは「[TODO: 基礎レイヤーの概念名]」。次は「[TODO: 応用レイヤーの概念名]」に進む。
    </p>

    {/* サブセクション（応用計算・第2トピックなど） */}
    <h3>[TODO: サブセクション名（例: 直流動作点計算）]</h3>

    {/* レイヤーB: 回路に組み込んだときの計算式（3〜4式） */}
    <FormulaTable layer="B" rows={[
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
    ]} />
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.6rem 0"}}>
      ↑ ここまで[TODO: トピックA]。次の[TODO: トピックB]は[TODO: 違い・注意点]が変わる。
    </p>

    {/* 定数比較表: 混同しやすい2〜4定数がある場合は必ず入れる */}
    <p style={{fontSize:"0.9rem",fontWeight:600,margin:"0.6rem 0 0.3rem"}}>
      [TODO: N]つの定数を混同しない：
    </p>
    <table className="data-table" style={{fontSize:"0.9rem",margin:"0.2rem 0 0.8rem"}}>
      <thead><tr><th>定数</th><th>値</th><th>役割</th><th>使う場面</th></tr></thead>
      <tbody>
        <tr>
          <td><strong>[TODO: 定数1]</strong></td>
          <td><span className="marker">[TODO: 値]</span></td>
          <td>[TODO: 物理的役割]</td>
          <td>[TODO: いつ使うか]</td>
        </tr>
        <tr>
          <td><strong>[TODO: 定数2]</strong></td>
          <td><span className="marker">[TODO: 値]</span></td>
          <td>[TODO: 物理的役割]</td>
          <td>[TODO: いつ使うか]</td>
        </tr>
        <tr>
          <td><strong>[TODO: 定数3]</strong></td>
          <td><span className="marker">[TODO: 値/素子依存]</span></td>
          <td>[TODO: 物理的役割]</td>
          <td>[TODO: いつ使うか]</td>
        </tr>
      </tbody>
    </table>

    {/* サブセクション2（FET等、第2のデバイス・方式があれば） */}
    <h3>[TODO: サブセクション2名（例: FET公式）]</h3>
    <FormulaTable layer="B" rows={[
      { formula: "[TODO: 式]", meaning: "[TODO: 意味]", when: "[TODO: 成立条件]", notWhen: "[TODO: 不成立条件]" },
    ]} />

    {/* 公式の物理的前提Callout（グラフの前に物理イメージを提示 — G5対応） */}
    <Callout variant="note" title="[TODO: 核心概念]とは（公式の前提）">
      [TODO: 閾値電圧・仮想接地・空乏層など、公式を理解するために必要な物理的前提を説明。
       箇条書きで条件分岐（ON/OFF・飽和/遮断など）を整理する。]
    </Callout>

    {/* SVGグラフ1: 特性曲線（ID-VGS・IC-VCE・V-I特性など） */}
    {/* G2対応: これがなければ図1枚以上を満たせない。必ずトピックに合わせて書き直す */}
    <figure style={{margin:"0.8rem 0 0.4rem",textAlign:"center"}}>
      <svg viewBox="0 0 290 175" style={{width:"100%",maxWidth:"360px",display:"block",margin:"0 auto",fontSize:"10px"}}>
        {/* ===== TODO: トピックの特性グラフをここに描く =====
            最低限含めるべき要素:
            - 軸ラベル（X軸・Y軸）
            - 特性曲線（fill="none" stroke で描く）
            - 臨界点・動作点（circle で強調）
            - 領域ラベル（ON/OFF・飽和/能動など）
            - 軸矢印（polygon で矢印）
            TransistorPageのSVGを参考に書き換える
        ===================================================== */}
        {/* 軸 */}
        <line x1="40" y1="155" x2="265" y2="155" stroke="#64748b" strokeWidth="1.5"/>
        <line x1="40" y1="155" x2="40" y2="12" stroke="#64748b" strokeWidth="1.5"/>
        <polygon points="263,152 269,155 263,158" fill="#64748b"/>
        <polygon points="37,12 40,7 43,12" fill="#64748b"/>
        {/* X軸ラベル */}
        <text x="272" y="159" fill="#64748b">[TODO: X軸変数]</text>
        {/* Y軸ラベル */}
        <text x="10" y="12" fill="#64748b">[TODO: Y軸変数]</text>
        {/* 特性曲線 TODO: pathを書く */}
        <path d="M 80 155 C 100 155 130 148 160 121 C 190 90 215 50 240 19" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        {/* 臨界点 TODO: 座標を調整 */}
        <circle cx="160" cy="121" r="4" fill="#f59e0b" stroke="white" strokeWidth="2"/>
        {/* 領域テキスト */}
        <text x="58" y="95" fill="#94a3b8" textAnchor="middle">[TODO: 領域A]</text>
        <text x="178" y="150" fill="#16a34a">[TODO: 領域B]</text>
        {/* 曲線ラベル */}
        <text x="148" y="12" fill="#6366f1" textAnchor="middle">[TODO: 式ラベル]</text>
      </svg>
      <figcaption style={{fontSize:"0.8rem",color:"var(--ink-muted)",marginTop:"0.3rem"}}>
        図: [TODO: グラフの説明（軸の意味・何を示しているか）]
      </figcaption>
    </figure>


    {/* ====================================================
        §3 比較・まとめ表
        目的: 主要概念の対比 + 回路図横並び + ミニチェック + SVGグラフ
        ==================================================== */}
    <h2 id="comparison"><span className="h-num">§3</span>比較・まとめ表</h2>

    {/* メイン比較表: 支配因子行は必須（RULE-04/DESIGN-GUIDE §4） */}
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>[TODO: 比較対象A]</th>
          <th>[TODO: 比較対象B]</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>[TODO: 比較軸1]</td>
          <td><span className="marker">[TODO: Aの特徴]</span></td>
          <td><span className="marker">[TODO: Bの特徴]</span></td>
        </tr>
        <tr>
          <td>[TODO: 比較軸2]</td>
          <td>[TODO: Aの特徴]</td>
          <td>[TODO: Bの特徴]</td>
        </tr>
        <tr>
          <td>[TODO: 比較軸3]</td>
          <td>[TODO: Aの特徴]</td>
          <td>[TODO: Bの特徴]</td>
        </tr>
        {/* 支配因子行: 必須。「何が結果を決定するか」を明記 */}
        <tr>
          <td><strong>支配因子</strong></td>
          <td>[TODO: Aの支配因子。「〇〇が2倍になれば〜」の定量的記述を含める]</td>
          <td>[TODO: Bの支配因子。同様に定量的記述]</td>
        </tr>
      </tbody>
    </table>

    {/* サブ比較テーマ（3方式・3モードなど横比較が必要な場合） */}
    <h3>[TODO: サブ比較テーマ名（例: 接地方式の比較）]</h3>
    <p style={{fontSize:"0.95rem",margin:"0.6rem 0"}}>
      [TODO: 比較の軸・何に注目して比べるかを1文で説明]
    </p>

    {/* 回路図横並び: G2対応の回路図3枚（2〜3方式の比較に使う） */}
    <div style={{display:"flex",gap:"0.6rem",margin:"0.8rem 0 0.4rem",alignItems:"flex-start"}}>
      <figure style={{flex:1,margin:0,textAlign:"center"}}>
        <div style={{height:"180px",display:"flex",alignItems:"center",justifyContent:"center",background:"white",borderRadius:"6px",overflow:"hidden"}}>
          <img src="img/[TODO: topic]/[TODO: circuit-A].png" alt="[TODO: 回路名A]" style={{maxWidth:"100%",maxHeight:"180px",objectFit:"contain"}}/>
        </div>
        <figcaption style={{fontSize:"0.75rem",color:"var(--ink-muted)",marginTop:"0.3rem"}}>[TODO: 回路名A]<br/>（[TODO: 補足]）</figcaption>
      </figure>
      <figure style={{flex:1,margin:0,textAlign:"center"}}>
        <div style={{height:"180px",display:"flex",alignItems:"center",justifyContent:"center",background:"white",borderRadius:"6px",overflow:"hidden"}}>
          <img src="img/[TODO: topic]/[TODO: circuit-B].png" alt="[TODO: 回路名B]" style={{maxWidth:"100%",maxHeight:"180px",objectFit:"contain"}}/>
        </div>
        <figcaption style={{fontSize:"0.75rem",color:"var(--ink-muted)",marginTop:"0.3rem"}}>[TODO: 回路名B]</figcaption>
      </figure>
      <figure style={{flex:1,margin:0,textAlign:"center"}}>
        <div style={{height:"180px",display:"flex",alignItems:"center",justifyContent:"center",background:"white",borderRadius:"6px",overflow:"hidden"}}>
          <img src="img/[TODO: topic]/[TODO: circuit-C].png" alt="[TODO: 回路名C]" style={{maxWidth:"100%",maxHeight:"180px",objectFit:"contain"}}/>
        </div>
        <figcaption style={{fontSize:"0.75rem",color:"var(--ink-muted)",marginTop:"0.3rem"}}>[TODO: 回路名C]</figcaption>
      </figure>
    </div>

    {/* サブ比較テーブル（3方式の特性比較など） */}
    <table className="data-table">
      <thead>
        <tr>
          <th>項目</th>
          <th>[TODO: 方式A]</th>
          <th>[TODO: 方式B]</th>
          <th>[TODO: 方式C]</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{background:"var(--bg-sunken)"}}>
          <td><strong>[TODO: 比較軸1]</strong></td>
          <td>[TODO]</td><td>[TODO]</td><td>[TODO]</td>
        </tr>
        <tr style={{background:"var(--bg-sunken)"}}>
          <td><strong>[TODO: 比較軸2]</strong></td>
          <td>[TODO]</td><td>[TODO]</td><td>[TODO]</td>
        </tr>
        <tr>
          <td>[TODO: 比較軸3]</td>
          <td>[TODO]</td><td>[TODO]</td><td>[TODO]</td>
        </tr>
        <tr>
          <td>[TODO: 比較軸4]</td>
          <td>[TODO]</td><td>[TODO]</td><td>[TODO]</td>
        </tr>
        {/* 支配因子行: サブテーブルにも必須 */}
        <tr>
          <td><strong>支配因子</strong></td>
          <td>[TODO: 方式Aの支配因子]</td>
          <td>[TODO: 方式Bの支配因子]</td>
          <td>[TODO: 方式Cの支配因子]</td>
        </tr>
      </tbody>
    </table>

    {/* §3内ミニチェック: インラインでquizを入れる（理解定着） */}
    <details style={{margin:"0.8rem 0",border:"1px solid var(--border)",borderRadius:"8px",padding:"0.6rem 1rem",background:"var(--bg-sunken)"}}>
      <summary style={{cursor:"pointer",fontWeight:700,fontSize:"0.9rem",color:"var(--accent)"}}>
        ⚡ ミニチェック：[TODO: テーマ名]（タップして確認）
      </summary>
      <ol style={{margin:"0.8rem 0 0",paddingLeft:"1.2rem",fontSize:"0.9rem",lineHeight:1.8}}>
        <li>[TODO: Q1] → <span className="marker">[TODO: A1]</span></li>
        <li>[TODO: Q2] → <span className="marker">[TODO: A2]</span></li>
        <li>[TODO: Q3] → <span className="marker">[TODO: A3]</span></li>
      </ol>
    </details>
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.4rem 0 0.8rem"}}>
      💡 <strong>覚え方</strong>：[TODO: 1行で覚えやすいルール・語呂合わせ禁止・因果ベース]
    </p>

    {/* SVGグラフ2: 動作特性・ロードライン・モード図など */}
    <figure style={{margin:"0.8rem 0",textAlign:"center"}}>
      <svg viewBox="0 0 320 210" style={{width:"100%",maxWidth:"400px",display:"block",margin:"0 auto",fontSize:"10px"}}>
        {/* TODO: §2のSVGと同様に書く。このグラフは「比較・動作領域」を示す図にする */}
        {/* 軸 */}
        <line x1="40" y1="180" x2="290" y2="180" stroke="#64748b" strokeWidth="1.5"/>
        <line x1="40" y1="180" x2="40" y2="15" stroke="#64748b" strokeWidth="1.5"/>
        <polygon points="288,177 294,180 288,183" fill="#64748b"/>
        <polygon points="37,15 40,10 43,15" fill="#64748b"/>
        <text x="297" y="184" fill="#64748b">[TODO: X軸]</text>
        <text x="10" y="14" fill="#64748b">[TODO: Y軸]</text>
        {/* TODO: 特性曲線・ロードライン・動作点などを描く */}
        <text x="150" y="100" fill="#94a3b8" textAnchor="middle">[TODO: グラフを書く]</text>
      </svg>
      <figcaption style={{fontSize:"0.8rem",color:"var(--ink-muted)",marginTop:"0.3rem"}}>
        図: [TODO: グラフの説明]
      </figcaption>
    </figure>

    {/* 動作領域/モード別テーブル（飽和・能動・遮断など状態比較があれば） */}
    <h3>[TODO: 動作状態の比較（例: BJTの動作領域）]</h3>
    <table className="data-table">
      <thead>
        <tr><th>領域/状態</th><th>条件</th><th>特徴</th><th>用途</th><th>[TODO: 閾値]</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>[TODO: 状態A]</strong></td>
          <td>[TODO: 条件]</td>
          <td>[TODO: 特徴]</td>
          <td>[TODO: 用途]</td>
          <td>[TODO: 数値]</td>
        </tr>
        <tr>
          <td><span className="marker"><strong>[TODO: 状態B（メイン）]</strong></span></td>
          <td>[TODO: 条件]</td>
          <td>[TODO: 特徴]</td>
          <td>[TODO: 用途]</td>
          <td>[TODO: 数値]</td>
        </tr>
        <tr>
          <td><strong>[TODO: 状態C]</strong></td>
          <td>[TODO: 条件]</td>
          <td>[TODO: 特徴]</td>
          <td>[TODO: 用途]</td>
          <td>[TODO: 数値]</td>
        </tr>
      </tbody>
    </table>
    <Callout variant="tip" title="[TODO: 判定方法の名称]">
      [TODO: 「どの値を見れば状態がわかるか」を明記。物理的な本質も添える。]
    </Callout>


    {/* ====================================================
        §4 例題
        目的: 定義→計算→応用の3題。各題にツボCallout必須
        ==================================================== */}
    <h2 id="examples"><span className="h-num">§4</span>例題</h2>

    {/* 単位ミス予防Callout: 全ページ共通 */}
    <Callout variant="warning" title="単位ミス予防（電験頻出落とし穴）">
      <strong>mA ↔ A</strong>（×10⁻³）、<strong>kΩ ↔ Ω</strong>（×10³）、<strong>μF ↔ F</strong>（×10⁻⁶）。電卓に入れる前に<strong>基本単位（A・Ω・V）に揃える</strong>こと。単位を混在させたまま計算すると桁を3つ間違えるのが定番ミス。
    </Callout>

    {/* 例題1: 定義・基本計算（穴埋め系問題に対応） */}
    <Callout variant="note" title="例題1：[TODO: テーマ（定義/基本計算）]">
      [TODO: 問題文。数値・条件を明記]
    </Callout>
    <details>
      <summary>解答・解説</summary>
      <p>[TODO: 計算過程を<Eq tex="..."/>で書く。STEPに分ける必要があれば分ける]</p>
      <p><strong>ポイント：</strong>[TODO: この問題で覚えるべき1点]</p>
    </details>
    <Callout variant="tip" title="例題1のツボ">
      [TODO: 解法パターンを1〜3文で圧縮。「〇〇のときは必ず□□から始める」形式が理想]
    </Callout>

    {/* 例題2: 計算問題（バイアス回路・特性曲線などSTEP計算） */}
    <img
      src="img/[TODO: topic]/[TODO: example-circuit].png"
      alt="[TODO: 例題回路の説明]"
      style={{width:"100%",maxWidth:"280px",display:"block",margin:"0.6rem auto 0.4rem",borderRadius:"6px",background:"white"}}
    />
    <Callout variant="note" title="例題2：[TODO: テーマ（回路計算）]">
      [TODO: 問題文。数値・回路定数を明記]
    </Callout>
    <details>
      <summary>解答・解説（[TODO: N]ステップ）</summary>
      <p><strong>STEP1：[TODO: ステップ名]</strong></p>
      <p>[TODO: <Eq tex="..."/>]</p>
      <p><strong>STEP2：[TODO: ステップ名]</strong></p>
      <p>[TODO: <Eq tex="..."/>]</p>
      <p><strong>STEP3：[TODO: ステップ名]</strong></p>
      <p>[TODO: <Eq tex="..."/>]</p>
      <p><strong>確認：</strong>[TODO: 計算結果の検算・物理的妥当性確認]</p>
    </details>
    <Callout variant="tip" title="例題2のツボ（[TODO: パターン名]）">
      [TODO: 「STEP1→2→3の黄金パターン」という形式で解法を圧縮。最後に注意点1つ]
    </Callout>

    {/* 例題3: 応用・最悪ケース（実務寄りの出題に対応） */}
    <Callout variant="note" title="例題3：[TODO: テーマ（応用/R07類題）]">
      [TODO: 問題文。実際の電験過去問に近い形式で]
    </Callout>
    <details>
      <summary>解答・解説</summary>
      <p><strong>STEP1：[TODO: 動作確認]</strong></p>
      <p>[TODO: まず「成立条件を確認する」ステップを入れる]</p>
      <p><strong>STEP2：[TODO: 計算]</strong></p>
      <p>[TODO: <Eq tex="..."/>]</p>
      <p><strong>確認：</strong>[TODO: ✓マークで検証]</p>
    </details>
    <Callout variant="tip" title="例題3のツボ（[TODO: FET/応用]黄金パターン）">
      [TODO: 「①確認→②計算→③単位チェック」のパターン。BJTと何が違うかを対比で述べる]
    </Callout>


    {/* ====================================================
        §5 引っかけポイント
        目的: TrapBlock 4〜6個。RULE-05: wisdomは必須
        ==================================================== */}
    <h2 id="traps"><span className="h-num">§5</span>引っかけポイント</h2>

    {/* TrapBlock: 絵文字【カテゴリ系】の形式で冒頭を統一 */}
    <TrapBlock
      correct="⚡【[TODO: カテゴリ]系】[TODO: 正答の核心。何が正しいか]"
      trap="[TODO: 典型的な誤解・試験で引っかかるパターン]"
      steps={[
        "[TODO: 手順1: まず〇〇を確認する]",
        "[TODO: 手順2: 〇〇の場合は□□]",
        "[TODO: 手順3: 最終確認]",
      ]}
      wisdom="[TODO: 正答者の思考パターン。「〜を見た瞬間に〜を宣言する」「〜と〜を切り分ける」形式。1〜2文]"
    />
    <TrapBlock
      correct="🔀【[TODO: カテゴリ]系】[TODO: 正答の核心]"
      trap="[TODO: 典型的な誤解]"
      steps={[
        "[TODO: 手順1]",
        "[TODO: 手順2]",
        "[TODO: 手順3]",
      ]}
      wisdom="[TODO: 正答者の思考パターン]"
    />
    <TrapBlock
      correct="📐【[TODO: カテゴリ]系】[TODO: 正答の核心]"
      trap="[TODO: 典型的な誤解]"
      steps={[
        "[TODO: 手順1]",
        "[TODO: 手順2]",
        "[TODO: 手順3]",
      ]}
      wisdom="[TODO: 正答者の思考パターン]"
    />
    <TrapBlock
      correct="🔁【[TODO: カテゴリ]系】[TODO: 正答の核心]"
      trap="[TODO: 典型的な誤解]"
      steps={[
        "[TODO: 手順1]",
        "[TODO: 手順2]",
        "[TODO: 手順3]",
      ]}
      wisdom="[TODO: 正答者の思考パターン]"
    />
    {/* TrapBlock追加: 5〜6個推奨。TransistorPageは5個 */}


    {/* ====================================================
        実務でどう活きる（h-numは"実務"で固定）
        ==================================================== */}
    <h2 id="practical"><span className="h-num">実務</span>実務でどう活きる</h2>
    <Callout variant="tip" title="プラント電気・計装での使われどころ">
      [TODO: プラント・製造現場でのリアルなシーン。「故障モード」「現地判断」「計装応用」から選ぶ]
    </Callout>
    <p style={{fontSize:"0.9rem",color:"var(--ink-muted)",margin:"0.6rem 0"}}>
      現場では、[TODO: トピック]知識は<span className="marker">[TODO: 用途1]</span>・<span className="marker">[TODO: 用途2]</span>・<span className="marker">[TODO: 用途3]</span>の3用途に集約される。試験で身につけた[TODO: 公式/パラメータ]はそのままこの3つに対応する。
    </p>
    <table className="data-table">
      <thead>
        <tr><th>現場シーン</th><th>効いている物理</th><th>技術者の判断</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>[TODO: 現場シーン1]</td>
          <td>[TODO: 効いている物理現象・公式]</td>
          <td>[TODO: 現場での判断基準・処置]</td>
        </tr>
        <tr>
          <td>[TODO: 現場シーン2]</td>
          <td>[TODO: 効いている物理現象・公式]</td>
          <td>[TODO: 現場での判断基準・処置]</td>
        </tr>
        <tr>
          <td>[TODO: 現場シーン3]</td>
          <td>[TODO: 効いている物理現象・公式]</td>
          <td>[TODO: 現場での判断基準・処置]</td>
        </tr>
      </tbody>
    </table>


    {/* ====================================================
        MinimumSet
        目的: 試験直前にここだけ見れば解ける
        ==================================================== */}
    <MinimumSet
      formulas={[
        "[TODO: 式1（文字列）]",
        "[TODO: 式2]",
        "[TODO: 式3]",
        "[TODO: 式4]",
        "[TODO: 式5]",
      ]}
      rules={[
        "[TODO: ルール1: 〇〇のとき→□□]",
        "[TODO: ルール2]",
        "[TODO: ルール3]",
        "[TODO: ルール4]",
      ]}
      patterns={[
        "[TODO: 解法パターン1: ①〜 → ② → ③]",
        "[TODO: 解法パターン2]",
        "[TODO: 解法パターン3]",
      ]}
    />


    {/* ====================================================
        理解度セルフチェック 5問（Active Recall）
        DESIGN-GUIDE G3対応: Q1定義 / Q2計算 / Q3応用 の最低3問 + 補足2問
        スタイル付きdivで包む（rawな<details>は使わない）
        ==================================================== */}
    <div style={{background:"var(--bg-sunken)",border:"1px solid var(--border)",borderRadius:"10px",padding:"1rem 1.2rem",margin:"1.5rem 0"}}>
      <p style={{fontWeight:700,marginBottom:"0.4rem",color:"var(--accent)"}}>🎯 理解度セルフチェック 5問</p>
      <p style={{fontSize:"0.85rem",color:"var(--ink-muted)",marginBottom:"0.8rem"}}>
        各問を声に出して答えてから ▶ を開いてください。即答できない問は該当セクションを再読。
      </p>
      {/* Q1: 定義系 */}
      <details style={{marginBottom:"0.5rem",borderTop:"1px solid var(--border)",paddingTop:"0.4rem"}}>
        <summary style={{cursor:"pointer",fontWeight:600,fontSize:"0.9rem",listStyle:"none"}}>
          ▶ Q1. [TODO: 核心定義を問う] <span style={{fontSize:"0.8rem",color:"var(--ink-muted)"}}>（§1で確認）</span>
        </summary>
        <p style={{margin:"0.4rem 0 0 0.8rem",fontSize:"0.9rem"}}>
          <span className="marker">[TODO: 答え]</span>。[TODO: 補足説明]
        </p>
      </details>
      {/* Q2: 計算・成立条件系 */}
      <details style={{marginBottom:"0.5rem",borderTop:"1px solid var(--border)",paddingTop:"0.4rem"}}>
        <summary style={{cursor:"pointer",fontWeight:600,fontSize:"0.9rem",listStyle:"none"}}>
          ▶ Q2. [TODO: 計算/成立条件を問う] <span style={{fontSize:"0.8rem",color:"var(--ink-muted)"}}>（§2で確認）</span>
        </summary>
        <p style={{margin:"0.4rem 0 0 0.8rem",fontSize:"0.9rem"}}>
          <span className="marker">[TODO: 答え]</span>。[TODO: 補足説明]
        </p>
      </details>
      {/* Q3: 応用・最悪ケース系 */}
      <details style={{marginBottom:"0.5rem",borderTop:"1px solid var(--border)",paddingTop:"0.4rem"}}>
        <summary style={{cursor:"pointer",fontWeight:600,fontSize:"0.9rem",listStyle:"none"}}>
          ▶ Q3. [TODO: 応用/なぜ系を問う] <span style={{fontSize:"0.8rem",color:"var(--ink-muted)"}}>（§3で確認）</span>
        </summary>
        <p style={{margin:"0.4rem 0 0 0.8rem",fontSize:"0.9rem"}}>
          <span className="marker">[TODO: 答え]</span>。[TODO: 補足説明]
        </p>
      </details>
      {/* Q4: 比較・見分け方系 */}
      <details style={{marginBottom:"0.5rem",borderTop:"1px solid var(--border)",paddingTop:"0.4rem"}}>
        <summary style={{cursor:"pointer",fontWeight:600,fontSize:"0.9rem",listStyle:"none"}}>
          ▶ Q4. [TODO: 混同しやすい2つの違いを問う] <span style={{fontSize:"0.8rem",color:"var(--ink-muted)"}}>（§2で確認）</span>
        </summary>
        <p style={{margin:"0.4rem 0 0 0.8rem",fontSize:"0.9rem"}}>
          <span className="marker">[TODO: 答えA]</span>：[TODO: 説明A]。<br/>
          <span className="marker">[TODO: 答えB]</span>：[TODO: 説明B]。
        </p>
      </details>
      {/* Q5: 現場・実務系 */}
      <details style={{borderTop:"1px solid var(--border)",paddingTop:"0.4rem"}}>
        <summary style={{cursor:"pointer",fontWeight:600,fontSize:"0.9rem",listStyle:"none"}}>
          ▶ Q5. [TODO: 現場シーンでの判断を問う] <span style={{fontSize:"0.8rem",color:"var(--ink-muted)"}}>（§4で確認）</span>
        </summary>
        <p style={{margin:"0.4rem 0 0 0.8rem",fontSize:"0.9rem"}}>
          [TODO: 答え。<span className="marker">クリッピング</span>のようにmarkerで強調]
        </p>
      </details>
    </div>


    {/* ====================================================
        §6 出題実績
        ==================================================== */}
    <h2 id="exam-history"><span className="h-num">§6</span>出題実績</h2>
    <table className="data-table">
      <thead>
        <tr><th>年度</th><th>問</th><th>形式</th><th>何が問われたか</th></tr>
      </thead>
      <tbody>
        {/* TODO: 過去問データを入れる（新しい順） */}
        <tr><td>R07上</td><td>問[TODO]</td><td>[TODO: 計算/穴埋]</td><td>[TODO: 出題内容]</td></tr>
        <tr><td>R06下</td><td>問[TODO]</td><td>[TODO]</td><td>[TODO]</td></tr>
        <tr><td>R06上</td><td>問[TODO]</td><td>[TODO]</td><td>[TODO]</td></tr>
      </tbody>
    </table>
    <p>→ 出題頻度: [TODO: ★1〜5]（[TODO: 頻度コメント]）</p>

    {/* 知識フロー表: 前後ページとのつながりを明示 */}
    <div style={{background:"var(--bg-sunken)",border:"1px solid var(--border)",borderRadius:"10px",padding:"1rem 1.2rem",margin:"0 0 1.5rem",fontSize:"0.9rem"}}>
      <p style={{fontWeight:700,marginBottom:"0.6rem",color:"var(--accent)"}}>
        📐 学習後の全体確認：[TODO: 前ページ] → [TODO: 現ページ] → [TODO: 次ページ] の知識の流れ
      </p>
      <table className="data-table" style={{marginBottom:"0.7rem"}}>
        <thead>
          <tr>
            <th></th>
            <th>[TODO: 前ページ名]</th>
            <th style={{background:"var(--accent-soft)"}}>[TODO: 現ページ] ← 今ここ</th>
            <th>[TODO: 次ページ名]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>抽象レベル</strong></td>
            <td>[TODO: 前のレベル（例: 素材・物性）]</td>
            <td>[TODO: 現レベル（例: デバイス動作）]</td>
            <td>[TODO: 次のレベル（例: 理想化集積回路）]</td>
          </tr>
          <tr>
            <td><strong>核心概念</strong></td>
            <td>[TODO: 前ページの核心]</td>
            <td>[TODO: 現ページの核心]</td>
            <td>[TODO: 次ページの核心]</td>
          </tr>
          <tr>
            <td><strong>次段への引き継ぎ</strong></td>
            <td>[TODO: 前ページ→現ページへの知識接続]</td>
            <td>[TODO: 現ページ→次ページへの知識接続]</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
      <Callout variant="tip" title="[TODO: 次ページ]での「知識の使われ方」">
        [TODO: この知識が次のページでどのように使われるか・何が簡略化されるかを説明]
      </Callout>
    </div>


    {/* ====================================================
        §7 関連項目
        G6対応: 必ず3本以上のonNavリンク
        ==================================================== */}
    <h2 id="related"><span className="h-num">§7</span>関連項目</h2>
    <ul>
      <li>
        <a href="#[TODO: prev-id]" onClick={(e)=>{e.preventDefault();onNav&&onNav('[TODO: prev-id]');}} style={{color:"var(--accent)",cursor:"pointer"}}>
          [TODO: 前ページタイトル]
        </a> — [TODO: このページとの関係・前提知識]
      </li>
      <li>
        <a href="#[TODO: next-id]" onClick={(e)=>{e.preventDefault();onNav&&onNav('[TODO: next-id]');}} style={{color:"var(--accent)",cursor:"pointer"}}>
          [TODO: 次ページタイトル]
        </a> — [TODO: このページの知識がどう発展するか]
      </li>
      <li>[TODO: 3本目: 関連分野・法規・実務テーマ] — [TODO: 関係]</li>
    </ul>


    {/* ====================================================
        用語集（glossary）
        略語・専門用語が4個以上あるページは必ず入れる
        ==================================================== */}
    <h2 id="glossary">用語集</h2>
    <table className="data-table">
      <thead>
        <tr><th>略語・用語</th><th>正式名称</th><th>一言で言うと</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>[TODO: 略語1]</strong></td>
          <td>[TODO: 正式名称]<br/><small>[TODO: 英語表記]</small></td>
          <td>[TODO: 一言説明。公式・数値を含めると◎]</td>
        </tr>
        <tr>
          <td><strong>[TODO: 略語2]</strong></td>
          <td>[TODO: 正式名称]<br/><small>[TODO: 英語表記]</small></td>
          <td>[TODO: 一言説明]</td>
        </tr>
        <tr>
          <td><strong>[TODO: 用語3]</strong></td>
          <td>[TODO: 正式名称]<br/><small>[TODO: 英語表記]</small></td>
          <td>[TODO: 一言説明]</td>
        </tr>
        {/* TODO: 全略語・専門用語を網羅する */}
      </tbody>
    </table>

    <PageNav
      prev={{id:"[TODO: prev-id]", title:"[TODO: 前ページ番号・タイトル]"}}
      next={{id:"[TODO: next-id]", title:"[TODO: 次ページ番号・タイトル]"}}
      onNav={onNav}
    />
  </>
);
