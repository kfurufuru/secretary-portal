#!/usr/bin/env python3
"""
link_generator.py: Auto-generate wiki-links between related feeds
Logic: same ai_category + score >= 3 → add to 'related' frontmatter
Runs: after sync_to_vault.py (Phase 4)
"""

import os
import re
from pathlib import Path
from datetime import datetime
import yaml

FEEDS_DIR = Path(__file__).parent.parent / "feeds"

def load_frontmatter_and_body(md_file):
    """Load YAML frontmatter + body from .md file"""
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    if not lines[0].strip() == '---':
        return None, content

    fm_end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            fm_end = i
            break

    if fm_end is None:
        return None, content

    try:
        fm_text = '\n'.join(lines[1:fm_end])
        fm = yaml.safe_load(fm_text)
        body = '\n'.join(lines[fm_end+1:])
        return fm, body
    except:
        return None, content

def save_file_with_frontmatter(md_file, fm, body):
    """Save YAML frontmatter + body back to .md file"""
    fm_text = yaml.dump(fm, default_flow_style=False, allow_unicode=True, sort_keys=False)
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write('---\n')
        f.write(fm_text)
        f.write('---\n')
        f.write(body)

def find_related_articles(target_fm, all_files):
    """Find articles with same ai_category + score >= 3"""
    if 'ai_category' not in target_fm or 'score' not in target_fm:
        return []

    target_cat = target_fm['ai_category']
    target_score = int(target_fm.get('score', 0))

    related = []
    for md_file in all_files:
        fm, _ = load_frontmatter_and_body(md_file)
        if not fm or md_file.name == target_fm.get('_file'):
            continue

        if fm.get('ai_category') == target_cat and int(fm.get('score', 0)) >= 3:
            related.append({
                'file': md_file.stem,
                'title': fm.get('title', 'Untitled'),
                'score': int(fm.get('score', 0))
            })

    return sorted(related, key=lambda x: x['score'], reverse=True)[:5]

def main():
    if not FEEDS_DIR.exists():
        print(f"[ERROR] {FEEDS_DIR} not found")
        return

    all_files = list(FEEDS_DIR.glob('*.md'))
    updated_count = 0

    for md_file in all_files:
        fm, body = load_frontmatter_and_body(md_file)
        if not fm:
            continue

        fm['_file'] = md_file.name

        related_articles = find_related_articles(fm, all_files)

        if related_articles:
            related_paths = [f"ai-news/feeds/{article['file']}.md" for article in related_articles]
            fm['related'] = related_paths

            save_file_with_frontmatter(md_file, fm, body)
            print(f"[LINKED] {md_file.name} → {len(related_paths)} related articles")
            updated_count += 1

    print(f"\n[SUMMARY] Updated: {updated_count}/{len(all_files)} files")

if __name__ == '__main__':
    main()
