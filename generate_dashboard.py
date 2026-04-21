#!/usr/bin/env python3
"""Generate static dashboard.html from .secretary/ markdown files"""

import re
import os
from pathlib import Path
from datetime import datetime

BASE = Path(__file__).parent
OUT = BASE / "dashboard.html"


def parse_frontmatter(content):
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm = {}
            for line in parts[1].strip().split("\n"):
                if ":" in line:
                    k, v = line.split(":", 1)
                    fm[k.strip()] = v.strip().strip("\"'")
            return fm, parts[2]
    return {}, content


def scan_knowledge():
    counts = {"draft": [], "review": [], "published": []}
    files = sorted(
        [f for f in BASE.glob("knowledge/**/*.md") if not f.name.startswith("_")],
        key=lambda x: x.stat().st_mtime,
        reverse=True,
    )
    for f in files:
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
            fm, _ = parse_frontmatter(content)
            level = fm.get("level", "draft")
            if level in counts:
                counts[level].append(
                    {
                        "name": f.stem,
                        "title": fm.get("title", f.stem),
                        "category": fm.get("category", ""),
                        "mtime": datetime.fromtimestamp(f.stat().st_mtime).strftime("%m-%d"),
                    }
                )
        except Exception:
            pass
    return counts


def scan_todos():
    todos = []
    for f in sorted(BASE.glob("todos/*.md"), key=lambda x: x.stat().st_mtime, reverse=True):
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
            for line in content.split("\n"):
                if re.match(r"\s*-\s*\[\s*\]\s+", line):
                    task = re.sub(r"\s*-\s*\[\s*\]\s+", "", line).strip()
                    todos.append({"task": task, "file": f.stem})
        except Exception:
            pass
    return todos[:15]


def scan_recent(folder, limit=6):
    items = []
    try:
        files = sorted(
            [f for f in BASE.glob(f"{folder}/*.md") if not f.name.startswith("_")],
            key=lambda x: x.stat().st_mtime,
            reverse=True,
        )[:limit]
        for f in files:
            content = f.read_text(encoding="utf-8", errors="ignore")
            fm, _ = parse_frontmatter(content)
            items.append(
                {
                    "name": f.stem,
                    "title": fm.get("title", f.stem),
                    "mtime": datetime.fromtimestamp(f.stat().st_mtime).strftime("%m-%d"),
                }
            )
    except Exception:
        pass
    return items


def esc(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render_knowledge_row(item):
    return f'<div class="kb-item"><span class="kb-name">{esc(item["name"])}</span><span class="kb-date">{esc(item["mtime"])}</span></div>'


def render_todo(item):
    return f'<div class="todo-item"><span class="todo-dot">○</span><span class="todo-text">{esc(item["task"])}</span></div>'


def render_recent_item(item):
    return f'<div class="recent-item"><span class="recent-name">{esc(item["name"])}</span><span class="recent-date">{esc(item["mtime"])}</span></div>'


def main():
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    knowledge = scan_knowledge()
    todos = scan_todos()
    ideas = scan_recent("ideas")
    denken = scan_recent("denken-study")

    draft_count = len(knowledge["draft"])
    review_count = len(knowledge["review"])
    published_count = len(knowledge["published"])
    total = draft_count + review_count + published_count

    draft_rows = "".join(render_knowledge_row(i) for i in knowledge["draft"][:8])
    review_rows = "".join(render_knowledge_row(i) for i in knowledge["review"][:8])
    todo_rows = "".join(render_todo(t) for t in todos) or '<div class="empty">タスクなし</div>'
    idea_rows = "".join(render_recent_item(i) for i in ideas) or '<div class="empty">なし</div>'
    denken_rows = "".join(render_recent_item(i) for i in denken) or '<div class="empty">なし</div>'

    html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Secretary Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap">
<style>
:root {{
  --bg: #0d1117; --bg2: #161b22; --bg3: #1c2128;
  --border: rgba(255,255,255,0.08); --border2: rgba(255,255,255,0.04);
  --text: #e6edf3; --text2: #8b949e; --text3: #6e7681;
  --cyan: #38bdf8; --green: #3fb950; --yellow: #d29922; --purple: #a78bfa;
  --orange: #f97316; --red: #f85149;
  --font: 'Inter','Noto Sans JP',sans-serif;
  --radius: 10px; --transition: 0.2s ease;
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ background: var(--bg); color: var(--text); font-family: var(--font); font-size: 14px; line-height: 1.6; min-height: 100vh; padding: 24px 16px; }}
.header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }}
.header h1 {{ font-size: 1.4rem; font-weight: 700; color: var(--cyan); }}
.header .meta {{ font-size: 12px; color: var(--text3); }}
.grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }}
.card {{ background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }}
.card-title {{ font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text2); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }}
.card-title::before {{ content: ''; display: inline-block; width: 3px; height: 12px; border-radius: 2px; background: var(--cyan); }}
.card-title.green::before {{ background: var(--green); }}
.card-title.yellow::before {{ background: var(--yellow); }}
.card-title.purple::before {{ background: var(--purple); }}
.card-title.orange::before {{ background: var(--orange); }}

/* Stats */
.stats-row {{ display: flex; gap: 12px; margin-bottom: 16px; }}
.stat {{ flex: 1; background: var(--bg3); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid var(--border2); }}
.stat-val {{ font-size: 2rem; font-weight: 700; line-height: 1; }}
.stat-lbl {{ font-size: 11px; color: var(--text3); margin-top: 4px; }}
.stat.draft .stat-val {{ color: var(--yellow); }}
.stat.review .stat-val {{ color: var(--cyan); }}
.stat.published .stat-val {{ color: var(--green); }}
.stat.total .stat-val {{ color: var(--text); }}

/* Items */
.kb-item, .todo-item, .recent-item {{ display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--border2); font-size: 12px; gap: 8px; }}
.kb-item:last-child, .todo-item:last-child, .recent-item:last-child {{ border-bottom: none; }}
.kb-name, .todo-text, .recent-name {{ color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }}
.kb-date, .recent-date {{ color: var(--text3); flex-shrink: 0; font-size: 11px; }}
.todo-dot {{ color: var(--yellow); flex-shrink: 0; margin-right: 4px; }}
.empty {{ color: var(--text3); font-size: 12px; padding: 8px 0; }}

/* Progress bar */
.progress-wrap {{ margin-top: 12px; }}
.progress-bar {{ background: var(--bg3); border-radius: 4px; height: 6px; overflow: hidden; display: flex; }}
.progress-seg {{ height: 100%; transition: width var(--transition); }}
.progress-seg.draft {{ background: var(--yellow); }}
.progress-seg.review {{ background: var(--cyan); }}
.progress-seg.published {{ background: var(--green); }}
.progress-legend {{ display: flex; gap: 12px; margin-top: 8px; }}
.legend-item {{ display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--text2); }}
.legend-dot {{ width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }}

.refresh-link {{ display: block; text-align: center; margin-top: 24px; font-size: 12px; color: var(--text3); }}
.refresh-link a {{ color: var(--cyan); text-decoration: none; }}
</style>
</head>
<body>
<div class="header">
  <h1>📊 Secretary Dashboard</h1>
  <div class="meta">生成: {now} | <a href="portal-v2.html" style="color:var(--cyan);text-decoration:none;">← Portal</a></div>
</div>

<div class="grid">

  <!-- 知識昇格状況 -->
  <div class="card" style="grid-column: 1 / -1;">
    <div class="card-title">Knowledge Base 昇格状況</div>
    <div class="stats-row">
      <div class="stat draft"><div class="stat-val">{draft_count}</div><div class="stat-lbl">draft</div></div>
      <div class="stat review"><div class="stat-val">{review_count}</div><div class="stat-lbl">review</div></div>
      <div class="stat published"><div class="stat-val">{published_count}</div><div class="stat-lbl">published</div></div>
      <div class="stat total"><div class="stat-val">{total}</div><div class="stat-lbl">total</div></div>
    </div>
    <div class="progress-wrap">
      <div class="progress-bar">
        <div class="progress-seg draft" style="width:{draft_count/max(total,1)*100:.1f}%"></div>
        <div class="progress-seg review" style="width:{review_count/max(total,1)*100:.1f}%"></div>
        <div class="progress-seg published" style="width:{published_count/max(total,1)*100:.1f}%"></div>
      </div>
      <div class="progress-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--yellow)"></div>draft {draft_count/max(total,1)*100:.0f}%</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--cyan)"></div>review {review_count/max(total,1)*100:.0f}%</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--green)"></div>published {published_count/max(total,1)*100:.0f}%</div>
      </div>
    </div>
  </div>

  <!-- draft一覧 -->
  <div class="card">
    <div class="card-title yellow">昇格待ち Draft ({draft_count}件)</div>
    {draft_rows or '<div class="empty">なし</div>'}
  </div>

  <!-- review一覧 -->
  <div class="card">
    <div class="card-title">レビュー中 Review ({review_count}件)</div>
    {review_rows or '<div class="empty">なし</div>'}
  </div>

  <!-- TODO -->
  <div class="card">
    <div class="card-title orange">未完了 TODO</div>
    {todo_rows}
  </div>

  <!-- 電験学習 -->
  <div class="card">
    <div class="card-title green">電験学習 最近のログ</div>
    {denken_rows}
  </div>

  <!-- アイデア -->
  <div class="card">
    <div class="card-title purple">最近のアイデア</div>
    {idea_rows}
  </div>

</div>

<p class="refresh-link">更新: <a href="javascript:location.reload()">リロード</a> | 再生成: <code>py generate_dashboard.py</code></p>
</body>
</html>"""

    OUT.write_text(html, encoding="utf-8")
    print(f"OK dashboard.html generated ({total} knowledge, {len(todos)} todos)")
    print(f"   draft: {draft_count} / review: {review_count} / published: {published_count}")


if __name__ == "__main__":
    main()
