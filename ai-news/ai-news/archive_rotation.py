#!/usr/bin/env python3
"""
archive_rotation.py: Rotate feeds/ to keep 90 days + high-value articles
Runs: monthly or manually. Deletes: published_at < 90d AND score < 3
Preserves: score 4-5 (永続), recent feeds (90d within)
"""

import os
import json
from datetime import datetime, timedelta
from pathlib import Path

FEEDS_DIR = Path(__file__).parent.parent / "feeds"
ARCHIVE_DIR = Path(__file__).parent.parent / "archive"

def load_frontmatter(md_file):
    """Extract YAML frontmatter from .md file"""
    with open(md_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    if not lines or lines[0].strip() != '---':
        return None

    fm_end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            fm_end = i
            break

    if fm_end is None:
        return None

    import yaml
    try:
        fm = yaml.safe_load(''.join(lines[1:fm_end]))
        return fm
    except:
        return None

def should_delete(fm):
    """Determine if file should be archived/deleted"""
    if not fm or 'published_at' not in fm or 'score' not in fm:
        return False

    try:
        pub_date = datetime.fromisoformat(fm['published_at'].replace('Z', '+00:00')).date()
        score = int(fm.get('score', 0))

        days_old = (datetime.now(pub_date.tzinfo).date() - pub_date).days if hasattr(pub_date, 'tzinfo') else (datetime.now().date() - pub_date).days

        if score >= 4:
            return False

        if days_old < 90:
            return False

        return True
    except:
        return False

def main():
    if not FEEDS_DIR.exists():
        print(f"[ERROR] {FEEDS_DIR} not found")
        return

    ARCHIVE_DIR.mkdir(exist_ok=True)

    deleted_count = 0
    preserved_count = 0

    for md_file in FEEDS_DIR.glob('*.md'):
        fm = load_frontmatter(md_file)

        if should_delete(fm):
            try:
                pub_date = datetime.fromisoformat(fm['published_at'].replace('Z', '+00:00')).date()
                year_month = pub_date.strftime('%Y-%m')
                sub_dir = ARCHIVE_DIR / year_month
                sub_dir.mkdir(exist_ok=True)
                archive_path = sub_dir / md_file.name
                md_file.rename(archive_path)
                print(f"[ARCHIVED] {md_file.name} → archive/{year_month}/")
            except Exception as e:
                archive_path = ARCHIVE_DIR / md_file.name
                md_file.rename(archive_path)
                print(f"[ARCHIVED] {md_file.name} → archive/ (fallback: {e})")
            deleted_count += 1
        else:
            preserved_count += 1

    print(f"\n[SUMMARY] Archived: {deleted_count}, Preserved: {preserved_count}")

if __name__ == '__main__':
    main()
