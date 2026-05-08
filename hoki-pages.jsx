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
    case 'juyoritsu-keisan':       return React.createElement(JuyoritsuKeisanPage, props);
    case 'bshu-setsuchi':          return React.createElement(BshuSetsuchiPage, props);
    case 'hichusei-jiraku':        return React.createElement(HichuseiJirakuPage, props);
    case 'zerosou-henryuki':       return React.createElement(ZeroSouHenryukiPage, props);
    case 'hogokyo-dgr':            return React.createElement(HogoKyochoDgrPage, props);
    case 'setsuchi-ichiran':       return React.createElement(SetsuchiIchiranPage, props);
    case 'zetsuen-ichiran':        return React.createElement(ZetsuenIchiranPage, props);
    case 'rikkaku-ichiran':        return React.createElement(RikkakuIchiranPage, props);
    case 'den-atsu-kubun':         return React.createElement(DenAtsuKubunPage, props);
    case 'densen-size':            return React.createElement(DensenSizePage, props);
    case 'hokoku-todoke-kigen':    return React.createElement(HokokuTodokeKigenPage, props);
    case 'denro-zetsuen':          return React.createElement(DenroZetsuenPage, props);
    case 'setsuchi-koji':          return React.createElement(SetsuchiKojiPage, props);
    case 'densenro':               return React.createElement(DensenroPage, props);
    case 'okunai-haisen':          return React.createElement(OkunaiHaisenPage, props);
    case 'kako-denryu':            return React.createElement(KakoDenryuPage, props);
    case 'chichuu-densenro':       return React.createElement(ChichuuDensenroPage, props);
    case 'bunsangata-dengen':      return React.createElement(BunsangataDengenPage, props);
    case 'gijutsu-kijun-gaiyou':   return React.createElement(GijutsuKijunGaiyouPage, props);
    case 'kosakubutsu-bunrui':     return React.createElement(KosakubutsuBunruiPage, props);
    case 'shunin-gijutsusya':      return React.createElement(ShuninGijutsusyaPage, props);
    case 'hoan-kitei':             return React.createElement(HoanKiteiPage, props);
    case 'shiyo-jishu-kensa':      return React.createElement(ShiyoJishuKensaPage, props);
    case 'jiko-hokoku':            return React.createElement(JikoHokokuPage, props);
    case 'denki-yohin-anzen':      return React.createElement(DenkiYohinAnzenPage, props);
    case 'koji-shi-ho':            return React.createElement(KojiShiHoPage, props);
    case 'koji-gyoho':             return React.createElement(KojiGyohoPage, props);
    case 'furyoku-gijutsukijun':   return React.createElement(StubPage, { ...props, pageId: 'furyoku-gijutsukijun' });
    case 'taiyouchi-gijutsukijun': return React.createElement(StubPage, { ...props, pageId: 'taiyouchi-gijutsukijun' });
    case 'keito-renkei':           return React.createElement(StubPage, { ...props, pageId: 'keito-renkei' });
    case 'demand-kwh-kiso':        return React.createElement(DemandKwhKisoPage, props);
    case 'juyoritsu-gainen':       return React.createElement(JuyoritsuGainenPage, props);
    case 'furitsu':                return React.createElement(FuritsuPage, props);
    case 'futorito':               return React.createElement(StubPage, { ...props, pageId: 'futorito' });
    case 'hensyatsuki-yoryo':      return React.createElement(HensyatsukiYoryoPage, props);
    case 'haiden-kanri':           return React.createElement(StubPage, { ...props, pageId: 'haiden-kanri' });
    case 'juden-setsubi-kanri':    return React.createElement(StubPage, { ...props, pageId: 'juden-setsubi-kanri' });
    case 'demand-kanri':           return React.createElement(DemandKanriPage, props);
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

      <h2 id="explain2">7. 深掘り解説②: 健全相√3倍の物理的意味（フェーザ図）</h2>
      <PlainExplain>
        <p style={{margin: '0 0 10px'}}><strong>「中性点（仮想）が a相導体の位置に移動した」と考えると分かりやすい</strong></p>
        <ul style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li>a相 → 大地電位（中性点位置と一致）</li>
          <li>b相 → a相からみた電位 = 線間電圧 V_ba</li>
          <li>c相 → a相からみた電位 = 線間電圧 V_ca</li>
        </ul>
      </PlainExplain>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16}}>
        <div style={{fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6}}>📊 何が、何に対して、何倍になるのか — 一目で確認</div>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 10}}>
          対象は<strong>「健全相 b・c の対地電圧」</strong>。比較は<strong>「平常時 → a相地絡時」</strong>。電源電圧そのものではない点に注意。
        </div>
        <table style={{width:'100%', fontSize:13, borderCollapse:'collapse', background:'#fff'}}>
          <thead>
            <tr style={{background:'#f0f4f8'}}>
              <th style={{padding:'8px 10px', textAlign:'left', border:'1px solid var(--line)'}}>状態</th>
              <th style={{padding:'8px 10px', textAlign:'center', border:'1px solid var(--line)'}}>健全相b・cの対地電圧</th>
              <th style={{padding:'8px 10px', textAlign:'center', border:'1px solid var(--line)'}}>6600V系統での実値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', color:'#0e6b22', fontWeight:600}}>平常時</td>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', textAlign:'center', fontFamily:'serif'}}>V/√3<br/><span style={{fontSize:11, color:'var(--ink-3)'}}>（相電圧）</span></td>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', textAlign:'center'}}>6600/√3 ≈ <strong>3,810 V</strong></td>
            </tr>
            <tr>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', color:'#a11', fontWeight:600}}>a相地絡時</td>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', textAlign:'center', fontFamily:'serif'}}>V<br/><span style={{fontSize:11, color:'var(--ink-3)'}}>（線間電圧）</span></td>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', textAlign:'center'}}><strong>6,600 V</strong></td>
            </tr>
            <tr style={{background:'#fffaf0'}}>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', fontWeight:700, color:'#a11'}}>倍率</td>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', textAlign:'center', fontFamily:'serif', fontWeight:700, color:'#a11'}}>V ÷ (V/√3) = <strong>√3倍</strong></td>
              <td style={{padding:'8px 10px', border:'1px solid var(--line)', textAlign:'center', fontWeight:700, color:'#a11'}}>6600 ÷ 3810 ≈ <strong>1.732倍</strong></td>
            </tr>
          </tbody>
        </table>
        <div style={{fontSize:12, color:'var(--ink-2)', marginTop:10, padding:'10px 12px', background:'var(--bg-2)', borderLeft:'3px solid #c33', borderRadius:4}}>
          💡 <strong>誤解注意</strong>：「線間電圧Vに上昇」と言われると「6600V系統が何か外的要因で上がった」と誤解しがち。実際は<strong>大地基準が「中性点」→「a相端」に移動</strong>しただけで、b・c相が大地と感じる電圧が「相電圧 V/√3 → 線間電圧 V」に切り替わった現象。<strong>電源電圧そのものは変わっていない。</strong>
        </div>
      </div>

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

      <h2 id="explain3">8. 深掘り解説③: なぜ静電容量を「3相分」考慮するのか</h2>
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
          <strong>上図は b相ループのみ追跡。</strong>c相も同型ループ（地絡点→大地→C_c→c相導体→V_c）を同時並行で流れる。→ 下の【両ループ全体図】参照。
        </div>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 8}}>※ <strong>電験テキスト慣例の方向</strong>（V_a 駆動・地絡点で大地へ降下する Ig 視点）。AC電流のため向きは50/60Hzで反転。C_a は地絡点で短絡されているため電流ゼロ（点線で薄く描画）</div>
      </div>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 20}}>
        <div style={{fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6}}>🔁 【両ループ全体図】b相ループ（緑）と c相ループ（青）が同時並行 → 地絡点で I_g に合流</div>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 10}}>
          地絡は a相のみ。しかし I_g の<strong>還流路</strong>として健全 b相の C_b と c相の C_c が<strong>同時に</strong>経由される。
          2電流が地絡点でベクトル和として合流 → <strong>I_g = √3·ωCV</strong>（60°位相差のため単純加算より √3 倍）。
        </div>
        <svg viewBox="0 0 820 520" style={{width:'100%',height:'auto',background:'#fff'}}>
          <defs>
            <marker id="dualArrIb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#2a8"/>
            </marker>
            <marker id="dualArrIc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
            <marker id="dualArrIg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#c33"/>
            </marker>
          </defs>

          <text x="410" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#222">a相完全地絡時: b相ループ（緑）と c相ループ（青）が同時並行 — 地絡点で I_g = I_b + I_c</text>

          <line x1="80" y1="120" x2="80" y2="390" stroke="#888" strokeWidth="1.5"/>
          <text x="32" y="260" fontSize="11" fill="#888" transform="rotate(-90 32 260)">仮想中性点</text>

          <circle cx="120" cy="155" r="16" fill="#fff" stroke="#2a8" strokeWidth="2"/>
          <text x="120" y="160" textAnchor="middle" fontSize="12" fill="#2a8" fontWeight="700">V_b</text>
          <line x1="80" y1="155" x2="104" y2="155" stroke="#888" strokeWidth="1.5"/>

          <circle cx="120" cy="255" r="16" fill="#fff" stroke="#ccc" strokeWidth="1.5" strokeDasharray="3,2"/>
          <text x="120" y="260" textAnchor="middle" fontSize="11" fill="#ccc">V_a</text>
          <line x1="80" y1="255" x2="104" y2="255" stroke="#ccc" strokeWidth="1" strokeDasharray="3,2"/>

          <circle cx="120" cy="360" r="16" fill="#fff" stroke="#27c" strokeWidth="2"/>
          <text x="120" y="365" textAnchor="middle" fontSize="12" fill="#27c" fontWeight="700">V_c</text>
          <line x1="80" y1="360" x2="104" y2="360" stroke="#888" strokeWidth="1.5"/>

          <line x1="136" y1="155" x2="680" y2="155" stroke="#2a8" strokeWidth="2.5"/>
          <text x="210" y="147" fontSize="11" fill="#2a8" fontWeight="600">b相導体</text>

          <line x1="136" y1="255" x2="666" y2="255" stroke="#ddd" strokeWidth="1.5" strokeDasharray="4,3"/>
          <text x="210" y="247" fontSize="11" fill="#bbb">a相（地絡 → 大地電位）</text>

          <line x1="136" y1="360" x2="680" y2="360" stroke="#27c" strokeWidth="2.5"/>
          <text x="210" y="352" fontSize="11" fill="#27c" fontWeight="600">c相導体</text>

          <line x1="370" y1="155" x2="370" y2="203" stroke="#2a8" strokeWidth="2.5"/>
          <line x1="352" y1="205" x2="388" y2="205" stroke="#2a8" strokeWidth="3"/>
          <line x1="352" y1="215" x2="388" y2="215" stroke="#2a8" strokeWidth="3"/>
          <line x1="370" y1="215" x2="370" y2="470" stroke="#2a8" strokeWidth="2.5"/>
          <text x="394" y="213" fontSize="13" fill="#2a8" fontWeight="700">C_b</text>

          <line x1="510" y1="360" x2="510" y2="403" stroke="#27c" strokeWidth="2.5"/>
          <line x1="492" y1="405" x2="528" y2="405" stroke="#27c" strokeWidth="3"/>
          <line x1="492" y1="415" x2="528" y2="415" stroke="#27c" strokeWidth="3"/>
          <line x1="510" y1="415" x2="510" y2="470" stroke="#27c" strokeWidth="2.5"/>
          <text x="534" y="413" fontSize="13" fill="#27c" fontWeight="700">C_c</text>

          <line x1="140" y1="470" x2="700" y2="470" stroke="#555" strokeWidth="2.5"/>
          {[150,180,210,240,270,300,330,360,390,420,450,480,510,540,570,600,630,660,690].map(x =>
            <line key={x} x1={x} y1="470" x2={x-12} y2="483" stroke="#555" strokeWidth="1.2"/>
          )}
          <text x="706" y="482" fontSize="11" fill="#555">大地</text>

          <line x1="680" y1="255" x2="680" y2="470" stroke="#c33" strokeWidth="3"/>
          <line x1="668" y1="243" x2="692" y2="267" stroke="#c33" strokeWidth="3"/>
          <line x1="692" y1="243" x2="668" y2="267" stroke="#c33" strokeWidth="3"/>
          <text x="694" y="248" fontSize="12" fill="#c33" fontWeight="700">地絡点</text>
          <text x="694" y="263" fontSize="10" fill="#c33">Rg=0</text>

          <line x1="680" y1="260" x2="680" y2="455" stroke="#c33" strokeWidth="4" markerEnd="url(#dualArrIg)"/>
          <text x="700" y="340" fontSize="13" fill="#c33" fontWeight="700">I_g ↓</text>
          <text x="700" y="356" fontSize="11" fill="#c33">= I_b + I_c</text>
          <text x="700" y="374" fontSize="12" fill="#c33" fontWeight="700" fontFamily="serif">= √3·ωCV</text>

          <line x1="660" y1="470" x2="392" y2="470" stroke="#2a8" strokeWidth="3" markerEnd="url(#dualArrIb)"/>
          <line x1="370" y1="460" x2="370" y2="225" stroke="#2a8" strokeWidth="3" markerEnd="url(#dualArrIb)"/>
          <line x1="356" y1="155" x2="198" y2="155" stroke="#2a8" strokeWidth="3" markerEnd="url(#dualArrIb)"/>
          <text x="255" y="172" fontSize="12" fill="#2a8" fontWeight="700">← I_b</text>

          <line x1="654" y1="474" x2="528" y2="474" stroke="#27c" strokeWidth="2.5" markerEnd="url(#dualArrIc)"/>
          <line x1="510" y1="456" x2="510" y2="425" stroke="#27c" strokeWidth="3" markerEnd="url(#dualArrIc)"/>
          <line x1="510" y1="400" x2="510" y2="368" stroke="#27c" strokeWidth="3" markerEnd="url(#dualArrIc)"/>
          <line x1="496" y1="360" x2="198" y2="360" stroke="#27c" strokeWidth="3" markerEnd="url(#dualArrIc)"/>
          <text x="330" y="377" fontSize="12" fill="#27c" fontWeight="700">← I_c</text>

          <rect x="20" y="390" width="248" height="100" fill="#f9f9f9" stroke="#ddd" strokeWidth="1" rx="4"/>
          <text x="32" y="408" fontSize="12" fontWeight="700" fill="#333">凡例（矢印の向き = 電流方向）</text>
          <line x1="32" y1="424" x2="62" y2="424" stroke="#2a8" strokeWidth="2.5"/>
          <text x="70" y="428" fontSize="11" fill="#2a8">b相充電電流 I_b = ω·C_b·V_b</text>
          <line x1="32" y1="444" x2="62" y2="444" stroke="#27c" strokeWidth="2.5"/>
          <text x="70" y="448" fontSize="11" fill="#27c">c相充電電流 I_c = ω·C_c·V_c</text>
          <line x1="32" y1="464" x2="62" y2="464" stroke="#c33" strokeWidth="3"/>
          <text x="70" y="468" fontSize="11" fill="#c33">地絡電流 I_g = I_b + I_c（ベクトル和）</text>
          <text x="32" y="484" fontSize="10" fill="#888">C_b = C_c = C のとき |I_g| = √3·ωCV</text>
        </svg>
        <div style={{fontSize: 12, color:'var(--ink-3)', marginTop:8}}>
          <strong>なぜ √3 倍？</strong> I_b と I_c の大きさは等しい（C_b = C_c = C、健全相電圧 ≒ V）。ただし<strong>60°の位相差</strong>があるため単純加算ではなくベクトル和 → 大きさが √3 倍 = <strong>2|I|·cos30° = √3·|I|</strong>。幾何学的証明は下のフェーザ図参照。
        </div>
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

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16}}>
        <div style={{fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6}}>❓ なぜ I_b と I_c は <strong>120°差ではなく60°差</strong>なのか — 正三角形フェーザで見る基準点シフト</div>
        <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 10}}>
          平常時 V_b と V_c は中性点 O から見て <strong>120°差</strong>。
          しかし a相地絡後、C_b・C_c を駆動する電圧は<strong>相電圧ではなく線間電圧 V_ba・V_ca</strong>（a相が大地電位になるため基準がシフト）。
          3相フェーザの先端は<strong>正三角形</strong>を形成しており、V_a 頂点から B・C 頂点への2辺 = 内角 = <strong>60°差</strong>。
        </div>
        <svg viewBox="0 0 820 370" style={{width:'100%',height:'auto',background:'#fff'}}>
          <defs>
            <marker id="ph60Red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#d33"/>
            </marker>
            <marker id="ph60Grn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#2a8"/>
            </marker>
            <marker id="ph60Blu" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
          </defs>

          <rect x="10" y="20" width="395" height="340" fill="#f8fafc" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="207" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e3a6e">【平常時】V_b と V_c の位相差 = 120°</text>
          <text x="207" y="58" textAnchor="middle" fontSize="11" fill="#666">中性点 O を基準。3相電圧は等間隔（120°ずつ）</text>

          <circle cx="207" cy="215" r="100" fill="none" stroke="#ddd" strokeWidth="1" strokeDasharray="4,3"/>
          <polygon points="207,115 294,265 120,265" fill="none" stroke="#bbb" strokeWidth="1.5" strokeDasharray="5,3"/>
          <text x="207" y="290" textAnchor="middle" fontSize="10" fill="#aaa">正三角形（3相フェーザ先端）</text>

          <circle cx="207" cy="215" r="4" fill="#444"/>
          <text x="218" y="230" fontSize="11" fill="#555">O（中性点）</text>

          <line x1="207" y1="215" x2="207" y2="122" stroke="#d33" strokeWidth="2.5" markerEnd="url(#ph60Red)"/>
          <text x="218" y="118" fontSize="13" fill="#d33" fontWeight="700">V_a</text>

          <line x1="207" y1="215" x2="291" y2="263" stroke="#2a8" strokeWidth="2.5" markerEnd="url(#ph60Grn)"/>
          <text x="298" y="272" fontSize="13" fill="#2a8" fontWeight="700">V_b</text>

          <line x1="207" y1="215" x2="123" y2="263" stroke="#27c" strokeWidth="2.5" markerEnd="url(#ph60Blu)"/>
          <text x="60" y="272" fontSize="13" fill="#27c" fontWeight="700">V_c</text>

          <path d="M 207 175 A 40 40 0 0 1 241 235" fill="none" stroke="#888" strokeWidth="1.3"/>
          <text x="231" y="202" fontSize="12" fill="#888" fontWeight="600">120°</text>

          <path d="M 207 175 A 40 40 0 0 0 173 235" fill="none" stroke="#888" strokeWidth="1.3"/>
          <text x="160" y="202" fontSize="12" fill="#888" fontWeight="600">120°</text>

          <rect x="415" y="20" width="395" height="340" fill="#fff9f0" stroke="#bbb" strokeWidth="1" rx="6"/>
          <text x="612" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#a11">【a相完全地絡後】駆動電圧の位相差 = 60°</text>
          <text x="612" y="58" textAnchor="middle" fontSize="11" fill="#666">a相 = 大地 = 新基準。C_b は V_ba、C_c は V_ca で駆動される</text>

          <polygon points="612,110 699,260 525,260" fill="none" stroke="#bbb" strokeWidth="1.5" strokeDasharray="5,3"/>
          <text x="612" y="286" textAnchor="middle" fontSize="10" fill="#aaa">同じ正三角形（基準点のみ変更）</text>

          <circle cx="612" cy="110" r="5" fill="#c33"/>
          <text x="622" y="107" fontSize="11" fill="#c33" fontWeight="600">a相地絡点（= 大地 = 0V）</text>

          <circle cx="612" cy="210" r="4" fill="#aaa" opacity="0.5"/>
          <text x="622" y="225" fontSize="10" fill="#aaa">O（中性点・移動後）</text>

          <line x1="612" y1="110" x2="695" y2="258" stroke="#2a8" strokeWidth="3" markerEnd="url(#ph60Grn)"/>
          <text x="705" y="266" fontSize="13" fill="#2a8" fontWeight="700">V_ba</text>
          <text x="703" y="282" fontSize="10" fill="#2a8">線間電圧</text>

          <line x1="612" y1="110" x2="529" y2="258" stroke="#27c" strokeWidth="3" markerEnd="url(#ph60Blu)"/>
          <text x="445" y="266" fontSize="13" fill="#27c" fontWeight="700">V_ca</text>
          <text x="450" y="282" fontSize="10" fill="#27c">線間電圧</text>

          <path d="M 632 145 A 40 40 0 0 1 592 145" fill="none" stroke="#e60" strokeWidth="2.5"/>
          <text x="612" y="164" textAnchor="middle" fontSize="15" fill="#e60" fontWeight="700">60°</text>

          <text x="612" y="316" textAnchor="middle" fontSize="12" fill="#a11" fontWeight="700">正三角形の内角 = 60° → V_ba と V_ca の位相差 = 60°</text>
          <text x="612" y="334" textAnchor="middle" fontSize="11" fill="#666">I_b = jωC·V_ba、I_c = jωC·V_ca → 電流の位相差も 60°</text>
        </svg>
        <div style={{fontSize: 12, color:'var(--ink-3)', marginTop:8}}>
          <strong>なぜ 120°→60° に変わるか：</strong>
          平常時は「中性点から各相」への電圧（相電圧）を比べるので 120°差。
          a相地絡後は「a相端（= 大地）から b相・c相」への電圧（線間電圧 V_ba・V_ca）がコンデンサを駆動する。
          フェーザの先端 3点は正三角形を作るため、<strong>V_a 頂点での内角 = 60°</strong>。これが 60°差の本質。
        </div>
      </div>

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
// 5-6. DenkenWikiCTA（denken-wiki 誘導カード・共通）
// ─────────────────────────────────────────────
function DenkenWikiCTA({ url, label, note }) {
  return (
    <div style={{
      background: 'var(--bg-elev)',
      border: '1px solid var(--border)',
      borderLeft: '4px solid var(--accent)',
      borderRadius: 'var(--radius)',
      padding: '14px 18px',
      margin: '20px 0',
    }}>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 700, marginBottom: 6 }}>
        📚 条文・解説・"なぜ"は denken-wiki
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
        {label} →
      </a>
      {note && <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>{note}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-7. KosakubutsuBunruiPage（電気工作物の区分・S・必須）
// ─────────────────────────────────────────────
function KosakubutsuBunruiPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="直流1,000Vの電路は低圧・高圧・特別高圧のどれか"
        choices={["低圧","高圧","特別高圧","区分外"]}
        year="頻出"
        note="読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>低圧</strong>: 交流 600V以下 / 直流 750V以下</li>
          <li><strong>高圧</strong>: 交流 600V超〜<strong>7,000V以下</strong> / 直流 750V超〜7,000V以下</li>
          <li><strong>特別高圧</strong>: 交流・直流とも <strong>7,000V超</strong></li>
          <li>一般用電気工作物は主任技術者・保安規程・届出すべて<strong>不要</strong>（電力会社の調査義務あり）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH01"
        category="04 法令・制度"
        importance="S"
        freq="毎年"
        examType="A問題"
        targets="R06・H29・H25"
        tags={["法令","電気工作物","電圧区分","頻出S"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">電圧区分一覧表</h2>
      <MemTable
        headers={["区分","交流","直流"]}
        rows={[
          ["低圧",     "600 V 以下",          "750 V 以下"],
          ["高圧",     "600 V 超〜7,000 V 以下","750 V 超〜7,000 V 以下"],
          ["特別高圧", "7,000 V 超",          "7,000 V 超"],
        ]}
        note="低圧上限は交流600V／直流750V（直流の方が高い）。特別高圧は交直共通で7,000V超"
      />

      <h2 id="kosakubutsu">工作物の区分（小出力発電設備の閾値）</h2>
      <MemTable
        headers={["発電方式","小出力閾値（一般用判定）"]}
        rows={[
          ["太陽光",  "50 kW 未満（低圧連系のみ）"],
          ["風力",    "20 kW 未満"],
          ["水力",    "20 kW 未満（ダム不要）"],
          ["内燃力",  "10 kW 未満"],
          ["燃料電池","10 kW 未満（出力10kW未満）"],
        ]}
        note="高圧連系の場合は出力に関係なく自家用扱い。閾値は条件次第で変わるため一次資料で要確認"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "直流も低圧の上限は600V",                correct: "直流の低圧は750V以下（交流600Vより高い）" },
        { wrong: "出力50kW未満の太陽光なら必ず一般用",     correct: "高圧連系（6,600V等）の場合は自家用（出力無関係）" },
        { wrong: "高圧の上限は10,000V",                   correct: "高圧は7,000V以下／7,000V超は特別高圧" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "交流600V・直流750Vは低圧？",        a: "両方とも低圧の上限値（含む）" },
        { q: "直流1,000Vの区分は？",              a: "高圧（750V超〜7,000V以下）" },
        { q: "高圧と特別高圧の境界は？",          a: "7,000V（7,000V超は特別高圧、交直共通）" },
        { q: "太陽光50kW・低圧連系の区分は？",    a: "一般用電気工作物（小出力発電設備）" },
        { q: "一般用は主任技術者の選任が必要？",  a: "不要（電力会社の調査義務でカバー）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/kosakubutsu-bunrui/"
        label="denken-wiki「電気工作物の区分」を開く"
        note="条文構造・調査義務・小出力発電設備の正確な定義は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "S・必須テーマ。数値暗記を hoki-wiki に集約" }]} />
      <PageNav
        prevId="hokoku-todoke-kigen" prevTitle="報告・届出期限"
        nextId="shunin-gijutsusya"   nextTitle="主任技術者"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-8. ShuninGijutsusyaPage（主任技術者・S・必須）
// ─────────────────────────────────────────────
function ShuninGijutsusyaPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="第三種電気主任技術者が監督できる電圧の上限は？"
        choices={["50,000 V 以下","50,000 V 未満","100,000 V 未満","170,000 V 未満"]}
        year="頻出"
        note="「以下」と「未満」の違いに注意。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>第三種</strong>: <strong>50,000 V 未満</strong>（かつ 5,000 kW 未満の事業用電気工作物）</li>
          <li><strong>第二種</strong>: <strong>170,000 V 未満</strong></li>
          <li><strong>第一種</strong>: <strong>すべて（電圧無制限）</strong></li>
          <li>選任義務（法43条）と届出義務（法42条）は<strong>別個の手続</strong></li>
          <li>外部委託承認制度: <strong>7,000 V 以下</strong>の需要設備のみ可</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH01"
        category="04 法令・制度"
        importance="S"
        freq="毎年"
        examType="A問題"
        targets="R07・R05・R03・H30"
        tags={["法令","主任技術者","頻出S","電圧区分"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">主任技術者の監督範囲</h2>
      <MemTable
        headers={["種別","電圧上限","発電所制限","主な選任形態"]}
        rows={[
          ["第三種","50,000 V 未満","5,000 kW 未満","通常 / 許可 / 外部委託"],
          ["第二種","170,000 V 未満","制限なし",   "通常 / 許可 / 兼任"],
          ["第一種","制限なし",     "制限なし",   "通常 / 許可 / 兼任"],
        ]}
        note="第三種は「電圧」と「発電所出力」の2軸で範囲を判定する点に注意"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "第三種は50,000V以下まで監督できる",        correct: "正しくは50,000V未満（ちょうど50,000Vは不可）" },
        { wrong: "第三種なら出力に関係なく監督できる",        correct: "発電所5,000kW以上は不可（電圧と出力の2軸判定）" },
        { wrong: "外部委託は低圧需要設備に限る",              correct: "7,000V以下の需要設備（高圧6,600Vも対象）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "第三種の電圧上限は？",            a: "50,000V未満（「以下」ではない）" },
        { q: "第三種で監督できない発電所は？",  a: "出力5,000kW以上の発電所" },
        { q: "第二種の電圧上限は？",            a: "170,000V未満" },
        { q: "外部委託の対象範囲は？",          a: "7,000V以下の需要設備のみ" },
        { q: "選任と届出はワンセット？",        a: "別個の手続（法43条 vs 法42条）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/shunin-gijutsusha/"
        label="denken-wiki「電気主任技術者」を開く"
        note="許可選任・兼任・外部委託の手続詳細と条文根拠は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "S・必須テーマ。監督範囲の暗記を hoki-wiki に集約" }]} />
      <PageNav
        prevId="kosakubutsu-bunrui" prevTitle="電気工作物の区分"
        nextId="hoan-kitei"          nextTitle="保安規程"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-9. HoanKiteiPage（保安規程・S・必須）
// ─────────────────────────────────────────────
function HoanKiteiPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="保安規程に必ず定めなければならない事項として、誤っているものはどれか"
        choices={["保安業務を管理する者の職務及び組織","保安教育","保守及び点検","電気料金の算定方法"]}
        year="頻出"
        note="保安規程は『安全確保のための社内ルール』。料金は対象外。"
      />

      <ConclusionBox>
        <ul>
          <li><strong>対象</strong>: 自家用電気工作物の設置者（一般用は不要）</li>
          <li><strong>届出時期</strong>: 使用の開始<strong>前</strong>に届出</li>
          <li><strong>変更時</strong>: <strong>遅滞なく</strong>届出（事前届出ではない）</li>
          <li><strong>必要記載</strong>: 保安組織・保安教育・巡視点検・運転操作・災害対策など</li>
          <li><strong>保安原則</strong>（電技省令 第1〜4条）: 人体・物件・電気機械器具・他工作物/植物 を守る</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH01"
        category="04 法令・制度"
        importance="S"
        freq="毎年"
        examType="A問題"
        targets="R07・R04・H29"
        tags={["法令","保安規程","保安原則","頻出S"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">保安原則（電気事業法施行規則 / 電技省令 第1〜4条）</h2>
      <MemTable
        headers={["条文","保護対象","キーワード"]}
        rows={[
          ["第1条","人体・物件",      "危害防止"],
          ["第2条","電路",            "大地から絶縁（構造上やむを得ない場合は例外）"],
          ["第3条","電気機械器具",    "熱・爆発・火災防止"],
          ["第4条","他の電気工作物・植物・電線路","損傷防止"],
        ]}
        note="第4条の保護対象に『植物』が入っている点が頻出ひっかけ"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "保安規程の変更は事前届出",            correct: "変更は『遅滞なく』届出（事後届出も含む）" },
        { wrong: "電路は必ず大地から絶縁する",          correct: "『構造上やむを得ない場合』は例外あり（第2条但書）" },
        { wrong: "第4条が守るのは他の電線路のみ",       correct: "他の電気工作物・植物・電線路の3点セット" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "保安規程の届出時期は？",              a: "使用開始前（事前届出）" },
        { q: "保安規程の変更時の届出は？",          a: "遅滞なく（事後でも可）" },
        { q: "第3条で防止すべき3つの危険は？",      a: "熱・爆発・火災" },
        { q: "保安規程は一般用電気工作物にも必要？",a: "不要（自家用のみ）" },
        { q: "第2条の例外規定は？",                 a: "『構造上やむを得ない場合はこの限りでない』" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/hoan-gensoku/"
        label="denken-wiki「保安原則・保安規程」を開く"
        note="条文の正確な記載事項・電技省令の階層構造は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "S・必須テーマ。保安原則4条の暗記表を整備" }]} />
      <PageNav
        prevId="shunin-gijutsusya" prevTitle="主任技術者"
        nextId="shiyo-jishu-kensa" nextTitle="使用前自主検査"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-10. JikoHokokuPage（事故報告・A・高頻度）
// ─────────────────────────────────────────────
function JikoHokokuPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="電気関係報告規則における速報の報告期限として正しいものはどれか"
        choices={["事故発生から12時間以内","事故発生を知った時から24時間以内","事故発生から48時間以内","事故発生を知った日から30日以内"]}
        year="頻出"
        note="起算点が『発生時』ではなく『知った時/日』である点に注意"
      />

      <ConclusionBox>
        <ul>
          <li><strong>速報</strong>: 事故発生を<strong>知った時</strong>から<strong>24時間以内</strong>（電話等）</li>
          <li><strong>詳報</strong>: 事故発生を<strong>知った日</strong>から<strong>30日以内</strong>（様式第13）</li>
          <li><strong>報告先</strong>: 所轄<strong>産業保安監督部長</strong>（原則）</li>
          <li><strong>感電要件</strong>: 死亡 OR <strong>入院を要する</strong>負傷（軽傷は対象外）</li>
          <li>速報・詳報は<strong>別個の義務</strong>（速報を出しても詳報は必要）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH01"
        category="04 法令・制度"
        importance="A"
        freq="頻出"
        examType="A問題"
        targets="R06・R03・H30"
        tags={["法令","事故報告","数値暗記","期限"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">速報 vs 詳報 比較</h2>
      <MemTable
        headers={["項目","速報","詳報"]}
        rows={[
          ["期限",   "24時間以内",     "30日以内"],
          ["起算点", "知った『時』",   "知った『日』"],
          ["方法",   "電話等",         "様式第13"],
          ["目的",   "緊急対応",       "原因究明"],
        ]}
        note="期限と起算点の組み合わせ（時 vs 日）が混乱ポイント。表でセットで覚える"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "速報は事故発生時から24時間",      correct: "事故発生を『知った時』から24時間（夜間等は発見・通報時点）" },
        { wrong: "感電は軽傷でも全件報告",          correct: "死亡または『入院を要する』負傷が条件" },
        { wrong: "速報を出せば詳報は省略可能",      correct: "速報・詳報は別個の義務（両方必要）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "速報の期限と起算点は？",          a: "知った時から24時間以内" },
        { q: "詳報の期限と起算点は？",          a: "知った日から30日以内" },
        { q: "事故報告の原則の報告先は？",      a: "所轄産業保安監督部長" },
        { q: "感電報告の閾値は？",              a: "死亡または入院を要する負傷" },
        { q: "波及事故の方向は？",              a: "自家用 → 一般送配電事業者等への供給支障" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/articles/other/jiko-3/"
        label="denken-wiki「事故報告（電気関係報告規則 第3条）」を開く"
        note="報告対象事故の全リスト・PCB漏洩等の詳細は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "速報24h・詳報30dの混同防止用に暗記表を整備" }]} />
      <PageNav
        prevId="shiyo-jishu-kensa" prevTitle="使用前自主検査"
        nextId="denki-yohin-anzen" nextTitle="電気用品安全法"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-11. DensenSizePage（電線サイズ一覧・B・中頻度）
// ─────────────────────────────────────────────
function DensenSizePage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="IV電線（1.6mm）を同一管内に4本収めた場合の許容電流は概ねいくらか"
        choices={["19 A","12 A","24 A","33 A"]}
        year="頻出"
        note="ベース許容電流に低減率を掛ける。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>IV（600Vビニル絶縁電線）</strong>: 耐熱 60℃・管内配線</li>
          <li><strong>CV（架橋ポリエチレン絶縁ケーブル）</strong>: 耐熱 90℃・幹線</li>
          <li><strong>許容電流（IV単線・周囲30℃）</strong>: 1.6mm <strong>19A</strong> / 2.0mm <strong>24A</strong> / 2.6mm <strong>33A</strong></li>
          <li><strong>管内本数低減率</strong>: 〜3本 <strong>0.70</strong> / 4本 <strong>0.63</strong> / 5〜6本 <strong>0.56</strong></li>
          <li><strong>ビニルコード</strong>: 固定配線禁止（移動電線専用）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="02 表暗記"
        importance="B"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R05・R02・H29"
        tags={["電線","ケーブル","表暗記","許容電流"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">許容電流（周囲温度30℃・単線基準）</h2>
      <MemTable
        headers={["太さ","IV（管内）","ベース","用途"]}
        rows={[
          ["1.6 mm",   "19 A",  "—",   "屋内配線・15A/20A分岐"],
          ["2.0 mm",   "24 A",  "—",   "屋内配線・20A分岐"],
          ["2.6 mm",   "33 A",  "—",   "屋内配線・30A分岐"],
          ["5.5 mm²",  "39 A",  "—",   "幹線（小規模）"],
          ["22 mm²",   "75 A",  "115 A（CV）","幹線（中規模）・分岐回路50A幹線"],
        ]}
        note="数値は主要なもののみ。施設条件で変わるため正確な値は内線規程・電技解釈で要確認"
      />

      <h2 id="reduce">管内本数による低減率</h2>
      <MemTable
        headers={["管内本数","低減率","1.6mm 実効値"]}
        rows={[
          ["3本以下","0.70","19 × 0.70 = 13.3 A"],
          ["4本",    "0.63","19 × 0.63 = 12.0 A"],
          ["5〜6本", "0.56","19 × 0.56 = 10.6 A"],
        ]}
        note="本数が増えるほど放熱が悪化するため許容電流が減る。低減率は『3本0.70 / 4本0.63 / 6本0.56』が頻出"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "カタログの許容電流をそのまま設計に使う",   correct: "管内本数で低減率を掛ける（1.6mm 4本→12A）" },
        { wrong: "OW線を屋内に使ってよい",                   correct: "OW線は屋外専用。屋内は IV・VVF など" },
        { wrong: "ビニルコードを天井固定配線に使ってよい",    correct: "ビニルコードは移動電線専用（固定配線禁止）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "IV 1.6mm の許容電流（30℃）は？",      a: "19 A" },
        { q: "IV 1.6mm を 4本管内収納時の許容電流は？", a: "12 A（19×0.63）" },
        { q: "管内3本以下の低減率は？",                a: "0.70" },
        { q: "CVとIVの耐熱温度の差は？",               a: "CV 90℃ / IV 60℃（CVが高い）" },
        { q: "ビニルコードの用途は？",                 a: "移動電線専用（固定配線禁止）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/densen-cable/"
        label="denken-wiki「電線・ケーブルの選定」を開く"
        note="絶縁電線とケーブルの構造差・施設条件別の選定基準は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "§02表暗記セクション完全制覇" }]} />
      <PageNav
        prevId="den-atsu-kubun"     prevTitle="電圧区分一覧"
        nextId="hokoku-todoke-kigen" nextTitle="報告・届出期限"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-12. ShiyoJishuKensaPage（使用前自主検査・点検頻度・A）
// ─────────────────────────────────────────────
function ShiyoJishuKensaPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="事業用電気工作物の月次点検頻度として正しいものはどれか"
        choices={["1回以上/週","1回以上/月","1回以上/3か月","1回以上/年"]}
        year="頻出"
        note="点検頻度は月次・年次が基本。外部委託で月次→隔月に緩和"
      />

      <ConclusionBox>
        <ul>
          <li><strong>月次点検</strong>: <strong>1回以上/月</strong>（事業用電気工作物の基本）</li>
          <li><strong>年次点検</strong>: <strong>1回以上/年</strong></li>
          <li><strong>外部委託</strong>時は月次→<strong>隔月</strong>に緩和（廃止ではない）</li>
          <li><strong>一般用</strong>は<strong>4年に1回</strong>の定期調査（電力会社が実施）</li>
          <li>根拠: 電気事業法 第39条「常時技術基準に適合させよ」</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH01"
        category="04 法令・制度"
        importance="A"
        freq="頻出"
        examType="A問題"
        targets="R05・R02・H29"
        tags={["法令","点検","施設管理","頻出"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">点検頻度一覧</h2>
      <MemTable
        headers={["点検内容","頻度","主体","根拠"]}
        rows={[
          ["月次点検",     "1回以上/月", "設置者またはメーカ", "施行規則 第94条"],
          ["年次点検",     "1回以上/年", "同上",              "同上"],
          ["月次（外部委託）","隔月OK",   "外部委託業者",       "外部委託承認制度"],
          ["定期調査（一般用）","4年に1回","電力会社",          "施行規則 第96条"],
        ]}
        note="『隔月』は月次の緩和であって廃止ではない。義務自体は継続"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "月次点検は1回/3ヶ月でOK",                correct: "1回以上/月（毎月が最低基準）" },
        { wrong: "外部委託すれば月次点検は廃止される",     correct: "隔月に緩和されるだけ（実施義務は継続）" },
        { wrong: "一般用も設置者が4年に1回点検する",       correct: "一般用は電力会社が4年に1回調査" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "事業用の月次点検頻度は？",        a: "1回以上/月" },
        { q: "外部委託時の月次点検頻度は？",    a: "隔月（2か月に1回）に緩和" },
        { q: "一般用の定期調査頻度と主体は？",  a: "電力会社が4年に1回" },
        { q: "年次点検の頻度は？",              a: "1回以上/年" },
        { q: "点検義務の法的根拠は？",          a: "電気事業法 第39条（技術基準への常時適合義務）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/shisetsu-kanri/"
        label="denken-wiki「施設管理・点検体制」を開く"
        note="点検項目の詳細・記録保存期間・変圧器全日効率の計算は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "点検頻度の暗記表を整備" }]} />
      <PageNav
        prevId="hoan-kitei"  prevTitle="保安規程"
        nextId="jiko-hokoku" nextTitle="事故報告"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-13. DenkiYohinAnzenPage（電気用品安全法・PSE・B）
// ─────────────────────────────────────────────
function DenkiYohinAnzenPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="特定電気用品の PSE マーク形状として正しいものはどれか"
        choices={["○ 丸形","◇ ひし形","△ 三角形","□ 四角形"]}
        year="頻出"
        note="ひし形=角多い=厳しい（特定品目）と覚える"
      />

      <ConclusionBox>
        <ul>
          <li><strong>特定電気用品（◇ひし形）</strong>: 116品目・登録検査機関による<strong>第三者検査必須</strong></li>
          <li><strong>特定以外（○丸形）</strong>: 341品目・<strong>自己検査</strong>でOK</li>
          <li>義務主体は<strong>製造事業者・輸入事業者のみ</strong>（販売業者は含まれない）</li>
          <li>特定の代表: 電線・ヒューズ・配線器具・遮断器・電熱器具</li>
          <li>特定以外の代表: 電灯器具・扇風機・テレビ・電子レンジ</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH02"
        category="04 法令・制度"
        importance="B"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R04・H30・H27"
        tags={["法令","PSE","電気用品安全法","表暗記"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">PSE 区分比較</h2>
      <MemTable
        headers={["項目","特定電気用品（◇）","特定以外（○）"]}
        rows={[
          ["品目数",   "116品目",                "341品目"],
          ["マーク",   "◇ ひし形",              "○ 丸形"],
          ["検査",     "登録検査機関による第三者検査", "自己検査でOK"],
          ["代表品目", "電線・ヒューズ・遮断器",   "電灯器具・扇風機・電子レンジ"],
          ["危険度",   "高（感電・火災リスク大）",  "低〜中"],
        ]}
        note="ひし形（◇）は『角が多い＝厳しい』で特定品目と覚える"
      />

      <h2 id="duty">義務主体の整理</h2>
      <MemTable
        headers={["主体","表示義務","検査実施","記録保存"]}
        rows={[
          ["製造事業者","○","○","○"],
          ["輸入事業者","○","○","○"],
          ["販売事業者","×","×","×（『PSEなし品を売るな』が唯一）"],
        ]}
        note="販売業者は『直接の検査・表示義務はない』が、『PSEなし品の販売禁止』の規制を受ける"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "○丸形の方が◇ひし形より厳しい",       correct: "◇ひし形が特定（116品目）で最も厳しい" },
        { wrong: "販売業者にもPSE表示義務がある",       correct: "義務は製造・輸入事業者のみ" },
        { wrong: "特定以外は検査・記録が一切不要",      correct: "自己検査と基準適合確認・記録保存は必要" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "特定電気用品のマーク形状は？",        a: "◇ ひし形" },
        { q: "特定電気用品の品目数は？",            a: "116品目" },
        { q: "特定電気用品の検査方法は？",          a: "登録検査機関による第三者検査（必須）" },
        { q: "PSE表示義務を負うのは誰か？",         a: "製造事業者と輸入事業者（販売業者は含まれない）" },
        { q: "電線が特定電気用品である理由は？",    a: "隠蔽施工→点検困難→粗悪品が長期残留→発火リスク大" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/pse-anzen-ho/"
        label="denken-wiki「電気用品安全法（PSE）」を開く"
        note="特定品目リスト全体・販売業者の例外規定は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "PSE区分の暗記表を整備" }]} />
      <PageNav
        prevId="jiko-hokoku" prevTitle="事故報告"
        nextId="koji-shi-ho" nextTitle="電気工事士法"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-14. KojiGyohoPage（電気工事業法・登録・B）
// ─────────────────────────────────────────────
function KojiGyohoPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="電気工事業者の登録の有効期間として正しいものはどれか"
        choices={["3年","5年","7年","10年"]}
        year="頻出"
        note="電気工事士免状の書換周期と同じ。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>登録先</strong>: 1都道府県内→<strong>都道府県知事</strong> / 2県以上→<strong>経済産業大臣</strong></li>
          <li><strong>有効期間</strong>: <strong>5年</strong>（更新必要）</li>
          <li><strong>主任電気工事士</strong>を営業所ごとに1名選任（必須）</li>
          <li>第一種: 実務経験<strong>不要</strong> / 第二種: <strong>3年以上</strong>の実務経験が必要</li>
          <li><strong>必須器具3点</strong>: 絶縁抵抗計・接地抵抗計・回路計（クランプメータは任意）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH02"
        category="04 法令・制度"
        importance="B"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R03・H29・H26"
        tags={["法令","電気工事業法","登録","表暗記"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">登録区分</h2>
      <MemTable
        headers={["区分","登録先","条件","有効期間"]}
        rows={[
          ["登録（県知事）","都道府県知事",      "1都道府県内",   "5年（要更新）"],
          ["登録（大臣）",  "経済産業大臣",      "2都道府県以上", "5年（要更新）"],
          ["みなし登録",    "建設業許可で代替",  "建設業許可者",  "建設業許可に準ずる"],
        ]}
        note="2県以上は『各知事』ではなく『大臣に1回』。みなし登録でも主任工事士・器具備付けの規制は適用"
      />

      <h2 id="shunin">主任電気工事士の要件</h2>
      <MemTable
        headers={["資格","免状要件","実務経験"]}
        rows={[
          ["第一種電気工事士","免状取得のみで可", "不要（その日からなれる）"],
          ["第二種電気工事士","免状取得後",       "3年以上必須"],
        ]}
        note="第二種で即主任電気工事士になれない点が頻出ひっかけ"
      />

      <h2 id="kigu">必須備付器具</h2>
      <MemTable
        headers={["器具","用途","法定要件"]}
        rows={[
          ["絶縁抵抗計（メガー）","配線・機器の絶縁抵抗測定","必須"],
          ["接地抵抗計",         "接地工事の接地抵抗測定",   "必須"],
          ["回路計（テスター）", "電圧・電流・抵抗測定",     "必須"],
          ["クランプメータ",     "電流測定（簡便用）",       "任意"],
        ]}
        note="クランプメータが必須3点に含まれない点が頻出ひっかけ"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "2県以上の場合は各県の知事に登録",   correct: "経産大臣に1回登録で足りる" },
        { wrong: "登録の有効期間は3年",                 correct: "5年（電気工事士免状の書換周期と同じ）" },
        { wrong: "第二種で即座に主任電気工事士になれる",correct: "免状取得後3年以上の実務経験が必須" },
        { wrong: "クランプメータは法定3点に含まれる",   correct: "法定3点は『絶縁抵抗計・接地抵抗計・回路計』" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "1県内のみで営業する場合の登録先は？",        a: "都道府県知事" },
        { q: "2県以上の場合の登録先は？",                  a: "経済産業大臣（1回登録で足りる）" },
        { q: "登録の有効期間は？",                         a: "5年（要更新）" },
        { q: "第二種が主任工事士になる実務経験要件は？",   a: "3年以上" },
        { q: "営業所必須3点セットの器具は？",              a: "絶縁抵抗計・接地抵抗計・回路計（テスター）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/denki-koji-gyo/"
        label="denken-wiki「電気工事業法」を開く"
        note="みなし登録の要件・更新手続・様式は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "§04 法令制度セクション完全制覇" }]} />
      <PageNav
        prevId="koji-shi-ho" prevTitle="電気工事士法"
        nextId="furyoku-gijutsukijun" nextTitle="風力発電の技術基準"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-15. DenroZetsuenPage（電路の絶縁・低圧抵抗値・S・必須）
// ─────────────────────────────────────────────
function DenroZetsuenPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="単相3線式100/200V電路の絶縁抵抗値はいくら以上必要か"
        choices={["0.1 MΩ以上","0.2 MΩ以上","0.4 MΩ以上","1.0 MΩ以上"]}
        year="頻出"
        note="対地電圧で判断するのがコツ。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>対地電圧 150V以下</strong>: 0.1 MΩ 以上</li>
          <li><strong>対地電圧 150V超 300V以下</strong>: 0.2 MΩ 以上</li>
          <li><strong>使用電圧 300V超の低圧</strong>: 0.4 MΩ 以上</li>
          <li>覚え方：<strong>「い・に・し」（0.1→0.2→0.4）</strong></li>
          <li>接地式 vs 非接地式で対地電圧が変わるので、まず接地方式を確認</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="S"
        freq="毎年"
        examType="A問題・B問題"
        targets="R06・R04・H29"
        tags={["絶縁","低圧","表暗記","頻出S","電技解釈第14条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="tables">絶縁抵抗値（電技解釈 第14条）</h2>
      <MemTable
        headers={["電路区分","対地電圧／使用電圧","絶縁抵抗値"]}
        rows={[
          ["低圧（150V以下）",     "対地電圧 150V 以下",    "0.1 MΩ 以上"],
          ["低圧（150V超300V以下）","対地電圧 150V 超 300V 以下","0.2 MΩ 以上"],
          ["低圧（300V超）",       "使用電圧 300V 超",        "0.4 MΩ 以上"],
        ]}
        note="0.1MΩ「以上」が正解（0.1MΩちょうども合格）。「を超える」と書いてある選択肢はひっかけ"
      />

      <h2 id="examples">配線方式別の判定例</h2>
      <MemTable
        headers={["配線方式","対地電圧／使用電圧","絶縁抵抗値"]}
        rows={[
          ["単相3線式 100/200V",        "対地電圧 100V → 150V以下",         "0.1 MΩ 以上"],
          ["三相3線式 200V（非接地式）","対地電圧 200V → 150V超300V以下",   "0.2 MΩ 以上"],
          ["三相4線式 400V",            "使用電圧 400V → 300V超",            "0.4 MΩ 以上"],
        ]}
        note="非接地式は対地電圧＝線間電圧。接地式の三相3線200Vなら対地電圧は相電圧（約115V）→ 0.1MΩ"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "三相3線200Vは200Vだから0.2MΩ",        correct: "接地方式により異なる。非接地式なら0.2MΩ、接地式なら相電圧115V→0.1MΩ" },
        { wrong: "0.1MΩ「を超える」が合格基準",        correct: "正しくは「0.1MΩ以上」（ちょうど0.1MΩは合格）" },
        { wrong: "絶縁抵抗試験と絶縁耐力試験は同じもの", correct: "絶縁抵抗=日常の漏れ電流チェック／耐力試験=竣工・改修時の強度確認" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "単相3線式100/200V電路の絶縁抵抗値は？",  a: "0.1 MΩ 以上（対地電圧100V）" },
        { q: "三相4線式400V電路の絶縁抵抗値は？",      a: "0.4 MΩ 以上（使用電圧300V超）" },
        { q: "覚え方の語呂は？",                        a: "い・に・し（0.1→0.2→0.4）。境目は150Vと300V" },
        { q: "0.1MΩの電路に150V印加時の漏れ電流は？",  a: "1.5 mA（150V ÷ 0.1MΩ）— 感電閾値以下" },
        { q: "絶縁抵抗と絶縁耐力試験の違いは？",        a: "絶縁抵抗=日常管理、耐力試験=竣工・改修時の強度確認" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/zetsuen/"
        label="denken-wiki「電路の絶縁」を開く"
        note="接地方式・対地電圧の特定方法・条文構造（法39条→電技5条→解釈14条）は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "S・必須テーマ。絶縁抵抗値0.1/0.2/0.4MΩ暗記表を整備" }]} />
      <PageNav
        prevId="hokoku-todoke-kigen" prevTitle="報告・届出期限"
        nextId="setsuchi-koji"        nextTitle="接地工事（制度全体）"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-16. SetsuchiKojiPage（接地工事・制度全体・S・必須）
// ─────────────────────────────────────────────
function SetsuchiKojiPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="0.5秒以内に動作する漏電遮断器を施設したD種接地工事で、緩和される接地抵抗値の上限は？"
        choices={["100 Ω以下","200 Ω以下","500 Ω以下","1,000 Ω以下"]}
        year="頻出"
        note="ELB緩和はC種・D種だけに適用される。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li>4種別の数値暗記表は<strong>「接地工事一覧表」（setsuchi-ichiran）</strong>で確認</li>
          <li><strong>ELB緩和</strong>: C種・D種のみ → <strong>500 Ω 以下</strong>（A種・B種には適用なし）</li>
          <li><strong>ELB条件</strong>: <strong>0.5秒以内</strong>に動作する漏電遮断器が施設されている</li>
          <li><strong>B種倍々ルール</strong>: 規定なし<strong>150/Ig</strong> → 1秒以内<strong>300/Ig</strong> → 0.5秒以内<strong>600/Ig</strong></li>
          <li><strong>接地線径</strong>: A種2.6mm／B種4mm／C・D種1.6mm（引張強さで規定）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="S"
        freq="毎年"
        examType="A問題・B問題"
        targets="R06下・R05・R03・H30"
        tags={["接地","頻出S","制度","電技解釈第17〜19条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="elb">ELB（漏電遮断器）緩和まとめ</h2>
      <MemTable
        headers={["種別","ELB緩和","緩和後の抵抗値","条件"]}
        rows={[
          ["A種","× なし",    "—",         "— （高圧・特別高圧機器は厳格に10Ω）"],
          ["B種","× なし",    "—",         "B種は遮断時間で別途緩和あり（下表参照）"],
          ["C種","○ あり",   "500 Ω 以下", "0.5秒以内に動作する漏電遮断器を施設"],
          ["D種","○ あり",   "500 Ω 以下", "0.5秒以内に動作する漏電遮断器を施設"],
        ]}
        note="ELB（30mA・0.1秒）動作なら 500Ω×30mA=15V で接触電圧が安全レベル"
      />

      <h2 id="b-rule">B種接地工事の倍々ルール（解釈第18条）</h2>
      <MemTable
        headers={["遮断時間","接地抵抗値","係数"]}
        rows={[
          ["規定なし（2秒超）", "150 / Ig Ω 以下", "1倍（基本）"],
          ["1秒以内に遮断",     "300 / Ig Ω 以下", "2倍"],
          ["0.5秒以内に遮断",   "600 / Ig Ω 以下", "4倍"],
        ]}
        note="「時間が半分→係数2倍」。Ig は高圧側の1線地絡電流"
      />

      <h2 id="d-omit">D種接地工事の省略条件</h2>
      <ConclusionBox>
        <ul>
          <li>対地電圧 <strong>150V 以下</strong>の機械器具を、<strong>乾燥した場所</strong>に施設する場合</li>
          <li><strong>木製の床</strong>等、絶縁性のものの上で取り扱うように施設する場合</li>
          <li>機械器具に<strong>二重絶縁の構造</strong>のものを施設する場合</li>
          <li>低圧用機械器具に<strong>絶縁変圧器</strong>を施設し、二次側を非接地とした場合</li>
        </ul>
      </ConclusionBox>

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "A種・B種にもELB緩和が適用される",       correct: "ELB緩和はC種・D種のみ（A種B種は厳格）" },
        { wrong: "B種は常に150/Ig固定",                   correct: "倍々ルール：1秒以内→300/Ig、0.5秒以内→600/Ig" },
        { wrong: "A種とC種は同じ10Ωだから接地線径も同じ", correct: "A種は2.6mm以上（高圧機器）、C種は1.6mm以上（低圧機器）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "ELB緩和でC種・D種の抵抗値は？",         a: "500 Ω 以下（0.5秒以内ELB条件）" },
        { q: "ELB緩和の動作時間条件は？",              a: "0.5秒以内に動作する漏電遮断器" },
        { q: "B種で1秒以内遮断時の抵抗値は？",         a: "300 / Ig Ω 以下" },
        { q: "ELB緩和が適用されない接地工事は？",      a: "A種・B種（高圧機器・変圧器中性点は厳格）" },
        { q: "D種接地が省略可能な代表条件は？",        a: "対地電圧150V以下＋乾燥場所、木製床、二重絶縁、絶縁変圧器二次非接地" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/setsuchi/"
        label="denken-wiki「接地工事」を開く"
        note="条文構造（法39条→電技10条→解釈17〜19条）と各種別の物理的根拠（接触電圧の抑制原理）は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "S・必須テーマ。ELB緩和とB種倍々ルールを集約（setsuchi-ichiran と棲み分け）" }]} />
      <PageNav
        prevId="denro-zetsuen" prevTitle="電路の絶縁"
        nextId="densenro"      nextTitle="電線路（架空）"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-17. DensenroPage（架空電線路・高さ・風圧荷重・A・必須）
// ─────────────────────────────────────────────
function DensenroPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="高圧架空電線が道路を横断する場合、路面上の最低高さは？"
        choices={["5 m 以上","5.5 m 以上","6 m 以上","7 m 以上"]}
        year="頻出"
        note="鉄道横断と混同しないように。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li>離隔距離（建造物・道路上等）の数値は<strong>「離隔距離一覧」（rikkaku-ichiran）</strong>を参照</li>
          <li><strong>横断時の高さ</strong>: 道路 <strong>6m 以上</strong> / 鉄道・軌道 <strong>5.5m 以上</strong> / 横断歩道橋上 <strong>3.5m 以上</strong></li>
          <li><strong>風圧荷重</strong>: 甲種（高温季・氷雪なし・全風）／乙種（低温季・氷雪付着・甲種の1/2風圧）／丙種（高温季・人家密集・甲種の1/2）</li>
          <li><strong>たるみ計算</strong>: D = W S² / 8T（スパン S² に比例）</li>
          <li><strong>安全率</strong>: 硬銅線 2.2 / 鉄柱 2.0 / 支線 1.5</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="A"
        freq="頻出"
        examType="A問題・B問題（計算）"
        targets="R05・R02・H29・H27"
        tags={["架空電線路","高さ","風圧荷重","電技解釈第49条・第58条・第68条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="height">横断時の最低高さ</h2>
      <MemTable
        headers={["場所","低圧","高圧","特別高圧"]}
        rows={[
          ["道路横断",       "6 m 以上",   "6 m 以上",   "6 m 以上"],
          ["鉄道・軌道横断", "5.5 m 以上", "5.5 m 以上", "5.5 m 以上"],
          ["横断歩道橋の上", "3.5 m 以上", "3.5 m 以上", "—"],
          ["その他（一般）", "5 m 以上",   "5 m 以上",   "5 m 以上"],
        ]}
        note="道路6m＞鉄道5.5m＞その他5m＞横断歩道橋3.5m。「車両が通る道路が最高」と覚える"
      />

      <h2 id="wind">風圧荷重の3区分（解釈第58条）</h2>
      <MemTable
        headers={["種別","季節条件","氷雪","風圧"]}
        rows={[
          ["甲種風圧荷重","高温季",          "なし",                          "風速40m/s相当（フル）"],
          ["乙種風圧荷重","低温季",          "付着あり（厚さ6mm・比重0.9）", "甲種の 1/2"],
          ["丙種風圧荷重","高温季・人家密集","なし",                          "甲種の 1/2"],
        ]}
        note="設計時は3種のうち最も厳しい荷重を採用。乙種は風圧1/2でも氷雪で受風面積が増えて支配的になる場合あり"
      />

      <h2 id="safety">安全率（解釈第68条等）</h2>
      <MemTable
        headers={["対象部材","安全率"]}
        rows={[
          ["硬銅線・耐熱銅合金線", "2.2 以上"],
          ["その他の電線",         "2.5 以上"],
          ["鉄柱・コンクリート柱", "2.0 以上"],
          ["支線",                 "1.5 以上"],
        ]}
        note="「硬銅2.2／柱2.0／支線1.5」と数値の大小関係で覚える"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "鉄道横断が一番高い6m",                    correct: "道路6m＞鉄道5.5m（車両は鉄道車両より背の高い大型車も通る）" },
        { wrong: "乙種は風圧が甲種の1/2だから設計上弱い",   correct: "氷雪付着で受風面積が増え、結果的に乙種が支配的になる地域もある" },
        { wrong: "たるみは D = W S / 8T（一次比例）",       correct: "正しくは D = W S² / 8T（スパン S² に比例）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "道路を横断する架空電線の最低高さは？",   a: "6 m 以上（低圧・高圧・特別高圧とも）" },
        { q: "鉄道を横断する架空電線の最低高さは？",   a: "5.5 m 以上" },
        { q: "乙種風圧荷重の特徴は？",                  a: "低温季・氷雪付着（厚さ6mm）想定、風圧は甲種の1/2" },
        { q: "たるみ D の計算式は？",                   a: "D = W S² / 8T（スパン S² に比例）" },
        { q: "硬銅線の安全率は？",                     a: "2.2 以上" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/kachiku-densen/"
        label="denken-wiki「架空電線路」を開く"
        note="支持物の種類別規定・電線太さの選定・地中電線路との比較は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "A・必須テーマ。高さ・風圧荷重・たるみ計算式を集約（rikkaku-ichiran と棲み分け）" }]} />
      <PageNav
        prevId="setsuchi-koji" prevTitle="接地工事（制度全体）"
        nextId="okunai-haisen" nextTitle="屋内配線"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-18. OkunaiHaisenPage（屋内配線・PF/CD管・分岐回路・B）
// ─────────────────────────────────────────────
function OkunaiHaisenPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="20A配線用遮断器の分岐回路に使用できる電線の最小太さはどれか"
        choices={["直径 1.6 mm 以上","直径 2.0 mm 以上","直径 2.6 mm 以上","断面積 5.5 mm² 以上"]}
        year="頻出"
        note="配線用遮断器とヒューズで規定が違う。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>PF管</strong>: 自己消火性あり → <strong>露出・隠ぺい場所どちらもOK</strong></li>
          <li><strong>CD管</strong>: 自己消火性なし（オレンジ色）→ <strong>コンクリート埋設専用</strong></li>
          <li>20A分岐回路: 配線用遮断器なら<strong>1.6mm</strong>以上 / ヒューズなら<strong>2.0mm</strong>以上</li>
          <li>幹線の遮断器容量: 電動機分は<strong>定格 × 3</strong>＋他の負荷を加算（上限：幹線許容電流 × 2.5）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="B"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R05・R02・H29"
        tags={["屋内配線","PF管","CD管","分岐回路","電技解釈第156条・第170条〜第174条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="bunki">分岐回路の電線太さとコンセント定格（解釈第170条〜174条）</h2>
      <MemTable
        headers={["分岐回路","遮断器定格","電線の太さ","コンセント定格"]}
        rows={[
          ["15A 分岐回路",                 "15A",  "直径 1.6 mm 以上",          "15A 以下"],
          ["20A 分岐回路（配線用遮断器）", "20A",  "直径 1.6 mm 以上",          "20A 以下"],
          ["20A 分岐回路（ヒューズ）",     "20A",  "直径 2.0 mm 以上",          "20A"],
          ["30A 分岐回路",                 "30A",  "直径 2.6 mm 以上（5.5mm²）", "20〜30A"],
          ["40A 分岐回路",                 "40A",  "断面積 8 mm² 以上",         "30〜40A"],
          ["50A 分岐回路",                 "50A",  "断面積 14 mm² 以上",        "40〜50A"],
        ]}
        note="20Aは配線用遮断器（1.6mm）vs ヒューズ（2.0mm）で異なる。30A以上は断面積基準も併記"
      />

      <h2 id="kanro">配線方法の使用可否（解釈第156条）</h2>
      <MemTable
        headers={["工事種別","展開（露出）","点検可隠ぺい","点検不可隠ぺい"]}
        rows={[
          ["がいし引き工事",       "○",     "○",     "× 不可"],
          ["金属管工事",           "○",     "○",     "○"],
          ["合成樹脂管（PF管）",  "○",     "○",     "○"],
          ["合成樹脂管（CD管）",  "× 不可","× 不可","× コンクリート埋設のみ"],
          ["ケーブル工事（VVF等）","○",     "○",     "○"],
        ]}
        note="点検不可の隠ぺい場所で使えるのは『金属管・PF管・ケーブル』の3つのみ。CD管は埋設専用"
      />

      <h2 id="kansen">幹線の遮断器容量計算</h2>
      <ConclusionBox>
        <ul>
          <li><strong>原則</strong>: 幹線の許容電流以下</li>
          <li><strong>電動機 + 他の負荷</strong>: 電動機の定格電流の合計 <strong>I<sub>M</sub> × 3</strong>＋他の負荷の合計 I<sub>H</sub></li>
          <li><strong>上限</strong>: 幹線許容電流 × 2.5</li>
          <li>例: 電動機30A + その他10A → 30 × 3 + 10 = <strong>100A</strong></li>
        </ul>
      </ConclusionBox>

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "PF管とCD管はどちらも合成樹脂管なので同じ場所に使える", correct: "PF管=自己消火性あり（隠ぺいOK）、CD管=なし（コンクリート埋設専用）" },
        { wrong: "20A分岐回路の電線は一律 1.6 mm",                     correct: "配線用遮断器=1.6mm、ヒューズ=2.0mm（遮断器種別で異なる）" },
        { wrong: "がいし引き工事は点検不可の隠ぺい場所でも使える",     correct: "× 不可。点検不可の隠ぺい場所は金属管・PF管・ケーブルの3つのみ" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "PF管とCD管の決定的な違いは？",                a: "PF=自己消火性あり（隠ぺいOK） / CD=なし（コンクリート埋設専用）" },
        { q: "20A配線用遮断器の電線太さは？",               a: "直径 1.6 mm 以上" },
        { q: "20Aヒューズの電線太さは？",                   a: "直径 2.0 mm 以上" },
        { q: "電動機 30A・他の負荷 10A の幹線遮断器容量は？", a: "100A（30×3 + 10）" },
        { q: "点検不可の隠ぺい場所で使える工事は？",        a: "金属管・合成樹脂管(PF管)・ケーブルの3つのみ" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/haisen-koji/"
        label="denken-wiki「屋内配線工事」を開く"
        note="工事種別の構造詳細・施工条件・JIS規格は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "B・配線方法×場所マトリクスと分岐回路電線太さを集約" }]} />
      <PageNav
        prevId="densenro"   prevTitle="電線路（架空）"
        nextId="kako-denryu" nextTitle="過電流保護"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-19. KakoDenryuPage（過電流保護・漏電遮断器・B）
// ─────────────────────────────────────────────
function KakoDenryuPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="人体保護用の高感度・高速形漏電遮断器の感度電流と動作時間として正しいものはどれか"
        choices={["100 mA・0.1 秒","30 mA・0.1 秒","30 mA・1 秒","15 mA・0.5 秒"]}
        year="頻出"
        note="人体保護の基本数値。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li>過電流遮断器（30A以下）: <strong>1.25倍 → 60分以内</strong> / <strong>2倍 → 2分以内</strong></li>
          <li>過電流遮断器（50A超）: <strong>1.25倍 → 120分以内</strong>に時間が延びる（区分注意）</li>
          <li>漏電遮断器（人体保護）: <strong>30 mA・0.1 秒以内</strong>（高感度・高速形）</li>
          <li>ELB緩和: C種・D種接地で<strong>500Ω</strong>に緩和（接地工事と連動・ <strong>setsuchi-koji</strong> 参照）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="B"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R05・H28"
        tags={["過電流保護","漏電遮断器","電技解釈第33条・第36条・第37条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="ocb">過電流遮断器の動作時間（解釈第33条）</h2>
      <MemTable
        headers={["定格電流","1.25倍の動作時間","2倍の動作時間"]}
        rows={[
          ["30A 以下",         "60 分 以内", "2 分 以内"],
          ["30A超 〜 50A 以下", "60 分 以内", "4 分 以内"],
          ["50A 超",           "120 分 以内","6 分 以内"],
        ]}
        note="「1.25倍＝60分」は30A以下のみ。50A超は120分に延びる（区分を問う問題が多い）"
      />

      <h2 id="elb">漏電遮断器の種類と感度（解釈第37条）</h2>
      <MemTable
        headers={["分類","感度電流","動作時間","用途"]}
        rows={[
          ["高感度・高速形", "30 mA 以下", "0.1 秒 以内", "人体保護（一般回路）"],
          ["高感度・時延形", "30 mA 以下", "0.1〜2 秒",   "不要動作防止"],
          ["中感度",         "100 mA〜",   "—",            "工場大型機器・配電盤"],
        ]}
        note="人体保護の基本値は『30mA・0.1秒』。心室細動電流から逆算した安全閾値"
      />

      <h2 id="omit">漏電遮断器の省略条件（4つ全て満たす場合）</h2>
      <ConclusionBox>
        <ul>
          <li>機械器具を<strong>乾燥した場所</strong>に施設する場合</li>
          <li><strong>対地電圧 150V以下</strong>の機械器具を、簡易接触防護措置を施す場合</li>
          <li>機械器具に<strong>二重絶縁構造</strong>のものを施設する場合</li>
          <li>機械器具を<strong>絶縁変圧器</strong>に接続し、二次側電路を非接地とする場合</li>
        </ul>
      </ConclusionBox>

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "1.25倍の動作時間はすべて60分",                  correct: "50A超は120分に延びる（定格区分で異なる）" },
        { wrong: "漏電遮断器の動作は1秒",                          correct: "高感度・高速形は0.1秒以内（心室細動防止）" },
        { wrong: "過電流遮断器と漏電遮断器は同じもの",            correct: "過電流＝過負荷・短絡から保護／漏電＝地絡（漏電）から保護。守る対象が違う" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "20A遮断器が2倍過電流で動作する時間は？",       a: "2 分 以内（30A以下の区分）" },
        { q: "100A遮断器が1.25倍過電流で動作する時間は？",   a: "120 分 以内（50A超の区分）" },
        { q: "高感度・高速形漏電遮断器の感度・時間は？",     a: "30 mA 以下・0.1 秒 以内" },
        { q: "漏電遮断器を省略できる代表条件は？",           a: "二重絶縁構造、絶縁変圧器二次非接地、乾燥場所＋対地150V以下、等" },
        { q: "ELB緩和でC種・D種接地はいくらまで緩和？",      a: "500 Ω 以下（setsuchi-koji と連動）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/hogo-sochi/"
        label="denken-wiki「過電流保護・漏電遮断器」を開く"
        note="動作特性の物理的根拠（I²t特性・感度電流の選定根拠）は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "B・過電流遮断器の区分別動作時間と漏電遮断器の感度を集約" }]} />
      <PageNav
        prevId="okunai-haisen"    prevTitle="屋内配線"
        nextId="chichuu-densenro" nextTitle="地中電線路"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-20. ChichuuDensenroPage（地中電線路・埋設深さ・施設方式・B）
// ─────────────────────────────────────────────
function ChichuuDensenroPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="管路式で車両通行のない場所に地中電線を埋設する場合の最低埋設深さは？"
        choices={["1.2 m 以上","0.6 m 以上","0.3 m 以上","0.1 m 以上"]}
        year="頻出"
        note="施設方式と車両通行の有無の2軸で判断。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li>施設方式3つ: <strong>直接埋設式 / 管路式 / 暗渠式（洞道）</strong></li>
          <li><strong>埋設深さ</strong>は「車両通行の有無」×「施設方式」の2軸で決まる</li>
          <li>直接埋設・車両あり <strong>1.2m</strong> ／ 直接埋設・車両なし <strong>0.6m</strong></li>
          <li>管路式 <strong>0.3m</strong>（管が圧力に耐える構造であれば車両有無問わず）</li>
          <li><strong>離隔距離は電圧の組み合わせで決まる</strong>（施設方式ではない）：低-高 0.15m / 低・高-特高 0.3m</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="B"
        freq="2〜3年に1回"
        examType="A問題"
        targets="R05・R02・H28"
        tags={["地中電線路","埋設深さ","管路式","電技解釈第120条〜第125条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="depth">施設方式と埋設深さ（解釈第120〜125条）</h2>
      <MemTable
        headers={["施設方式","車両通行あり","車両通行なし","特徴"]}
        rows={[
          ["直接埋設式", "1.2 m 以上",                         "0.6 m 以上",                       "土の中に直接埋設・最安値・掘削で交換"],
          ["管路式",     "0.3 m 以上（管が圧力に耐える構造）","0.3 m 以上",                       "FEP管/ヒューム管に通す・交換容易"],
          ["暗渠式",     "—（共同溝・洞道）",                  "—",                                "人が中に入って点検可能・最高保護"],
        ]}
        note="管路式が浅くて済む（管による保護分）。直接埋設の車両なし0.6m vs 管路式の車両なし0.3mの差が頻出"
      />

      <h2 id="rikkaku">他物との離隔距離（電圧の組み合わせ）</h2>
      <MemTable
        headers={["組み合わせ","離隔距離"]}
        rows={[
          ["低圧 - 高圧 間",      "0.15 m 以上"],
          ["低圧/高圧 - 特別高圧","0.3 m 以上"],
          ["暗渠式内 地中電線相互","0.1 m 以上"],
        ]}
        note="離隔は『電圧の組み合わせ』で決まる（施設方式ではない）"
      />

      <h2 id="hyoji">表示と保護</h2>
      <ConclusionBox>
        <ul>
          <li>直接埋設式: <strong>標示シート</strong>（埋設物上部）＋ <strong>標柱</strong>（地表）の両方が原則</li>
          <li>直接埋設式: <strong>トラフ（保護板）</strong>で上から押し潰しを防ぐ</li>
          <li>暗渠式: 人が点検できる構造（地下道・共同溝・洞道）</li>
        </ul>
      </ConclusionBox>

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "埋設深さは電圧種別で決まる",          correct: "車両通行有無 × 施設方式の2軸で決まる（電圧は無関係）" },
        { wrong: "管路式は深さ自由",                    correct: "管が圧力に耐える構造でも最小0.3m必要" },
        { wrong: "離隔距離は施設方式で変わる",          correct: "電圧の組み合わせ（低-高 0.15m / 低・高-特高 0.3m）で決まる" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "直接埋設・車両あり場所の最低深さは？",     a: "1.2 m 以上" },
        { q: "管路式・車両あり場所の最低深さは？",       a: "0.3 m 以上（管が圧力に耐える場合）" },
        { q: "低圧と高圧の地中電線間の離隔距離は？",     a: "0.15 m 以上" },
        { q: "高圧と特別高圧の離隔距離は？",             a: "0.3 m 以上" },
        { q: "直接埋設式の表示方法は？",                 a: "標示シート（上部）＋標柱（地表）の両方" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/chichuu-densen/"
        label="denken-wiki「地中電線路」を開く"
        note="架空電線路との比較・施設方式選定の判断基準は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "B・施設方式×車両通行マトリクスと離隔距離を集約" }]} />
      <PageNav
        prevId="kako-denryu"       prevTitle="過電流保護"
        nextId="bunsangata-dengen" nextTitle="分散型電源連系"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-21. BunsangataDengenPage（分散型電源連系・保護装置マトリクス・B）
// ─────────────────────────────────────────────
function BunsangataDengenPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="低圧連系の系統連系設備で、単独運転検出方式について正しいものはどれか"
        choices={["受動的方式のみで可","能動的方式のみで可","受動的＋能動的の両方式が必要","検出方式は不要"]}
        year="頻出"
        note="低圧でも『両方必要』が条文の規定。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li>低圧連系（600V以下）でも<strong>受動的＋能動的の両方式</strong>が必要（解釈第227条）</li>
          <li>低圧連系: <strong>OCR・OVGR・転送遮断 すべて不要</strong>（PCS内蔵）</li>
          <li>高圧連系: 上記＋ <strong>OCR（過電流リレー）＋OVGR（地絡過電圧リレー）</strong></li>
          <li>特別高圧連系: 上記＋ <strong>転送遮断装置</strong></li>
          <li><strong>RPR（逆電力リレー）</strong>は<strong>逆潮流「なし」</strong>の場合に必要（直感と逆）</li>
          <li>力率: <strong>遅れ力率 85% 以上</strong>を維持（充電側）</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="B"
        freq="高頻度"
        examType="A問題"
        targets="R06・R04・R02"
        tags={["分散型電源","系統連系","保護装置","電技解釈第220条〜第231条"]}
        lastChecked="2026-05-08"
      />

      <h2 id="matrix">電圧レベル別 保護装置要件マトリクス</h2>
      <MemTable
        headers={["保護装置","低圧連系","高圧連系","特別高圧連系"]}
        rows={[
          ["単独運転検出（受動＋能動）", "○ 必要", "○ 必要", "○ 必要"],
          ["逆電力リレー（RPR）",       "○ 逆潮流なし時", "○ 逆潮流なし時", "○ 逆潮流なし時"],
          ["過電流リレー（OCR）",       "× 不要", "○ 必要", "○ 必要"],
          ["地絡過電圧リレー（OVGR）",  "× 不要", "○ 必要", "○ 必要"],
          ["転送遮断装置",              "× 不要", "× 不要", "○ 必要"],
        ]}
        note="低圧→高圧→特高の順に保護装置が階段的に追加される。低圧連系のOVGR・OCR不要は頻出ひっかけ"
      />

      <h2 id="rpr">逆潮流とRPRの関係</h2>
      <ConclusionBox>
        <ul>
          <li>逆潮流「<strong>あり</strong>」（売電OK）→ <strong>RPR不要</strong></li>
          <li>逆潮流「<strong>なし</strong>」（売電不可・自家消費のみ）→ <strong>RPR必要</strong>（逆潮を防ぐ）</li>
          <li>「逆潮流があるからRPR必要」は誤り。RPRは「逆潮流を防ぎたい」ときに使う</li>
        </ul>
      </ConclusionBox>

      <h2 id="quality">電力品質要件</h2>
      <MemTable
        headers={["項目","基準値"]}
        rows={[
          ["力率",       "遅れ力率 85% 以上（充電側）"],
          ["電圧変化",   "±2% 以内（連系点・JEAC 9701）"],
          ["低圧供給電圧維持", "101 ± 6 V / 202 ± 20 V（電気事業法施行規則）"],
        ]}
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "低圧連系では能動的方式は不要",          correct: "解釈第227条で『受動・能動それぞれ1方式以上』と明記" },
        { wrong: "逆潮流があるならRPRが必要",              correct: "逆潮流『なし』の場合に必要（防止のため）。直感と逆" },
        { wrong: "低圧連系でもOVGR・OCRが必要",          correct: "低圧はPCS内蔵で不要。高圧から必要" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "低圧連系で必須の単独運転検出方式は？",     a: "受動的＋能動的の両方式（解釈第227条）" },
        { q: "高圧連系で追加される保護装置は？",          a: "OCR（過電流リレー）＋OVGR（地絡過電圧リレー）" },
        { q: "特別高圧連系で追加される保護装置は？",      a: "転送遮断装置" },
        { q: "RPRが必要なのはどんな場合？",               a: "逆潮流『なし』の場合（売電不可・自家消費のみ）" },
        { q: "分散型電源の力率要件は？",                  a: "遅れ力率 85% 以上（充電側）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/bunsan-dengen/"
        label="denken-wiki「分散型電源連系」を開く"
        note="単独運転防止の物理原理・JEAC9701系統連系規程の詳細は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "B・電圧レベル別保護装置マトリクスを集約。再エネ連系の基本" }]} />
      <PageNav
        prevId="chichuu-densenro"     prevTitle="地中電線路"
        nextId="gijutsu-kijun-gaiyou" nextTitle="電気設備技術基準の概要"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-22. GijutsuKijunGaiyouPage（電気設備技術基準の概要・章立て・索引型）
// ─────────────────────────────────────────────
function GijutsuKijunGaiyouPage({ onNav, data }) {
  const ChapterTable = ({ rows }) => (
    <table className="meta-strip-table" style={{ width: '100%', marginBottom: 16 }}>
      <thead>
        <tr>
          <th style={{ padding: '8px 12px', background: 'var(--bg-2)', textAlign: 'left', fontSize: 12, borderBottom: '1px solid var(--line)' }}>章 / 節</th>
          <th style={{ padding: '8px 12px', background: 'var(--bg-2)', textAlign: 'left', fontSize: 12, borderBottom: '1px solid var(--line)' }}>主要条文</th>
          <th style={{ padding: '8px 12px', background: 'var(--bg-2)', textAlign: 'left', fontSize: 12, borderBottom: '1px solid var(--line)' }}>hoki-wiki 内対応ページ</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)' }}>{r[0]}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', fontSize: 13 }}>{r[1]}</td>
            <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)' }}>
              {r[2] ? (
                <button
                  onClick={() => onNav(r[2])}
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', padding: 0, fontSize: 13, textDecoration: 'underline' }}
                >{r[3]} →</button>
              ) : <span style={{ color: 'var(--ink-3)', fontSize: 13 }}>—</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <ConclusionBox>
        <ul>
          <li>電技省令（電気設備に関する技術基準を定める省令）は<strong>全78条＋付則</strong></li>
          <li>第1章 <strong>総則</strong>（第1〜4条）= 保安原則 → <strong>hoan-kitei</strong> 参照</li>
          <li>第2章 <strong>電気の供給のための電気設備の施設</strong>（第5条〜）= 絶縁・接地・電線路</li>
          <li>第3章 <strong>電気使用場所の施設</strong>（第56条〜）= 屋内配線・特殊場所</li>
          <li>解釈は告示（電気設備の技術基準の解釈）で具体数値が示される</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH03"
        category="03 技術基準"
        importance="B"
        freq="低頻度（索引）"
        examType="—（ナビゲーション）"
        targets="—"
        tags={["電技省令","章立て","索引","電気事業法施行規則"]}
        lastChecked="2026-05-08"
      />

      <h2 id="ch1">第1章 総則（保安原則）</h2>
      <ChapterTable rows={[
        ["第1条 危害防止",         "人体・物件への危害防止",                          "hoan-kitei",       "保安規程・保安原則"],
        ["第2条 電路の絶縁",       "大地から絶縁（構造上やむを得ない場合は例外）",    "hoan-kitei",       "保安規程・保安原則"],
        ["第3条 電気機械器具",     "熱・爆発・火災防止",                              "hoan-kitei",       "保安規程・保安原則"],
        ["第4条 他への損傷防止",   "他の電気工作物・植物・電線路に損傷を与えない",    "hoan-kitei",       "保安規程・保安原則"],
      ]} />

      <h2 id="ch2">第2章 電気の供給のための電気設備の施設</h2>
      <ChapterTable rows={[
        ["第5条〜第14条 絶縁性能", "絶縁抵抗値・絶縁耐力試験",                        "denro-zetsuen",    "電路の絶縁"],
        ["第14条 絶縁抵抗値",       "0.1 / 0.2 / 0.4 MΩ（解釈第14条）",                "denro-zetsuen",    "電路の絶縁"],
        ["第15条 絶縁耐力試験",     "1.5倍 / 1.25倍 ×10分",                            "zetsuen-ichiran",  "絶縁耐力試験一覧"],
        ["第17〜19条 接地工事",     "A/B/C/D種接地",                                   "setsuchi-ichiran", "接地工事一覧"],
        ["第20条〜 電線路",         "架空電線路・地中電線路",                          "densenro",         "電線路（架空）"],
        ["第49条・第58条 架空",     "高さ規定・風圧荷重",                              "densenro",         "電線路（架空）"],
        ["第120〜125条 地中",       "埋設深さ・施設方式",                              "chichuu-densenro", "地中電線路"],
        ["第220〜231条 分散型電源", "系統連系・保護装置",                              "bunsangata-dengen","分散型電源連系"],
      ]} />

      <h2 id="ch3">第3章 電気使用場所の施設</h2>
      <ChapterTable rows={[
        ["第56条〜 一般原則",     "感電・火災防止",                                  "okunai-haisen",    "屋内配線"],
        ["第156条 配線方法",       "施設場所×工事種類のマトリクス",                   "okunai-haisen",    "屋内配線"],
        ["第170〜174条 分岐回路", "電線太さ・コンセント定格",                        "okunai-haisen",    "屋内配線"],
        ["第33条 過電流保護",     "過電流遮断器（1.25倍/2倍）",                      "kako-denryu",      "過電流保護"],
        ["第36条・第37条 漏電",   "漏電遮断器（30mA・0.1秒）",                       "kako-denryu",      "過電流保護"],
      ]} />

      <h2 id="hierarchy">法令階層の構造</h2>
      <ConclusionBox>
        <ul>
          <li><strong>電気事業法</strong>（法律）→ 第39条「保安義務」</li>
          <li><strong>電気事業法施行令</strong>（政令）→ 一般用/事業用の区分など</li>
          <li><strong>電気事業法施行規則</strong>（経済産業省令）→ 主任技術者選任・保安規程</li>
          <li><strong>電気設備技術基準</strong>（経済産業省令）→ 第1〜78条（本テーマ）</li>
          <li><strong>電気設備技術基準の解釈</strong>（告示）→ 具体数値（0.1MΩ等）</li>
        </ul>
      </ConclusionBox>

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/hoan-gensoku/"
        label="denken-wiki「電気設備技術基準の保安原則」を開く"
        note="電技省令の各条文・解釈の詳細解説は denken-wiki が SOT。本ページは索引・章立てのみ。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→章立て索引型ページに昇格", reason: "電技省令の構造を可視化し各暗記Hubページへ誘導" }]} />
      <PageNav
        prevId="bunsangata-dengen" prevTitle="分散型電源連系"
        nextId="kosakubutsu-bunrui" nextTitle="電気工作物の区分"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-23. JuyoritsuGainenPage（需要率・負荷率・不等率の概念・A）
// ─────────────────────────────────────────────
function JuyoritsuGainenPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="不等率は必ず1以上になる。その理由として正しいものはどれか"
        choices={[
          "各需要家の最大電力が同時に重なることはないため",
          "合成最大需要電力が常に各最大の合計を超えるため",
          "需要率の定義から導かれる",
          "電気事業法で1以上と定められているため"
        ]}
        year="頻出"
        note="「分母と分子の関係」で覚える。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>需要率</strong> = 最大需要電力 ÷ 設備容量　→ 「どれだけ使うか」</li>
          <li><strong>負荷率</strong> = 平均需要電力 ÷ 最大需要電力　→ 「ムラなく使うか」</li>
          <li><strong>不等率</strong> = 各最大の合計 ÷ 合成最大需要電力　→ 「バラバラに使うか」</li>
          <li>需要率・負荷率は<strong>1以下</strong>、不等率は<strong>必ず1以上</strong></li>
          <li>すべて<strong>無次元（kW/kW）</strong>。ただし全日効率は kWh/kWh で別概念</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH06"
        category="06 施設管理"
        importance="A"
        freq="頻出"
        examType="A問題（概念）・B問題（計算）"
        targets="R05・R03・R02・H26"
        tags={["需要率","負荷率","不等率","概念","施設管理"]}
        lastChecked="2026-05-08"
      />

      <h2 id="formulas">3つの率の定義と公式</h2>
      <MemTable
        headers={["率","公式（分子 / 分母）","意味","範囲"]}
        rows={[
          ["需要率", "最大需要電力 / 設備容量",                "設備をどれだけ使ったか", "0 〜 1（0〜100%）"],
          ["負荷率", "平均需要電力 / 最大需要電力",            "電力をムラなく使ったか", "0 〜 1（0〜100%）"],
          ["不等率", "各需要家の最大の合計 / 合成最大需要電力","ピークがどれだけ分散したか","必ず 1 以上"],
        ]}
        note="「分母」を覚えれば公式は復元できる。需要率の分母=設備容量、負荷率の分母=最大需要、不等率の分母=合成最大需要"
      />

      <h2 id="story">日常イメージで覚える</h2>
      <MemTable
        headers={["率","高い場合","低い場合"]}
        rows={[
          ["需要率", "設備をフル稼働している（電気をたくさん使う）", "設備に余裕がある（あまり使わない）"],
          ["負荷率", "コンビニ（24時間ほぼ同じ消費 0.8〜0.9）",       "レストラン（昼夜ピーク・夜閑散 0.3〜0.4）"],
          ["不等率", "工場ごとのピークがバラバラ → 設備を小さくできる","ピークが集中 → 設備容量を大きくする必要"],
        ]}
        note="電力会社目線では『負荷率高・不等率高』が理想（設備効率が良い）"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "不等率が大きいと効率が悪い",        correct: "逆。不等率が大きい＝ピーク分散＝設備を効率よく使える" },
        { wrong: "需要率は1以上になることがある",    correct: "1以下（最大需要電力 ≤ 設備容量）" },
        { wrong: "3つの率はすべて kWh の単位を持つ", correct: "3つとも無次元（kW/kW）。kWh は全日効率（別概念）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "需要率の分母は？",                   a: "設備容量（負荷の定格電力の合計）" },
        { q: "負荷率の分母は？",                   a: "最大需要電力" },
        { q: "不等率の分母は？",                   a: "合成最大需要電力（同時最大値）" },
        { q: "不等率が必ず1以上になる理由は？",     a: "各需要家の最大が同時に重なることはないため、各最大の合計≧合成最大が成立" },
        { q: "コンビニの負荷率はどのくらい？",      a: "0.8〜0.9（24時間ほぼ均一に消費）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/juyoritsu-fukaritsu/"
        label="denken-wiki「需要率・負荷率・不等率」を開く"
        note="3率の物理的意味・経済性指標としての役割は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "A・概念ページ。計算ページ（juyoritsu-keisan）と棲み分け" }]} />
      <PageNav
        prevId="demand-kanri"      prevTitle="デマンド制御"
        nextId="juyoritsu-keisan"  nextTitle="需要率・負荷率・不等率（計算）"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-24. JuyoritsuKeisanPage（需要率・負荷率・不等率の計算・S）
// ─────────────────────────────────────────────
function JuyoritsuKeisanPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="設備容量500kW、需要率0.8、不等率1.25、力率0.9のとき、必要な変圧器容量[kVA]は約いくらか"
        choices={["約 200 kVA","約 280 kVA","約 356 kVA","約 444 kVA"]}
        year="頻出"
        note="変圧器容量 [kVA] = 設備容量 × 需要率 ÷ (不等率 × 力率)。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li>3公式は「<strong>juyoritsu-gainen</strong>」で確認（概念と棲み分け）</li>
          <li><strong>変圧器容量 [kVA] = 設備容量 × 需要率 ÷ (不等率 × 力率)</strong></li>
          <li>計算後は<strong>標準サイズ</strong>から選定（例：356kVA → 400kVA）</li>
          <li>合算需要率 = 各最大の合計 / 各設備容量の合計</li>
          <li>総合負荷率 = 各電力量[kWh]の合計 ÷ 24h ÷ 合成最大需要電力</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH04"
        category="01 B問題対策"
        importance="S"
        freq="毎年（B問題）"
        examType="B問題（計算）"
        targets="R05上・R04上・R03・H26"
        tags={["計算問題","需要率","変圧器容量","B問題","施設管理"]}
        lastChecked="2026-05-08"
      />

      <h2 id="patterns">出題パターン3種</h2>
      <MemTable
        headers={["パターン","問われ方","解法の核心"]}
        rows={[
          ["①基本",       "需要率・不等率・負荷率を直接計算",         "公式に代入。需要率・負荷率は1以下、不等率は1以上の検算"],
          ["②変圧器容量","設備容量+需要率+不等率+力率→kVA",        "kVA = 設備容量 × 需要率 ÷ (不等率 × 力率)。標準サイズ選定"],
          ["③2工場合算", "2つの工場の合算需要率・総合負荷率",        "分子は各工場の合計、分母は合成最大需要電力"],
        ]}
        note="R05上は③（2工場合算）。R04上は②（変圧器容量）。R08は①または②が有力"
      />

      <h2 id="pat1">パターン①: 基本計算</h2>
      <ConclusionBox>
        <ul>
          <li>例：A工場 設備容量400kW・最大需要280kW・1日電力量3,360kWh → 需要率 = 280/400 = <strong>0.7</strong>、負荷率 = (3,360/24) / 280 = <strong>0.5</strong></li>
          <li>2工場合計の不等率：(280 + 240) / 400 = <strong>1.3</strong>（1以上で OK）</li>
          <li><strong>検算</strong>: 不等率 &gt;1、需要率・負荷率 ≤ 1 を必ず確認</li>
        </ul>
      </ConclusionBox>

      <h2 id="pat2">パターン②: 変圧器容量算定</h2>
      <ConclusionBox>
        <ul>
          <li>公式：<strong>変圧器容量 [kVA] = 設備容量 × 需要率 ÷ (不等率 × 力率)</strong></li>
          <li>例：500 × 0.8 ÷ (1.25 × 0.9) = 400 ÷ 1.125 ≈ <strong>356 kVA</strong></li>
          <li>標準サイズから選定（300・400・500・630・750 kVA等）→ <strong>400 kVA</strong> 選定</li>
          <li>注意：変圧器容量の単位は <strong>kVA</strong>（皮相電力）。kW を力率で割って変換</li>
        </ul>
      </ConclusionBox>

      <h2 id="pat3">パターン③: 2工場合算</h2>
      <ConclusionBox>
        <ul>
          <li><strong>合算需要率</strong> = (各工場の最大需要の合計) ÷ (各工場の設備容量の合計)</li>
          <li><strong>総合負荷率</strong> = (各工場の電力量[kWh]の合計 ÷ 24h) ÷ <strong>合成最大需要電力</strong></li>
          <li>注意：総合負荷率の分母は<strong>合成最大需要電力</strong>（各最大の合計ではない）</li>
        </ul>
      </ConclusionBox>

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "変圧器容量を kW で答える",                       correct: "kVA で答える（皮相電力。kW÷力率）" },
        { wrong: "総合負荷率の分母に各最大の合計を使う",          correct: "分母は『合成最大需要電力』（同時最大）" },
        { wrong: "計算結果のままを答える（355.55... kVA）",        correct: "標準サイズから次のサイズを選定（400kVA等）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "変圧器容量の公式は？",                              a: "kVA = 設備容量 × 需要率 ÷ (不等率 × 力率)" },
        { q: "設備500kW・需要率0.8・不等率1.25・力率0.9 の容量は？", a: "約 356 kVA → 標準400kVA を選定" },
        { q: "総合負荷率の分母は？",                              a: "合成最大需要電力（同時最大）" },
        { q: "不等率の検算ポイントは？",                          a: "必ず1以上（合致しなければ計算ミス）" },
        { q: "kW と kVA の変換は？",                              a: "kW ÷ 力率 = kVA（力率0.9なら kVA = kW/0.9）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/juyoritsu-fukaritsu/"
        label="denken-wiki「需要率・負荷率・不等率」を開く"
        note="計算式の物理的根拠・過去問解説詳細は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→計算問題Hubページに昇格", reason: "S・B問題max級。3パターンを集約・twin概念ページと棲み分け" }]} />
      <PageNav
        prevId="juyoritsu-gainen" prevTitle="需要率・負荷率・不等率（概念）"
        nextId="bshu-setsuchi"     nextTitle="B種接地工事計算"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-25. FuritsuPage（負荷率特化・経済性指標・A）
// ─────────────────────────────────────────────
function FuritsuPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="ある工場の最大需要電力500kW、1日の使用電力量6,000kWhのとき、1日の負荷率はいくらか"
        choices={["0.3（30%）","0.4（40%）","0.5（50%）","0.6（60%）"]}
        year="頻出"
        note="平均電力 = 1日電力量 ÷ 24h、負荷率 = 平均/最大。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>負荷率</strong> = 平均需要電力 ÷ 最大需要電力</li>
          <li><strong>平均需要電力 = 一定期間の電力量[kWh] ÷ 期間時間[h]</strong>（1日なら ÷24h）</li>
          <li>負荷率は<strong>0〜1</strong>（高いほど電力をムラなく使用＝経済的）</li>
          <li>電力会社にとって<strong>負荷率が高い顧客が望ましい</strong>（設備を効率よく使える）</li>
          <li>需要率・不等率と混同しないよう「分母=最大需要電力」を確実に</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH06"
        category="06 施設管理"
        importance="A"
        freq="頻出"
        examType="A問題・B問題"
        targets="R05・H28・H26"
        tags={["負荷率","経済性指標","施設管理","計算"]}
        lastChecked="2026-05-08"
      />

      <h2 id="formula">負荷率の公式（期間別）</h2>
      <MemTable
        headers={["期間","公式","典型値"]}
        rows={[
          ["日負荷率",  "（1日の電力量[kWh]÷24h）÷ 1日の最大需要電力", "0.4〜0.6（一般工場）"],
          ["月負荷率",  "（1か月の電力量[kWh]÷月の時間）÷ 月の最大需要電力", "0.5〜0.7"],
          ["年負荷率",  "（年間電力量[kWh]÷8760h）÷ 年最大需要電力",   "0.5〜0.65（電力会社全体）"],
        ]}
        note="期間によって平均電力の計算方法が変わる。期間の総時間で電力量を割る"
      />

      <h2 id="economic">負荷率と経済性</h2>
      <MemTable
        headers={["業種","負荷率","理由"]}
        rows={[
          ["コンビニエンスストア",  "0.8〜0.9", "24時間営業で消費が均一"],
          ["連続操業工場",          "0.7〜0.8", "3交代制で稼働時間が長い"],
          ["一般オフィスビル",      "0.4〜0.5", "業務時間（8〜18時）に集中"],
          ["レストラン",            "0.3〜0.4", "ランチ・ディナーのピーク集中"],
          ["電力会社全体（年）",    "0.55〜0.65","産業・家庭・商業の合算"],
        ]}
        note="高負荷率＝設備を効率よく使えている＝電力会社にとって優良顧客"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "負荷率の分母は設備容量",                  correct: "分母は『最大需要電力』（設備容量は需要率の分母）" },
        { wrong: "負荷率は1以上にもなる",                   correct: "0〜1（平均 ≤ 最大なので必ず1以下）" },
        { wrong: "負荷率を高めるには設備を増やす",          correct: "負荷率は使い方の指標。設備を増やしても変わらない（平均利用を増やすのが正解）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "負荷率の公式は？",                       a: "平均需要電力 ÷ 最大需要電力" },
        { q: "1日の電力量6,000kWh・最大500kWの日負荷率は？", a: "(6000÷24)÷500 = 250÷500 = 0.5（50%）" },
        { q: "コンビニの典型的な負荷率は？",            a: "0.8〜0.9（24時間均一消費）" },
        { q: "電力会社にとって望ましい顧客は？",        a: "高負荷率（設備効率がよい）" },
        { q: "年負荷率の分母の時間数は？",              a: "8760 h（24×365）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/juyoritsu-fukaritsu/"
        label="denken-wiki「需要率・負荷率・不等率」を開く"
        note="負荷率の経済学的意義・電力料金体系との関係は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "A・負荷率特化。期間別公式と業種別典型値を集約" }]} />
      <PageNav
        prevId="juyoritsu-keisan" prevTitle="需要率・負荷率・不等率（計算）"
        nextId="futorito"          nextTitle="不等率"
        onNav={onNav}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 5-26. HensyatsukiYoryoPage（変圧器容量算定・A）
// ─────────────────────────────────────────────
function HensyatsukiYoryoPage({ onNav, data }) {
  return (
    <div>
      <GoalQuestion
        question="設備容量1,000kW、需要率0.6、不等率1.2、力率0.95の事業所に必要な変圧器容量[kVA]は約いくらか"
        choices={["約 526 kVA","約 600 kVA","約 720 kVA","約 1,000 kVA"]}
        year="頻出"
        note="変圧器容量 [kVA] = 設備容量 × 需要率 ÷ (不等率 × 力率)。読み終えたら戻って解こう"
      />

      <ConclusionBox>
        <ul>
          <li><strong>変圧器容量 [kVA] = 設備容量 [kW] × 需要率 ÷ (不等率 × 力率)</strong></li>
          <li>単位は<strong>kVA（皮相電力）</strong>。kW÷力率で変換</li>
          <li>計算結果から<strong>標準サイズ（kVA）</strong>を選定（次のサイズを選ぶ）</li>
          <li>標準容量例：50・75・100・150・200・300・500・750・1000 kVA</li>
          <li>選定後は<strong>余裕率（10〜30%）</strong>を考慮するケースもある</li>
        </ul>
      </ConclusionBox>

      <MetaStrip
        ch="CH06"
        category="06 施設管理"
        importance="A"
        freq="頻出"
        examType="B問題（計算）"
        targets="R04上・H29・H25"
        tags={["変圧器容量","kVA","計算","施設管理"]}
        lastChecked="2026-05-08"
      />

      <h2 id="formula">基本公式</h2>
      <ConclusionBox>
        <ul>
          <li>変圧器容量 P[kVA] = 設備容量 ÷ 不等率 × 需要率 ÷ 力率</li>
          <li>= <strong>設備容量 × 需要率 / (不等率 × 力率)</strong></li>
          <li>力率を含まない場合（力率1とみなす）：P[kVA] = 設備容量 × 需要率 / 不等率</li>
        </ul>
      </ConclusionBox>

      <h2 id="example">計算例</h2>
      <MemTable
        headers={["条件","計算","結果"]}
        rows={[
          ["設備500kW・需要0.8・不等1.25・力率0.9", "500 × 0.8 ÷ (1.25 × 0.9) = 400/1.125", "≈ 356 kVA → 400 kVA選定"],
          ["設備1000kW・需要0.6・不等1.2・力率0.95", "1000 × 0.6 ÷ (1.2 × 0.95) = 600/1.14",  "≈ 526 kVA → 750 kVA選定"],
          ["設備300kW・需要0.7・不等1.1・力率1.0",   "300 × 0.7 ÷ (1.1 × 1.0) = 210/1.1",     "≈ 191 kVA → 200 kVA選定"],
        ]}
        note="計算結果をそのまま答える問題と、標準サイズを選定する問題の両方が出題される"
      />

      <h2 id="standard">標準容量（JIS C 4304など）</h2>
      <MemTable
        headers={["低圧変圧器（典型）","高圧変圧器（典型）"]}
        rows={[
          ["3, 5, 7.5, 10, 15, 20 kVA",  "50, 75, 100, 150, 200 kVA"],
          ["30, 50, 75, 100 kVA",         "300, 500, 750, 1000 kVA"],
          ["—",                           "1500, 2000, 3000 kVA"],
        ]}
        note="計算結果より大きい次の標準サイズを選定するのが原則"
      />

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "変圧器容量を kW で答える",              correct: "kVA で答える（皮相電力）。kW÷力率＝kVA" },
        { wrong: "計算結果（356.5kVA等）をそのまま答える", correct: "標準サイズから次のサイズ（400kVA）を選定" },
        { wrong: "力率を分子に置く（×力率）",              correct: "力率は分母（÷力率）。kW→kVA変換は割り算" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "変圧器容量の公式は？",                       a: "kVA = 設備容量 × 需要率 ÷ (不等率 × 力率)" },
        { q: "力率0.9のとき kW を kVA に変換すると？",     a: "kVA = kW ÷ 0.9（力率は分母）" },
        { q: "計算結果526kVA、標準サイズなら何選ぶ？",     a: "750 kVA（次のサイズ）" },
        { q: "変圧器容量の単位は？",                       a: "kVA（皮相電力）" },
        { q: "需要率0.7・不等率1.0なら？",                  a: "kVA = 設備容量 × 0.7 ÷ 力率（不等率1で個別需要のみ）" },
      ]} />

      <DenkenWikiCTA
        url="https://kfurufuru.github.io/denken-wiki/themes/juyoritsu-fukaritsu/"
        label="denken-wiki「需要率・負荷率・不等率」を開く"
        note="変圧器選定の物理的意味・力率改善コンデンサとの関係は denken-wiki が SOT。"
      />

      <UpdateLog entries={[{ date: "2026-05-08", content: "スタブ→暗記Hubページに昇格", reason: "A・変圧器容量算定の計算問題対策。標準サイズ選定込み" }]} />
      <PageNav
        prevId="haiden-kanri"      prevTitle="配電管理"
        nextId="juden-setsubi-kanri" nextTitle="受電設備管理"
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

// ─────────────────────────────────────────────
// 4-4. HogoKyochoDgrPage（保護協調・地絡方向継電器・1.10）
// ─────────────────────────────────────────────
function HogoKyochoDgrPage({ onNav, data }) {
  return (
    <div>
      <DirectCheckMode
        pageId="hogokyo-dgr"
        formula="t主 ≥ t下位 + Δt（協調マージン ≥ 0.3s）"
        formulaVars={[
          { sym: "t主", desc: "主保護（上位CB）の動作時間 [s]" },
          { sym: "t下位", desc: "フィーダー保護の動作時間 [s]" },
          { sym: "Δt", desc: "協調マージン（通常 ≥ 0.3s）" },
          { sym: "DGR", desc: "地絡方向継電器（大きさ＋方向で判定）" },
          { sym: "GR", desc: "地絡継電器（大きさのみ判定）" },
        ]}
        warningRed="GRとDGRの違い：GRは「大きさのみ」→全フィーダー動作、DGRは「方向＋大きさ」→故障フィーダーのみ選択遮断できる！"
        trapsTop3={[
          "GRとDGRの混同（選択遮断にはDGR必須、GRでは不可）",
          "協調マージンの方向：主（上位）の動作時間 ＞ フィーダー（下位）＋ Δt",
          "グラフY軸は動作時間（s）、X軸は電流倍数 — 上側の曲線が上位保護（主）",
        ]}
        jumps={[
          { id: "exam-r05", label: "過去問へ →", primary: true },
          { id: "quick-review", label: "1分復習 →" },
          { id: "traps", label: "ひっかけ全項目 →" },
        ]}
      />

      <GoalQuestion
        question="6.6kV高圧配電系統で複数フィーダーを持つ受電設備において、フィーダーに地絡故障が発生した際に「故障フィーダーのみ選択遮断する」ために各フィーダー遮断器に設置すべき継電器として最も適切なものはどれか。"
        choices={[
          "OCR（過電流継電器）：大電流を検出して動作する",
          "GR（地絡継電器）：零相電流の大きさで地絡を検出する",
          "DGR（地絡方向継電器）：零相電流の大きさと方向を組み合わせて地絡を検出する",
          "UVR（不足電圧継電器）：電圧低下を検出して動作する",
        ]}
        year="R5下期 問13類題"
        note="ヒント：「選択遮断」がキーワード。どの継電器が地絡フィーダーを他と区別できるか？"
      />

      <ConclusionBox>
        <ul>
          <li><strong>保護協調の目的</strong>：故障箇所に最も近い遮断器のみを動作させ、健全部分への影響を最小化する（選択遮断）</li>
          <li><strong>GR vs DGR</strong>：GRは零相電流の「大きさ」のみ→全フィーダー同時動作。DGRは「大きさ＋方向」→故障フィーダーのみ動作</li>
          <li><strong>OCR協調</strong>：フィーダーOCR動作時間 ＋ 協調マージン（≥0.3s）≤ 主OCR動作時間を確認</li>
          <li><strong>グラフ読取</strong>：特性曲線上でt_主 − t_フィーダー ≥ 協調マージン かどうかを計算する</li>
        </ul>
      </ConclusionBox>

      <MinShortcutCard
        steps={[
          <span><strong>系統図確認</strong>：主CB（上位）とフィーダーCB（下位）の関係、地絡点の場所を把握する</span>,
          <span><strong>継電器選択</strong>：フィーダーが複数 → 方向を識別できるDGRが必要（GRでは全フィーダーが動作）</span>,
          <span><strong>グラフ読取</strong>：X軸の電流値から各曲線の動作時間を読み取る（対数スケールに注意）</span>,
          <span><strong>協調確認</strong>：t_主 − t_フィーダー ≥ 協調マージン（問題指定値、なければ0.3s）</span>,
          <span><strong>ひっかけ警戒</strong>：GRで選択遮断は不可 / グラフ上側の曲線が上位保護（主・動作が遅い）</span>,
        ]}
        hint="R5下問13(a)はフィーダー継電器の選択、(b)は特性グラフから協調マージンを確認"
      />

      <MetaStrip
        ch="CH04"
        category="01 B問題・計算問題対策"
        importance="A"
        freq="high"
        examType="B問題"
        targets="R5下期 問13"
        tags={["保護協調", "DGR", "地絡方向継電器", "OCR", "過電流継電器", "GR", "選択遮断", "協調マージン"]}
        lastChecked="2026-05-07"
      />

      <h2 id="exam-focus">3. 試験で問われること</h2>
      <ExamFocus items={[
        { label: "主体",   value: "6.6kV高圧配電系統の地絡保護・過電流保護の協調（複数フィーダー構成）" },
        { label: "対象",   value: "GR / DGR の使い分け、OCR特性曲線の読み取りと協調マージン確認" },
        { label: "条件",   value: "フィーダー保護が上位保護より先に動作（t_フィーダー ＋ Δt ≤ t_主）" },
        { label: "読取",   value: "特性曲線（Y: 動作時間、X: 電流倍数または零相電流）からtを読み取り差を計算" },
        { label: "応用",   value: "DGRが選択遮断できる理由 / GRでは選択遮断できない理由" },
        { label: "出典",   value: "R5下 問13：過電流・地絡の2種類の特性グラフが登場するB問題" },
      ]} />

      <h2 id="abbrev">4. 略号と役割</h2>
      <MemTable
        headers={["略号", "正式名称", "検出対象", "方向性"]}
        rows={[
          ["OCR", "過電流継電器 (Over Current Relay)", "過電流（短絡・過負荷による大電流）", "なし"],
          ["GR", "地絡継電器 (Ground Relay)", "地絡電流の大きさ（零相電流I₀）", "なし"],
          ["DGR", "地絡方向継電器 (Directional Ground Relay)", "地絡電流の大きさ＋方向（I₀とV₀の位相）", <strong style={{color:'var(--accent)'}}>あり</strong>],
          ["ZCT", "零相変流器 (Zero-phase Current Transformer)", "零相電流3I₀の検出器（継電器ではない）", "—"],
          ["ZPD", "零相電圧検出装置 (Zero-phase voltage detector)", "零相電圧V₀の検出器（DGRの方向判定に使用）", "—"],
          ["CB", "遮断器 (Circuit Breaker)", "異常時に回路を遮断する開閉装置", "—"],
        ]}
        note="DGRはZCT（電流）とZPD（電圧）の両方を使って「方向」まで判定できる"
      />

      <div style={{borderLeft: '3px solid var(--warn)', paddingLeft: 14, marginBottom: 24, fontSize: 13, color: 'var(--ink-2)'}}>
        <strong>前提条件</strong>：以下の解説は「中性点非接地方式（6.6kV高圧配電）」を前提としています。接地方式が異なると地絡電流の大きさや方向の意味が変わります（→ 1.8 中性点非接地系の地絡電流 参照）。
      </div>

      <h2 id="comparison">5. GR と DGR の比較</h2>
      <MemTable
        headers={["比較項目", "GR（地絡継電器）", "DGR（地絡方向継電器）"]}
        rows={[
          ["検出量", "零相電流I₀の大きさのみ", "I₀の大きさ ＋ V₀との位相角（方向）"],
          ["動作条件", "I₀ ≥ 整定値", "I₀ ≥ 整定値 かつ 方向が整定範囲内"],
          ["使用場所", "主受電点・単一フィーダー系統", "フィーダーが複数ある系統の各フィーダー"],
          ["選択遮断", <span style={{color:'#c33',fontWeight:700}}>不可（全フィーダーのGRが動作）</span>, <span style={{color:'var(--accent)',fontWeight:700}}>可（自フィーダー方向の地絡のみ動作）</span>],
          ["必要センサ", "ZCTのみ", "ZCT（電流）＋ ZPD（電圧）"],
          ["コスト", "低", "高（追加センサ必要）"],
          ["誤動作リスク", "高（隣フィーダー地絡でも動作）", "低（方向フィルタあり）"],
        ]}
        note="R5下問13は「フィーダーが複数 → 選択遮断が必要 → DGRを使う」という論理構造"
      />

      <h2 id="hogo-concept">6. 保護協調の全体像（系統図）</h2>
      <PlainExplain>
        <p>保護協調とは、系統のどこで故障が発生しても<strong>故障箇所に最も近い保護装置だけが動作して、健全部分への影響を最小化する</strong>仕組みです。電気的には「上位保護（主CB）は下位保護（フィーダーCB）よりも必ず遅く動作するよう設定する」ことで実現します。</p>
      </PlainExplain>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 8}}>
        <svg viewBox="0 0 820 430" style={{width: '100%', height: 'auto'}}>
          <rect x="335" y="18" width="150" height="38" rx="6" fill="none" stroke="#555" strokeWidth="2"/>
          <text x="410" y="42" textAnchor="middle" fontSize="13" fontWeight="700" fill="#333">6.6kV 電源系統</text>
          <line x1="410" y1="56" x2="410" y2="86" stroke="#555" strokeWidth="2"/>
          <rect x="355" y="86" width="110" height="50" rx="4" fill="none" stroke="#d33" strokeWidth="2.5"/>
          <text x="410" y="107" textAnchor="middle" fontSize="12" fontWeight="700" fill="#d33">主CB（上位）</text>
          <text x="410" y="124" textAnchor="middle" fontSize="10" fill="#555">OCR ＋ GR</text>
          <line x1="410" y1="136" x2="410" y2="168" stroke="#555" strokeWidth="2"/>
          <rect x="120" y="168" width="580" height="10" rx="3" fill="#666"/>
          <text x="410" y="196" textAnchor="middle" fontSize="11" fill="#666">母線（6.6kV）</text>
          <line x1="220" y1="178" x2="220" y2="218" stroke="#555" strokeWidth="2"/>
          <rect x="170" y="218" width="100" height="48" rx="4" fill="none" stroke="#a06" strokeWidth="2.5"/>
          <text x="220" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a06">F1 フィーダーCB</text>
          <text x="220" y="254" textAnchor="middle" fontSize="10" fill="#a06">OCR＋DGR ✓動作</text>
          <line x1="220" y1="266" x2="220" y2="308" stroke="#a06" strokeWidth="2" strokeDasharray="5,3"/>
          <circle cx="220" cy="320" r="15" fill="none" stroke="#c33" strokeWidth="2.5"/>
          <text x="220" y="325" textAnchor="middle" fontSize="11" fill="#c33" fontWeight="700">地絡</text>
          <line x1="220" y1="335" x2="220" y2="365" stroke="#c33" strokeWidth="2"/>
          <line x1="203" y1="368" x2="237" y2="368" stroke="#666" strokeWidth="2"/>
          <line x1="207" y1="374" x2="233" y2="374" stroke="#666" strokeWidth="1.5"/>
          <line x1="211" y1="380" x2="229" y2="380" stroke="#666" strokeWidth="1"/>
          <text x="220" y="400" textAnchor="middle" fontSize="10" fill="#666">大地</text>
          <text x="110" y="340" fontSize="11" fill="#c33" textAnchor="end">地絡電流I₀が</text>
          <text x="110" y="355" fontSize="11" fill="#c33" textAnchor="end">F1方向へ流入↓</text>
          <line x1="410" y1="178" x2="410" y2="218" stroke="#555" strokeWidth="2"/>
          <rect x="360" y="218" width="100" height="48" rx="4" fill="none" stroke="#2a8" strokeWidth="2"/>
          <text x="410" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2a8">F2 フィーダーCB</text>
          <text x="410" y="254" textAnchor="middle" fontSize="10" fill="#2a8">OCR＋DGR ✗不動作</text>
          <line x1="410" y1="266" x2="410" y2="308" stroke="#555" strokeWidth="2"/>
          <rect x="376" y="308" width="68" height="28" rx="3" fill="none" stroke="#2a8" strokeWidth="1.5"/>
          <text x="410" y="327" textAnchor="middle" fontSize="11" fill="#2a8">負荷（継続）</text>
          <line x1="600" y1="178" x2="600" y2="218" stroke="#555" strokeWidth="2"/>
          <rect x="550" y="218" width="100" height="48" rx="4" fill="none" stroke="#2a8" strokeWidth="2"/>
          <text x="600" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2a8">F3 フィーダーCB</text>
          <text x="600" y="254" textAnchor="middle" fontSize="10" fill="#2a8">OCR＋DGR ✗不動作</text>
          <line x1="600" y1="266" x2="600" y2="308" stroke="#555" strokeWidth="2"/>
          <rect x="566" y="308" width="68" height="28" rx="3" fill="none" stroke="#2a8" strokeWidth="1.5"/>
          <text x="600" y="327" textAnchor="middle" fontSize="11" fill="#2a8">負荷（継続）</text>
          <rect x="640" y="360" width="14" height="14" fill="none" stroke="#a06" strokeWidth="2.5"/>
          <text x="660" y="372" fontSize="11" fill="#a06">地絡フィーダー（動作・遮断）</text>
          <rect x="640" y="385" width="14" height="14" fill="none" stroke="#2a8" strokeWidth="2"/>
          <text x="660" y="397" fontSize="11" fill="#2a8">健全フィーダー（継続）</text>
          <text x="410" y="425" textAnchor="middle" fontSize="12" fontWeight="700" fill="#222">図1：DGRによる選択遮断（F1のみ遮断、F2・F3は継続）</text>
        </svg>
      </div>
      <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 24}}>
        ※ DGRは地絡電流の「方向」を検出するため、地絡フィーダー(F1)のみを選択遮断できる。GRでは方向判定ができないため全フィーダーのGRが動作してしまう。
      </div>

      <h2 id="ocr-graph">7. 過電流特性−連動遮断特性グラフ（OCR協調）</h2>
      <PlainExplain>
        <p><strong>反限時特性（inverse time characteristic）</strong>：電流が大きいほど動作時間が短くなる特性。特性グラフはY軸（動作時間[s]）・X軸（電流倍数 I/In）ともに対数スケールで表示されることが多い。</p>
        <p>協調確認の手順：グラフ上で特定の電流値における「主OCR動作時間 − フィーダーOCR動作時間」を求め、協調マージン（≥0.3s）を確保しているか確認する。</p>
      </PlainExplain>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 8}}>
        <svg viewBox="0 0 820 490" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="ocAxArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#444"/>
            </marker>
          </defs>
          <line x1="90" y1="430" x2="710" y2="430" stroke="#444" strokeWidth="2" markerEnd="url(#ocAxArr)"/>
          <line x1="90" y1="430" x2="90" y2="30" stroke="#444" strokeWidth="2" markerEnd="url(#ocAxArr)"/>
          <text x="716" y="434" fontSize="12" fill="#444">電流倍数 I/In →</text>
          <text x="18" y="235" fontSize="12" fill="#444" transform="rotate(-90 18 235)">動作時間 [s] →</text>
          {[{x:276,label:"2"},{x:524,label:"5"},{x:710,label:"10"}].map(function(d){return(
            <g key={d.label}>
              <line x1={d.x} y1="430" x2={d.x} y2="425" stroke="#444" strokeWidth="1.5"/>
              <text x={d.x} y="448" textAnchor="middle" fontSize="11" fill="#444">{d.label}</text>
              <line x1={d.x} y1="40" x2={d.x} y2="430" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3,3"/>
            </g>
          );})}
          <text x="90" y="448" textAnchor="middle" fontSize="11" fill="#444">1</text>
          {[{y:339,label:"0.3"},{y:240,label:"1"},{y:149,label:"3"},{y:50,label:"10"}].map(function(d){return(
            <g key={d.label}>
              <line x1="85" y1={d.y} x2="90" y2={d.y} stroke="#444" strokeWidth="1.5"/>
              <text x="82" y={d.y+4} textAnchor="end" fontSize="10" fill="#444">{d.label}</text>
              <line x1="90" y1={d.y} x2="705" y2={d.y} stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3,3"/>
            </g>
          );})}
          <path d="M 90 428 C 150 350 210 130 276 80 C 380 60 460 180 524 207 C 600 235 660 260 710 270"
                fill="none" stroke="#d33" strokeWidth="3"/>
          <text x="155" y="290" fontSize="13" fill="#d33" fontWeight="700">主OCR</text>
          <text x="155" y="307" fontSize="11" fill="#d33">（TMS大・動作が遅い）</text>
          <path d="M 90 428 C 160 425 220 360 276 212 C 380 300 460 330 524 339 C 600 360 660 385 710 402"
                fill="none" stroke="#27c" strokeWidth="3"/>
          <text x="560" y="312" fontSize="13" fill="#27c" fontWeight="700">フィーダーOCR</text>
          <text x="560" y="329" fontSize="11" fill="#27c">（TMS小・動作が速い）</text>
          <circle cx="524" cy="207" r="5" fill="#d33"/>
          <circle cx="524" cy="339" r="5" fill="#27c"/>
          <line x1="524" y1="207" x2="524" y2="339" stroke="#2a8" strokeWidth="2" strokeDasharray="6,3"/>
          <line x1="509" y1="207" x2="539" y2="207" stroke="#2a8" strokeWidth="1.5"/>
          <line x1="509" y1="339" x2="539" y2="339" stroke="#2a8" strokeWidth="1.5"/>
          <text x="545" y="255" fontSize="13" fill="#2a8" fontWeight="700">協調マージン</text>
          <text x="545" y="271" fontSize="11" fill="#2a8">t主 − t下位 ≥ 0.3s</text>
          <text x="545" y="287" fontSize="11" fill="#2a8">（ここでは約1.2s OK）</text>
          <line x1="524" y1="430" x2="524" y2="200" stroke="#aaa" strokeWidth="1" strokeDasharray="3,3"/>
          <text x="524" y="468" textAnchor="middle" fontSize="11" fill="#666">I/In=5</text>
          <text x="410" y="484" textAnchor="middle" fontSize="12" fontWeight="700" fill="#222">図2：OCR協調曲線（主OCRはフィーダーOCRより常に上側＝動作が遅い）</text>
        </svg>
      </div>
      <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 24}}>
        ※ 概念図（対数スケール近似）。試験では実際の特性曲線から時間を読み取り、「主 − フィーダー ≥ 0.3s」を確認する。TMS（Time Multiplier Setting）が大きいほど動作時間が長くなる。
      </div>

      <h2 id="dgr-direction">8. DGR 方向検出の原理（ベクトル図）</h2>
      <PlainExplain>
        <p>DGRは零相電流I₀（ZCTで検出）と零相電圧V₀（ZPDで検出）の位相角を比較して、地絡が「自フィーダー方向か」「系統（他フィーダー）方向か」を判定します。自フィーダー方向の地絡電流が流れる場合のみ動作します。</p>
      </PlainExplain>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 8}}>
        <svg viewBox="0 0 820 410" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="dgVecPurple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#a06"/>
            </marker>
            <marker id="dgVecBlue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#27c"/>
            </marker>
          </defs>
          <text x="205" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#c33">【自フィーダー地絡】→ DGR 動作</text>
          <text x="615" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2a8">【他フィーダー地絡】→ DGR 不動作</text>
          <circle cx="205" cy="200" r="130" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="4,3"/>
          <line x1="75" y1="200" x2="335" y2="200" stroke="#ddd" strokeWidth="1"/>
          <line x1="205" y1="70" x2="205" y2="330" stroke="#ddd" strokeWidth="1"/>
          <line x1="205" y1="200" x2="205" y2="78" stroke="#27c" strokeWidth="3" markerEnd="url(#dgVecBlue)"/>
          <text x="216" y="108" fontSize="13" fill="#27c" fontWeight="700">V₀</text>
          <text x="216" y="123" fontSize="11" fill="#27c">零相電圧</text>
          <line x1="205" y1="200" x2="313" y2="290" stroke="#a06" strokeWidth="3" markerEnd="url(#dgVecPurple)"/>
          <text x="300" y="278" fontSize="13" fill="#a06" fontWeight="700">I₀</text>
          <text x="285" y="293" fontSize="11" fill="#a06">零相電流</text>
          <path d="M 205 200 L 255 78 A 130 130 0 0 1 335 200 Z" fill="#c33" fillOpacity="0.08" stroke="#c33" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="292" y="148" fontSize="11" fill="#c33">動作</text>
          <text x="292" y="162" fontSize="11" fill="#c33">範囲</text>
          <circle cx="205" cy="358" r="22" fill="#c33"/>
          <text x="205" y="365" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">動作</text>
          <circle cx="615" cy="200" r="130" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="4,3"/>
          <line x1="485" y1="200" x2="745" y2="200" stroke="#ddd" strokeWidth="1"/>
          <line x1="615" y1="70" x2="615" y2="330" stroke="#ddd" strokeWidth="1"/>
          <line x1="615" y1="200" x2="615" y2="78" stroke="#27c" strokeWidth="3" markerEnd="url(#dgVecBlue)"/>
          <text x="626" y="108" fontSize="13" fill="#27c" fontWeight="700">V₀</text>
          <line x1="615" y1="200" x2="507" y2="110" stroke="#a06" strokeWidth="3" markerEnd="url(#dgVecPurple)"/>
          <text x="475" y="100" fontSize="13" fill="#a06" fontWeight="700">I₀</text>
          <text x="462" y="115" fontSize="11" fill="#a06">（逆方向）</text>
          <path d="M 615 200 L 665 78 A 130 130 0 0 1 745 200 Z" fill="#c33" fillOpacity="0.08" stroke="#c33" strokeWidth="1" strokeDasharray="3,2"/>
          <text x="700" y="148" fontSize="11" fill="#c33">動作</text>
          <text x="700" y="162" fontSize="11" fill="#c33">範囲</text>
          <circle cx="615" cy="358" r="22" fill="#2a8"/>
          <text x="615" y="365" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="700">不動作</text>
          <text x="410" y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="#222">図3：DGR方向判定（V₀とI₀の位相角で自フィーダー地絡のみ検出）</text>
        </svg>
      </div>
      <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 24}}>
        ※ DGRの動作条件：① I₀ ≥ 整定電流値 かつ ② I₀とV₀の位相差が整定角度範囲内（自フィーダー方向）の両条件を同時に満たす場合のみ動作。
      </div>

      <h2 id="gr-graph">9. 地絡継電器−連動遮断特性グラフ（GR/DGR協調）</h2>
      <PlainExplain>
        <p>地絡継電器の協調も過電流と同様に「下位（フィーダーDGR）が先に動作、上位（主GR）は後に動作」するよう設定します。X軸は零相電流[mA]または整定値の倍数で表されます。整定電流（最小動作電流）以下では継電器は動作しません。</p>
      </PlainExplain>

      <div style={{background: 'var(--bg-elev)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 8}}>
        <svg viewBox="0 0 820 470" style={{width: '100%', height: 'auto'}}>
          <defs>
            <marker id="grAxArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#444"/>
            </marker>
          </defs>
          <line x1="90" y1="410" x2="710" y2="410" stroke="#444" strokeWidth="2" markerEnd="url(#grAxArr)"/>
          <line x1="90" y1="410" x2="90" y2="30" stroke="#444" strokeWidth="2" markerEnd="url(#grAxArr)"/>
          <text x="714" y="414" fontSize="12" fill="#444">零相電流 I₀ [mA] →</text>
          <text x="18" y="225" fontSize="12" fill="#444" transform="rotate(-90 18 225)">動作時間 [s] →</text>
          {[{x:210,v:"100"},{x:330,v:"200"},{x:510,v:"400"},{x:650,v:"600"}].map(function(d){return(
            <g key={d.v}>
              <line x1={d.x} y1="410" x2={d.x} y2="405" stroke="#444" strokeWidth="1.5"/>
              <text x={d.x} y="425" textAnchor="middle" fontSize="10" fill="#444">{d.v}</text>
              <line x1={d.x} y1="40" x2={d.x} y2="410" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3,3"/>
            </g>
          );})}
          <text x="90" y="425" textAnchor="middle" fontSize="10" fill="#444">0</text>
          {[{y:390,v:"0.1"},{y:340,v:"0.2"},{y:230,v:"0.5"},{y:140,v:"1.0"},{y:60,v:"2.0"}].map(function(d){return(
            <g key={d.v}>
              <line x1="85" y1={d.y} x2="90" y2={d.y} stroke="#444" strokeWidth="1.5"/>
              <text x="82" y={d.y+4} textAnchor="end" fontSize="10" fill="#444">{d.v}</text>
              <line x1="90" y1={d.y} x2="705" y2={d.y} stroke="#e5e5e5" strokeWidth="1" strokeDasharray="3,3"/>
            </g>
          );})}
          <line x1="90" y1="140" x2="330" y2="140" stroke="#d33" strokeWidth="2" strokeDasharray="6,3"/>
          <circle cx="330" cy="140" r="5" fill="#d33"/>
          <line x1="330" y1="140" x2="710" y2="140" stroke="#d33" strokeWidth="3"/>
          <text x="400" y="127" fontSize="13" fill="#d33" fontWeight="700">主GR（定限時1.0s）</text>
          <text x="400" y="142" fontSize="11" fill="#d33">整定200mA 以上で動作</text>
          <line x1="90" y1="340" x2="210" y2="340" stroke="#a06" strokeWidth="2" strokeDasharray="6,3"/>
          <circle cx="210" cy="340" r="5" fill="#a06"/>
          <line x1="210" y1="340" x2="710" y2="340" stroke="#a06" strokeWidth="3"/>
          <text x="420" y="327" fontSize="13" fill="#a06" fontWeight="700">フィーダーDGR（定限時0.2s）</text>
          <text x="420" y="343" fontSize="11" fill="#a06">整定100mA 以上で動作</text>
          <line x1="510" y1="140" x2="510" y2="340" stroke="#2a8" strokeWidth="2" strokeDasharray="5,3"/>
          <line x1="496" y1="140" x2="524" y2="140" stroke="#2a8" strokeWidth="1.5"/>
          <line x1="496" y1="340" x2="524" y2="340" stroke="#2a8" strokeWidth="1.5"/>
          <text x="530" y="220" fontSize="13" fill="#2a8" fontWeight="700">協調</text>
          <text x="528" y="236" fontSize="12" fill="#2a8">マージン</text>
          <text x="528" y="252" fontSize="11" fill="#2a8">0.8s ≥ 0.3s</text>
          <text x="528" y="266" fontSize="10" fill="#2a8">（十分確保）</text>
          <text x="210" y="360" textAnchor="middle" fontSize="10" fill="#a06">最小動作電流</text>
          <text x="330" y="120" textAnchor="middle" fontSize="10" fill="#d33">最小動作電流</text>
          <text x="410" y="460" textAnchor="middle" fontSize="12" fontWeight="700" fill="#222">図4：GR/DGR協調曲線（主GRはフィーダーDGRより動作時間が長く設定）</text>
        </svg>
      </div>
      <div style={{fontSize: 12, color: 'var(--ink-3)', marginBottom: 24}}>
        ※ 破線区間は最小動作電流以下（不動作）。主GRの整定電流をフィーダーDGRより大きくすることで、微小地絡は主GRが不動作となり、フィーダーDGRのみが動作する。
      </div>

      <h2 id="setting">10. 整定値の考え方</h2>
      <PlainExplain>
        <p><strong>時間整定</strong>：フィーダーDGR動作時間を基準に、主GRはそれ＋協調マージン（≥0.3s）となるよう設定する。</p>
        <p><strong>電流整定（感度整定）</strong>：主GRの整定電流 ＞ フィーダーDGRの最大動作電流 × 安全係数（1.2〜1.5）程度に設定することで、健全フィーダーへの誤動作を防ぐ。</p>
        <p><strong>注意</strong>：整定値は設備条件・系統の対地静電容量・使用する継電器の種類によって大きく異なる。試験では「与えられた条件のみ」で判断すること。</p>
      </PlainExplain>

      <h2 id="solve-flow">11. 解き方・判断手順</h2>
      <SolveFlow
        type="保護協調・DGR問題の解法手順"
        steps={[
          "① 系統図を確認：主CB（上位）とフィーダーCB（下位）の関係、地絡点の位置を把握する",
          "② 継電器の種類を判断：OCR（過電流）vs GR/DGR（地絡）の区別、フィーダーにDGRが必要な理由を確認",
          "③ 特性グラフを読む：X軸の電流値または電流倍数から各継電器の動作時間を読み取る（対数スケールに注意）",
          "④ 協調マージンを計算：t_主 − t_フィーダー ≥ 0.3s（または問題指定の値）か確認",
          "⑤ 選択遮断の可否を判断：GRでは全フィーダー動作→不可、DGRなら方向検出→故障フィーダーのみ選択遮断可",
        ]}
      />

      <h2 id="memory-table">12. 暗記ポイント</h2>
      <MemTable
        headers={["暗記項目", "内容"]}
        rows={[
          ["協調マージン", "≥ 0.3s（問題によっては0.4s・0.5s）/ 主 > フィーダー"],
          ["GRとDGRの差", "GR＝大きさのみ・DGR＝大きさ＋方向。選択遮断にはDGR"],
          ["DGRの入力", "ZCT（I₀）＋ ZPD（V₀）の2系統が必要"],
          ["OCR反限時特性", "電流大→動作時間短、電流小→動作時間長。グラフは対数スケール"],
          ["整定電流（pickup）", "整定電流以下では不動作（グラフの破線区間）"],
          ["上位/下位の関係", "フィーダーCB（下位）が先に動作→主CB（上位）は後"],
          ["グラフの上下", "グラフ上位の曲線＝動作が遅い＝上位保護（主）"],
        ]}
        note="「フィーダー（下位）が先、主（上位）は後」が保護協調の本質"
      />

      <h2 id="traps">13. よくあるひっかけ（11項目）</h2>
      <TrapTable
        traps={[
          { wrong: "GRをフィーダー全てに設置すれば選択遮断できる", correct: "GRは方向なし→全フィーダーが動作。選択遮断にはDGRが必要" },
          { wrong: "DGRは過電流（短絡）保護にも使える", correct: "DGRは地絡専用。過電流保護はOCRが担当する" },
          { wrong: "協調マージンは「フィーダー動作時間 − 主動作時間」で計算する", correct: "逆。「主 − フィーダー ≥ 0.3s」が正しい（主が遅い）" },
          { wrong: "ZCTだけあればDGRが動作できる", correct: "DGRにはZCT（電流）とZPD（電圧）の両方が必要" },
          { wrong: "グラフのX軸で電流が大きいほど動作時間も長い", correct: "反限時特性は逆（電流大→動作時間短）" },
          { wrong: "整定電流以上なら必ずDGRが動作する", correct: "DGRは整定電流以上＋方向条件の両方を満たさないと動作しない" },
          { wrong: "中性点接地方式では地絡電流が小さい", correct: "非接地方式で地絡電流が小さい。接地（抵抗接地など）は相対的に大きい" },
          { wrong: "主GRはフィーダーDGRより整定電流を小さくして感度を高くする", correct: "整定電流は主GR > フィーダーDGRが原則。主を過感度にすると選択遮断が崩れる" },
          { wrong: "グラフの下側の曲線が上位保護（主）", correct: "グラフ上側の曲線が上位保護（動作が遅い）。下側が下位保護（フィーダー）" },
          { wrong: "DGRを主受電点にだけ設置すれば選択遮断できる", correct: "主受電点のDGRは全体保護。フィーダーごとにDGRを設置しないと選択遮断不可" },
          { wrong: "保護協調は「速く動く継電器」が高性能で望ましい", correct: "速すぎると協調が崩れる。上位は必ず下位より遅く動作させる適切な時限設定が重要" },
        ]}
      />

      <h2 id="exam-r05">14. 過去問: R5下期 問13（保護協調・DGR）</h2>

      <ExamQuestion
        year="令和5年下期"
        qNum="13(a)"
        question="6.6kV高圧需要家の受電設備において、受電点の主遮断器（OCR・GR付き）と各分岐フィーダーに分岐遮断器を設置している。フィーダーに地絡が発生した際に地絡フィーダーのみを選択遮断するため、各分岐遮断器に設置する地絡保護継電器として最も適切なものを選べ。"
        choices={[
          "(1) GR（地絡継電器）：ZCTのみを用いて零相電流の大きさで判定する",
          "(2) OCR（過電流継電器）：過電流のみ検出する",
          "(3) DGR（地絡方向継電器）：ZCTとZPDを用いて零相電流の方向も判定する",
          "(4) ZCT（零相変流器）：検出器であり継電器ではない",
          "(5) UVR（不足電圧継電器）：電圧低下を検出して動作する",
        ]}
        note="「フィーダー選択遮断」＝方向を識別できる継電器が必要というキーワード"
      />
      <SolveFlow
        type="解法 (a)"
        steps={[
          "フィーダーが複数 → 地絡した「方向」を識別できる継電器が必要",
          "GRは大きさのみ → 全フィーダーのGRが動作 → 選択遮断不可",
          "DGRはZCT（電流）＋ZPD（電圧）で方向まで判定 → 自フィーダーへの地絡のみ動作",
          "答え：(3) DGR（地絡方向継電器）",
        ]}
      />
      <ExamAnswer
        correct="(a) (3) DGR（地絡方向継電器）"
        explanations={[
          { choice: "(1)", mark: "×", reason: "GRは方向なし→全フィーダーのGRが動作してしまい選択遮断不可" },
          { choice: "(2)", mark: "×", reason: "OCRは過電流用。地絡の選択遮断には使えない" },
          { choice: "(3)", mark: "○", reason: "DGRはZCT（I₀の大きさ）＋ZPD（V₀で方向判定）→自フィーダーへの地絡のみ選択動作" },
          { choice: "(4)", mark: "×", reason: "ZCTは検出器。継電器でも遮断器でもないので単独では遮断動作しない" },
          { choice: "(5)", mark: "×", reason: "UVRは電圧低下保護用。地絡の選択遮断とは無関係" },
        ]}
      />

      <ExamQuestion
        year="令和5年下期"
        qNum="13(b)"
        question="上記系統において、主遮断器OCR（TMS=1.0）とフィーダーOCR（TMS=0.2）の反限時特性曲線が与えられている。整定電流の5倍の電流が流れたとき、主OCRの動作時間は1.5s、フィーダーOCRの動作時間は0.3sであった。このときの協調マージンを求め、一般的な最小協調マージンの観点から協調が成立しているか判定せよ。"
        choices={[]}
        note="グラフ読取型。差を計算して最小協調マージン（0.3s）と比較する"
      />
      <SolveFlow
        type="解法 (b)"
        steps={[
          "協調マージン = t_主 − t_フィーダー = 1.5s − 0.3s = 1.2s",
          "一般的な最小協調マージン：0.3s（問題によって0.4〜0.5sの場合もある）",
          "1.2s ≥ 0.3s → 協調は成立している（十分なマージンあり）",
          "答え：協調マージン = 1.2s　協調成立（最小値0.3sを大きく上回る）",
        ]}
      />
      <ExamAnswer
        correct="(b) 協調マージン = 1.2s　協調成立"
        explanations={[
          { choice: "計算", mark: "○", reason: "t_主 − t_フィーダー = 1.5 − 0.3 = 1.2s" },
          { choice: "判定", mark: "○", reason: "1.2s ≥ 0.3s（最小協調マージン）→ 協調成立。十分な余裕がある" },
        ]}
      />

      <PlainExplain>
        <p><strong>R5下期 問13 のひっかけポイント</strong></p>
        <ol style={{margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8}}>
          <li>「GRでも整定値を変えれば選択遮断できる」→ 方向性がない限り全フィーダーが動作するため不可</li>
          <li>「TMS値が小さい方が動作時間が長い（遅い）」→ 逆。TMS小→動作時間短（速い）。フィーダーOCRはTMS=0.2（小）で先に動作する正しい設定</li>
          <li>「グラフの下側が主（上位）保護」→ 逆。グラフ上側（Y値大）の曲線が動作が遅い上位保護（主）</li>
          <li>「協調マージンはフィーダー − 主で計算する」→ 主−フィーダーが正。マイナスになったら協調崩壊</li>
          <li>「DGRは地絡保護と過電流保護の両方をカバーする」→ DGRは地絡専用。過電流はOCRが担当</li>
        </ol>
      </PlainExplain>

      <h2 id="scenarios">15. 類題対応シナリオ</h2>
      <MemTable
        headers={["シナリオ", "判断ポイント", "答え方"]}
        rows={[
          ["「選択遮断できる継電器は？」", "フィーダーが複数→方向識別が必要", "DGRと答える"],
          ["「GRとDGRどちらが適切？」", "フィーダー個別選択→DGR、全体保護→GR", "系統条件で切り替え"],
          ["「協調が取れているか確認せよ」", "t主 − tフィーダー ≥ 0.3s?", "グラフ読取→引き算→0.3s比較"],
          ["「DGRに必要なセンサは？」", "電流(ZCT)＋電圧(ZPD)の2種", "ZCTとZPDの両方と答える"],
          ["「TMS値を下げると協調はどうなる？」", "動作時間が短くなる→マージン縮小→協調崩壊リスク", "TMS設定は協調確認後に決める"],
          ["「グラフ上側の曲線はどちらか？」", "動作時間が長い（遅い）のが上位保護（主）", "上側の曲線＝主OCR（TMS大）"],
        ]}
        note="R5〜R6の保護協調問題はほぼこの6パターンで対処できる"
      />

      <h2 id="jitsumu">16. 実務メモ</h2>
      <PlainExplain>
        <p>実際の受電設備では保護協調の設計にあたって電力会社との協議が必要です。また系統連系設備（太陽光・蓄電池等）を持つ場合、逆潮流時の保護協調が追加で検討されます。電験3種では基礎的な「主 ＞ フィーダー（動作時間）」の概念とDGR/GRの使い分けが問われます。</p>
      </PlainExplain>

      <h2 id="law">17. 関連法規（条文との対応）</h2>
      <MemTable
        headers={["階層", "法規・条文", "本ページとの関係"]}
        rows={[
          [<span>🟥 法律</span>, <span><strong>電気事業法</strong><br/>第39条 技術基準適合維持義務</span>, "受電設備が保安基準を維持する義務の根拠"],
          [<span>🟨 省令</span>, <span><strong>電気設備技術基準</strong><br/>第14条 地絡に対する保護措置</span>, "地絡が発生した場合に電路を自動遮断することを規定"],
          [<span>🟩 解釈</span>, <span><strong>電技解釈</strong><br/>第36条 地絡遮断装置の施設</span>, "自動遮断装置（GR・DGR等）の施設要件を規定"],
          [<span>🟦 規格</span>, <span><strong>JEAC 8011</strong>（高圧受電設備規程）</span>, "需要家側の受電設備設計・保護協調の実践的指針"],
        ]}
        note="法規B問題では条文番号より「地絡保護＝自動遮断が義務」という知識が主に問われる"
      />

      <h2 id="quick-review">18. 1分復習</h2>
      <QuickReview
        items={[
          { q: "選択遮断にはGRとDGRのどちらが必要？", a: "DGR（地絡方向継電器）。GRは方向なしで全フィーダーが動作してしまう" },
          { q: "DGRに必要なセンサを2つ答えよ", a: "ZCT（零相電流I₀）とZPD（零相電圧V₀）" },
          { q: "協調マージンの計算式は？", a: "t_主 − t_フィーダー ≥ 0.3s（主の動作時間 − フィーダーの動作時間）" },
          { q: "OCR反限時特性でX軸電流が大きくなると動作時間は？", a: "短くなる（電流大→時間短の反比例型）" },
          { q: "グラフ上側の曲線は上位保護か下位保護か？", a: "上位保護（主）。動作時間が長い（遅い）" },
        ]}
      />

      <h2 id="crossref">19. 掛け算出題パターン</h2>
      <CrossRef
        patterns={[
          { a: "保護協調", b: "地絡電流計算（1.8）", result: "地絡電流の大きさから整定値の適否を判断する問題" },
          { a: "保護協調", b: "ZCT原理（1.9）", result: "DGRにZCTが必要な理由を問う組合せ" },
          { a: "DGR", b: "系統連系（3.7）", result: "逆潮流時の保護協調崩壊リスクを問う問題" },
          { a: "地絡保護", b: "接地工事（3.2）", result: "C種接地がDGRのZPDに使われる場合の関連を問う問題" },
        ]}
      />

      <PageNav
        prevId="zerosou-henryuki"
        prevTitle="1.9 零相変流器（ZCT）"
        nextId="setsuchi-ichiran"
        nextTitle="2.1 接地工事一覧表"
        onNav={onNav}
      />

      <div style={{ marginTop: 16, fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.8 }}>
        <strong>UpdateLog</strong><br/>
        v1.0 (2026-05-07) 初版作成 — 19セクション構成・SVG4枚・R5下13 (a)(b)解法フロー完成
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. DemandKanriPage（デマンド制御・最大需要電力管理）
// ─────────────────────────────────────────────
function DemandKanriPage({ onNav, data }) {
  return (
    <div id="demand-kanri">

      {/* 0. DirectCheckMode */}
      <DirectCheckMode
        pageId="demand-kanri"
        formula="平均電力 = (P₁t₁ + P₂t₂) / T ＜ 目標値"
        formulaVars={[
          { sym: "P₁", desc: "前半電力[kW]" },
          { sym: "t₁", desc: "前半時間[分]" },
          { sym: "P₂", desc: "後半電力[kW]" },
          { sym: "t₂", desc: "後半時間[分]" },
          { sym: "T",  desc: "デマンド周期[分]（通常30）" },
        ]}
        warningRed="「300kW未満」→ 境界値NG・停止台数は必ず切り上げ（小数点以下は1台追加）"
        trapsTop3={[
          "「300kW未満」= 300kWはNG。P=280kWも平均ちょうど300になるので不可",
          "X = 3.64… → 3台では不足（P=283.5>280）。必ず切り上げて4台",
          "ファン以外の停止負荷（10kW）を忘れると台数を過大計算してしまう",
        ]}
        jumps={[
          { id: "exam-r05u", label: "過去問へ →", primary: true },
          { id: "quick-review", label: "1分復習 →" },
          { id: "traps", label: "ひっかけ全項目 →" },
        ]}
      />

      {/* 1. GoalQuestion */}
      <h2 id="goal-question">1. ゴール問題</h2>
      <GoalQuestion
        year="令和5年上期 法規 問10"
        question="ある工場では、換気用ファン（定格出力5.5kW）を最大8台まで停止できる。9:00〜9:20の平均使用電力は310kWであった。9:20〜9:30の間にファンを何台か停止させるとともに、その他の負荷10kW分を停止した。9:00〜9:30の最大需要電力を300kW未満に抑えるためには、ファンを最低何台停止させる必要があるか。"
        choices={["0台", "2台", "4台", "6台", "8台"]}
        note="最大需要電力 = 30分間の平均使用電力[kW]。このページを読み終えたら戻って解いてみよう。"
      />

      {/* 問題文の読み替えポイント */}
      <div className="topic" style={{marginBottom:16, fontSize:14}}>
        <p style={{margin:'0 0 4px'}}><strong>問題文の読み替え</strong>：「9:00〜9:30の<strong>最大需要電力</strong>を300kW未満」＝「その30分区間の<strong>平均電力を300kW未満に制御する</strong>」こと。</p>
        <p style={{margin:0, color:'var(--ink-2)'}}>最大需要電力 = デマンド周期内の<em>平均電力</em>。瞬時値ではなく30分区間全体の平均で判断する。</p>
      </div>

      {/* 2. ConclusionBox */}
      <h2 id="conclusion-box">2. 結論</h2>
      <ConclusionBox>
        <p style={{margin: '0 0 6px'}}><strong>デマンド制御の核心</strong>：30分区間の平均電力を目標値未満に保つ</p>
        <p style={{margin: '0 0 4px'}}>① 後半電力の上限Pを逆算：(310×20 + P×10)/30 &lt; 300 → P &lt; 280kW</p>
        <p style={{margin: '0 0 4px'}}>② 停止電力の方程式：5.5X + 10 &gt; 30 → X &gt; 3.64</p>
        <p style={{margin: 0, color: '#c33', fontWeight: 700}}>答え：4台（3.64を切り上げ。3台では P=283.5kW で条件未達）</p>
      </ConclusionBox>

      {/* freq-S badge + 30分平均の重要前提 */}
      <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:10, flexWrap:'wrap'}}>
        <span className="rank-S" style={{padding:'2px 10px', borderRadius:4, fontSize:13, fontWeight:700}}>S</span>
        <span className="tag hot" style={{fontSize:12}}>電気施設管理の頻出計算</span>
      </div>
      <div className="topic" style={{marginBottom:20, fontSize:14}}>
        <p style={{margin:0}}><strong>重要前提</strong>：最大需要電力は<strong>瞬間値ではなく30分平均</strong>で判断する。瞬時に310kWを超えていても、30分間の平均が300kW未満であれば目標達成。</p>
      </div>

      {/* 3. MinShortcutCard */}
      <MinShortcutCard
        steps={[
          <span><strong>目標エネルギー上限</strong>：300×30 = 9,000 kW·分（ただし未満なので9,000は含まない）</span>,
          <span><strong>前半確定</strong>：310×20 = 6,200 kW·分</span>,
          <span><strong>後半上限逆算</strong>：(9,000 − 6,200) ÷ 10 = 280 → P &lt; 280kW</span>,
          <span><strong>台数方程式</strong>：5.5X + 10 &gt; 30 → X &gt; 3.64 → <strong>4台</strong></span>,
          <span><strong>切り上げ確認</strong>：3台ならP=283.5 &gt; 280でNG → 4台が最小（検算：278kW &lt; 280 ✓）</span>,
        ]}
        hint="R5上 問10 はこの5ステップそのまま。特に「未満」と「切り上げ」が最重要"
      />

      {/* 解法テンプレート（4ステップ） */}
      <div className="topic" style={{marginBottom:20}}>
        <p style={{margin:'0 0 10px', fontWeight:700, fontSize:14}}>解法テンプレート（4ステップ）</p>
        <ol style={{margin:0, paddingLeft:22, lineHeight:1.9, fontSize:13}}>
          <li><strong>時間帯分割</strong>：デマンド区間（30分）を前半・後半に分け、各時間を確認する</li>
          <li><strong>kW×分 合計</strong>：各時間帯の（電力[kW] × 時間[分]）を合計してエネルギーを求める</li>
          <li><strong>条件作成</strong>：合計エネルギー ÷ 30 &lt; 目標値 → 後半電力Pの上限を逆算する</li>
          <li><strong>台数変換</strong>：必要停止電力 ÷ 単位電力 = 台数（小数は必ず切り上げ）</li>
        </ol>
      </div>

      {/* 4. MetaStrip */}
      <MetaStrip
        ch="CH06 電気施設管理"
        category="デマンド制御・最大需要電力管理"
        importance="S"
        freq="max"
        examType="B問題・計算"
        targets={["電気施設管理の計算問題", "30分デマンド管理の実践"]}
        tags={["デマンド", "最大需要電力", "負荷管理", "ファン停止", "30分平均", "デマンドコントローラ"]}
        lastChecked="2026-05-07"
      />

      {/* 過去出題実績 */}
      <MemTable
        headers={["年度・期", "問番号", "出題内容", "答え"]}
        rows={[
          ["R5上（2023）", "問10", "換気ファン5.5kW×台数 + 他10kW停止。9:20〜9:30の制御で300kW未満にする最小台数", "4台"],
          ["CH06全体", "（参考）", "電気施設管理カテゴリ全体：過去10年で30問以上（Sランク）。デマンド計算・需要率・変圧器容量等を含む", "─"],
        ]}
        note="※ デマンド制御計算の単独集計。電気施設管理カテゴリ全体の出題は別途テーマランキングを参照"
      />

      {/* 5. §3 試験で問われること */}
      <h2 id="exam-focus">3. 試験で問われること</h2>
      <ExamFocus items={[
        { label: "主体",   value: "30分デマンド管理：30分区間の平均電力を指定値未満に抑える計算" },
        { label: "手法",   value: "（前半電力×前半時間 + 後半電力×後半時間）÷ 30 ＜ 目標値 から後半電力上限を逆算" },
        { label: "条件",   value: "「未満」なので境界値はNG（300kWは含まない）。計算結果に小数が出たら必ず切り上げ" },
        { label: "単位",   value: "電力[kW]×時間[分]でエネルギーを統一。kWh と kW·分を混在させない" },
        { label: "応用",   value: "ファン以外の固定停止負荷（○kW分）が与えられた場合の差し引き処理" },
        { label: "出典",   value: "R5上 問10：換気ファン5.5kW×台数 + 他10kW 停止で300kW未満（答え4台）" },
      ]} />

      {/* 6. §4 用語と定義 */}
      <h2 id="abbrev">4. 用語と定義</h2>
      <MemTable
        headers={["用語", "定義・意味", "電験での扱い"]}
        rows={[
          ["最大需要電力", "30分間の平均使用電力の最大値[kW]", "需要率の分子に登場。電力契約の基本量"],
          ["デマンド周期", "最大需要電力の計測区間（通常30分）", "9:00〜9:30, 9:30〜10:00 … のように区切る"],
          ["デマンド目標値", "30分平均電力を超えてはいけない上限値", "超えると翌月の基本料金（需要料金）が上がる"],
          ["負荷遮断", "デマンド警報発生時にファンや設備を停止する操作", "自動（EMS）または手動で実施"],
          ["需要率", "需要率 = 最大需要電力 ÷ 設備容量 × 100%", "最大需要電力が大きいほど需要率は高くなる"],
          ["デマンドコントローラ", "30分積算電力を監視し警報を発する装置", "工場の受電盤に設置される省エネ設備"],
        ]}
        note="「最大需要電力」は日常の「ピーク電力（瞬時値）」とは異なり、30分間の平均値である点に注意"
      />

      {/* 用語確認テスト */}
      <h3 id="vocab-test" style={{marginTop:20, marginBottom:8, fontSize:15, color:'var(--ink-2)', fontWeight:700}}>▶ 用語確認テスト</h3>
      <QuickReview
        items={[
          { q: "「最大需要電力」の正確な定義は？", a: "30分区間の平均使用電力の最大値[kW]（瞬時値ではない）" },
          { q: "デマンド周期は何分？", a: "30分（正時：00分・30分を起点とする区間）" },
          { q: "デマンド目標値を超えると何が起きる？", a: "翌月以降の基本料金（需要料金）が上昇する" },
          { q: "需要率の計算式は？", a: "需要率 = 最大需要電力 ÷ 設備容量 × 100%" },
          { q: "デマンドコントローラの役割は？", a: "30分積算電力を常時監視し、目標値超過時に警報を発する装置" },
        ]}
      />

      <div style={{borderLeft: '3px solid var(--warn)', paddingLeft: 14, marginBottom: 24, fontSize: 13, color: 'var(--ink-2)'}}>
        <strong>前提条件</strong>：以下の解説は「正時（00分・30分）から30分間」をデマンド周期とする一般的な高圧受電設備を対象としています。契約形態や計測方式により周期が異なる場合があります。
      </div>

      {/* §5 デマンド vs 瞬時値 */}
      <h2 id="comparison">5. 最大需要電力 vs 瞬時値の違い</h2>
      <MemTable
        headers={["概念", "定義", "計測方法", "契約・料金との関係"]}
        rows={[
          ["最大需要電力（デマンド）", "30分区間の平均電力の最大値[kW]", "積算電力計で30分ごとに集計", "需要料金の計算基準（翌月基本料金に影響）"],
          ["ピーク電力（瞬時）", "ある瞬間の電力使用量[kW]", "電力計で瞬時値を読む", "設備容量の設計に使う。契約の直接根拠ではない"],
          ["平均電力", "一定時間の平均使用電力[kW]", "エネルギー÷時間", "負荷率の計算に使用"],
        ]}
        note="デマンド制御は「30分平均を下げる」管理。瞬時に高くても30分平均が目標内ならOK"
      />

      {/* §6 30分デマンド区間の概念図 SVG */}
      <h2 id="demand-concept">6. 30分デマンド区間の仕組み</h2>
      <PlainExplain>
        <p>電力会社は正時（00分・30分）を起点に30分ごとに使用電力を積算し、その区間の平均電力を「需要電力」として記録します。この値が月間最高になった時間帯の値が「最大需要電力」として翌月の基本料金を決定します。</p>
      </PlainExplain>
      <div style={{background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:'var(--radius)', padding:16}}>
        <svg viewBox="0 0 820 320" style={{width:'100%', height:'auto', display:'block'}}>
          <rect x="0" y="0" width="820" height="320" fill="#fff"/>
          {[100,140,180,220,260].map(y => (
            <line key={y} x1="70" y1={y} x2="760" y2={y} stroke="#eee" strokeWidth="1"/>
          ))}
          <line x1="70" y1="180" x2="760" y2="180" stroke="#d33" strokeWidth="2" strokeDasharray="8,4"/>
          <text x="764" y="184" fontSize="11" fill="#d33" fontWeight="700">目標300kW</text>
          <line x1="70" y1="40" x2="70" y2="280" stroke="#666" strokeWidth="1.5"/>
          <line x1="70" y1="280" x2="760" y2="280" stroke="#666" strokeWidth="1.5"/>
          {[["0分", 70], ["30分", 415], ["60分", 760]].map(([label, x]) => (
            <g key={label}>
              <line x1={x} y1="280" x2={x} y2="286" stroke="#666" strokeWidth="1.5"/>
              <text x={x} y="300" fontSize="11" fill="#666" textAnchor="middle">{label}</text>
            </g>
          ))}
          {[[400,60],[350,100],[300,180],[250,220],[200,260]].map(([label,y]) => (
            <text key={label} x="62" y={y+4} fontSize="11" fill="#666" textAnchor="end">{label}</text>
          ))}
          <text x="18" y="180" fontSize="12" fill="#666" transform="rotate(-90,18,180)">電力 [kW]</text>
          <rect x="71" y="60" width="343" height="220" fill="#fde8e8" opacity="0.5"/>
          <line x1="71" y1="60" x2="413" y2="60" stroke="#d33" strokeWidth="2.5"/>
          <text x="242" y="52" fontSize="12" fill="#d33" fontWeight="700" textAnchor="middle">第1区間 380kW（目標超過）</text>
          <rect x="414" y="196" width="345" height="84" fill="#e8f5e9" opacity="0.5"/>
          <line x1="414" y1="196" x2="759" y2="196" stroke="#2a8" strokeWidth="2.5"/>
          <text x="587" y="240" fontSize="12" fill="#2a8" fontWeight="700" textAnchor="middle">第2区間 260kW（目標内）</text>
          <line x1="414" y1="40" x2="414" y2="280" stroke="#999" strokeWidth="1.5" strokeDasharray="4,3"/>
          <text x="414" y="33" fontSize="11" fill="#999" textAnchor="middle">30分区切り</text>
          <rect x="160" y="72" width="162" height="24" rx="4" fill="#c33" opacity="0.12"/>
          <text x="241" y="88" fontSize="12" fill="#c33" fontWeight="700" textAnchor="middle">← 最大需要電力</text>
          <defs>
            <marker id="arr-d1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#c33"/>
            </marker>
          </defs>
        </svg>
        <div style={{fontSize:12, color:'var(--ink-3)', marginTop:8}}>※ 月間で最も高かった区間（第1区間・380kW）が「最大需要電力」として基本料金を決定する。</div>
      </div>

      {/* §7 R5上 問10 電力推移グラフ SVG */}
      <h2 id="r5u-graph">7. R5上 問10 の電力推移グラフ</h2>
      <PlainExplain>
        <p>9:00〜9:30の1デマンド区間内で、9:20以降に負荷を遮断する場面。前半（310kW）が目標を超えているため、後半で十分に下げなければならない。</p>
      </PlainExplain>

      {/* R5上問10型 構造表 */}
      <MemTable
        headers={["時間帯", "電力", "時間", "エネルギー"]}
        rows={[
          ["前半（9:00〜9:20）", "310kW（実測値）", "20分", "310×20 = 6,200 kW·分"],
          ["後半（9:20〜9:30）", "P kW（制御後）", "10分", "P×10 kW·分"],
          ["合計（9:00〜9:30）", <span style={{color:'#c33', fontWeight:700}}>平均 &lt; 300kW が目標</span>, "30分", <span style={{color:'#c33', fontWeight:700}}>&lt; 9,000 kW·分</span>],
        ]}
        note="後半電力P の上限：(6,200 + P×10) < 9,000 → P < 280kW"
      />
      <div style={{background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:'var(--radius)', padding:16}}>
        <svg viewBox="0 0 820 300" style={{width:'100%', height:'auto', display:'block'}}>
          <rect x="0" y="0" width="820" height="300" fill="#fff"/>
          {[80,120,160,200,240].map(y => (
            <line key={y} x1="70" y1={y} x2="750" y2={y} stroke="#eee" strokeWidth="1"/>
          ))}
          <line x1="70" y1="160" x2="750" y2="160" stroke="#d33" strokeWidth="2" strokeDasharray="8,4"/>
          <text x="754" y="164" fontSize="11" fill="#d33" fontWeight="700">300kW</text>
          <line x1="70" y1="200" x2="750" y2="200" stroke="#e6a817" strokeWidth="1.5" strokeDasharray="5,3"/>
          <text x="754" y="204" fontSize="11" fill="#e6a817">280kW</text>
          <line x1="70" y1="40" x2="70" y2="262" stroke="#666" strokeWidth="1.5"/>
          <line x1="70" y1="262" x2="750" y2="262" stroke="#666" strokeWidth="1.5"/>
          {[["9:00",70],["9:10",297],["9:20",524],["9:30",750]].map(([label,x]) => (
            <g key={label}>
              <line x1={x} y1="262" x2={x} y2="268" stroke="#666" strokeWidth="1.5"/>
              <text x={x} y="282" fontSize="11" fill="#444" textAnchor="middle">{label}</text>
            </g>
          ))}
          {[[350,64],[320,92],[310,112],[300,160],[280,200],[260,240]].map(([label,y]) => (
            <text key={label} x="62" y={y+4} fontSize="11" fill="#666" textAnchor="end">{label}</text>
          ))}
          <rect x="71" y="112" width="452" height="150" fill="#fde8e8" opacity="0.4"/>
          <line x1="71" y1="112" x2="523" y2="112" stroke="#d33" strokeWidth="3"/>
          <text x="297" y="100" fontSize="13" fill="#d33" fontWeight="700" textAnchor="middle">310kW（前半20分）</text>
          <rect x="524" y="128" width="225" height="134" fill="#e8f5e9" opacity="0.5"/>
          <line x1="524" y1="128" x2="749" y2="128" stroke="#2a8" strokeWidth="3"/>
          <text x="637" y="118" fontSize="13" fill="#2a8" fontWeight="700" textAnchor="middle">278kW（後半10分）</text>
          <line x1="524" y1="60" x2="524" y2="262" stroke="#a06" strokeWidth="2" strokeDasharray="4,3"/>
          <circle cx="524" cy="60" r="13" fill="#a06" stroke="#fff" strokeWidth="2"/>
          <text x="524" y="64" fontSize="10" fill="#fff" fontWeight="700" textAnchor="middle">遮断</text>
          <text x="524" y="44" fontSize="11" fill="#a06" textAnchor="middle">9:20</text>
          <rect x="71" y="234" width="452" height="22" fill="#fde8e8" opacity="0.6"/>
          <text x="297" y="249" fontSize="12" fill="#c33" fontWeight="700" textAnchor="middle">310×20 = 6,200 kW·分</text>
          <rect x="525" y="234" width="224" height="22" fill="#e8f5e9" opacity="0.6"/>
          <text x="637" y="249" fontSize="12" fill="#2a8" fontWeight="700" textAnchor="middle">278×10 = 2,780 kW·分</text>
          <text x="410" y="272" fontSize="12" fill="#333" textAnchor="middle">合計 8,980 kW·分 ÷ 30 = 299.3kW &lt; 300 ✓</text>
        </svg>
        <div style={{fontSize:12, color:'var(--ink-3)', marginTop:8}}>※ ファン4台(22kW) + 他10kW = 32kW停止 → 310−32 = 278kW。278 &lt; 280 ✓ 条件達成。</div>
      </div>

      {/* §8 面積モデルSVG */}
      <h2 id="calc-visual">8. 計算の構造（面積モデル）</h2>
      <PlainExplain>
        <p>「30分の平均電力 = 電力×時間の合計 ÷ 30分」は、グラフ上では<strong>面積 ÷ 時間</strong>です。前半の面積が固定されているので、後半の面積（幅10分×高さP）がどこまで許されるかが問題の核心です。</p>
      </PlainExplain>
      <div style={{background:'var(--bg-elev)', border:'1px solid var(--line)', borderRadius:'var(--radius)', padding:16}}>
        <svg viewBox="0 0 820 240" style={{width:'100%', height:'auto', display:'block'}}>
          <rect x="0" y="0" width="820" height="240" fill="#fff"/>
          <line x1="60" y1="200" x2="750" y2="200" stroke="#666" strokeWidth="1.5"/>
          <line x1="60" y1="40" x2="60" y2="200" stroke="#666" strokeWidth="1.5"/>
          <rect x="61" y="50" width="689" height="150" fill="#f7f7f7" stroke="#ccc" strokeWidth="1"/>
          <rect x="61" y="50" width="459" height="150" fill="#fde8e8" stroke="#d33" strokeWidth="1.5"/>
          <text x="290" y="128" fontSize="15" fill="#d33" fontWeight="800" textAnchor="middle">310 × 20 = 6,200 kW·分</text>
          <text x="290" y="150" fontSize="13" fill="#d33" textAnchor="middle">（前半・確定値）</text>
          <rect x="521" y="80" width="229" height="120" fill="#e8f5e9" stroke="#2a8" strokeWidth="1.5"/>
          <text x="636" y="148" fontSize="14" fill="#2a8" fontWeight="800" textAnchor="middle">P × 10 kW·分</text>
          <text x="636" y="168" fontSize="12" fill="#2a8" textAnchor="middle">P &lt; 280kW が条件</text>
          <rect x="521" y="50" width="229" height="30" fill="#fff8e1"/>
          <text x="636" y="70" fontSize="12" fill="#e6a817" fontWeight="700" textAnchor="middle">残り許容枠: &lt;2,800 kW·分</text>
          <line x1="61" y1="50" x2="749" y2="50" stroke="#a06" strokeWidth="2" strokeDasharray="8,4"/>
          <text x="610" y="44" fontSize="12" fill="#a06" fontWeight="700">上限 9,000 kW·分（30×300）</text>
          <text x="290" y="216" fontSize="12" fill="#666" textAnchor="middle">← 20分 →</text>
          <text x="636" y="216" fontSize="12" fill="#666" textAnchor="middle">← 10分 →</text>
          <line x1="520" y1="50" x2="520" y2="200" stroke="#999" strokeWidth="1.5" strokeDasharray="3,2"/>
          <text x="520" y="232" fontSize="11" fill="#555" textAnchor="middle">9:20</text>
        </svg>
        <div style={{fontSize:12, color:'var(--ink-3)', marginTop:8}}>※ 前半面積(6,200) + 後半面積(10P) &lt; 上限(9,000) → P &lt; 280kW が条件。</div>
      </div>

      {/* §9 計算ステップ詳解 */}
      <h2 id="calc-detail">9. R5上 問10 の計算ステップ詳解</h2>
      <PlainExplain>
        <p style={{margin:'0 0 10px'}}><strong>STEP 1：全体エネルギーの上限を設定</strong></p>
        <p style={{marginLeft:14, marginBottom:10, fontFamily:'monospace', fontSize:13}}>
          30分平均 &lt; 300kW<br/>
          → 合計エネルギー &lt; 300 × 30 = 9,000 kW·分
        </p>
        <p style={{margin:'0 0 10px'}}><strong>STEP 2：前半エネルギーを確定</strong></p>
        <p style={{marginLeft:14, marginBottom:10, fontFamily:'monospace', fontSize:13}}>
          前半（9:00〜9:20）: 310kW × 20分 = 6,200 kW·分
        </p>
        <p style={{margin:'0 0 10px'}}><strong>STEP 3：後半電力の上限を逆算</strong></p>
        <p style={{marginLeft:14, marginBottom:10, fontFamily:'monospace', fontSize:13}}>
          6,200 + P × 10 &lt; 9,000<br/>
          P × 10 &lt; 2,800<br/>
          P &lt; 280kW
        </p>
        <p style={{margin:'0 0 10px'}}><strong>STEP 4：必要な停止電力を算出</strong></p>
        <p style={{marginLeft:14, marginBottom:10, fontFamily:'monospace', fontSize:13}}>
          現在値310kWをP=280未満にする → 停止電力 &gt; 310 − 280 = 30kW
        </p>
        <p style={{margin:'0 0 10px'}}><strong>STEP 5：ファン停止台数を求める</strong></p>
        <p style={{marginLeft:14, marginBottom:10, fontFamily:'monospace', fontSize:13}}>
          停止電力 = 5.5X + 10 &gt; 30<br/>
          5.5X &gt; 20<br/>
          X &gt; 3.636…<br/>
          → 整数なので X = 4台（切り上げ）
        </p>
        <p style={{margin:'0 0 10px'}}><strong>検算</strong></p>
        <p style={{marginLeft:14, fontFamily:'monospace', fontSize:13}}>
          P = 310 − 5.5×4 − 10 = 310 − 32 = 278kW ✓（278 &lt; 280）<br/>
          平均 = (310×20 + 278×10) / 30 = 8,980 / 30 = 299.3kW ✓（299.3 &lt; 300）
        </p>
      </PlainExplain>

      {/* §10 デマンド制御の実務フロー */}
      <h2 id="control-flow">10. デマンド制御の実務フロー</h2>
      <PlainExplain>
        <p>工場のデマンドコントローラは30分区間の積算電力を常時監視します。目標値の80〜90%到達時点で警報を発し、ファン・空調等の非重要負荷を段階的に停止することで超過を防ぎます。</p>
      </PlainExplain>
      <MemTable
        headers={["フェーズ", "デマンドコントローラの動作", "現場対応"]}
        rows={[
          ["監視中（〜80%）", "30分積算電力を常時計測", "通常運転、特別な対応なし"],
          ["第1警報（80〜90%）", "目標値の80〜90%で予告警報", "優先度低の設備（換気ファン等）を停止準備"],
          ["第2警報（90〜100%）", "目標値の90%超で強警報", "換気ファン・付帯設備を実際に停止"],
          ["超過直前（100%近傍）", "目標値超過が確実な場合に最終警報", "空調・加熱設備等を追加停止"],
          ["区間終了（30分経過）", "積算値をリセット、最大値を記録", "停止した設備を順次復帰"],
        ]}
        note="自動制御（EMS連携）の場合は警報と負荷遮断が自動的に実行される"
      />

      {/* §11 解き方・判断手順 */}
      <h2 id="solve-flow">11. 解き方・判断手順（汎用版）</h2>
      <SolveFlow type="デマンド制御計算の汎用解法" steps={[
        "周期確認：「30分間の平均電力」が対象。時間の単位を[分]に統一",
        "目標エネルギー上限：目標値[kW] × 30分（「未満」か「以下」かに注意）",
        "前半エネルギー確定：前半電力[kW] × 前半時間[分] を計算",
        "後半電力上限を逆算：（上限エネルギー − 前半エネルギー）÷ 後半時間[分]",
        "停止電力必要量：現在電力 − 後半電力上限（不等号の向きに注意）",
        "台数計算：（必要停止電力 − 固定停止分）÷ 単位電力、小数点は切り上げ",
        "検算：後半電力P = 現在電力 − 全停止電力 を求め、上限と比較して確認",
      ]} />

      {/* §12 暗記ポイント */}
      <h2 id="memory">12. 暗記ポイント</h2>
      <MemTable
        headers={["暗記項目", "内容", "注意点"]}
        rows={[
          ["デマンド周期", "30分（正時：00分・30分起点）", "15分・60分も存在するが電験3種では30分が標準"],
          ["最大需要電力の単位", "[kW]（電力の単位）", "[kWh]（エネルギー）と混同しない"],
          ["デマンド計算の基本式", "(P₁t₁ + P₂t₂) / 30 &lt; 目標値", "時間[分]で統一すること"],
          ["切り上げの理由", "台数は整数。小数以下切り捨てでは条件未達になる", "「4台」で条件達成できても「3.64→3台」は不足"],
          ["「未満」の境界値", "P &lt; 280 → P=280はNG、平均=300kWになり「未満」不成立", "「以下」と「未満」は別物"],
          ["需要率との関係", "需要率 = 最大需要電力 ÷ 設備容量 × 100%", "最大需要電力を下げると需要率も下がる"],
        ]}
        note="デマンド制御は「最大需要電力を下げて毎月の基本料金を削減する」経営的意義もある"
      />

      {/* §13 ひっかけ表 */}
      <h2 id="traps">13. よくあるひっかけ（10項目）</h2>
      <TrapTable traps={[
        { wrong: "「未満」を「以下」と読み間違え、後半P=300kWでも目標達成と考える", correct: "後半P=300の場合：平均=(310×20+300×10)/30=306.7kW>300で条件未達。「以下」でも「未満」でもP<280（または≤280）が必要" },
        { wrong: "X=3.64 → 切り捨てで3台と答える", correct: "3台ではP=283.5kW>280で条件未達。整数台しかないので切り上げ→4台" },
        { wrong: "その他停止負荷10kWを忘れる", correct: "停止電力 = 5.5X + 10。10kWを引いてからXを求める（必要ファン停止は20kW分）" },
        { wrong: "後半10分の計算を30分で割らない", correct: "P×10 が後半エネルギー。P×30 は誤り（10分しかない）" },
        { wrong: "平均を (310+P)/2 で計算（単純平均）", correct: "時間加重平均が正しい。(310×20 + P×10)/30。区間が20:10で非均等" },
        { wrong: "最大8台を「答え=8台」と混同", correct: "8台は上限（停止可能最大数）。問いは「最低何台か」なので4台" },
        { wrong: "目標エネルギーを 300×30=9,000 以下と設定（境界値OK扱い）", correct: "「未満」なので 9,000 kW·分は含まない（< 9,000 kW·分）。合計エネルギーは8,980で条件クリア" },
        { wrong: "デマンド周期を1時間として計算", correct: "デマンド周期は30分。9:00〜9:30の30分で1区間" },
        { wrong: "ファンの電力を kW·h 扱いして計算する", correct: "5.5kW は電力。停止電力は5.5X kW であり時間をかける前の値" },
        { wrong: "停止後P=278kWなのに「280kWを下回ったから十分」と3台で答える", correct: "3台(X=3)は条件X>3.64を満たさない。3台停止ではP=310−16.5−10=283.5kW>280でNG。最低4台必要" },
      ]} />

      {/* §14 過去問 */}
      <h2 id="exam-r05u">14. 過去問：令和5年上期 問10（完成版）</h2>

      <ExamQuestion
        year="令和5年上期"
        qNum="10"
        question="ある工場では、換気用ファン（定格出力5.5kWのものが複数台設置されており、最大8台まで停止できる）を9時00分から10台運転している。この日の9時00分から9時20分の間の平均使用電力は310kWであった。9時20分から9時30分の間に、ファンを何台か停止させるとともに、その他の負荷を10kW分停止させた。9時00分から9時30分の最大需要電力を300kW未満に抑えるためには、ファンを最低何台停止させる必要があるか。"
        choices={["0台", "2台", "4台", "6台", "8台"]}
        note="最大需要電力 = 30分間の平均使用電力[kW]。時間帯に注意（前半20分・後半10分）。"
      />

      <SolveFlow type="解法" steps={[
        "目標条件：9:00〜9:30の30分間平均 < 300kW → 合計エネルギー < 9,000 kW·分",
        "前半確定：310kW × 20分 = 6,200 kW·分",
        "後半上限逆算：6,200 + P×10 < 9,000 → P×10 < 2,800 → P < 280kW",
        "停止電力必要量：310 − P > 30 → 5.5X + 10 > 30 → 5.5X > 20",
        "台数計算：X > 3.636… → 整数に切り上げ → X = 4台",
        "検算：P = 310 − 22 − 10 = 278kW < 280 ✓ → 平均 = (6,200+2,780)/30 = 299.3kW < 300 ✓",
      ]} />

      <ExamAnswer
        correct="(3) 4台"
        explanations={[
          { choice: "(1) 0台", mark: "×", reason: "ファン停止なし（10kW他負荷は停止） → P=300kW → 平均=(310×20+300×10)/30≈306.7kW > 300 NG" },
          { choice: "(2) 2台", mark: "×", reason: "P=310−11−10=289kW → 平均=(6,200+2,890)/30=303kW > 300 NG" },
          { choice: "(3) 4台", mark: "○", reason: "P=310−22−10=278kW → 平均=(6,200+2,780)/30=299.3kW < 300 ✓ 最小台数" },
          { choice: "(4) 6台", mark: "△", reason: "P=310−33−10=267kW → 条件は満たすが最小台数ではない（過剰停止）" },
          { choice: "(5) 8台", mark: "△", reason: "P=310−44−10=256kW → 条件は満たすが最小台数ではない（最大停止台数）" },
        ]}
      />

      <PlainExplain>
        <p style={{margin: '0 0 8px'}}><strong>R5上 問10 のひっかけポイント</strong></p>
        <ol style={{margin: 0, paddingLeft: 22, fontSize: 13, lineHeight: 1.9}}>
          <li><strong>3台と答えてしまう</strong>：X=3.64の小数を切り捨てると3台。しかし3台ではP=283.5kW>280で条件不達</li>
          <li><strong>10kW停止分を忘れる</strong>：停止電力=ファン分+10kW。ファンだけで30kW要と誤解しやすい（実際は20kW以上）</li>
          <li><strong>「未満」と「以下」の混同</strong>：境界値P=280kWは不可（平均がちょうど300kWになり「未満」不成立）</li>
          <li><strong>前後の時間比を無視</strong>：前半20分・後半10分の非均等。(310+P)/2=300の単純平均で解こうとする</li>
          <li><strong>8台が答えと勘違い</strong>：「最大8台まで停止できる」は条件の一部。「最低何台か」を問われている</li>
        </ol>
      </PlainExplain>

      {/* §15 類題対応シナリオ */}
      <h2 id="related-problems">15. 類題対応シナリオ</h2>
      <MemTable
        headers={["類題パターン", "何が変わるか", "解き方のポイント"]}
        rows={[
          ["① 目標値が異なる（例：280kW未満）", "上限エネルギーが変わる", "280×30=8,400 kW·分を上限に同じ手順"],
          ["② ファンの定格が異なる（例：3.7kW）", "1台あたりの停止電力が変わる", "停止必要電力÷3.7で台数計算（切り上げ同様）"],
          ["③ 前半が均一でなく段階的に変化", "エネルギーを区間ごとに分けて積算", "各段階の電力×時間を合計してから逆算"],
          ["④ 停止できる台数が限られる場合", "上限台数が制約になる", "最大台数で停止してもP>目標なら別の手段を検討"],
          ["⑤ 電流[A]や負荷量[kVA]で問われる場合", "電力換算が追加で必要", "P=√3·V·I·cosφ または P=S·cosφ から kW に変換してから計算"],
        ]}
        note="問題の本質「前半固定→後半で調整→台数切り上げ」は変わらない。入力値の変化だけに対応"
      />

      {/* §16 実務メモ */}
      <h2 id="practical">16. 実務メモ：デマンド管理システム</h2>
      <PlainExplain>
        <p>工場のEMS（エネルギー管理システム）はデマンドコントローラと連携し、30分区間の積算電力をリアルタイム監視します。デマンドを下げることで翌月以降の基本料金（需要料金）を削減できます。</p>
      </PlainExplain>
      <MemTable
        headers={["装置/機能", "目的", "動作タイミング"]}
        rows={[
          ["デマンドコントローラ", "30分積算電力の監視・警報・記録", "区間開始から常時計測"],
          ["第1警報（予告）", "目標値の80〜90%で警告を発報", "超過予測時（区間の中盤以降）"],
          ["負荷遮断（段階1）", "換気ファン・付帯設備を停止", "第1警報後・自動または手動"],
          ["負荷遮断（段階2）", "空調・加熱設備等を追加停止", "第2警報後・より大きな超過予測時"],
          ["デマンドリセット", "次の30分区間開始とともに積算リセット", "毎時00分・30分に自動実行"],
          ["月次デマンド記録", "当月の最大需要電力値を確定", "月末に確定し翌月基本料金計算に使用"],
        ]}
        note="デマンドが上がった月は翌月以降の基本料金が継続して上昇するため、管理が特に重要"
      />

      {/* §17 関連法規 */}
      <h2 id="related-laws">17. 関連法規（条文との対応）</h2>
      <MemTable
        headers={["階層", "法規・条文", "本ページとの関係"]}
        rows={[
          [<span>🟥 法律</span>, <span><strong>電気事業法</strong><br/>第39条 事業用電気工作物の維持</span>, "事業用電気工作物を技術基準に適合するよう維持する義務。施設管理の法的根拠"],
          [<span>🟥 法律</span>, <span><strong>エネルギーの使用の合理化等に関する法律（省エネ法）</strong><br/>第3条・第5条</span>, "特定事業者のエネルギー管理義務。デマンド制御による省エネの法的背景"],
          [<span>🟨 省令</span>, <span><strong>電気設備技術基準</strong><br/>第1条 定義</span>, "最大需要電力の定義が使われる文脈（施設管理全般）"],
          [<span>🟩 解釈</span>, <span><strong>電技解釈</strong><br/>第220条 電気施設管理</span>, "需要率・負荷率・不等率の概念（デマンド制御の基礎数値）"],
        ]}
        note="法規B問題（電気施設管理）は計算が中心。条文番号より概念と計算手順の理解が重要"
      />

      {/* §18 1分復習 */}
      <h2 id="quick-review">18. 1分復習</h2>
      <QuickReview showRating
        items={[
          { q: "最大需要電力の定義は？", a: "30分間の平均使用電力の最大値[kW]" },
          { q: "R5上問10の後半電力上限の計算は？", a: "(310×20 + P×10)/30 < 300 → P < 280kW" },
          { q: "なぜ4台が最小か？（3台ではダメな理由）", a: "3台停止ではP=283.5kW > 280kW で条件未達。X=3.64を切り上げて4台" },
          { q: "ファン以外の10kW停止の扱いは？", a: "停止電力 = 5.5X + 10。方程式は 5.5X + 10 > 30 → X > 3.64" },
          { q: "後半電力P=280kWのとき、30分平均は300kW未満を達成できるか？計算で答えよ", a: "NG。(310×20+280×10)/30=9000/30=300kW。300<300は成立しない（「未満」は等号NG）。P<280kW（＝4台停止でP=278kW）が必要" },
        ]}
      />

      {/* §19 掛け算出題パターン */}
      <h2 id="crossref">19. 掛け算出題パターン</h2>
      <CrossRef
        patterns={[
          { a: "デマンド制御", b: "需要率・負荷率・不等率（1.6/6.1）", result: "最大需要電力を使った需要率の算出問題と組み合わさる" },
          { a: "デマンド計算", b: "変圧器容量（6.4）", result: "最大需要電力から受電変圧器容量を逆算する設計問題" },
          { a: "ファン停止", b: "力率改善（1.5）", result: "負荷停止時の力率変化とデマンド変化を組み合わせた問題" },
          { a: "デマンドレスポンス", b: "分散型電源連系（3.7）", result: "太陽光自家消費によるデマンド低減と余剰電力逆潮流の問題" },
        ]}
      />

      <PageNav
        prevId="juden-setsubi-kanri"
        prevTitle="6.6 受電設備管理"
        nextId="kakomon-b"
        nextTitle="7.1 B問題だけ"
        onNav={onNav}
      />

      <UpdateLog entries={[
        { date: "2026-05-07", content: "初版作成 — R5上 問10（デマンド制御・最大需要電力管理）解説ページ。19セクション・SVG3枚・過去問完成版", reason: "R5上 問10 の専用解説ページ新設" }
      ]} />
    </div>
  );
}
// ─────────────────────────────────────────────
// 6. DemandKwhKisoPage（6.0 デマンド値と電力量kWhの基礎）
// ─────────────────────────────────────────────
function DemandKwhKisoPage({ onNav, data }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 6 }}>06 電気施設管理 / CH06</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>デマンド値と電力量kWh（基礎）</h1>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="rank rank-A">A</span>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>出題頻度: high（前提知識）</span>
          <span className="tag">★必須</span>
        </div>
      </div>

      <GoalQuestion
        question="ある工場で1日（24時間）に消費した電力量が 6,000 kWh、その日の最大需要電力（30分デマンド最大値）が 400 kW だった。この日の負荷率は？"
        choices={["50.0%", "62.5%", "75.0%", "87.5%"]}
        correctIndex={1}
        year="基礎理解"
        note="読み終えたら戻って解こう（kW と kWh の違いがわかれば即解ける）"
      />

      <ConclusionBox>
        <ul>
          <li><strong>kW</strong>（瞬時電力）= ある瞬間の電力。自動車の<strong>速度メーター</strong>。</li>
          <li><strong>kWh</strong>（電力量）= ある時間に使った累積エネルギー。自動車の<strong>走行距離計</strong>。</li>
          <li><strong>30分デマンド値</strong>= 30分間の<strong>平均</strong>電力 [kW]＝（30分間の使用電力量 [kWh]）× 2。</li>
          <li><strong>最大需要電力</strong>= その月の30分デマンド値の最大。請求書の「kW部分（基本料金）」を決める。</li>
          <li><strong>契約電力（500kW未満の高圧）</strong>= 当月＋過去11ヶ月の最大需要電力のうち最大値（1度ピークが出ると1年間引きずる）。</li>
          <li>⚠ <strong>法規では「使用電力量[kWh]」と「使用最大電力[kW]」の区別が狙われる</strong>（電気事業法34条の2 = 電気の使用制限等）。</li>
        </ul>
      </ConclusionBox>

      <ExamFocus items={[
        { label: "用語の区別",   value: <span><strong>使用電力量[kWh]</strong> ≠ <strong>使用最大電力[kW]</strong>。供給◯◯（電力会社側）と混同しない。</span> },
        { label: "条文",         value: <span>電気事業法<strong>34条の2</strong>（電気の使用制限等）— 主体は<strong>経済産業大臣</strong>。</span> },
        { label: "制限の3要素", value: <span><strong>使用電力量の限度</strong>／<strong>使用最大電力の限度</strong>／用途・<strong>使用停止日時</strong>。</span> },
        { label: "受電側",       value: <span><strong>受電電力の容量の限度</strong>を定めて<strong>受電を制限</strong>することも命令・勧告できる。</span> },
        { label: "命令 or 勧告", value: <span>命令<strong>または</strong>勧告（どちらも可）。「のみ命令」「のみ勧告」は誤り。</span> },
      ]} />

      <MetaStrip
        ch="CH06"
        category="06 電気施設管理"
        importance="A"
        freq="毎年（前提知識）"
        examType="A問題・B問題（計算）"
        targets="6.1〜6.6 全ページの前提"
        tags={["デマンド","kWh","負荷率","契約電力","実務直結"]}
        lastChecked="2026-05-08"
      />

      <PlainExplain>
        <p style={{ margin: '0 0 8px' }}>
          電気の請求書には <strong>kW（基本料金）</strong> と <strong>kWh（従量料金）</strong> の2つの軸がある。
          「kW＝今この瞬間どれだけ電気を引っ張ってきているか」「kWh＝ある期間に合計どれだけ使ったか」を
          切り分けて理解できれば、需要率・負荷率・不等率は全部1分で解ける。
        </p>
        <p style={{ margin: 0 }}>
          化学プラント／工場の電気主任技術者として実務でよく使うのは「<strong>30分デマンドが契約電力を超えそうだから、空調を一時停止して負荷を逃がす</strong>」という<strong>デマンドコントロール</strong>。試験範囲ではないが、なぜ30分なのかを理解すると暗記が不要になる。
        </p>
      </PlainExplain>

      <h2 id="kw-vs-kwh">1. kW と kWh の違い（瞬時値 vs 累積値）</h2>
      <MemTable
        headers={["項目", "kW（電力）", "kWh（電力量）"]}
        rows={[
          ["何を表すか",     "ある瞬間に流れる電気の量",                "ある時間に使った電気の合計"],
          ["アナロジー",     "車の速度メーター",                       "車の走行距離計（オドメータ）"],
          ["単位",           "キロワット（kJ/秒）",                    "キロワット時（kJ × 3600）"],
          ["請求書での扱い", "基本料金（最大需要電力で決まる）",        "従量料金（使った分だけ）"],
          ["変換式",         "kWh ÷ 時間 = 平均kW",                    "kW × 時間 = kWh"],
        ]}
        note="この区別を曖昧にしたまま需要率・負荷率に進むと必ず詰む。"
      />

      <h2 id="kw-kwh-deep">1.5 「時間をかければ同じ」が間違いな理由（深掘り）</h2>
      <PlainExplain>
        <p style={{ margin: '0 0 8px' }}>
          <strong>kW と kWh は「時間をかければ同じ」ではなく、次元が違う別物</strong>。
          ✕「kW × 時間 = kWh」だから kW と kWh は本質的に同じ
          → ○「kW は瞬間の流量、kWh は時間に積もった量。両者は別の物理量で、変換式は『流量を時間で積分すると量になる』という関係に過ぎない」。
        </p>
        <p style={{ margin: 0 }}>
          速度（km/h）と距離（km）の関係と同じ。「速度に時間を掛ければ距離だから、速度と距離は同じ」とは言わない。<strong>瞬間どれだけ速く動いてるか</strong>と<strong>累積でどれだけ移動したか</strong>は別の概念。
        </p>
      </PlainExplain>

      <MemTable
        headers={["観点", "kW（電力 = 流量）", "kWh（電力量 = 累積）"]}
        rows={[
          ["物理量",        "パワー P（仕事率）",                  "エネルギー W（仕事）"],
          ["微積関係",      "P = dW/dt（kWh を時間で微分）",       "W = ∫ P dt（kW を時間で積分）"],
          ["時刻指定の要否", "時刻を1つ指定する（例: 10:30 の kW）", "時間幅を指定する（例: 0〜24時の kWh）"],
          ["値の振る舞い",  "刻一刻と変動する",                    "単調増加するだけ（戻らない）"],
          ["メーター",      "デマンド計（針が動く）",              "電力量計（数字が増えるだけ）"],
          ["請求書",        "基本料金（kWでロックされる）",        "従量料金（kWhで課金）"],
        ]}
        note="次元: kW = J/s（毎秒）／ kWh = J（総量）。J/s × s = J で次元が変わるのが両者の関係。"
      />

      <PlainExplain>
        <p style={{ margin: '0 0 8px' }}>
          <strong>具体例で確認</strong>:
        </p>
        <ul style={{ margin: '0 0 8px', paddingLeft: 20 }}>
          <li>1 kW のヒーターを <strong>1時間</strong> 使う → 1 kW × 1 h = <strong>1 kWh</strong></li>
          <li>同じ 1 kW のヒーターを <strong>2時間</strong> 使う → 1 kW × 2 h = <strong>2 kWh</strong>（kWは1のまま、kWhだけ増える）</li>
          <li>2 kW のヒーターを <strong>30分</strong> 使う → 2 kW × 0.5 h = <strong>1 kWh</strong>（kWh同じでもkWは違う）</li>
        </ul>
        <p style={{ margin: 0 }}>
          つまり <strong>同じ kWh でも、短時間に集中して使えば kW は大きく、長時間に薄く使えば kW は小さい</strong>。電力会社が両方で課金するのはこのため: kWh だけ見ると「使った総量」しかわからず、瞬間ピーク（=設備負担）が見えない。kW がピーク負担を、kWh が総量を表す<strong>2軸の課金</strong>になっている。
        </p>
      </PlainExplain>

      <MemTable
        headers={["シナリオ", "kWh（同じ）", "kW（=ピーク）", "請求書での違い"]}
        rows={[
          ["A: 1kW × 24h（夜間も平均的に使用）",  "24 kWh",  "1 kW",   "kWh料金: 同じ／kW料金: 安い"],
          ["B: 24kW × 1h（昼に1時間集中使用）",   "24 kWh",  "24 kW",  "kWh料金: 同じ／kW料金: 24倍"],
        ]}
        note="同じ24kWhでもAとBで基本料金が大きく違う。これが「kWとkWhは別物」の実務的帰結。デマンドコントロールが効くのはこの構造が理由。"
      />

      <h2 id="curve-svg">2. 負荷曲線で見る（面積＝kWh、ピーク＝最大デマンド）</h2>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 24 }}>
        <svg viewBox="0 0 640 320" style={{ width: '100%', height: 'auto', maxWidth: 640, display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          {/* 軸 */}
          <line x1="60" y1="260" x2="600" y2="260" stroke="#888" strokeWidth="1.5" />
          <line x1="60" y1="60"  x2="60"  y2="260" stroke="#888" strokeWidth="1.5" />
          {/* 軸ラベル */}
          <text x="330" y="295" fontSize="12" textAnchor="middle" fill="#666">時刻 [h]</text>
          <text x="22"  y="160" fontSize="12" textAnchor="middle" fill="#666" transform="rotate(-90 22 160)">電力 [kW]</text>
          <text x="60"  y="278" fontSize="10" textAnchor="middle" fill="#888">0</text>
          <text x="330" y="278" fontSize="10" textAnchor="middle" fill="#888">12</text>
          <text x="600" y="278" fontSize="10" textAnchor="middle" fill="#888">24</text>
          {/* 負荷曲線 */}
          <path
            d="M 60 240 L 130 235 L 180 200 L 230 150 L 280 110 L 330 90 L 370 120 L 410 160 L 450 130 L 490 170 L 540 220 L 600 245"
            fill="rgba(74,144,226,0.16)"
            stroke="#4a90e2"
            strokeWidth="2"
          />
          {/* 平均線 */}
          <line x1="60" y1="175" x2="600" y2="175" stroke="#888" strokeWidth="1" strokeDasharray="4,3" />
          <text x="62"  y="170" fontSize="10" textAnchor="start" fill="#666">平均負荷</text>
          {/* 30分ブロック（ピーク位置） */}
          <rect x="310" y="80" width="40" height="180" fill="rgba(217,84,84,0.10)" stroke="#d95454" strokeWidth="1" strokeDasharray="2,2" />
          {/* ピーク点 */}
          <circle cx="330" cy="90" r="5" fill="#d95454" />
          <line x1="330" y1="90" x2="330" y2="260" stroke="#d95454" strokeWidth="1" strokeDasharray="3,3" />
          {/* ピーク注記（吹き出し風・右下に配置して曲線と被らせない） */}
          <line x1="330" y1="90" x2="450" y2="40" stroke="#d95454" strokeWidth="0.8" />
          <rect x="450" y="22" width="180" height="36" rx="4" fill="#fff" stroke="#d95454" strokeWidth="1" />
          <text x="540" y="38" fontSize="11" textAnchor="middle" fill="#d95454" fontWeight="700">★ 最大需要電力</text>
          <text x="540" y="52" fontSize="10" textAnchor="middle" fill="#d95454">（30分デマンド最大）</text>
          {/* 30分平均ラベル（ブロック直下に配置） */}
          <text x="330" y="74" fontSize="10" textAnchor="middle" fill="#d95454">30分平均</text>
          {/* 面積ラベル（曲線下の中央寄り低い位置） */}
          <text x="180" y="245" fontSize="13" textAnchor="middle" fill="#2a6db6" fontWeight="700">面積 = 1日の総kWh</text>
        </svg>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 8, textAlign: 'center' }}>
          青の曲線=瞬時電力。曲線下の面積=その日の総kWh。30分ブロックの平均値の最大=その日の最大デマンド値。
        </div>
      </div>

      <h2 id="demand30">3. なぜ「30分」なのか</h2>
      <PlainExplain>
        <p style={{ margin: '0 0 8px' }}>
          30分という刻みは <strong>電力会社の課金単位</strong>。電子式電力量計が30分ごとに使用電力量を区切って積算し、その値を2倍したものを「その30分間の平均電力（30分デマンド値）」として記録する。
          毎時 <strong>0〜30分・30〜60分</strong> の固定境界で区切られる（任意の30分窓ではない）。
        </p>
        <p style={{ margin: 0 }}>
          5分や10分にすると<strong>瞬間的な突入電流</strong>でデマンドが跳ね上がってしまい不公平。1時間以上にすると<strong>ピーク制御の応答時間</strong>として粗すぎる。30分は両者の妥協点として歴史的に定着した。
        </p>
      </PlainExplain>

      <h2 id="contract">4. 最大需要電力と契約電力</h2>
      <MemTable
        headers={["用語", "決まり方", "請求書での役割"]}
        rows={[
          ["30分デマンド値",   "30分平均電力 [kW]（=その30分のkWh × 2）",                "計測の最小単位"],
          ["最大需要電力",     "その月のデマンド値のうち最大",                            "その月の基本料金kW部分"],
          ["契約電力（500kW未満）", "当月＋過去11ヶ月の最大需要電力の最大値",            "1度ピークが出ると12ヶ月引きずる"],
          ["契約電力（500kW以上）", "電力会社と協議して決定（協議制契約電力）",          "デマンドではなく事前協議で固定"],
        ]}
        note="500kW未満の高圧需要家は「実量制契約」と呼ばれ、デマンド値が直接契約電力になる。"
      />

      <h2 id="usage-vs-peak">4.5 「使用電力量」と「使用最大電力」（法規用語の対比）</h2>
      <PlainExplain>
        <p style={{ margin: 0 }}>
          法規の条文は kWh / kW を「<strong>使用電力量</strong>」「<strong>使用最大電力</strong>」と書く。
          意味は同じだが、試験では <strong>用語の取り違え</strong> が頻出。さらに需要家側「使用◯◯」と電力会社側「<strong>供給◯◯</strong>」も別物。
        </p>
      </PlainExplain>

      <MemTable
        headers={["法規用語", "単位", "工学用語", "性質", "デマンド管理との関係"]}
        rows={[
          [
            <strong>使用電力量</strong>,
            "kWh",
            "電力量・エネルギー",
            "ある期間に積み上がった総量（累積）",
            "従量料金の根拠。デマンド管理とは直接関係なし",
          ],
          [
            <strong>使用最大電力</strong>,
            "kW",
            "最大需要電力（30分デマンド最大）",
            "ある瞬間（30分平均）でのピーク",
            "★デマンド管理の対象。基本料金・契約電力を決める",
          ],
          [
            "供給電力量",
            "kWh",
            "（電力会社側）",
            "電力会社が需要家に供給した総量",
            "需要家側の『使用電力量』と混同注意",
          ],
          [
            "供給最大電力",
            "kW",
            "（電力会社側）",
            "電力会社が同時に供給したピーク",
            "需要家側の『使用最大電力』と混同注意",
          ],
        ]}
        note="34条の2では『使用◯◯』が制限対象。需要家視点の語であることに注意。"
      />

      <h2 id="demand-control">5. デマンドコントローラ（実務）</h2>
      <PlainExplain>
        <p style={{ margin: '0 0 8px' }}>
          化学プラント／工場の電気主任技術者は <strong>デマンド監視装置</strong> を受電盤に設置する。
          30分の経過時間と現在の積算電力量から「このペースだと30分後にデマンド値がいくらになるか」を予測し、
          設定値を超えそうなら<strong>警報→自動的に優先度の低い負荷を遮断</strong>する仕組み。
        </p>
        <p style={{ margin: 0 }}>
          典型的に切られるのは <strong>空調・電気炉・電気温水器</strong> など蓄熱性のある負荷（数十秒止めても影響が出にくい）。
          逆に切ってはいけないのは <strong>計装用電源・冷却系・反応プロセス</strong>（即停止＝品質事故）。
        </p>
      </PlainExplain>

      <h2 id="bridge">6. 需要率・負荷率・不等率（言葉と公式のリンク）</h2>
      <PlainExplain>
        <p style={{ margin: '0 0 6px' }}>
          <strong>公式を覚える前に「言葉が何を聞いているか」を掴む</strong>のがコツ。
          各指標は「<strong>分母に対して分子がどれだけか</strong>」という<strong>％の話</strong>。
          分母＝<strong>もしフル稼働したら</strong>の値、分子＝<strong>実際の値</strong>、と読むと公式が直感に直結する。
        </p>
      </PlainExplain>

      <MemTable
        headers={["指標", "言葉の問い", "分母（=もし最悪なら）", "分子（=実際）", "公式"]}
        rows={[
          [
            <strong>需要率</strong>,
            "設備のうち、ピークでどれだけ使った？",
            "設備容量の合計（全部一斉に動いたらこの kW）",
            "実際の最大需要電力（30分デマンド最大）",
            "最大需要 ÷ 設備容量",
          ],
          [
            <strong>負荷率</strong>,
            "ピークに対して、平均はどれだけ近い？（＝設備をどれだけ平らに使った？）",
            "最大需要電力（ずっとピークで動いたらこの kW）",
            "平均需要電力（総kWh ÷ 時間）",
            "平均需要 ÷ 最大需要",
          ],
          [
            <strong>不等率</strong>,
            "複数需要家のピークは、どれだけ時間がずれてる？",
            "合成最大需要電力（全員のピークを合計した時刻の値）",
            "Σ各需要家の最大需要電力（個別ピークの単純合計）",
            "Σ各最大 ÷ 合成最大（≧ 1）",
          ],
        ]}
        note="負荷率＝平均/最大が低い → 設備に余裕アリだが基本料金がもったいない。不等率＝1 なら全員同時刻にピーク（最悪）、>1 なら時間差で抑えられる（良）。"
      />

      <h2 id="bridge-why">6.5 なぜこの公式になるのか（直感）</h2>
      <MemTable
        headers={["指標", "1秒で思い出すフレーズ", "公式が浮かぶ手順"]}
        rows={[
          [
            "需要率",
            "「設備のうち何％動いた？」",
            "全部動いたら設備容量[kW] → 実際は最大需要[kW] → 比 = 最大需要 ÷ 設備容量",
          ],
          [
            "負荷率",
            "「ピーク基準で、平均はどれだけ？」",
            "ピーク[kW] が分母（理想なら24h これ） → 実際の平均[kW] が分子 → 比 = 平均 ÷ 最大",
          ],
          [
            "不等率",
            "「ピークがずれた分、合計より小さくなる」",
            "個別ピークを足したら[kW合計] → 合成（実際の同時最大）はそれより小さい[kW] → 比 = 個別合計 ÷ 合成（必ず ≧ 1）",
          ],
        ]}
        note="共通: 分母 = もし最悪なら の値・分子 = 実際の値。「最悪 vs 実際」で公式の上下が決まる。"
      />

      <h2 id="practical">6.6 数値から実務判断（化学プラント／工場の現場で何が決まるか）</h2>
      <PlainExplain>
        <p style={{ margin: 0 }}>
          需要率・負荷率・不等率の値は<strong>「設備容量の妥当性」「契約電力の見直し可否」「デマンドコントロール投資の費用対効果」</strong>を判断する物差し。
          試験では公式を答えるが、実務ではここからが本番。代表値と判断基準を以下に示す。
        </p>
      </PlainExplain>

      <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>需要率の判断基準</h3>
      <MemTable
        headers={["値", "意味", "実務判断", "アクション"]}
        rows={[
          [
            "30〜50%",
            "設備の半分以下しか同時稼働していない",
            "過剰設備の疑い。新設・更新時に容量見直しの余地",
            "次回更新時に小型機種へダウンサイジング検討。投資効率〇",
          ],
          [
            "50〜70%",
            "一般的な工場の標準範囲",
            "妥当。上位トランス容量も問題なし",
            "現状維持。需要増の予兆だけウォッチ",
          ],
          [
            "70〜85%",
            "高負荷率な化学プラント・連続運転設備",
            "余裕は少ない。新規負荷追加で容量超過リスク",
            "トランス余力を確認。新規設備計画は事前に容量試算",
          ],
          [
            "85%超",
            "ほぼフル稼働状態",
            "上位トランスの更新・容量増設を検討すべき領域",
            "✕容量増設計画／✕系統分割／予備機の事前手配",
          ],
        ]}
        note="化学プラントの連続運転ラインは70-85%が普通。バッチ系工場は40-60%が多い。"
      />

      <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>負荷率の判断基準</h3>
      <MemTable
        headers={["値", "意味", "実務判断", "アクション"]}
        rows={[
          [
            "30〜40%",
            "ピークだけ高く、平均は低い（昼夜の差が大）",
            "デマンド削減の効果が大きい。基本料金が割高",
            "○蓄熱式空調／○ピークシフト／○デマンドコントローラ導入。ROI 高い",
          ],
          [
            "40〜60%",
            "一般的な事業所・工場の標準",
            "妥当。改善余地は中程度",
            "デマンド警報設定を見直し、空調の段階制御で5-10%改善狙い",
          ],
          [
            "60〜80%",
            "24時間連続運転に近い",
            "既に効率的。デマンド削減の効果は限定的",
            "新規導入よりも、既存ピーク時刻の負荷再配置で微調整",
          ],
          [
            "80%超",
            "理想的な平準化（連続運転の化学プラント等）",
            "デマンドコントロール投資の効果は薄い",
            "投資より運転改善・力率改善で電気料金削減を狙う",
          ],
        ]}
        note="負荷率が低いほど『ピークだけ高い』状態。基本料金=最大需要電力で決まるので、低負荷率はムダの温床。"
      />

      <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>不等率の判断基準（受電設備容量に直結）</h3>
      <MemTable
        headers={["値", "意味", "上位トランス容量への影響", "判断"]}
        rows={[
          [
            "1.0〜1.1",
            "全需要家がほぼ同時刻にピーク",
            "上位トランスは Σ各最大 に近い容量が必要",
            "✕余裕なし。系統増強・分割を検討",
          ],
          [
            "1.1〜1.3",
            "ピークが少しずれる（一般的な工場群）",
            "上位トランスは Σ各最大 ÷ 1.2 程度で足りる",
            "○妥当。現状維持",
          ],
          [
            "1.3〜1.5",
            "ピークが分散（運転スケジュールが工夫されている）",
            "Σ各最大 ÷ 1.4 程度で足りる、容量に余裕アリ",
            "○余裕アリ。次回更新で容量見直しの余地",
          ],
          [
            "1.5超",
            "ピークが大きくバラけている",
            "上位トランスは大幅にダウンサイジング可能",
            "○再エネ連系・蓄電池追加など新規負荷の余地大",
          ],
        ]}
        note="不等率は1以上（必ず）。高いほど時間差で電力ピークが分散＝上位トランスに優しい。"
      />

      <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>3指標を組み合わせた実務判断フロー</h3>
      <SolveFlow
        type="工場の電気主任技術者の判断手順"
        steps={[
          "Step1: 需要率 > 85% → 上位トランス容量超過リスク。**容量増設または系統分割が最優先**。",
          "Step2: 需要率 < 70% かつ 負荷率 < 40% → ピークだけ高い過剰設備。**デマンドコントローラ・蓄熱化でROI大**。",
          "Step3: 不等率 < 1.1 → 全需要家が同時にピーク。**運転スケジュール調整**で時差ピークを作る。",
          "Step4: 負荷率 > 70% → 既に平準化済。**改善は力率改善や運転点最適化に振る**。",
          "Step5: 力率改善・需要家分割・契約電力見直しを年1回の保守計画に組み込む。",
        ]}
      />

      <PlainExplain>
        <p style={{ margin: 0 }}>
          <strong>例: 化学プラントで「需要率72% / 負荷率55% / 不等率1.25」のとき</strong>
          → 需要率は許容範囲・負荷率は改善余地中・不等率は標準。
          → 結論: 「上位トランス容量は問題ない／新規負荷追加は容量試算後OK／デマンド警報の閾値を再調整して年5%程度のkW削減を狙う」。
          このように<strong>3つの数値だけで投資判断・容量判断・運転改善の優先順位が決まる</strong>のが施設管理の核心。
        </p>
      </PlainExplain>

      <h2 id="example">7. 計算例</h2>
      <SolveFlow
        type="ゴール問題の解き方"
        steps={[
          "1日の総使用電力量 = 6,000 kWh、最大需要電力 = 400 kW（与件）",
          "1日の平均需要電力 = 6,000 kWh ÷ 24 h = 250 kW",
          "負荷率 = 平均需要電力 ÷ 最大需要電力 = 250 ÷ 400 = 0.625",
          "答: 62.5%",
        ]}
      />

      <h2 id="exam-r05-1-11">8. 過去問: R05上 問11 B問題（合成需要率・総合負荷率）</h2>
      <PlainExplain>
        <p style={{ margin: 0 }}>
          A工場（設備容量 <strong>400 kW</strong>）とB工場（設備容量 <strong>700 kW</strong>）の合成負荷曲線が次のように与えられた:
          <br />
          0〜6時 = 700 kW ／ 6〜12時 = 500 kW ／ 12〜18時 = 600 kW ／ 18〜24時 = 700 kW
        </p>
      </PlainExplain>

      <ExamQuestion
        year="R05上 問11(a)"
        question="A工場とB工場を合わせた需要率 [%] の値として最も近いものはどれか。"
        choices={[
          { text: "54.5" },
          { text: "56.8" },
          { text: "63.6", correct: true },
          { text: "89.3" },
          { text: "90.4" },
        ]}
        note="合成最大需要電力 ÷ 設備容量合計"
      />
      <ExamAnswer
        correct="(3) 63.6 [%]"
        explanations={[
          { choice: "Step1", mark: "○", reason: "合成負荷曲線の最大値 = 700 kW（0〜6時 / 18〜24時）" },
          { choice: "Step2", mark: "○", reason: "設備容量合計 = 400 + 700 = 1,100 kW" },
          { choice: "Step3", mark: "○", reason: "需要率 = 700 ÷ 1,100 = 0.6363… ≒ 63.6%" },
        ]}
      />

      <ExamQuestion
        year="R05上 問11(b)"
        question="A工場とB工場を合わせた総合負荷率 [%] の値として最も近いものはどれか。"
        choices={[
          { text: "56.8" },
          { text: "63.6" },
          { text: "78.1" },
          { text: "89.3", correct: true },
          { text: "91.6" },
        ]}
        note="平均需要電力 ÷ 合成最大需要電力。各時間帯6時間ずつなので算術平均でOK"
      />
      <ExamAnswer
        correct="(4) 89.3 [%]"
        explanations={[
          { choice: "Step1", mark: "○", reason: "平均需要電力 = (700 + 500 + 600 + 700) ÷ 4 = 625 kW（各6時間で等分なので単純平均）" },
          { choice: "Step2", mark: "○", reason: "合成最大需要電力 = 700 kW（(a)と同じ）" },
          { choice: "Step3", mark: "○", reason: "総合負荷率 = 625 ÷ 700 = 0.8928… ≒ 89.3%" },
          { choice: "盲点",  mark: "⚠", reason: "「平均=総kWh÷総時間」も同値: kWh = 700×6 + 500×6 + 600×6 + 700×6 = 15,000 kWh、15,000÷24 = 625 kW" },
        ]}
      />

      <h2 id="law-34-2">9. 電気事業法34条の2（電気の使用制限等）試験ポイント</h2>

      <LawSource
        title="電気事業法 第34条の2（電気の使用制限等）"
        text={"経済産業大臣は、電気の需給の調整を行わなければ電気の供給の不足が国民経済及び国民生活に悪影響を及ぼし、公共の利益を阻害するおそれがあると認められるときは、その事態を克服するため必要な限度において、政令で定めるところにより、使用電力量の限度、使用最大電力の限度、用途若しくは使用を停止すべき日時を定めて、小売電気事業者、一般送配電事業者若しくは登録特定送配電事業者から電気の供給を受ける者に対し、小売電気事業者等の供給する電気の使用を制限すべきこと又は受電電力の容量の限度を定めて、小売電気事業者等からの受電を制限すべきことを命じ、又は勧告することができる。"}
        source="e-Gov 電気事業法（昭和三十九年法律第百七十号）"
        confirmedAt="2026-05-08"
      />

      <PlainExplain>
        <p style={{ margin: 0 }}>
          穴埋め問題（H24 問1 など）で頻出。<strong>主体・制限対象・措置の3点セット</strong>を語句単位で覚える。
          「経済産業大臣」「使用電力量」「使用最大電力」「日時」「受電」が定番の空欄候補。
        </p>
      </PlainExplain>

      <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>重要語句セット（空欄候補）</h3>
      <MemTable
        headers={["位置", "語句", "ひっかけ候補", "ポイント"]}
        rows={[
          ["主体",      <strong>経済産業大臣</strong>,    "総務大臣／環境大臣／経済産業省令", "省令ではなく『大臣』が主語"],
          ["制限①",    <strong>使用電力量</strong>,      "供給電力量／消費電力",            "kWh のこと。需要家側の語"],
          ["制限②",    <strong>使用最大電力</strong>,    "供給最大電力／契約電力",          "kW のこと。需要家側の語"],
          ["制限③",    <strong>日時</strong>,            "期間／時間帯のみ",                "『日時』で覚える"],
          ["手段",      <strong>受電</strong>,            "送電／配電",                       "需要家が受け取る側＝『受電』"],
          ["命令形式",  <strong>命じ、又は勧告</strong>,  "命令のみ／勧告のみ",               "両方あり（ORで覚える）"],
        ]}
        note="条文の文末『〜命じ、又は勧告することができる』も穴埋め頻出。"
      />

      <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>覚え方（語呂・構造）</h3>
      <PlainExplain>
        <p style={{ margin: '0 0 8px' }}>
          <strong>「経産大臣が、量・最大・日時・受電を制限／勧告」</strong>。
          量＝<strong>使用電力量</strong>[kWh]、最大＝<strong>使用最大電力</strong>[kW]、日時＝停止日時、受電＝受電容量。
        </p>
        <p style={{ margin: 0 }}>
          発動条件は「<strong>需給調整しないと供給不足→国民経済・国民生活に悪影響→公共の利益を阻害する恐れ</strong>」のとき。平常時には発動しない。
        </p>
      </PlainExplain>

      <h2 id="traps">よくあるひっかけ</h2>
      <TrapTable traps={[
        { wrong: "30分デマンド値はその30分間の最大瞬時電力",            correct: "30分間の平均電力（瞬時値ではない）" },
        { wrong: "kWとkWhは時間をかければ同じもの",                    correct: "kWは瞬時値・kWhは積算値。次元が違う（速度と距離の関係）" },
        { wrong: "「使用電力量」と「使用最大電力」は同じ",              correct: "別物。使用電力量=kWh（累積）／使用最大電力=kW（ピーク）" },
        { wrong: "「使用電力量」と「供給電力量」は同じ",                correct: "需要家側『使用◯◯』／電力会社側『供給◯◯』。法規は需要家側を制限" },
        { wrong: "34条の2は経済産業省令で電気使用を制限する",          correct: "経済産業『大臣』が命令／勧告。省令ではない" },
        { wrong: "34条の2は命令だけ／勧告だけ",                         correct: "命令『又は』勧告。両方ありえる" },
        { wrong: "契約電力は毎月のデマンド最大値そのもの",              correct: "過去12ヶ月の最大値（1度のピークが1年間続く）" },
        { wrong: "デマンド値は任意の連続30分間で計算する",              correct: "毎時0〜30分・30〜60分の固定境界で区切る" },
        { wrong: "1日の平均需要電力 = 24時間中のデマンド値の平均",      correct: "1日の総kWh ÷ 24h（kWh→kW変換が必須）" },
      ]} />

      <h2 id="quick-review">1分復習</h2>
      <QuickReview items={[
        { q: "kW と kWh の違いを1行で？",                                         a: "kW は瞬時電力（速度）、kWh は累積電力量（距離）。次元が違う別物" },
        { q: "「使用電力量」と「使用最大電力」の単位はそれぞれ？",                 a: "使用電力量 = kWh（累積）／使用最大電力 = kW（30分平均のピーク）" },
        { q: "電気事業法34条の2 で電気使用を制限・勧告できるのは誰？",            a: "経済産業大臣（『大臣』が主語。省令ではない）" },
        { q: "34条の2 で制限の対象として条文に並ぶ3要素は？",                     a: "①使用電力量の限度／②使用最大電力の限度／③（用途・）使用停止の日時。さらに受電容量の限度も別途定められる" },
        { q: "「使用電力量」と「供給電力量」はどう違う？",                          a: "使用◯◯=需要家側／供給◯◯=電力会社側。34条の2 が制限するのは需要家側『使用◯◯』" },
      ]} />

      <h2 id="related-pages">関連ページ</h2>
      <RelatedPages
        items={[
          { id: 'juyoritsu-gainen', title: '6.1 需要率・負荷率・不等率（概念）', relation: '次のステップ：3指標の使い分け' },
          { id: 'juyoritsu-keisan', title: '1.6 需要率・負荷率・不等率（計算）', relation: 'B問題対策（最頻出）' },
          { id: 'furitsu',          title: '6.2 負荷率',                         relation: '深掘り：平均/最大の比' },
          { id: 'futorito',         title: '6.3 不等率',                         relation: '深掘り：合成最大の話' },
          { id: 'ryokuritsu-kaizen', title: '1.5 力率改善',                       relation: 'デマンド削減の代表手法' },
        ]}
        onNav={onNav}
      />

      <UpdateLog entries={[
        { date: "2026-05-08", content: "初版作成（6.0 基礎ページ）", reason: "需要率・負荷率の前提概念が独立ページとして欠落していたため" },
      ]} />

      <PageNav
        prevId="top"               prevTitle="トップ"
        nextId="juyoritsu-gainen"  nextTitle="6.1 需要率・負荷率・不等率（概念）"
        onNav={onNav}
      />
    </div>
  );
}

