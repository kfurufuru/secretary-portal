// hoki-pages.jsx — 法規Wiki ページ定義ファイル
// Babel CDN でブラウザ変換。import 文なし。グローバルスコープ定義。

// ─────────────────────────────────────────────
// 1. renderPage（必須・グローバル定義）
// ─────────────────────────────────────────────
window.renderPage = function(page, navigate) {
  const props = { onNav: navigate, data: window.WIKI_DATA };
  switch (page) {
    case 'top':                    return React.createElement(HomePage, props);
    case 'zetsuen-tairyoku':       return React.createElement(StubPage, { ...props, pageId: 'zetsuen-tairyoku' });
    case 'denatsu-kouka':          return React.createElement(StubPage, { ...props, pageId: 'denatsu-kouka' });
    case 'shisen-hikisama':        return React.createElement(StubPage, { ...props, pageId: 'shisen-hikisama' });
    case 'henshatsuki-koritu':     return React.createElement(StubPage, { ...props, pageId: 'henshatsuki-koritu' });
    case 'ryokuritsu-kaizen':      return React.createElement(StubPage, { ...props, pageId: 'ryokuritsu-kaizen' });
    case 'juyoritsu-keisan':       return React.createElement(StubPage, { ...props, pageId: 'juyoritsu-keisan' });
    case 'bshu-setsuchi':          return React.createElement(StubPage, { ...props, pageId: 'bshu-setsuchi' });
    case 'setsuchi-ichiran':       return React.createElement(SetsuchiIchiranPage, props);
    case 'zetsuen-ichiran':        return React.createElement(ZetsuenIchiranPage, props);
    case 'rikkaku-ichiran':        return React.createElement(RikkakuIchiranPage, props);
    case 'den-atsu-kubun':         return React.createElement(DenAtsuKubunPage, props);
    case 'densen-size':            return React.createElement(StubPage, { ...props, pageId: 'densen-size' });
    case 'hokoku-todoke-kigen':    return React.createElement(HokokuTodokeKigenPage, props);
    case 'denro-zetsuen':          return React.createElement(StubPage, { ...props, pageId: 'denro-zetsuen' });
    case 'setsuchi-koji':          return React.createElement(StubPage, { ...props, pageId: 'setsuchi-koji' });
    case 'densenro':               return React.createElement(StubPage, { ...props, pageId: 'densenro' });
    case 'okunai-haisen':          return React.createElement(StubPage, { ...props, pageId: 'okunai-haisen' });
    case 'kako-denryu':            return React.createElement(StubPage, { ...props, pageId: 'kako-denryu' });
    case 'chichuu-densenro':       return React.createElement(StubPage, { ...props, pageId: 'chichuu-densenro' });
    case 'bunsangata-dengen':      return React.createElement(StubPage, { ...props, pageId: 'bunsangata-dengen' });
    case 'gijutsu-kijun-gaiyou':   return React.createElement(StubPage, { ...props, pageId: 'gijutsu-kijun-gaiyou' });
    case 'kosakubutsu-bunrui':     return React.createElement(StubPage, { ...props, pageId: 'kosakubutsu-bunrui' });
    case 'shunin-gijutsusya':      return React.createElement(StubPage, { ...props, pageId: 'shunin-gijutsusya' });
    case 'hoan-kitei':             return React.createElement(StubPage, { ...props, pageId: 'hoan-kitei' });
    case 'shiyo-jishu-kensa':      return React.createElement(StubPage, { ...props, pageId: 'shiyo-jishu-kensa' });
    case 'jiko-hokoku':            return React.createElement(StubPage, { ...props, pageId: 'jiko-hokoku' });
    case 'denki-yohin-anzen':      return React.createElement(StubPage, { ...props, pageId: 'denki-yohin-anzen' });
    case 'koji-shi-ho':            return React.createElement(KojiShiHoPage, props);
    case 'koji-gyoho':             return React.createElement(StubPage, { ...props, pageId: 'koji-gyoho' });
    case 'furyoku-gijutsukijun':   return React.createElement(StubPage, { ...props, pageId: 'furyoku-gijutsukijun' });
    case 'taiyouchi-gijutsukijun': return React.createElement(StubPage, { ...props, pageId: 'taiyouchi-gijutsukijun' });
    case 'keito-renkei':           return React.createElement(StubPage, { ...props, pageId: 'keito-renkei' });
    case 'juyoritsu-gainen':       return React.createElement(StubPage, { ...props, pageId: 'juyoritsu-gainen' });
    case 'furitsu':                return React.createElement(StubPage, { ...props, pageId: 'furitsu' });
    case 'futorito':               return React.createElement(StubPage, { ...props, pageId: 'futorito' });
    case 'hensyatsuki-yoryo':      return React.createElement(StubPage, { ...props, pageId: 'hensyatsuki-yoryo' });
    case 'haiden-kanri':           return React.createElement(StubPage, { ...props, pageId: 'haiden-kanri' });
    case 'juden-setsubi-kanri':    return React.createElement(StubPage, { ...props, pageId: 'juden-setsubi-kanri' });
    case 'kakomon-b':              return React.createElement(StubPage, { ...props, pageId: 'kakomon-b' });
    case 'kakomon-setsuchi':       return React.createElement(StubPage, { ...props, pageId: 'kakomon-setsuchi' });
    case 'kakomon-zetsuen':        return React.createElement(StubPage, { ...props, pageId: 'kakomon-zetsuen' });
    case 'kakomon-shunin':         return React.createElement(StubPage, { ...props, pageId: 'kakomon-shunin' });
    case 'kakomon-hoan':           return React.createElement(StubPage, { ...props, pageId: 'kakomon-hoan' });
    case 'kakomon-jiko':           return React.createElement(StubPage, { ...props, pageId: 'kakomon-jiko' });
    case 'kakomon-densenro':       return React.createElement(StubPage, { ...props, pageId: 'kakomon-densenro' });
    case 'kakomon-saiene':         return React.createElement(StubPage, { ...props, pageId: 'kakomon-saiene' });
    case 'kakomon-random':         return React.createElement(RandomModePage, props);
    case 'chokuzen-suuchi':        return React.createElement(StubPage, { ...props, pageId: 'chokuzen-suuchi' });
    case 'chokuzen-formula':       return React.createElement(StubPage, { ...props, pageId: 'chokuzen-formula' });
    case 'chokuzen-hikkake':       return React.createElement(StubPage, { ...props, pageId: 'chokuzen-hikkake' });
    case 'chokuzen-machigai':      return React.createElement(StubPage, { ...props, pageId: 'chokuzen-machigai' });
    default:                       return React.createElement(StubPage, { ...props, pageId: page });
  }
};

// ─────────────────────────────────────────────
// 2. StubPage（スタブ共通コンポーネント）
// ─────────────────────────────────────────────
function StubPage({ pageId, data, onNav }) {
  const pageInfo = React.useMemo(() => {
    if (!data) return null;
    for (const ch of data.chapters) {
      const p = ch.pages.find(p => p.id === pageId);
      if (p) return { ...p, chTitle: ch.title };
    }
    return null;
  }, [pageId, data]);

  const title = pageInfo ? pageInfo.title : pageId;
  const rank  = pageInfo ? pageInfo.rank  : '—';
  const freq  = pageInfo ? pageInfo.freq  : '—';

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 6 }}>
          {pageInfo ? pageInfo.chTitle : 'ページ'}
        </div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{title}</h1>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {rank !== '—' && <span className={`rank rank-${rank}`}>{rank}</span>}
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>出題頻度: {freq}</span>
          {pageInfo && pageInfo.examType && (
            <span className="tag">{pageInfo.examType}</span>
          )}
        </div>
      </div>

      {pageInfo && pageInfo.twin && (
        <div style={{
          background: 'var(--bg-elev)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--ink-2)',
        }}>
          双子ページ: <button
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0, fontSize: 13 }}
            onClick={() => onNav(pageInfo.twin)}
          >
            {pageInfo.twin} →
          </button>
        </div>
      )}

      <div style={{
        background: 'var(--bg-elev)',
        border: '2px dashed var(--border)',
        borderRadius: 'var(--radius)',
        padding: '32px 20px',
        textAlign: 'center',
        color: 'var(--ink-3)',
      }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🚧</div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>作成中</div>
        <div style={{ fontSize: 13 }}>このページはまだ作成されていません。</div>
      </div>

      <div style={{ marginTop: 24 }}>
        <button
          style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, padding: 0 }}
          onClick={() => onNav('top')}
        >
          ← トップに戻る
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. HomePage（トップページ）
// ─────────────────────────────────────────────

// 教材CH対応表データ
const CH_TABLE = [
  { ch: 'CH04 計算',      content: 'B問題対策',           rank: 'S', order: 1, wiki: '01 B問題' },
  { ch: 'CH03 技術基準',  content: '接地・絶縁・電線路',   rank: 'S', order: 2, wiki: '02+03' },
  { ch: 'CH01 電気事業法',content: '主任技術者・保安規程', rank: 'S', order: 3, wiki: '04 法令' },
  { ch: 'CH06 施設管理',  content: '需要率・負荷率など',   rank: 'A', order: 4, wiki: '06 施設管理' },
  { ch: 'CH02 その他法令',content: '工事士法・用品安全法', rank: 'A', order: 5, wiki: '04 法令' },
  { ch: 'CH05 再エネ',    content: '風力・太陽光',         rank: 'B', order: 6, wiki: '05 再エネ' },
];

function HomePage({ onNav, data }) {
  // 今日の一問の選択肢状態
  const [answered, setAnswered] = React.useState(null); // null | 'correct' | 'wrong'
  // 過去問フィルター状態
  const [activeChip, setActiveChip] = React.useState('#B問題対策');

  const DAILY_Q = {
    date: '2026年5月1日 · R5上期 改',
    q: '高圧電路に施設する変圧器の低圧側の中性点に施す接地工事は、原則として何種接地工事か。',
    choices: [
      { key: 'A', label: 'A種接地工事', correct: false },
      { key: 'B', label: 'B種接地工事', correct: true },
      { key: 'C', label: 'C種接地工事', correct: false },
      { key: 'D', label: 'D種接地工事', correct: false },
    ],
    rank: 'S', tags: ['#高圧', '#頻出S'], avgRate: '71%',
  };

  const HOT_TOPICS = [
    { name: 'B問題',    rank: 'S', pages: 9,  count: 20, tags: ['#B問題対策', '#頻出S'] },
    { name: '接地',     rank: 'S', pages: 6,  count: 17, tags: ['#高圧', '#表暗記', '#ひっかけ注意'] },
    { name: '絶縁',     rank: 'S', pages: 5,  count: 15, tags: ['#低圧', '#高圧', '#表暗記'] },
    { name: '主任技術者',rank: 'A', pages: 4,  count: 12, tags: ['#頻出A', '#ひっかけ注意'] },
    { name: '保安規程', rank: 'A', pages: 3,  count: 11, tags: ['#頻出A', '#直前確認'] },
    { name: '事故報告', rank: 'A', pages: 2,  count: 10, tags: ['#表暗記', '#ひっかけ注意'] },
    { name: '電線路',   rank: 'A', pages: 5,  count:  9, tags: ['#特別高圧', '#高圧'] },
    { name: '分散型電源',rank: 'B', pages: 3,  count:  5, tags: ['#法改正注意'] },
    { name: '電気工事士法',rank:'B',pages: 1,  count: 0, tags: ['#法令', '#ひっかけ注意', '#免状'], note: 'R06下・H20 出題' },
  ];

  const ROADMAP = [
    { step: '01', status: 'done',    label: '完了',   title: 'B問題・計算問題',           desc: '配点が大きく、パターンも限られている。最優先で固める。',              prog: 100, cur: 9,  total: 9,  unit: 'ページ' },
    { step: '02', status: 'current', label: '学習中', title: '接地・絶縁・離隔距離',       desc: '表で横断的に覚える。ここで得点源が増える。',                          prog: 62,  cur: 8,  total: 13, unit: 'ページ' },
    { step: '03', status: 'next',    label: '次へ',   title: '電気工作物・主任技術者・保安規程', desc: 'A問題で必ず出る、施設管理の定番論点。',                        prog: 18,  cur: 2,  total: 11, unit: 'ページ' },
    { step: '04', status: 'next',    label: '次へ',   title: '過去問テーマ別演習',         desc: '年度順ではなく、テーマ別に潰す。',                                    prog:  0,  cur: 0,  total: 24, unit: 'セット' },
    { step: '05', status: 'next',    label: '直前期', title: '間違いノート・直前チェック', desc: '試験前日は、自分の弱点だけを見る。',                                  prog:  0,  cur: null, total: null, unit: null },
  ];

  const PAST_CHIPS = ['#B問題対策','#高圧','#低圧','#特別高圧','#頻出S','#頻出A','#頻出B','#表暗記','#ひっかけ注意','#直前確認','#法改正注意'];

  const handleChoice = (correct) => {
    if (answered !== null) return;
    setAnswered(correct ? 'correct' : 'wrong');
  };

  return (
    <div>
      {/* ====== Hero ====== */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>
            電験3種 / 法規 / 学習Wiki
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, lineHeight: 1.3 }}>
            <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>B問題で点を取り、</em><br />
            表暗記でA問題を拾う。
          </h1>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7 }}>
            条文を丸暗記する科目ではありません。頻出論点・表暗記・B問題計算・過去問演習の4つを正しい順序で組み合わせれば、60点は安定して取れます。
          </p>
          {/* 棲み分け1行ルール（denken-wikiとの役割分担明示） */}
          <div style={{
            background: 'var(--bg-elev)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--accent)',
            borderRadius: 'var(--radius)',
            padding: '12px 16px',
            margin: '0 0 16px',
            fontSize: 13,
            lineHeight: 1.6
          }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>🧭 棲み分けルール</div>
            <div style={{ color: 'var(--ink-2)' }}>
              <strong>数値・暗記</strong>はこのHub、<strong>条文・解説・"なぜ"</strong>は{' '}
              <a href="https://kfurufuru.github.io/denken-wiki/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                denken-wiki
              </a>
              {' '}へ。
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => onNav('top')}>B問題から始める →</button>
            <button className="btn secondary" onClick={() => document.getElementById('hp-topics')?.scrollIntoView({ behavior: 'smooth' })}>頻出Sランクを見る</button>
          </div>
        </div>

        {/* 前回のつづきカード */}
        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 4 }}>前回のつづき</div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>B種接地抵抗値の計算</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, fontSize: 13 }}>
            <span className="rank rank-S">S</span>
            <span style={{ color: 'var(--ink-2)' }}>B問題対策</span>
            <span style={{ color: 'var(--ink-3)' }}>· 3分前</span>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, marginBottom: 6, overflow: 'hidden' }}>
            <div style={{ width: '62%', height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 12 }}>
            <span>全体進捗</span>
            <span>62% / 78ページ</span>
          </div>
          <button className="btn primary" style={{ width: '100%' }} onClick={() => onNav('bshu-setsuchi')}>
            続きから学習する →
          </button>
        </div>
      </section>

      {/* ====== 教材CH対応表 ====== */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>TEXTBOOK MAP</div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>教材CH↔得点優先度 対応表</h2>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>どのCHを先に読むかで合否が変わる。S→A→Bの順で攻める。</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--ink-3)', fontWeight: 600 }}>優先</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--ink-3)', fontWeight: 600 }}>教材CH</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--ink-3)', fontWeight: 600 }}>主な内容</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--ink-3)', fontWeight: 600 }}>Wikiカテゴリ</th>
                <th style={{ textAlign: 'center', padding: '8px 10px', color: 'var(--ink-3)', fontWeight: 600 }}>ランク</th>
              </tr>
            </thead>
            <tbody>
              {CH_TABLE.map((row) => (
                <tr key={row.ch} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '8px 10px', fontWeight: 700, color: 'var(--ink-3)' }}>{row.order}</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600 }}>{row.ch}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--ink-2)' }}>{row.content}</td>
                  <td style={{ padding: '8px 10px', color: 'var(--ink-2)' }}>{row.wiki}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                    <span className={`rank rank-${row.rank}`}>{row.rank}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====== 今日の一問 ====== */}
      <section style={{ marginBottom: 40 }} id="hp-daily">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>DAILY · 1問1分</div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>今日の一問</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>毎日1問。23日連続で続いています。</p>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, padding: 0 }}>
            過去の一問 →
          </button>
        </div>

        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>{DAILY_Q.date}</div>
          <p style={{ margin: '0 0 10px', fontWeight: 600, lineHeight: 1.7 }}>{DAILY_Q.q}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, fontSize: 12 }}>
            <span className={`rank rank-${DAILY_Q.rank}`}>{DAILY_Q.rank}</span>
            {DAILY_Q.tags.map(t => <span key={t} className="tag">{t}</span>)}
            <span style={{ color: 'var(--ink-3)' }}>· 平均正答率 {DAILY_Q.avgRate}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DAILY_Q.choices.map((c) => {
              let bg = 'var(--bg)';
              let border = '1px solid var(--border)';
              let color = 'var(--ink-1)';
              if (answered !== null) {
                if (c.correct) { bg = '#d4f0d4'; border = '1px solid #52a952'; color = '#1a6b1a'; }
                else if (!c.correct && answered === 'wrong') { bg = '#fde8e8'; border = '1px solid #d95454'; color = '#9b2020'; }
              }
              return (
                <button
                  key={c.key}
                  onClick={() => handleChoice(c.correct)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: bg, border, borderRadius: 'var(--radius)',
                    padding: '10px 14px', cursor: answered !== null ? 'default' : 'pointer',
                    color, fontSize: 14, textAlign: 'left', transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontWeight: 700, minWidth: 18 }}>{c.key}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
          {answered && (
            <div style={{
              marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius)',
              background: answered === 'correct' ? '#d4f0d4' : '#fde8e8',
              color: answered === 'correct' ? '#1a6b1a' : '#9b2020',
              fontSize: 13, fontWeight: 600,
            }}>
              {answered === 'correct' ? '正解！ B種接地工事は変圧器の低圧側中性点への接地。' : '不正解。正解はB種接地工事です。変圧器の低圧側中性点に施します。'}
            </div>
          )}
        </div>
      </section>

      {/* ====== 学習ロードマップ ====== */}
      <section style={{ marginBottom: 40 }} id="hp-roadmap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>LEARNING ROADMAP</div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>6ステップで合格まで</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>CH04→CH03→CH01→CH06→CH02→CH05の順が最短ルートです。</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ROADMAP.map((s) => (
            <div
              key={s.step}
              style={{
                background: 'var(--bg-elev)',
                border: s.status === 'current' ? '2px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '14px 16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>STEP {s.step}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                  background: s.status === 'done' ? '#d4f0d4' : s.status === 'current' ? 'var(--accent)' : 'var(--border)',
                  color: s.status === 'done' ? '#1a6b1a' : s.status === 'current' ? '#fff' : 'var(--ink-3)',
                }}>
                  {s.label}
                </span>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 10 }}>{s.desc}</div>
              <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginBottom: 4, overflow: 'hidden' }}>
                <div style={{ width: `${s.prog}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
                <span>{s.cur !== null ? `${s.cur} / ${s.total} ${s.unit}` : '未着手'}</span>
                <span>{s.prog > 0 ? `${s.prog}%` : '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 頻出テーマ ====== */}
      <section style={{ marginBottom: 40 }} id="hp-topics">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>HOT TOPICS</div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>頻出テーマ</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>過去10年の出題回数が多い順。Sランクから手を付ける。</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {HOT_TOPICS.map((t) => (
            <div
              key={t.name}
              style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</span>
                <span className={`rank rank-${t.rank}`}>{t.rank}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>
                {t.pages}ページ · {t.note || `過去10年で${t.count}回出題`}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {t.tags.map(tag => (
                  <span key={tag} className={`tag${tag === '#ひっかけ注意' || tag === '#法改正注意' ? ' warn' : tag === '#B問題対策' || tag === '#表暗記' ? ' hot' : ''}`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== 過去問フィルター ====== */}
      <section style={{ marginBottom: 40 }} id="hp-past">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>PAST EXAMS</div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>過去問をテーマで探す</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>年度順ではなく、論点とタグで横断検索できます。</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 14 }}>
          {[
            { label: '年度', options: ['すべて','2025（R7）','2024（R6）','2023（R5）','2022（R4）','過去10年'] },
            { label: 'テーマ', options: ['すべて','接地','絶縁','主任技術者','保安規程','事故報告','電線路','分散型電源'] },
            { label: '出題形式', options: ['すべて','A問題','B問題'] },
            { label: '頻出度', options: ['すべて','S ランク','A ランク','B ランク'] },
            { label: '正答率', options: ['すべて','苦手のみ（< 50%）','未着手のみ','復習要'] },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--bg-elev)', color: 'var(--ink-1)', fontSize: 13 }}>
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {PAST_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip === activeChip ? null : chip)}
              style={{
                padding: '4px 12px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
                background: chip === activeChip ? 'var(--accent)' : 'var(--bg-elev)',
                color: chip === activeChip ? '#fff' : 'var(--ink-2)',
                border: chip === activeChip ? '1px solid var(--accent)' : '1px solid var(--border)',
                transition: 'all 0.15s',
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
            条件に一致 <strong>34</strong> 問
          </div>
          <button className="btn primary" onClick={() => onNav('kakomon-random')}>
            この条件で演習を始める →
          </button>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. KojiShiHoPage（電気工事士法ページ）
// ─────────────────────────────────────────────
function KojiShiHoPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="電気工事士の免状について正しいものを選べ"
        choices={[
          "第一種は経済産業大臣が交付する",
          "第一種は試験合格のみで取得できる",
          "第二種は実務経験3年で取得できる",
          "第一種でも500kW以上の自家用電気工作物の工事は行えない",
        ]}
        correctIndex={3}
        year="類題"
        note="このページを読み終えたら戻ってきて解こう"
      />

      <ConclusionBox>
        <ul>
          <li>免状交付者は<strong>都道府県知事</strong>（経済産業大臣ではない）</li>
          <li>第一種でも<strong>500kW以上</strong>の自家用電気工作物は作業不可</li>
          <li>第一種の取得条件: 試験合格 + <strong>実務経験3年以上</strong></li>
          <li>第二種の取得条件: 試験合格のみ（実務経験不要）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH02"
        category="04 法令・制度"
        importance="B"
        freq="散発"
        examType="A問題"
        targets="R06下・H20"
        tags={["法令", "免状", "ひっかけ注意"]}
        lastChecked="2026-05-01"
      />

      <h2 id="exam-focus">3. 試験で問われること</h2>
      <ExamFocus items={[
        { label: "主語",   value: "電気工事士法の義務対象者（工事施工者）" },
        { label: "対象",   value: "電気工作物の工事（一般用/自家用の区別あり）" },
        { label: "条件",   value: "最大電力500kW未満の自家用なら第一種でOK" },
        { label: "例外",   value: "認定電気工事従事者: 600V以下の簡易工事のみ" },
        { label: "届出先", value: "免状交付: 都道府県知事" },
        { label: "罰則",   value: "無免許工事: 3万円以下の罰金" },
      ]} />

      <h2 id="tables">6. 覚える表</h2>
      <MemTable
        headers={["資格", "一般用", "自家用（500kW未満）", "自家用（500kW以上）"]}
        rows={[
          ["第一種電気工事士",   "○ 全作業", "○ 全作業",              "× 不可"],
          ["第二種電気工事士",   "○ 全作業", "× 不可",               "× 不可"],
          ["認定電気工事従事者", "× 不可",   "△ 600V以下の簡易工事",  "× 不可"],
          ["特種電気工事資格者", "× 不可",   "△ ネオン・非常用予備電源","× 不可"],
        ]}
        note="第一種でも500kW以上はできない。これが最頻出ひっかけ"
      />

      <MemTable
        headers={["項目", "内容"]}
        rows={[
          ["免状の交付者",       "都道府県知事（経済産業大臣ではない）"],
          ["第一種の免状交付条件","試験合格 + 実務経験3年以上"],
          ["第二種の免状交付条件","試験合格のみ（実務経験不要）"],
          ["電気工事士の義務",   "電気設備技術基準に適合した工事の実施"],
          ["免状の携帯義務",     "なし（保管義務のみ）"],
        ]}
        note="「都道府県知事が交付」が頻出ポイント"
      />

      <h2 id="traps">8. よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "免状は経済産業大臣が交付する",                  correct: "都道府県知事が交付する" },
        { wrong: "第一種は自家用電気工作物すべての工事ができる",   correct: "500kW以上の自家用は作業不可" },
        { wrong: "第二種は実務経験が必要",                        correct: "第二種は試験合格のみ（実務経験不要）" },
        { wrong: "第二種で自家用電気工作物の工事を行った",         correct: "第二種で自家用は不可→電気工事士法違反" },
      ]} />

      <h2 id="quick-review">11. 1分復習</h2>
      <QuickReview items={[
        { q: "電気工事士の免状を交付するのは誰か？",          a: "都道府県知事" },
        { q: "第一種電気工事士が作業できない工事は？",        a: "最大電力500kW以上の自家用電気工作物の工事" },
        { q: "第二種電気工事士の取得条件は？",               a: "試験合格のみ（実務経験不要）" },
        { q: "認定電気工事従事者が行えるのはどの工事か？",    a: "自家用電気工作物のうち600V以下の簡易工事のみ" },
        { q: "特種電気工事資格者の対象は？",                 a: "ネオン工事・非常用予備電源工事" },
      ]} />

      <h2 id="cross-ref">12. 掛け算出題パターン</h2>
      <CrossRef patterns={[
        { a: "電気工事士法（資格区分）",  b: "電気工作物の区分（一般用/自家用）",  result: "「誰がどの工作物を工事できるか」A問題" },
        { a: "電気工事士法（免状交付）",  b: "主任技術者（選任義務）",             result: "「誰が誰に何をするか」の主語混同問題" },
      ]} />

      <NextAction nextPageId="koji-gyoho" nextPageTitle="電気工事業法" onNav={onNav} />
      <UpdateLog entries={[{ date: "2026-05-01", content: "初版作成", reason: "—" }]} />
      <PageNav
        prevId="denki-yohin-anzen" prevTitle="電気用品安全法"
        nextId="koji-gyoho"        nextTitle="電気工事業法"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. 暗記表4ページ
// ─────────────────────────────────────────────

// 5-1. SetsuchiIchiranPage（接地工事一覧）
function SetsuchiIchiranPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="A種接地工事の接地抵抗値として正しいものはどれか"
        choices={["5 Ω以下","10 Ω以下","100 Ω以下","150/Ig Ω以下"]}
        correctIndex={1}
        year="頻出"
        note="読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>A種</strong>: 高圧・特高機器 → 10 Ω 以下 / 2.6 mm 以上</li>
          <li><strong>B種</strong>: 変圧器中性点 → 150/Ig Ω / 4.0 mm 以上</li>
          <li><strong>C種</strong>: 300V 超低圧 → 10 Ω 以下 / 1.6 mm 以上</li>
          <li><strong>D種</strong>: 300V 以下低圧 → 100 Ω 以下 / 1.6 mm 以上</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="02 接地"
        importance="S"
        freq="毎年"
        examType="A問題・B問題"
        targets="R05・R04・R03"
        tags={["接地","頻出S","表暗記","高圧"]}
        lastChecked="2026-04-28"
      />

      <h2 id="tables">接地工事一覧表</h2>
      <MemTable
        headers={["種別", "対象", "接地抵抗値", "電線太さ"]}
        rows={[
          ["A種", "高圧・特高機器",  "10 Ω 以下",  "2.6 mm 以上"],
          ["B種", "変圧器中性点",    "150 / Ig",   "4.0 mm 以上"],
          ["C種", "300V 超低圧",     "10 Ω 以下",  "1.6 mm 以上"],
          ["D種", "300V 以下低圧",   "100 Ω 以下", "1.6 mm 以上"],
        ]}
        note="B種の 150/Ig は「1秒以内に自動遮断される場合は 300/Ig」に緩和される"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "C種とD種は同じ接地抵抗値",                   correct: "C種は10Ω以下、D種は100Ω以下（10倍違う）" },
        { wrong: "B種の接地抵抗値は固定値",                    correct: "150/Ig（地絡電流によって変わる計算値）" },
        { wrong: "A種とC種の抵抗値は同じなので電線太さも同じ", correct: "A種は2.6mm以上、C種は1.6mm以上（A種の方が太い）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "A種接地工事の接地抵抗値は？",          a: "10 Ω 以下" },
        { q: "B種接地工事の接地抵抗値の計算式は？",  a: "150 / Ig（Ig: 1線地絡電流）" },
        { q: "C種接地工事が適用される電圧範囲は？",  a: "300V 超の低圧機器" },
        { q: "D種接地工事の接地抵抗値は？",          a: "100 Ω 以下" },
        { q: "B種の電線の太さは？",                  a: "4.0 mm 以上（最も太い）" },
      ]} />

      <UpdateLog entries={[{ date: "2026-04-28", content: "初版作成", reason: "—" }]} />
      <PageNav
        prevId="top"            prevTitle="トップ"
        nextId="zetsuen-ichiran" nextTitle="絶縁耐力試験一覧"
        onNav={onNav}
      />
    </div>
  );
}

// 5-2. ZetsuenIchiranPage（絶縁耐力試験一覧）
function ZetsuenIchiranPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="最大使用電圧が7,000V以下の電路に対する絶縁耐力試験の試験電圧の倍率は？"
        choices={["1.25倍","1.5倍","2倍","0.64倍"]}
        correctIndex={1}
        year="頻出"
        note="読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>低圧（7kV以下）</strong>: 1.5倍 × 10分</li>
          <li><strong>高圧（7kV超 60kV以下）</strong>: 1.25倍 × 10分</li>
          <li><strong>特高（中性点直接接地、170kV超）</strong>: 0.64倍 × 10分</li>
          <li><strong>特高（その他、60kV超）</strong>: 1.25倍 × 10分</li>
          <li>試験時間はすべて<strong>10分間</strong></li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 絶縁"
        importance="S"
        freq="毎年"
        examType="A問題・B問題"
        targets="R05・R04・H30"
        tags={["絶縁","頻出S","表暗記","高圧","特別高圧"]}
        lastChecked="2026-04-27"
      />

      <h2 id="tables">絶縁耐力試験一覧表</h2>
      <MemTable
        headers={["電路", "最大使用電圧", "倍率", "時間"]}
        rows={[
          ["低圧",                 "7,000 V 以下",       "1.5 倍",  "10 分"],
          ["高圧",                 "7,000 V 超 60kV 以下","1.25 倍","10 分"],
          ["特高（中性点直接接地）","170kV 超",           "0.64 倍","10 分"],
          ["特高（その他）",        "60kV 超",            "1.25 倍","10 分"],
        ]}
        note="低圧は1.5倍（高い）、高圧・特高は1.25倍が基本。中性点直接接地の特高だけ0.64倍（低い）"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "高圧電路の試験電圧は1.5倍",          correct: "高圧は1.25倍（1.5倍は低圧）" },
        { wrong: "絶縁耐力試験の時間は電圧によって異なる", correct: "すべて10分間（一律）" },
        { wrong: "特高はすべて同じ倍率",               correct: "中性点直接接地（170kV超）だけ0.64倍で異なる" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "低圧電路の絶縁耐力試験の倍率は？",         a: "1.5倍" },
        { q: "高圧電路の絶縁耐力試験の倍率は？",         a: "1.25倍" },
        { q: "絶縁耐力試験の時間は？",                   a: "10分間（すべて共通）" },
        { q: "倍率が0.64倍になるのはどんな電路？",       a: "中性点直接接地の特高電路（170kV超）" },
        { q: "7,000V超 60kV以下の電路は何V以上で試験？", a: "最大使用電圧の1.25倍" },
      ]} />

      {/* denken-wiki への逆リンク（条文ベース解説） */}
      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        margin: '20px 0',
        fontSize: 13
      }}>
        📚 <strong>じっくり理解したい時</strong> →{' '}
        <a href="https://kfurufuru.github.io/denken-wiki/reference/grounding-comparison/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          denken-wiki「接地工事種別比較表」
        </a>
        （条文ベース解説・ELB緩和・省略条件）
      </div>

      <UpdateLog entries={[{ date: "2026-04-27", content: "初版作成", reason: "—" }]} />
      <PageNav
        prevId="setsuchi-ichiran"  prevTitle="接地工事一覧"
        nextId="rikkaku-ichiran"   nextTitle="離隔距離一覧"
        onNav={onNav}
      />
    </div>
  );
}

// 5-3. RikkakuIchiranPage（離隔距離一覧）
function RikkakuIchiranPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="架空電線が道路を横断する場合、高圧架空電線の地表上の高さは最低何m必要か"
        choices={["5 m","5.5 m","6 m","6.5 m"]}
        correctIndex={2}
        year="頻出"
        note="読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>建造物上部</strong>: 低圧2m / 高圧2m / 特高3m</li>
          <li><strong>建造物側方</strong>: 低圧1m / 高圧1.2m / 特高3m</li>
          <li><strong>道路横断</strong>: 低圧5m / 高圧6m / 特高6m</li>
          <li><strong>鉄道横断</strong>: 低圧5.5m / 高圧5.5m / 特高6m</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 離隔距離"
        importance="A"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R04・R01・H29"
        tags={["離隔距離","頻出A","表暗記","高圧","特別高圧"]}
        lastChecked="2026-04-26"
      />

      <h2 id="tables">離隔距離一覧表</h2>
      <MemTable
        headers={["区分", "低圧", "高圧", "特別高圧"]}
        rows={[
          ["建造物上部", "2 m",   "2 m",   "3 m"],
          ["建造物側方", "1 m",   "1.2 m", "3 m"],
          ["道路横断",   "5 m",   "6 m",   "6 m"],
          ["鉄道横断",   "5.5 m", "5.5 m", "6 m"],
        ]}
        note="道路横断は高圧・特高で6m（低圧の5mより1m高い）。鉄道横断は低圧・高圧とも5.5mで同じ"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "道路横断の高さは低圧も高圧も同じ",      correct: "低圧5m、高圧6m（高圧は1m高い）" },
        { wrong: "鉄道横断の高さは電圧によって違う",      correct: "低圧・高圧とも5.5m（同じ）。特高だけ6m" },
        { wrong: "建造物上部の低圧と高圧の離隔は違う",    correct: "上部は低圧・高圧とも2m（同じ）。特高だけ3m" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "高圧架空電線が道路を横断する時の最低高さは？", a: "6 m" },
        { q: "低圧架空電線が鉄道を横断する時の最低高さは？", a: "5.5 m" },
        { q: "特別高圧架空電線と建造物上部の離隔は？",       a: "3 m" },
        { q: "高圧架空電線と建造物側方の離隔は？",           a: "1.2 m" },
        { q: "道路横断で低圧と高圧の高さの差は？",           a: "1 m（低圧5m、高圧6m）" },
      ]} />

      {/* denken-wiki への逆リンク（条文ベース解説） */}
      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        margin: '20px 0',
        fontSize: 13
      }}>
        📚 <strong>じっくり理解したい時</strong> →{' '}
        <a href="https://kfurufuru.github.io/denken-wiki/reference/numbers/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          denken-wiki「頻出数値一覧（離隔距離）」
        </a>
        （条文との対応・出題文脈）
      </div>

      <UpdateLog entries={[{ date: "2026-04-26", content: "初版作成", reason: "—" }]} />
      <PageNav
        prevId="zetsuen-ichiran"  prevTitle="絶縁耐力試験一覧"
        nextId="den-atsu-kubun"   nextTitle="電圧区分一覧"
        onNav={onNav}
      />
    </div>
  );
}

// 5-4. DenAtsuKubunPage（電圧区分一覧）
function DenAtsuKubunPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="直流電圧1,000Vの電路の区分として正しいものはどれか"
        choices={["低圧","高圧","特別高圧","超高圧"]}
        correctIndex={1}
        year="頻出"
        note="読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>低圧</strong>: 交流600V以下 / 直流750V以下</li>
          <li><strong>高圧</strong>: 交流600V超〜7,000V以下 / 直流750V超〜7,000V以下</li>
          <li><strong>特別高圧</strong>: 交流・直流ともに7,000V超</li>
          <li>直流の低圧上限は<strong>750V</strong>（交流の600Vより高い）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH01"
        category="01 電気工作物"
        importance="A"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R03・H28・H25"
        tags={["電圧区分","頻出A","表暗記","ひっかけ注意"]}
        lastChecked="2026-04-25"
      />

      <h2 id="tables">電圧区分一覧表</h2>
      <MemTable
        headers={["区分", "交流", "直流"]}
        rows={[
          ["低圧",     "600 V 以下",          "750 V 以下"],
          ["高圧",     "600 V 超 7,000 V 以下","750 V 超 7,000 V 以下"],
          ["特別高圧", "7,000 V 超",           "7,000 V 超"],
        ]}
        note="交流と直流で低圧の上限が違う（交流600V・直流750V）。特別高圧は7,000V超で交流・直流共通"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "交流も直流も低圧の上限は600V",          correct: "交流600V以下、直流750V以下（直流の方が高い）" },
        { wrong: "直流1,000Vは低圧",                      correct: "直流750V超なので高圧（750V以下が低圧）" },
        { wrong: "高圧の上限は交流・直流で異なる",        correct: "高圧の上限は交流・直流ともに7,000V以下（同じ）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "交流の低圧の上限電圧は？",   a: "600 V 以下" },
        { q: "直流の低圧の上限電圧は？",   a: "750 V 以下" },
        { q: "高圧の上限電圧は交流・直流とも？", a: "7,000 V 以下" },
        { q: "直流750Vは何圧？",           a: "低圧（750V以下が低圧）" },
        { q: "交流7,001Vは何圧？",         a: "特別高圧（7,000V超が特別高圧）" },
      ]} />

      {/* denken-wiki への逆リンク（条文ベース解説） */}
      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        margin: '20px 0',
        fontSize: 13
      }}>
        📚 <strong>じっくり理解したい時</strong> →{' '}
        <a href="https://kfurufuru.github.io/denken-wiki/reference/voltage-zones/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          denken-wiki「電圧区分早見表」
        </a>
        （条文ベース解説・出題文脈）
      </div>

      <UpdateLog entries={[{ date: "2026-04-25", content: "初版作成", reason: "—" }]} />
      <PageNav
        prevId="rikkaku-ichiran"   prevTitle="離隔距離一覧"
        nextId="densen-size"       nextTitle="電線サイズ"
        onNav={onNav}
      />
    </div>
  );
}

// 5-5. HokokuTodokeKigenPage（報告・届出期限一覧 — denken-wikiへリンク）
function HokokuTodokeKigenPage({ onNav, data }) {
  return (
    <div>
      <h1 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 800 }}>
        📅 報告・届出期限一覧
      </h1>
      <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 24 }}>
        届出・申請期限の一覧は <strong>denken-wiki</strong> に集約しています。
      </p>

      <div style={{
        background: 'var(--bg-elev)',
        border: '2px solid var(--accent)',
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        margin: '24px 0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
        <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>SOTはdenken-wiki</h2>
        <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          事前30日・事前90日・事後24時間・事後30日 等の<br />
          届出・申請期限を <strong>denken-wiki</strong> に一元管理しています。
        </p>
        <a
          href="https://kfurufuru.github.io/denken-wiki/reference/deadlines/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          denken-wiki「届出・申請期限一覧（誰に＋何を＋いつ）」を開く →
        </a>
      </div>

      <div style={{
        background: 'var(--bg-elev)',
        border: '2px solid var(--accent)',
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        margin: '24px 0',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🧭</div>
        <h2 style={{ margin: '0 0 12px', fontSize: 18 }}>用語が混同するとき</h2>
        <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          <strong>許可・認可・登録・届出・承認・報告</strong> の使い分け／<br />
          申請先（経産大臣／産業保安監督部長／知事）が違う理由／<br />
          「これは何の手続き？」判断フロー
        </p>
        <a
          href="https://kfurufuru.github.io/denken-wiki/reference/permit-types/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          denken-wiki「手続き6用語の使い分け」を開く →
        </a>
      </div>

      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--ink-3)',
        borderRadius: 'var(--radius)',
        padding: '12px 16px',
        margin: '20px 0',
        fontSize: 13,
        color: 'var(--ink-2)'
      }}>
        💡 <strong>棲み分けルール</strong>: 数値・暗記はこのHub、条文・解説・"なぜ"は denken-wiki。
        届出期限・用語使い分けは「条文の整理」に該当するため denken-wiki が SOT。
      </div>

      <UpdateLog entries={[
        { date: "2026-05-05", content: "「手続き6用語の使い分け」へのリンク追加（許可/認可/登録/届出/承認/報告の整理ページ）", reason: "受験者が混同しやすい概念を1ページに集約" },
        { date: "2026-05-05", content: "スタブ→denken-wikiへのリンクページに変更", reason: "二重実装回避・SOT統一" }
      ]} />
      <PageNav
        prevId="densen-size"       prevTitle="電線サイズ一覧"
        nextId="denro-zetsuen"     nextTitle="電路の絶縁"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 6. RandomModePage（ランダム10問 + 65分タイマー）
// ─────────────────────────────────────────────
function RandomModePage({ onNav }) {
  const [timeLeft, setTimeLeft] = React.useState(65 * 60);
  const [running, setRunning]   = React.useState(false);
  const [phase, setPhase]       = React.useState('ready'); // ready | running | finished

  React.useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) {
          clearInterval(t);
          setRunning(false);
          setPhase('finished');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, timeLeft]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const SAMPLE_QUESTIONS = [
    { no: 1, q: "A種接地工事の接地抵抗値として正しいものはどれか",          category: "接地",     rank: "S" },
    { no: 2, q: "低圧電路の絶縁耐力試験における試験電圧の倍率は？",          category: "絶縁",     rank: "S" },
    { no: 3, q: "高圧架空電線が道路を横断する場合の最低地表高さは？",        category: "離隔距離", rank: "A" },
    { no: 4, q: "直流750Vの電路の電圧区分はどれか？",                        category: "電圧区分", rank: "A" },
    { no: 5, q: "電気工事士の免状を交付するのは誰か？",                      category: "法令",     rank: "B" },
    { no: 6, q: "主任技術者の選任が必要な自家用電気工作物の最大電力は？",    category: "主任技術者",rank: "S" },
    { no: 7, q: "B種接地工事の接地抵抗値の計算式はどれか？",                 category: "接地",     rank: "S" },
    { no: 8, q: "保安規程の届出先はどこか？",                                category: "保安規程", rank: "A" },
    { no: 9, q: "電気事故報告の速報の報告期限は事故発生から何時間以内か？",  category: "事故報告", rank: "A" },
    { no:10, q: "特別高圧架空電線と建造物上部との離隔距離は最低何mか？",     category: "離隔距離", rank: "A" },
  ];

  const handleStart = () => {
    setPhase('running');
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    setPhase('finished');
  };

  const handleReset = () => {
    setTimeLeft(65 * 60);
    setRunning(false);
    setPhase('ready');
  };

  const timerColor = timeLeft < 600 ? '#d95454' : timeLeft < 1800 ? '#e6a817' : 'var(--accent)';

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>EXAM MODE</div>
        <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>ランダム10問演習</h1>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-2)' }}>試験本番と同じ65分のタイマーで模擬演習。</p>
      </div>

      {/* 3ステップフロー */}
      <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 14 }}>推奨フロー</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { step: '1', label: 'テーマ別で1テーマ固める', desc: 'まず接地・絶縁などを1テーマ単位で理解してから演習へ。' },
            { step: '2', label: 'このモードで10問ランダム演習', desc: '65分タイマーをスタートして本番と同じ時間感覚で解く。' },
            { step: '3', label: '苦手テーマに戻る', desc: '間違えた問題のカテゴリを確認して該当ページに戻って復習。' },
          ].map(f => (
            <div key={f.step} style={{ display: 'flex', gap: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, flexShrink: 0,
              }}>{f.step}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* タイマー */}
      <div style={{
        background: 'var(--bg-elev)',
        border: `2px solid ${phase === 'finished' ? '#d95454' : running ? timerColor : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: '24px',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>
          {phase === 'ready' ? '試験時間' : phase === 'running' ? '残り時間' : '終了'}
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: timerColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginBottom: 16 }}>
          {mm}:{ss}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {phase === 'ready' && (
            <button className="btn primary" onClick={handleStart} style={{ fontSize: 16, padding: '12px 32px' }}>
              演習スタート →
            </button>
          )}
          {phase === 'running' && (
            <>
              <button className="btn secondary" onClick={handleStop}>終了する</button>
            </>
          )}
          {phase === 'finished' && (
            <>
              <div style={{ fontWeight: 600, color: '#d95454', marginRight: 8 }}>演習終了！採点してください</div>
              <button className="btn secondary" onClick={handleReset}>もう一度</button>
            </>
          )}
        </div>
      </div>

      {/* 10問カード */}
      <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 15 }}>本日の10問</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SAMPLE_QUESTIONS.map((q) => (
          <div
            key={q.no}
            style={{
              background: 'var(--bg-elev)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '12px 16px',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--ink-3)', minWidth: 24, fontSize: 14 }}>Q{q.no}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 6 }}>{q.q}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className="tag">{q.category}</span>
                <span className={`rank rank-${q.rank}`}>{q.rank}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <button
          style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, padding: 0 }}
          onClick={() => onNav('top')}
        >
          ← トップに戻る
        </button>
      </div>
    </div>
  );
}
