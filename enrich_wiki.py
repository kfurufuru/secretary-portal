#!/usr/bin/env python3
"""
enrich_wiki.py
Groq（無料）でlearning-science-wiki.htmlの各ページを拡充する。
ソースHTMLから本文を抽出 → Groqへ渡して豊富なJSXを生成 → HTMLをパッチ。
"""
import os, re, sys
from groq import Groq
from bs4 import BeautifulSoup

client = Groq(api_key=os.environ["GROQ_API_KEY"])
HTML_PATH = "learning-science-wiki.html"
MODEL = "llama-3.3-70b-versatile"

# ページID → ソースファイル（None=新規作成）
PAGES = [
    ("NouKasseikaPage",     "nou-kasseika",      "business-skills/nou-kasseika.html",     "Ch.01 脳科学の基礎", "1.1", "脳の可塑性と活性化"),
    ("AtamaGaIiPage",       "atama-ga-ii",       "business-skills/atama-ga-ii.html",      "Ch.01 脳科学の基礎", "1.2", "「頭が良い」の科学"),
    ("BrainSpeedPage",      "brain-speed",       "business-skills/brain-speed.html",      "Ch.01 脳科学の基礎", "1.3", "脳の処理速度"),
    ("BrainDetoxPage",      "brain-detox",       "business-skills/brain-detox.html",      "Ch.01 脳科学の基礎", "1.4", "脳デトックス"),
    ("GakushuuKourituPage", "gakushuu-kouritu",  "business-skills/gakushuu-kouritu.html", "Ch.02 学習効率の科学","2.1", "学習効率を上げる原則"),
    ("StudyMethodsPage",    "study-methods",     "study-methods.html",                    "Ch.02 学習効率の科学","2.2", "科学的勉強法カタログ"),
    ("JohoInputPage",       "joho-input",        "business-skills/joho-input.html",       "Ch.02 学習効率の科学","2.3", "情報インプットの最適化"),
    ("MetaNinchiPage",      "meta-ninchi",       "business-skills/meta-ninchi.html",      "Ch.03 メタ認知・思考革新","3.1", "メタ認知の技術"),
    ("UnlearningPage",      "unlearning",        "business-skills/unlearning.html",       "Ch.03 メタ認知・思考革新","3.2", "アンラーニング"),
    ("WeekdaySchedulePage", "weekday-schedule",  None,                                    "Ch.04 理想の1日設計","4.1", "平日スケジュール設計"),
    ("DayoffRestPage",      "dayoff-rest",       None,                                    "Ch.04 理想の1日設計","4.2", "休日OFF設計"),
    ("DayoffStudyPage",     "dayoff-study",      None,                                    "Ch.04 理想の1日設計","4.3", "休日勉強設計"),
]

def extract_text(filepath, max_chars=5000):
    """HTMLから本文テキストを抽出（タグ除去・整形）"""
    try:
        with open(filepath, encoding="utf-8") as f:
            html = f.read()
        soup = BeautifulSoup(html, "html.parser")
        # script/style除去
        for tag in soup(["script","style","nav","header","footer"]):
            tag.decompose()
        text = soup.get_text(separator="\n", strip=True)
        # 空行圧縮
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text[:max_chars]
    except Exception as e:
        return f"（ソースなし: {e}）"

JSX_RULES = """JSX component rules (MUST follow):
- const ComponentName = ({ onNav }) => ( <> ... </> );
- Use className not class
- Available components: Crumbs, PageHeader, Adm (type=info/warn/ok/danger/tip),
  div.timeline > div.tl-item.focus/.rest/.study (with div.tl-dot, div.tl-time, div.tl-label, div.tl-desc)
- Available CSS: h-num (section number span), marker (yellow highlight span),
  badge badge-g/badge-y/badge-r, stat-strip>stat (stat-label/stat-value/stat-sub),
  card-grid>card (card-num/card-title/card-deck/card-foot), steps (ol.steps > li),
  content>table (th/td), content>h2/h3/p/ul/ol/li
- h2 pattern: <h2><span className="h-num">N</span>セクション名</h2>
- Adm pattern: <Adm type="info" title="タイトル"><p>...</p><ul><li>...</li></ul></Adm>
- marker pattern: <span className="marker">重要テキスト</span>
- Output ONLY the JSX component code. No markdown fences. No explanation.
- Write in Japanese. Be specific, data-rich, actionable.
- Include: at least 3 h2 sections, 2+ Adm boxes, 1 table or steps or stat-strip
- Target: 60-90 lines of dense, useful content
"""

def gen_page(comp_name, page_id, source_file, chapter, num, title):
    """Groqでページを生成"""
    if source_file:
        source_text = extract_text(source_file)
        context = f"以下はソースHTMLから抽出した本文（5000字以内）:\n\n{source_text}"
    else:
        context = f"このページは新規作成。learning scienceの知見に基づいて内容を設計する。"

    prompt = f"""{JSX_RULES}

Generate the JSX component "{comp_name}" for wiki page "{num} {title}" in chapter "{chapter}".

{context}

Crumbs items: [{{label:'{chapter}'}},{{label:'{num} {title}'}}]
PageHeader: eyebrow="{chapter}", title="{title}", deck="(compelling one-line description)"
meta: [{{label:'ソース', value:'{source_file or "新規作成"}'}}]

Generate the complete, rich, data-dense JSX component now:"""

    resp = client.chat.completions.create(
        model=MODEL,
        messages=[{"role":"user","content":prompt}],
        max_tokens=2000,
        temperature=0.25,
    )
    return resp.choices[0].message.content.strip()

def strip_fences(code):
    code = re.sub(r'^```[a-z]*\n?', '', code, flags=re.MULTILINE)
    code = re.sub(r'\n?```$', '', code, flags=re.MULTILINE)
    return code.strip()

def replace_component(html, comp_name, new_code):
    """HTMLファイル内のコンポーネントを置換"""
    # パターン: "const CompName = ({ onNav }) => (\n  <>" から次のコンポーネント定義の直前まで
    pattern = rf'(const {comp_name} = \(\{{ onNav \}}\) => \([\s\S]*?\);\n)'
    m = re.search(pattern, html)
    if m:
        html = html[:m.start()] + new_code + ";\n" + html[m.end():]
        return html, True
    # フォールバック: component名だけで検索
    pattern2 = rf'const {comp_name} = \(\{{ onNav \}}\) =>[\s\S]*?\);\n'
    m2 = re.search(pattern2, html)
    if m2:
        html = html[:m2.start()] + new_code + ";\n" + html[m2.end():]
        return html, True
    return html, False

def main():
    with open(HTML_PATH, encoding="utf-8") as f:
        html = f.read()

    for comp_name, page_id, source_file, chapter, num, title in PAGES:
        print(f"  [{num}] {title}...", end=" ", flush=True)
        try:
            code = gen_page(comp_name, page_id, source_file, chapter, num, title)
            code = strip_fences(code)
            # セミコロン末尾を除去（replace_component側で追加）
            code = code.rstrip().rstrip(';').rstrip()
            html, replaced = replace_component(html, comp_name, code)
            if replaced:
                print(f"OK ({len(code)}chars)")
            else:
                print(f"WARN: component not found in HTML")
        except Exception as e:
            print(f"ERROR: {e}")

    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"\nDone. {HTML_PATH} updated ({len(html):,} chars)")

if __name__ == "__main__":
    main()
