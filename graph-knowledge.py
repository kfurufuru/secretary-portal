#!/usr/bin/env python3
"""
graph-knowledge.py — knowledge/ 以下の related: と [[wiki-link]] から
インタラクティブHTMLグラフを生成する。

Usage:
  py graph-knowledge.py                  # → knowledge/knowledge-graph.html
  py graph-knowledge.py --output out.html
  py graph-knowledge.py --open            # 生成後ブラウザで開く
"""

import re
import json
import argparse
import subprocess
import sys
from pathlib import Path
from datetime import datetime

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"
DEFAULT_OUTPUT = KNOWLEDGE_DIR / "knowledge-graph.html"

CATEGORY_COLORS = {
    "AI活用":           "#7c3aed",
    "電気計装":         "#0891b2",
    "電験3種":          "#059669",
    "設備管理":         "#d97706",
    "組織・マネジメント": "#dc2626",
}
DEFAULT_COLOR = "#94a3b8"

LEVEL_SHAPES = {
    "published": "star",
    "review":    "diamond",
    "draft":     "dot",
}


def parse_frontmatter(text):
    m = re.match(r'^---\s*\n(.*?)\n---', text, re.DOTALL)
    if not m:
        return {}
    fm = m.group(1)
    result = {}

    for key, pat in [
        ('title',    r'^title:\s*["\']?(.*?)["\']?\s*$'),
        ('category', r'^category:\s*["\']?(.*?)["\']?\s*$'),
        ('level',    r'^level:\s*["\']?(.*?)["\']?\s*$'),
    ]:
        hit = re.search(pat, fm, re.MULTILINE)
        if hit:
            result[key] = hit.group(1).strip('"\'').strip()

    sc = re.search(r'^understanding_score:\s*(\d+)', fm, re.MULTILINE)
    if sc:
        result['understanding_score'] = int(sc.group(1))

    tg = re.search(r'^tags:\s*\[([^\]]*)\]', fm, re.DOTALL | re.MULTILINE)
    if tg:
        result['tags'] = [t.strip().strip('"\'') for t in tg.group(1).split(',') if t.strip()]

    rel = re.search(r'^related:\s*\[([^\]]*)\]', fm, re.DOTALL | re.MULTILINE)
    if rel:
        result['related'] = [r.strip().strip('"\'') for r in rel.group(1).split(',') if r.strip()]

    return result


def extract_wiki_links(text):
    return re.findall(r'\[\[([^\]#|]+?)(?:[#|][^\]]*)?\]\]', text)


def build_graph():
    md_files = [f for f in KNOWLEDGE_DIR.rglob("*.md") if not f.name.startswith('_')]
    nodes = {}

    for f in md_files:
        try:
            text = f.read_text(encoding='utf-8')
        except Exception:
            continue
        fm = parse_frontmatter(text)
        rel_path = f.relative_to(KNOWLEDGE_DIR).as_posix()
        nodes[rel_path] = {
            'id':       rel_path,
            'label':    fm.get('title', f.stem),
            'category': fm.get('category', ''),
            'level':    fm.get('level', 'draft'),
            'score':    fm.get('understanding_score', 0),
            'tags':     fm.get('tags', []),
            '_related': fm.get('related', []),
            '_wlinks':  extract_wiki_links(text),
        }

    def resolve(link):
        link = re.sub(r'^knowledge/', '', link.strip())
        if not link.endswith('.md'):
            link += '.md'
        if link in nodes:
            return link
        base = Path(link).name
        for nid in nodes:
            if Path(nid).name == base:
                return nid
        return None

    edges = []
    seen = set()
    for nid, n in nodes.items():
        for raw in n['_related'] + n['_wlinks']:
            t = resolve(raw)
            if t and t != nid:
                key = frozenset([nid, t])
                if key not in seen:
                    seen.add(key)
                    edges.append({'from': nid, 'to': t})

    return nodes, edges


def build_html(nodes, edges, generated_at):
    # Build vis.js nodes list
    vis_nodes = []
    for n in nodes.values():
        color  = CATEGORY_COLORS.get(n['category'], DEFAULT_COLOR)
        shape  = LEVEL_SHAPES.get(n['level'], 'dot')
        size   = 8 + (n['score'] or 1) * 2
        # ラベルは20文字で切り詰め（重なり防止）
        raw_label = n['label']
        short_label = raw_label[:20] + '…' if len(raw_label) > 20 else raw_label
        tags_s = ', '.join(n['tags']) if n['tags'] else '—'
        vis_nodes.append({
            'id':    n['id'],
            'label': short_label,
            'title': (
                f"<b>{raw_label}</b><br>"
                f"カテゴリ: {n['category'] or '—'}<br>"
                f"レベル: {n['level']}<br>"
                f"理解度: {n['score'] or '—'}<br>"
                f"タグ: {tags_s}"
            ),
            'color': {'background': color, 'border': color,
                      'highlight': {'background': '#334155', 'border': '#38bdf8'}},
            'shape': shape,
            'size':  size,
            'font':  {'color': '#e2e8f0', 'size': 11},
        })

    vis_edges = [{'from': e['from'], 'to': e['to'],
                  'color': {'color': '#94a3b8', 'opacity': 0.6},
                  'width': 1.5} for e in edges]

    category_counts = {}
    for n in nodes.values():
        cat = n['category'] or '未分類'
        category_counts[cat] = category_counts.get(cat, 0) + 1

    legend_html = ''.join(
        f'<span class="legend-item">'
        f'<span class="legend-dot" style="background:{CATEGORY_COLORS.get(cat, DEFAULT_COLOR)}"></span>'
        f'{cat} ({cnt})</span>'
        for cat, cnt in sorted(category_counts.items())
    )

    level_counts = {'published': 0, 'review': 0, 'draft': 0}
    for n in nodes.values():
        lv = n['level']
        if lv in level_counts:
            level_counts[lv] += 1

    nodes_json = json.dumps(vis_nodes, ensure_ascii=False)
    edges_json = json.dumps(vis_edges, ensure_ascii=False)

    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>知識グラフ — secretary</title>
<script src="https://unpkg.com/vis-network@9.1.9/dist/vis-network.min.js"></script>
<style>
  :root {{
    --bg: #0f172a; --surface: #1e293b; --border: #334155;
    --text: #e2e8f0; --sub: #94a3b8; --accent: #38bdf8;
  }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ background: var(--bg); color: var(--text); font-family: 'Inter','Noto Sans JP',sans-serif;
         display: flex; flex-direction: column; height: 100vh; overflow: hidden; }}
  header {{ padding: 10px 20px; background: var(--surface); border-bottom: 1px solid var(--border);
            display: flex; align-items: center; gap: 16px; flex-shrink: 0; }}
  header h1 {{ font-size: 1rem; font-weight: 700; color: var(--accent); }}
  .stats {{ display: flex; gap: 12px; font-size: 0.78rem; color: var(--sub); }}
  .stats span {{ background: var(--bg); border: 1px solid var(--border);
                 padding: 2px 8px; border-radius: 4px; }}
  .legend {{ display: flex; flex-wrap: wrap; gap: 8px; font-size: 0.75rem;
             padding: 8px 20px; background: var(--surface); border-bottom: 1px solid var(--border);
             flex-shrink: 0; }}
  .legend-item {{ display: flex; align-items: center; gap: 4px; color: var(--sub); }}
  .legend-dot {{ width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }}
  .legend-sep {{ color: var(--border); margin: 0 4px; }}
  #graph {{ flex: 1; width: 100%; min-height: 400px; }}
  #tooltip-info {{ position: fixed; bottom: 20px; right: 20px;
                   background: var(--surface); border: 1px solid var(--border);
                   border-radius: 8px; padding: 12px 16px; font-size: 0.8rem;
                   max-width: 260px; display: none; line-height: 1.6; }}
  .gen-time {{ font-size: 0.7rem; color: var(--sub); margin-left: auto; }}
  .level-badge {{ display: inline-block; padding: 1px 6px; border-radius: 3px;
                  font-size: 0.72rem; font-weight: 600; }}
  .lv-published {{ background: #064e3b; color: #6ee7b7; }}
  .lv-review    {{ background: #1e3a5f; color: #93c5fd; }}
  .lv-draft     {{ background: #2d1f3d; color: #c4b5fd; }}
</style>
</head>
<body>
<header>
  <h1>🗺 知識グラフ</h1>
  <div class="stats">
    <span>ノード: {len(nodes)}</span>
    <span>エッジ: {len(edges)}</span>
    <span class="lv-published level-badge">published {level_counts['published']}</span>
    <span class="lv-review level-badge">review {level_counts['review']}</span>
    <span class="lv-draft level-badge">draft {level_counts['draft']}</span>
  </div>
  <span class="gen-time">{generated_at}</span>
</header>
<div class="legend">
  <span style="color:var(--sub);font-size:0.75rem;margin-right:4px;">カテゴリ:</span>
  {legend_html}
  <span class="legend-sep">|</span>
  <span class="legend-item">形状: ★公開 ◆レビュー ●下書き</span>
  <span class="legend-item">サイズ: 理解度スコアに比例</span>
</div>
<div id="graph"></div>
<div id="tooltip-info"></div>

<script>
const nodes = new vis.DataSet({nodes_json});
const edges = new vis.DataSet({edges_json});

const container = document.getElementById('graph');
const options = {{
  physics: {{
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {{ gravitationalConstant: -120, springLength: 220, springConstant: 0.04, damping: 0.4 }},
    stabilization: {{ iterations: 300 }},
  }},
  interaction: {{ hover: true, tooltipDelay: 100, navigationButtons: true, zoomView: true }},
  nodes: {{ borderWidth: 1.5, scaling: {{ min: 10, max: 30 }} }},
  edges: {{ smooth: {{ type: 'dynamic' }}, color: {{ opacity: 0.5 }} }},
}};
const network = new vis.Network(container, {{ nodes, edges }}, options);
network.on('stabilizationIterationsDone', function() {{ network.fit(); }});
window.addEventListener('resize', function() {{ network.fit(); }});

const tip = document.getElementById('tooltip-info');
network.on('click', function(params) {{
  if (params.nodes.length > 0) {{
    const n = nodes.get(params.nodes[0]);
    tip.style.display = 'block';
    tip.innerHTML = n.title;
  }} else {{
    tip.style.display = 'none';
  }}
}});
</script>
</body>
</html>"""


def main():
    parser = argparse.ArgumentParser(description='knowledge/ グラフHTML生成')
    parser.add_argument('--output', default=str(DEFAULT_OUTPUT), help='出力パス')
    parser.add_argument('--open', action='store_true', help='生成後ブラウザで開く')
    args = parser.parse_args()

    print("knowledge/ をスキャン中...")
    nodes, edges = build_graph()
    print(f"  ノード: {len(nodes)} / エッジ: {len(edges)}")

    generated_at = datetime.now().strftime('%Y-%m-%d %H:%M')
    html = build_html(nodes, edges, generated_at)

    output_path = Path(args.output)
    output_path.write_text(html, encoding='utf-8')
    print(f"完了: {output_path}")

    if args.open:
        if sys.platform == 'win32':
            subprocess.run(['start', '', str(output_path)], shell=True)
        else:
            subprocess.run(['open', str(output_path)])


if __name__ == '__main__':
    main()
