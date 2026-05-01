#!/usr/bin/env python3
"""
enrich_schedule.py
Ch4スケジュールページ（平日・休日OFF・休日勉強）を高品質なJSXで再生成する。
電験3種受験中の36歳エンジニア向けに具体的なタイムライン付きで生成。
"""
import os, re
from groq import Groq

client = Groq(api_key=os.environ["GROQ_API_KEY"])
HTML_PATH = "learning-science-wiki.html"
MODEL = "llama-3.3-70b-versatile"

JSX_RULES = """JSX component rules (MUST follow exactly):
- const ComponentName = ({ onNav }) => ( <> ... </> );
- Use className not class
- Available components: Crumbs, PageHeader, Adm (type=info/warn/ok/danger/tip)
- Timeline pattern: <div className="timeline"><div className="tl-item focus"><div className="tl-dot"/><div className="tl-time">05:30</div><div className="tl-label">起床・水分補給</div><div className="tl-desc">アラーム即起き。コップ1杯の水でアデノシン除去を促進</div></div></div>
  - tl-item class: focus=学習, rest=休息/睡眠, study=過去問/演習
- stat-strip pattern: <div className="stat-strip"><div className="stat"><div className="stat-label">睡眠</div><div className="stat-value">7h</div><div className="stat-sub">記憶定着の最低ライン</div></div></div>
- h2 pattern: <h2><span className="h-num">1</span>セクション名</h2>
- Adm pattern: <Adm type="info" title="タイトル"><p>...</p></Adm>
- marker pattern: <span className="marker">重要テキスト</span>
- Output ONLY the JSX component code. No markdown fences. No explanation.
- Write in Japanese ONLY. Be specific, concrete, actionable with real times.
- Include: stat-strip, 6-8 tl-items with actual times, 2+ Adm boxes, 1 h2 summary section
- Target: 80-100 lines of dense, useful content
"""

WEEKDAY_PROMPT = f"""{JSX_RULES}

Generate the JSX component "WeekdaySchedulePage" for wiki page "4.1 平日スケジュール設計".

User context:
- 36歳 電気エンジニア（三菱ケミカル電計チームリーダー）
- 勤務時間: 8:00-17:00（残業あり）
- 電験3種受験準備中（理論を重点学習）
- 学習可能ウィンドウ: 早朝30分(5:30-6:00) + 夜間60-90分(21:00-22:30)
- 超日リズム(90分サイクル)を活用
- 土日は過去問、平日は理解型インプット

Science-based schedule principles:
- 起床後1時間はコルチゾールピーク→新規学習に最適
- 昼食後15分の戦略的仮眠（パワーナップ）でPM生産性+34%
- 夜間の間隔反復で睡眠中の記憶定着を最大化
- アルトラジアンリズム(90分)でディープワーク＆休憩を設計

PageHeader: eyebrow="Ch.04 理想の1日設計", title="平日スケジュール設計", deck="電験3種受験×フルタイム勤務を両立する認知科学的1日設計"
meta: [{{label:'対象', value:'勤務日（月〜金）'}}, {{label:'学習時間', value:'90-120分/日'}}]
Crumbs items: [{{label:'Ch.04 理想の1日設計'}},{{label:'4.1 平日スケジュール設計'}}]

Show timeline from 05:30 to 23:00 with 8 tl-items covering:
- 05:30 起床・水分補給（コルチゾールピーク開始）
- 05:45 理論インプット30分（新規概念・難問）
- 06:15 朝食・準備
- 08:00 出勤・仕事
- 12:00 昼休み戦略的仮眠(15min) + 復習フラッシュカード(15min)
- 17:00 退勤（脳の整理フェーズ）
- 21:00 夜間学習60-90分（問題演習・間隔反復）
- 22:30 就寝準備・翌日復習プラン設定

Also include stat-strip with: 学習時間90分/日、睡眠7h、仮眠15分、超日リズム2サイクル

Generate the complete, rich, data-dense JSX component now:"""

DAYOFF_REST_PROMPT = f"""{JSX_RULES}

Generate the JSX component "DayoffRestPage" for wiki page "4.2 休日OFF設計".

User context: 36歳エンジニア、電験3種受験中。
Complete rest day (NO study). Focus on brain recovery and next-week performance maximization.

Science basis:
- グリンパティックシステム: 睡眠中にβアミロイドなどを除去（寝不足で30%効率低下）
- BDNF（脳由来神経栄養因子）: 有酸素運動後24h増加→翌週学習効率UP
- DMN（デフォルトモードネットワーク）: ぼーっとした時間がアイデア統合を促進
- 自然環境接触: コルチゾール23%低下（公園30分以上）

PageHeader: eyebrow="Ch.04 理想の1日設計", title="休日OFF設計", deck="グリンパティック系フル稼働——脳を洗浄して翌週パフォーマンスを最大化する完全回復日"
Crumbs items: [{{label:'Ch.04 理想の1日設計'}},{{label:'4.2 休日OFF設計'}}]

Show timeline from 07:00 to 23:30 with 7 tl-items (all tl-item.rest):
- 07:00 自然な目覚め（アラームなし）7〜8時間確保
- 08:00 軽い朝食・日光浴15分（サーカディアンリズムリセット）
- 09:30 有酸素運動45分（BDNF放出・コルチゾール低下）
- 11:00 趣味・読書・散歩（DMN活性化・ノースクリーン推奨）
- 13:00 昼食・1.5時間昼寝（グリンパティック強化）
- 15:00 家族時間・自然接触（コルチゾール23%低下）
- 21:00 入浴（深部体温0.5℃低下で深睡眠促進）→ 23:00就寝

Include Adm with: グリンパティックシステムの科学的メリット + NG行動リスト（深夜スクリーン、カフェイン、ながら食べ）
Include stat-strip: 睡眠8h、有酸素45分、スクリーン<2h、自然接触30min

Generate the complete, rich, data-dense JSX component now:"""

DAYOFF_STUDY_PROMPT = f"""{JSX_RULES}

Generate the JSX component "DayoffStudyPage" for wiki page "4.3 休日勉強設計".

User context: 36歳エンジニア、電験3種受験中（理論メイン）。
Study-focused day. Apply: 90-min ultradian cycles, spaced repetition, strategic breaks, morning peak cognition.

Science basis:
- 超日リズム(90分): 集中→休息サイクルで効率最大化（強制突破は逆効果）
- 間隔反復: 復習間隔は1日→3日→7日→21日が最適
- 記憶強化: 学習直後の20分仮眠で記憶定着率43%向上
- ピーク認知: 起床後3-5時間が処理速度・ワーキングメモリ最大

Target: 電験3種理論 4セッション×90分 = 360分（6時間）の集中学習

PageHeader: eyebrow="Ch.04 理想の1日設計", title="休日勉強設計", deck="電験3種理論を1日で6時間攻略——超日リズム×間隔反復の集中設計"
Crumbs items: [{{label:'Ch.04 理想の1日設計'}},{{label:'4.3 休日勉強設計'}}]

Show timeline from 06:00 to 22:00 with 8 tl-items (mix of tl-item.focus and tl-item.study and tl-item.rest):
- 06:00 起床・準備（アラーム即起き、カフェイン摂取は06:30まで待機）
- 06:30 Session1 90min: 新規単元インプット（電界/磁界/回路理論の難所）
- 08:00 休憩20min + 軽食（20分仮眠で記憶定着+43%）
- 08:20 Session2 90min: 問題演習（Session1の定着確認過去問）
- 10:00 休憩30min 散歩（海馬の整理・BDNF補充）
- 10:30 Session3 90min: 弱点集中（間隔反復カード + 誤答分析）
- 12:00 昼食 + 昼寝45min（グリンパティック活性）
- 13:30 Session4 90min: 模擬試験形式（時間計測・本番想定）
- 15:30 軽い復習30min + 翌日復習設定（Notion記録）
- 22:00 就寝

Include stat-strip: 学習6h、休憩合計2h、過去問数30問目標、睡眠7.5h
Include Adm warn: NG行動（超90分連続集中、スマホ手の届く場所、満腹学習）
Include Adm ok: 電験3種理論の最優先4単元（電界・磁界・交流回路・過渡現象）

Generate the complete, rich, data-dense JSX component now:"""

def strip_fences(code):
    code = re.sub(r'^```[a-z]*\n?', '', code, flags=re.MULTILINE)
    code = re.sub(r'\n?```$', '', code, flags=re.MULTILINE)
    return code.strip()

def replace_component(html, comp_name, new_code):
    pattern = rf'(const {comp_name} = \(\{{ onNav \}}\) => \([\s\S]*?\);\n)'
    m = re.search(pattern, html)
    if m:
        html = html[:m.start()] + new_code + ";\n" + html[m.end():]
        return html, True
    pattern2 = rf'const {comp_name} = \(\{{ onNav \}}\) =>[\s\S]*?\);\n'
    m2 = re.search(pattern2, html)
    if m2:
        html = html[:m2.start()] + new_code + ";\n" + html[m2.end():]
        return html, True
    return html, False

PAGES = [
    ("WeekdaySchedulePage", WEEKDAY_PROMPT),
    ("DayoffRestPage",      DAYOFF_REST_PROMPT),
    ("DayoffStudyPage",     DAYOFF_STUDY_PROMPT),
]

def main():
    with open(HTML_PATH, encoding="utf-8") as f:
        html = f.read()

    for comp_name, prompt in PAGES:
        print(f"  Generating {comp_name}...", end=" ", flush=True)
        try:
            resp = client.chat.completions.create(
                model=MODEL,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2500,
                temperature=0.2,
            )
            code = resp.choices[0].message.content.strip()
            code = strip_fences(code)
            code = code.rstrip().rstrip(';').rstrip()
            html, replaced = replace_component(html, comp_name, code)
            if replaced:
                print(f"OK ({len(code)} chars)")
            else:
                print(f"WARN: component not found")
        except Exception as e:
            print(f"ERROR: {e}")

    with open(HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"\nDone. Updated {HTML_PATH} ({len(html):,} chars)")

if __name__ == "__main__":
    main()
