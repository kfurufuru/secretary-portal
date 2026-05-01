#!/usr/bin/env python3
"""
enrich_brain_pages.py  — Ch1〜3ページの第2パス高品質化
ソースHTMLの本文 + 電験3種ユーザーコンテキストを使って大幅拡充。
"""
import os, re
from openai import OpenAI
from bs4 import BeautifulSoup

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
HTML_PATH = "learning-science-wiki.html"
MODEL = "gpt-4o-mini"

def extract_text(filepath, max_chars=6000):
    try:
        with open(filepath, encoding="utf-8") as f:
            html = f.read()
        soup = BeautifulSoup(html, "html.parser")
        for tag in soup(["script","style","nav","header","footer"]):
            tag.decompose()
        text = soup.get_text(separator="\n", strip=True)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text[:max_chars]
    except Exception as e:
        return ""

JSX_RULES = """JSX rules (MUST follow exactly):
- const ComponentName = ({ onNav }) => ( <> ... </> );
- Use className not class. Japanese text only.
- Components: Crumbs, PageHeader, Adm(type=info/warn/ok/danger/tip), stat-strip>stat, card-grid>card, steps(ol.steps>li)
- h2: <h2><span className="h-num">N</span>セクション名</h2>
- marker: <span className="marker">重要テキスト</span>
- badge: <span className="badge badge-g">高</span>  (badge-g=緑/badge-y=黄/badge-r=赤)
- table: <table><tr><th>列1</th><th>列2</th></tr><tr><td>値</td><td>値</td></tr></table>
- Output ONLY JSX code. No markdown fences. No explanation.
- Target: 90-120 lines, data-rich, research citations included, actionable.
- Must include: 3+ h2 sections, 2+ Adm boxes, 1 table or stat-strip, specific numbers/percentages
"""

USER_CONTEXT = """User: 36歳電気エンジニア（三菱ケミカル電計チームリーダー）、電験3種受験中。
合理主義・実務重視・根拠必須・数値重視。抽象論より再現性ある手法を好む。"""

PAGES = [
    ("BrainSpeedPage",      "brain-speed",       "business-skills/brain-speed.html",
     "Ch.01 脳科学の基礎", "1.3", "脳の処理速度",
     "ワーキングメモリ容量（マジカルナンバー4±1）、注意の瓶頸モデル、処理速度の測定法。睡眠不足・スマホ・マルチタスクによる処理速度低下の数値。速読・チャンキング・自動化で処理速度を上げる方法。"),
    ("BrainDetoxPage",      "brain-detox",       "business-skills/brain-detox.html",
     "Ch.01 脳科学の基礎", "1.4", "脳デトックス",
     "グリンパティックシステム（睡眠中のβアミロイド除去）、コルチゾール慢性高値のリスク、デジタルデトックスの効果。情報過負荷の脳への影響。36歳エンジニアに最適化した週次脳デトックスプロトコル。"),
    ("GakushuuKourituPage", "gakushuu-kouritu",  "business-skills/gakushuu-kouritu.html",
     "Ch.02 学習効率の科学","2.1", "学習効率を上げる原則",
     "テスト効果（Roediger & Karpicke, 2006：再読より想起練習で記憶定着+80%）、間隔反復（Ebbinghaus忘却曲線）、交互練習vs塊練習。電験3種理論での具体適用例（間隔1→3→7→21日）。"),
    ("StudyMethodsPage",    "study-methods",     "study-methods.html",
     "Ch.02 学習効率の科学","2.2", "科学的勉強法カタログ",
     "エビデンスレベル別8つの学習法（能動想起・間隔反復・Feynman法・精緻化質問・インタリービング・自己説明・具体化・二重符号化）。電験3種での具体適用例と担当FカンパニーAI社員マッピング。"),
    ("JohoInputPage",       "joho-input",        "business-skills/joho-input.html",
     "Ch.02 学習効率の科学","2.3", "情報インプットの最適化",
     "認知負荷理論（Sweller）：内在的・外在的・関連的負荷の3分類。読書速度vs理解度のトレードオフ。電験参考書の最適インプット手順（全体把握→精読→想起→演習）。デジタルvs紙の記憶定着比較。"),
    ("MetaNinchiPage",      "meta-ninchi",       "business-skills/meta-ninchi.html",
     "Ch.03 メタ認知・思考革新","3.1", "メタ認知の技術",
     "メタ認知の2層構造（モニタリング層・コントロール層）。Dunning-Kruger効果と自己評価精度。思考の5バイアス（確証・後知恵・可用性・ハロー・サンクコスト）と対策。電験勉強での誤答分析への応用。"),
    ("UnlearningPage",      "unlearning",        "business-skills/unlearning.html",
     "Ch.03 メタ認知・思考革新","3.2", "アンラーニング",
     "アンラーニングの3ステップ（認識→疑問→更新）。スキーマ理論と古い知識が新規学習を阻害するメカニズム。電験3種で特に誤解しやすい概念（コンデンサの位相・インピーダンスの符号）のアンラーニング例。"),
]

def gen_page(comp_name, page_id, source_file, chapter, num, title, focus):
    source_text = extract_text(source_file) if source_file else ""
    source_part = f"\n\nSource content (extracted from existing HTML, use as base):\n{source_text}" if source_text else ""

    prompt = f"""{JSX_RULES}

{USER_CONTEXT}

Generate JSX component "{comp_name}" for page "{num} {title}" in chapter "{chapter}".

Content focus: {focus}
{source_part}

Crumbs: [{{label:'{chapter}'}},{{label:'{num} {title}'}}]
PageHeader: eyebrow="{chapter}", title="{title}", deck="(compelling one-line description based on focus)"
meta: [{{label:'根拠', value:'認知科学・神経科学'}}, {{label:'実践難易度', value:'★★☆'}}]

Requirements:
- Section 1: Core concept with scientific mechanism (数値・研究名を含める)
- Section 2: Data table or stat-strip with concrete metrics
- Section 3: Practical implementation steps (specific to 36yr engineer / 電験3種)
- 2+ Adm boxes (1x info with research, 1x ok with actionable checklist)
- Use <span className="marker"> for key terms (3-5 instances)
- Include specific numbers: percentages, time durations, research years

Generate the complete, rich, data-dense JSX component now:"""

    resp = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=2800,
        temperature=0.2,
    )
    return resp.choices[0].message.content.strip()


def strip_fences(code):
    code = re.sub(r'^```[a-z]*\n?', '', code, flags=re.MULTILINE)
    code = re.sub(r'\n?```$', '', code, flags=re.MULTILINE)
    return code.strip()

def replace_component(html, comp_name, new_code):
    pattern = rf'(const {comp_name} = \(\{{ onNav \}}\) => \([\s\S]*?\);\n)'
    m = re.search(pattern, html)
    if m:
        return html[:m.start()] + new_code + ";\n" + html[m.end():], True
    pattern2 = rf'const {comp_name} = \(\{{ onNav \}}\) =>[\s\S]*?\);\n'
    m2 = re.search(pattern2, html)
    if m2:
        return html[:m2.start()] + new_code + ";\n" + html[m2.end():], True
    return html, False

def main():
    with open(HTML_PATH, encoding="utf-8") as f:
        html = f.read()

    for comp_name, page_id, source_file, chapter, num, title, focus in PAGES:
        print(f"  [{num}] {title}...", end=" ", flush=True)
        try:
            code = gen_page(comp_name, page_id, source_file, chapter, num, title, focus)
            code = strip_fences(code).rstrip().rstrip(';').rstrip()
            html, replaced = replace_component(html, comp_name, code)
            status = f"OK ({len(code)}chars)" if replaced else "WARN: not found"
            print(status)
        except Exception as e:
            print(f"ERROR: {e}")

    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"\nDone. {HTML_PATH} updated ({len(html):,} chars)")

if __name__ == "__main__":
    main()
