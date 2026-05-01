"""Dump recent (non-auto) git commits as JSON for portal-v2.html activity panel.

Usage:
    cd C:/Users/kfuru/.secretary
    python cron-jobs/dump-recent-commits.py

Output: logs/recent-commits.json (5 entries, newest first)
Schema: [{"date": "MM/DD", "msg": "...", "tag": "WIKI|PORTAL|DASHBOARD|CLAUDE|FEEDS|OTHER"}]
"""
from __future__ import annotations

import io
import json
import os
import re
import subprocess
import sys
from pathlib import Path

REPO = Path("C:/Users/kfuru/.secretary")
OUT = REPO / "logs" / "recent-commits.json"
MAX_LEN = 50
TARGET = 5

TAG_RULES = [
    ("WIKI", re.compile(r"wiki|knowledge|denken-(riron|hoki|denryoku|kikai)")),
    ("PORTAL", re.compile(r"portal")),
    ("DASHBOARD", re.compile(r"dashboard|denken3-study")),
    ("CLAUDE", re.compile(r"claude|skill|memory")),
    ("FEEDS", re.compile(r"feeds|ai-news|trending")),
]


def classify(msg: str) -> str:
    low = msg.lower()
    for tag, rx in TAG_RULES:
        if rx.search(low):
            return tag
    return "OTHER"


def truncate(s: str, n: int = MAX_LEN) -> str:
    return s if len(s) <= n else s[: n - 1] + "…"


def to_mmdd(date: str) -> str:
    # date is "YYYY-MM-DD"
    parts = date.split("-")
    if len(parts) != 3:
        return date
    return f"{parts[1]}/{parts[2]}"


def fetch_commits() -> list[tuple[str, str]]:
    result = subprocess.run(
        [
            "git",
            "-C",
            str(REPO),
            "log",
            "--pretty=format:%ad|%s",
            "--date=short",
            "-n",
            "30",
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True,
    )
    out: list[tuple[str, str]] = []
    for line in result.stdout.splitlines():
        if "|" not in line:
            continue
        date, msg = line.split("|", 1)
        out.append((date.strip(), msg.strip()))
    return out


def main() -> int:
    # Ensure stdout is UTF-8 on Windows
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

    commits = fetch_commits()
    picked: list[dict] = []
    for date, msg in commits:
        if not msg:
            continue
        if msg.startswith("auto:"):
            continue
        if msg.startswith("Merge "):
            continue
        picked.append(
            {
                "date": to_mmdd(date),
                "msg": truncate(msg),
                "tag": classify(msg),
            }
        )
        if len(picked) >= TARGET:
            break

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump(picked, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"wrote {len(picked)} entries -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
