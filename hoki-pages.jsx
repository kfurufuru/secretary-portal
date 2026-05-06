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
    case 'hichusei-jiraku':        return React.createElement(HichuseiJirakuPage, props);
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

// 試験日（電験3種 上期 2026・暫定）
// TODO: localStorage 'hoki_exam_date' で上書き対応
const HOKI_EXAM_DATE = '2026-08-30';

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

  // HOT TOPICS は data/hoki-theme-ranking.json (10年) の S ランクのみ採用。
  // ハードコードを廃止し、サイドバー「テーマ別」と同じ一次データから生成して
  // 「過去10年で20回」等の数値乖離を防ぐ（受験指導レビュー指摘の信頼性問題）。
  const ranking = (typeof window !== 'undefined' && window.HOKI_RANKING) || null;
  const validPageIds = React.useMemo(() => {
    const set = new Set();
    if (data && data.chapters) {
      data.chapters.forEach(ch => (ch.pages || []).forEach(p => set.add(p.id)));
    }
    return set;
  }, [data]);
  const hotTopics = React.useMemo(() => {
    if (!ranking || !ranking.windows || !ranking.windows['10y']) return [];
    return ranking.windows['10y'].filter(t => t.rank === 'S');
  }, [ranking]);
  const MKDOCS_BASE_HOT = 'https://kfurufuru.github.io/denken-wiki/';

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
      {/* ====== 試験日カウントダウン（最上段固定） ====== */}
      {(() => {
        const examDate = new Date(HOKI_EXAM_DATE + 'T00:00:00+09:00');
        const today = new Date();
        const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 0) {
          return (
            <div style={{ marginBottom: 24, padding: '10px 14px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13 }}>
              📅 電験3種法規 試験日（{HOKI_EXAM_DATE}）終了
            </div>
          );
        }
        const color = daysLeft <= 14 ? '#d95454' : daysLeft <= 30 ? '#e68b17' : daysLeft <= 60 ? '#e6a817' : 'var(--accent)';
        const phase = daysLeft <= 7 ? '最終週（弱点だけ・新規禁止）'
          : daysLeft <= 14 ? '直前期B（表暗記・過去問総ざらい）'
          : daysLeft <= 30 ? '直前期A（弱点補強＋通し演習）'
          : daysLeft <= 60 ? '仕上げ期（B問題反復＋頻出論点）'
          : daysLeft <= 90 ? '実力養成期（B問題集中＋表暗記）'
          : '基礎固め期（章立て学習＋用語整理）';
        return (
          <div style={{ marginBottom: 24, padding: '12px 16px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderLeft: `4px solid ${color}`, borderRadius: 'var(--radius)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.05em' }}>📅 試験まで</span>
              <span style={{ fontSize: 28, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{daysLeft}</span>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>日</span>
              <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>{HOKI_EXAM_DATE}（暫定）</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{phase}</div>
          </div>
        );
      })()}

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
        </div>

        {/* 前回のつづきカード（localStorage hoki_lastSeen_* から動的生成） */}
        {(() => {
          const allPages = (data?.chapters || []).flatMap(ch =>
            (ch.pages || []).filter(p => p.id !== 'top').map(p => ({ ...p, chTitle: ch.title }))
          );
          let lastPage = null;
          let lastTime = 0;
          allPages.forEach(p => {
            const t = parseInt(localStorage.getItem(`hoki_lastSeen_${p.id}`) || '0', 10);
            if (t > lastTime) { lastTime = t; lastPage = p; }
          });
          // フォールバック: B種接地抵抗値（B問題定番）
          const target = lastPage || allPages.find(p => p.id === 'bshu-setsuchi') || allPages[0];
          if (!target) return null;
          // 進捗（lastSeen が記録されているページ数 / 全ページ数）
          const seenCount = allPages.filter(p => localStorage.getItem(`hoki_lastSeen_${p.id}`)).length;
          const totalCount = allPages.length;
          const rate = totalCount > 0 ? Math.round(seenCount / totalCount * 100) : 0;
          const elapsedLabel = lastTime > 0
            ? `· ${(() => {
                const min = Math.round((Date.now() - lastTime) / 60000);
                if (min < 60) return `${min}分前`;
                const h = Math.round(min / 60);
                if (h < 48) return `${h}時間前`;
                return `${Math.round(h / 24)}日前`;
              })()}`
            : '· 未学習';
          return (
            <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 4 }}>{lastTime > 0 ? '前回のつづき' : '最初の一歩'}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{target.title}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, fontSize: 13, flexWrap: 'wrap' }}>
                {target.priority === 'required' && <span className="rank rank-S">S</span>}
                <span style={{ color: 'var(--ink-2)' }}>{target.chTitle}</span>
                <span style={{ color: 'var(--ink-3)' }}>{elapsedLabel}</span>
              </div>
              <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, marginBottom: 6, overflow: 'hidden' }}>
                <div style={{ width: `${rate}%`, height: '100%', background: 'var(--accent)', borderRadius: 3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', marginBottom: 12 }}>
                <span>閲覧済</span>
                <span>{rate}% / {totalCount}ページ中{seenCount}</span>
              </div>
              <button className="btn primary" style={{ width: '100%' }} onClick={() => onNav(target.id)}>
                {lastTime > 0 ? '続きから学習する →' : '学習を始める →'}
              </button>
            </div>
          );
        })()}
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

      {/* ====== 弱点Top3（未着手・必須・S/A 優先） ====== */}
      {(() => {
        const allPages = (data?.chapters || []).flatMap(ch =>
          (ch.pages || []).filter(p => p.id !== 'top').map(p => ({ ...p, chTitle: ch.title }))
        );
        // 未閲覧 (lastSeen 無し) で priority='required' or freq='max' のページから上位3件
        const SCORE = { required: 4, max: 3, high: 2, mid: 1 };
        const candidates = allPages
          .filter(p => !localStorage.getItem(`hoki_lastSeen_${p.id}`))
          .map(p => ({
            ...p,
            score: (p.priority === 'required' ? SCORE.required : 0) + (SCORE[p.freq] || 0),
          }))
          .filter(p => p.score >= 3)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);
        if (candidates.length === 0) return null;
        return (
          <section style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>WEAK SPOTS</div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>今週やるべき未着手3ページ</h2>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>必須(★)・最頻出(毎回)を優先抽出。一度開けば一覧から外れます。</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {candidates.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => onNav(p.id)}
                  style={{
                    background: 'var(--bg-elev)',
                    border: '1px solid var(--border)',
                    borderLeft: `3px solid ${i === 0 ? '#d95454' : i === 1 ? '#e6a817' : 'var(--accent)'}`,
                    borderRadius: 'var(--radius)',
                    padding: '12px 16px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 4 }}>{p.chTitle}</div>
                  <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{p.title}</div>
                  <div style={{ display: 'flex', gap: 6, fontSize: 11, flexWrap: 'wrap' }}>
                    {p.priority === 'required' && <span className="priority-label">★必須</span>}
                    {p.freq === 'max' && <span className="freq-max">毎回</span>}
                    {p.freq === 'high' && <span className="freq-high">頻出</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

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

      {/* ====== 頻出テーマ（Sランクのみ・kakomon.yml実データ） ====== */}
      <section style={{ marginBottom: 40 }} id="hp-topics">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 4 }}>HOT TOPICS</div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Sランク頻出テーマ</h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>過去10年（H28-R07）kakomon.yml 集計の上位S群。詳細はサイドバー「テーマ別」で5/10/15年切替。</p>
          </div>
        </div>
        {hotTopics.length === 0 ? (
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>ランキングデータ未ロード</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {hotTopics.map((t) => {
              const isInternal = t.pageId && validPageIds.has(t.pageId);
              const isClickable = isInternal || !!t.mkdocs;
              const handleClick = () => {
                if (isInternal) onNav && onNav(t.pageId);
                else if (t.mkdocs) window.open(MKDOCS_BASE_HOT + 'themes/' + t.mkdocs + '/', '_blank', 'noopener');
              };
              return (
                <div
                  key={t.slug}
                  onClick={isClickable ? handleClick : undefined}
                  style={{
                    background: 'var(--bg-elev)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: '14px 16px',
                    cursor: isClickable ? 'pointer' : 'default',
                    opacity: isClickable ? 1 : 0.6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{t.label}</span>
                    <span className={`rank rank-${t.rank}`}>{t.rank}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                    過去10年で<strong style={{ color: 'var(--ink-1)' }}>{t.count}</strong>回出題
                    {!isInternal && t.mkdocs && (
                      <span style={{ marginLeft: 6, color: 'var(--ink-3)' }} title="denken-wiki テーマページへ">↗ 外部Wiki</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ====== 過去問フィルター（折りたたみ・既定:閉じ） ====== */}
      <section style={{ marginBottom: 40 }} id="hp-past">
        <details style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px 16px' }}>
          <summary style={{ cursor: 'pointer', padding: '6px 0', fontSize: 14, fontWeight: 600, listStyle: 'revert' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em' }}>PAST EXAMS</span>
            <span style={{ marginLeft: 12 }}>過去問をテーマで探す</span>
            <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--ink-3)' }}>（4軸フィルタ + タグ検索）</span>
          </summary>
          <p style={{ margin: '8px 0 12px', fontSize: 13, color: 'var(--ink-2)' }}>年度順ではなく、論点とタグで横断検索できます。</p>

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
        </details>
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
// 4-2. HichuseiJirakuPage（中性点非接地系の地絡電流・1.8）
// ─────────────────────────────────────────────
function HichuseiJirakuPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="中性点非接地方式の三相3線式高圧配電線路（線間電圧6,600V・60Hz）で、配電線路一相の対地静電容量C₁=2.3μF、需要設備一相の対地静電容量C₂=0.02μFのとき、需要設備内のZCTが検出する地絡電流は何mAか。"
        choices={[
          "62 mA",
          "86 mA",
          "150 mA",
          "9,925 mA",
        ]}
        year="R05下 問11(b)"
        note="読み終えたら戻って解こう。ヒント：ZCTが検出するのは需要設備側のC₂分のみ"
      />

      <ConclusionBox>
        <ul>
          <li><strong style={{color: 'var(--warn)'}}>⚠ 「非接地＝地絡電流ゼロ」は誤解</strong>。対地静電容量C経由で必ず流れる</li>
          <li>系統全体の地絡電流: <strong>I_g = 2√3 πfV(C₁+C₂)</strong></li>
          <li>ZCTが検出する電流: <strong>I₀ = 2√3 πfV·C₂</strong>（自設備分のみ）</li>
          <li>1線地絡で健全相の対地電圧は <strong>線間電圧V（=√3倍）</strong> に上昇</li>
          <li>保護動作: <strong>ZCT検出 → GR判定 → CB遮断</strong>（合計 0.1〜2秒）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH04"
        category="01 B問題・計算問題対策"
        importance="A"
        freq="high"
        examType="B問題"
        targets="R05下"
        tags={["地絡電流", "対地静電容量", "ZCT", "GR", "保護協調"]}
        lastChecked="2026-05-06"
      />

      <h2 id="exam-focus">3. 試験で問われること</h2>
      <ExamFocus items={[
        { label: "主体",   value: "中性点非接地方式 三相3線式 高圧配電線路" },
        { label: "対象",   value: "1線完全地絡時の地絡電流 I_g とZCT検出電流 I₀" },
        { label: "公式",   value: "I_g = 2√3 πfV(C₁+C₂) ／ I₀ = 2√3 πfV·C₂" },
        { label: "条件",   value: "完全地絡（地絡抵抗Rg=0）／対称回路前提" },
        { label: "応用",   value: "GR動作電流整定／DGRとGRの選択／保護協調" },
      ]} />

      <h2 id="abbrev">4. 略号と役割（保護システムの三役）</h2>
      <MemTable
        headers={["略号", "正式名称・日本語", "役割"]}
        rows={[
          [<strong>ZCT</strong>, <span>Zero-phase Current Transformer<br/>零相変流器</span>, <span>3線を一括貫通しベクトル和を測る。<br/>平常時=0、地絡時のみ出力。<strong>「気付く」装置</strong></span>],
          [<strong>GR</strong>, <span>Ground Relay<br/>地絡継電器</span>, <span>ZCT出力が整定値超過で動作信号を出す。<br/>動作電流200〜600mA、瞬時/限時設定。<strong>「判断する」装置</strong></span>],
          [<strong>CB</strong>, <span>Circuit Breaker<br/>遮断器</span>, <span>GRからのトリップ信号で機械的に「閉→開」。<br/>アーク消弧で電流を切る。<strong>「行動する」装置</strong></span>],
          [<strong>I_g</strong>, <span>Ground fault current<br/>地絡電流</span>, "系統全体で発生 = 2√3 πfV(C₁+C₂)"],
          [<strong>I₀</strong>, <span>Zero-sequence current<br/>零相電流（ZCT検出）</span>, "ZCTが検出 = 2√3 πfV·C₂（自設備C₂分のみ）"],
          [<strong>C₁ / C₂</strong>, <span>Line-to-ground capacitance<br/>対地静電容量</span>, "C₁=配電線路一相、C₂=需要設備一相"],
        ]}
        note="ZCTは「気付く」、GRは「判断する」、CBは「行動する」。3つで1つの保護システム"
      />

      <h2 id="setsuchi-compare">5. 中性点の接地方式 3種類の比較</h2>
      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>本ページが扱うのは「中性点非接地方式」</strong>。他の方式と何が違うのか、地絡電流・対地電圧・遮断要否の3軸で比較する。</p>
      </PlainExplain>
      <MemTable
        headers={["方式", "中性点の状態", "1線地絡時の地絡電流", "健全相の対地電圧", "保護・遮断", "主な適用先"]}
        rows={[
          [<strong>直接接地方式</strong>, "中性点を直接大地に接続", <span><strong>大電流</strong>（短絡電流レベル）</span>, "ほぼ変化なし（V/√3維持）", "瞬時遮断必須", "187kV以上の超高圧系統"],
          [<strong>抵抗接地方式</strong>, "中性点を抵抗を介して接地", "中程度（数十〜数百A）", "若干上昇", "限時遮断", "66/77kV特別高圧系統"],
          [<strong style={{color: 'var(--warn)'}}>非接地方式</strong>, "中性点を接地しない（浮かせる）", <span><strong>小電流</strong>（数A〜数百mA）<br/>※C経由で必ず流れる</span>, <strong>√3倍に上昇（=線間電圧V）</strong>, "GR・DGRで検出→CB遮断", <strong>6.6kV高圧配電系統</strong>],
        ]}
        note="高圧6.6kV配電は非接地方式。地絡電流が小さいため健全相の対地電圧が大きく上昇する点が試験頻出"
      />
      <PlainExplain>
        <p style={{margin: 0, fontSize: 13}}>💡 <strong>非接地方式の3大特徴</strong>：① 地絡電流が小さい（C経由のみ）／② 健全相対地電圧が√3倍に上昇／③ それでも保護装置（ZCT+GR+CB）は必須</p>
      </PlainExplain>

      <h2 id="explain1">6. 深掘り解説①: なぜ「線間電圧V」を「対地電圧V/√3」に変換するのか</h2>
      <PlainExplain>
        <p style={{margin: '0 0 10px'}}><strong>問いの本質</strong>：問題文の電源は「線間電圧V」で与えられるのに、計算では「対地電圧」を使う。なぜ？</p>
        <ul style={{margin: 0, paddingLeft: 20}}>
          <li><strong>対地静電容量Cは「相導体↔大地」の容量</strong>。線間電圧は2つの相導体間の電圧で、Cには直接かからない。Cにかかるのは <strong>対地電圧（相導体の対地電位）</strong></li>
          <li>Y結線中性点接地なら、各相の対地電圧 = 相電圧 = <strong>V/√3</strong></li>
          <li><strong>中性点非接地でも平常時は対称性によりV/√3</strong>（中性点が浮いているだけで対称性は維持）</li>
          <li>だから式の基本量は「V」ではなく「V/√3 × ωC」。最終的に √3 が公式に現れるのはこの変換が原因</li>
        </ul>
        <p style={{margin: '10px 0 0', fontSize: 13, color: 'var(--ink-3)'}}>💡 「中性点非接地 = 対地電圧不明」ではない。平常時は対称性により V/√3、地絡時に対称性が壊れて変化する</p>
      </PlainExplain>

      <h2 id="explain2">7. 深掘り解説②: なぜ静電容量を「3相分」考慮するのか</h2>
      <PlainExplain>
        <p style={{margin: '0 0 10px'}}><strong>問いの本質</strong>：地絡しているのは1相だけ。なのに3相のCが式に入る。なぜ？</p>
        <p style={{margin: '0 0 8px'}}><strong>鍵：健全2相のCを経由した充電電流が地絡点に戻る</strong></p>
        <p style={{margin: '0 0 6px', fontSize: 13}}>1線完全地絡時（a相が地絡）の電流経路：</p>
        <ol style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li>電源(b相) → b相導体 → 健全相bの対地容量Cb → 大地</li>
          <li>電源(c相) → c相導体 → 健全相cの対地容量Cc → 大地</li>
          <li>大地経由で地絡点（a相と大地が短絡）に集合 → a相経由で電源へ戻る</li>
        </ol>
        <p style={{margin: '10px 0 6px'}}>各相の対地電圧の変化：</p>
      </PlainExplain>
      <MemTable
        headers={["相", "平常時の対地電圧", "1線地絡時（a相地絡）の対地電圧"]}
        rows={[
          ["a相（地絡相）", "V/√3", <strong>0</strong>],
          ["b相（健全相）", "V/√3", <strong>V（線間電圧）</strong>],
          ["c相（健全相）", "V/√3", <strong>V（線間電圧）</strong>],
        ]}
        note="健全相は √3倍に昇圧される。これが地絡電流増加の本質"
      />
      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>計算フロー</strong></p>
        <ol style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li>健全相b: I_b = ωCb × V（V=線間電圧）</li>
          <li>健全相c: I_c = ωCc × V</li>
          <li>b相とc相の電圧は60°位相差 → ベクトル和 |I_b+I_c| = √3 × ωC × V</li>
          <li>1相あたり対地容量 C = C₁+C₂（系統合計）として代入</li>
          <li>∴ I_g = √3 · ω · (C₁+C₂) · V = <strong>2√3 πfV(C₁+C₂)</strong></li>
        </ol>
        <p style={{margin: '10px 0 0', fontSize: 13, color: 'var(--ink-3)'}}>💡 覚え方：「1線地絡 = 健全2相が√3倍電圧で充電 → ベクトル和が√3倍 → 結局 √3×√3=3倍の電流が地絡点に集まる」と思うと、3相Cと√3の出処がスッキリ</p>
      </PlainExplain>

      <h2 id="explain3">8. 深掘り解説③: 健全相√3倍の物理的意味（フェーザ図）</h2>
      <PlainExplain>
        <p style={{margin: '0 0 10px'}}><strong>「中性点（仮想）が a相導体の位置に移動した」と考えると分かりやすい</strong></p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li>a相 → 大地電位（中性点位置と一致）</li>
          <li>b相 → a相からみた電位 = 線間電圧 V_ba</li>
          <li>c相 → a相からみた電位 = 線間電圧 V_ca</li>
        </ul>
      </PlainExplain>

      <div style={{background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <svg viewBox="0 0 820 380" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="arrowVa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#d33"/>
            </marker>
            <marker id="arrowVb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#2a8"/>
            </marker>
            <marker id="arrowVc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
          </defs>
          <rect x="10" y="20" width="395" height="350" fill="#f8fafc" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="207" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e6b22">【平常時】対地電圧フェーザ</text>
          <text x="207" y="60" textAnchor="middle" fontSize="11" fill="#666">中性点（仮想）= 大地電位 ／ 各相 V/√3</text>
          <circle cx="207" cy="200" r="3" fill="#333"/>
          <text x="217" y="218" fontSize="11" fill="#666">中性点</text>
          <line x1="207" y1="200" x2="207" y2="120" stroke="#d33" strokeWidth="2.5" markerEnd="url(#arrowVa)"/>
          <text x="217" y="120" fontSize="13" fill="#d33" fontWeight="700">V_a = V/√3</text>
          <line x1="207" y1="200" x2="276" y2="240" stroke="#2a8" strokeWidth="2.5" markerEnd="url(#arrowVb)"/>
          <text x="282" y="252" fontSize="13" fill="#2a8" fontWeight="700">V_b = V/√3</text>
          <line x1="207" y1="200" x2="138" y2="240" stroke="#27c" strokeWidth="2.5" markerEnd="url(#arrowVc)"/>
          <text x="65" y="252" fontSize="13" fill="#27c" fontWeight="700">V_c = V/√3</text>
          <circle cx="207" cy="200" r="80" fill="none" stroke="#aaa" strokeWidth="1" strokeDasharray="3,3"/>
          <text x="207" y="305" textAnchor="middle" fontSize="13" fill="#666">各ベクトル長 = V/√3、120°対称</text>
          <text x="207" y="335" textAnchor="middle" fontSize="13" fill="#0e6b22" fontWeight="700">健全相の対地電圧 = V/√3</text>

          <rect x="415" y="20" width="395" height="350" fill="#fff5f5" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="612" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a11">【a相完全地絡時】中性点シフト</text>
          <text x="612" y="60" textAnchor="middle" fontSize="11" fill="#666">中性点が a相導体位置にシフト → 健全相が線間電圧V</text>
          <circle cx="612" cy="120" r="3" fill="#333"/>
          <text x="622" y="115" fontSize="11" fill="#666">新中性点</text>
          <text x="622" y="130" fontSize="11" fill="#666">（=a相位置）</text>
          <line x1="606" y1="114" x2="618" y2="126" stroke="#d33" strokeWidth="2"/>
          <line x1="618" y1="114" x2="606" y2="126" stroke="#d33" strokeWidth="2"/>
          <text x="540" y="115" fontSize="11" fill="#d33">V_a = 0</text>
          <line x1="612" y1="120" x2="700" y2="240" stroke="#2a8" strokeWidth="3" markerEnd="url(#arrowVb)"/>
          <text x="710" y="245" fontSize="13" fill="#2a8" fontWeight="700">V_b' = V_ba</text>
          <text x="710" y="262" fontSize="11" fill="#2a8">（線間電圧）</text>
          <line x1="612" y1="120" x2="524" y2="240" stroke="#27c" strokeWidth="3" markerEnd="url(#arrowVc)"/>
          <text x="465" y="245" fontSize="13" fill="#27c" fontWeight="700">V_c' = V_ca</text>
          <text x="465" y="262" fontSize="11" fill="#27c">（線間電圧）</text>
          <text x="612" y="305" textAnchor="middle" fontSize="13" fill="#666">健全相ベクトル長 = V（線間電圧）</text>
          <text x="612" y="335" textAnchor="middle" fontSize="13" fill="#a11" fontWeight="700">健全相の対地電圧 = V（√3倍に上昇）</text>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ 「中性点シフト」と呼ばれる現象。a相が完全地絡すると、仮想中性点が a相位置に移動し、健全相 b・c の対地電圧が線間電圧Vに昇圧する。これが√3倍上昇の幾何学的説明</div>
      </div>

      <PlainExplain>
        <p style={{margin: 0, fontSize: 13, color: 'var(--ink-3)'}}>💡 試験速攻判定：「1線地絡 → 健全相は線間電圧Vで充電される」→ I_g = √3 × ωC × V が秒で出る</p>
      </PlainExplain>

      <h2 id="explain4">9. 深掘り解説④: なぜC₁とC₂で電流が分かれるのか（回路図）</h2>
      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>原則</strong>：ZCTが拾うのは「ZCTを貫通する正味電流（ベクトル和）」のみ。</p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li><strong style={{color: '#d33'}}>C₁ループ（赤）</strong>: 電源側で完結。ZCTより電源側で大地へ戻るのでZCTを貫通せず → <strong>検出されない</strong></li>
          <li><strong style={{color: '#27c'}}>C₂ループ（青）</strong>: 需要設備内（ZCTより負荷側）。ZCTを貫通する正味電流がある → <strong>検出される</strong></li>
        </ul>
      </PlainExplain>

      <div style={{background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <svg viewBox="0 0 820 460" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#d33"/>
            </marker>
            <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
          </defs>
          <rect x="395" y="30" width="395" height="370" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="6,4"/>
          <text x="592" y="22" textAnchor="middle" fontSize="13" fill="#555">需要設備</text>
          <line x1="40" y1="100" x2="780" y2="100" stroke="#333" strokeWidth="2"/>
          <text x="42" y="92" fontSize="13" fill="#333">高圧配電線路</text>
          <circle cx="300" cy="100" r="3.5" fill="#333"/>
          <text x="245" y="92" fontSize="13" fill="#333">地絡事故点</text>
          <line x1="300" y1="100" x2="300" y2="180" stroke="#333" strokeWidth="2"/>
          <line x1="285" y1="180" x2="315" y2="180" stroke="#333" strokeWidth="2"/>
          <line x1="290" y1="186" x2="310" y2="186" stroke="#333" strokeWidth="1.5"/>
          <line x1="295" y1="192" x2="305" y2="192" stroke="#333" strokeWidth="1.2"/>
          <text x="310" y="170" fontSize="13" fill="#333">地絡電流 I_g</text>
          <circle cx="410" cy="100" r="5" fill="#fff" stroke="#333" strokeWidth="1.8"/>
          <text x="415" y="92" fontSize="12" fill="#555">受電点</text>
          <circle cx="490" cy="100" r="18" fill="#fff" stroke="#333" strokeWidth="2"/>
          <text x="490" y="105" textAnchor="middle" fontSize="11" fill="#333">I₀</text>
          <text x="490" y="74" textAnchor="middle" fontSize="12" fill="#333">零相変流器</text>
          <line x1="508" y1="100" x2="560" y2="100" stroke="#333" strokeWidth="1.5"/>
          <line x1="555" y1="94" x2="565" y2="94" stroke="#333" strokeWidth="1.2"/>
          <line x1="555" y1="106" x2="565" y2="106" stroke="#333" strokeWidth="1.2"/>
          <rect x="580" y="80" width="60" height="40" fill="#fff" stroke="#333" strokeWidth="2"/>
          <text x="610" y="105" textAnchor="middle" fontSize="12" fill="#333">I →</text>
          <text x="660" y="105" fontSize="12" fill="#333">地絡継電器</text>
          <line x1="450" y1="100" x2="450" y2="220" stroke="#333" strokeWidth="2"/>
          <line x1="438" y1="218" x2="462" y2="242" stroke="#333" strokeWidth="2"/>
          <line x1="462" y1="218" x2="438" y2="242" stroke="#333" strokeWidth="2"/>
          <text x="475" y="238" fontSize="13" fill="#333">遮断器</text>
          <line x1="450" y1="242" x2="450" y2="280" stroke="#333" strokeWidth="2"/>
          <line x1="450" y1="280" x2="730" y2="280" stroke="#333" strokeWidth="2"/>
          <line x1="180" y1="100" x2="180" y2="200" stroke="#333" strokeWidth="2"/>
          <line x1="160" y1="200" x2="200" y2="200" stroke="#333" strokeWidth="2.5"/>
          <line x1="160" y1="208" x2="200" y2="208" stroke="#333" strokeWidth="2.5"/>
          <text x="145" y="208" fontSize="14" fill="#333">C₁</text>
          <line x1="180" y1="208" x2="180" y2="240" stroke="#333" strokeWidth="2"/>
          <line x1="160" y1="240" x2="200" y2="240" stroke="#333" strokeWidth="2"/>
          <line x1="166" y1="246" x2="194" y2="246" stroke="#333" strokeWidth="1.5"/>
          <line x1="172" y1="252" x2="188" y2="252" stroke="#333" strokeWidth="1.2"/>
          <line x1="730" y1="280" x2="730" y2="320" stroke="#333" strokeWidth="2"/>
          <line x1="710" y1="320" x2="750" y2="320" stroke="#333" strokeWidth="2.5"/>
          <line x1="710" y1="328" x2="750" y2="328" stroke="#333" strokeWidth="2.5"/>
          <text x="755" y="328" fontSize="14" fill="#333">C₂</text>
          <line x1="730" y1="328" x2="730" y2="360" stroke="#333" strokeWidth="2"/>
          <line x1="710" y1="360" x2="750" y2="360" stroke="#333" strokeWidth="2"/>
          <line x1="716" y1="366" x2="744" y2="366" stroke="#333" strokeWidth="1.5"/>
          <line x1="722" y1="372" x2="738" y2="372" stroke="#333" strokeWidth="1.2"/>
          <path d="M 180 252 Q 180 410 290 410 Q 300 410 300 200" fill="none" stroke="#d33" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowR)"/>
          <text x="195" y="425" fontSize="12" fill="#d33" fontWeight="600">C₁ループ：電源側で完結／ZCT貫通せず</text>
          <path d="M 730 372 Q 730 440 500 440 Q 305 440 300 200" fill="none" stroke="#27c" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowB)"/>
          <text x="510" y="455" fontSize="12" fill="#27c" fontWeight="600">C₂ループ：需要設備側→ZCT貫通＝検出</text>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ 簡略化のため、ZCT〜配電線路間の接続は1線で表示（実機は3相一括貫通）</div>
      </div>

      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>選択遮断（DGR）の原理</strong></p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li><strong>自設備内地絡</strong>: C₁分（系統の他需要家）が ZCT を流れる、向きは「外向き」</li>
          <li><strong>配電線路（他所）の地絡</strong>: C₂分が ZCT を流れる、向きは「内向き」</li>
          <li><strong>DGR（地絡方向継電器）</strong>はこの位相で判別。<strong>GR（無方向）</strong>は向き無視で誤動作（貰い事故）リスクあり</li>
        </ul>
      </PlainExplain>

      <h2 id="explain5">10. 深掘り解説⑤: 保護動作シーケンス（地絡発生→系統切離）</h2>
      <div style={{background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <svg viewBox="0 0 820 540" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="arrowSeq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#444"/>
            </marker>
          </defs>
          <line x1="640" y1="40" x2="640" y2="510" stroke="#aaa" strokeWidth="1" strokeDasharray="3,3"/>
          <text x="730" y="30" textAnchor="middle" fontSize="12" fill="#666">経過時間</text>
          <rect x="60" y="40" width="540" height="56" rx="8" fill="#fde2e2" stroke="#d33" strokeWidth="2"/>
          <text x="80" y="65" fontSize="14" fontWeight="700" fill="#a11">STEP 1</text>
          <text x="80" y="86" fontSize="13" fill="#222">1線完全地絡発生 → I_g = 2√3 πfV(C₁+C₂) が流れ始める</text>
          <rect x="670" y="55" width="120" height="26" rx="13" fill="#fff" stroke="#aaa" strokeWidth="1"/>
          <text x="730" y="72" textAnchor="middle" fontSize="12" fill="#444" fontWeight="600">0 ms</text>
          <line x1="330" y1="96" x2="330" y2="120" stroke="#444" strokeWidth="2" markerEnd="url(#arrowSeq)"/>
          <rect x="60" y="120" width="540" height="56" rx="8" fill="#ffe9cc" stroke="#e87a00" strokeWidth="2"/>
          <text x="80" y="145" fontSize="14" fontWeight="700" fill="#a55400">STEP 2</text>
          <text x="80" y="166" fontSize="13" fill="#222">ZCTが零相電流を検出 → I₀ = 2√3 πfV·C₂ ≈ 86 mA</text>
          <rect x="670" y="135" width="120" height="26" rx="13" fill="#fff" stroke="#aaa" strokeWidth="1"/>
          <text x="730" y="152" textAnchor="middle" fontSize="12" fill="#444" fontWeight="600">+数 ms</text>
          <line x1="330" y1="176" x2="330" y2="200" stroke="#444" strokeWidth="2" markerEnd="url(#arrowSeq)"/>
          <rect x="60" y="200" width="540" height="56" rx="8" fill="#fff5b8" stroke="#c8a000" strokeWidth="2"/>
          <text x="80" y="225" fontSize="14" fontWeight="700" fill="#806600">STEP 3</text>
          <text x="80" y="246" fontSize="13" fill="#222">GRが整定値超過を判定 → 動作（200〜600 mA に整定するのが標準）</text>
          <rect x="670" y="215" width="120" height="26" rx="13" fill="#fff" stroke="#aaa" strokeWidth="1"/>
          <text x="730" y="232" textAnchor="middle" fontSize="12" fill="#444" fontWeight="600">+10〜30 ms</text>
          <line x1="330" y1="256" x2="330" y2="280" stroke="#444" strokeWidth="2" markerEnd="url(#arrowSeq)"/>
          <rect x="60" y="280" width="540" height="56" rx="8" fill="#dcecff" stroke="#27c" strokeWidth="2"/>
          <text x="80" y="305" fontSize="14" fontWeight="700" fill="#15518f">STEP 4</text>
          <text x="80" y="326" fontSize="13" fill="#222">GR → CBへトリップ信号送出（トリップコイル励磁）</text>
          <rect x="670" y="295" width="120" height="26" rx="13" fill="#fff" stroke="#aaa" strokeWidth="1"/>
          <text x="730" y="312" textAnchor="middle" fontSize="12" fill="#444" fontWeight="600">+30〜50 ms</text>
          <line x1="330" y1="336" x2="330" y2="360" stroke="#444" strokeWidth="2" markerEnd="url(#arrowSeq)"/>
          <rect x="60" y="360" width="540" height="56" rx="8" fill="#d5f0f7" stroke="#1899b7" strokeWidth="2"/>
          <text x="80" y="385" fontSize="14" fontWeight="700" fill="#0e6b85">STEP 5</text>
          <text x="80" y="406" fontSize="13" fill="#222">CB機械動作（接点開離）→ アーク発生 → 電流ゼロ点で消弧</text>
          <rect x="670" y="375" width="120" height="26" rx="13" fill="#fff" stroke="#aaa" strokeWidth="1"/>
          <text x="730" y="392" textAnchor="middle" fontSize="12" fill="#444" fontWeight="600">+50〜100 ms</text>
          <line x1="330" y1="416" x2="330" y2="440" stroke="#444" strokeWidth="2" markerEnd="url(#arrowSeq)"/>
          <rect x="60" y="440" width="540" height="56" rx="8" fill="#d6f5dc" stroke="#1c9a3a" strokeWidth="2"/>
          <text x="80" y="465" fontSize="14" fontWeight="700" fill="#0e6b22">STEP 6</text>
          <text x="80" y="486" fontSize="13" fill="#222">需要設備が系統から切離 → I_g 停止・事故区間隔離完了</text>
          <rect x="670" y="455" width="120" height="26" rx="13" fill="#fff" stroke="#aaa" strokeWidth="1"/>
          <text x="730" y="472" textAnchor="middle" fontSize="12" fill="#444" fontWeight="600">+0.1〜2 秒</text>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ STEP 3 を限時整定にすると合計0.5〜2秒、瞬時なら0.1〜0.2秒。上位系統との保護協調で決まる</div>
      </div>

      <PlainExplain>
        <p style={{margin: 0, fontSize: 13}}>💡 試験頻出ポイント：「<strong>GRは地絡を検出するだけ。実際に電流を切るのはCB</strong>」。GRとCBを混同すると正誤判定でひっかかる</p>
      </PlainExplain>

      <h2 id="solve">11. 解き方・判断手順（5ステップ）</h2>
      <SolveFlow type="計算" steps={[
        "問題が「中性点非接地」と読み取れたら → 対地静電容量による地絡電流の問題と判定",
        "Ig 全体（系統）か I₀（ZCT検出）か → どちらを問われているかを問題文から確認",
        "1線地絡 → 健全相の対地電圧は √3倍（線間電圧V）に上昇すると思い出す",
        "公式適用: I_g = 2√3 πfV(C₁+C₂)、ZCT検出は I₀ = 2√3 πfV·C₂",
        "数値代入時は単位（μF→F、kV→V）に注意。π=3.1416、√3=1.732 を覚えておく",
      ]} />

      <h2 id="memorize">12. 暗記ポイント</h2>
      <MemTable
        headers={["項目", "値・公式", "覚え方"]}
        rows={[
          ["系統地絡電流 I_g", "2√3 πfV(C₁+C₂)", "√3·2πf·C·V の4要素を並べる"],
          ["ZCT検出電流 I₀", "2√3 πfV·C₂", "I_gのCを「自設備分C₂」だけに置換"],
          ["健全相の対地電圧", "V（線間電圧 = 平常時の√3倍）", "中性点が地絡相位置に移動したと考える"],
          ["GR動作整定", "200〜600 mA", "平常時不平衡分以上、地絡時I₀未満"],
          ["保護動作合計時間", "0.1〜2秒", "瞬時0.1秒、限時2秒"],
          ["√3 の暗記値", "1.732", "「人並み（ヒトナミ）におごれや」"],
          ["π の暗記値", "3.1416", "公式計算では3.14でも可（誤差<0.1%）"],
        ]}
      />

      <h2 id="traps">13. よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "中性点非接地方式なら地絡電流はゼロで安全",         correct: "対地静電容量C経由で地絡電流は必ず流れる（ゼロではない）" },
        { wrong: "非接地系では地絡電流が流れないので保護装置不要",   correct: "ZCT+GR+CBの保護装置は必須。法的にも要求される" },
        { wrong: "非接地方式は接地方式より安全",                     correct: "健全相の対地電圧が√3倍に上昇するため絶縁負担は大きい" },
        { wrong: "ZCTが検出するのは系統全体の地絡電流 I_g",         correct: "ZCTが検出するのは自設備内のC₂分のみ（I₀=2√3πfVC₂）" },
        { wrong: "C₁の方が大きいから検出電流もC₁基準で計算",         correct: "C₁はZCTを貫通せず検出されない（電源側で完結）" },
        { wrong: "地絡時の対地電圧は変化しない",                       correct: "健全相の対地電圧は √3倍（線間電圧V）に上昇" },
        { wrong: "GRが電流を遮断する",                                 correct: "GRは検出・判定のみ。実際に切るのはCB（遮断器）" },
        { wrong: "GRさえあれば全ての地絡を確実に切れる",              correct: "GR（無方向）は他所の地絡で誤動作リスク → DGR（方向）が確実" },
        { wrong: "中性点非接地なら対地電圧は不明",                    correct: "平常時はV/√3（対称性により）、地絡時のみ変化" },
      ]} />

      <h2 id="exam-r05">14. 過去問: R05下 問11</h2>
      <ExamQuestion
        year="令和5年下期"
        qNum="11"
        question="図のように、中性点非接地方式の三相3線式高圧配電線路に接続された需要設備において、需要設備付近で1線地絡事故が発生した。線間電圧V[V]、周波数f[Hz]、高圧配電線路一相の全対地静電容量C₁[F]、需要設備一相の全対地静電容量C₂[F]、地絡抵抗Rg=0[Ω]（完全地絡）とする。"
        note="(a) 地絡電流 I_g [A] の式を求めよ ／ (b) V=6,600V, f=60Hz, C₁=2.3μF, C₂=0.02μF のとき、需要設備内のZCTが検出する電流[mA]を求めよ"
      />
      <ExamAnswer
        correct="(a) I_g = 2√3 πfV(C₁+C₂) ／ (b) 86 mA"
        explanations={[
          { choice: "(a)", mark: "○", reason: "1線完全地絡時、健全2相の対地電圧が線間電圧Vに上昇。各健全相の充電電流をベクトル合成して I_g = √3·ωV·(C₁+C₂) = 2√3 πfV(C₁+C₂)" },
          { choice: "(b)", mark: "○", reason: "I₀ = 2√3 πfV·C₂ = 2×1.732×3.1416×60×6,600×0.02×10⁻⁶ ≈ 0.0862 A = 86 mA。C₂分のみがZCTを貫通する" },
          { choice: "誤答62", mark: "×", reason: "√3を√2と勘違いした場合の値" },
          { choice: "誤答9925", mark: "×", reason: "C₂をC₁と取り違えた場合の値（系統全体のC₁分=I_C1）" },
        ]}
      />

      <h2 id="related-problems">15. 類題対応シナリオ</h2>
      <MemTable
        headers={["類題パターン", "何が変わるか", "解き方"]}
        rows={[
          ["① 地絡相が指定（a相→b相）", "健全相が変わるだけ", "√3倍の関係は不変、公式そのまま適用"],
          ["② 不完全地絡（Rg≠0）",       "地絡電流にRgの影響",       "等価回路にRg追加し位相考慮（応用）"],
          ["③ DGR整定値設計",            "動作電流をI_g未満に",       "I_設定 < I_C₂ で需要側のみ動作"],
          ["④ 高調波込み",               "fが複数",                  "各周波数で計算して合成（合成2乗和）"],
          ["⑤ 並行2回線・系統拡大",     "C₁が2倍など",             "系統C合計を再計算してから公式適用"],
        ]}
        note="本質「対地電圧×3相C」は不変。条件変化→公式の入力値を置き換えるだけ"
      />

      <h2 id="practical">16. 実務メモ：絶縁監視・警報・継続運転</h2>
      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>非接地系の特徴を活用した実務運用</strong></p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li><strong>絶縁監視装置（IGR/ICR）</strong>：常時、対地絶縁抵抗を監視。劣化兆候を早期発見</li>
          <li><strong>地絡警報</strong>：完全地絡前の「微地絡」段階で警報を発し、計画停電に持ち込める</li>
          <li><strong>継続運転の可能性</strong>：地絡電流が小さいため、即時遮断せず警報のみで運転継続する設備もある（病院・データセンター等の重要負荷）</li>
          <li><strong>対地静電容量の管理</strong>：ケーブル長増加で C₁・C₂ が増え、I_g 自体が増大 → 整定値見直しが必要</li>
        </ul>
      </PlainExplain>
      <MemTable
        headers={["装置/機能", "目的", "動作タイミング"]}
        rows={[
          ["絶縁監視装置(IGR/ICR)", "対地絶縁抵抗の常時監視", "完全地絡前（劣化段階）"],
          ["地絡警報", "微地絡の早期検知", "完全地絡前 or 完全地絡時"],
          ["GR + CB（一般）", "完全地絡時の自動遮断", "地絡発生後 0.1〜2秒"],
          ["DGR + CB（推奨）", "方向判別付き選択遮断", "地絡発生後 0.1〜2秒"],
          ["地絡継続運転(用途限定)", "重要負荷の運転継続", "警報のみ（遮断しない）"],
        ]}
        note="非接地方式は地絡電流が小さいので「即時遮断」と「警報→計画停電」の選択肢がある"
      />

      <h2 id="related-laws">17. 関連法規（条文との対応）</h2>
      <MemTable
        headers={["法規", "条文/規程", "本ページとの関係"]}
        rows={[
          ["電気事業法", "保安規程（第42条）", "地絡保護装置の設置・点検・整定が保安規程の必須事項"],
          ["電気設備技術基準", "第15条（地絡遮断装置）", "高圧電路の地絡時に自動遮断する装置の設置義務"],
          ["電技解釈", "第36条（地絡遮断装置の施設）", "GR動作整定値・遮断時間の具体規定"],
          ["電技解釈", "第19条（保安上または機能上必要な場合における電路の接地）", "非接地方式の根拠条文"],
          ["電技解釈", "第28条（混触防止）", "B種接地（1.7）と本ページの境界条文"],
          ["電技解釈", "第17条（接地工事の種類）", "B種接地抵抗値の算定（1.7と関連）"],
        ]}
        note="法規B問題では条文番号と内容の組合せが問われる。整理しておくこと"
      />
      <PlainExplain>
        <p style={{margin: 0, fontSize: 13}}>💡 <strong>本ページの位置づけ</strong>：技術基準第15条・解釈第36条が要求する「自動遮断」を、非接地系で実現する仕組みが ZCT+GR+CB。なぜ非接地でも保護が必要なのかは「非接地でも地絡電流は流れる」という本ページの結論が答え</p>
      </PlainExplain>

      <h2 id="quick-review">18. 1分復習</h2>
      <QuickReview items={[
        { q: "中性点非接地方式の高圧配電線路で1線完全地絡時の系統地絡電流の式は？", a: "I_g = 2√3 πfV(C₁+C₂)" },
        { q: "ZCTが検出する零相電流の式は？",                                    a: "I₀ = 2√3 πfV·C₂（自設備分のみ）" },
        { q: "1線地絡時、健全相の対地電圧はどう変化するか？",                    a: "平常時V/√3 → 線間電圧V（√3倍に上昇）" },
        { q: "C₁分の電流がZCTで検出されない理由は？",                            a: "ZCTより電源側で完結し、ZCTを貫通しないから" },
        { q: "保護システムの三役 ZCT・GR・CB の役割を一言で？",                  a: "ZCT=検出、GR=判定、CB=遮断" },
      ]} />

      <h2 id="cross-ref">19. 掛け算出題パターン</h2>
      <CrossRef patterns={[
        { a: "中性点非接地（1.8）",  b: "B種接地抵抗値（1.7）",            result: "「接地系」と「非接地系」の地絡電流計算の違い" },
        { a: "対地静電容量",          b: "DGR vs GR の選択",                result: "貰い事故防止の保護協調設計問題" },
        { a: "1線地絡",               b: "高調波・基本波の合成",            result: "実効値計算問題（応用）" },
      ]} />

      <NextAction nextPageId="bshu-setsuchi" nextPageTitle="B種接地抵抗値" onNav={onNav} />
      <UpdateLog entries={[
        { date: "2026-05-06", content: "v1.1: 接地方式比較表・フェーザ図SVG・実務メモ・関連法規・ひっかけ3項目を追加", reason: "ChatGPT 10点アドバイス対応・法規ページとしての網羅性向上" },
        { date: "2026-05-06", content: "v1.0: 初版作成（R05下問11対応）", reason: "R05下出題確認・容量性地絡電流の独立ページ化" },
      ]} />
      <PageNav
        prevId="bshu-setsuchi"     prevTitle="B種接地抵抗値"
        nextId="setsuchi-ichiran"  nextTitle="接地工事一覧表"
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
          denken-wiki「届出・申請期限一覧」を開く →
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
        届出期限は「条文の整理」に該当するため denken-wiki が SOT。
      </div>

      <UpdateLog entries={[{ date: "2026-05-05", content: "スタブ→denken-wikiへのリンクページに変更", reason: "二重実装回避・SOT統一" }]} />
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
