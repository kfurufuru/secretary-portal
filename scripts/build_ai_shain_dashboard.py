#!/usr/bin/env python3
"""AI社員諮問ダッシュボード HTML生成

入力: .secretary/logs/ai-shain-consult.jsonl
出力: .secretary/dashboards/ai-shain-stats.html

使い方:
    python scripts/build_ai_shain_dashboard.py

設計:
- Chart.js CDN利用・データはHTMLに直接埋め込み（API不要・オフライン閲覧可）
- パターン分布パイ・カテゴリ分布パイ・日次呼出折れ線・少数派ペルソナバー
- スマホ最適化（responsive grid）
- 拡張判断ヒント（split率・少数派固定率・4人目検討トリガー）も表示
"""
import json
import sys
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

LOG_PATH = Path(r"C:\Users\kfuru\.secretary\logs\ai-shain-consult.jsonl")
OUT_PATH = Path(r"C:\Users\kfuru\.secretary\dashboards\ai-shain-stats.html")


def load_records():
    if not LOG_PATH.exists():
        return []
    records = []
    with LOG_PATH.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                records.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return records


def daily_counts(records, days=30):
    cutoff = (datetime.now() - timedelta(days=days)).date()
    daily = defaultdict(int)
    for r in records:
        ts = r.get("ts", "")[:10]
        if not ts:
            continue
        try:
            d = datetime.strptime(ts, "%Y-%m-%d").date()
        except ValueError:
            continue
        if d >= cutoff:
            daily[ts] += 1
    # 連続日埋め
    series = []
    for i in range(days, -1, -1):
        d = (datetime.now() - timedelta(days=i)).date().isoformat()
        series.append({"date": d, "count": daily.get(d, 0)})
    return series


def get_sync_status():
    """work-rules.md SoT vs Mirror の同期状態を取得"""
    import hashlib
    sot = Path(r"C:\Users\kfuru\denken-wiki\.claude\rules\work-rules.md")
    mirror = Path(r"C:\Users\kfuru\.secretary\.claude\rules\work-rules.md")
    if not sot.exists() or not mirror.exists():
        return {"available": False, "match": False, "sot_exists": sot.exists(), "mirror_exists": mirror.exists()}
    sot_md5 = hashlib.md5(sot.read_bytes()).hexdigest()
    mirror_md5 = hashlib.md5(mirror.read_bytes()).hexdigest()
    mirror_mtime = datetime.fromtimestamp(mirror.stat().st_mtime).isoformat(timespec="seconds")
    return {
        "available": True,
        "match": sot_md5 == mirror_md5,
        "sot_md5": sot_md5[:8],
        "mirror_md5": mirror_md5[:8],
        "mirror_mtime": mirror_mtime,
    }


def build_html(records):
    total = len(records)
    patterns = Counter(r.get("pattern", "?") for r in records)
    categories = Counter(r.get("category", "other") for r in records)
    sync_status = get_sync_status()
    minorities = Counter(
        r.get("minority_persona", "none")
        for r in records
        if r.get("pattern") == "majority" and r.get("minority_persona") != "none"
    )
    daily = daily_counts(records, days=30)

    # 拡張判断ヒント
    hints = []
    if total >= 20:
        split_pct = patterns.get("split", 0) / total * 100
        minority_pct = sum(1 for r in records if r.get("minority_adopted")) / total * 100
        if split_pct >= 30:
            hints.append(f"⚠️ split率 {split_pct:.0f}%（前提整理スキル追加検討）")
        if minority_pct >= 30:
            hints.append(f"⚠️ 少数派採用率 {minority_pct:.0f}%（構造的負債領域に偏り？）")
        if minorities:
            top, c = minorities.most_common(1)[0]
            fix = c / sum(minorities.values())
            if fix >= 0.6:
                hints.append(f"⚠️ 少数派が {top} に偏り {c}/{sum(minorities.values())}件（{fix*100:.0f}%）")
            if total >= 50 and split_pct >= 25 and fix >= 0.5:
                hints.append(f"🚨 ペルソナ4人目検討推奨（N={total} / split{split_pct:.0f}% / 少数派{top}固定{fix*100:.0f}%）")
    else:
        hints.append(f"（サンプル不足 N={total}・拡張判断は20件以降）")

    data = {
        "total": total,
        "pattern_labels": ["unanimous", "majority", "split"],
        "pattern_values": [patterns.get(p, 0) for p in ["unanimous", "majority", "split"]],
        "category_labels": [k for k, _ in categories.most_common()],
        "category_values": [v for _, v in categories.most_common()],
        "minority_labels": [k for k, _ in minorities.most_common()],
        "minority_values": [v for _, v in minorities.most_common()],
        "daily_labels": [d["date"][5:] for d in daily],
        "daily_values": [d["count"] for d in daily],
        "hints": hints,
        "sync_status": sync_status,
        "generated": datetime.now().isoformat(timespec="seconds"),
    }
    data_json = json.dumps(data, ensure_ascii=False)

    html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI社員諮問ダッシュボード</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
  :root {{ --bg: #0f172a; --card: #1e293b; --text: #e2e8f0; --muted: #94a3b8; --accent: #38bdf8; }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; padding: 1rem; background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Yu Gothic UI", sans-serif; }}
  h1 {{ font-size: 1.4rem; margin: 0 0 0.5rem; }}
  .meta {{ color: var(--muted); font-size: 0.85rem; margin-bottom: 1rem; }}
  .total {{ font-size: 2.5rem; font-weight: bold; color: var(--accent); }}
  .hints {{ background: var(--card); padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; }}
  .hints ul {{ margin: 0; padding-left: 1.2rem; }}
  .hints li {{ margin: 0.25rem 0; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }}
  .card {{ background: var(--card); padding: 1rem; border-radius: 8px; }}
  .card h2 {{ font-size: 1rem; margin: 0 0 0.5rem; color: var(--muted); }}
  canvas {{ max-width: 100%; }}
</style>
</head>
<body>
  <h1>AI社員諮問ダッシュボード</h1>
  <div class="meta">生成: <span id="generated"></span>　ログ: ai-shain-consult.jsonl</div>
  <div class="total"><span id="total"></span> <span style="font-size: 1rem; color: var(--muted);">件</span></div>
  <div class="hints" id="hints-box"></div>
  <div class="grid">
    <div class="card"><h2>一致パターン分布</h2><canvas id="patternChart"></canvas></div>
    <div class="card"><h2>カテゴリ分布</h2><canvas id="categoryChart"></canvas></div>
    <div class="card"><h2>日次呼出数（直近30日）</h2><canvas id="dailyChart"></canvas></div>
    <div class="card"><h2>少数派ペルソナ（majority時）</h2><canvas id="minorityChart"></canvas></div>
    <div class="card" id="sync-card"><h2>work-rules.md 同期状態</h2><div id="sync-body"></div></div>
  </div>
<script>
const DATA = {data_json};
document.getElementById('generated').textContent = DATA.generated;
document.getElementById('total').textContent = DATA.total;

const hintsBox = document.getElementById('hints-box');
if (DATA.hints.length > 0) {{
  hintsBox.innerHTML = '<strong>拡張判断ヒント</strong><ul>' + DATA.hints.map(h => '<li>' + h + '</li>').join('') + '</ul>';
}} else {{
  hintsBox.style.display = 'none';
}}

const PIE_COLORS = ['#38bdf8','#fb923c','#f472b6','#a3e635','#facc15','#c084fc'];

new Chart(document.getElementById('patternChart'), {{
  type: 'doughnut',
  data: {{ labels: DATA.pattern_labels, datasets: [{{ data: DATA.pattern_values, backgroundColor: PIE_COLORS }}] }},
  options: {{ plugins: {{ legend: {{ labels: {{ color: '#e2e8f0' }} }} }} }}
}});

new Chart(document.getElementById('categoryChart'), {{
  type: 'doughnut',
  data: {{ labels: DATA.category_labels, datasets: [{{ data: DATA.category_values, backgroundColor: PIE_COLORS }}] }},
  options: {{ plugins: {{ legend: {{ labels: {{ color: '#e2e8f0' }} }} }} }}
}});

new Chart(document.getElementById('dailyChart'), {{
  type: 'line',
  data: {{ labels: DATA.daily_labels, datasets: [{{ label: '呼出数', data: DATA.daily_values, borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.2)', tension: 0.2 }}] }},
  options: {{
    plugins: {{ legend: {{ labels: {{ color: '#e2e8f0' }} }} }},
    scales: {{
      x: {{ ticks: {{ color: '#94a3b8', maxRotation: 0, autoSkip: true, maxTicksLimit: 8 }} }},
      y: {{ ticks: {{ color: '#94a3b8', precision: 0 }}, beginAtZero: true }}
    }}
  }}
}});

// work-rules sync状態表示
const syncBody = document.getElementById('sync-body');
const ss = DATA.sync_status;
if (!ss.available) {{
  syncBody.innerHTML = '<div style="color:#fb923c;">⚠️ ファイル不在（SoT:' + ss.sot_exists + ' / Mirror:' + ss.mirror_exists + '）</div>';
}} else if (ss.match) {{
  syncBody.innerHTML = '<div style="color:#a3e635; font-size:1.5rem;">✅ 同期OK</div>' +
    '<div style="color:var(--muted); font-size:0.85rem; margin-top:0.5rem;">MD5: ' + ss.sot_md5 + '...</div>' +
    '<div style="color:var(--muted); font-size:0.85rem;">Mirror mtime: ' + ss.mirror_mtime + '</div>';
}} else {{
  syncBody.innerHTML = '<div style="color:#f472b6; font-size:1.5rem;">⚠️ DIFF</div>' +
    '<div style="color:var(--muted); font-size:0.85rem; margin-top:0.5rem;">SoT: ' + ss.sot_md5 + '... / Mirror: ' + ss.mirror_md5 + '...</div>' +
    '<div style="color:var(--muted); font-size:0.85rem;">→ python scripts/sync-work-rules.py --apply</div>';
}}

if (DATA.minority_labels.length > 0) {{
  new Chart(document.getElementById('minorityChart'), {{
    type: 'bar',
    data: {{ labels: DATA.minority_labels, datasets: [{{ label: '回数', data: DATA.minority_values, backgroundColor: PIE_COLORS }}] }},
    options: {{
      plugins: {{ legend: {{ display: false }} }},
      scales: {{
        x: {{ ticks: {{ color: '#94a3b8' }} }},
        y: {{ ticks: {{ color: '#94a3b8', precision: 0 }}, beginAtZero: true }}
      }}
    }}
  }});
}} else {{
  document.getElementById('minorityChart').parentElement.innerHTML += '<div style="color: var(--muted); padding: 1rem;">少数派ペルソナ記録なし</div>';
}}
</script>
</body>
</html>
"""
    return html


def main():
    records = load_records()
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    html = build_html(records)
    OUT_PATH.write_text(html, encoding="utf-8")
    print(f"[OK] generated: {OUT_PATH} ({len(records)} records)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
