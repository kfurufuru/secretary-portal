#!/usr/bin/env python3
"""
build-knowledge-dashboard.py
knowledge/ の全 .md を集計して knowledge/dashboard.html を生成する。

使い方:
  python scripts/build-knowledge-dashboard.py
  python scripts/build-knowledge-dashboard.py --dry-run   # HTML出力せず集計のみ表示
"""

import argparse
import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

import yaml

SECRETARY = Path(__file__).parent.parent
KNOWLEDGE_DIR = SECRETARY / "knowledge"
REVIEWS_DIR = SECRETARY / ".claude" / "reviews"
OUTPUT_HTML = KNOWLEDGE_DIR / "dashboard.html"
OUTPUT_JSON = REVIEWS_DIR / "dashboard-data.json"

# ─── 1. frontmatter 解析 ───────────────────────────────────────────────────────

def parse_file(path: Path) -> dict | None:
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        return None

    fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not fm_match:
        return None

    try:
        fm = yaml.safe_load(fm_match.group(1)) or {}
    except Exception:
        return None

    body = text[fm_match.end():]
    wiki_links = re.findall(r"\[\[.+?\]\]", body)
    related = fm.get("related", []) or []
    tags = fm.get("tags", []) or []

    # related は list[str] か str を想定
    if isinstance(related, str):
        related = [related]
    if isinstance(tags, str):
        tags = [tags]

    rel_path = path.relative_to(KNOWLEDGE_DIR).as_posix()

    return {
        "id": rel_path,
        "title": fm.get("title", path.stem),
        "category": fm.get("category", "未分類"),
        "level": fm.get("level", "draft"),
        "created": str(fm.get("created", "")),
        "last_reviewed": str(fm.get("last_reviewed", "")),
        "score": int(fm.get("understanding_score") or 0),
        "tags": tags,
        "related": related,
        "wiki_links": len(wiki_links),
        "related_count": len(related),
    }


def collect_nodes() -> list[dict]:
    nodes = []
    for path in KNOWLEDGE_DIR.rglob("*.md"):
        if path.name.startswith("_"):
            continue
        node = parse_file(path)
        if node:
            nodes.append(node)
    nodes.sort(key=lambda n: n["created"] or "", reverse=True)
    return nodes


# ─── 2. 集計 ──────────────────────────────────────────────────────────────────

def compute_stats(nodes: list[dict]) -> dict:
    total = len(nodes)
    if total == 0:
        return {}

    levels = {"published": 0, "review": 0, "draft": 0}
    for n in nodes:
        lv = n["level"]
        if lv in levels:
            levels[lv] += 1

    scores = [n["score"] for n in nodes if n["score"] > 0]
    avg_score = round(sum(scores) / len(scores), 1) if scores else 0

    # 孤立ノード: related_count == 0 かつ wiki_links == 0
    isolated = [n for n in nodes if n["related_count"] == 0 and n["wiki_links"] == 0]

    # カテゴリ集計
    cat_count: dict[str, int] = {}
    for n in nodes:
        cat_count[n["category"]] = cat_count.get(n["category"], 0) + 1

    # タグ集計
    tag_count: dict[str, int] = {}
    for n in nodes:
        for t in n["tags"]:
            tag_count[t] = tag_count.get(t, 0) + 1
    top_tags = sorted(tag_count.items(), key=lambda x: -x[1])[:10]

    # ハブノード (related_count >= 4)
    hubs = sorted(
        [n for n in nodes if n["related_count"] >= 4],
        key=lambda n: -n["related_count"],
    )[:5]

    return {
        "total": total,
        "levels": levels,
        "avg_score": avg_score,
        "isolated": isolated,
        "cat_count": cat_count,
        "top_tags": top_tags,
        "hubs": hubs,
        "generated": datetime.now().strftime("%Y-%m-%d %H:%M"),
    }


# ─── 3. 過去レポート履歴（last30days reviews から抽出） ──────────────────────

def parse_review_history() -> list[dict]:
    history = []
    for md in sorted(REVIEWS_DIR.glob("*-last30days.md")):
        m = re.match(r"(\d{4}-\d{2}-\d{2})", md.name)
        if not m:
            continue
        dt = m.group(1)
        text = md.read_text(encoding="utf-8", errors="ignore")

        commits = 0
        files_changed = 0
        isolated_count = 0

        cm = re.search(r"変更コミット数[^\d]*(\d+)", text)
        if cm:
            commits = int(cm.group(1))

        fm = re.search(r"追加/更新ファイル[^\d]*\*\*(\d+)", text)
        if fm:
            files_changed = int(fm.group(1))

        im = re.search(r"孤立ノード[（(][^)）]*[)）][^\d]*\*\*(\d+)件\*\*", text)
        if not im:
            im = re.search(r"孤立[^(\d]*(\d+)件", text)
        if im:
            isolated_count = int(im.group(1))

        history.append({
            "date": dt,
            "commits": commits,
            "files_changed": files_changed,
            "isolated_count": isolated_count,
        })

    return history


# ─── 4. HTML 生成 ──────────────────────────────────────────────────────────────

LEVEL_BADGE = {
    "published": '<span class="badge pub">★ published</span>',
    "review": '<span class="badge rev">◆ review</span>',
    "draft": '<span class="badge draft">● draft</span>',
}

SCORE_BAR = {
    0: '<span class="score-bar"><span style="width:0%"></span></span>',
    1: '<span class="score-bar"><span style="width:20%"></span></span>',
    2: '<span class="score-bar"><span style="width:40%"></span></span>',
    3: '<span class="score-bar"><span style="width:60%"></span></span>',
    4: '<span class="score-bar"><span style="width:80%"></span></span>',
    5: '<span class="score-bar"><span style="width:100%"></span></span>',
}


def rows_html(nodes: list[dict]) -> str:
    lines = []
    for n in nodes:
        lv = n["level"]
        badge = LEVEL_BADGE.get(lv, lv)
        score = n["score"]
        bar = SCORE_BAR.get(score, SCORE_BAR[0])
        tags_html = " ".join(f'<span class="tag">{t}</span>' for t in n["tags"][:4])
        created = n["created"][:10] if n["created"] else "—"
        is_isolated = "isolated" if (n["related_count"] == 0 and n["wiki_links"] == 0) else ""
        lines.append(
            f'<tr data-level="{lv}" data-cat="{n["category"]}" class="{is_isolated}">'
            f'<td class="title-cell">'
            f'<a href="http://localhost:8092/knowledge/{n["id"]}" target="_blank">{n["title"]}</a>'
            f'</td>'
            f'<td><span class="cat-badge">{n["category"]}</span></td>'
            f'<td>{badge}</td>'
            f'<td class="date-cell">{created}</td>'
            f'<td>{bar}<span class="score-num">{score}/5</span></td>'
            f'<td class="num-cell">{n["related_count"]}</td>'
            f'<td class="tags-cell">{tags_html}</td>'
            f'</tr>'
        )
    return "\n".join(lines)


def cat_chart_data(cat_count: dict) -> str:
    items = sorted(cat_count.items(), key=lambda x: -x[1])
    labels = json.dumps([c for c, _ in items], ensure_ascii=False)
    data = json.dumps([v for _, v in items])
    return labels, data


def history_chart_data(history: list[dict]) -> tuple[str, str, str]:
    labels = json.dumps([h["date"] for h in history])
    commits = json.dumps([h["commits"] for h in history])
    isolated = json.dumps([h["isolated_count"] for h in history])
    return labels, commits, isolated


def build_html(nodes: list[dict], stats: dict, history: list[dict]) -> str:
    rows = rows_html(nodes)
    cat_labels, cat_data = cat_chart_data(stats.get("cat_count", {}))
    hist_labels, hist_commits, hist_isolated = history_chart_data(history)
    top_tags = stats.get("top_tags", [])
    top_tags_html = "".join(
        f'<div class="tag-item"><span class="tag">{t}</span><span class="tag-count">{c}</span></div>'
        for t, c in top_tags
    )
    hubs = stats.get("hubs", [])
    hubs_html = "".join(
        f'<div class="hub-item"><span class="hub-title">{h["title"][:28]}</span>'
        f'<span class="hub-links">{h["related_count"]} links</span></div>'
        for h in hubs
    )
    isolated = stats.get("isolated", [])
    isolated_html = "".join(
        f'<div class="iso-item">⚠ <a href="http://localhost:8092/knowledge/{n["id"]}" target="_blank">{n["title"]}</a></div>'
        for n in isolated[:10]
    )
    levels = stats.get("levels", {})
    total = stats.get("total", 0)
    avg_score = stats.get("avg_score", 0)
    generated = stats.get("generated", "")
    iso_count = len(isolated)

    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>知識ダッシュボード — 古舘ナレッジベース</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {{
  --bg: #0f172a; --surface: #1e293b; --surface2: #263348;
  --border: #334155; --text: #e2e8f0; --sub: #94a3b8; --accent: #38bdf8;
  --green: #10b981; --amber: #f59e0b; --blue: #60a5fa; --purple: #c084fc;
  --red: #f87171;
  --font: 'Inter','Noto Sans JP',sans-serif;
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ background: var(--bg); color: var(--text); font-family: var(--font);
        font-size: 0.88rem; line-height: 1.6;
        line-break: strict; overflow-wrap: break-word; }}

/* ─── Header ─── */
header {{ background: var(--surface); border-bottom: 1px solid var(--border);
          padding: 12px 20px; display: flex; align-items: center; gap: 14px; }}
header h1 {{ font-size: 1rem; font-weight: 700; color: var(--accent); }}
.gen-time {{ font-size: 0.72rem; color: var(--sub); margin-left: auto; }}
.back-link {{ font-size: 0.75rem; color: var(--sub); text-decoration: none;
              border: 1px solid var(--border); border-radius: 4px; padding: 3px 8px; }}
.back-link:hover {{ color: var(--accent); border-color: var(--accent); }}

/* ─── Layout ─── */
.main {{ max-width: 1300px; margin: 0 auto; padding: 20px 16px 60px; }}

/* ─── KPI Cards ─── */
.kpi-row {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px; margin-bottom: 24px; }}
.kpi {{ background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
         padding: 14px 16px; }}
.kpi-label {{ font-size: 0.72rem; color: var(--sub); margin-bottom: 4px; }}
.kpi-value {{ font-size: 1.6rem; font-weight: 700; color: var(--text); }}
.kpi-value.green {{ color: var(--green); }}
.kpi-value.amber {{ color: var(--amber); }}
.kpi-value.red {{ color: var(--red); }}
.kpi-sub {{ font-size: 0.7rem; color: var(--sub); margin-top: 2px; }}

/* ─── 2-col grid ─── */
.two-col {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }}
@media (max-width: 768px) {{ .two-col {{ grid-template-columns: 1fr; }} }}
.three-col {{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px; }}
@media (max-width: 900px) {{ .three-col {{ grid-template-columns: 1fr; }} }}

/* ─── Card ─── */
.card {{ background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
          padding: 16px; }}
.card-title {{ font-size: 0.8rem; font-weight: 700; color: var(--sub); text-transform: uppercase;
               letter-spacing: 0.06em; margin-bottom: 12px; }}
.chart-wrap {{ position: relative; height: 200px; }}

/* ─── Tags / Hubs / Isolated lists ─── */
.tag-item, .hub-item, .iso-item {{ display: flex; align-items: center; gap: 8px;
  padding: 5px 0; border-bottom: 1px solid var(--border); font-size: 0.78rem; }}
.tag-item:last-child, .hub-item:last-child, .iso-item:last-child {{ border-bottom: none; }}
.tag {{ display: inline-block; background: #1e3a5f; color: var(--blue); font-size: 0.68rem;
         padding: 1px 6px; border-radius: 4px; }}
.tag-count, .hub-links {{ margin-left: auto; color: var(--sub); font-size: 0.72rem;
  background: var(--surface2); border-radius: 10px; padding: 1px 7px; }}
.hub-title {{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 180px; }}
.iso-item a {{ color: var(--amber); text-decoration: none; overflow: hidden;
                text-overflow: ellipsis; white-space: nowrap; }}
.iso-item a:hover {{ text-decoration: underline; }}

/* ─── Controls ─── */
.controls {{ display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }}
.ctrl-input {{ background: var(--surface2); border: 1px solid var(--border); border-radius: 6px;
               color: var(--text); font-size: 0.8rem; padding: 5px 10px; outline: none;
               font-family: var(--font); }}
.ctrl-input:focus {{ border-color: var(--accent); }}
.filter-btn {{ background: var(--surface2); border: 1px solid var(--border); border-radius: 4px;
               color: var(--sub); font-size: 0.72rem; padding: 4px 9px; cursor: pointer;
               font-family: var(--font); transition: all 0.15s; }}
.filter-btn.active {{ background: var(--accent); color: #0f172a; border-color: var(--accent); font-weight: 600; }}
.filter-btn[data-filter="published"].active {{ background: var(--green); border-color: var(--green); color: #0f172a; }}
.filter-btn[data-filter="review"].active {{ background: var(--blue); border-color: var(--blue); color: #0f172a; }}
.filter-btn[data-filter="draft"].active {{ background: var(--purple); border-color: var(--purple); color: #0f172a; }}
.filter-btn[data-filter="isolated"].active {{ background: var(--amber); border-color: var(--amber); color: #0f172a; }}

/* ─── Table ─── */
.table-wrap {{ overflow-x: auto; }}
table {{ width: 100%; border-collapse: collapse; font-size: 0.8rem; }}
th {{ background: var(--surface2); color: var(--sub); text-align: left;
       padding: 8px 10px; border-bottom: 1px solid var(--border); font-weight: 600;
       cursor: pointer; white-space: nowrap; user-select: none; }}
th:hover {{ color: var(--accent); }}
th.sort-asc::after {{ content: ' ▲'; font-size: 0.6rem; }}
th.sort-desc::after {{ content: ' ▼'; font-size: 0.6rem; }}
td {{ padding: 7px 10px; border-bottom: 1px solid var(--border); vertical-align: middle; }}
tr:hover td {{ background: var(--surface2); }}
tr.isolated td {{ }}
tr.isolated .title-cell a {{ color: var(--amber); }}
.title-cell a {{ color: var(--text); text-decoration: none; }}
.title-cell a:hover {{ color: var(--accent); text-decoration: underline; }}
.title-cell {{ max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }}
.cat-badge {{ display: inline-block; background: var(--surface2); border: 1px solid var(--border);
               border-radius: 4px; padding: 1px 6px; font-size: 0.68rem; color: var(--sub); white-space: nowrap; }}
.badge {{ font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; white-space: nowrap; }}
.badge.pub {{ background: #052e16; color: var(--green); }}
.badge.rev {{ background: #1e3a5f; color: var(--blue); }}
.badge.draft {{ background: #2e1065; color: var(--purple); }}
.score-bar {{ display: inline-block; width: 52px; height: 6px; background: var(--border);
               border-radius: 3px; vertical-align: middle; margin-right: 4px; overflow: hidden; }}
.score-bar span {{ display: block; height: 100%; background: var(--accent); border-radius: 3px; }}
.score-num {{ font-size: 0.7rem; color: var(--sub); }}
.num-cell {{ text-align: center; color: var(--sub); }}
.date-cell {{ font-size: 0.75rem; color: var(--sub); white-space: nowrap; }}
.tags-cell {{ max-width: 200px; overflow: hidden; }}
.count-info {{ font-size: 0.75rem; color: var(--sub); margin-bottom: 8px; }}
</style>
</head>
<body>
<header>
  <h1>📊 知識ダッシュボード</h1>
  <a class="back-link" href="../portal-v2.html">← ポータル</a>
  <a class="back-link" href="knowledge-graph.html">知識グラフ</a>
  <span class="gen-time">生成: {generated}</span>
</header>
<div class="main">

  <!-- KPI -->
  <div class="kpi-row">
    <div class="kpi">
      <div class="kpi-label">総ファイル数</div>
      <div class="kpi-value">{total}</div>
      <div class="kpi-sub">knowledge/ 配下</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">published</div>
      <div class="kpi-value green">{levels.get('published', 0)}</div>
      <div class="kpi-sub">完成済み知識</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">review</div>
      <div class="kpi-value" style="color:var(--blue)">{levels.get('review', 0)}</div>
      <div class="kpi-sub">レビュー中</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">draft</div>
      <div class="kpi-value" style="color:var(--purple)">{levels.get('draft', 0)}</div>
      <div class="kpi-sub">下書き</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">平均理解度</div>
      <div class="kpi-value amber">{avg_score}</div>
      <div class="kpi-sub">/ 5.0</div>
    </div>
    <div class="kpi">
      <div class="kpi-label">孤立ノード</div>
      <div class="kpi-value {'red' if iso_count > 0 else 'green'}">{iso_count}</div>
      <div class="kpi-sub">接続なし</div>
    </div>
  </div>

  <!-- Charts row -->
  <div class="three-col">
    <div class="card">
      <div class="card-title">カテゴリ分布</div>
      <div class="chart-wrap"><canvas id="catChart"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">上位タグ (top10)</div>
      <div style="overflow-y:auto;max-height:200px">{top_tags_html}</div>
    </div>
    <div class="card">
      <div class="card-title">ハブノード (links多)</div>
      <div style="overflow-y:auto;max-height:200px">{hubs_html if hubs_html else '<span style="color:var(--sub);font-size:0.78rem">データなし</span>'}</div>
    </div>
  </div>

  <!-- History charts -->
  <div class="two-col">
    <div class="card">
      <div class="card-title">月次コミット推移</div>
      <div class="chart-wrap"><canvas id="commitChart"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">孤立ノード推移</div>
      <div class="chart-wrap"><canvas id="isolatedChart"></canvas></div>
    </div>
  </div>

  <!-- Isolated -->
  {'<div class="card" style="margin-bottom:24px"><div class="card-title">⚠ 孤立ノード一覧（接続なし）</div>' + isolated_html + '</div>' if isolated_html else ''}

  <!-- Table -->
  <div class="card">
    <div class="card-title">全ナレッジ一覧</div>
    <div class="controls">
      <input class="ctrl-input" id="search" placeholder="🔍 タイトル・タグで検索…" style="width:220px">
      <button class="filter-btn active" data-filter="all">すべて</button>
      <button class="filter-btn" data-filter="published">★ published</button>
      <button class="filter-btn" data-filter="review">◆ review</button>
      <button class="filter-btn" data-filter="draft">● draft</button>
      <button class="filter-btn" data-filter="isolated">⚠ 孤立</button>
    </div>
    <div class="count-info" id="count-info">{total} 件</div>
    <div class="table-wrap">
      <table id="main-table">
        <thead>
          <tr>
            <th data-col="title">タイトル</th>
            <th data-col="category">カテゴリ</th>
            <th data-col="level">レベル</th>
            <th data-col="created">作成日</th>
            <th data-col="score">理解度</th>
            <th data-col="related">リンク数</th>
            <th>タグ</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {rows}
        </tbody>
      </table>
    </div>
  </div>
</div>

<script>
// ─── Charts ───────────────────────────────────────────────────────────────────
const chartDefaults = {{
  plugins: {{ legend: {{ labels: {{ color: '#94a3b8', font: {{ size: 11 }} }} }} }},
  scales: {{ x: {{ ticks: {{ color: '#94a3b8' }}, grid: {{ color: '#334155' }} }},
             y: {{ ticks: {{ color: '#94a3b8' }}, grid: {{ color: '#334155' }}, beginAtZero: true }} }}
}};

new Chart(document.getElementById('catChart'), {{
  type: 'doughnut',
  data: {{ labels: {cat_labels}, datasets: [{{ data: {cat_data},
    backgroundColor: ['#7c3aed','#0284c7','#ea580c','#059669','#b45309','#0891b2','#dc2626'],
    borderColor: '#1e293b', borderWidth: 2 }}] }},
  options: {{ responsive: true, maintainAspectRatio: false,
    plugins: {{ legend: {{ position: 'bottom', labels: {{ color: '#94a3b8', font: {{ size: 10 }}, padding: 8 }} }} }} }}
}});

const hLabels = {hist_labels};
const hCommits = {hist_commits};
const hIsolated = {hist_isolated};

if (hLabels.length > 0) {{
  new Chart(document.getElementById('commitChart'), {{
    type: 'bar',
    data: {{ labels: hLabels, datasets: [{{ label: 'コミット数', data: hCommits,
      backgroundColor: 'rgba(56,189,248,0.5)', borderColor: '#38bdf8', borderWidth: 1 }}] }},
    options: {{ responsive: true, maintainAspectRatio: false, ...chartDefaults }}
  }});
  new Chart(document.getElementById('isolatedChart'), {{
    type: 'line',
    data: {{ labels: hLabels, datasets: [{{ label: '孤立ノード数', data: hIsolated,
      borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.15)',
      fill: true, tension: 0.3 }}] }},
    options: {{ responsive: true, maintainAspectRatio: false, ...chartDefaults }}
  }});
}} else {{
  ['commitChart','isolatedChart'].forEach(id => {{
    const ctx = document.getElementById(id);
    ctx.parentElement.innerHTML = '<p style="color:var(--sub);font-size:0.78rem;padding-top:60px;text-align:center">レビュー履歴なし<br>.claude/reviews/ に *-last30days.md を蓄積すると表示されます</p>';
  }});
}}

// ─── Table filter / sort ──────────────────────────────────────────────────────
const tbody = document.getElementById('tbody');
const rows = Array.from(tbody.querySelectorAll('tr'));
let activeFilter = 'all';
let sortCol = null;
let sortDir = 1;

function applyFilter() {{
  const q = document.getElementById('search').value.toLowerCase();
  let shown = 0;
  rows.forEach(row => {{
    const title = row.querySelector('.title-cell').textContent.toLowerCase();
    const tags = row.querySelector('.tags-cell').textContent.toLowerCase();
    const level = row.dataset.level;
    const isolated = row.classList.contains('isolated');
    let visible = true;
    if (q && !title.includes(q) && !tags.includes(q)) visible = false;
    if (activeFilter === 'published' && level !== 'published') visible = false;
    if (activeFilter === 'review' && level !== 'review') visible = false;
    if (activeFilter === 'draft' && level !== 'draft') visible = false;
    if (activeFilter === 'isolated' && !isolated) visible = false;
    row.style.display = visible ? '' : 'none';
    if (visible) shown++;
  }});
  document.getElementById('count-info').textContent = shown + ' / {total} 件';
}}

document.getElementById('search').addEventListener('input', applyFilter);

document.querySelectorAll('.filter-btn').forEach(btn => {{
  btn.addEventListener('click', () => {{
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilter();
  }});
}});

document.querySelectorAll('th[data-col]').forEach(th => {{
  th.addEventListener('click', () => {{
    const col = th.dataset.col;
    if (sortCol === col) {{ sortDir *= -1; }}
    else {{ sortCol = col; sortDir = 1; }}
    document.querySelectorAll('th').forEach(t => t.classList.remove('sort-asc','sort-desc'));
    th.classList.add(sortDir === 1 ? 'sort-asc' : 'sort-desc');

    const colIdx = {{ title: 0, category: 1, level: 2, created: 3, score: 4, related: 5 }}[col];
    rows.sort((a, b) => {{
      const av = a.cells[colIdx]?.textContent.trim() || '';
      const bv = b.cells[colIdx]?.textContent.trim() || '';
      if (!isNaN(av) && !isNaN(bv)) return (parseFloat(av) - parseFloat(bv)) * sortDir;
      return av.localeCompare(bv, 'ja') * sortDir;
    }});
    rows.forEach(r => tbody.appendChild(r));
  }});
}});
</script>
</body>
</html>
"""


# ─── 5. main ──────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    nodes = collect_nodes()
    stats = compute_stats(nodes)
    history = parse_review_history()

    print(f"知識ファイル: {stats['total']} 件")
    print(f"  published={stats['levels'].get('published',0)}, review={stats['levels'].get('review',0)}, draft={stats['levels'].get('draft',0)}")
    print(f"  平均理解度: {stats['avg_score']}")
    print(f"  孤立ノード: {len(stats['isolated'])} 件")
    print(f"  レポート履歴: {len(history)} 件")

    if args.dry_run:
        print("--dry-run: HTML出力をスキップ")
        return

    html = build_html(nodes, stats, history)
    OUTPUT_HTML.write_text(html, encoding="utf-8")
    print(f"[OK] {OUTPUT_HTML}")

    # JSON も保存
    REVIEWS_DIR.mkdir(parents=True, exist_ok=True)
    data = {"generated": stats["generated"], "nodes": nodes, "stats": {
        "total": stats["total"],
        "levels": stats["levels"],
        "avg_score": stats["avg_score"],
        "isolated_count": len(stats["isolated"]),
        "cat_count": stats["cat_count"],
    }}
    OUTPUT_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[OK] {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
