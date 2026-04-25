#!/usr/bin/env python3
"""
update-portal-data.py
portal-data.json を毎朝自動更新するスクリプト。
タスクスケジューラで 06:05 に実行。
"""

import json
import re
import os
from datetime import date, datetime
from pathlib import Path

# --- パス定義 ---
BASE = Path("C:/Users/kfuru/.secretary")
TODOS_DIR = BASE / "todos"
KNOWLEDGE_DIR = BASE / "knowledge"
IDEAS_DIR = BASE / "ideas"
RESEARCH_DIR = BASE / "research"
DENKEN_DIR = BASE / "denken-study"
ELOG_FILE = DENKEN_DIR / "e-log.md"
METRICS_JSON = BASE / "health-monitor" / "metrics.json"
OUTPUT = BASE / "portal-data.json"

EXAM_DATE = date(2026, 8, 1)
STUDY_START = date(2026, 3, 1)


def count_md_files(directory: Path) -> int:
    """ディレクトリ内の .md ファイル数（_template.md 除く）"""
    if not directory.exists():
        return 0
    return sum(1 for f in directory.glob("*.md") if not f.name.startswith("_"))


def parse_todos(today_str: str):
    """todos/YYYY-MM-DD.md を読み込んで items / total / done を返す"""
    todo_file = TODOS_DIR / f"{today_str}.md"
    items = []
    if not todo_file.exists():
        return {"today_file": f"{today_str}.md", "items": items, "total": 0, "done": 0}

    content = todo_file.read_text(encoding="utf-8")
    # 未完了: - [ ] 内容 | 優先度: ...
    for line in content.splitlines():
        m_open = re.match(r"^- \[ \] (.+)", line)
        m_done = re.match(r"^- \[x\] (.+)", line, re.IGNORECASE)
        if m_open:
            text = m_open.group(1).split(" | ")[0].strip()
            items.append({"text": text, "done": False})
        elif m_done:
            text = m_done.group(1).split(" | ")[0].strip()
            items.append({"text": text, "done": True})

    total = len(items)
    done = sum(1 for i in items if i["done"])
    return {"today_file": f"{today_str}.md", "items": items, "total": total, "done": done}


def count_elog_entries() -> int:
    """e-log.md の誤答エントリ数（## 見出し数でカウント）"""
    if not ELOG_FILE.exists():
        return 0
    content = ELOG_FILE.read_text(encoding="utf-8")
    return len(re.findall(r"^## ", content, re.MULTILINE))


def get_recent_errors(n: int = 4) -> list:
    """e-log.md から直近 n 件の誤答を取得"""
    if not ELOG_FILE.exists():
        return []
    content = ELOG_FILE.read_text(encoding="utf-8")
    # セクションを ## で分割
    sections = re.split(r"^## ", content, flags=re.MULTILINE)
    errors = []
    for sec in sections:
        if not sec.strip():
            continue
        lines = sec.strip().splitlines()
        if not lines:
            continue
        header = lines[0]  # e.g. "2026-04-18 交流回路(RL短絡)"
        category_m = re.match(r"[\d\-]+ (.+)", header)
        category = category_m.group(1).strip() if category_m else header.strip()

        l1, l2, memo = "", "", ""
        for line in lines[1:]:
            ml1 = re.match(r"- L1[：:]\s*(.+)", line)
            ml2 = re.match(r"- L2[：:]\s*(.+)", line)
            mm = re.match(r"- (メモ|memo)[：:]\s*(.+)", line)
            if ml1:
                l1 = ml1.group(1).strip()
            if ml2:
                l2 = ml2.group(1).strip()
            if mm:
                memo = mm.group(2).strip()
        errors.append({"category": category, "l1": l1, "l2": l2, "memo": memo})

    return errors[-n:]  # 直近 n 件


def get_knowledge_by_category() -> dict:
    """knowledge/ のサブフォルダ別ファイル数"""
    if not KNOWLEDGE_DIR.exists():
        return {}
    result = {}
    # ルート直下
    root_count = sum(1 for f in KNOWLEDGE_DIR.glob("*.md") if not f.name.startswith("_"))
    if root_count:
        result["(root)"] = root_count
    # サブフォルダ
    for sub in sorted(KNOWLEDGE_DIR.iterdir()):
        if sub.is_dir() and not sub.name.startswith("."):
            cnt = sum(1 for f in sub.glob("*.md") if not f.name.startswith("_"))
            if cnt:
                result[sub.name] = cnt
    return result


def calc_denken_progress() -> float:
    """試験日・勉強開始日から進捗率を計算"""
    today = date.today()
    total_days = (EXAM_DATE - STUDY_START).days
    elapsed = (today - STUDY_START).days
    if total_days <= 0:
        return 100.0
    pct = round((elapsed / total_days) * 100, 1)
    return min(pct, 100.0)


def get_k_bars(by_category: dict, knowledge_total: int) -> dict:
    """
    ポータルの k_bars: ei / ai / dk（denken） / fm（factory） の割合
    """
    def pct(n):
        if knowledge_total == 0:
            return 0
        return round((n / knowledge_total) * 100)

    ei_n = by_category.get("ei", 0)
    ai_n = by_category.get("ai", 0)
    dk_n = by_category.get("houki", 0)  # 電験関連
    fm_n = by_category.get("trouble", 0)

    return {
        "ei": {"pct": pct(ei_n), "n": ei_n},
        "ai": {"pct": pct(ai_n), "n": ai_n},
        "dk": {"pct": pct(dk_n), "n": dk_n},
        "fm": {"pct": pct(fm_n), "n": fm_n},
    }


def get_system_health() -> list:
    """フォルダ・ファイルの存在確認でシステムヘルスを生成"""
    checks = [
        {
            "name": "電験メーラー",
            "path": BASE / "logs" / "api-cost.json",
            "ok_detail": "api-cost.json あり",
            "ng_detail": "ファイル未検出",
        },
        {
            "name": "ナレッジDB",
            "path": KNOWLEDGE_DIR,
            "ok_detail": "フォルダあり",
            "ng_detail": "フォルダ未検出",
        },
        {
            "name": "デジタルツイン",
            "path": BASE / "digital-twin" / "decision-log.md",
            "ok_detail": "decision-log.md あり",
            "ng_detail": "decision-log.md 未検出",
        },
        {
            "name": "TODOログ",
            "path": TODOS_DIR,
            "ok_detail": "フォルダあり",
            "ng_detail": "ファイル/フォルダ未検出",
        },
        {
            "name": "ヘルスモニター",
            "path": BASE / "health-monitor" / "health-dashboard.html",
            "ok_detail": "dashboard.html あり",
            "ng_detail": "dashboard.html 未検出",
        },
    ]
    result = []
    for c in checks:
        exists = c["path"].exists()
        result.append({
            "name": c["name"],
            "status": "ok" if exists else "warn",
            "detail": c["ok_detail"] if exists else c["ng_detail"],
        })
    return result


def main():
    today = date.today()
    today_str = today.strftime("%Y-%m-%d")

    # --- TODO ---
    todos = parse_todos(today_str)

    # --- Knowledge ---
    by_category = get_knowledge_by_category()
    knowledge_total = sum(by_category.values())
    ideas_count = count_md_files(IDEAS_DIR)
    research_count = count_md_files(RESEARCH_DIR)
    denken_notes = count_md_files(DENKEN_DIR)

    # --- Denken ---
    days_left = (EXAM_DATE - today).days
    progress_pct = calc_denken_progress()
    elog_count = count_elog_entries()
    recent_errors = get_recent_errors(4)

    # --- k_bars ---
    k_bars = get_k_bars(by_category, knowledge_total)

    # --- System health ---
    system_health = get_system_health()

    # --- focus_today ---
    open_todos = [t for t in todos["items"] if not t["done"]]
    if open_todos:
        focus_today = open_todos[0]["text"]
    else:
        focus_today = "今日のタスクは完了済みです"

    data = {
        "generated_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "todos": todos,
        "knowledge": {
            "total": knowledge_total,
            "by_category": by_category,
            "denken_notes": denken_notes,
            "ideas": ideas_count,
            "research": research_count,
        },
        "denken": {
            "exam_date": EXAM_DATE.strftime("%Y-%m-%d"),
            "days_left": days_left,
            "study_start": STUDY_START.strftime("%Y-%m-%d"),
            "progress_pct": progress_pct,
            "elog_count": elog_count,
            "recent_errors": recent_errors,
        },
        "k_bars": k_bars,
        "system_health": system_health,
        "focus_today": focus_today,
    }

    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[{datetime.now():%H:%M:%S}] portal-data.json 更新完了")
    print(f"  todos: {todos['total']}件 ({todos['done']}完了)")
    print(f"  knowledge: {knowledge_total}件 / ideas: {ideas_count} / research: {research_count}")
    print(f"  denken: {days_left}日後 / elog: {elog_count}件 / 進捗: {progress_pct}%")
    print(f"  focus: {focus_today}")


if __name__ == "__main__":
    main()
