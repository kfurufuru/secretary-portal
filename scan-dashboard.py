#!/usr/bin/env python3
"""
Knowledge Escalation Dashboard Scanner

Scans inbox, knowledge, and denken-study directories to generate
dashboard-data.json for visualization of L1/L2/L3 knowledge layers.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any


def extract_frontmatter(content: str) -> Dict[str, Any]:
    """
    Extract YAML frontmatter from markdown content.

    Args:
        content: File content string

    Returns:
        Dictionary of frontmatter fields
    """
    # Match YAML block: --- ... ---
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return {}

    yaml_content = match.group(1)
    frontmatter = {}

    # Simple YAML parsing (key: value pairs)
    for line in yaml_content.split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue

        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Remove quotes if present
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]

            # Parse arrays (e.g., ["tag1", "tag2"])
            if value.startswith('[') and value.endswith(']'):
                try:
                    value = json.loads(value)
                except:
                    value = [v.strip().strip('"\'') for v in value[1:-1].split(',')]

            # Parse numbers
            elif value.isdigit():
                value = int(value)

            frontmatter[key] = value

    return frontmatter


def scan_l1(inbox_dir: str) -> List[Dict[str, Any]]:
    """
    Scan inbox directory for unescalated files.

    Args:
        inbox_dir: Path to inbox directory

    Returns:
        List of unescalated file dictionaries
    """
    candidates = []

    inbox_path = Path(inbox_dir)
    if not inbox_path.exists():
        return candidates

    for md_file in sorted(inbox_path.glob('*.md')):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if file has escalation marker
            has_escalation = bool(re.search(r'\[昇格済み→.*?\]', content))

            # Extract frontmatter
            frontmatter = extract_frontmatter(content)

            # Only include unescalated files
            if not has_escalation:
                candidates.append({
                    'path': md_file.name,
                    'date': frontmatter.get('date', ''),
                    'type': frontmatter.get('type', ''),
                    'topic': frontmatter.get('topic', ''),
                    'escalated': False,
                    'relative_path': f'inbox/{md_file.name}'
                })

        except Exception as e:
            print(f'Error reading {md_file}: {e}')

    return candidates


def scan_l2(knowledge_dir: str) -> Dict[str, List[Dict[str, Any]]]:
    """
    Scan knowledge directory and group by level.

    Args:
        knowledge_dir: Path to knowledge directory

    Returns:
        Dictionary with 'draft', 'review', 'published' keys
    """
    grouped = {
        'draft': [],
        'review': [],
        'published': []
    }

    knowledge_path = Path(knowledge_dir)
    if not knowledge_path.exists():
        return grouped

    for md_file in sorted(knowledge_path.glob('*.md')):
        if md_file.name.startswith('_'):  # Skip templates
            continue

        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract frontmatter
            frontmatter = extract_frontmatter(content)

            # Get level and score
            level = frontmatter.get('level', 'draft')
            score = frontmatter.get('understanding_score', 0)

            # Only include if score >= 3 OR level is published
            if score >= 3 or level == 'published':
                article = {
                    'title': frontmatter.get('title', md_file.stem),
                    'category': frontmatter.get('category', ''),
                    'level': level,
                    'created': frontmatter.get('created', ''),
                    'last_reviewed': frontmatter.get('last_reviewed', ''),
                    'understanding_score': score,
                    'tags': frontmatter.get('tags', []),
                    'relative_path': f'knowledge/{md_file.name}'
                }

                # Add to appropriate group
                if level in grouped:
                    grouped[level].append(article)
                else:
                    grouped['draft'].append(article)

        except Exception as e:
            print(f'Error reading {md_file}: {e}')

    return grouped


def scan_l3(denken_dir: str) -> List[Dict[str, Any]]:
    """
    Scan denken-study/wiki/entities for verified entities.

    Args:
        denken_dir: Path to denken-study directory

    Returns:
        List of verified entity dictionaries
    """
    entities = []

    entities_path = Path(denken_dir) / 'wiki' / 'entities'
    if not entities_path.exists():
        return entities

    for md_file in sorted(entities_path.glob('*.md')):
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract frontmatter
            frontmatter = extract_frontmatter(content)

            # Only include if status is verified
            if frontmatter.get('status') == 'verified':
                entity = {
                    'title': frontmatter.get('title', md_file.stem),
                    'type': frontmatter.get('type', ''),
                    'created': frontmatter.get('created', ''),
                    'tags': frontmatter.get('tags', []),
                    'relative_path': f'denken-study/wiki/entities/{md_file.name}'
                }
                entities.append(entity)

        except Exception as e:
            print(f'Error reading {md_file}: {e}')

    return entities


def generate_json(base_dir: str, output_path: str = None) -> None:
    """
    Generate dashboard-data.json from scanned data.

    Args:
        base_dir: Base .secretary directory
        output_path: Path to output JSON file (default: business-skills/dashboard-data.json)
    """
    if output_path is None:
        output_path = os.path.join(base_dir, 'business-skills', 'dashboard-data.json')

    print(f'Scanning knowledge layers in {base_dir}...')

    # Scan all layers
    l1_candidates = scan_l1(os.path.join(base_dir, 'inbox'))
    l2_grouped = scan_l2(os.path.join(base_dir, 'knowledge'))
    l3_entities = scan_l3(base_dir)

    # Build output structure
    dashboard_data = {
        'l1_candidates': l1_candidates,
        'l2_draft': l2_grouped['draft'],
        'l2_review': l2_grouped['review'],
        'l2_published': l2_grouped['published'],
        'l3_entities': l3_entities,
        'metadata': {
            'scanned_at': datetime.now().isoformat(),
            'total_l1': len(l1_candidates),
            'total_l2_draft': len(l2_grouped['draft']),
            'total_l2_review': len(l2_grouped['review']),
            'total_l2_published': len(l2_grouped['published']),
            'total_l3': len(l3_entities)
        }
    }

    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    os.makedirs(output_dir, exist_ok=True)

    # Write JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dashboard_data, f, ensure_ascii=False, indent=2)

    print(f'[OK] Generated {output_path}')
    print(f'  L1 candidates: {dashboard_data["metadata"]["total_l1"]}')
    print(f'  L2 draft: {dashboard_data["metadata"]["total_l2_draft"]}')
    print(f'  L2 review: {dashboard_data["metadata"]["total_l2_review"]}')
    print(f'  L2 published: {dashboard_data["metadata"]["total_l2_published"]}')
    print(f'  L3 entities: {dashboard_data["metadata"]["total_l3"]}')


if __name__ == '__main__':
    # Get base directory
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Generate JSON
    generate_json(base_dir)

    print('\nDone.')
