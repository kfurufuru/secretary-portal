"""
build-riron-wiki.py — 電験3種 理論Wiki HTML統合スクリプト
構造テンプレ = denken3-kikai-wiki.html（機械版）
コンテンツ   = riron-data.js + riron-components.jsx + riron-pages-*.jsx
"""
import re, os

BASE = 'C:/Users/kfuru/.secretary'

def read(name):
    with open(f'{BASE}/{name}', encoding='utf-8') as f:
        return f.read()

# 構造テンプレは機械版（行番号が安定している）
template = read('denken3-kikai-wiki.html')
data     = read('riron-data.js').strip()
comps    = read('riron-components.jsx').strip()
batch1   = read('riron-pages-batch1.jsx').strip()
batch2   = read('riron-pages-batch2.jsx').strip()
batch3   = read('riron-pages-batch3.jsx').strip()
strat    = read('riron-pages-strategy.jsx').strip()

lines = template.split('\n')
print(f'Template lines: {len(lines)}')

# ────────────────────────────────────────
# 機械版の行構造（0-based）
# lines[0:902]     : HTML head + CSS + CDN scripts
# lines[1031:1459] : <script type="text/babel"> tweaks + 共通コンポーネント
# lines[2710:2988] : <script type="text/babel"> app.jsx (Sidebar/App/renderPage)
# ────────────────────────────────────────

head          = '\n'.join(lines[0:902])
block2_keep   = '\n'.join(lines[1031:1460])   # includes closing </script> of tweaks block
pages_core    = '\n'.join(lines[1746:1974])   # L1747-1974: Eq/PageHeader/Crumbs/Box/FormulaCard/PageNav
app_shell     = '\n'.join(lines[2710:2988])

print(f'app_shell starts: {app_shell[:60]}')
print(f'app_shell ends: {app_shell[-60:]}')

# ── head のブランド差替え（機械→理論）──
head = head.replace('data-accent="indigo"', 'data-accent="forest"')
head = head.replace('<title>電験3種 機械Wiki', '<title>電験3種 理論Wiki')
head = head.replace('電験3種 機械Wiki', '電験3種 理論Wiki')

# ── app_shell の renderPage() switch を理論版に書き換え ──
old_switch = '\n'.join(lines[2912:2934])
page_switch = """  const renderPage = () => {
    const props = { data, onNav: navigate };
    switch (page) {
      case 'home':               return <HomePage {...props} />;
      case 'coulomb-field':      return <CoulombFieldPage {...props} />;
      case 'capacitor':          return <CapacitorPage {...props} />;
      case 'electromagnetic-force': return <ElectromagneticForcePage {...props} />;
      case 'magnetic-circuit':   return <MagneticCircuitPage {...props} />;
      case 'dc-circuit':         return <DcCircuitPage {...props} />;
      case 'ac-basics':          return <AcBasicsPage {...props} />;
      case 'ac-power':           return <AcPowerPage {...props} />;
      case 'rlc-resonance':      return <RlcResonancePage {...props} />;
      case 'bridge-circuit':     return <BridgeCircuitPage {...props} />;
      case 'inductance':         return <InductancePage {...props} />;
      case 'transient':          return <TransientPage {...props} />;
      case 'three-phase':        return <ThreePhasePage {...props} />;
      case 'semiconductor':      return <SemiconductorPage {...props} />;
      case 'transistor':         return <TransistorPage {...props} />;
      case 'op-amp':             return <OpAmpPage {...props} />;
      case 'measurement':        return <MeasurementPage {...props} />;
      case 'trap-patterns':      return <TrapPatternsPage {...props} />;
      case 'last-3days':         return <Last3DaysPage {...props} />;
      case 'retake-strategy':    return <RetakeStrategyPage {...props} />;
      case 'trends':             return <TrendsPage {...props} />;
      case 'glossary':           return <GlossaryPage {...props} />;
      case 'guide':              return <GuidePage {...props} />;
      case 'formulas':           return <FormulaListPage {...props} />;
      case 'circuit-patterns':   return <CircuitPatternsPage {...props} />;
      default:                   return <HomePage {...props} />;
    }
  };"""

if old_switch in app_shell:
    app_shell = app_shell.replace(old_switch, page_switch)
    print('renderPage switch replaced OK')
else:
    print('WARN: renderPage switch not found, appending patch')
    # フォールバック: renderPage 行を直接置換
    app_shell = re.sub(
        r'  const renderPage = \(\) => \{.*?\n  \};',
        page_switch,
        app_shell,
        count=1,
        flags=re.DOTALL
    )

# ── Sidebar：デフォルト全閉じ ──
if 'Object.fromEntries(chapters.map(c => [c.id, true]))' in app_shell:
    app_shell = app_shell.replace(
        'Object.fromEntries(chapters.map(c => [c.id, true]))',
        'Object.fromEntries(chapters.map(c => [c.id, false]))'
    )
    print('Sidebar all-closed OK')
else:
    print('WARN: sidebar open state not found')

# ── Sidebar: 現在ページの章を自動展開する useEffect ──
AUTO_OPEN = """
  // 現在ページの章を自動展開
  useEffect(() => {
    const ch = chapters.find(c => c.pages.some(p => p.id === currentPage));
    if (ch) setOpenChapters(prev => ({ ...prev, [ch.id]: true }));
  }, [currentPage]);
"""
toggle_line = '  const toggle = (id) => setOpenChapters(s => ({ ...s, [id]: !s[id] }));'
if toggle_line in app_shell:
    app_shell = app_shell.replace(toggle_line, toggle_line + AUTO_OPEN)
    print('Auto-open useEffect added OK')
else:
    print('WARN: toggle line not found')

# ── 検索インデックスに trapPatterns を追加 ──
TRAP_INDEX = """  (data.trapPatterns || []).forEach(t => {
    items.push({ kind: "引っかけ", title: "パターン" + t.num + ": " + t.trap.substring(0, 30),
                 id: "trap-patterns", context: t.category,
                 terms: t.trap + " " + (t.correct || "") + " " + t.category });
  });"""

# buildSearchIndex の return items; の直前に追加
if 'return items;' in app_shell:
    app_shell = app_shell.replace('  return items;\n}', TRAP_INDEX + '\n  return items;\n}', 1)
    print('Trap search index added OK')
else:
    print('WARN: return items; not found in app_shell')

# ── ブランド差替え in app_shell ──
app_shell = app_shell.replace('機械Wiki', '理論Wiki')
app_shell = app_shell.replace('MACHINERY', 'THEORY')
app_shell = app_shell.replace("eyebrow='MACHINERY'", "eyebrow='THEORY'")
app_shell = app_shell.replace('登録単元 13', '登録単元 25')

# ── 組み立て ──
new_html = '\n'.join([
    head,

    # Block 1: data.js
    '<script>',
    '/* data.js */',
    '/* ============================================================',
    '   電験3種 理論Wiki — Content data',
    '   ============================================================ */',
    '',
    data,
    '</script>',

    # Block 2: tweaks-panel
    block2_keep,

    # Block 2c: pages-core (Eq/PageHeader/Crumbs/Box/FormulaCard/PageNav — 機械版共有)
    pages_core,

    # Block 2b: 理論Wiki専用コンポーネント
    '<script type="text/babel">',
    '/* riron-components.jsx */',
    comps,
    '</script>',

    # Block 4: strategy pages
    '<script type="text/babel">',
    '/* riron-pages-strategy.jsx */',
    strat,
    '</script>',

    # Block 5: batch1
    '<script type="text/babel">',
    '/* riron-pages-batch1.jsx */',
    batch1,
    '</script>',

    # Block 6: batch2
    '<script type="text/babel">',
    '/* riron-pages-batch2.jsx */',
    batch2,
    '</script>',

    # Block 7: batch3
    '<script type="text/babel">',
    '/* riron-pages-batch3.jsx */',
    batch3,
    '</script>',

    # Block 8: app.jsx
    app_shell,

    '</body>',
    '</html>',
])

with open(f'{BASE}/denken3-riron-wiki.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

kb = os.path.getsize(f'{BASE}/denken3-riron-wiki.html') // 1024
lc = new_html.count('\n') + 1
print(f'OK denken3-riron-wiki.html: {kb}KB / {lc} lines')
