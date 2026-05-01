#!/usr/bin/env python3
"""Groq(無料)でlearning-science-wiki.htmlの残りページを生成してパッチする。"""
import os, sys, re
from groq import Groq

client = Groq(api_key=os.environ["GROQ_API_KEY"])
HTML_PATH = "learning-science-wiki.html"
PLACEHOLDER = "/* @@PAGES_PART2_START@@ */"

def groq_gen(prompt, max_tokens=1200):
    resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=0.2,
    )
    return resp.choices[0].message.content.strip()

def strip_fences(code):
    """Remove markdown code fences if present."""
    code = re.sub(r'^```[a-z]*\n?', '', code, flags=re.MULTILINE)
    code = re.sub(r'\n?```$', '', code, flags=re.MULTILINE)
    return code.strip()

SYSTEM_PROMPT = """You write JSX components for a Japanese learning science wiki.
Required pattern (follow exactly):

const PageNamePage = ({ onNav }) => (
  <>
    <Crumbs items={[{label:'Ch.04 理想の1日設計'},{label:'X.X ページタイトル'}]} onNav={onNav}/>
    <PageHeader eyebrow="Ch.04 理想の1日設計" title="ページタイトル" deck="説明文" meta={[{label:'種別',value:'新規作成'}]}/>
    <div className="content">
      ... (JSX content using h2, p, ul, Adm, div.timeline, div.tl-item)
    </div>
  </>
);

Available components: Crumbs, PageHeader, Adm (type=info/warn/ok/danger/tip), div.timeline, div.tl-item.focus/.rest/.study
Available CSS classes: h-num, marker, badge badge-g/badge-y/badge-r, stat-strip/stat, card-grid/card
Rules: className not class, Japanese text only, concise (20-30 lines), no markdown fences, output component code only.
"""

pages = [
    dict(
        name="WeekdaySchedulePage",
        title="平日スケジュール設計",
        num="4.1",
        deck="勤務日に学習を継続する——認知科学に基づく平日タイムデザイン",
        context="Japanese electrical engineer, age 36, works 8-17, studies for 電験3種 exam. Learning window: early morning 30min + evening 60-90min. Use ultradian rhythm (90min cycles). Show timeline from 5:30 to 23:00."
    ),
    dict(
        name="DayoffRestPage",
        title="休日OFF設計",
        num="4.2",
        deck="完全回復日の設計——脳を洗浄し翌週のパフォーマンスを最大化する",
        context="Rest day (no study). Focus on: glymphatic system activation (sleep), BDNF release (aerobic exercise), DMN activation (no screens). Show timeline for a restorative weekend day."
    ),
    dict(
        name="DayoffStudyPage",
        title="休日勉強設計",
        num="4.3",
        deck="学習特化休日——6〜8時間の集中セッションを設計する",
        context="Study-focused day off. Apply: 90-min ultradian cycles, spaced repetition blocks, strategic breaks, morning peak cognition. Show timeline from 6:00 to 21:00 with 3-4 study sessions."
    ),
]

generated_parts = []
for p in pages:
    print(f"  Generating {p['name']}...", flush=True)
    prompt = f"""{SYSTEM_PROMPT}

Generate the JSX component named {p['name']} for page "{p['num']} {p['title']}".
deck: "{p['deck']}"
Context: {p['context']}

Include:
1. A h2 section with key principles (use Adm type=info)
2. A timeline div showing the day schedule (4-6 tl-items with tl-time, tl-label, tl-desc)
3. A h2 section with practical tips (use Adm type=ok or ul)

Output the complete JSX component code only, no markdown fences."""
    code = groq_gen(prompt)
    code = strip_fences(code)
    generated_parts.append(code)
    print(f"    OK ({len(code)} chars)", flush=True)

# App component (hardcoded structural code)
page_routes = [
    ("home",              "HomePage"),
    ("nou-kasseika",      "NouKasseikaPage"),
    ("atama-ga-ii",       "AtamaGaIiPage"),
    ("brain-speed",       "BrainSpeedPage"),
    ("brain-detox",       "BrainDetoxPage"),
    ("gakushuu-kouritu",  "GakushuuKourituPage"),
    ("study-methods",     "StudyMethodsPage"),
    ("joho-input",        "JohoInputPage"),
    ("meta-ninchi",       "MetaNinchiPage"),
    ("unlearning",        "UnlearningPage"),
    ("weekday-schedule",  "WeekdaySchedulePage"),
    ("dayoff-rest",       "DayoffRestPage"),
    ("dayoff-study",      "DayoffStudyPage"),
]
cases = "\n".join(f"      case '{pid}': return <{comp} {{...props}} />;" for pid, comp in page_routes)

app_code = f"""/* ============================================================
   App
   ============================================================ */
const App = () => {{
  const data = window.WIKI_DATA;
  const allIds = ['home', ...data.chapters.flatMap(c => c.pages.map(p => p.id))];
  const [page, setPage] = useState(() => {{
    const h = location.hash.replace(/^#/, '');
    return allIds.includes(h) ? h : 'home';
  }});
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (id) => {{
    setPage(id); location.hash = id; window.scrollTo({{top:0, behavior:'auto'}});
  }};
  useEffect(() => {{
    const fn = () => {{ const h = location.hash.replace(/^#/,''); if(allIds.includes(h)) setPage(h); }};
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }}, []);

  const renderPage = () => {{
    const props = {{ data, onNav: navigate }};
    switch(page) {{
{cases}
      default: return <HomePage {{...props}} />;
    }}
  }};

  return (
    <>
      <div className="app">
        <Sidebar chapters={{data.chapters}} currentPage={{page}} onNav={{navigate}} />
        <main className="main">{{renderPage()}}</main>
      </div>
      {{mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-overlay" onClick={{() => setMobileOpen(false)}} />
          <div className="mobile-drawer-panel">
            <Sidebar chapters={{data.chapters}} currentPage={{page}} onNav={{(id) => {{ navigate(id); setMobileOpen(false); }}}} />
          </div>
        </div>
      )}}
    </>
  );
}};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>"""

replacement = "\n\n".join(generated_parts) + "\n\n" + app_code

# Patch the HTML file
with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

if PLACEHOLDER not in html:
    print(f"ERROR: Placeholder '{PLACEHOLDER}' not found in {HTML_PATH}", file=sys.stderr)
    sys.exit(1)

html = html.replace(PLACEHOLDER, replacement)

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Done! {HTML_PATH} updated ({len(html):,} chars total).")
