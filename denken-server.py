#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
denken-server.py
電験3種学習サイト用ローカルサーバー (Flask)
http://localhost:8765/

Routes:
  GET  /api/today               - 今日の3セッション
  POST /api/explain             - Claude API解説生成
  POST /api/feedback            - records.json更新
  GET  /api/status              - 今日の進捗
"""

import json, os, re, sys, base64
import urllib.request, urllib.error
from datetime import date, timedelta
from pathlib import Path
from flask import Flask, jsonify, request, send_file, abort, Response
from flask_cors import CORS

# ── Paths ──────────────────────────────────────────────────────────
SECRETARY    = Path(__file__).parent
CONFIG       = SECRETARY / "daily-review-config.json"
DASHBOARD    = SECRETARY / "denken3-study-dashboard"
INDEX_HTML   = DASHBOARD / "data" / "index.html" if (DASHBOARD / "data" / "index.html").exists() \
               else DASHBOARD / "index.html"
RECORDS_JSON = DASHBOARD / "data" / "records.json"
PORTAL_HTML  = SECRETARY / "portal-v2.html"
TODAY        = date.today()

# ── Config ─────────────────────────────────────────────────────────
def load_config():
    try:
        return json.loads(CONFIG.read_text(encoding="utf-8"))
    except Exception:
        return {}

SUBJECT_CONFIG = {
    "riron": {
        "label": "理論",
        "weak_data_key": "WEAK_DATA",
        "exam_sections": ["電磁気", "電気回路", "電子理論", "電気計測"],
        "category_progress": {
            "電子理論": 0.02, "電磁気": 0.05,
            "電気計測": 0.28, "電気回路": 0.40,
        },
    },
    "houki": {
        "label": "法規",
        "weak_data_key": "WEAK_DATA_HOUKI",
        "exam_sections": ["電気事業法", "電気設備技術基準", "電気施設管理"],
        "category_progress": {
            "電気事業法": 0.10, "電気設備技術基準": 0.10, "電気施設管理": 0.10,
        },
    },
}

SLOT_CONFIG = {
    "morning": {"label": "朝",  "emoji": "🌅", "subject": "riron",  "hour_start": 0,  "hour_end": 12},
    "noon":    {"label": "昼",  "emoji": "☀️", "subject": "houki",  "hour_start": 12, "hour_end": 17},
    "evening": {"label": "夜",  "emoji": "🌙", "subject": "houki",  "hour_start": 17, "hour_end": 24},
}

REVIEW_DAYS = {"SR1": 2, "SR2": 4, "SR3": 7, "SR4": 14, "SR5": 30}
EXAM_DATE   = date(2026, 8, 23)

# ── PDF paths (電験王 過去問) ─────────────────────────────────────
PDF_PATHS = {
    "riron": Path(r"C:\Users\kfuru\OneDrive\デスクトップ\01_資格・勉強\電験3種\電験王 過去問_理論.pdf"),
    "houki": Path(r"C:\Users\kfuru\OneDrive\デスクトップ\01_資格・勉強\電験3種\電験王 過去問_法規.pdf"),
}
_pdf_indexes = {}  # subject -> {qid: page_number}

def _get_pdf_index(subject):
    if subject in _pdf_indexes:
        return _pdf_indexes[subject]
    pdf_path = PDF_PATHS.get(subject)
    if not pdf_path or not pdf_path.exists():
        _pdf_indexes[subject] = {}
        return {}
    try:
        import fitz
    except ImportError:
        _pdf_indexes[subject] = {}
        return {}
    doc = fitz.open(str(pdf_path))
    index = {}
    for i in range(doc.page_count):
        text = doc[i].get_text()
        m = re.search(r'(令和|平成)\s*(\d+)\s*年\s*問\s*(\d+)', text)
        if m and '問題' in text:
            era, year, qnum = m.group(1), int(m.group(2)), int(m.group(3))
            qid = f"R{year:02d}-問{qnum}" if era == '令和' else f"H{year:02d}-問{qnum}"
            if qid not in index:
                index[qid] = i
    doc.close()
    _pdf_indexes[subject] = index
    print(f"[PDF] {subject}: indexed {len(index)} questions")
    return index

def _normalize_qid(qid):
    return re.sub(r'(R\d{2}|H\d{2})[上下]', r'\1', qid)

def _extract_pdf_images(qid, subject):
    index = _get_pdf_index(subject)
    lookup = qid if qid in index else _normalize_qid(qid)
    if lookup not in index:
        return None
    try:
        import fitz
    except ImportError:
        return None
    pdf_path = PDF_PATHS[subject]
    doc = fitz.open(str(pdf_path))
    start = index[lookup]
    end = min(start + 4, doc.page_count)
    for i in range(start + 1, min(start + 5, doc.page_count)):
        text = doc[i].get_text()
        m = re.search(r'(令和|平成)\s*(\d+)\s*年\s*問\s*(\d+)', text)
        if m and '問題' in text:
            end = i
            break
    images = []
    for i in range(start, end):
        pix = doc[i].get_pixmap(dpi=150)
        images.append(base64.b64encode(pix.tobytes("png")).decode())
    doc.close()
    return images

# ── 電験王 Web問題取得 ─────────────────────────────────────────────
WEB_PROBLEM_CACHE = SECRETARY / "denken-study" / "problem-cache"

def _qid_to_denken_ou_url(qid, subject):
    """問題IDを電験王のURLに変換する

    R04上, R05上 以降は上下期分け（年2回制）→ r{year}-{1|2}-{問番号} 形式
    R03 以前は年1回制 → r{year}-{問番号} 形式
    平成年度 → h{年度}-{問番号} 形式
    """
    prefix = {"riron": "riron", "houki": "houki"}.get(subject, "riron")

    # 令和 上下期明示: R04下-問8 / R04上-問1 / R05上-問5
    m = re.match(r'R0?(\d+)(上|下)-問(\d+)$', qid)
    if m:
        year   = int(m.group(1))
        period = "2" if m.group(2) == "下" else "1"
        return f"https://denken-ou.com/{prefix}r{year}-{period}-{m.group(3)}/"

    # 令和 上下期なし: R04-問8（R04以降=上期扱い） / R03-問7（R03以前=年1回）
    m = re.match(r'R0?(\d+)-問(\d+)$', qid)
    if m:
        year = int(m.group(1))
        qnum = m.group(2)
        if year >= 4:
            return f"https://denken-ou.com/{prefix}r{year}-1-{qnum}/"   # R04以降は上期
        else:
            return f"https://denken-ou.com/{prefix}r{year}-{qnum}/"     # R03以前は年1回

    # 平成: H23-問8 / H19-問7
    m = re.match(r'H(\d+)-問(\d+)$', qid)
    if m:
        return f"https://denken-ou.com/{prefix}h{m.group(1)}-{m.group(2)}/"

    return None

def _parse_denken_ou_page(html, qid):
    """電験王ページから問題文・正解・難易度を抽出する

    電験王は <meta name="description"> に問題文のプレーンテキストを格納している。
    これを主ソースとして使い、entry-content から正解・難易度を補足する。
    """
    result_d = {"qid": qid}

    # タイトル（問題ジャンル）
    m = re.search(r'<title>([^<]+)</title>', html, re.IGNORECASE)
    if m:
        result_d["title"] = m.group(1).split('|')[0].strip()

    # meta description → 問題文テキスト（LaTeX除去済みのプレーンテキスト）
    m = re.search(r'<meta\s+name=["\']description["\'][^>]*content=["\']([^"\']{20,})["\']',
                  html, re.IGNORECASE)
    if not m:
        m = re.search(r'<meta\s+content=["\']([^"\']{20,})["\'][^>]*name=["\']description["\']',
                      html, re.IGNORECASE)
    if m:
        desc = m.group(1)
        desc = desc.replace('&#8230;', '…').replace('&#038;', '&').replace('&#8211;', '–')
        result_d["description"] = desc

    # entry-content から難易度・正解を抽出
    m_sec = re.search(r'<(?:section|div|article)[^>]*entry-content[^>]*>(.*)', html,
                      re.DOTALL | re.IGNORECASE)
    if m_sec:
        body_raw = m_sec.group(1)
        body_txt = re.sub(r'<[^>]+>', '', body_raw)
        m_diff = re.search(r'難易度[^\n★]*?(★[★☆]+)', body_txt)
        if m_diff:
            result_d["difficulty"] = m_diff.group(1)
        m_ans = re.search(r'答[えは：:]\s*[\(（]?(\d)[\)）]?', body_txt)
        if not m_ans:
            m_ans = re.search(r'正解[：:・\s]*[\(（]?(\d)[\)）]?', body_txt)
        if m_ans:
            result_d["answer"] = m_ans.group(1)

    return result_d


def _fetch_web_problem(qid, subject):
    """電験王から問題文を取得してキャッシュする"""
    WEB_PROBLEM_CACHE.mkdir(parents=True, exist_ok=True)
    safe_name = re.sub(r'[\\/:*?"<>|]', '_', qid)
    cache_file = WEB_PROBLEM_CACHE / f"{safe_name}.json"

    if cache_file.exists():
        try:
            return json.loads(cache_file.read_text(encoding="utf-8"))
        except Exception:
            pass

    url = _qid_to_denken_ou_url(qid, subject)
    if not url:
        return None

    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        )
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        parsed = _parse_denken_ou_page(html, qid)

        # text: description（問題文要旨） + 正解・難易度を組み合わせて表示用テキストを生成
        lines = []
        if parsed.get("title"):
            lines.append(f"【{parsed['title']}】")
        if parsed.get("difficulty"):
            lines.append(f"難易度: {parsed['difficulty']}")
        if parsed.get("description"):
            lines.append("")
            lines.append(parsed["description"])
        if parsed.get("answer"):
            lines.append("")
            lines.append(f"✅ 正解: （{parsed['answer']}）")

        text = '\n'.join(lines)
        result = {"qid": qid, "text": text, "url": url}
        cache_file.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"[WEB] cached: {qid} ({len(text)} chars)")
        return result

    except Exception as e:
        print(f"[WEB] fetch failed for {qid}: {e}")
        return None

SYSTEM_PROMPT_RIRON = """あなたは電験3種（理論科目）の家庭教師です。
受験者は通勤バスのスマホでこのページを読みます。

## ルール
- 計算式の羅列禁止。途中式を書かない（解法プロセスではなく本質を教える）
- 1セクション3〜5行以内
- 重要単語・公式は <b> で太字
- 危険な間違いは <span style="color:#ef4444">赤文字</span>
- 正解ポイントは <span style="color:#22c55e">緑文字</span>

## 必ず以下のXMLタグで出力すること（タグの中に実際の解説内容を書く）

<section1>【ここに】この問題が何を問うているか（問題文の要旨・与えられた条件の概要・求めるもの）と本質を2〜3文で。問題の概要と、何がわかれば解けるかを述べる。キーとなる物理量・条件を太字で。</section1>
<section2>【ここに】この問題の核心を直感的に説明。水や道路などの例えで「なぜそうなるか」を伝える。重要な概念・公式の意味を緑で強調。</section2>
<section3>【ここに】受験者がやりがちなミスを2〜3個。形式：❌ <span style="color:#ef4444">間違い</span>: ～と思いがち ⭕ <span style="color:#22c55e">正解</span>: 実はこう 💭 なぜ間違える: 一言で</section3>
<section4>【ここに】問題文のどのキーワード・条件を見たら「このタイプだ」と判断できるか。キーワードを太字で示す。</section4>
<section5>【ここに】この問題の本質を1フレーズで。帰りのバスで思い出せるキャッチコピー。太字で。</section5>"""

SYSTEM_PROMPT_HOUKI = """あなたは電験3種（法規科目）の家庭教師です。
受験者は通勤バスのスマホでこのページを読みます。

## ルール
- 計算式の羅列禁止
- 1セクション3〜5行以内
- 重要数値・条文番号は <b> で太字
- 引っかけ・危険な間違いは <span style="color:#ef4444">赤文字</span>
- 覚えるべき数値・ポイントは <span style="color:#22c55e">緑文字</span>

## 必ず以下のXMLタグで出力すること（タグの中に実際の解説内容を書く）

<section1>【ここに】この問題が問う法令・条文の概要（問題文の要旨・条文番号・与えられた状況）と何を覚えていれば解けるかを2〜3文で。キーとなる条文番号・数値を太字で。</section1>
<section2>【ここに】条文の趣旨を現場の感覚で説明。数値規定は語呂合わせや「なぜこの値なのか」で記憶を定着させる。重要ポイントを緑で強調。</section2>
<section3>【ここに】受験者がやりがちなミスを2〜3個。形式：❌ <span style="color:#ef4444">間違い</span>: ～と思いがち ⭕ <span style="color:#22c55e">正解</span>: 実はこう 💭 なぜ間違える: 一言で</section3>
<section4>【ここに】法規特有の引っかけパターン（二重否定・例外規定・ただし書き）への注意喚起。キーワードを太字で。</section4>
<section5>【ここに】この問題の本質を1フレーズで。語呂合わせがあればそれを。帰りのバスで思い出せるキャッチコピー。太字で。</section5>"""

# ── Data helpers ───────────────────────────────────────────────────
def parse_weak_data(weak_data_key="WEAK_DATA"):
    if not INDEX_HTML.exists():
        return []
    text = INDEX_HTML.read_text(encoding="utf-8")
    m = re.search(rf"const\s+{re.escape(weak_data_key)}\s*=\s*(\[.*?\]);", text, re.DOTALL)
    return json.loads(m.group(1)) if m else []

def load_records():
    if not RECORDS_JSON.exists():
        return []
    try:
        return json.loads(RECORDS_JSON.read_text(encoding="utf-8"))
    except Exception:
        return []

def save_records(records):
    RECORDS_JSON.parent.mkdir(parents=True, exist_ok=True)
    RECORDS_JSON.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")

def get_due_reviews(records):
    due = []
    for r in records:
        d, nr = r.get("date", ""), r.get("next_review", "")
        if not d or not nr or nr == "done":
            continue
        try:
            due_date = date.fromisoformat(d) + timedelta(days=REVIEW_DAYS.get(nr, 7))
            if due_date <= TODAY:
                due.append({**r, "due_date": due_date.isoformat()})
        except Exception:
            pass
    due.sort(key=lambda x: x.get("due_date", "9999"))
    return due

def select_topic(slot, subject="riron"):
    scfg  = SUBJECT_CONFIG[subject]
    records    = load_records()
    weak_data  = parse_weak_data(scfg["weak_data_key"])

    slot_index = {"morning": 0, "noon": 1, "evening": 2}[slot]
    day_offset = (TODAY - date(2026, 1, 1)).days

    # 1) SR-due reviews
    due = [d for d in get_due_reviews(records) if d.get("subject", "理論") == scfg["label"]]
    if due and slot_index < len(due):
        item = due[slot_index]
        # 元の問題IDをそのまま使う（日付サフィックスを付けるとPDF検索・解説生成が失敗する）
        orig_qid = item.get("theme", item.get("q", ""))
        return {
            "type": "review",
            "question_id": orig_qid,
            "category":    item.get("category", orig_qid),
            "subject":     subject,
            "priority":    item.get("next_review", "SR1"),
            "last_result": item.get("result", ""),
            "memo":        item.get("memo", ""),
        }

    if not weak_data:
        # Fall back to riron weak data so there's always a real question
        fallback_data = parse_weak_data("WEAK_DATA")
        if fallback_data:
            day_offset = (TODAY - date(2026, 1, 1)).days
            slot_index = {"morning": 0, "noon": 1, "evening": 2}[slot]
            chosen = fallback_data[(day_offset * 3 + slot_index) % len(fallback_data)]
            return {
                "type": "weak",
                "question_id": chosen.get("q", ""),
                "category": scfg["exam_sections"][0],
                "subject": subject,
                "priority": chosen.get("p", "B"),
                "last_date": chosen.get("date", "未実施"),
                "fallback_from": "riron",
            }
        return {
            "type": "weak", "question_id": f"{scfg['label']}-練習",
            "category": scfg["exam_sections"][0], "subject": subject,
            "priority": "B", "last_date": "未実施",
        }

    # e-logのL1/L2エラーパターンをweight計算に反映（エリクソン: ループを閉じる）
    # 直近10件のrecordsからL2エラーが多い問題IDを集計してブーストする
    error_boost = {}
    for r in records[-50:]:  # 直近50件を参照
        qid = r.get("theme", "") or r.get("q", "")
        etype = r.get("error_type", "")
        esub  = r.get("error_sub", "")
        if not qid:
            continue
        boost = 0
        if etype == "L2":
            boost = 1.5  # 認知バグ: 高ブースト（思い込み系は繰り返し出題が必要）
            if esub in ("ANCHOR", "CONF"):
                boost = 2.0  # 自信過剰・思い込みは特に危険
        elif etype == "L1":
            boost = 1.2  # 知識不足: 中ブースト
        if boost:
            error_boost[qid] = max(error_boost.get(qid, 0), boost)

    # 2) Weighted selection
    weighted = []
    for w in weak_data:
        p_weight   = {"S": 4, "A": 3, "B": 2, "C": 1}.get(w.get("p", "C"), 1)
        progress   = scfg["category_progress"].get(w.get("cat", ""), 0.50)
        e_boost    = error_boost.get(w.get("q", ""), 1.0)  # e-logブースト（デフォルト1.0）
        weighted.append((p_weight * max(1.0 - progress, 0.1) * e_boost, w))
    weighted.sort(key=lambda x: -x[0])

    idx    = (day_offset * 3 + slot_index) % len(weighted)
    chosen = weighted[idx][1]
    return {
        "type":        "weak",
        "question_id": chosen.get("q", ""),
        "category":    chosen.get("cat", ""),
        "subject":     subject,
        "priority":    chosen.get("p", "C"),
        "last_date":   chosen.get("date", "未実施"),
    }

# ── Claude API ─────────────────────────────────────────────────────
def generate_explanation(topic):
    subject  = topic.get("subject", "riron")
    qid      = topic.get("question_id", "")
    category = topic.get("category", "")
    # 日本語ラベルが来た場合も対応（past-errorsはJPラベルを返す）
    _LABEL_TO_KEY = {v["label"]: k for k, v in SUBJECT_CONFIG.items()}
    subject  = _LABEL_TO_KEY.get(subject, subject)
    label    = SUBJECT_CONFIG.get(subject, SUBJECT_CONFIG["riron"])["label"]

    cfg     = load_config()
    api_key = cfg.get("anthropic_api_key", "") or os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        return fallback_sections(topic)

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
    except Exception:
        return fallback_sections(topic)

    user_msg = (
        f"電験3種{label}科目「{qid}」の問題解説を生成してください。\n\n"
        f"問題ID: {qid}（例: R04下-問8 = 令和4年度下期 問8、H19-問7 = 平成19年 問7）\n"
        f"分野: {category}\n"
        f"優先度: {topic.get('priority', 'B')}\n"
    )
    if topic.get("type") == "review":
        user_msg += (
            f"前回の結果: {topic.get('last_result', '不明')}\n"
            f"前回のメモ: {topic.get('memo', 'なし')}\n"
            f"前回間違えたポイントを踏まえて脳内バグを潰す解説を。\n"
            f"section1には「{qid}」が実際に何を問う問題かの概要を含めてください。"
        )
    else:
        user_msg += (
            f"「{qid}」は電験3種の実際の過去問です。\n"
            f"この特定の問題の内容に基づいて解説してください（分野の一般論ではなく）。\n"
            f"section1には「{qid}」の問題文の要旨（何が与えられ何を求めるか、選択肢の傾向）を含めてください。"
        )

    sys_prompt = SYSTEM_PROMPT_HOUKI if subject == "houki" else SYSTEM_PROMPT_RIRON

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=3000,
            system=sys_prompt,
            messages=[{"role": "user", "content": user_msg}],
        )
        return parse_sections(response.content[0].text)
    except Exception as e:
        print(f"[ERROR] API: {e}")
        return fallback_sections(topic)

def parse_sections(raw):
    sections = {}
    for i in range(1, 6):
        m = re.search(rf"<section{i}>(.*?)</section{i}>", raw, re.DOTALL)
        sections[f"s{i}"] = m.group(1).strip() if m else ""
    if not any(sections.values()):
        sections["s1"] = raw
    return sections

def fallback_sections(topic):
    qid = topic.get("question_id", "")
    return {
        "s1": f"{qid} — API未接続のため解説を生成できませんでした。",
        "s2": "公式の意味を自分の言葉で説明してみましょう。",
        "s3": "よくある思い込みがないか振り返ってみましょう。",
        "s4": "問題文のキーワードから使う公式を判定する訓練をしましょう。",
        "s5": "<b>（API接続時に自動生成されます）</b>",
    }

# ── Feedback helpers ───────────────────────────────────────────────
RESULT_TO_SR = {"ok": "done", "risky": "SR2", "ng": "SR1"}

def append_elog(question_id, category, result, error_type=None, error_sub=None, memo=""):
    """NG/riskyの問題をe-log.mdに自動追記する"""
    elog_path = SECRETARY / "denken-study" / "e-log.md"
    if not elog_path.exists():
        return
    try:
        content = elog_path.read_text(encoding="utf-8")

        # L1/L2コードを決定
        l1 = error_type if error_type and error_type not in ("L1", "L2") else "-"
        l2 = error_sub if error_sub else "-"

        # メモ: memoがあれば使う、なければ問題IDを使う
        note = memo.strip() if memo and memo.strip() else f"自動記録: {question_id}"
        # 長すぎる場合は切り詰め
        if len(note) > 40:
            note = note[:40]

        # カテゴリを短縮（長い場合）
        cat = category[:15] if category else question_id[:15]

        today_str = TODAY.strftime("%Y-%m-%d")

        # 新しい行
        new_row = f"| {today_str} | {cat} | {l1} | {l2} | {note} |"

        # 「## 記録」セクションのテーブル末尾を探して追記
        import re

        # 「## 記録」の後のテーブルを探す（ヘッダー行 + 区切り行 + データ行）
        pattern = r'(## 記録.*?\n(?:\|[^\n]+\|\n)*(?:\|[^\n]+\|))'
        m = re.search(pattern, content, re.DOTALL)
        if m:
            # テーブル末尾に追記
            old = m.group(1)
            new = old + "\n" + new_row
            content = content.replace(old, new, 1)
        else:
            # テーブルが見つからない場合は「## 記録」の後に追加
            content = content.replace(
                "## 記録\n",
                "## 記録\n\n| 日付 | カテゴリ | L1 | L2 | 一言メモ |\n|---|---|---|---|---|\n" + new_row + "\n"
            )

        elog_path.write_text(content, encoding="utf-8")
        print(f"[e-log] appended: {today_str} | {cat} | {l1} | {l2}")
    except Exception as e:
        print(f"[e-log] append failed: {e}")

def apply_feedback(question_id, result, subject, memo="", error_type=None, error_sub=None):
    records = load_records()
    today_str = TODAY.isoformat()
    sr = RESULT_TO_SR.get(result, "SR1")

    # Update existing or append new
    for r in records:
        if r.get("theme") == question_id or r.get("q") == question_id:
            r["result"]      = result
            r["date"]        = today_str
            r["subject"]     = SUBJECT_CONFIG.get(subject, {}).get("label", subject)
            if memo:
                r["memo"] = memo
            if error_type:
                r["error_type"] = error_type
            if error_sub:
                r["error_sub"] = error_sub
            # 3連続正解で「卒業」（エリクソン）
            if result == "ok":
                consecutive = r.get("consecutive_ok", 0) + 1
                r["consecutive_ok"] = consecutive
                r["next_review"] = "done" if consecutive >= 3 else "SR2"
            else:
                r["consecutive_ok"] = 0
                r["next_review"] = sr
            save_records(records)
            # NG/riskyはe-logに自動追記
            if result in ("ng", "risky"):
                append_elog(question_id, r.get("category", r.get("subject", "")), result, error_type, error_sub, memo)
            return

    record = {
        "theme":          question_id,
        "date":           today_str,
        "result":         result,
        "next_review":    "SR2" if result == "ok" else sr,  # 初回okはSR2（まだ卒業しない）
        "consecutive_ok": 1 if result == "ok" else 0,
        "subject":        SUBJECT_CONFIG.get(subject, {}).get("label", subject),
        "memo":           memo,
    }
    if error_type:
        record["error_type"] = error_type
    if error_sub:
        record["error_sub"] = error_sub
    records.append(record)
    save_records(records)
    # NG/riskyはe-logに自動追記（新規レコード）
    if result in ("ng", "risky"):
        # 新規はcategoryが取れないため、subject（科目ラベル）を使う
        cat = SUBJECT_CONFIG.get(subject, {}).get("label", subject) if subject else question_id[:15]
        append_elog(question_id, cat, result, error_type, error_sub, memo)

# ── Flask app ──────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)

@app.route("/")
@app.route("/index.html")
def serve_index():
    if INDEX_HTML.exists():
        return send_file(str(INDEX_HTML))
    abort(404, "index.html not found")

@app.route("/portal-v2.html")
def serve_portal():
    if PORTAL_HTML.exists():
        return send_file(str(PORTAL_HTML))
    abort(404, "portal-v2.html not found")

@app.route("/denken-map.html")
def serve_map():
    p = SECRETARY / "denken-map.html"
    if p.exists():
        return send_file(str(p))
    abort(404, "denken-map.html not found")

@app.route("/denken3-study-dashboard/")
@app.route("/denken3-study-dashboard/index.html")
def serve_dashboard():
    if INDEX_HTML.exists():
        return send_file(str(INDEX_HTML))
    abort(404, "denken3-study-dashboard/index.html not found")

@app.route("/api/today")
def api_today():
    sessions = []
    records  = load_records()
    today_str = TODAY.isoformat()

    for slot, scfg in SLOT_CONFIG.items():
        topic = select_topic(slot, scfg["subject"])

        # Check if already completed today
        done = next(
            (r for r in records
             if r.get("date") == today_str
             and (r.get("theme") == topic["question_id"] or r.get("q") == topic["question_id"])),
            None
        )
        sessions.append({
            "slot":        slot,
            "label":       scfg["label"],
            "emoji":       scfg["emoji"],
            "subject":     scfg["subject"],
            "subject_label": SUBJECT_CONFIG[scfg["subject"]]["label"],
            "hour_start":  scfg["hour_start"],
            "hour_end":    scfg["hour_end"],
            "topic":       topic,
            "done":        done is not None,
            "result":      done.get("result") if done else None,
        })

    days_left = (EXAM_DATE - TODAY).days
    return jsonify({
        "date":      today_str,
        "days_left": days_left,
        "sessions":  sessions,
    })

@app.route("/api/explain", methods=["POST"])
def api_explain():
    data    = request.get_json(force=True)
    topic   = data.get("topic", {})
    sections = generate_explanation(topic)
    return jsonify({"sections": sections})

@app.route("/api/feedback", methods=["POST"])
def api_feedback():
    data        = request.get_json(force=True)
    question_id = data.get("question_id", "")
    result      = data.get("result", "ng")       # ok / risky / ng
    subject     = data.get("subject", "riron")
    memo        = data.get("memo", "")
    error_type  = data.get("error_type", None)   # L1 / L2
    error_sub   = data.get("error_sub", None)    # ANCHOR / CONF / RUSH (L2サブタイプ)
    if not question_id:
        return jsonify({"error": "question_id required"}), 400
    apply_feedback(question_id, result, subject, memo, error_type, error_sub)
    return jsonify({"status": "ok", "next_review": RESULT_TO_SR.get(result, "SR1")})

@app.route("/api/pdf-pages", methods=["POST"])
def api_pdf_pages():
    data = request.get_json(force=True)
    qid = data.get("question_id", "")
    subject = data.get("subject", "riron")
    if not qid:
        return jsonify({"error": "question_id required"}), 400

    # 1) PDFから試みる
    images = _extract_pdf_images(qid, subject)
    if images:
        return jsonify({"images": images, "found": True, "source": "pdf"})

    # 2) PDFになければ電験王Webから取得
    web = _fetch_web_problem(qid, subject)
    if web:
        return jsonify({"found": True, "source": "web", "text": web["text"], "url": web["url"]})

    return jsonify({"images": [], "found": False})

@app.route("/api/past-errors")
def api_past_errors():
    records = load_records()
    errors = []
    for r in records:
        result = r.get("result", "")
        nr = r.get("next_review", "")
        if result in ("ng", "risky") and nr != "done":
            errors.append({
                "question_id": r.get("theme", r.get("q", "")),
                "category":    r.get("category", r.get("theme", "")),
                "subject":     r.get("subject", "理論"),
                "result":      result,
                "date":        r.get("date", ""),
                "memo":        r.get("memo", ""),
                "next_review": nr,
            })
    errors.sort(key=lambda x: x.get("date", ""), reverse=True)
    return jsonify({"errors": errors})

@app.route("/api/mark-understood", methods=["POST"])
def api_mark_understood():
    data = request.get_json(force=True)
    question_id = data.get("question_id", "")
    if not question_id:
        return jsonify({"error": "question_id required"}), 400
    records = load_records()
    for r in records:
        if r.get("theme") == question_id or r.get("q") == question_id:
            r["result"] = "ok"
            r["next_review"] = "done"
            r["date"] = TODAY.isoformat()
            break
    save_records(records)
    return jsonify({"status": "ok"})

@app.route("/api/status")
def api_status():
    records   = load_records()
    today_str = TODAY.isoformat()
    done_today = [r for r in records if r.get("date") == today_str]
    return jsonify({
        "today":       today_str,
        "done_count":  len(done_today),
        "total_records": len(records),
    })

# ── PDCA helpers ───────────────────────────────────────────────────

L2_DESCS = {
    "READ":   "読み違い",
    "ASSUME": "勝手な前提",
    "MAP":    "対応づけ誤り",
    "TRACK":  "計算追跡ミス",
    "ANCHOR": "思い込み",
    "RUSH":   "焦りミス",
    "CONF":   "自信過剰",
}

def parse_elog():
    """denken-study/e-log.md の「## 記録」セクション下のテーブルをパース。
    戻り値: [{"code": "ANCHOR", "desc": "思い込み", "count": 2}, ...] (count降順)
    """
    try:
        elog_path = SECRETARY / "denken-study" / "e-log.md"
        if not elog_path.exists():
            return []
        text = elog_path.read_text(encoding="utf-8")

        # 「## 記録」セクション以降を抽出
        m = re.search(r"##\s*記録\s*\n(.*?)(?=\n##\s|\Z)", text, re.DOTALL)
        if not m:
            return []
        section = m.group(1)

        counts = {}
        for line in section.splitlines():
            line = line.strip()
            # テーブル行: | 日付 | カテゴリ | L1 | L2 | ... |
            if not line.startswith("|"):
                continue
            # ヘッダー行・区切り行を除外
            if re.match(r"\|[-\s|]+\|", line) or "日付" in line or "---" in line:
                continue
            parts = [p.strip() for p in line.split("|")]
            # parts[0] = "" (先頭|), parts[1]=日付, parts[2]=カテゴリ, parts[3]=L1, parts[4]=L2
            if len(parts) < 5:
                import logging
                logging.warning("[parse_elog] パース失敗行: %s", line)
                continue
            l2_raw = parts[4].strip() if len(parts) > 4 else ""
            if not l2_raw or l2_raw == "-":
                continue
            # 複数コード（カンマ区切り）対応
            for code in re.split(r"[,\s/]+", l2_raw):
                code = code.strip().upper()
                if code in L2_DESCS:
                    counts[code] = counts.get(code, 0) + 1
                elif code:
                    import logging
                    logging.warning("[parse_elog] 未知のL2コード: %s (行: %s)", code, line)

        result = [
            {"code": code, "desc": L2_DESCS.get(code, code), "count": cnt}
            for code, cnt in counts.items()
        ]
        result.sort(key=lambda x: -x["count"])
        return result
    except Exception as e:
        import logging
        logging.warning("[parse_elog] 例外: %s", e)
        return []


def parse_feynman_sessions():
    """denken-study/feynman-sessions/*.md を全件パース（_template.md 除外）。
    戻り値: [{"date","topic","subject","score","holes":[],"pending_checks":[]}] (日付降順)
    """
    try:
        sessions_dir = SECRETARY / "denken-study" / "feynman-sessions"
        if not sessions_dir.exists():
            return []

        results = []
        for md_file in sorted(sessions_dir.glob("*.md"), reverse=True):
            if md_file.name == "_template.md":
                continue
            try:
                text = md_file.read_text(encoding="utf-8")

                # frontmatter 抽出
                fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
                date_val = topic_val = subject_val = ""
                score_val = None
                if fm_match:
                    fm = fm_match.group(1)
                    dm = re.search(r'^date:\s*["\']?([^"\']+)["\']?\s*$', fm, re.MULTILINE)
                    tm = re.search(r'^topic:\s*["\']?([^"\']+)["\']?\s*$', fm, re.MULTILINE)
                    sm = re.search(r'^subject:\s*["\']?([^"\']+)["\']?\s*$', fm, re.MULTILINE)
                    um = re.search(r'^understanding_score:\s*(\d+)', fm, re.MULTILINE)
                    date_val    = dm.group(1).strip() if dm else ""
                    topic_val   = tm.group(1).strip() if tm else ""
                    subject_val = sm.group(1).strip() if sm else ""
                    score_val   = int(um.group(1)) if um else None

                # 「## 発見した知識の穴」セクションから穴リストを抽出
                holes = []
                holes_match = re.search(
                    r"##\s*発見した知識の穴\s*\n(.*?)(?=\n##\s|\Z)", text, re.DOTALL
                )
                if holes_match:
                    for line in holes_match.group(1).splitlines():
                        line = line.strip()
                        # 「- **穴N:**」または「- 穴N:」
                        hm = re.match(r"-\s+\*{0,2}穴\d+[^:]*[:：]\*{0,2}\s*(.*)", line)
                        if hm:
                            hole_text = hm.group(1).strip().strip("*")
                            if hole_text:
                                holes.append(hole_text)

                # 「## 次回確認すること」の未完了チェックボックス
                pending_checks = []
                check_match = re.search(
                    r"##\s*次回確認すること\s*\n(.*?)(?=\n##\s|\Z)", text, re.DOTALL
                )
                if check_match:
                    for line in check_match.group(1).splitlines():
                        line = line.strip()
                        if re.match(r"-\s+\[\s*\]", line):
                            content = re.sub(r"-\s+\[\s*\]\s*", "", line).strip()
                            if content:
                                pending_checks.append(content)

                results.append({
                    "date":           date_val,
                    "topic":          topic_val,
                    "subject":        subject_val,
                    "score":          score_val,
                    "holes":          holes,
                    "pending_checks": pending_checks,
                })
            except Exception as e:
                import logging
                logging.warning("[parse_feynman_sessions] %s のパース失敗: %s", md_file.name, e)

        # 日付降順
        results.sort(key=lambda x: x.get("date", ""), reverse=True)
        return results
    except Exception as e:
        import logging
        logging.warning("[parse_feynman_sessions] 例外: %s", e)
        return []


def parse_metabolism_plan():
    """denken-study/knowledge-metabolism.md をパース。
    戻り値: {"week":"W15","period":"4/7–4/13","themes":[],"urgent_list":[],"priority_list":[]}
    """
    try:
        meta_path = SECRETARY / "denken-study" / "knowledge-metabolism.md"
        if not meta_path.exists():
            return {"week": "", "period": "", "themes": [], "urgent_list": [], "priority_list": []}
        text = meta_path.read_text(encoding="utf-8")

        # week / period: 「### 2026-WXX（期間）」
        week_val = period_val = ""
        wm = re.search(r"###\s*\d{4}-W(\d+)[（(]([^）)]+)[）)]", text)
        if wm:
            week_val   = "W" + wm.group(1)
            period_val = wm.group(2).strip()

        # 「## 📋 今週の学習プラン（Plan）」セクション内のテーブル
        themes = []
        plan_match = re.search(
            r"##\s*📋\s*今週の学習プラン[^\n]*\n(.*?)(?=\n##\s|\Z)", text, re.DOTALL
        )
        if plan_match:
            for line in plan_match.group(1).splitlines():
                line = line.strip()
                if not line.startswith("|"):
                    continue
                if re.match(r"\|[-\s|]+\|", line) or "#" in line.split("|")[1] if len(line.split("|")) > 1 else False:
                    continue
                parts = [p.strip() for p in line.split("|")]
                # | # | テーマ | 選定理由 | 完了 |
                if len(parts) < 5:
                    continue
                num_part    = parts[1]
                name_part   = parts[2]
                reason_part = parts[3]
                done_part   = parts[4] if len(parts) > 4 else ""
                if not name_part or num_part in ("", "#"):
                    continue
                done = "✅" in done_part
                done_date = None
                if done:
                    date_m = re.search(r"(\d+/\d+)", done_part)
                    if date_m:
                        done_date = date_m.group(1)
                reason_badge = "weak" if "弱点🔴" in reason_part or "🔴" in reason_part else "gap"
                themes.append({
                    "num":              num_part,
                    "name":             name_part,
                    "reason":           reason_part,
                    "reason_badge_type": reason_badge,
                    "done":             done,
                    "done_date":        done_date,
                })

        def _parse_table_section(header_pattern):
            rows = []
            sm = re.search(header_pattern + r"\s*\n(.*?)(?=\n##\s|\Z)", text, re.DOTALL)
            if not sm:
                return rows
            for line in sm.group(1).splitlines():
                line = line.strip()
                if not line.startswith("|"):
                    continue
                if re.match(r"\|[-\s|]+\|", line):
                    continue
                parts = [p.strip() for p in line.split("|")]
                if len(parts) < 3 or not parts[1]:
                    continue
                # ヘッダー行スキップ
                if "問題ID" in parts[1] or "項目" in parts[1]:
                    continue
                rows.append({"id": parts[1], "category": parts[2] if len(parts) > 2 else "",
                              "detail": parts[3] if len(parts) > 3 else "",
                              "last_date": parts[4] if len(parts) > 4 else ""})
            return rows

        urgent_list   = _parse_table_section(r"##\s*🔴\s*緊急復習リスト[^\n]*")
        priority_list = _parse_table_section(r"##\s*🟠\s*高優先復習[^\n]*")

        return {
            "week":          week_val,
            "period":        period_val,
            "themes":        themes,
            "urgent_list":   urgent_list,
            "priority_list": priority_list,
        }
    except Exception as e:
        import logging
        logging.warning("[parse_metabolism_plan] 例外: %s", e)
        return {"week": "", "period": "", "themes": [], "urgent_list": [], "priority_list": []}


def get_theme_phase(theme_name: str, feynman_sessions: list, records: list) -> tuple:
    """テーマ名をfeynmanセッション・recordsと照合してP/D/Cフェーズを判定する。
    戻り値: (phase: str, dots: int)  phase∈{"P","D","C"}, dots∈{1,2,3}
    """
    import re
    # キーワード抽出: 漢字かな(2文字以上) or 英数字
    keywords = re.findall(r'[A-Za-z0-9]+|[\u3040-\u30FF\u4E00-\u9FFF]{2,}', theme_name)
    if not keywords:
        return ("P", 1)

    def _matches(text: str) -> bool:
        return any(kw in (text or "") for kw in keywords)

    # C: feynmanセッションにヒット かつ understanding_score >= 3
    has_c = any(
        _matches(fs.get("topic", ""))
        and (fs.get("score") or fs.get("understanding_score") or 0) >= 3
        for fs in feynman_sessions
    )
    if has_c:
        return ("C", 3)

    # D: feynmanセッションにヒット(スコア問わず) or recordsにヒット
    has_feynman_d = any(_matches(fs.get("topic", "")) for fs in feynman_sessions)
    has_record_d = any(
        _matches(r.get("theme", "") or r.get("q", "") or r.get("category", ""))
        for r in (records or [])[-50:]
    )
    if has_feynman_d or has_record_d:
        return ("D", 2)

    return ("P", 1)


def records_to_do_log():
    """直近10件のrecordsを整形して返す（date降順）。
    戻り値: [{"date":"4/10","theme":"...","source":"Gemini","score":4}]
    """
    try:
        records = load_records()
        # date降順ソート
        records_sorted = sorted(
            [r for r in records if r.get("date")],
            key=lambda x: x.get("date", ""),
            reverse=True
        )
        result = []
        for r in records_sorted[:10]:
            raw_date = r.get("date", "")
            # YYYY-MM-DD → M/D 形式に変換
            try:
                d = date.fromisoformat(raw_date)
                fmt_date = f"{d.month}/{d.day}"
            except Exception:
                fmt_date = raw_date
            result.append({
                "date":   fmt_date,
                "theme":  r.get("theme", r.get("q", "")),
                "source": r.get("source", "問題演習"),
                "score":  r.get("understanding_score", None),
                "result": r.get("result", ""),
            })
        return result
    except Exception as e:
        import logging
        logging.warning("[records_to_do_log] 例外: %s", e)
        return []


@app.route("/api/pdca")
def api_pdca():
    try:
        elog_bugs = parse_elog()
    except Exception:
        elog_bugs = []
    try:
        feynman = parse_feynman_sessions()
    except Exception:
        feynman = []
    try:
        plan_data = parse_metabolism_plan()
    except Exception:
        plan_data = {"week": "", "period": "", "themes": [], "urgent_list": [], "priority_list": []}
    try:
        do_logs = records_to_do_log()
    except Exception:
        do_logs = []

    # current_phase: Plan=P(themes全未完了), Do=D(1件以上完了), Check=C(全完了), Act=A(週末)
    themes = plan_data.get("themes", [])
    done_count = sum(1 for t in themes if t.get("done"))
    if done_count == 0:
        phase = "P"
    elif done_count < len(themes):
        phase = "D"
    else:
        phase = "C"

    # check.rewrites: feynmanセッションの穴リストから生成
    rewrites = []
    for fs in feynman:
        holes   = fs.get("holes", [])
        pending = fs.get("pending_checks", [])
        topic   = fs.get("topic", "")
        for i, hole in enumerate(holes):
            rewrites.append({
                "date":           fs["date"],
                "pattern":        hole,
                "verified":       None,
                "topic":          topic,
                "pending_checks": pending,   # セッション全体の確認問題を各穴に紐付け
            })

    # countermeasures: ANCHOR/CONFが多い場合は定型文
    countermeasures = []
    for bug in elog_bugs[:1]:
        if bug["code"] == "ANCHOR":
            countermeasures.append("ANCHOR対策: 必ず「極端条件（R=0 or ∞）」を代入してから判断する")
        elif bug["code"] == "CONF":
            countermeasures.append("CONF対策: 自信がある問題こそ別手法で検算する")

    # next_action
    next_action = {"phase": "C", "text": "フェインマン [弱点テーマ]", "cmd": "フェインマン [テーマを入力]"}
    if phase == "P":
        next_action = {"phase": "P", "text": "学習プラン を実行して今週テーマを決める", "cmd": "学習プラン"}
    elif phase == "D":
        incomplete = [t["name"] for t in themes if not t.get("done")]
        if incomplete:
            next_action = {"phase": "C", "text": f"フェインマン {incomplete[0]}", "cmd": f"フェインマン {incomplete[0]}"}

    # reason_badge_type → type に統一 + per-themeフェーズ検出
    all_records = load_records()
    normalized_themes = []
    for t in themes:
        th_phase, th_dots = get_theme_phase(t.get("name", ""), feynman, all_records)
        normalized_themes.append({
            **t,
            "type":        t.get("reason_badge_type", "gap"),
            "phase":       th_phase,
            "phase_dots":  th_dots,
        })

    # グローバルフェーズ = 週全体の進捗で判定（done数ベース）
    # ※ get_theme_phase の "P" が未着手テーマに引きずられてグローバルを上書きしないよう修正
    done_count = sum(1 for t in normalized_themes if t.get("done"))
    total_count = len(normalized_themes)
    all_checked = all(t.get("phase") in ("C",) for t in normalized_themes if t.get("done"))
    if done_count == 0:
        phase = "P"
    elif done_count == total_count and all_checked:
        phase = "C"
    elif done_count >= total_count:
        phase = "D"
    else:
        phase = "D"

    # 月・金は学習プラン更新日
    weekday = TODAY.weekday()  # 0=月, 4=金
    is_update_day = weekday in (0, 4)

    return jsonify({
        "week":          plan_data.get("week", ""),
        "period":        plan_data.get("period", ""),
        "current_phase": phase,
        "is_update_day": is_update_day,
        "next_action":   next_action,
        "plan":  {"themes": normalized_themes},
        "do":    {"logs": do_logs},
        "check": {"rewrites": rewrites},
        "act":   {"bugs": elog_bugs, "countermeasures": countermeasures},
    })


# ── Phase 4 自動メトリクス ─────────────────────────────────────────
@app.route('/api/phase-metrics')
def phase_metrics():
    from datetime import datetime, timedelta
    now = datetime.now()

    def days_since(p):
        if not p.exists():
            return 9999
        return (now - datetime.fromtimestamp(p.stat().st_mtime)).days

    # 1. decision-log エントリ数（### [数字]. 形式）
    decision_log = SECRETARY / "digital-twin" / "decision-log.md"
    log_text = decision_log.read_text(encoding="utf-8") if decision_log.exists() else ""
    log_entries = len(re.findall(r'^###\s+\d+\.', log_text, re.MULTILINE))
    log_target = 10

    # 2. digital-twin フォルダ内の更新ファイル数（30日以内）
    dt_dir = SECRETARY / "digital-twin"
    dt_files = [f for f in dt_dir.glob("*.md") if not f.name.startswith("_")]
    dt_updated = sum(1 for f in dt_files if days_since(f) <= 30)
    dt_target = 3

    # 3. furutan-bot-spec.md の行数・最終更新
    bot_spec = SECRETARY / "digital-twin" / "furutan-bot-spec.md"
    bot_lines = len(bot_spec.read_text(encoding="utf-8").splitlines()) if bot_spec.exists() else 0
    bot_days = days_since(bot_spec)
    bot_target = 200

    # 4. Wiki HTML 生成（denken3-study-dashboard/index.html）
    wiki_html = SECRETARY / "denken3-study-dashboard" / "index.html"
    wiki_done = wiki_html.exists()

    # 5. Notion週次同期自動化（process_exports.py 存在 + 最終実行ログ）
    sync_script = SECRETARY / "ai-exports" / "process_exports.py"
    processed_dir = SECRETARY / "ai-exports" / "processed"
    last_sync_days = 9999
    if processed_dir.exists():
        logs = sorted(processed_dir.glob("processed_*.json"), reverse=True)
        if logs:
            last_sync_days = days_since(logs[0])
    sync_done = sync_script.exists() and last_sync_days <= 7

    subtasks = [
        {
            "id": 0,
            "label": "digital-twin 強化",
            "metric": f"{dt_updated}件更新 / {len(dt_files)}件中（直近30日）",
            "value": dt_updated,
            "target": dt_target,
            "done": dt_updated >= dt_target,
            "auto": True,
        },
        {
            "id": 1,
            "label": "decision-log 蓄積・パターン分析",
            "metric": f"{log_entries}件 / {log_target}件",
            "value": log_entries,
            "target": log_target,
            "done": log_entries >= log_target,
            "auto": True,
        },
        {
            "id": 2,
            "label": "furutan-bot 精度向上",
            "metric": f"{bot_lines}行（{bot_days}日前更新）" if bot_spec.exists() else "ファイルなし",
            "value": bot_lines,
            "target": bot_target,
            "done": bot_lines >= bot_target and bot_days <= 30,
            "auto": True,
        },
        {
            "id": 3,
            "label": "Wiki HTML生成",
            "metric": "生成済み" if wiki_done else "未生成",
            "value": 1 if wiki_done else 0,
            "target": 1,
            "done": wiki_done,
            "auto": True,
        },
        {
            "id": 4,
            "label": "Notion週次同期自動化",
            "metric": f"最終実行: {last_sync_days}日前" if last_sync_days < 9999 else ("スクリプト有・未実行" if sync_script.exists() else "未設定"),
            "value": 1 if sync_done else 0,
            "target": 1,
            "done": sync_done,
            "auto": True,
        },
    ]

    done_count = sum(1 for s in subtasks if s["done"])
    return jsonify({
        "subtasks": subtasks,
        "done_count": done_count,
        "total": len(subtasks),
        "checked_at": now.strftime("%Y-%m-%d %H:%M"),
    })


@app.route('/api/knowledge-map')
def api_knowledge_map():
    """知識接続マップデータを返す。records.json + e-log + past-errorsから状態を計算"""
    import json, re
    from pathlib import Path

    BASE = Path(__file__).parent
    config_path = BASE / 'denken-study' / 'knowledge-map-config.json'
    records_path = BASE / 'denken3-study-dashboard' / 'data' / 'records.json'

    # config読み込み
    if not config_path.exists():
        return jsonify({'error': 'config not found'}), 404
    with open(config_path, encoding='utf-8') as f:
        config = json.load(f)

    # records.json読み込み（テーマ→最新状態マップ）
    topic_status = {}   # node_id → {result, next_review, memo}
    topic_error_count = {}  # node_id → int
    topic_map = config.get('record_topic_map', {})

    items = []
    if records_path.exists():
        with open(records_path, encoding='utf-8') as f:
            records = json.load(f)
        # recordsが辞書の場合とリストの場合を処理
        items = records if isinstance(records, list) else records.get('records', [])
        for rec in items:
            theme = rec.get('theme', '')
            node_id = topic_map.get(theme)
            if not node_id:
                continue
            result = rec.get('result', '')
            if result == 'ng':
                topic_error_count[node_id] = topic_error_count.get(node_id, 0) + 1
            # 最新レコードを保持
            topic_status[node_id] = {
                'result': result,
                'next_review': rec.get('next_review', ''),
                'memo': rec.get('memo', ''),
                'date': rec.get('date', '')
            }

    # e-log.mdから追加誤答カウント
    elog_path = BASE / 'denken-study' / 'e-log.md'
    if elog_path.exists():
        with open(elog_path, encoding='utf-8') as f:
            elog_text = f.read()
        for theme, node_id in topic_map.items():
            table_rows = [line for line in elog_text.split('\n') if line.strip().startswith('|')]
            count = sum(1 for row in table_rows if theme in row)
            if count > 0:
                topic_error_count[node_id] = topic_error_count.get(node_id, 0) + count

    # ノード状態を計算
    def get_node_status(node):
        nid = node['id']
        if node.get('hub'):
            return 'hub'
        if node.get('cross_subject'):
            st = topic_status.get(nid, {})
            return 'connected' if st else 'connected'
        st = topic_status.get(nid)
        if not st:
            return 'unlearned'
        r = st.get('result', '')
        if r == 'ok':
            return 'ok'
        elif r in ('ng', 'risky'):
            return 'weak'
        return 'unlearned'

    enriched_nodes = []
    for node in config['nodes']:
        nid = node['id']
        status = get_node_status(node)
        st = topic_status.get(nid, {})
        enriched_nodes.append({
            **node,
            'status': status,
            'error_count': topic_error_count.get(nid, 0),
            'result': st.get('result', ''),
            'next_review': st.get('next_review', ''),
            'memo': st.get('memo', ''),
            'last_date': st.get('date', '')
        })

    # ── radar: 科目別理解度 ──
    subject_stats = {}  # subject → {ok:0, risky:0, ng:0, total:0}
    for rec in items:
        subj = rec.get('subject', '')
        if not subj:
            continue
        if subj not in subject_stats:
            subject_stats[subj] = {'ok': 0, 'risky': 0, 'ng': 0, 'total': 0}
        subject_stats[subj]['total'] += 1
        r = rec.get('result', '')
        if r == 'ok':
            subject_stats[subj]['ok'] += 1
        elif r == 'risky':
            subject_stats[subj]['risky'] += 1
        elif r == 'ng':
            subject_stats[subj]['ng'] += 1

    # スコア計算: ok=100, risky=50, ng=0 の加重平均
    radar_labels = []
    radar_scores = []
    for subj, st in subject_stats.items():
        if st['total'] == 0:
            continue
        score = round((st['ok'] * 100 + st['risky'] * 50) / st['total'])
        radar_labels.append(subj)
        radar_scores.append(score)

    # ── today summary ──
    today_str = date.today().isoformat()
    today_done = 0
    today_total = 0
    for rec in items:
        if rec.get('date', '') == today_str:
            today_total += 1
            if rec.get('result', '') == 'ok':
                today_done += 1

    return jsonify({
        'nodes': enriched_nodes,
        'edges': config['edges'],
        'subjects': config['subjects'],
        'radar': {
            'labels': radar_labels,
            'scores': radar_scores
        },
        'today': {
            'done': today_done,
            'total': today_total,
            'date': today_str
        }
    })


if __name__ == "__main__":
    import socket, logging
    PORT = 8765
    LOG_FILE = SECRETARY / "logs" / "denken-server.log"
    LOG_FILE.parent.mkdir(exist_ok=True)

    # ポート使用中チェック（二重起動防止 + 競合解消）
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    already_running = sock.connect_ex(("127.0.0.1", PORT)) == 0
    sock.close()
    if already_running:
        # Flask API が動いているか確認（/api/status で判定）
        import urllib.request
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/api/status", timeout=3) as resp:
                if resp.status == 200:
                    # 正常なFlaskサーバーが既に動作中 → 静かに終了
                    sys.exit(0)
        except Exception:
            pass
        # Flask以外のプロセス（SimpleHTTPServer等）がポートを占有 → キルして起動
        import subprocess
        result = subprocess.run(
            ["netstat", "-ano"], capture_output=True, text=True
        )
        for line in result.stdout.splitlines():
            if f":{PORT}" in line and "LISTENING" in line:
                parts = line.split()
                pid = parts[-1]
                try:
                    subprocess.run(["taskkill", "/PID", pid, "/F"],
                                   capture_output=True, timeout=5)
                except Exception:
                    pass
        import time; time.sleep(1)

    # ファイルにもログを記録
    logging.basicConfig(
        filename=str(LOG_FILE),
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    logging.info("Denken Server starting on port %d", PORT)

    print(f"[Denken Server] http://localhost:{PORT}/")
    app.run(host="0.0.0.0", port=PORT, debug=False)
