"""
build-hoki-wiki.py — 電験3種 法規Wiki HTML組み立てスクリプト
ソース:
  denken-hoki-wiki.html  → CSS/head部分(行0-899)を再利用
  hoki-data.js           → WIKI_DATA定義
  hoki-glossary-data.js  → GLOSSARY_TERMS_V1定義（用語クイズ）
  hoki-components.jsx    → Sidebar/TOC/App + 15テンプレートコンポーネント
  hoki-glossary.jsx      → ChokuzenYougoPage（用語クイズ）
  hoki-pages.jsx         → renderPage + 全ページコンポーネント
出力:
  denken-hoki-wiki.html  → 上書き（生成前に .bak を作成）

着手前防衛策（ひろゆき指摘）: bundle前に .js ファイルを node --check で構文検証。
JSX は Babel CDN がブラウザで検証するため事前検証スキップ。

⚠ denken_check::* localStorage payload schema 変更時の同期更新リマインダー：
   両wiki共通の理解度ボタン payload（status/updatedAt/firstSeenAt/reviewCount 等）の
   書き手は **2ファイルに分散** しているため、片方変更時は必ずもう片方も同期する。
     1. hoki-components.jsx の QuickReview コンポーネント（このリポジトリ）
     2. denken-wiki/docs/javascripts/self-check.js（別リポジトリ）
   読み手（MachigaiNotePage in hoki-pages.jsx）も同様の追従が必要。
   片側忘れの再発防止：マンガー反転思考 2026-05-13。
"""
import json, os, shutil, subprocess, sys

BASE = os.path.dirname(os.path.abspath(__file__)).replace('\\', '/')

# bundle対象 (順序: data → comps → pages、glossary は data/comps/pages の各群末尾に追加)
JS_BUNDLES   = ['hoki-data.js', 'hoki-glossary-data.js']
JSX_BUNDLES  = ['hoki-components.jsx', 'hoki-glossary.jsx', 'hoki-pages.jsx']

# --- 防衛策: .js 構文検証 ---
for js_file in JS_BUNDLES:
    path = f'{BASE}/{js_file}'
    if not os.path.exists(path):
        print(f'MISSING: {js_file}'); sys.exit(1)
    result = subprocess.run(['node', '--check', path], capture_output=True, text=True)
    if result.returncode != 0:
        print(f'SYNTAX ERROR in {js_file}:')
        print(result.stderr)
        sys.exit(1)
print(f'Syntax OK: {", ".join(JS_BUNDLES)}')

# --- 存在チェック: .jsx ---
for jsx_file in JSX_BUNDLES:
    if not os.path.exists(f'{BASE}/{jsx_file}'):
        print(f'MISSING: {jsx_file}'); sys.exit(1)

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
data_js          = read('hoki-data.js')
glossary_data_js = read('hoki-glossary-data.js')
comps_jsx        = read('hoki-components.jsx')
glossary_jsx     = read('hoki-glossary.jsx')
pages_jsx        = read('hoki-pages.jsx')

# 出題頻度ランキング JSON（サイドバー「テーマ別」タブで参照）
ranking_json = read('data/hoki-theme-ranking.json')
ranking_block = f"""
<!-- 出題頻度ランキング（kakomon.yml H23-R07 自動集計） -->
<script>
window.HOKI_RANKING = {ranking_json};
</script>
"""

# --- 検索インデックス生成（横断検索 Phase 1 + 用語クイズ統合） ---
# WIKI_DATA / GLOSSARY_TERMS_V1 を node で評価し、フラット化した検索エントリを作る
node_eval = (
    'global.window = {};'
    'require(process.cwd() + "/hoki-data.js");'
    'require(process.cwd() + "/hoki-glossary-data.js");'
    'process.stdout.write(JSON.stringify({'
    '  wiki: global.window.WIKI_DATA,'
    '  glossary: global.window.GLOSSARY_TERMS_V1'
    '}));'
)
res = subprocess.run(['node', '-e', node_eval], capture_output=True, text=True, encoding='utf-8', cwd=BASE)
if res.returncode != 0:
    print('FAILED to evaluate hoki-data.js / hoki-glossary-data.js:'); print(res.stderr); sys.exit(1)
combined = json.loads(res.stdout)
wiki_data = combined['wiki']
glossary_data = combined.get('glossary') or {}

search_entries = []
for ch in wiki_data.get('chapters', []):
    chapter_title = ch.get('title', '')
    for p in ch.get('pages', []):
        search_entries.append({
            'id': p.get('id'),
            'title': p.get('title', ''),
            'chapterTitle': chapter_title,
            'num': p.get('num', ''),
            'freq': p.get('freq', ''),
            'priority': p.get('priority', ''),
            'kind': 'page',
        })

# 用語クイズ entries 追加（id衝突回避: 'glossary-' prefix）
glossary_terms = glossary_data.get('terms', []) or []
for t in glossary_terms:
    tid = t.get('id')
    if not tid:
        continue
    search_entries.append({
        'id': 'glossary-' + tid,
        'title': t.get('term', ''),
        'yomi': t.get('yomi', ''),
        'meaning': t.get('meaning', ''),
        'chapterTitle': '用語クイズ',
        'num': '8.5',
        'navTarget': 'chokuzen-yougo',
        'kind': 'glossary',
    })

# 件数アサート（ビルド忘れ・抽出漏れ検知）
expected_pages = sum(len(ch.get('pages', [])) for ch in wiki_data.get('chapters', []))
expected_glossary = len(glossary_terms)
expected = expected_pages + expected_glossary
if len(search_entries) != expected:
    print(f'INDEX MISMATCH: extracted={len(search_entries)} expected={expected} (pages={expected_pages}, glossary={expected_glossary})')
    sys.exit(1)

# data/ に出力（参照用・他ツール連携用）
search_index_path = f'{BASE}/data/hoki-search-index.json'
with open(search_index_path, 'w', encoding='utf-8') as f:
    json.dump(search_entries, f, ensure_ascii=False, indent=2)
print(f'Indexed {len(search_entries)} entries (pages={expected_pages} + glossary={expected_glossary}) → {search_index_path}')

# HTMLに埋め込む用の JSON 文字列
search_index_json = json.dumps(search_entries, ensure_ascii=False)
search_index_block = f"""
<!-- hoki-wiki 検索インデックス（横断検索 Phase 1） -->
<script>
window.HOKI_SEARCH_INDEX = {search_index_json};
</script>
"""

# Babelスクリプトブロック
script_block = f"""
<script type="text/babel">
// ============================================================
// WIKI_DATA
// ============================================================
{data_js}

// ============================================================
// GLOSSARY_TERMS_V1（用語クイズデータ）
// ============================================================
{glossary_data_js}

// ============================================================
// コンポーネント定義
// ============================================================
{comps_jsx}

// ============================================================
// 用語クイズページ（ChokuzenYougoPage）
// ============================================================
{glossary_jsx}

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
output += body_open + ranking_block + search_index_block + script_block

# 書き出し
out_path = f'{BASE}/denken-hoki-wiki.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(output)

lines = output.count('\n')
print(f'Generated: {out_path} ({lines} lines)')
print('Done. Run: python wiki_verify.py top --file hoki')
