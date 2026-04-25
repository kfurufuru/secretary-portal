#!/usr/bin/env python3
"""
Consolidate CSS from 37 business-skills HTML files into shared.css
and replace <style> blocks with <link rel="stylesheet" href="shared.css">
"""

import os
import re
from pathlib import Path

# Directory
skills_dir = Path(__file__).parent

# Read the first file to extract CSS
first_html = skills_dir / "atama-ga-ii.html"
if not first_html.exists():
    print(f"ERROR: {first_html} not found")
    exit(1)

with open(first_html, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS from <style>...</style>
match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if not match:
    print("ERROR: <style> block not found in first file")
    exit(1)

css_content = match.group(1)

# Write shared.css
shared_css_path = skills_dir / "shared.css"
with open(shared_css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print(f"[OK] Created shared.css ({len(css_content)} bytes)")

# Find all .html files
html_files = sorted([f for f in skills_dir.glob("*.html") if f.is_file()])
print(f"Found {len(html_files)} HTML files")

# Process each file
converted = 0
for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Replace <style>...</style> with <link rel="stylesheet" href="shared.css">
    new_content = re.sub(
        r'<style>.*?</style>',
        '<link rel="stylesheet" href="shared.css">',
        html_content,
        count=1,
        flags=re.DOTALL
    )

    if new_content != html_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        converted += 1
        print(f"[OK] {html_file.name}")

print(f"\nComplete: {converted}/{len(html_files)} files converted")
print(f"Size reduction: approximately {len(css_content) * (converted - 1) / 1024:.1f} KB")
