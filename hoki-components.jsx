// hoki-components.jsx
// 法規Wikiコンポーネント定義ファイル（Babel CDN変換前提）
// import文なし — React/ReactDOMはグローバル変数として利用

// ============================================================
// 1. テンプレートコンポーネント
// ============================================================

function GoalQuestion({ question, choices, year, note }) {
  return (
    <div className="goal-question">
      <div className="goal-label">🎯 ゴール問題 — このページを読み終えたらこの問題に戻ろう</div>
      {year && <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '6px' }}>{year}</div>}
      <p className="goal-q">{question}</p>
      {choices && choices.length > 0 && (
        <details className="goal-choices">
          <summary>選択肢を表示</summary>
          <ol style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '13px', lineHeight: '1.7' }}>
            {choices.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ol>
        </details>
      )}
      {note && <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '8px' }}>{note}</div>}
    </div>
  );
}

function ConclusionBox({ children }) {
  return (
    <div className="conclusion-box">
      <div className="conclusion-label">まず覚える結論</div>
      <div style={{ fontSize: '14px', lineHeight: '1.8' }}>{children}</div>
    </div>
  );
}

function MetaStrip({ ch, category, importance, freq, examType, targets, tags, lastChecked }) {
  const importanceBg = importance === 'S' ? 'var(--rank-s-bg)' :
                       importance === 'A' ? 'var(--rank-a-bg)' :
                       importance === 'B' ? 'var(--rank-b-bg)' : 'var(--bg-2)';
  const rows = [
    ch && ['チャプター', ch],
    category && ['カテゴリ', category],
    importance && ['重要度', <span style={{ background: importanceBg, padding: '1px 8px', borderRadius: '4px', fontWeight: '700' }}>{importance}</span>],
    freq && ['出題頻度', freq],
    examType && ['問題形式', examType],
    targets && ['対象', Array.isArray(targets) ? targets.join(' / ') : targets],
    tags && ['タグ', Array.isArray(tags) ? tags.join(', ') : tags],
    lastChecked && ['最終確認', lastChecked],
  ].filter(Boolean);

  return (
    <table className="meta-strip-table">
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i}>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ExamFocus({ items }) {
  return (
    <div className="exam-focus">
      <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '10px', color: 'var(--ink-2)' }}>試験で問われること</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td style={{ padding: '6px 10px', width: '120px', color: 'var(--ink-3)', borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                {item.label}
              </td>
              <td style={{ padding: '6px 10px', borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LawSource({ title, text, source, confirmedAt }) {
  const fullTitle = confirmedAt ? `${title}（確認日: ${confirmedAt}）` : title;
  return (
    <details style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', marginBottom: '24px' }}>
      <summary style={{ padding: '10px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: 'var(--ink-2)' }}>
        📄 {fullTitle}
      </summary>
      <div style={{ padding: '14px 18px', fontSize: '13px', lineHeight: '1.8', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
      {source && (
        <div style={{ padding: '6px 18px 10px', fontSize: '11px', color: 'var(--ink-3)' }}>出典: {source}</div>
      )}
    </details>
  );
}

function PlainExplain({ children }) {
  return (
    <div style={{
      background: 'var(--bg-elev)',
      border: '1px solid var(--line)',
      borderLeft: '3px solid var(--ink-3)',
      borderRadius: 'var(--radius)',
      padding: '14px 18px',
      marginBottom: '24px',
      fontSize: '14px',
      lineHeight: '1.8',
    }}>
      <div style={{ fontWeight: '600', fontSize: '12px', color: 'var(--ink-3)', marginBottom: '6px', letterSpacing: '0.05em' }}>かみ砕き解説</div>
      {children}
    </div>
  );
}

function MemTable({ headers, rows, note }) {
  return (
    <div style={{ marginBottom: '24px', overflowX: 'auto' }}>
      <table className="mini-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'auto' }}>
        {headers && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{ padding: '8px 12px', background: 'var(--bg-2)', borderBottom: '2px solid var(--line)', textAlign: 'left', fontSize: '12px', color: 'var(--ink-2)', wordBreak: 'break-word' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {(Array.isArray(row) ? row : [row]).map((cell, ci) => (
                <td key={ci} style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', verticalAlign: 'top', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '6px' }}>{note}</div>}
    </div>
  );
}

function SolveFlow({ type, steps }) {
  return (
    <div style={{
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: '16px 20px',
      marginBottom: '24px',
    }}>
      <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--accent)', marginBottom: '12px', letterSpacing: '0.05em' }}>
        解き方・判断手順 {type && `（${type}）`}
      </div>
      <ol style={{ paddingLeft: '20px', margin: 0 }}>
        {steps.map((step, i) => (
          <li key={i} style={{ fontSize: '13px', lineHeight: '1.8', paddingBottom: '4px' }}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function TrapTable({ traps }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--warn)', marginBottom: '8px' }}>⚠ よくあるひっかけ</div>
      <table className="trap-table">
        <thead>
          <tr>
            <th style={{ padding: '8px 12px', background: '#fff5f5', color: 'var(--warn)', fontSize: '12px', textAlign: 'left', border: '1px solid var(--line)' }}>
              × 誤り
            </th>
            <th style={{ padding: '8px 12px', background: '#f0fff4', color: 'var(--good)', fontSize: '12px', textAlign: 'left', border: '1px solid var(--line)' }}>
              ○ 正しい
            </th>
          </tr>
        </thead>
        <tbody>
          {traps.map((trap, i) => (
            <tr key={i}>
              <td className="trap-wrong" style={{ border: '1px solid var(--line)' }}>{trap.wrong}</td>
              <td className="trap-correct" style={{ border: '1px solid var(--line)' }}>{trap.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExamQuestion({ year, qNum, question, choices, note }) {
  return (
    <div style={{
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: '16px 20px',
      marginBottom: '16px',
      background: 'var(--bg-2)',
    }}>
      <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginBottom: '6px' }}>
        {year && <span style={{ marginRight: '8px' }}>{year}</span>}
        {qNum && <span>問{qNum}</span>}
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 10px' }}>{question}</p>
      {choices && choices.length > 0 && (
        <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', lineHeight: '1.7' }}>
          {choices.map((c, i) => (
            <li key={i} data-correct={c.correct ? 'true' : undefined}>
              {c.text || c}
            </li>
          ))}
        </ol>
      )}
      {note && <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '10px' }}>{note}</div>}
    </div>
  );
}

function ExamAnswer({ correct, explanations }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        display: 'inline-block',
        background: 'var(--good)',
        color: '#fff',
        fontWeight: '700',
        fontSize: '13px',
        padding: '4px 12px',
        borderRadius: 'var(--radius)',
        marginBottom: '12px',
      }}>
        正解: {correct}
      </div>
      {explanations && explanations.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <tbody>
            {explanations.map((ex, i) => (
              <tr key={i} style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                <td style={{ padding: '8px 10px', width: '40px', fontWeight: '700', textAlign: 'center' }}>{ex.choice}</td>
                <td style={{
                  padding: '8px 10px',
                  width: '30px',
                  color: ex.mark === '○' ? 'var(--good)' : 'var(--warn)',
                  fontWeight: '700',
                  fontSize: '15px',
                }}>
                  {ex.mark}
                </td>
                <td style={{ padding: '8px 10px', lineHeight: '1.7' }}>{ex.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function QuickReview({ items }) {
  const limited = items.slice(0, 5);
  return (
    <div className="quick-review" style={{ marginBottom: '24px' }}>
      <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '10px', color: 'var(--ink-2)' }}>1分復習</div>
      {limited.map((item, i) => (
        <details key={i} className="quick-review">
          <summary>Q{i + 1}: {item.q}　（クリックで答えを確認）</summary>
          <div className="quick-review-answer">A: {item.a}</div>
        </details>
      ))}
    </div>
  );
}

function CrossRef({ patterns }) {
  return (
    <div className="cross-ref">
      <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--ink-2)', marginBottom: '10px', letterSpacing: '0.05em' }}>
        掛け算出題パターン
      </div>
      {patterns.map((p, i) => (
        <div key={i} className="cross-ref-item">
          <span style={{ color: 'var(--accent)' }}>{p.a}</span>
          <span style={{ margin: '0 6px', color: 'var(--ink-3)' }}>×</span>
          <span style={{ color: 'var(--accent)' }}>{p.b}</span>
          <span style={{ margin: '0 6px', color: 'var(--ink-3)' }}>→</span>
          <span>{p.result}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedPages({ items, onNav }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '10px', color: 'var(--ink-2)' }}>関連ページ</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => onNav && onNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
          >
            <span style={{ color: 'var(--accent)', fontWeight: '600' }}>→</span>
            <span style={{ flex: 1, fontWeight: '600' }}>{item.title}</span>
            {item.relation && <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{item.relation}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function NextAction({ nextPageId, nextPageTitle, onNav }) {
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleScrollRelated = () => {
    const el = document.getElementById('related-pages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="next-action">
      {nextPageId && nextPageTitle && (
        <div
          className="next-action-card"
          onClick={() => onNav && onNav(nextPageId)}
        >
          <div className="next-action-key">A</div>
          <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>次のページへ進む</div>
          <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{nextPageTitle}</div>
        </div>
      )}
      <div className="next-action-card" onClick={handleScrollTop}>
        <div className="next-action-key">B</div>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>ゴール問題をもう一度解く</div>
        <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>ページ先頭に戻る</div>
      </div>
      <div className="next-action-card" onClick={handleScrollRelated}>
        <div className="next-action-key">C</div>
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>関連ページで横断学習</div>
        <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>関連ページセクションへ</div>
      </div>
    </div>
  );
}

function UpdateLog({ entries }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: 'var(--radius)',
        padding: '10px 14px',
        fontSize: '12px',
        marginBottom: '10px',
        color: '#856404',
      }}>
        ⚠ 法令改正に注意。掲載内容は確認日時点のものです。
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px 12px', background: 'var(--bg-2)', textAlign: 'left', fontSize: '12px', color: 'var(--ink-2)', borderBottom: '2px solid var(--line)', width: '120px' }}>日付</th>
            <th style={{ padding: '8px 12px', background: 'var(--bg-2)', textAlign: 'left', fontSize: '12px', color: 'var(--ink-2)', borderBottom: '2px solid var(--line)' }}>内容</th>
            <th style={{ padding: '8px 12px', background: 'var(--bg-2)', textAlign: 'left', fontSize: '12px', color: 'var(--ink-2)', borderBottom: '2px solid var(--line)', width: '160px' }}>理由</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{entry.date}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)' }}>{entry.content}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', color: 'var(--ink-3)', fontSize: '12px' }}>{entry.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageNav({ prevId, prevTitle, nextId, nextTitle, onNav }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderTop: '1px solid var(--line)',
      marginTop: '32px',
      fontSize: '13px',
    }}>
      <div style={{ flex: 1 }}>
        {prevId && prevTitle && (
          <span
            onClick={() => onNav && onNav(prevId)}
            style={{ cursor: 'pointer', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            ← {prevTitle}
          </span>
        )}
      </div>
      <div>
        <span
          onClick={() => onNav && onNav('top')}
          style={{ cursor: 'pointer', color: 'var(--ink-3)', fontSize: '12px' }}
        >
          ホーム
        </span>
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        {nextId && nextTitle && (
          <span
            onClick={() => onNav && onNav(nextId)}
            style={{ cursor: 'pointer', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            {nextTitle} →
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 2. レイアウトコンポーネント
// ============================================================

// 出題頻度ランクの配色（commit 6519f1e より復活）
const RANK_COLORS = { S: '#ef4444', A: '#f97316', B: '#3b82f6', C: '#22c55e' };
const MKDOCS_BASE = 'https://kfurufuru.github.io/denken-wiki/';

function Sidebar({ data, page, onNav }) {
  const [sidebarMode, setSidebarMode] = React.useState(() => {
    try { return localStorage.getItem('hoki_sidebar_mode') || 'theme'; }
    catch (e) { return 'theme'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('hoki_sidebar_mode', sidebarMode); } catch (e) {}
  }, [sidebarMode]);

  const [yearWindow, setYearWindow] = React.useState(() => {
    try {
      const v = localStorage.getItem('hoki_sidebar_window');
      return (v === '5y' || v === '10y' || v === '15y') ? v : '10y';
    } catch (e) { return '10y'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('hoki_sidebar_window', yearWindow); } catch (e) {}
  }, [yearWindow]);

  const [openChapters, setOpenChapters] = React.useState(() => {
    if (!data || !data.chapters) return {};
    const initial = {};
    data.chapters.forEach((ch, idx) => {
      if (ch.pages && ch.pages.some(p => p.id === page)) {
        initial[idx] = true;
      }
    });
    return initial;
  });

  const toggleChapter = (idx) => {
    setOpenChapters(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getLastSeenBadge = (pageId) => {
    const val = localStorage.getItem(`hoki_lastSeen_${pageId}`);
    if (!val) return null;
    const diff = Date.now() - parseInt(val, 10);
    const days = diff / (1000 * 60 * 60 * 24);
    if (days >= 3) return <span className="nav-badge-review" title="3日以上未閲覧">🔄</span>;
    return null;
  };

  // 内部ページIDが実在するか（WIKI_DATA から導出）
  const validPageIds = React.useMemo(() => {
    const set = new Set();
    if (data && data.chapters) {
      data.chapters.forEach(ch => (ch.pages || []).forEach(p => set.add(p.id)));
    }
    return set;
  }, [data]);

  const ranking = (typeof window !== 'undefined' && window.HOKI_RANKING) || null;
  const themes = ranking && ranking.windows ? (ranking.windows[yearWindow] || []) : [];

  if (!data || !data.chapters) {
    return (
      <aside className="sidebar" style={{ padding: '16px', fontSize: '13px', color: 'var(--ink-3)' }}>
        データ未ロード
      </aside>
    );
  }

  const tabs = [{ id: 'theme', label: '分野で探す' }, { id: 'chapter', label: '教科書順' }];

  return (
    <aside className="sidebar" style={{ height: '100vh', overflowY: 'auto', borderRight: '1px solid var(--line)', padding: '12px 0' }}>
      {data.title && (
        <div style={{ padding: '10px 16px 12px', fontWeight: '700', fontSize: '14px' }}>
          {data.title}
        </div>
      )}
      {/* タブ切替 */}
      <div style={{ display: 'flex', padding: '0 12px', marginBottom: 8, gap: 4, borderBottom: '1px solid var(--line)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSidebarMode(tab.id)}
            style={{
              padding: '7px 10px',
              fontSize: 12,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: sidebarMode === tab.id ? 'var(--accent)' : 'var(--ink-3)',
              fontWeight: 700,
              borderBottom: sidebarMode === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {sidebarMode === 'theme' ? (
        <div style={{ padding: '4px 0 8px' }}>
          <div style={{ padding: '4px 16px 6px', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.05em' }}>
            出題頻度（{yearWindow === '5y' ? '過去5年' : yearWindow === '15y' ? '過去15年' : '過去10年'}・S/A/B/C順）
          </div>
          <div style={{ display: 'flex', gap: 4, padding: '0 12px 8px' }}>
            {['5y', '10y', '15y'].map(y => (
              <button
                key={y}
                onClick={() => setYearWindow(y)}
                style={{
                  flex: 1,
                  padding: '4px 0',
                  fontSize: 11,
                  cursor: 'pointer',
                  border: yearWindow === y ? '1px solid var(--accent)' : '1px solid var(--line)',
                  background: yearWindow === y ? 'var(--accent-soft)' : 'transparent',
                  color: yearWindow === y ? 'var(--accent)' : 'var(--ink-2)',
                  fontWeight: yearWindow === y ? 700 : 500,
                  borderRadius: 4,
                }}
              >
                {y === '5y' ? '5年' : y === '10y' ? '10年' : '15年'}
              </button>
            ))}
          </div>
          {/* TOP行 */}
          <div
            onClick={() => onNav && onNav('top')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 16px', fontSize: 12, cursor: 'pointer',
              background: page === 'top' ? 'var(--accent-soft)' : 'transparent',
              borderLeft: page === 'top' ? '3px solid var(--accent)' : '3px solid transparent',
              color: page === 'top' ? 'var(--accent)' : 'var(--ink-2)',
            }}
          >
            <span style={{ flex: 1 }}>🏠 すべてのテーマ（TOP）</span>
          </div>
          {themes.length === 0 && (
            <div style={{ padding: '8px 16px', fontSize: 11, color: 'var(--ink-3)' }}>ランキングデータ未ロード</div>
          )}
          {themes.map((t, i) => {
            const isInternal = t.pageId && validPageIds.has(t.pageId);
            const isActive = isInternal && t.pageId === page;
            const isClickable = isInternal || !!t.mkdocs;
            const handleClick = () => {
              if (isInternal) onNav && onNav(t.pageId);
              else if (t.mkdocs) window.open(MKDOCS_BASE + 'themes/' + t.mkdocs + '/', '_blank', 'noopener');
            };
            return (
              <div
                key={t.slug || i}
                onClick={isClickable ? handleClick : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 16px', fontSize: 12,
                  cursor: isClickable ? 'pointer' : 'default',
                  opacity: isClickable ? 1 : 0.5,
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                  color: isActive ? 'var(--accent)' : 'var(--ink-2)',
                }}
                onMouseEnter={e => { if (isClickable && !isActive) e.currentTarget.style.background = 'var(--bg-2)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{
                  background: RANK_COLORS[t.rank] || 'var(--ink-3)',
                  color: '#fff', fontSize: 9, fontWeight: 700,
                  padding: '1px 5px', borderRadius: 3, minWidth: 14, textAlign: 'center',
                }}>{t.rank}</span>
                {!isInternal && t.mkdocs && (
                  <span style={{ fontSize: 9, color: 'var(--ink-3)' }} title="外部Wiki（denken-wiki/themes）へ">↗</span>
                )}
                <span style={{ flex: 1, lineHeight: 1.4 }}>{t.label}</span>
                <span style={{ fontSize: 10, color: 'var(--ink-3)', fontVariantNumeric: 'tabular-nums' }}>{t.count}</span>
              </div>
            );
          })}
        </div>
      ) : (
        data.chapters.map((ch, idx) => (
          <div key={idx}>
            <div
              onClick={() => toggleChapter(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--ink-2)',
                background: openChapters[idx] ? 'var(--bg-2)' : 'transparent',
                userSelect: 'none',
              }}
            >
              <span style={{ color: 'var(--ink-3)', fontSize: '10px' }}>{openChapters[idx] ? '▼' : '▶'}</span>
              {ch.ch && <span style={{ fontSize: '10px', color: 'var(--ink-3)' }}>{ch.ch}</span>}
              <span style={{ flex: 1 }}>{ch.title}</span>
            </div>
            {openChapters[idx] && ch.pages && ch.pages.map((p, pi) => {
              const isActive = p.id === page;
              return (
                <div
                  key={pi}
                  onClick={() => onNav && onNav(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 16px 7px 28px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    background: isActive ? 'var(--accent-soft)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                    color: isActive ? 'var(--accent)' : 'var(--ink-2)',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-2)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ flex: 1, lineHeight: '1.4' }}>{p.title}</span>
                  {p.priority === 'required' && (
                    <span className="priority-label">★必須</span>
                  )}
                  {p.freq === 'max' && <span className="freq-max">毎回</span>}
                  {p.freq === 'high' && <span className="freq-high">頻出</span>}
                  {p.twin && (
                    <span
                      title={`対となるページ: ${p.twin}`}
                      onClick={e => { e.stopPropagation(); onNav && onNav(p.twin); }}
                      style={{ cursor: 'pointer', color: 'var(--accent)', fontSize: '11px' }}
                    >
                      ↔
                    </span>
                  )}
                  {getLastSeenBadge(p.id)}
                </div>
              );
            })}
          </div>
        ))
      )}
      <div style={{ marginTop: '16px', padding: '12px 16px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <a href="https://kfurufuru.github.io/denken-wiki/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-3)', textDecoration: 'none', fontSize: '12px' }}>→ 法規Wiki（新・条文解説版）</a>
        <a href="https://kfurufuru.github.io/secretary-portal/" style={{ color: 'var(--ink-3)', textDecoration: 'none', fontSize: '12px' }}>← ポータルに戻る</a>
      </div>
    </aside>
  );
}

function TOC({ page }) {
  const [headings, setHeadings] = React.useState([]);

  React.useEffect(() => {
    // React が DOM を更新してからクエリするため次フレームに遅延
    const timer = setTimeout(() => {
      const h2s = document.querySelectorAll('.content h2[id]');
      setHeadings(Array.from(h2s).map(h => ({ id: h.id, text: h.textContent.trim() })));
    }, 50);
    return () => clearTimeout(timer);
  }, [page]);

  if (headings.length === 0) return null;

  return (
    <div className="toc">
      <div className="toc-title">目次</div>
      {headings.map((h, i) => (
        <a
          key={i}
          className="toc-link"
          href={`#${h.id}`}
          onClick={e => {
            e.preventDefault();
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {h.text}
        </a>
      ))}
    </div>
  );
}

function TopBar({ page, onNav }) {
  const data = window.WIKI_DATA;
  let pageTitle = page;
  if (data && data.chapters) {
    data.chapters.forEach(ch => {
      (ch.pages || []).forEach(p => {
        if (p.id === page) pageTitle = p.title;
      });
    });
  }

  return (
    <div className="topbar" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 20px',
      borderBottom: '1px solid var(--line)',
      fontSize: '13px',
      background: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <span
        onClick={() => onNav && onNav('top')}
        style={{ cursor: 'pointer', color: 'var(--accent)' }}
      >
        ホーム
      </span>
      {page !== 'top' && (
        <>
          <span style={{ color: 'var(--ink-3)' }}>/</span>
          <span className="page-title" style={{ color: 'var(--ink-2)' }}>{pageTitle}</span>
        </>
      )}
      <div style={{ flex: 1 }} />
      <input
        type="text"
        placeholder="検索（準備中）"
        disabled
        style={{
          padding: '5px 12px',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--line)',
          fontSize: '12px',
          background: 'var(--bg-2)',
          color: 'var(--ink-3)',
          width: '160px',
        }}
      />
    </div>
  );
}

// ============================================================
// 3. Appコンポーネント（メインアプリ）
// ============================================================

function App() {
  const [page, setPage] = React.useState(() => location.hash.slice(1) || 'top');

  React.useEffect(() => {
    const handler = () => {
      const id = location.hash.slice(1) || 'top';
      setPage(id);
      localStorage.setItem(`hoki_lastSeen_${id}`, Date.now().toString());
    };
    window.addEventListener('hashchange', handler);
    // 初回lastSeen記録
    localStorage.setItem(`hoki_lastSeen_${page}`, Date.now().toString());
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (id) => {
    location.hash = id;
  };

  return (
    <div className="app" style={{ display: 'grid', minHeight: '100vh' }}>
      <Sidebar data={window.WIKI_DATA} page={page} onNav={navigate} />
      <main className="main" style={{ minWidth: 0 }}>
        <TopBar page={page} onNav={navigate} />
        <div className="content" style={{ padding: '24px 32px', maxWidth: '860px' }}>
          {window.renderPage ? window.renderPage(page, navigate) : (
            <div style={{ color: 'var(--ink-3)', fontSize: '14px' }}>
              renderPage が未定義です（hoki-pages.jsx を読み込んでください）
            </div>
          )}
        </div>
      </main>
      <TOC page={page} />
    </div>
  );
}

// ============================================================
// 4. コンポーネント用CSSインジェクション
// ============================================================

(function() {
  const style = document.createElement('style');
  style.textContent = `
    .goal-question { border: 2px solid var(--accent); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 24px; background: var(--accent-soft); }
    .goal-label { font-size: 12px; font-weight: 700; color: var(--accent); letter-spacing: 0.05em; margin-bottom: 8px; }
    .goal-q { font-size: 14px; line-height: 1.7; margin: 0 0 10px; }
    .goal-choices summary { font-size: 12px; color: var(--ink-3); cursor: pointer; }
    .conclusion-box { border: 2px solid var(--good); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 24px; }
    .conclusion-label { font-weight: 700; color: var(--good); margin-bottom: 8px; font-size: 13px; }
    .meta-strip-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
    .meta-strip-table td { padding: 6px 10px; border: 1px solid var(--line); }
    .meta-strip-table td:first-child { color: var(--ink-3); width: 120px; }
    .exam-focus { background: var(--bg-2); border-radius: var(--radius); padding: 16px; margin-bottom: 24px; }
    .trap-table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px; }
    .trap-table th { padding: 8px 12px; }
    .trap-table td { padding: 8px 12px; border-top: 1px solid var(--line); vertical-align: top; }
    .trap-wrong { color: var(--warn); }
    .trap-correct { color: var(--good); }
    .quick-review details { border: 1px solid var(--line); border-radius: var(--radius); margin-bottom: 8px; }
    .quick-review summary { padding: 10px 14px; cursor: pointer; font-size: 13px; }
    .quick-review-answer { padding: 10px 14px; font-size: 13px; background: var(--bg-2); }
    .next-action { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .next-action-card { border: 1px solid var(--line); border-radius: var(--radius); padding: 14px; cursor: pointer; transition: border-color 0.15s; }
    .next-action-card:hover { border-color: var(--accent); }
    .next-action-key { font-size: 11px; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
    .cross-ref { background: var(--bg-2); border-radius: var(--radius); padding: 14px 18px; margin-bottom: 24px; }
    .cross-ref-item { font-size: 13px; padding: 6px 0; border-bottom: 1px solid var(--line); }
    .cross-ref-item:last-child { border-bottom: none; }
    .twin-banner { background: var(--accent-soft); border: 1px solid var(--accent); border-radius: var(--radius); padding: 10px 14px; font-size: 13px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .freq-max  { background: #fde8e8; color: #c0392b; border-radius: 4px; padding: 1px 5px; font-size: 10px; }
    .freq-high { background: #fef3cd; color: #7d6608; border-radius: 4px; padding: 1px 5px; font-size: 10px; }
    .nav-badge-review { color: #2980b9; font-size: 11px; }
    .priority-label { font-size: 9px; color: var(--accent); font-weight: 700; }
    .toc { position: sticky; top: 0; height: 100vh; overflow-y: auto; padding: 22px 14px; border-left: 1px solid var(--line); font-size: 12px; }
    .toc-title { font-weight: 700; font-size: 11px; color: var(--ink-3); letter-spacing: 0.08em; margin-bottom: 10px; }
    .toc-link { display: block; padding: 4px 0; color: var(--ink-3); cursor: pointer; line-height: 1.4; text-decoration: none; }
    .toc-link:hover { color: var(--accent); }
    .app { grid-template-columns: 256px 1fr 220px; }
    @media (max-width: 1100px) { .app { grid-template-columns: 256px 1fr; } .toc { display: none; } }
    @media (max-width: 900px)  { .app { grid-template-columns: 1fr; } .sidebar { display: none; } }
  `;
  document.head.appendChild(style);
})();

// ============================================================
// 5. マウント
// ============================================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
