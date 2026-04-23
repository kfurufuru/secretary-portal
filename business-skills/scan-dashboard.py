"""
scan-dashboard.py — 知識3層ダッシュボード用 JSON 生成
L1: inbox/ トップレベル .md
L2: knowledge/ frontmatter (draft/review/published)
L3: digital-twin/ (予約)
出力: business-skills/dashboard-data.json
"""

import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / "inbox"
KNOWLEDGE = ROOT / "knowledge"
OUT = ROOT / "business-skills" / "dashboard-data.json"

DATE_RE = re.compile(r"(\d{4}-\d{2}-\d{2})")
TYPE_RE = re.compile(r"^([a-zA-Z0-9]+(?:-[a-zA-Z]+)?)-\d{4}")
FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


def parse_frontmatter(text: str) -> dict:
    m = FM_RE.match(text)
    if not m:
        return {}
    data = {}
    for line in m.group(1).splitlines():
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        if val.startswith("[") and val.endswith("]"):
            items = [v.strip().strip('"').strip("'") for v in val[1:-1].split(",")]
            data[key] = [v for v in items if v]
        else:
            data[key] = val
    return data


def classify_type(name: str) -> str:
    m = TYPE_RE.match(name)
    if not m:
        return ""
    prefix = m.group(1)
    known = {"handoff", "1on1-agenda", "note-article", "daily", "weekly"}
    return prefix if prefix in known else ""


def scan_l1() -> list:
    items = []
    if not INBOX.exists():
        return items
    for f in sorted(INBOX.glob("*.md")):
        if f.name.startswith("_"):
            continue
        text = ""
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")[:2000]
        except Exception:
            pass
        fm = parse_frontmatter(text)
        date_match = DATE_RE.search(f.stem)
        items.append({
            "path": f.name,
            "date": date_match.group(1) if date_match else "",
            "type": classify_type(f.stem),
            "topic": fm.get("topic", ""),
            "escalated": fm.get("level", "") in ("review", "published"),
            "relative_path": f"inbox/{f.name}",
        })
    return items


def scan_l2() -> dict:
    buckets = {"draft": [], "review": [], "published": []}
    if not KNOWLEDGE.exists():
        return buckets
    for f in sorted(KNOWLEDGE.glob("*.md")):
        if f.name.startswith("_"):
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        fm = parse_frontmatter(text)
        level = fm.get("level", "").strip()
        if level not in buckets:
            continue
        try:
            score = int(fm.get("understanding_score", 0))
        except ValueError:
            score = 0
        buckets[level].append({
            "title": fm.get("title", f.stem),
            "category": fm.get("category", ""),
            "level": level,
            "created": fm.get("created", ""),
            "last_reviewed": fm.get("last_reviewed", ""),
            "understanding_score": score,
            "tags": fm.get("tags", []) if isinstance(fm.get("tags"), list) else [],
            "relative_path": f"knowledge/{f.name}",
        })
    return buckets


def main() -> None:
    l1 = scan_l1()
    l2 = scan_l2()
    payload = {
        "l1_candidates": l1,
        "l2_draft": l2["draft"],
        "l2_review": l2["review"],
        "l2_published": l2["published"],
        "l3_entities": [],
        "metadata": {
            "scanned_at": datetime.now().isoformat(),
            "total_l1": len(l1),
            "total_l2_draft": len(l2["draft"]),
            "total_l2_review": len(l2["review"]),
            "total_l2_published": len(l2["published"]),
            "total_l3": 0,
        },
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[scan-dashboard] wrote {OUT.relative_to(ROOT)} "
          f"(L1={len(l1)} / L2 draft={len(l2['draft'])} review={len(l2['review'])} published={len(l2['published'])})")


if __name__ == "__main__":
    main()
