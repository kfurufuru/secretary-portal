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
    case 'ryokuritsu-kaizen':      return React.createElement(RyokurituKaizanPage, props);
    case 'juyoritsu-keisan':       return React.createElement(StubPage, { ...props, pageId: 'juyoritsu-keisan' });
    case 'bshu-setsuchi':          return React.createElement(BshuSetsuchiPage, props);
    case 'hichusei-jiraku':        return React.createElement(HichuseiJirakuPage, props);
    case 'zerosou-henryuki':       return React.createElement(ZeroSouHenryukiPage, props);
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
    case 'chokuzen-yougo':         return React.createElement(window.ChokuzenYougoPage, props);
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

// 試験日（電験3種 上期 2026・既定値）
// localStorage 'hoki_exam_date' (YYYY-MM-DD) で上書き可能
const HOKI_EXAM_DATE_DEFAULT = '2026-08-30';

function ExamCountdownBanner() {
  const [examDateStr, setExamDateStr] = React.useState(() => {
    try {
      const v = localStorage.getItem('hoki_exam_date');
      return (v && /^\d{4}-\d{2}-\d{2}$/.test(v)) ? v : HOKI_EXAM_DATE_DEFAULT;
    } catch (e) { return HOKI_EXAM_DATE_DEFAULT; }
  });
  const isCustom = examDateStr !== HOKI_EXAM_DATE_DEFAULT;
  const handleEdit = () => {
    const cur = examDateStr;
    const next = window.prompt('試験日を YYYY-MM-DD 形式で入力（空白でリセット）', cur);
    if (next === null) return;
    const trimmed = next.trim();
    if (trimmed === '') {
      try { localStorage.removeItem('hoki_exam_date'); } catch (e) {}
      setExamDateStr(HOKI_EXAM_DATE_DEFAULT);
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      alert('形式が違います。例: 2026-08-30');
      return;
    }
    try { localStorage.setItem('hoki_exam_date', trimmed); } catch (e) {}
    setExamDateStr(trimmed);
  };
  const examDate = new Date(examDateStr + 'T00:00:00+09:00');
  const today = new Date();
  const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
  if (daysLeft <= 0) {
    return (
      <div style={{ marginBottom: 24, padding: '10px 14px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>📅 電験3種法規 試験日（{examDateStr}）終了</span>
        <button onClick={handleEdit} style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', fontSize: 11, color: 'var(--ink-3)', cursor: 'pointer' }}>⚙ 試験日変更</button>
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
        <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>
          {examDateStr}{isCustom ? '' : '（既定）'}
        </span>
        <button
          onClick={handleEdit}
          title="試験日を変更"
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', fontSize: 11, color: 'var(--ink-3)', cursor: 'pointer' }}
        >
          ⚙ 変更
        </button>
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{phase}</div>
    </div>
  );
}

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

  // 用語クイズ進捗サマリー（localStorage から直接集計）
  const yqStats = React.useMemo(function() {
    let mastered = 0, learning = 0, untouched = 0, total = 0;
    try {
      const raw = localStorage.getItem('hoki_quiz_glossary_progress');
      const prog = raw ? JSON.parse(raw) || {} : {};
      const gdata = window.GLOSSARY_TERMS_V1;
      const terms = (gdata && Array.isArray(gdata.terms)) ? gdata.terms : [];
      total = terms.length;
      for (let i = 0; i < terms.length; i++) {
        const t = terms[i];
        const e = prog[t.id];
        const stage = (e && typeof e.stage === 'number') ? e.stage : 0;
        const last = e ? e.lastResult : null;
        if (stage >= 3) mastered++;
        else if (stage > 0 || last) learning++;
        else untouched++;
      }
    } catch(err) {}
    return { mastered: mastered, learning: learning, untouched: untouched, total: total };
  }, []);

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
      <ExamCountdownBanner />


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

        {/* ====== 用語クイズ クイックアクセスカード ====== */}
        <div style={{ marginTop: 12, padding: '14px 18px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderLeft: '4px solid #c8a830', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <div style={{ fontSize: 11, color: '#8a6500', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 4 }}>直前チェック · 用語SRS</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
              📝 用語クイズ <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--ink-3)' }}>第58条 {yqStats.total || 10}語</span>
            </div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ width: (yqStats.total > 0 ? Math.round((yqStats.mastered + yqStats.learning) / yqStats.total * 100) : 0) + '%', height: '100%', background: '#c8a830', borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 12, flexWrap: 'wrap' }}>
              <span style={{ color: '#1a6e1a', fontWeight: 600 }}>✅ {yqStats.mastered}語 マスター</span>
              <span style={{ color: '#8a6500', fontWeight: 600 }}>🤔 {yqStats.learning}語 学習中</span>
              <span style={{ color: 'var(--ink-3)' }}>⬜ {yqStats.untouched || (yqStats.total || 10) - yqStats.mastered - yqStats.learning}語 未着手</span>
            </div>
          </div>
          <button className="btn primary" onClick={() => onNav('chokuzen-yougo')} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            クイズを始める →
          </button>
        </div>
      </section>

      {/* ====== 教材CH対応表（折りたたみ・参照資料） ====== */}
      <section style={{ marginBottom: 40 }}>
        <details style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px 16px' }}>
          <summary style={{ cursor: 'pointer', padding: '6px 0', fontSize: 14, fontWeight: 600, listStyle: 'revert' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em' }}>教材対応表</span>
            <span style={{ marginLeft: 12 }}>市販テキストCH ↔ Wikiカテゴリ</span>
            <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--ink-3)' }}>（S→A→Bの順で攻める）</span>
          </summary>
          <p style={{ margin: '8px 0 12px', fontSize: 13, color: 'var(--ink-2)' }}>どのCHを先に読むかで合否が変わる。下の優先度順に。</p>
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
        </details>
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
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{ROADMAP.length}ステップで合格まで</h2>
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
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>STEP {s.step} / {ROADMAP.length}</span>
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
            <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--ink-2)' }}>過去10年（H28-R07）kakomon.yml 集計の上位S群。詳細はサイドバー「分野で探す」で5/10/15年切替。</p>
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
// 4-0. RyokurituKaizanPage（力率改善・直列リアクトル付進相コンデンサ・1.5）
// ─────────────────────────────────────────────
function RyokurituKaizanPage({ onNav, data }) {
  return (
    <div>
      <DirectCheckMode
        pageId="ryokuritsu-kaizen"
        formula="Vc = V / (1 − XL/Xc)  [V]"
        formulaVars={[
          { sym: "V",       desc: "系統線間電圧 [V]（問題で与えられる値）" },
          { sym: "Xc",      desc: "コンデンサのリアクタンス [Ω]（容量性）" },
          { sym: "XL",      desc: "直列リアクトルのリアクタンス [Ω]（= k·Xc, k=0.06など）" },
          { sym: "1−XL/Xc", desc: "直列リアクトル係数：XL=0.06Xc なら 1−0.06=0.94" },
        ]}
        warningRed="コンデンサ端子電圧 Vc は系統電圧 V より高くなる（Vc > V）。これが試験最頻ひっかけ"
        trapsTop3={[
          "「コンデンサ電圧 = 系統電圧 6,600V」→ 実際は <strong>6,600/0.94 ≒ 7,021V（系統電圧を超える）</strong>",
          "コンデンサ容量[kvar]に直列リアクトル分を足さず 175kvar をそのまま使う → 正しくは <strong>175/0.94 ≒ 186kvar</strong>",
          "VL と Vc が同位相と勘違い → 直列LC回路では <strong>逆位相（180°差）</strong>",
        ]}
        jumps={[
          { id: "exam-r05-12", label: "過去問 R05下問12 へ →", primary: true },
          { id: "quick-review", label: "1分復習 →" },
          { id: "traps", label: "ひっかけ一覧 →" },
        ]}
      />

      <GoalQuestion
        question="三相3線式高圧電路（線間電圧6,600V）に300kW・遅れ力率0.6の三相負荷が接続されている。直列リアクトル（SR）とコンデンサ（SC）を直列接続した進相コンデンサ設備を並列接続する。SRのリアクタンスXL はSCのリアクタンスXc の6%である。(a) SCの端子電圧 [V] を求めよ。(b) 力率を0.6から0.8に改善するためのSC容量 [kvar] を求めよ。"
        choices={[
          "(a) 6,410 / (b) 170",
          "(a) 6,795 / (b) 180",
          "(a) 6,807 / (b) 186",
          "(a) 6,995 / (b) 192",
          "(a) 7,021 / (b) 186",
        ]}
        year="R05下 問12"
        note="読み終えたら戻って解こう。ヒント：直列LC等価回路の電圧分圧"
      />

      <ConclusionBox>
        <ul>
          <li>直列リアクトル（SR）は <strong>高調波障害抑制・突入電流制限</strong> のために設置する</li>
          <li>SR + SC の直列回路では <strong>Vc = V / (1 − XL/Xc)</strong>。コンデンサ電圧が系統電圧を超える</li>
          <li>XL = 0.06Xc → <strong>Vc = 6,600 / 0.94 ≒ 7,021V</strong>（選択肢⑤）</li>
          <li>コンデンサ容量は「必要無効電力差 / (1 − XL/Xc)」で求める：<strong>175 / 0.94 ≒ 186 kvar</strong></li>
        </ul>
      </ConclusionBox>

      <MinShortcutCard
        title="📋 試験用 最短解法カード（R05下問12）"
        steps={[
          <span><strong>(a) コンデンサ電圧</strong>：Vc = V ÷ (1 − 0.06) = 6,600 ÷ 0.94 ≒ 7,021 V</span>,
          <span><strong>(b) Step1 必要無効電力</strong>：Q₁(改善前) = 300 × tan(arccos 0.6) = 300 × 0.8/0.6 = 400 kvar</span>,
          <span><strong>(b) Step2 改善後</strong>：Q₂ = 300 × tan(arccos 0.8) = 300 × 0.6/0.8 = 225 kvar</span>,
          <span><strong>(b) Step3 差分</strong>：ΔQ = 400 − 225 = 175 kvar（コンデンサ設備が供給すべき正味量）</span>,
          <span><strong>(b) Step4 SC容量</strong>：Qsc = 175 ÷ (1 − 0.06) = 175 ÷ 0.94 ≒ 186 kvar</span>,
        ]}
        hint="tan(arccos 0.6) = 0.8/0.6、tan(arccos 0.8) = 0.6/0.8 を覚えると一発計算できる"
      />

      <MetaStrip
        ch="CH04"
        category="01 B問題・計算問題対策"
        importance="A"
        freq="mid"
        examType="B問題"
        targets="R05下"
        tags={["力率改善", "進相コンデンサ", "直列リアクトル", "等価回路", "無効電力"]}
        lastChecked="2026-05-07"
      />

      <h2>§3 試験で問われること</h2>
      <ExamFocus items={[
        "直列リアクトル付進相コンデンサのSC端子電圧計算（Vc = V/(1−k)）",
        "力率改善に必要なSC容量計算（ΔQ/(1−k)）",
        "tan を使った無効電力の求め方（tan = 対辺/隣辺 = sinθ/cosθ）",
        "直列リアクトルの役割（高調波抑制・突入電流制限）",
        "コンデンサ電圧が系統電圧を超える理由（逆位相で差し引き）",
      ]} />

      <h2>§4 直列リアクトル付進相コンデンサの等価回路</h2>
      <PlainExplain>
        <p><strong>なぜ直列リアクトルを入れるか：</strong> 高圧系統のコンデンサに突入電流が流れると機器が損傷し、高調波が系統を汚染する。SRを直列に入れると突入電流のピークを抑え、5次・7次高調波の流入を防げる。代償として回路はLC直列になる。</p>
        <p><strong>等価回路の考え方（一相）：</strong></p>
      </PlainExplain>

      {/* 一相等価回路SVG */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>▼ 直列リアクトル付進相コンデンサ 一相等価回路</div>
        <div>
          <svg viewBox="0 0 560 220" width="100%" style={{ display: 'block', maxWidth: 560 }}>
            {/* 電源 */}
            <circle cx="50" cy="110" r="28" fill="none" stroke="#555" strokeWidth="1.5" />
            <text x="50" y="107" textAnchor="middle" fontSize="11" fill="#555">E</text>
            <text x="50" y="120" textAnchor="middle" fontSize="9" fill="#888">V/√3</text>
            {/* 上線（電源+端子→SR→SC→負荷側） */}
            <line x1="78" y1="90" x2="130" y2="90" stroke="#444" strokeWidth="1.5" />
            {/* SR ボックス */}
            <rect x="130" y="78" width="70" height="24" rx="4" fill="none" stroke="#c66" strokeWidth="1.5" />
            <text x="165" y="94" textAnchor="middle" fontSize="11" fill="#c66" fontWeight="700">SR（jXL）</text>
            {/* SR→SC 接続線 */}
            <line x1="200" y1="90" x2="260" y2="90" stroke="#444" strokeWidth="1.5" />
            {/* SC ボックス */}
            <rect x="260" y="78" width="70" height="24" rx="4" fill="none" stroke="#27c" strokeWidth="2" />
            <text x="295" y="94" textAnchor="middle" fontSize="11" fill="#27c" fontWeight="700">SC（−jXc）</text>
            {/* SC→右端 */}
            <line x1="330" y1="90" x2="410" y2="90" stroke="#444" strokeWidth="1.5" />
            {/* 負荷（右側） */}
            <rect x="410" y="78" width="70" height="50" rx="4" fill="none" stroke="#888" strokeWidth="1.5" />
            <text x="445" y="100" textAnchor="middle" fontSize="11" fill="#555">負荷</text>
            <text x="445" y="114" textAnchor="middle" fontSize="9" fill="#888">300kW</text>
            <text x="445" y="126" textAnchor="middle" fontSize="9" fill="#888">cosφ=0.6</text>
            {/* 下線（GND） */}
            <line x1="78" y1="130" x2="410" y2="130" stroke="#444" strokeWidth="1.5" />
            <line x1="480" y1="128" x2="480" y2="130" stroke="#444" strokeWidth="1.5" />
            <line x1="480" y1="130" x2="480" y2="130" stroke="#444" strokeWidth="1.5" />
            {/* 電圧ラベル：VL */}
            <text x="165" y="72" textAnchor="middle" fontSize="10" fill="#c66">VL = XL×I</text>
            {/* 電圧ラベル：Vc */}
            <text x="295" y="72" textAnchor="middle" fontSize="10" fill="#27c" fontWeight="700">Vc = Xc×I</text>
            {/* 矢印 E（電源電圧 = VL + Vc の差） */}
            <text x="90" y="160" textAnchor="middle" fontSize="10" fill="#396">E = V/√3</text>
            <text x="260" y="175" textAnchor="middle" fontSize="10" fill="#396">E = Vc − VL（逆位相で差し引き）</text>
            {/* SR端子電圧ブレース */}
            <line x1="130" y1="108" x2="130" y2="150" stroke="#c66" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="200" y1="108" x2="200" y2="150" stroke="#c66" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="130" y1="150" x2="200" y2="150" stroke="#c66" strokeWidth="1" />
            <text x="165" y="165" textAnchor="middle" fontSize="9" fill="#c66">VL = 0.06·Vc</text>
            {/* SC端子電圧ブレース */}
            <line x1="260" y1="108" x2="260" y2="188" stroke="#27c" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="330" y1="108" x2="330" y2="188" stroke="#27c" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="260" y1="188" x2="330" y2="188" stroke="#27c" strokeWidth="2" />
            <text x="295" y="202" textAnchor="middle" fontSize="9" fill="#27c" fontWeight="700">Vc = E/0.94 &gt; E</text>
          </svg>
        </div>
      </div>

      <PlainExplain>
        <p><strong>電圧が「逆位相で差し引き」になる理由：</strong> SR（インダクタ）の端子電圧 VL と SC（コンデンサ）の端子電圧 Vc は位相が 180° ずれる（電流に対してそれぞれ +90° と −90°）。そのため、回路の合成電圧は Vc − VL になる。</p>
        <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, fontFamily: 'serif', padding: '10px 0', color: 'var(--ink-1)' }}>
          E = Vc − VL = Vc − XL/Xc × Vc = Vc × (1 − XL/Xc)
        </div>
        <p>これを Vc について解くと：</p>
        <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 700, fontFamily: 'serif', padding: '8px 0', color: '#27c' }}>
          Vc = E / (1 − XL/Xc) = V / (1 − 0.06) = V / 0.94
        </div>
        <p>三相線間電圧 V = 6,600V では：<strong>Vc = 6,600 / 0.94 ≒ 7,021V（系統電圧 6,600V を超える）</strong></p>
      </PlainExplain>

      {/* フェーザ図 SVG */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>▼ フェーザ図（電圧の位相関係）</div>
        <div>
          <svg viewBox="0 0 320 220" width="100%" style={{ display: 'block', maxWidth: 320 }}>
            {/* 原点 */}
            <circle cx="80" cy="110" r="3" fill="#444" />
            {/* E（端子電圧、基準ベクトル - 右向き） */}
            <line x1="80" y1="110" x2="210" y2="110" stroke="#396" strokeWidth="2.5" markerEnd="url(#arrowPhasor)" />
            <text x="218" y="114" fontSize="11" fill="#396" fontWeight="700">E (= V/√3)</text>
            {/* 矢印マーカー定義 */}
            <defs>
              <marker id="arrowPhasor" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#444"/>
              </marker>
              <marker id="arrowVc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
              </marker>
              <marker id="arrowVL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="#c66"/>
              </marker>
            </defs>
            {/* 電流 I（基準、右向き）- 点線 */}
            <line x1="80" y1="140" x2="160" y2="140" stroke="#888" strokeWidth="1" strokeDasharray="4,2" />
            <text x="168" y="144" fontSize="10" fill="#888">I（基準）</text>
            {/* Vc（電流に対して -90°、下向きが容量性なのでここでは I より -90° = 左右逆に考えて... 実際は容量性なのでVcはIより-90°）*/}
            {/* コンデンサ：電圧はI より -90°（電流が先行）→ Vcは下向き */}
            <line x1="80" y1="110" x2="80" y2="210" stroke="#27c" strokeWidth="2" markerEnd="url(#arrowVc)" />
            <text x="85" y="208" fontSize="11" fill="#27c" fontWeight="700">Vc（電流より−90°）</text>
            {/* VL（インダクタ：電流より+90°→ 上向き） */}
            <line x1="80" y1="110" x2="80" y2="50" stroke="#c66" strokeWidth="2" markerEnd="url(#arrowVL)" />
            <text x="85" y="48" fontSize="11" fill="#c66" fontWeight="700">VL（電流より+90°）</text>
            {/* VcがVLより大きいため差し引きでVc方向（下向き）が残る → Eは... wait */}
            {/* 実際には：E = Vc - VL（ベクトル）→ Eは下向き成分が残る。でも線間電圧Eは実数（基準）なので... */}
            {/* フェーザ図を修正：Iを基準（右向き）、Vcは電流より-90°(下向き)、VLは電流より+90°(上向き)、E = Vc + VL (ベクトル和) = 下向き - 上向き の一部 */}
            {/* ラベル */}
            <text x="20" y="110" fontSize="10" fill="#444">|Vc| &gt; |E|</text>
            <text x="20" y="125" fontSize="9" fill="#888">∵ VLとVcが逆位相</text>
            <text x="20" y="140" fontSize="9" fill="#888">E = Vc − VL</text>
          </svg>
        </div>
      </div>

      <h2>§5 略号と数値の整理</h2>
      <MemTable
        headers={["記号", "意味", "値・算出"]}
        rows={[
          ["V",        "系統線間電圧",                 "6,600V（問題で与えられる）"],
          ["XL",       "直列リアクトルのリアクタンス", "= 0.06 Xc（k = 6%）"],
          ["Xc",       "コンデンサのリアクタンス",     "= 1/(ωC)、問題では比率で処理"],
          ["k",        "直列リアクトル比率",           "k = XL/Xc = 0.06（6%）"],
          ["Vc",       "コンデンサ端子電圧",           "= V / (1−k) = 6,600 / 0.94 ≒ 7,021V"],
          ["Q₁",      "改善前の無効電力",             "= P × tan(arccos cosφ₁) = 300 × 0.8/0.6 = 400 kvar"],
          ["Q₂",      "改善後の無効電力",             "= P × tan(arccos cosφ₂) = 300 × 0.6/0.8 = 225 kvar"],
          ["ΔQ",      "必要な無効電力差",             "= Q₁ − Q₂ = 400 − 225 = 175 kvar"],
          ["Qsc",     "SC容量（kvar）",               "= ΔQ / (1−k) = 175 / 0.94 ≒ 186 kvar"],
        ]}
        note="tan(arccos 0.6) = sin/cos = 0.8/0.6、tan(arccos 0.8) = 0.6/0.8 は暗算で出せるようにする"
      />

      <h2>§6 解き方（思考順序）- (a) コンデンサ端子電圧</h2>
      <SolveFlow type="(a) 計算" steps={[
        "SR と SC が直列 → 一相等価回路で「電源電圧 E = Vc − VL」と設定",
        "XL = 0.06Xc を代入：VL = XL×I = 0.06Xc×I = 0.06×Vc",
        "整理：E = Vc − 0.06Vc = 0.94Vc",
        "Vc = E / 0.94 に線間電圧 6,600V を代入（SR+SCは線間に接続）",
        "Vc = 6,600 / 0.94 ≒ 7,021V → 選択肢⑤",
      ]} />

      <h2>§7 解き方（思考順序）- (b) コンデンサ容量</h2>
      <SolveFlow type="(b) 計算" steps={[
        "改善前の無効電力：Q₁ = P × tan(arccos 0.6) = 300 × (0.8/0.6) = 400 kvar",
        "改善後の無効電力：Q₂ = P × tan(arccos 0.8) = 300 × (0.6/0.8) = 225 kvar",
        "コンデンサ設備が供給すべき正味無効電力：ΔQ = Q₁ − Q₂ = 175 kvar",
        "コンデンサ容量 Qsc の内訳：SCが発生する容量のうち、SRが 0.06Qsc を消費（XL=0.06Xcより）",
        "正味供給 = Qsc − 0.06Qsc = 0.94Qsc = ΔQ = 175 → Qsc = 175/0.94 ≒ 186 kvar → 選択肢③",
      ]} />

      <PlainExplain>
        <p style={{ margin: 0 }}><strong>（b）の核心：なぜ SC 容量に直列リアクトル分を加算するか</strong></p>
        <p>SCが 186kvar の容量を持っていても、直列リアクトルが 0.06×186 ≒ 11kvar を「消費」するため、負荷に届く無効電力は 175kvar。つまり SC の「総容量 Qsc」と「正味供給量 ΔQ」の関係は：</p>
        <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, fontFamily: 'serif', padding: '8px 0', color: '#27c' }}>
          ΔQ = Qsc × (1 − XL/Xc) → Qsc = ΔQ / (1 − XL/Xc)
        </div>
        <p>（a）のコンデンサ電圧の式と<strong>同じ係数（1−k）</strong>が分母に来る。2問とも同じ等価回路から出てくる一貫した関係。</p>
      </PlainExplain>

      <h2 id="traps">§8 よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "コンデンサ端子電圧 Vc = 系統線間電圧 6,600V",                 correct: "Vc > V。SR（XL）があるため Vc = 6,600/0.94 ≒ 7,021V（系統電圧を超える）" },
        { wrong: "VL と Vc は同方向（位相が等しい）",                           correct: "インダクタと容量は 180° 逆位相。VL は電流より +90°、Vc は −90° → E = Vc − VL" },
        { wrong: "SC容量 = ΔQ = 175 kvar（直列リアクトル分を無視）",            correct: "SRがQscの6%を消費するため Qsc = 175/0.94 ≒ 186 kvar" },
        { wrong: "tan(arccos 0.6) = 0.6 （またはそのまま使えない）",            correct: "tan = sin/cos = √(1−0.6²)/0.6 = 0.8/0.6 ≒ 1.333。力率の三角形で即計算" },
        { wrong: "改善前Q = P × cosφ = 300 × 0.6 = 180 kvar",                  correct: "Q = P × tanφ = P × sinφ/cosφ。P×cosφ は有効電力 P 自身ではなく皮相電力の有効成分" },
        { wrong: "直列リアクトルの目的は力率改善",                               correct: "SRの目的は高調波抑制・突入電流制限。力率改善はSCが担う" },
        { wrong: "Qsc = ΔQ × (1 − 0.06) = 175 × 0.94 = 164.5kvar（逆算ミス）", correct: "Qsc = ΔQ ÷ (1 − 0.06) = 175 ÷ 0.94 ≒ 186kvar（割り算）" },
      ]} />

      <h2 id="exam-r05-12">§9 過去問：R05下 問12 完全解答</h2>
      <ExamQuestion
        year="令和5年下期"
        qNum="12(a)"
        question="三相3線式高圧電路（線間電圧6,600V）に、300kW・遅れ力率0.6の三相負荷と、直列リアクトル（SR）付進相コンデンサ（SC）設備を並列接続した。SRのリアクタンスXLはSCのリアクタンスXcの6%である。このとき三相コンデンサSCの端子電圧の値[V]として最も近いものを選べ。"
        choices={["(1) 6,410", "(2) 6,795", "(3) 6,807", "(4) 6,995", "(5) 7,021"]}
        note="SR + SC を直列として一相等価回路を作成。線間電圧が印加される前提で計算"
      />
      <SolveFlow type="解法 (a)" steps={[
        "SR（XL = 0.06Xc）とSC（Xc）の直列回路に線間電圧 V = 6,600V が印加",
        "電流 I = V / (Xc − XL) = V / (0.94Xc)（XL < Xc なので合成は容量性）",
        "SC端子電圧 Vc = Xc × I = Xc × V/(0.94Xc) = V/0.94",
        "Vc = 6,600 / 0.94 ≒ 7,021V → (5) が正解",
      ]} />
      <ExamAnswer
        correct="(5) 7,021V"
        explanations={[
          { choice: "(1)", mark: "×", reason: "6,410V。Vc = 6600 × 0.94 ≒ 6,204（誤方向）ではなく誤計算パターン" },
          { choice: "(2)", mark: "×", reason: "6,795V。√3 を掛け誤った等のパターン" },
          { choice: "(3)", mark: "×", reason: "6,807V。係数違い（0.06でなく別の値を使用）" },
          { choice: "(4)", mark: "×", reason: "6,995V。近似値の取り方を誤ったパターン" },
          { choice: "(5)", mark: "○", reason: "7,021V。Vc = 6,600/0.94 = 7,021V。コンデンサ電圧は系統電圧を超える" },
        ]}
      />

      <ExamQuestion
        year="令和5年下期"
        qNum="12(b)"
        question="(a)と同じ系統で、力率を遅れ0.6から遅れ0.8に改善したい。必要な三相コンデンサSCの容量[kvar]として最も近いものを選べ。"
        choices={["(1) 170", "(2) 180", "(3) 186", "(4) 192", "(5) 208"]}
        note="「コンデンサが供給すべき正味無効電力」と「SC容量」の違いに注意"
      />
      <SolveFlow type="解法 (b)" steps={[
        "改善前無効電力：Q₁ = 300 × (0.8/0.6) = 400 kvar",
        "改善後無効電力：Q₂ = 300 × (0.6/0.8) = 225 kvar",
        "必要な正味無効電力：ΔQ = 400 − 225 = 175 kvar",
        "SRがQsc × 0.06 を消費するため：Qsc × 0.94 = 175",
        "Qsc = 175 / 0.94 ≒ 186 kvar → (3) が正解",
      ]} />
      <ExamAnswer
        correct="(3) 186 kvar"
        explanations={[
          { choice: "(1)", mark: "×", reason: "170 kvar。直列リアクトル分を引いてしまった（175×0.94≒164を別途計算ミス）" },
          { choice: "(2)", mark: "×", reason: "180 kvar。丸め誤りまたはk=0.028を使用したパターン" },
          { choice: "(3)", mark: "○", reason: "186 kvar。175/0.94 ≒ 186.2 → 四捨五入" },
          { choice: "(4)", mark: "×", reason: "192 kvar。ΔQに対して別の係数を適用したパターン" },
          { choice: "(5)", mark: "×", reason: "208 kvar。力率改善の計算自体を誤ったパターン（Q₁の計算ミス等）" },
        ]}
      />

      <h2 id="quick-review">§10 1分復習</h2>
      <QuickReview items={[
        { q: "直列リアクトルを設置する目的は？",                                a: "高調波障害抑制・進相コンデンサへの突入電流制限" },
        { q: "SR + SC 直列回路でコンデンサ端子電圧の式は？",                   a: "Vc = V / (1 − XL/Xc)（系統電圧より高くなる）" },
        { q: "XL = 0.06Xc のとき Vc = ?（V = 6,600V）",                       a: "6,600 / 0.94 ≒ 7,021V" },
        { q: "力率改善に必要な SC 容量の求め方は？",                            a: "ΔQ（必要無効電力差）を (1−XL/Xc) で割る" },
        { q: "なぜ VL と Vc は逆位相か？",                                      a: "インダクタ電圧は電流より+90°、コンデンサ電圧は電流より−90°。差が 180°" },
        { q: "tan(arccos 0.6) は？",                                           a: "0.8/0.6（力率三角形：sin=0.8、cos=0.6）" },
        { q: "tan(arccos 0.8) は？",                                           a: "0.6/0.8（sin=0.6、cos=0.8）" },
      ]} />

      <CrossRef patterns={[
        { a: "力率改善（1.5）",    b: "需要率・負荷率・不等率（1.6）", result: "どちらも「系統管理の効率化」のB問題。数値計算の手順が似ている" },
        { a: "コンデンサ端子電圧", b: "B種接地抵抗値（1.7）",          result: "どちらも「実際の値は単純数値から計算で変わる」点が試験ポイント" },
        { a: "直列LC等価回路",    b: "中性点非接地系地絡電流（1.8）",   result: "どちらも等価回路で「直感と逆の結果」（Vc>V / 地絡電流>0）を導く" },
      ]} />

      <UpdateLog entries={[
        { date: "2026-05-07", content: "v1.0: 初版（R05下問12対応・直列リアクトル等価回路・フェーザ図・(a)(b)完全解法）", reason: "R05下問12 stub解消・等価回路詳細解説" },
      ]} />

      <PageNav
        prevId="juyoritsu-keisan"  prevTitle="需要率・負荷率・不等率"
        nextId="bshu-setsuchi"     nextTitle="B種接地抵抗値"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 4-1. BshuSetsuchiPage（B種接地抵抗値・1.7）
// ─────────────────────────────────────────────
function BshuSetsuchiPage({ onNav, data }) {
  return (
    <div>
      <DirectCheckMode
        pageId="bshu-setsuchi"
        formula="R_B ≤ 150 / Ig  [Ω]"
        formulaVars={[
          { sym: "Ig",  desc: "高圧電路の1線地絡電流 [A]（配電会社が提供または計算値）" },
          { sym: "150", desc: "1秒超/遮断なし → 150/Ig [Ω]（原則）" },
          { sym: "300", desc: "1秒以内自動遮断 → 300/Ig [Ω]（緩和）" },
          { sym: "600", desc: "0.5秒以内自動遮断 → 600/Ig [Ω]（さらに緩和）" },
        ]}
        warningRed="遮断時間が短いほど許容抵抗値が大きくなる（緩和方向）"
        trapsTop3={[
          "「B種の抵抗値は固定値」→ 実際は <strong>Igによって変わる計算値</strong>",
          "「遮断が速いほど抵抗値が小さくなる」→ 逆。速いほど <strong>上限値が大きく（緩和）</strong>なる",
          "「B種は低圧機器の保護」→ 実際は <strong>変圧器の高低圧混触防止</strong>（低圧側中性点に施設）",
        ]}
        jumps={[
          { id: "exam-past",    label: "過去問形式へ →", primary: true },
          { id: "quick-review", label: "1分復習 →" },
          { id: "traps",        label: "ひっかけ一覧 →" },
        ]}
      />

      <GoalQuestion
        question="高圧電路と低圧電路を結合する変圧器に施すB種接地工事について。変圧器の高圧側電路の1線地絡電流が5Aの場合、B種接地抵抗の最大値として正しいものはどれか（高圧電路は1秒を超えて自動的に遮断されないものとする）。"
        choices={["10 Ω", "30 Ω", "60 Ω", "150 Ω"]}
        year="頻出パターン（解釈17条型）"
        note="読み終えたら戻って解こう。ヒント：R_B = 150/Ig"
      />

      <ConclusionBox>
        <ul>
          <li>B種接地工事は <strong>変圧器低圧側中性点（または一端）</strong> に施設する（混触時の低圧側電圧上昇を抑制）</li>
          <li>接地抵抗上限: <strong>R_B ≤ 150/Ig</strong>（Ig: 高圧電路の1線地絡電流）</li>
          <li>自動遮断が速いほど上限が緩和：1秒以内→<strong>300/Ig</strong>、0.5秒以内→<strong>600/Ig</strong></li>
          <li>接地線の太さ: <strong>4.0 mm 以上</strong>（A/C/D種より太い・B種だけ別格）</li>
        </ul>
      </ConclusionBox>

      <MinShortcutCard
        title="📋 試験用 最短解法カード（B問題対策）"
        steps={[
          <span><strong>遮断時間を確認</strong>：問題文で「1秒超」「1秒以内」「0.5秒以内」のどれかを読み取る</span>,
          <span><strong>係数を選択</strong>：1秒超→150、1秒以内→300、0.5秒以内→600</span>,
          <span><strong>Ig で割る</strong>：R_B(max) = 係数 / Ig</span>,
          <span><strong>単位確認</strong>：IgはA（アンペア）、R_BはΩ</span>,
        ]}
        hint="ゴール問題の正解：R_B = 150/5 = 30 Ω（1秒超→係数150）"
      />

      <MetaStrip
        ch="CH04"
        category="01 B問題・計算問題対策"
        importance="S"
        freq="max"
        examType="B問題"
        targets="H29・R02・R04"
        tags={["B種接地", "1線地絡電流", "混触防止", "変圧器", "解釈17条"]}
        lastChecked="2026-05-07"
      />

      <h2>§3 試験で問われること</h2>
      <ExamFocus items={[
        "B種接地抵抗の最大値計算：R_B = 150/Ig（数値代入）",
        "遮断時間による係数の使い分け：150・300・600の3パターン",
        "B種接地の施設場所：変圧器低圧側中性点（または一端）",
        "B種接地線の太さ：4.0 mm 以上（他種との差）",
        "B種接地の目的：高低圧混触時の低圧側電圧上昇抑制",
      ]} />

      <h2>§4 略号と役割</h2>
      <MemTable
        headers={["記号", "名称", "意味・用途"]}
        rows={[
          ["R_B",  "B種接地抵抗値",        "変圧器低圧側中性点に施す接地の抵抗値 [Ω]"],
          ["Ig",   "1線地絡電流",           "高圧電路で1線が完全地絡したときに流れる電流 [A]"],
          ["150",  "基準係数",              "1秒超or遮断なし→ 150/Ig [Ω] が上限"],
          ["300",  "緩和係数（1秒以内）",   "高圧電路が1秒以内に自動遮断される場合→ 300/Ig"],
          ["600",  "緩和係数（0.5秒以内）", "高圧電路が0.5秒以内に自動遮断される場合→ 600/Ig"],
        ]}
        note="Igは配電事業者から提供される値を使用するか、電路の条件から算定する"
      />

      <h2>§5 B種接地の意義（電技解釈17条）</h2>
      <PlainExplain>
        <p><strong>なぜB種接地が必要か：</strong> 高圧と低圧の電路を結合する変圧器では、絶縁が劣化すると高圧側と低圧側が電気的に接触（混触）する事故が起きる。このとき、接地なしでは低圧側の対地電圧が高圧側の電圧まで跳ね上がり、感電・火災のリスクが生じる。</p>
        <p><strong>B種接地による保護原理：</strong> 低圧側中性点をB種接地すると、混触時に流れる地絡電流は「高圧側Ig → 変圧器 → 低圧中性点 → B種接地線 → 大地 → 高圧側電源」という経路をたどる。このとき低圧側の対地電圧は：</p>
        <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 700, color: '#a06', fontFamily: 'serif', padding: '10px 0' }}>
          V_低圧対地 = Ig × R_B ≤ 150V
        </div>
        <p>と制限される（150/Ig × Ig = 150V）。つまり係数「150」は <strong>混触時の低圧側対地電圧を150V以下に抑える</strong> という設計思想から来ている。</p>
      </PlainExplain>

      <h2>§6 接地抵抗値の算定式（遮断時間別）</h2>

      {/* 混触保護SVG図 */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>▼ B種接地の混触保護回路（概念図）</div>
        <div>
          <svg viewBox="0 0 480 200" width="100%" style={{ display: 'block', maxWidth: 480 }}>
            {/* 高圧側 */}
            <rect x="10" y="30" width="100" height="50" rx="6" fill="none" stroke="#888" strokeWidth="1.5" />
            <text x="60" y="52" textAnchor="middle" fontSize="11" fill="#555">高圧電路</text>
            <text x="60" y="68" textAnchor="middle" fontSize="10" fill="#888">6.6 kV系</text>
            {/* 変圧器 */}
            <rect x="170" y="20" width="80" height="90" rx="6" fill="none" stroke="#a06" strokeWidth="2" />
            <text x="210" y="55" textAnchor="middle" fontSize="11" fill="#a06" fontWeight="700">変圧器</text>
            <text x="210" y="72" textAnchor="middle" fontSize="10" fill="#a06">高→低</text>
            <text x="210" y="88" textAnchor="middle" fontSize="10" fill="#888">混触リスク↑</text>
            {/* 低圧側 */}
            <rect x="310" y="30" width="100" height="50" rx="6" fill="none" stroke="#888" strokeWidth="1.5" />
            <text x="360" y="52" textAnchor="middle" fontSize="11" fill="#555">低圧電路</text>
            <text x="360" y="68" textAnchor="middle" fontSize="10" fill="#888">200/100 V系</text>
            {/* 接続線 */}
            <line x1="110" y1="55" x2="170" y2="55" stroke="#555" strokeWidth="1.5" />
            <line x1="250" y1="55" x2="310" y2="55" stroke="#555" strokeWidth="1.5" />
            {/* 中性点 */}
            <circle cx="360" cy="110" r="5" fill="#a06" />
            <text x="375" y="114" fontSize="11" fill="#a06">中性点</text>
            <line x1="360" y1="80" x2="360" y2="110" stroke="#a06" strokeWidth="1.5" />
            {/* B種接地線 */}
            <line x1="360" y1="110" x2="360" y2="160" stroke="#396" strokeWidth="2" strokeDasharray="4,2" />
            {/* 大地 */}
            <line x1="330" y1="160" x2="390" y2="160" stroke="#396" strokeWidth="2" />
            <line x1="338" y1="167" x2="382" y2="167" stroke="#396" strokeWidth="1.5" />
            <line x1="346" y1="174" x2="374" y2="174" stroke="#396" strokeWidth="1" />
            {/* R_B */}
            <rect x="350" y="125" width="20" height="28" rx="3" fill="none" stroke="#396" strokeWidth="1.5" />
            <text x="378" y="142" fontSize="10" fill="#396" fontWeight="700">R_B</text>
            {/* ラベル */}
            <text x="240" y="185" textAnchor="middle" fontSize="11" fill="#396" fontWeight="700">B種接地（大地へ）</text>
            <text x="210" y="155" textAnchor="middle" fontSize="10" fill="#888">V_対地 = Ig × R_B ≤ 150V</text>
            {/* 混触矢印 */}
            <line x1="210" y1="50" x2="210" y2="30" stroke="#c33" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="218" y="28" fontSize="9" fill="#c33">混触事故</text>
          </svg>
        </div>
      </div>

      <MemTable
        headers={["高圧電路の自動遮断", "R_B 上限", "係数の根拠"]}
        rows={[
          ["1秒を超えて遮断 / 遮断なし", "150 / Ig  [Ω]", "低圧側対地電圧 ≤ 150V"],
          ["1秒以内に自動遮断",           "300 / Ig  [Ω]", "遮断が早いため緩和（実害が小さい）"],
          ["0.5秒以内に自動遮断",         "600 / Ig  [Ω]", "さらに緩和（瞬時遮断）"],
        ]}
        note="Igが小さいほど R_B の上限が大きくなる（地絡電流が少ない = 被害が小さい = 接地抵抗を大きくしても許される）"
      />

      <h2>§7 1線地絡電流 Ig の実態</h2>
      <PlainExplain>
        <p>Igは高圧電路で1線が完全地絡（短絡）したときに流れる電流値。電験試験では<strong>問題文に与えられる</strong>ことがほとんど。</p>
        <p>実務では、配電事業者（電力会社）が「供給電圧・系統インピーダンス・線路長」から算定して需要家に提供する値を使用する。系統によって数A〜数十Aの幅がある。</p>
        <p>試験で注意：Igを<strong>自分で仮定・計算しない</strong>。必ず問題文から読み取ること。</p>
      </PlainExplain>

      <h2>§8 接地工事4種の位置づけ（B種の特殊性）</h2>
      <MemTable
        headers={["種別", "施設場所", "接地抵抗", "接地線太さ", "備考"]}
        rows={[
          ["A種", "高圧・特高機器の外箱", "10 Ω 以下",   "2.6 mm 以上", "固定値"],
          ["B種", "変圧器低圧側中性点",   "150/Ig [Ω]", "4.0 mm 以上", "計算値・最も太い"],
          ["C種", "300V超 低圧機器外箱",  "10 Ω 以下",   "1.6 mm 以上", "固定値"],
          ["D種", "300V以下 低圧機器外箱","100 Ω 以下",  "1.6 mm 以上", "固定値"],
        ]}
        note="B種は唯一の「計算値」かつ「接地線が最も太い（4.0mm）」。この2点でA/C/D種と区別する"
      />

      <h2>§9 1.8（中性点非接地系）との対比</h2>
      <CrossRef patterns={[
        { a: "B種接地（1.7）",       b: "中性点非接地（1.8）",        result: "「接地系変圧器の混触防止」vs「非接地系の静電容量経由地絡」：どちらも地絡保護だが電流の発生原理がまったく異なる" },
        { a: "Ig（B種）",             b: "I_g = 2√3πfVC（1.8）",       result: "B種のIgは系統インピーダンスで決まる / 1.8のI_gは対地静電容量Cで決まる" },
        { a: "R_B ≤ 150/Ig",          b: "ZCT→GR→CB（1.8）",          result: "B種は抵抗値設計で対地電圧を制限 / 1.8はZCT検出→継電器動作で保護" },
      ]} />

      <h2>§10 解き方（思考順序）</h2>
      <SolveFlow type="numbered" steps={[
        "問題文から「Ig」の数値を読み取る（単位A確認）",
        "「高圧電路の遮断時間」を確認 → 係数（150/300/600）を選ぶ",
        "R_B(max) = 係数 / Ig を計算",
        "選択肢と照合（単位はΩ）",
        "B種の目的（混触防止）・場所（低圧中性点）が問われるA問題にも対応",
      ]} />

      <h2 id="traps">§11 ひっかけポイント</h2>
      <TrapTable traps={[
        { wrong: "B種の接地抵抗値は固定値（例：10Ω以下）",         correct: "計算値：150/Ig（Igによって変わる）" },
        { wrong: "遮断が速いほど接地抵抗の上限値が小さくなる",       correct: "逆。遮断が速いほど上限が大きくなる（緩和）" },
        { wrong: "B種は低圧機器（モーター・照明）の保護",            correct: "変圧器の高低圧混触防止（施設場所は低圧側中性点）" },
        { wrong: "B種の接地線は1.6mm以上",                           correct: "4.0mm以上（B種だけ最も太い）" },
        { wrong: "混触事故では常に高圧電流が低圧機器に流れる",        correct: "B種接地があれば低圧側対地電圧をIg×R_B≤150Vに抑制できる" },
        { wrong: "係数150は任意に決めた値",                           correct: "「混触時の低圧側対地電圧≤150V」という保護目標から導かれる設計値" },
        { wrong: "Ig = 5Aのとき R_B = 150/5 = 30Ω以上にしなければならない", correct: "上限30Ω以下（30Ω「以下」が正しい。以上は誤り）" },
      ]} />

      <h2 id="exam-past">§12 過去問形式演習</h2>

      <ExamQuestion
        year="頻出パターンA"
        qNum="B種接地抵抗の最大値"
        question="高圧電路と低圧電路を結合する変圧器において、高圧電路の1線地絡電流Igが5Aである。B種接地工事の接地抵抗の最大値は何Ωか。なお、高圧電路は1秒を超えて自動的に遮断されないものとする。"
        choices={["10 Ω", "30 Ω", "60 Ω", "150 Ω"]}
        note="遮断時間1秒超→係数150を使用"
      />
      <ExamAnswer
        correct="② 30 Ω"
        explanations={[
          "遮断時間1秒超（または遮断なし）→ 係数は 150",
          "R_B(max) = 150 / Ig = 150 / 5 = 30 [Ω]",
          "選択肢②「30Ω」が正解",
          "注意：「30Ω以下」であって「30Ω以上」ではない",
        ]}
      />

      <ExamQuestion
        year="頻出パターンB（緩和条件）"
        qNum="遮断時間1秒以内"
        question="同条件で、高圧電路が1秒以内に自動的に遮断される場合、B種接地抵抗の最大値は何Ωか。Ig = 5A"
        choices={["30 Ω", "60 Ω", "90 Ω", "120 Ω"]}
        note="遮断時間1秒以内→係数300"
      />
      <ExamAnswer
        correct="② 60 Ω"
        explanations={[
          "遮断時間1秒以内 → 係数は 300",
          "R_B(max) = 300 / 5 = 60 [Ω]",
          "パターンAの2倍（緩和されているため大きくなる）",
        ]}
      />

      <h2 id="quick-review">§13 1分復習</h2>
      <QuickReview items={[
        { q: "B種接地工事の目的は？",                          a: "変圧器の高低圧混触事故時に低圧側対地電圧を抑制（150V以下に制限）" },
        { q: "B種接地の施設場所は？",                          a: "変圧器低圧側の中性点（または一端）" },
        { q: "B種接地抵抗の基本式は？",                        a: "R_B ≤ 150/Ig [Ω]（Ig: 1線地絡電流[A]）" },
        { q: "1秒以内遮断の場合の係数は？",                    a: "300（R_B ≤ 300/Ig）" },
        { q: "0.5秒以内遮断の場合の係数は？",                  a: "600（R_B ≤ 600/Ig）" },
        { q: "B種の接地線太さは？",                            a: "4.0 mm 以上（A/C/D種より太い）" },
        { q: "係数「150」の物理的意味は？",                    a: "混触時の低圧側対地電圧をIg×R_B = 150V以下に制限するという設計目標" },
      ]} />

      <UpdateLog entries={[
        { date: "2026-05-07", content: "v1.0: 初版作成（直前確認モード・最短解法・深掘り解説・ひっかけ7項目・過去問2パターン）", reason: "stub解消・freq:max最優先タスク" },
      ]} />

      <PageNav
        prevId="juyoritsu-keisan"  prevTitle="需要率・負荷率・不等率"
        nextId="hichusei-jiraku"   nextTitle="中性点非接地系の地絡電流"
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
      <DirectCheckMode
        pageId="hichusei-jiraku"
        formula="I_g = 2√3·πfV·(C₁+C₂)"
        formulaVars={[
          { sym: "V", desc: "線間電圧[V]" },
          { sym: "C₁", desc: "高圧配電線路一相の対地静電容量[F]" },
          { sym: "C₂", desc: "需要設備一相の対地静電容量[F]" },
          { sym: "f", desc: "周波数[Hz]" },
        ]}
        warningRed="ZCT検出電流（I_zct）は常に I_g とは限らない（事故点・ZCT位置に依存）"
        trapsTop3={[
          "V を相電圧として使う（実際は <strong>線間電圧</strong>。対地電圧は V/√3）",
          "C₁ または C₂ <strong>どちらか片方</strong>だけで計算する（実際は <strong>和 C₁+C₂</strong>）",
          "1線地絡時、健全相の対地電圧が <strong>√3倍</strong>（V/√3 → V）になることを忘れる",
        ]}
        jumps={[
          { id: "exam-r05", label: "過去問 R05下問11 へ →", primary: true },
          { id: "quick-review", label: "1分復習 へ →" },
          { id: "traps", label: "ひっかけ全11項目 →" },
        ]}
      />

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
          <li>地絡事故点の地絡電流: <strong>I_g = 2√3 πfV(C₁+C₂)</strong>（V=線間電圧、C₁=配電線路一相、C₂=需要設備一相）</li>
          <li>1線地絡で健全相の対地電圧は <strong>線間電圧V（=√3倍）</strong> に上昇</li>
          <li>保護動作: <strong>ZCT検出 → GR/DGR判定 → CB遮断</strong></li>
          <li>ZCTが検出する電流の式は<strong>事故点とZCT位置に依存</strong>（後述§4-2の注意ボックス参照）</li>
        </ul>
      </ConclusionBox>

      <MinShortcutCard
        steps={[
          <span><strong>条件確認</strong>：「中性点非接地方式・三相3線式・1線完全地絡」を読み取る</span>,
          <span><strong>電圧の置換</strong>：与えられた V は<strong>線間電圧</strong>。対地電圧として扱う場合は <strong>V/√3</strong> に変換</span>,
          <span><strong>3相分の容量</strong>：1相あたり対地容量Cの3相分なので <strong>3·(C₁+C₂)</strong> が現れる</span>,
          <span><strong>公式適用</strong>：地絡電流 <strong>I_g = 2√3·πfV·(C₁+C₂)</strong> を即座に書く</span>,
          <span><strong>非接地でもゼロでない</strong>：C経由で必ず流れることを心に留める</span>,
        ]}
        hint={<span><strong>R5下期問11(a)はこの公式そのまま</strong>。対地電圧 V/√3 と 3相分C の組合せで、結局 <strong>√3 が公式に立つ</strong>のを覚える</span>}
      />

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
        { label: "主体",   value: "中性点非接地方式 三相3線式 高圧配電線路（6.6kV配電が代表例）" },
        { label: "電圧",   value: "Vは線間電圧として与えられる（対地電圧として使う時は V/√3）" },
        { label: "容量",   value: "対地静電容量は1相あたり、3相分なので 3(C₁+C₂) が現れる" },
        { label: "公式",   value: "I_g = 2√3 πfV(C₁+C₂) を即答できること（√3 は対地電圧変換とベクトル和合成の組合せ）" },
        { label: "ゼロでない", value: "「非接地でも地絡電流はゼロではない」— C経由で必ず流れる" },
        { label: "条件",   value: "完全地絡（地絡抵抗Rg=0）／対称回路前提" },
        { label: "応用",   value: "ZCT検出電流の前提依存／DGRとGRの選択／保護協調" },
      ]} />

      <h2 id="abbrev">4. 略号と役割（保護システムの三役）</h2>
      <MemTable
        headers={["略号", "正式名称・日本語", "役割"]}
        rows={[
          [<strong>ZCT</strong>, <span>Zero-phase Current Transformer<br/>零相変流器</span>, <span>3線を一括貫通しベクトル和（零相電流）を検出。<br/>平常時=0、地絡時のみ出力。<strong>「気付く」装置</strong></span>],
          [<strong>GR / DGR</strong>, <span>Ground Relay / Directional<br/>地絡継電器（無方向／方向）</span>, <span>ZCT出力が整定値超過で動作信号を出す。<br/>整定値・時限は<strong>設備条件・継電器種類・保護協調により異なる</strong>。<strong>「判断する」装置</strong></span>],
          [<strong>CB</strong>, <span>Circuit Breaker<br/>遮断器</span>, <span>GR/DGRからのトリップ信号で機械的に「閉→開」。<br/>アーク消弧で電流を切る。<strong>「行動する」装置</strong></span>],
          [<strong>I_g</strong>, <span>Ground fault current<br/>地絡電流</span>, "事故点の地絡電流 = 2√3 πfV(C₁+C₂)"],
          [<strong>I_zct</strong>, <span>ZCT検出電流（零相電流）</span>, <span>ZCTを貫通する正味電流。<strong>事故点・ZCT位置・C₁/C₂の定義に依存</strong>（次の注意ボックス参照）</span>],
          [<strong>C₁ / C₂</strong>, <span>Line-to-ground capacitance<br/>対地静電容量</span>, "C₁=配電線路一相、C₂=需要設備一相"],
        ]}
        note="ZCTは「気付く」、GR/DGRは「判断する」、CBは「行動する」。3つで1つの保護システム"
      />

      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--line)',
        borderLeft: '3px solid var(--warn)',
        borderRadius: 'var(--radius)',
        padding: '14px 18px',
        marginBottom: 24,
      }}>
        <div style={{fontWeight: 700, fontSize: 13, color: 'var(--ink-2)', marginBottom: 8}}>⚠ ZCT検出電流の式は前提に依存</div>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.9}}>
          <li>ZCTは<strong>3線を一括して通し、零相電流（i_a+i_b+i_c）を検出</strong>する装置（構造原理は<a href="#" onClick={(e)=>{e.preventDefault();onNav('zerosou-henryuki');}} style={{color:'var(--accent)'}}>1.9 ZCTの仕組み</a>参照）</li>
          <li><strong>検出電流の式は事故点・ZCT位置・回路構成で変わる</strong></li>
          <li>R5下期問11(a) の問題図では <strong>I_zct = I_g</strong> として扱う（系統全体の Ig = 2√3πfV(C₁+C₂)）</li>
          <li>R5下期問11(b) のように「需要設備内ZCT・需要設備内地絡」が問われる場合、<strong>需要設備のC₂分のみ</strong>がZCTを貫通（86mAなど）</li>
          <li><strong>DGR（方向性）の電流方向判別</strong>は別論点。配電線路側 vs 需要設備側 の地絡で位相が逆転することを利用する保護</li>
        </ul>
      </div>

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

      <h3 style={{marginTop: 20, marginBottom: 12, fontSize: 15, color: 'var(--ink-2)'}}>📜 接地方式の歴史的変遷（過去→現在→未来）</h3>
      <MemTable
        headers={["時代", "主流方式", "理由・背景", "支配的要因"]}
        rows={[
          ["過去（〜1960年代）", "抵抗接地・直接接地が混在", "通信線への誘導障害が大きく、地絡電流抑制重視", "通信線・電力線の併設"],
          ["現在（1970年代〜）", "6.6kV配電は非接地方式が標準", "通信線分離・需要家設備での選択遮断（DGR）整備", "保護協調・メンテナンス性"],
          ["未来（2030年代〜）", "分散電源連系で再検討の動き", "PV・蓄電池の双方向潮流／フェランチ効果／系統安定化", "再エネ普及率・系統慣性低下"],
        ]}
        note="技術選択は「物理的最適解」ではなく「時代の支配因子」で決まる。古舘さんが現役のあいだに非接地→接地への回帰議論が起きる可能性大"
      />

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

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <div style={{fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8}}>📐 線間電圧 vs 対地電圧（Cにかかるのはどっち？）</div>
        <svg viewBox="0 0 820 380" style={{width: '100%', height: 'auto', background: '#fff'}}>
          <defs>
            <marker id="vArrV" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a06"/>
            </marker>
            <marker id="vArrV2" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M10,0 L0,5 L10,10 z" fill="#a06"/>
            </marker>
            <marker id="vArrG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#0e6b22"/>
            </marker>
            <marker id="vArrG2" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M10,0 L0,5 L10,10 z" fill="#0e6b22"/>
            </marker>
          </defs>

          <rect x="10" y="20" width="395" height="340" fill="#fafbfc" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="207" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e3a6e">【左】線間電圧 V</text>
          <text x="207" y="60" textAnchor="middle" fontSize="11" fill="#666">2つの相導体の間の電圧（Cには直接かからない）</text>

          <line x1="60" y1="120" x2="360" y2="120" stroke="#d33" strokeWidth="3"/>
          <text x="40" y="124" textAnchor="end" fontSize="13" fill="#d33" fontWeight="700">a相</text>
          <line x1="60" y1="240" x2="360" y2="240" stroke="#2a8" strokeWidth="3"/>
          <text x="40" y="244" textAnchor="end" fontSize="13" fill="#2a8" fontWeight="700">b相</text>

          <line x1="210" y1="125" x2="210" y2="235" stroke="#a06" strokeWidth="2.5" markerStart="url(#vArrV2)" markerEnd="url(#vArrV)"/>
          <rect x="180" y="170" width="60" height="30" fill="#fff" stroke="#a06" strokeWidth="1.5" rx="4"/>
          <text x="210" y="190" textAnchor="middle" fontSize="14" fill="#a06" fontWeight="700">V</text>

          <text x="207" y="285" textAnchor="middle" fontSize="12" fill="#222">線間電圧 V_ab = 6,600V</text>
          <text x="207" y="305" textAnchor="middle" fontSize="11" fill="#666">⚠ 大地は登場しない</text>
          <text x="207" y="335" textAnchor="middle" fontSize="11" fill="#a11" fontWeight="600">→ 対地静電容量Cにこの電圧はかからない</text>

          <rect x="415" y="20" width="395" height="340" fill="#fafbfc" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="612" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e3a6e">【右】対地電圧 V/√3</text>
          <text x="612" y="60" textAnchor="middle" fontSize="11" fill="#666">相導体↔大地の電圧（Cにかかるのはこちら）</text>

          <line x1="465" y1="120" x2="765" y2="120" stroke="#d33" strokeWidth="3"/>
          <text x="445" y="124" textAnchor="end" fontSize="13" fill="#d33" fontWeight="700">a相</text>

          <line x1="615" y1="120" x2="615" y2="180" stroke="#333" strokeWidth="2"/>
          <line x1="595" y1="180" x2="635" y2="180" stroke="#333" strokeWidth="2.5"/>
          <line x1="595" y1="188" x2="635" y2="188" stroke="#333" strokeWidth="2.5"/>
          <text x="640" y="187" fontSize="14" fill="#333">C_a</text>
          <line x1="615" y1="188" x2="615" y2="240" stroke="#333" strokeWidth="2"/>

          <line x1="525" y1="240" x2="725" y2="240" stroke="#666" strokeWidth="2.5"/>
          <line x1="525" y1="248" x2="535" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="545" y1="248" x2="555" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="565" y1="248" x2="575" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="585" y1="248" x2="595" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="605" y1="248" x2="615" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="625" y1="248" x2="635" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="645" y1="248" x2="655" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="665" y1="248" x2="675" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="685" y1="248" x2="695" y2="240" stroke="#666" strokeWidth="1.5"/>
          <line x1="705" y1="248" x2="715" y2="240" stroke="#666" strokeWidth="1.5"/>
          <text x="475" y="237" fontSize="11" fill="#666">大地</text>

          <line x1="500" y1="125" x2="500" y2="235" stroke="#0e6b22" strokeWidth="2.5" markerStart="url(#vArrG2)" markerEnd="url(#vArrG)"/>
          <rect x="460" y="170" width="80" height="30" fill="#fff" stroke="#0e6b22" strokeWidth="1.5" rx="4"/>
          <text x="500" y="190" textAnchor="middle" fontSize="13" fill="#0e6b22" fontWeight="700">V/√3</text>

          <text x="612" y="290" textAnchor="middle" fontSize="12" fill="#222">対地電圧 V_a = 6,600/√3 ≈ 3,810V</text>
          <text x="612" y="310" textAnchor="middle" fontSize="11" fill="#666">⚠ 大地が基準</text>
          <text x="612" y="335" textAnchor="middle" fontSize="11" fill="#0e6b22" fontWeight="600">→ Cにかかるのはこの V/√3。だから √3 が公式に現れる</text>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ 対地静電容量Cは「相導体と大地の間」のコンデンサ。線間電圧（A相⇔B相）はC無関係。Y結線中性点接地でも非接地でも、平常時は対称性により対地電圧 = V/√3</div>
      </div>

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

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <div style={{fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8}}>📐 1線地絡時の電流ループ（番号順に追えます／電験テキスト慣例の向き）</div>
        <svg viewBox="0 0 820 500" style={{width: '100%', height: 'auto', background: '#fff'}}>
          <defs>
            <marker id="loopArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a06"/>
            </marker>
          </defs>

          <text x="410" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#222">a相地絡時のIgループ（V_a → a相導体 → 地絡点 → 大地 → C_b → b相導体 → V_b → 内部還流）</text>

          <line x1="80" y1="120" x2="80" y2="360" stroke="#888" strokeWidth="2"/>
          <text x="48" y="245" fontSize="11" fill="#888" transform="rotate(-90 48 245)">仮想中性点</text>

          <circle cx="120" cy="120" r="16" fill="#fff" stroke="#d33" strokeWidth="2"/>
          <text x="120" y="125" textAnchor="middle" fontSize="12" fill="#d33" fontWeight="700">V_a</text>
          <line x1="80" y1="120" x2="104" y2="120" stroke="#888" strokeWidth="2"/>

          <circle cx="120" cy="240" r="16" fill="#fff" stroke="#2a8" strokeWidth="2"/>
          <text x="120" y="245" textAnchor="middle" fontSize="12" fill="#2a8" fontWeight="700">V_b</text>
          <line x1="80" y1="240" x2="104" y2="240" stroke="#888" strokeWidth="2"/>

          <circle cx="120" cy="360" r="16" fill="#fff" stroke="#27c" strokeWidth="2"/>
          <text x="120" y="365" textAnchor="middle" fontSize="12" fill="#27c" fontWeight="700">V_c</text>
          <line x1="80" y1="360" x2="104" y2="360" stroke="#888" strokeWidth="2"/>

          <line x1="136" y1="120" x2="640" y2="120" stroke="#d33" strokeWidth="2.5"/>
          <text x="155" y="112" fontSize="11" fill="#d33">a相導体</text>
          <line x1="136" y1="240" x2="640" y2="240" stroke="#2a8" strokeWidth="2.5"/>
          <text x="155" y="232" fontSize="11" fill="#2a8">b相導体</text>
          <line x1="136" y1="360" x2="640" y2="360" stroke="#bbb" strokeWidth="2"/>
          <text x="155" y="352" fontSize="11" fill="#bbb">c相導体</text>

          <line x1="240" y1="120" x2="240" y2="160" stroke="#bbb" strokeWidth="1.5" strokeDasharray="3,2"/>
          <line x1="225" y1="160" x2="255" y2="160" stroke="#bbb" strokeWidth="2" strokeDasharray="3,2"/>
          <line x1="225" y1="168" x2="255" y2="168" stroke="#bbb" strokeWidth="2" strokeDasharray="3,2"/>
          <line x1="240" y1="168" x2="240" y2="430" stroke="#bbb" strokeWidth="1.5" strokeDasharray="3,2"/>
          <text x="262" y="167" fontSize="11" fill="#bbb">C_a（地絡で短絡 → 電流0）</text>

          <line x1="380" y1="240" x2="380" y2="285" stroke="#2a8" strokeWidth="2.5"/>
          <line x1="362" y1="285" x2="398" y2="285" stroke="#2a8" strokeWidth="3"/>
          <line x1="362" y1="295" x2="398" y2="295" stroke="#2a8" strokeWidth="3"/>
          <text x="406" y="295" fontSize="14" fill="#2a8" fontWeight="700">C_b</text>
          <line x1="380" y1="295" x2="380" y2="430" stroke="#2a8" strokeWidth="2.5"/>

          <line x1="510" y1="360" x2="510" y2="390" stroke="#bbb" strokeWidth="1.5" strokeDasharray="3,2"/>
          <line x1="495" y1="390" x2="525" y2="390" stroke="#bbb" strokeWidth="2" strokeDasharray="3,2"/>
          <line x1="495" y1="398" x2="525" y2="398" stroke="#bbb" strokeWidth="2" strokeDasharray="3,2"/>
          <line x1="510" y1="398" x2="510" y2="430" stroke="#bbb" strokeWidth="1.5" strokeDasharray="3,2"/>
          <text x="532" y="397" fontSize="11" fill="#bbb">C_c（c相は同様の経路）</text>

          <line x1="640" y1="120" x2="640" y2="430" stroke="#a06" strokeWidth="3"/>
          <line x1="630" y1="110" x2="650" y2="130" stroke="#a06" strokeWidth="3"/>
          <line x1="650" y1="110" x2="630" y2="130" stroke="#a06" strokeWidth="3"/>
          <text x="660" y="120" fontSize="12" fill="#a06" fontWeight="700">地絡点</text>
          <text x="660" y="135" fontSize="11" fill="#a06">(Rg=0)</text>

          <line x1="160" y1="430" x2="650" y2="430" stroke="#666" strokeWidth="2.5"/>
          <line x1="170" y1="438" x2="180" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="200" y1="438" x2="210" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="230" y1="438" x2="240" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="260" y1="438" x2="270" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="290" y1="438" x2="300" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="320" y1="438" x2="330" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="350" y1="438" x2="360" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="380" y1="438" x2="390" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="410" y1="438" x2="420" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="440" y1="438" x2="450" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="470" y1="438" x2="480" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="500" y1="438" x2="510" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="530" y1="438" x2="540" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="560" y1="438" x2="570" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="590" y1="438" x2="600" y2="430" stroke="#666" strokeWidth="1"/>
          <line x1="620" y1="438" x2="630" y2="430" stroke="#666" strokeWidth="1"/>
          <text x="668" y="435" fontSize="11" fill="#666">大地</text>

          <line x1="180" y1="120" x2="610" y2="120" stroke="#a06" strokeWidth="3" markerEnd="url(#loopArr)"/>
          <circle cx="395" cy="100" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="395" y="105" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">1</text>

          <line x1="640" y1="150" x2="640" y2="410" stroke="#a06" strokeWidth="3" markerEnd="url(#loopArr)"/>
          <circle cx="660" cy="280" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="660" y="285" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">2</text>

          <line x1="620" y1="430" x2="395" y2="430" stroke="#a06" strokeWidth="3" markerEnd="url(#loopArr)"/>
          <circle cx="510" cy="448" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="510" y="453" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">3</text>

          <line x1="380" y1="425" x2="380" y2="305" stroke="#a06" strokeWidth="3" markerEnd="url(#loopArr)"/>
          <circle cx="358" cy="370" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="358" y="375" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">4</text>

          <line x1="380" y1="280" x2="380" y2="255" stroke="#a06" strokeWidth="3" markerEnd="url(#loopArr)"/>
          <circle cx="358" cy="265" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="358" y="270" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">5</text>

          <line x1="360" y1="240" x2="142" y2="240" stroke="#a06" strokeWidth="3" markerEnd="url(#loopArr)"/>
          <circle cx="245" cy="222" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="245" y="227" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">6</text>

          <path d="M 104 240 Q 60 240 60 120 Q 60 120 104 120" fill="none" stroke="#a06" strokeWidth="3" strokeDasharray="5,3" markerEnd="url(#loopArr)"/>
          <circle cx="38" cy="180" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="38" y="185" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">7</text>
        </svg>

        <ol style={{margin: '12px 0 0', paddingLeft: 0, listStyle: 'none', fontSize: 13, lineHeight: 1.9}}>
          <li style={{padding: '4px 0', borderBottom: '1px solid var(--line)'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>①</span><strong>V_a → a相導体を右へ</strong>（地絡点に向かう）</li>
          <li style={{padding: '4px 0', borderBottom: '1px solid var(--line)'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>②</span><strong>地絡点 → 大地へ降下</strong>（これが Ig）</li>
          <li style={{padding: '4px 0', borderBottom: '1px solid var(--line)'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>③</span><strong>大地を経由して左へ</strong>（C_b の足元へ向かう）</li>
          <li style={{padding: '4px 0', borderBottom: '1px solid var(--line)'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>④</span><strong>C_b の下端から上昇</strong>（健全相のCを通過）</li>
          <li style={{padding: '4px 0', borderBottom: '1px solid var(--line)'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>⑤</span><strong>C_b の上端 → b相導体へ抜ける</strong></li>
          <li style={{padding: '4px 0', borderBottom: '1px solid var(--line)'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>⑥</span><strong>b相導体を左へ → V_b へ還流</strong></li>
          <li style={{padding: '4px 0'}}><span style={{display: 'inline-block', width: 28, height: 22, lineHeight: '22px', textAlign: 'center', background: '#a06', color: '#fff', fontWeight: 700, borderRadius: 11, marginRight: 8, fontSize: 12}}>⑦</span><strong>V_b → 仮想中性点 → V_a に戻り 1ループ完了</strong></li>
        </ol>

        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 12, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--ink-3)'}}>
          <strong>同時並行ループ</strong>：c相も <strong>地絡点 → 大地 → C_c → c相導体 → V_c</strong> の経路で同型ループを並行して流れる。<br/>
          <strong>「3相分のC」が式に入る理由</strong>：Ig の還流路は健全2相のC（C_b と C_c）の<strong>両方</strong>を経由する。地絡電流 I_g = I_b + I_c の合成 = √3·ωC·V
        </div>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ <strong>電験テキスト慣例の方向</strong>（V_a 駆動・地絡点で大地へ降下する Ig 視点）。AC電流のため向きは50/60Hzで反転。C_a は地絡点で短絡されているため電流ゼロ（点線で薄く描画）</div>
      </div>
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
        <p style={{margin: '10px 0 0', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)'}}>🎯 支配因子: 系統合計対地静電容量 (C₁+C₂) と 線間電圧V／成立条件: 完全地絡（Rg=0）かつ系統対称性</p>
      </PlainExplain>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <div style={{fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8}}>📐 ベクトル和の図解（I_b と I_c が60°差で√3倍になる理由）</div>
        <svg viewBox="0 0 820 380" style={{width: '100%', height: 'auto', background: '#fff'}}>
          <defs>
            <marker id="vbArrIb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#2a8"/>
            </marker>
            <marker id="vbArrIc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
            <marker id="vbArrSum" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a06"/>
            </marker>
          </defs>

          <text x="20" y="30" fontSize="13" fontWeight="700" fill="#222">【手順1】 I_b と I_c を原点から描く</text>
          <text x="20" y="48" fontSize="11" fill="#666">大きさは同じ ωCV、間の角度は60°（線間電圧の位相差）</text>

          <circle cx="200" cy="200" r="3.5" fill="#333"/>
          <text x="170" y="218" fontSize="11" fill="#666">原点（中性点）</text>

          <line x1="200" y1="200" x2="313" y2="135" stroke="#2a8" strokeWidth="2.5" markerEnd="url(#vbArrIb)"/>
          <text x="265" y="125" fontSize="13" fill="#2a8" fontWeight="700">I_b</text>
          <text x="240" y="158" fontSize="11" fill="#2a8">|I_b| = ωCV</text>

          <line x1="200" y1="200" x2="313" y2="265" stroke="#27c" strokeWidth="2.5" markerEnd="url(#vbArrIc)"/>
          <text x="265" y="285" fontSize="13" fill="#27c" fontWeight="700">I_c</text>
          <text x="240" y="258" fontSize="11" fill="#27c">|I_c| = ωCV</text>

          <path d="M 230 182.5 A 35 35 0 0 1 230 217.5" fill="none" stroke="#a06" strokeWidth="1.5"/>
          <text x="248" y="204" fontSize="12" fill="#a06" fontWeight="700">60°</text>

          <line x1="313" y1="135" x2="425" y2="200" stroke="#888" strokeWidth="1.2" strokeDasharray="4,3"/>
          <line x1="313" y1="265" x2="425" y2="200" stroke="#888" strokeWidth="1.2" strokeDasharray="4,3"/>
          <text x="348" y="158" fontSize="10" fill="#888">平行移動</text>

          <line x1="200" y1="200" x2="425" y2="200" stroke="#a06" strokeWidth="3" markerEnd="url(#vbArrSum)"/>
          <text x="295" y="195" fontSize="14" fill="#a06" fontWeight="700">I_b + I_c</text>
          <text x="295" y="223" fontSize="12" fill="#a06" fontWeight="600">√3 · ωCV</text>

          <line x1="200" y1="320" x2="200" y2="335" stroke="#999" strokeWidth="1"/>
          <line x1="425" y1="320" x2="425" y2="335" stroke="#999" strokeWidth="1"/>
          <line x1="200" y1="328" x2="425" y2="328" stroke="#999" strokeWidth="1"/>
          <text x="312" y="350" textAnchor="middle" fontSize="11" fill="#666">合成ベクトルの長さ = √3 × ωCV ≈ 1.732 × ωCV</text>

          <g fontSize="12" fill="#222">
            <text x="490" y="58" fontSize="13" fontWeight="700" fill="#0e3a6e">📐 平行四辺形の法則</text>
            <text x="490" y="82">2つのベクトル I_b・I_c の和は、</text>
            <text x="490" y="100">それらを2辺とする平行四辺形の対角線。</text>

            <text x="490" y="135" fontSize="13" fontWeight="700" fill="#0e3a6e">🧮 大きさの公式</text>
            <text x="490" y="158">同じ大きさ |I| のベクトルが角度 θ で合成されると：</text>
            <text x="490" y="180" fontFamily="serif" fontSize="14" fill="#a06" fontWeight="700">|I_b + I_c| = 2|I|·cos(θ/2)</text>

            <text x="490" y="215" fontSize="13" fontWeight="700" fill="#0e3a6e">🔢 θ=60° を代入</text>
            <text x="490" y="238" fontFamily="serif" fontSize="13">2|I| · cos(30°) = 2|I| · (√3/2)</text>
            <text x="490" y="260" fontFamily="serif" fontSize="14" fill="#a06" fontWeight="700">= √3 · |I| = √3 · ωCV</text>

            <text x="490" y="298" fontSize="13" fontWeight="700" fill="#0e3a6e">💡 Cを系統合計に</text>
            <text x="490" y="320">C = C₁ + C₂ を代入し、ω = 2πf より</text>
            <text x="490" y="342" fontFamily="serif" fontSize="14" fill="#a06" fontWeight="700">I_g = 2√3·πfV(C₁ + C₂)</text>
          </g>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ 「60°差で√3倍」は2|I|cos(30°)の幾何学的帰結。三角関数の暗記ではなく、平行四辺形の対角線として直感的に理解できる</div>
      </div>

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

      {/* コンデンサの分流則による I_C₂ の導出 */}
      <div style={{
        background: 'var(--bg-elev)',
        border: '1px solid var(--line)',
        borderLeft: '3px solid #27c',
        borderRadius: 'var(--radius)',
        padding: '14px 18px',
        marginBottom: 20,
      }}>
        <div style={{fontSize: 12, color: '#27c', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 8}}>📐 コンデンサの分流則で需要設備側電流を求める</div>
        <p style={{margin: '0 0 8px', fontSize: 13, lineHeight: 1.8}}>
          C₁ と C₂ は零相回路において<strong>並列</strong>に接続されている。
          並列コンデンサでは<strong>容量に比例して電流が分配</strong>される（容量が大きいほど多く流れる）。
        </p>
        <div style={{fontSize: 16, fontWeight: 700, color: '#27c', fontFamily: 'serif', textAlign: 'center', padding: '10px 0'}}>
          I_C₂ = I_g × C₂ / (C₁ + C₂)
        </div>
        <p style={{margin: '10px 0 6px', fontSize: 13, lineHeight: 1.8}}>
          ここに I_g = 2√3·πfV·(C₁+C₂) を代入すると：
        </p>
        <div style={{fontSize: 16, fontWeight: 700, color: '#27c', fontFamily: 'serif', textAlign: 'center', padding: '6px 0', marginBottom: 10}}>
          I_C₂ = 2√3·πfV·(C₁+C₂) × C₂/(C₁+C₂) = 2√3·πfV·C₂
        </div>
        <ul style={{margin: '0 0 0', paddingLeft: 20, fontSize: 13, lineHeight: 1.85}}>
          <li>(C₁+C₂) が約分されて消えるのがポイント — I_C₂ は C₂ だけで決まる</li>
          <li>ZCT が検出する電流 = この I_C₂（事故点が ZCT より負荷側＝自設備内のとき）</li>
          <li>R05下問11(b) の「86 mA」はこの式そのもの：2×1.732×3.14×60×6600×0.02×10⁻⁶ ≈ 86 mA</li>
        </ul>
      </div>

      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>選択遮断（DGR）の原理</strong></p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li><strong>自設備内地絡</strong>: C₁分（系統の他需要家）が ZCT を流れる、向きは「外向き」</li>
          <li><strong>配電線路（他所）の地絡</strong>: C₂分が ZCT を流れる、向きは「内向き」</li>
          <li><strong>DGR（地絡方向継電器）</strong>はこの位相で判別。<strong>GR（無方向）</strong>は向き無視で誤動作（貰い事故）リスクあり</li>
        </ul>
        <p style={{margin: '10px 0 0', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)'}}>🎯 支配因子: ZCT設置位置 と 需要設備内 C₂／成立条件: ZCTより負荷側に C₂ が存在</p>
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
        <p style={{margin: '10px 0 0', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)'}}>🎯 支配因子: GR動作整定値 と CB機械動作時間／成立条件: 上位系統との保護協調が確立</p>
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
        { wrong: "Vをそのまま相電圧（対地電圧）として使って計算",   correct: "Vは線間電圧。対地電圧として使うときは V/√3 に変換する" },
        { wrong: "C₁またはC₂のどちらか片方だけで Ig を計算",         correct: "Ig = 2√3πfV·(C₁+C₂)。両方の和を使う" },
        { wrong: "健全相の対地電圧は地絡時も V/√3 のまま",          correct: "1線地絡時、健全相の対地電圧は線間電圧V（=√3倍）に上昇" },
        { wrong: "ZCT・GR・CB の役割を混同（どれが切るか）",         correct: "ZCT=検出、GR/DGR=判定、CB=遮断 の役割分担" },
        { wrong: "非接地系では地絡電流が流れないので保護装置不要",   correct: "ZCT+GR+CBの保護装置は必須。法的にも要求される" },
        { wrong: "非接地方式は接地方式より安全",                     correct: "健全相の対地電圧が√3倍に上昇するため絶縁負担は大きい" },
        { wrong: "ZCTが検出する電流の式は常に I₀=2√3πfV·C₂",        correct: "ZCT検出式は事故点・ZCT位置・回路構成に依存。R5下問11(a)では I_zct = I_g" },
        { wrong: "GRが電流を遮断する",                                 correct: "GRは検出・判定のみ。実際に切るのはCB（遮断器）" },
        { wrong: "GRさえあれば全ての地絡を確実に切れる",              correct: "GR（無方向）は他所の地絡で誤動作リスク → DGR（方向）が確実" },
        { wrong: "中性点非接地なら対地電圧は不明",                    correct: "平常時はV/√3（対称性により）、地絡時のみ変化" },
      ]} />

      <h2 id="exam-r05">14. 過去問: R05下 問11（完成版・(a)(b)解法フロー）</h2>
      <ExamQuestion
        year="令和5年下期"
        qNum="11(a)"
        question="図のように、中性点非接地方式の三相3線式高圧配電線路に接続された需要設備において、需要設備付近で1線地絡事故が発生した。地絡電流 I_g [A] を求める式として正しいものはどれか。"
        choices={[
          "I_g = 2π fV(C₁+C₂)",
          "I_g = √3 π fV(C₁+C₂)",
          "I_g = 2√3 π fV·C₁",
          "I_g = 2√3 π fV(C₁+C₂)",
        ]}
        note="V=線間電圧[V]、f=周波数[Hz]、C₁=高圧配電線路一相の全対地静電容量[F]、C₂=需要設備一相の全対地静電容量[F]、地絡抵抗Rg=0Ω"
      />

      <SolveFlow type="解法 (a)" steps={[
        "条件確認：中性点非接地・1線完全地絡・対称回路",
        "対地電圧の置換：地絡時、健全相の対地電圧は V/√3 → V（線間電圧）に上昇",
        "1相あたりの充電電流：I = ωC × V（V=線間電圧、ωC=2πfC）",
        "ベクトル合成：健全2相のCを流れる充電電流（60°位相差）の和 = √3·ωC·V",
        "系統合計C適用：C = C₁+C₂（線路+需要設備）として代入",
        "結果：I_g = √3 · 2πf · (C₁+C₂) · V = 2√3·πfV·(C₁+C₂) → 選択肢④",
      ]} />

      <ExamAnswer
        correct="(a) ④ I_g = 2√3 π fV(C₁+C₂)"
        explanations={[
          { choice: "①", mark: "×", reason: "√3 が抜けている。対地電圧変換（V/√3）と健全相昇圧（√3倍）の組合せで √3 が必須" },
          { choice: "②", mark: "×", reason: "係数が 2 ではなく 1。ω=2πf を忘れた場合の値" },
          { choice: "③", mark: "×", reason: "C₂を忘れている。系統全体のCは C₁+C₂ の和" },
          { choice: "④", mark: "○", reason: "正解。√3 は対地電圧変換とベクトル和合成の両方が効く。ωC = 2πfC を展開した形" },
        ]}
      />

      <ExamQuestion
        year="令和5年下期"
        qNum="11(b)"
        question="(a)に加えて、V=6,600V、f=60Hz、C₁=2.3μF、C₂=0.02μF のとき、需要設備内のZCTが検出する電流[mA]として最も近い値はどれか（需要設備内ZCT・需要設備側地絡の前提）。"
        choices={["62 mA", "86 mA", "150 mA", "9,925 mA"]}
        note="ZCTが検出するのは ZCTを貫通する正味電流。需要設備内地絡では C₂分のみ"
      />

      <SolveFlow type="解法 (b)" steps={[
        "前提整理：需要設備内ZCT＋需要設備内地絡 → 配電線路側C₁分はZCTを貫通せず",
        "検出式：I_zct = 2√3·πfV·C₂（C₁分は外側で完結するため）",
        "数値代入：2 × 1.732 × 3.1416 × 60 × 6,600 × 0.02×10⁻⁶",
        "計算：≈ 0.0862 A = 86 mA → 選択肢②",
      ]} />

      <ExamAnswer
        correct="(b) ② 86 mA"
        explanations={[
          { choice: "①", mark: "×", reason: "62 mA。√3 を √2 で計算したケース（1.414倍を1.732倍と勘違い回避できず）" },
          { choice: "②", mark: "○", reason: "正解。2√3·πfV·C₂ = 2×1.732×3.14×60×6600×2×10⁻⁸ ≈ 0.086 A = 86mA" },
          { choice: "③", mark: "×", reason: "150 mA。係数の取り違えや計算ミスで生じうる値" },
          { choice: "④", mark: "×", reason: "9,925 mA。C₂をC₁(=2.3μF) で計算してしまった場合の値" },
        ]}
      />

      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>R5下問11 のひっかけポイント</strong></p>
        <ol style={{margin: 0, paddingLeft: 22, fontSize: 13, lineHeight: 1.9}}>
          <li><strong>(a)で「2π」と書いて √3 を忘れる</strong> — 健全相√3倍昇圧の効果を忘れる典型ミス</li>
          <li><strong>(a)で C₁ だけで計算</strong> — 「需要設備一相C₂は無視できる」と誤認</li>
          <li><strong>(b)で C₁+C₂ で計算（=9,925mA）</strong> — (a)の式をそのまま使ってしまう（前提が違う）</li>
          <li><strong>(b)で C₁ で計算</strong> — C₁分はZCT外で完結するので検出されない</li>
          <li><strong>単位ミス</strong>：μF → F、kV → V、結果を A → mA</li>
        </ol>
      </PlainExplain>

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
      <PlainExplain>
        <p style={{margin: 0, fontSize: 13}}>📚 <strong>法規ピラミッド構造</strong>：上位（法律）から下位（解釈・規格）へ要求が具体化される。色分けで階層を視認</p>
      </PlainExplain>
      <MemTable
        headers={["階層", "法規・条文", "本ページとの関係"]}
        rows={[
          [<span>🟥 法律</span>, <span><strong>電気事業法</strong><br/>第42条 保安規程</span>, "事業用電気工作物設置者は保安規程の届出義務（地絡保護装置の設置・点検・整定が必須事項）"],
          [<span>🟨 省令</span>, <span><strong>電気設備技術基準</strong><br/>第15条 地絡遮断装置</span>, "高圧電路の地絡時に自動遮断する装置の設置義務"],
          [<span>🟩 解釈</span>, <span><strong>電技解釈</strong><br/>第36条 地絡遮断装置の施設</span>, "GR動作整定値・遮断時間の具体規定"],
          [<span>🟩 解釈</span>, <span><strong>電技解釈</strong><br/>第19条 電路の接地</span>, "非接地方式の根拠条文"],
          [<span>🟩 解釈</span>, <span><strong>電技解釈</strong><br/>第28条 混触防止措置</span>, "B種接地（1.7）と本ページの境界条文"],
          [<span>🟩 解釈</span>, <span><strong>電技解釈</strong><br/>第17条 接地工事の種類</span>, "B種接地抵抗値の算定（1.7と関連）"],
        ]}
        note="法規B問題では条文番号と内容の組合せが問われる。整理しておくこと"
      />

      <details style={{border: '1px solid var(--line)', borderRadius: 'var(--radius)', marginTop: 12, marginBottom: 24}}>
        <summary style={{padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', background: 'var(--bg-2)'}}>
          📄 主要条文の要点（クリックで展開）
        </summary>
        <div style={{padding: '14px 18px', fontSize: 13, lineHeight: 1.8, background: 'var(--bg-2)', borderTop: '1px solid var(--line)'}}>
          <p style={{margin: '0 0 12px'}}><strong>🟨 電気設備に関する技術基準を定める省令 第15条（地絡に対する保護対策）</strong></p>
          <p style={{margin: '0 0 4px', paddingLeft: 12, fontStyle: 'italic', borderLeft: '3px solid var(--accent)'}}>
            [要点引用] 「電路には、地絡を生じた場合に電線若しくは電気機械器具の損傷、感電又は火災のおそれがないよう、地絡遮断器の施設その他の適切な措置を講じなければならない。ただし、電気機械器具を乾燥した場所に施設する等地絡による危険のおそれがない場合は、この限りでない。」
          </p>
          <p style={{margin: '12px 0 4px', fontSize: 12, color: 'var(--ink-3)'}}>※条文番号と要点を引用。完全な原文・最新改正は経済産業省令本文を参照</p>

          <p style={{margin: '20px 0 12px'}}><strong>🟩 電気設備の技術基準の解釈 第19条（保安上又は機能上必要な場合における電路の接地）</strong></p>
          <p style={{margin: '0 0 4px', paddingLeft: 12, fontStyle: 'italic', borderLeft: '3px solid var(--accent)'}}>
            [要点引用] 高圧電路においては、中性点を接地する場合の規定及び、中性点を接地しない方式（非接地方式）も許容される旨の規定が含まれる。本ページが扱う6.6kV配電系統が非接地方式である根拠条文
          </p>
          <p style={{margin: '12px 0 4px', fontSize: 12, color: 'var(--ink-3)'}}>※条文番号のみ記載。完全な原文は経済産業省告示「電気設備の技術基準の解釈」最新版を参照</p>

          <p style={{margin: '20px 0 12px'}}><strong>🟥 電気事業法 第42条（保安規程）</strong></p>
          <p style={{margin: '0 0 4px', paddingLeft: 12, fontStyle: 'italic', borderLeft: '3px solid var(--accent)'}}>
            [要点引用] 事業用電気工作物を設置する者は、当該事業用電気工作物の工事、維持及び運用に関する保安を確保するため、保安規程を定め、主務大臣に届け出なければならない
          </p>
          <p style={{margin: '12px 0 4px', fontSize: 12, color: 'var(--ink-3)'}}>※地絡保護装置の点検・整定値見直しは保安規程の実施事項として位置づけられる</p>
        </div>
      </details>

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

      <NextAction nextPageId="zerosou-henryuki" nextPageTitle="零相変流器（ZCT）の仕組み" onNav={onNav} />
      <UpdateLog entries={[
        { date: "2026-05-06", content: "v1.4: 直前確認モード（30秒UI）+ 強化公式カード + Ig/Izct混同警告（赤字）+ 覚えた/未習得トグル（localStorage周回管理）+ ジャンプボタン（過去問/復習/ひっかけ）", reason: "ChatGPT復習・演習導線アドバイス対応" },
        { date: "2026-05-06", content: "v1.3: 試験用最短解法カード追加・ZCT検出電流の前提依存を独立ボックス化・R05下問11(a)(b)解法フロー完成・§7 SVG上下分割・GR整定値の断定削除", reason: "ChatGPT 7点アドバイス対応（断定回避・最短解法導線・前提明示）" },
        { date: "2026-05-06", content: "v1.2: 条文要点引用＋法規ピラミッド色分け＋接地方式の歴史的変遷＋各深掘り解説に支配因子・成立条件明示", reason: "Gemini Gemプロンプト指針対応・第一原理思考の構造化" },
        { date: "2026-05-06", content: "v1.1: 接地方式比較表・フェーザ図SVG・実務メモ・関連法規・ひっかけ3項目を追加", reason: "ChatGPT 10点アドバイス対応・法規ページとしての網羅性向上" },
        { date: "2026-05-06", content: "v1.0: 初版作成（R05下問11対応）", reason: "R05下出題確認・容量性地絡電流の独立ページ化" },
      ]} />
      <PageNav
        prevId="bshu-setsuchi"     prevTitle="B種接地抵抗値"
        nextId="zerosou-henryuki"  nextTitle="零相変流器（ZCT）の仕組み"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 4-3. ZeroSouHenryukiPage（零相変流器の仕組み・1.9）
// ─────────────────────────────────────────────
function ZeroSouHenryukiPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="零相変流器（ZCT）が地絡電流のみを検出できる理由として最も適切なものはどれか。"
        choices={[
          "鉄心が地絡時にのみ磁化されるため",
          "3線一括貫通により電流のベクトル和（i_a+i_b+i_c）を物理的に取得し、平常時はゼロ・地絡時のみ非ゼロとなるため",
          "二次巻線が地絡継電器と直結しているため",
          "高圧側の電流変動を直接検知できるため",
        ]}
        year="頻出"
        note="ヒント：構造（一括貫通）と平常時のベクトル和に着目"
      />

      <ConclusionBox>
        <ul>
          <li><strong>構造</strong>: 環状鉄心 + 3線一括貫通 + 二次巻線</li>
          <li><strong>原理</strong>: 鉄心内で物理的にベクトル和「i_a+i_b+i_c」を計算</li>
          <li><strong>平常時</strong>: ベクトル和=0 → 磁束Φ=0 → 二次出力なし</li>
          <li><strong>地絡時</strong>: ベクトル和=3I₀ ≠ 0 → 磁束発生 → 二次にI₀誘起 → GR入力</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH04"
        category="01 B問題・計算問題対策"
        importance="B"
        freq="mid"
        examType="A問題/B問題前提"
        targets="地絡保護全般"
        tags={["ZCT", "零相電流", "電磁誘導", "保護装置"]}
        lastChecked="2026-05-06"
      />

      <h2 id="exam-focus">3. 試験で問われること</h2>
      <ExamFocus items={[
        { label: "主体",   value: "高圧電路の地絡保護に用いる零相変流器（ZCT）" },
        { label: "対象",   value: "ZCTの構造・動作原理・検出電流" },
        { label: "公式",   value: "二次出力 ∝ 3I₀（零相電流の3倍）" },
        { label: "条件",   value: "電磁誘導の法則／鉄心の磁気合成" },
        { label: "応用",   value: "GR/DGRとの組合せ／一括貫通設計の理由" },
      ]} />

      <h2 id="abbrev">4. 略号と前提知識</h2>
      <MemTable
        headers={["用語", "説明"]}
        rows={[
          ["ZCT（零相変流器）", "Zero-phase Current Transformer。3相電流のベクトル和を1つの鉄心で測る変流器"],
          ["I₀（零相電流）", "(i_a+i_b+i_c)/3。平常時=0、地絡時のみ発生"],
          ["3I₀", "ZCT二次に現れる電流の元になる量（鉄心内ベクトル和そのもの）"],
          ["環状鉄心", "ドーナツ状の磁性体。3線をまとめて中央の貫通孔に通す"],
          ["二次巻線", "鉄心の周りに巻かれたコイル（数百回巻）。磁束変化を電流に変換"],
        ]}
        note="「3相のベクトル和を物理レベルで取る装置」がZCTの本質"
      />

      <h2 id="structure">5. 物理構造（断面図）</h2>
      <PlainExplain>
        <p style={{margin: 0}}>ZCTの3要素：① 環状鉄心（磁束を閉路で通す磁性体）／② 3線一括貫通する一次（これがZCT最大の特徴）／③ 二次巻線（磁束変化→誘導電流）</p>
      </PlainExplain>

      <div style={{background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <svg viewBox="0 0 820 380" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="zarrFlux" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a06"/>
            </marker>
            <marker id="zarrOut" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#444"/>
            </marker>
          </defs>
          <text x="410" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#222">ZCT断面図（線路に垂直に切った視点）</text>
          <circle cx="280" cy="200" r="130" fill="none" stroke="#666" strokeWidth="3"/>
          <circle cx="280" cy="200" r="60" fill="#fff" stroke="#666" strokeWidth="3"/>
          <path d="M 280 70 A 130 130 0 1 0 280 330 A 130 130 0 1 0 280 70 Z M 280 140 A 60 60 0 1 1 280 260 A 60 60 0 1 1 280 140 Z" fill="#cfd8e0" fillRule="evenodd" opacity="0.5"/>
          <text x="280" y="55" textAnchor="middle" fontSize="13" fill="#333" fontWeight="600">環状鉄心</text>
          <text x="280" y="345" textAnchor="middle" fontSize="11" fill="#666">（円環状の磁性体・3線を一括貫通）</text>
          <circle cx="262" cy="180" r="11" fill="#fde2e2" stroke="#d33" strokeWidth="2"/>
          <text x="262" y="184" textAnchor="middle" fontSize="13" fill="#d33" fontWeight="700">a</text>
          <circle cx="298" cy="180" r="11" fill="#dff5e5" stroke="#2a8" strokeWidth="2"/>
          <text x="298" y="184" textAnchor="middle" fontSize="13" fill="#2a8" fontWeight="700">b</text>
          <circle cx="280" cy="218" r="11" fill="#dcecff" stroke="#27c" strokeWidth="2"/>
          <text x="280" y="222" textAnchor="middle" fontSize="13" fill="#27c" fontWeight="700">c</text>
          <line x1="280" y1="240" x2="280" y2="270" stroke="#444" strokeWidth="1" strokeDasharray="3,3"/>
          <text x="280" y="285" textAnchor="middle" fontSize="12" fill="#444">3線一括で貫通孔を通す</text>
          <path d="M 200 130 A 100 100 0 0 1 360 130" fill="none" stroke="#a06" strokeWidth="2.5" markerEnd="url(#zarrFlux)"/>
          <text x="280" y="105" textAnchor="middle" fontSize="13" fill="#a06" fontWeight="700">磁束 Φ（鉄心内を周回）</text>
          <g stroke="#666" strokeWidth="2" fill="none">
            <path d="M 388 225 Q 395 215 405 220 Q 415 225 422 215"/>
            <path d="M 388 240 Q 395 230 405 235 Q 415 240 422 230"/>
            <path d="M 388 255 Q 395 245 405 250 Q 415 255 422 245"/>
            <path d="M 388 270 Q 395 260 405 265 Q 415 270 422 260"/>
          </g>
          <text x="438" y="225" fontSize="13" fill="#333">二次巻線（N回巻）</text>
          <text x="438" y="245" fontSize="11" fill="#666">磁束変化を電流に変換</text>
          <line x1="425" y1="265" x2="540" y2="265" stroke="#444" strokeWidth="2"/>
          <line x1="425" y1="280" x2="540" y2="280" stroke="#444" strokeWidth="2" markerEnd="url(#zarrOut)"/>
          <rect x="540" y="245" width="80" height="50" fill="#fff" stroke="#333" strokeWidth="2"/>
          <text x="580" y="270" textAnchor="middle" fontSize="13" fill="#333">GR</text>
          <text x="580" y="288" textAnchor="middle" fontSize="11" fill="#666">地絡継電器</text>
          <text x="475" y="258" textAnchor="middle" fontSize="11" fill="#444">二次出力 I₀</text>
          <g fontSize="12" fill="#333">
            <text x="640" y="80" fontWeight="700" fill="#2a4d8f">構造の3要素</text>
            <text x="640" y="105">① 環状鉄心</text>
            <text x="650" y="122" fontSize="11" fill="#666">磁束を閉路で通す磁性体</text>
            <text x="640" y="145">② 一次（3線一括貫通）</text>
            <text x="650" y="162" fontSize="11" fill="#666">これがZCT最大の特徴</text>
            <text x="640" y="185">③ 二次巻線</text>
            <text x="650" y="202" fontSize="11" fill="#666">磁束変化→誘導電流</text>
            <text x="640" y="235" fontWeight="700" fill="#2a4d8f">なぜ一括貫通？</text>
            <text x="640" y="252" fontSize="11" fill="#666">磁束レベルで物理的に</text>
            <text x="640" y="266" fontSize="11" fill="#666">「i_a+i_b+i_c」を合成</text>
            <text x="640" y="280" fontSize="11" fill="#666">→ 別CT合成より高精度</text>
          </g>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ 実機は3線（高圧電路）またはケーブル全体を一括して環状鉄心の貫通孔に通す。鉄心の右側に巻かれた二次巻線がGRへ電流を送る</div>
      </div>

      <h2 id="principle">6. 動作原理（4ステップ）</h2>
      <SolveFlow type="物理プロセス" steps={[
        "一次側: 3線が鉄心を貫通 → 各線の電流が個別に磁束を作る（アンペールの法則）",
        "鉄心内: 3つの磁束がベクトル合成 = 物理レベルで「i_a+i_b+i_c」を計算",
        "平常時: ベクトル和=0 → 磁束Φ=0 → 二次側に出力なし／地絡時: 和=3I₀ ≠ 0 → 磁束変化発生",
        "二次巻線: 電磁誘導（ファラデーの法則）でI₀に比例した電流を誘起 → GRへ入力",
      ]} />
      <PlainExplain>
        <p style={{margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--ink-2)'}}>🎯 支配因子: 鉄心内の磁束ベクトル和（i_a+i_b+i_c）／成立条件: 3線が同一鉄心を貫通／鉄心が磁気飽和域に入っていない</p>
      </PlainExplain>

      <h2 id="flux-compare">7. 平常時 vs 地絡時の電流ベクトル比較</h2>
      <div style={{background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24}}>
        <svg viewBox="0 0 820 380" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="zarrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#d33"/>
            </marker>
            <marker id="zarrB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#2a8"/>
            </marker>
            <marker id="zarrC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
            <marker id="zarrSum" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a06"/>
            </marker>
          </defs>
          <rect x="10" y="20" width="395" height="350" fill="#f8fafc" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="207" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e6b22">【平常時】3相平衡</text>
          <text x="207" y="60" textAnchor="middle" fontSize="11" fill="#666">3相のベクトル和 = 0 → 磁束ゼロ → 二次出力なし</text>
          <circle cx="207" cy="200" r="3" fill="#333"/>
          <text x="215" y="218" fontSize="11" fill="#666">原点</text>
          <line x1="207" y1="200" x2="207" y2="120" stroke="#d33" strokeWidth="2.5" markerEnd="url(#zarrA)"/>
          <text x="217" y="120" fontSize="13" fill="#d33" fontWeight="700">i_a</text>
          <line x1="207" y1="200" x2="276" y2="240" stroke="#2a8" strokeWidth="2.5" markerEnd="url(#zarrB)"/>
          <text x="282" y="252" fontSize="13" fill="#2a8" fontWeight="700">i_b</text>
          <line x1="207" y1="200" x2="138" y2="240" stroke="#27c" strokeWidth="2.5" markerEnd="url(#zarrC)"/>
          <text x="115" y="252" fontSize="13" fill="#27c" fontWeight="700">i_c</text>
          <circle cx="207" cy="200" r="14" fill="none" stroke="#a06" strokeWidth="2" strokeDasharray="3,3"/>
          <text x="207" y="295" textAnchor="middle" fontSize="14" fill="#a06" fontWeight="700">i_a + i_b + i_c = 0</text>
          <text x="207" y="330" textAnchor="middle" fontSize="13" fill="#0e6b22" fontWeight="700">磁束 Φ = 0 ／ 二次出力 0</text>
          <text x="207" y="350" textAnchor="middle" fontSize="11" fill="#666">→ GRは動作しない</text>
          <rect x="415" y="20" width="395" height="350" fill="#fff5f5" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="612" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#a11">【地絡時】a相完全地絡</text>
          <text x="612" y="60" textAnchor="middle" fontSize="11" fill="#666">a相消失・健全相√3倍 → ベクトル和≠0 → 磁束発生</text>
          <circle cx="612" cy="200" r="3" fill="#333"/>
          <line x1="606" y1="194" x2="618" y2="206" stroke="#d33" strokeWidth="2"/>
          <line x1="618" y1="194" x2="606" y2="206" stroke="#d33" strokeWidth="2"/>
          <text x="595" y="230" fontSize="11" fill="#d33">i_a = 0（消失）</text>
          <line x1="612" y1="200" x2="700" y2="120" stroke="#2a8" strokeWidth="3" markerEnd="url(#zarrB)"/>
          <text x="710" y="115" fontSize="13" fill="#2a8" fontWeight="700">i_b'</text>
          <text x="710" y="130" fontSize="10" fill="#2a8">（√3倍）</text>
          <line x1="612" y1="200" x2="524" y2="120" stroke="#27c" strokeWidth="3" markerEnd="url(#zarrC)"/>
          <text x="490" y="115" fontSize="13" fill="#27c" fontWeight="700">i_c'</text>
          <text x="490" y="130" fontSize="10" fill="#27c">（√3倍）</text>
          <line x1="612" y1="200" x2="612" y2="100" stroke="#a06" strokeWidth="3.5" strokeDasharray="6,3" markerEnd="url(#zarrSum)"/>
          <text x="625" y="105" fontSize="14" fill="#a06" fontWeight="700">3I₀</text>
          <text x="612" y="295" textAnchor="middle" fontSize="14" fill="#a06" fontWeight="700">i_a + i_b' + i_c' = 3I₀ ≠ 0</text>
          <text x="612" y="330" textAnchor="middle" fontSize="13" fill="#a11" fontWeight="700">磁束 Φ ≠ 0 ／ 二次に I₀ 誘起</text>
          <text x="612" y="350" textAnchor="middle" fontSize="11" fill="#666">→ GRが整定値超過で動作</text>
        </svg>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ 平常時は3相のベクトル和が物理的にゼロ → 鉄心内で磁束が打ち消し合う。地絡時は対称性が崩れて鉄心内に正味磁束が発生し、二次巻線に電磁誘導で電流（I₀）が流れる</div>
      </div>

      <h2 id="why-bundle">8. なぜ「3線一括貫通」設計なのか</h2>
      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>結論</strong>：磁束レベルで物理的にベクトル和を取れるため、別CT合成より精度が桁違いに高い。</p>
        <p style={{margin: '0 0 8px'}}><strong>比較すると分かる</strong>：</p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li><strong>方式A: 3つの個別CTで各相を測りデジタル合成</strong> — 各CTの誤差・温度ドリフト・位相ずれが累積。地絡電流（数百mA）を平常時電流（数百A）の差分として検出するため、SNR（信号雑音比）が極めて低い</li>
          <li><strong>方式B: ZCT一括貫通</strong> — 鉄心内で磁束が物理的に合成・キャンセルされるため、平常時磁束はゼロ近傍。地絡時のみ磁束変化が発生し、二次に明瞭な信号が出る</li>
        </ul>
        <p style={{margin: '8px 0 0'}}><strong>結果</strong>：方式Bは方式Aの100〜1000倍の感度差。これがZCTが「零相変流器」と呼ばれる所以</p>
        <p style={{margin: '10px 0 0', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)'}}>🎯 支配因子: 一括貫通による磁束物理合成／成立条件: 3線が同一鉄心の貫通孔を通る・鉄心が高透磁率材</p>
      </PlainExplain>

      <h2 id="design-notes">9. 設計上の肝（実務メモ）</h2>
      <MemTable
        headers={["項目", "内容", "注意点"]}
        rows={[
          ["二次負担インピーダンス", "GRの入力インピーダンス（数Ω〜数十Ω）", "大きすぎると二次電圧が上がり鉄心飽和"],
          ["鉄心の磁気飽和", "過大な零相電流で磁束密度が飽和域に入る", "貫通CT短絡電流時に飽和→出力歪み"],
          ["高調波の影響", "実機では高調波分の零相電流が混入", "DGRは基本波のみ判別する整定が標準"],
          ["設置位置", "受電点直後・遮断器の電源側", "遮断器より負荷側だと自設備の地絡が検出できない"],
        ]}
        note="試験範囲外の実務知識。実務メモとして参考まで"
      />

      <h2 id="memorize">10. 暗記ポイント</h2>
      <MemTable
        headers={["項目", "値・公式", "覚え方"]}
        rows={[
          ["ZCTの構造3要素", "環状鉄心 + 3線一括貫通 + 二次巻線", "鉄心・貫通・巻線"],
          ["平常時のベクトル和", "i_a + i_b + i_c = 0", "3相平衡なら必ずゼロ"],
          ["地絡時のベクトル和", "3I₀（零相電流の3倍）", "ZCT二次に現れる電流の元"],
          ["なぜ「零相」変流器か", "零相成分（I₀）を選択的に検出するため", "対称座標法の「零相」が語源"],
          ["なぜ一括貫通か", "磁束レベルで物理合成し高精度を実現", "別CT合成より100〜1000倍精度"],
        ]}
      />

      <h2 id="traps">11. よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "ZCTは普通のCTと同じで1相だけ通す",                    correct: "ZCTは3線一括貫通。普通のCTは1相だけ" },
        { wrong: "ZCTの二次出力 = I_g（系統地絡電流）",                  correct: "ZCT二次出力 ∝ 3I₀（自設備内の零相電流のみ）" },
        { wrong: "ZCTが地絡を遮断する",                                  correct: "ZCTは検出のみ。GRが判定し、CBが遮断する" },
        { wrong: "平常時もZCTから常に電流が出ている",                    correct: "平常時はベクトル和ゼロ → 二次出力なし。地絡時のみ出力" },
        { wrong: "鉄心は鉄ならOK、磁性は問わない",                       correct: "高透磁率の磁性体（ケイ素鋼板など）が必須。普通の鉄では飽和する" },
      ]} />

      <h2 id="quick-review">12. 1分復習</h2>
      <QuickReview items={[
        { q: "ZCTの構造を3要素で答えよ",                                  a: "環状鉄心・3線一括貫通・二次巻線" },
        { q: "平常時にZCT二次出力がゼロになる理由は？",                  a: "3相のベクトル和が物理的にゼロ → 鉄心内磁束ゼロ" },
        { q: "地絡時のZCT二次出力は何に比例するか？",                    a: "零相電流 I₀（鉄心内ベクトル和=3I₀）" },
        { q: "なぜ別CTでベクトル合成しないのか？",                        a: "誤差累積でSNR低下。一括貫通は磁束レベルで物理合成し高精度" },
        { q: "ZCT・GR・CBそれぞれの役割は？",                            a: "ZCT=検出、GR=判定、CB=遮断" },
      ]} />

      <h2 id="cross-ref">13. 関連ページ</h2>
      <CrossRef patterns={[
        { a: "ZCTの仕組み（1.9）", b: "中性点非接地系の地絡電流（1.8）", result: "ZCTで検出する I₀ = 2√3 πfV·C₂ の物理的根拠" },
        { a: "ZCT（1.9）",         b: "GR vs DGR の選択",                  result: "DGRは方向判別を加えた高度版（貰い事故防止）" },
        { a: "ZCT（1.9）",         b: "B種接地（1.7）",                    result: "接地系/非接地系どちらでもZCTは地絡保護の主役" },
      ]} />

      <NextAction nextPageId="setsuchi-ichiran" nextPageTitle="接地工事一覧表" onNav={onNav} />
      <UpdateLog entries={[{ date: "2026-05-06", content: "初版作成", reason: "1.8地絡電流ページの ZCT 検出機構を独立解説するため新設" }]} />
      <PageNav
        prevId="hichusei-jiraku"   prevTitle="中性点非接地系の地絡電流"
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
