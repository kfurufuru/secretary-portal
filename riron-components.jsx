/* riron-components.jsx — 電験3種 理論Wiki 共通コンポーネント拡張 */
/* このファイルの内容は denken3-riron-wiki.html の
   既存コンポーネント定義ブロックの直後に挿入する */

const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   1. Callout
   MkDocs Material の !!! warn/tip/info/note を置き換えるボックス
   ============================================================ */

const Callout = ({ variant = "info", title, children }) => {
  const config = {
    warn: {
      bg: "var(--danger-soft)",
      border: "var(--danger)",
      icon: "⚠",
      labelColor: "var(--danger)",
    },
    tip: {
      bg: "var(--ok-soft)",
      border: "var(--ok)",
      icon: "💡",
      labelColor: "var(--ok)",
    },
    info: {
      bg: "var(--accent-soft)",
      border: "var(--accent)",
      icon: "📍",
      labelColor: "var(--accent-ink)",
    },
    note: {
      bg: "var(--bg-sunken)",
      border: "var(--ink-mute)",
      icon: "📝",
      labelColor: "var(--ink-mute)",
    },
  };

  const c = config[variant] || config.info;

  return (
    <aside
      style={{
        background: c.bg,
        borderLeft: `4px solid ${c.border}`,
        borderRadius: "6px",
        padding: "14px 16px",
        margin: "16px 0",
      }}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: "13px",
            color: c.labelColor,
            marginBottom: children ? "8px" : 0,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>{c.icon}</span>
          <span>{title}</span>
        </div>
      )}
      {!title && (
        <span
          style={{
            fontSize: "15px",
            marginRight: "6px",
          }}
        >
          {c.icon}
        </span>
      )}
      <div style={{ color: "var(--ink)", lineHeight: "1.75", overflowWrap: "anywhere" }}>{children}</div>
    </aside>
  );
};

/* ============================================================
   2. FormulaTable
   レイヤーA/B 公式表コンポーネント
   rows: [{ formula, meaning, when, notWhen }]
   ============================================================ */

const FormulaTable = ({ layer = "A", rows = [] }) => {
  const layerLabel = layer === "A" ? "レイヤーA — 基本公式" : "レイヤーB — 応用公式";
  const layerColor = layer === "A" ? "var(--accent-ink)" : "var(--warn)";
  const layerBg = layer === "A" ? "var(--accent-soft)" : "var(--warn-soft)";

  return (
    <div style={{ margin: "18px 0" }}>
      <div
        style={{
          display: "inline-block",
          background: layerBg,
          color: layerColor,
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.08em",
          padding: "3px 10px",
          borderRadius: "4px 4px 0 0",
          marginBottom: "-1px",
        }}
      >
        {layerLabel}
      </div>
      <div className="table-wrap" style={{ margin: 0 }}>
        <table className="data">
          <thead>
            <tr>
              <th style={{ width: "24%" }}>公式</th>
              <th style={{ width: "32%" }}>意味</th>
              <th style={{ width: "22%" }}>使える条件</th>
              <th style={{ width: "22%" }}>使えない条件</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "var(--font-mono)" }}>
                  {row.formula ? <Eq tex={row.formula} /> : "—"}
                </td>
                <td>{row.meaning || "—"}</td>
                <td style={{ color: "var(--ok)", fontSize: "13px" }}>{row.when || "—"}</td>
                <td style={{ color: "var(--danger)", fontSize: "13px" }}>
                  {row.notWhen || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================
   3. Analogy
   物理的直感のアナロジーボックス
   ============================================================ */

const Analogy = ({ type = "generic", icon, children }) => {
  const defaultIcons = {
    "water-tank": "💧",
    bridge: "🌉",
    flow: "🌊",
    spring: "🔄",
    generic: "🔑",
  };

  const resolvedIcon = icon || defaultIcons[type] || "🔑";

  return (
    <aside
      style={{
        background: "var(--ok-soft)",
        border: "1px solid color-mix(in oklab, var(--ok) 25%, transparent)",
        borderRadius: "6px",
        padding: "14px 16px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "var(--ok)",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>🔑</span>
        <span>直感アナロジー</span>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "22px", lineHeight: "1.4", flexShrink: 0 }}>
          {resolvedIcon}
        </span>
        <div style={{ color: "var(--ink)", lineHeight: "1.75" }}>{children}</div>
      </div>
    </aside>
  );
};

/* ============================================================
   4. TrapCard
   引っかけパターン1個を表示するカード
   ============================================================ */

const TrapCard = ({ num, category, trap, correct, cite }) => (
  <div
    style={{
      border: "1px solid var(--rule)",
      borderRadius: "8px",
      padding: "16px",
      margin: "14px 0",
      background: "var(--bg-elev)",
    }}
  >
    {/* ヘッダーバー */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "12px",
      }}
    >
      {num !== undefined && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 700,
            background: "var(--bg-sunken)",
            border: "1px solid var(--rule)",
            borderRadius: "4px",
            padding: "2px 7px",
            color: "var(--ink-mute)",
          }}
        >
          #{num}
        </span>
      )}
      {category && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--accent-ink)",
            background: "var(--accent-soft)",
            borderRadius: "4px",
            padding: "2px 8px",
          }}
        >
          {category}
        </span>
      )}
    </div>

    {/* 罠の文章 */}
    {trap && (
      <div
        style={{
          background: "var(--danger-soft)",
          borderLeft: "4px solid var(--danger)",
          borderRadius: "0 6px 6px 0",
          padding: "10px 14px",
          marginBottom: "10px",
          fontStyle: "italic",
          color: "var(--ink)",
          fontSize: "14px",
        }}
      >
        <span style={{ fontWeight: 700, fontStyle: "normal", color: "var(--danger)" }}>
          ❌ 罠:{" "}
        </span>
        {trap}
      </div>
    )}

    {/* 正解の考え方 */}
    {correct && (
      <div
        style={{
          background: "var(--ok-soft)",
          borderLeft: "4px solid var(--ok)",
          borderRadius: "0 6px 6px 0",
          padding: "10px 14px",
          marginBottom: cite ? "10px" : 0,
          color: "var(--ink)",
          fontSize: "14px",
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--ok)" }}>✅ 正解の考え方: </span>
        {correct}
      </div>
    )}

    {/* 出典 */}
    {cite && (
      <div
        style={{
          fontSize: "12px",
          color: "var(--ink-mute)",
          marginTop: "8px",
          paddingLeft: "2px",
        }}
      >
        出典: {cite}
      </div>
    )}
  </div>
);

/* ============================================================
   4b. TrapBlock
   引っかけポイント3層構造コンポーネント（RULE-05準拠）
   正解最上段 → 誤解補足 → 判別ステップ → 出典
   ============================================================ */

const TrapBlock = ({ correct, trap, cite, steps = [] }) => (
  <div style={{
    border: "1px solid var(--rule)",
    borderRadius: "8px",
    margin: "16px 0",
    overflow: "hidden",
  }}>
    {/* 正解（最上段・最初に目に入る） */}
    <div style={{
      background: "var(--ok-soft)",
      borderBottom: "1px solid color-mix(in oklab, var(--ok) 25%, transparent)",
      padding: "12px 16px",
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: "12px",
        color: "var(--ok)",
        marginBottom: "4px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}>
        <span>✅</span>
        <span>正解の原則</span>
      </div>
      <div style={{ color: "var(--ink)", lineHeight: "1.7", fontSize: "14px" }}>
        {correct}
      </div>
    </div>

    {/* 誤解パターン（amber系・補足扱い・RULE-16: hue 0-30の赤禁止） */}
    {trap && (
      <div style={{
        background: "var(--warn-soft)",
        borderBottom: steps.length > 0
          ? "1px solid color-mix(in oklab, var(--warn) 25%, transparent)"
          : "none",
        padding: "10px 16px",
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: "12px",
          color: "var(--warn)",
          marginBottom: "4px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}>
          <span>⚠</span>
          <span>よくある誤解</span>
        </div>
        <div style={{ color: "var(--ink)", lineHeight: "1.6", fontSize: "13px", fontStyle: "italic" }}>
          {trap}
        </div>
      </div>
    )}

    {/* 判別ステップ */}
    {steps.length > 0 && (
      <div style={{
        padding: "10px 16px",
        background: "var(--bg-elev)",
        borderBottom: cite ? "1px solid var(--rule)" : "none",
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: "12px",
          color: "var(--accent-ink)",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}>
          <span>🔍</span>
          <span>判別ステップ</span>
        </div>
        <ol style={{ margin: 0, paddingLeft: "1.4em", lineHeight: "1.7", fontSize: "13px" }}>
          {steps.map((s, i) => (
            <li key={i} style={{ marginBottom: i < steps.length - 1 ? "4px" : 0 }}>{s}</li>
          ))}
        </ol>
      </div>
    )}

    {/* 出典 */}
    {cite && (
      <div style={{
        fontSize: "11px",
        color: "var(--ink-mute)",
        padding: "6px 16px",
        background: "var(--bg-sunken)",
      }}>
        出典: {cite}
      </div>
    )}
  </div>
);

/* ============================================================
   5. MetaStrip
   各テーマページのヘッダー直下に表示するメタ情報バー
   ============================================================ */

const MetaStrip = ({ difficulty, importance, frequency }) => {
  const importanceBg =
    importance === "S" || importance === "A"
      ? "var(--accent)"
      : "var(--bg-sunken)";
  const importanceColor =
    importance === "S" || importance === "A"
      ? "var(--bg)"
      : "var(--ink-soft)";

  const frequencyBg =
    frequency === "高" || frequency === "最高"
      ? "var(--warn-soft)"
      : "var(--bg-sunken)";
  const frequencyColor =
    frequency === "高" || frequency === "最高"
      ? "var(--warn)"
      : "var(--ink-soft)";
  const frequencyBorder =
    frequency === "高" || frequency === "最高"
      ? "1px solid color-mix(in oklab, var(--warn) 35%, transparent)"
      : "1px solid var(--rule)";

  const pillBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    borderRadius: "999px",
    padding: "3px 10px",
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "var(--font-mono)",
    lineHeight: "1.4",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "1.2rem",
        alignItems: "center",
      }}
    >
      {difficulty && (
        <span
          style={{
            ...pillBase,
            background: "var(--bg-sunken)",
            color: "var(--ink-soft)",
            border: "1px solid var(--rule)",
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.06em" }}>難易度</span>
          <span>{difficulty}</span>
        </span>
      )}
      {importance && (
        <span
          style={{
            ...pillBase,
            background: importanceBg,
            color: importanceColor,
            border:
              importance === "S" || importance === "A"
                ? "none"
                : "1px solid var(--rule)",
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.06em" }}>重要度</span>
          <span>{importance}</span>
        </span>
      )}
      {frequency && (
        <span
          style={{
            ...pillBase,
            background: frequencyBg,
            color: frequencyColor,
            border: frequencyBorder,
          }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.06em" }}>出題頻度</span>
          <span>{frequency}</span>
        </span>
      )}
    </div>
  );
};

/* ============================================================
   6. LearningMap
   学習動線バー（前提 → 現在地 → 次）
   ============================================================ */

const LearningMap = ({ prereqs = [], current, nexts = [], onNav }) => {
  if (!prereqs.length && !nexts.length && !current) return null;

  const linkStyle = {
    color: "var(--accent-ink)",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: 600,
  };

  const arrowStyle = {
    color: "var(--ink-mute)",
    margin: "0 6px",
    fontWeight: 400,
  };

  const currentStyle = {
    color: "var(--accent)",
    fontWeight: 700,
    background: "var(--accent-soft)",
    borderRadius: "4px",
    padding: "1px 7px",
  };

  return (
    <nav
      style={{
        background: "var(--bg-sunken)",
        padding: "10px 14px",
        borderRadius: "6px",
        fontSize: "13px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "2px",
        margin: "0 0 1.2rem",
        lineHeight: "1.6",
      }}
    >
      {prereqs.length > 0 && (
        <>
          <span style={{ color: "var(--ink-mute)", fontSize: "11px", marginRight: "4px" }}>
            前提:
          </span>
          {prereqs.map((p, i) => (
            <React.Fragment key={p.id}>
              {i > 0 && <span style={arrowStyle}>・</span>}
              <a
                href="#"
                style={linkStyle}
                onClick={(e) => {
                  e.preventDefault();
                  onNav && onNav(p.id);
                }}
              >
                {p.title}
              </a>
            </React.Fragment>
          ))}
          <span style={arrowStyle}>→</span>
        </>
      )}

      {current && <span style={currentStyle}>{current}</span>}

      {nexts.length > 0 && (
        <>
          <span style={arrowStyle}>→</span>
          <span style={{ color: "var(--ink-mute)", fontSize: "11px", marginRight: "4px" }}>
            次:
          </span>
          {nexts.map((n, i) => (
            <React.Fragment key={n.id}>
              {i > 0 && <span style={arrowStyle}>・</span>}
              <a
                href="#"
                style={linkStyle}
                onClick={(e) => {
                  e.preventDefault();
                  onNav && onNav(n.id);
                }}
              >
                {n.title}
              </a>
            </React.Fragment>
          ))}
        </>
      )}
    </nav>
  );
};

/* ============================================================
   7. TrapPatternsPage
   引っかけパターン集ページ本体（37パターン、分野フィルタ付き）
   ============================================================ */

const TrapPatternsPage = ({ onNav }) => {
  const [filter, setFilter] = useState("全部");
  const categories = ["全部", "電磁気", "直流", "交流", "三相", "電子", "計測"];

  const allPatterns =
    window.WIKI_DATA && window.WIKI_DATA.trapPatterns
      ? window.WIKI_DATA.trapPatterns
      : [];

  const filtered = useMemo(() => {
    if (filter === "全部") return allPatterns;
    return allPatterns.filter((p) => p.category === filter);
  }, [filter, allPatterns]);

  const chipBase = {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid var(--rule)",
    background: "var(--bg-sunken)",
    color: "var(--ink-soft)",
    transition: "background 0.15s, color 0.15s",
    userSelect: "none",
  };

  const chipActive = {
    ...chipBase,
    background: "var(--accent)",
    color: "var(--bg)",
    border: "1px solid var(--accent)",
  };

  return (
    <>
      <PageHeader
        eyebrow="ELECTRICAL ENGINEER 3RD CLASS — THEORY"
        title="引っかけパターン集"
        deck="電験3種 理論科目で頻出の引っかけパターンを網羅。試験直前の総点検に活用する。"
      />

      <div className="content">
        <LearningMap
          current="引っかけパターン集"
          prereqs={[{ id: "measurement", title: "6.1 電気・電子計測" }]}
          nexts={[{ id: "last-3days", title: "7.2 直前3日戦略" }]}
          onNav={onNav}
        />

        {/* フィルタチップ */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              style={filter === cat ? chipActive : chipBase}
              onClick={() => setFilter(cat)}
            >
              {cat}
              {cat !== "全部" && (
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: "11px",
                    opacity: 0.7,
                  }}
                >
                  (
                  {allPatterns.filter((p) => p.category === cat).length}
                  )
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 件数表示 */}
        <p
          style={{
            fontSize: "13px",
            color: "var(--ink-mute)",
            marginBottom: "12px",
          }}
        >
          {filter === "全部" ? "全" : `「${filter}」`}
          {filtered.length}件
        </p>

        {/* TrapCard 一覧 */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "var(--ink-mute)",
              fontSize: "14px",
            }}
          >
            データが見つかりません。
            <br />
            <span style={{ fontSize: "12px" }}>
              window.WIKI_DATA.trapPatterns にデータを登録してください。
            </span>
          </div>
        ) : (
          filtered.map((p, i) => (
            <TrapCard
              key={p.id || i}
              num={p.num || i + 1}
              category={p.category}
              trap={p.trap}
              correct={p.correct}
              cite={p.cite}
            />
          ))
        )}
      </div>

      <PageNav
        prev={{ id: "measurement", title: "6.1 電気・電子計測" }}
        next={{ id: "last-3days", title: "7.2 直前3日戦略" }}
        onNav={onNav}
      />
    </>
  );
};

/* ============================================================
   Export to window
   ============================================================ */

Object.assign(window, {
  Callout,
  FormulaTable,
  Analogy,
  TrapCard,
  TrapBlock,
  MetaStrip,
  LearningMap,
  TrapPatternsPage,
});
