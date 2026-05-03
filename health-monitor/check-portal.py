#!/usr/bin/env python3
"""Portal health checker for portal-v2.html"""

import json
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
TARGET = BASE_DIR / "portal-v2.html"
OUTPUT = Path(__file__).parent / "portal-check-results.json"


def check_dead_links(html: str, lines: list) -> list:
    issues = []
    seen = set()
    for i, line in enumerate(lines, 1):
        for href in re.findall(r'href=["\']([^"\']+)["\']', line):
            if href.startswith(("http://", "https://", "#", "mailto:", "javascript:")):
                continue
            path = href.split("#")[0]
            if not path or path in seen:
                continue
            seen.add(path)
            if not (BASE_DIR / path).exists():
                issues.append({
                    "severity": "error",
                    "category": "dead_links",
                    "line": i,
                    "message": f"リンク先が存在しません: {path}",
                })
    return issues


def check_hardcoded_pct(html: str, lines: list) -> list:
    issues = []

    summary_path = BASE_DIR / "denken3-study-dashboard" / "summary.json"
    if not summary_path.exists():
        issues.append({
            "severity": "warning",
            "category": "hardcoded_pct",
            "line": None,
            "message": "summary_unreadable: denken3-study-dashboard/summary.json が見つかりません",
        })

    for i, line in enumerate(lines, 1):
        for pct in re.findall(r'<i\s+style="width:(\d+)%"', line):
            issues.append({
                "severity": "warning",
                "category": "hardcoded_pct",
                "line": i,
                "message": f"進捗バーに hardcoded パーセント: width:{pct}%",
            })

    return issues


def check_forbidden_decorations(html: str, lines: list) -> list:
    PATTERNS = [
        (r'href=["\']http://localhost', "localhost URL in href"),
        (r'href=["\']file:///', "file:// URL in href"),
        (r'!important', "!important の使用"),
    ]
    issues = []
    for i, line in enumerate(lines, 1):
        for pattern, msg in PATTERNS:
            if re.search(pattern, line):
                issues.append({
                    "severity": "error",
                    "category": "forbidden_decorations",
                    "line": i,
                    "message": f"禁止装飾: {msg}",
                })
    return issues


def main():
    html = TARGET.read_text(encoding="utf-8")
    lines = html.splitlines()

    all_issues = (
        check_dead_links(html, lines)
        + check_hardcoded_pct(html, lines)
        + check_forbidden_decorations(html, lines)
    )

    errors = sum(1 for i in all_issues if i["severity"] == "error")
    warnings = sum(1 for i in all_issues if i["severity"] == "warning")

    result = {
        "target": "portal-v2.html",
        "errors": errors,
        "warnings": warnings,
        "issues": all_issues,
    }

    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"完了: errors={errors}, warnings={warnings}")


if __name__ == "__main__":
    main()
