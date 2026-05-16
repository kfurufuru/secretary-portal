"""
Auto-memory expiry monitor.

Walks ~/.claude/projects/C--Users-kfuru--secretary/memory/ and reports:
- EXPIRED files (expires: date < today) - should be reviewed for removal
- DUE-SOON files (expires within 30 days)
- OK files (expires > 30 days)

Usage:
    python scripts/check_memory_expiry.py             # human-readable summary
    python scripts/check_memory_expiry.py --quiet     # exit 1 only if EXPIRED found
"""
import re
import sys
from datetime import date, datetime
from pathlib import Path

MEM = Path.home() / ".claude" / "projects" / "C--Users-kfuru--secretary" / "memory"
TODAY = date.today()
DUE_SOON_DAYS = 30


def parse_expires(text: str):
    m = re.search(r"^expires:\s*(\d{4}-\d{2}-\d{2})\s*$", text, re.MULTILINE)
    if not m:
        return None
    try:
        return datetime.strptime(m.group(1), "%Y-%m-%d").date()
    except ValueError:
        return None


def main():
    quiet = "--quiet" in sys.argv
    expired, due_soon, ok = [], [], []

    for p in sorted(MEM.glob("*.md")):
        if p.name in ("MEMORY.md", "_audit_dedup_candidates.md"):
            continue
        d = parse_expires(p.read_text(encoding="utf-8"))
        if not d:
            continue
        delta = (d - TODAY).days
        bucket = (p.name, d, delta)
        if delta < 0:
            expired.append(bucket)
        elif delta <= DUE_SOON_DAYS:
            due_soon.append(bucket)
        else:
            ok.append(bucket)

    if not quiet:
        print(f"Memory expiry report - today={TODAY}\n")
        if expired:
            print(f"[EXPIRED] {len(expired)} file(s) - review for removal/update:")
            for name, d, delta in expired:
                print(f"  {name}  ({d}, {-delta} day(s) overdue)")
            print()
        if due_soon:
            print(f"[DUE SOON] {len(due_soon)} file(s) - review within 30 days:")
            for name, d, delta in due_soon:
                print(f"  {name}  ({d}, {delta} day(s) left)")
            print()
        if ok:
            print(f"[OK] {len(ok)} file(s) - expiry > 30 days:")
            for name, d, delta in ok:
                print(f"  {name}  ({d}, {delta} day(s) left)")

    sys.exit(1 if expired else 0)


if __name__ == "__main__":
    main()
