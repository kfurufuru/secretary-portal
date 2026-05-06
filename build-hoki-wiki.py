"""
build-hoki-wiki.py — 電験3種 法規Wiki HTML組み立てスクリプト
ソース:
  denken-hoki-wiki.html  → CSS/head部分(行0-899)を再利用
  hoki-data.js           → WIKI_DATA定義
  hoki-components.jsx    → Sidebar/TOC/App + 15テンプレートコンポーネント
  hoki-pages.jsx         → renderPage + 全ページコンポーネント
出力:
  denken-hoki-wiki.html  → 上書き（生成前に .bak を作成）
"""
import os, shutil

BASE = os.path.dirname(os.path.abspath(__file__)).replace('\\', '/')

def read(name):
    with open(f'{BASE}/{name}', encoding='utf-8') as f:
        return f.read()

# バックアップ（上書き前に現行ファイルを保存）
src = f'{BASE}/denken-hoki-wiki.html'
bak = f'{BASE}/denken-hoki-wiki.html.bak'
if os.path.exists(src):
    shutil.copy(src, bak)
    print(f'Backup: {bak}')

# CSSヘッドは専用テンプレートファイルを常に使用（再ビルドでも汚染されない）
css_head = read('hoki-head-template.html')

# TOC列追加のCSS差分
extra_css = """
<style>
/* === ビルドスクリプト追加CSS === */
.app { display: grid; grid-template-columns: 256px 1fr 220px; min-height: 100vh; }
@media (max-width: 1100px) { .app { grid-template-columns: 256px 1fr; } }
@media (max-width: 900px)  { .app { grid-template-columns: 1fr; } .sidebar { display: none; } }
.nav-children { padding-left: 24px; margin-bottom: 4px; }
.nav-child    { font-size: 12px; padding: 4px 8px; color: var(--ink-2); cursor: pointer; border-radius: 6px; }
.nav-child:hover { background: var(--bg-3); }
</style>"""

# React / Babel CDN
cdn = """
<!-- React 18 + Babel CDN -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- KaTeX -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
</head>"""

# body開始（Reactマウントポイントのみ）
body_open = """
<body>
<div id="root">読み込み中...</div>
"""

# ソースファイル読み込み
data_js   = read('hoki-data.js')
comps_jsx = read('hoki-components.jsx')
pages_jsx = read('hoki-pages.jsx')

# Babelスクリプトブロック
script_block = f"""
<script type="text/babel">
// ============================================================
// WIKI_DATA
// ============================================================
{data_js}

// ============================================================
// コンポーネント定義
// ============================================================
{comps_jsx}

// ============================================================
// ページ定義
// ============================================================
{pages_jsx}
</script>
</body>
</html>
"""

# 組み立て（</head>を差し替え）
output = css_head.replace('</head>', extra_css + '\n' + cdn)
output += body_open + script_block

# 書き出し
out_path = f'{BASE}/denken-hoki-wiki.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(output)

lines = output.count('\n')
print(f'Generated: {out_path} ({lines} lines)')
print('Done. Run: python wiki_verify.py top --file hoki')
