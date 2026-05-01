"""Dump today's TODO list as JSON for portal-v2.html "Today's Focus" panel.

Usage:
    cd C:/Users/kfuru/.secretary
    python cron-jobs/dump-today-todos.py

Input:  todos/today.md (optional; absent -> empty items)
Output: logs/today-todos.json
Schema: {"date": "YYYY-MM-DD", "items": [{text, priority, due, done}]}
        items capped at 5; sorted by (priority high first, undone first, due asc).
"""
from __future__ import annotations

import datetime
import io
import json
import re
import sys
from pathlib import Path

REPO = Path("C:/Users/kfuru/.secretary")
SRC = REPO / "todos" / "today.md"
OUT = REPO / "logs" / "today-todos.json"
MAX_TEXT = 40
MAX_ITEMS = 5

LINE_RE = re.compile(
    r"^- \[([ xX])\] (.+?)(?: \| 優先度: (高|通常|低))?(?: \| 期限: (\d{4}-\d{2}-\d{2}))?\s*$"
)

PRIORITY_ORDER = {"高": 0, "通常": 1, "低": 2}
FAR_FUTURE = "9999-99-99"


def truncate(s: str, n: int = MAX_TEXT) -> str:
    s = s.strip()
    return s if len(s) <= n else s[: n - 1] + "…"


def parse_line(line: str) -> dict | None:
    line = line.rstrip("\r\n")
    m = LINE_RE.match(line)
    if not m:
        return None
    mark, text, prio, due = m.group(1), m.group(2), m.group(3), m.group(4)
    return {
        "text": truncate(text),
        "priority": prio if prio else "通常",
        "due": due if due else None,
        "done": mark.lower() == "x",
    }


def parse_file(path: Path) -> list[dict]:
    items: list[dict] = []
    try:
        content = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return items
    for raw in content.splitlines():
        item = parse_line(raw)
        if item is not None:
            items.append(item)
    return items


def sort_key(it: dict) -> tuple:
    return (
        1 if it["done"] else 0,                          # undone first
        PRIORITY_ORDER.get(it["priority"], 1),           # 高 < 通常 < 低
        it["due"] if it["due"] else FAR_FUTURE,          # earlier due first
    )


def main() -> int:
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

    items = parse_file(SRC)
    items.sort(key=sort_key)
    items = items[:MAX_ITEMS]

    payload = {
        "date": datetime.date.today().isoformat(),
        "items": items,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")

    src_state = "found" if SRC.exists() else "missing"
    print(f"wrote {len(items)} items -> {OUT} (todos/today.md: {src_state})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
