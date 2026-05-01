"""
evaluate_wiki.py - denken3-riron-wiki 一括評価スクリプト
全コンポーネントの定義・ルーティング・セクション完全性を1パスで検証
"""
import re, json, sys, argparse
from pathlib import Path
from datetime import datetime

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

BASE = Path(__file__).resolve().parent

SOURCE_FILES = [
    "riron-data.js",
    "riron-components.jsx",
    "riron-pages-batch1.jsx",
    "riron-pages-batch2.jsx",
    "riron-pages-batch3.jsx",
    "riron-pages-strategy.jsx",
    "denken3-riron-wiki.html",
]

SECTION_IDS = ["principle", "formulas", "comparison", "examples", "traps", "related"]

UI_PATTERNS = {
    "meta_strip":    r'<MetaStrip\b|className="meta-strip"',
    "learning_map":  r'<LearningMap\b',
    "page_header":   r'<PageHeader\b|className="page-header"',
    "crumbs":        r'<Crumbs\b|className="crumbs"',
    "page_nav":      r'<PageNav\b|className="page-nav"',
    "analogy":       r'<Analogy\b',
    "formula_table": r'<FormulaTable\b',
    "callout":       r'<Callout\b',
}

CONTENT_WEIGHTS = {
    "defined": 10, "routed": 10,
    "meta_strip": 8, "learning_map": 6, "page_header": 8, "crumbs": 5, "page_nav": 5,
    "principle": 10, "formulas": 10, "comparison": 8, "examples": 10, "traps": 5, "related": 5,
}

CONTENT_CHAPTERS = {"ch1", "ch2", "ch3", "ch4", "ch5", "ch6"}


def load_sources():
    sources = {}
    for name in SOURCE_FILES:
        p = BASE / name
        if p.exists():
            sources[name] = p.read_text(encoding="utf-8")
    return sources


def extract_route_map(html):
    route_re = re.compile(r"case\s+'([^']+)':\s*return\s+<(\w+Page)")
    return dict(route_re.findall(html))


def parse_chapters(html):
    chapters = []
    ch_block = re.search(r'chapters:\s*\[(.*?)\]\s*,\s*\n\s*(?:freqData|trapPatterns|glossary|//)',
                         html, re.DOTALL)
    if not ch_block:
        return chapters

    ch_re = re.compile(
        r'\{\s*id:\s*"(\w+)".*?num:\s*"([^"]+)".*?title:\s*"([^"]+)".*?pages:\s*\[(.*?)\]',
        re.DOTALL
    )
    page_re = re.compile(
        r'\{\s*id:\s*"([^"]+)".*?num:\s*"([^"]+)".*?title:\s*"([^"]+)"',
        re.DOTALL
    )
    for m in ch_re.finditer(ch_block.group(1)):
        ch = {"id": m.group(1), "num": m.group(2), "title": m.group(3), "pages": []}
        for pm in page_re.finditer(m.group(4)):
            ch["pages"].append({"id": pm.group(1), "num": pm.group(2), "title": pm.group(3)})
        chapters.append(ch)
    return chapters


def find_component_defs(sources):
    comp_re = re.compile(r'^const\s+(\w+Page)\s*=\s*\(', re.MULTILINE)
    defs = {}
    for fname, content in sources.items():
        if fname == "denken3-riron-wiki.html":
            continue
        lines = content.split('\n')
        positions = []
        for m in comp_re.finditer(content):
            name = m.group(1)
            line_no = content[:m.start()].count('\n') + 1
            positions.append((m.start(), name, line_no))
        positions.sort()
        for i, (pos, name, line_no) in enumerate(positions):
            if i + 1 < len(positions):
                end_pos = positions[i + 1][0]
                end_line = positions[i + 1][2] - 1
            else:
                end_pos = len(content)
                end_line = len(lines)
            text = content[pos:end_pos]
            defs[name] = {
                "source_file": fname,
                "start_line": line_no,
                "end_line": end_line,
                "line_count": end_line - line_no + 1,
                "text": text,
            }
    # ch8 pages: defined inline in HTML
    html = sources.get("denken3-riron-wiki.html", "")
    if html:
        lines = html.split('\n')
        positions = []
        for m in comp_re.finditer(html):
            name = m.group(1)
            if name not in defs:
                line_no = html[:m.start()].count('\n') + 1
                positions.append((m.start(), name, line_no))
        positions.sort()
        for i, (pos, name, line_no) in enumerate(positions):
            if i + 1 < len(positions):
                end_pos = positions[i + 1][0]
                end_line = positions[i + 1][2] - 1
            else:
                end_pos = len(html)
                end_line = len(lines)
            text = html[pos:end_pos]
            defs[name] = {
                "source_file": "denken3-riron-wiki.html",
                "start_line": line_no,
                "end_line": end_line,
                "line_count": end_line - line_no + 1,
                "text": text,
            }
    return defs


def check_exported(name, sources):
    export_re = re.compile(r'Object\.assign\s*\(\s*window\s*,\s*\{[^}]*\b' + re.escape(name) + r'\b', re.DOTALL)
    for fname, content in sources.items():
        if export_re.search(content):
            return True
    return False


def evaluate_component(name, comp_def, route_map, sources, page_info):
    text = comp_def["text"] if comp_def else ""
    page_id = None
    for pid, cname in route_map.items():
        if cname == name:
            page_id = pid
            break

    chapter_id = page_info.get("chapter_id", "") if page_info else ""
    is_content = chapter_id in CONTENT_CHAPTERS

    sections = {}
    for sid in SECTION_IDS:
        sections[sid] = bool(re.search(rf'id="{sid}"', text)) if text else False

    ui = {}
    for key, pat in UI_PATTERNS.items():
        ui[key] = bool(re.search(pat, text)) if text else False

    defined = comp_def is not None
    routed = page_id is not None
    exported = check_exported(name, sources) if defined else False

    score = 0.0
    if is_content:
        total_weight = sum(CONTENT_WEIGHTS.values())
        earned = 0
        if defined: earned += CONTENT_WEIGHTS["defined"]
        if routed: earned += CONTENT_WEIGHTS["routed"]
        for sid in SECTION_IDS:
            if sections.get(sid): earned += CONTENT_WEIGHTS.get(sid, 0)
        for key in ["meta_strip", "learning_map", "page_header", "crumbs", "page_nav"]:
            if ui.get(key): earned += CONTENT_WEIGHTS.get(key, 0)
        score = earned / total_weight if total_weight else 0
    else:
        checks = [defined, routed]
        if ui.get("page_header"): checks.append(True)
        if ui.get("crumbs"): checks.append(True)
        if ui.get("page_nav"): checks.append(True)
        score = sum(1 for c in checks if c) / max(len(checks), 1)

    issues = []
    if not defined: issues.append("NOT_DEFINED")
    if not routed: issues.append("NOT_ROUTED")
    if defined and not exported and comp_def["source_file"] != "denken3-riron-wiki.html":
        issues.append("NOT_EXPORTED")
    if is_content:
        missing = [s for s in SECTION_IDS if not sections[s]]
        if missing: issues.append(f"MISSING_SECTIONS:{','.join(missing)}")
        if not ui.get("meta_strip"): issues.append("NO_META_STRIP")
        if not ui.get("page_nav"): issues.append("NO_PAGE_NAV")

    return {
        "component": name,
        "page_id": page_id,
        "chapter": chapter_id,
        "source_file": comp_def["source_file"] if comp_def else None,
        "start_line": comp_def["start_line"] if comp_def else None,
        "line_count": comp_def["line_count"] if comp_def else 0,
        "defined": defined,
        "routed": routed,
        "exported": exported,
        "sections": sections,
        "ui_components": ui,
        "completeness_score": round(score, 2),
        "issues": issues,
    }


def format_table(results, chapters):
    FILE_ABBREV = {
        "riron-pages-batch1.jsx": "b1",
        "riron-pages-batch2.jsx": "b2",
        "riron-pages-batch3.jsx": "b3",
        "riron-pages-strategy.jsx": "st",
        "riron-components.jsx": "cm",
        "denken3-riron-wiki.html": "html",
    }
    ok = "✓"
    ng = "✗"

    hdr = f"{'Component':<24} {'File':<5} {'Lines':>5}  M  L  S1 S2 S3 S4 S5 S6 Nav  Score"
    sep = "-" * len(hdr)
    lines = [sep, hdr, sep]

    result_map = {r["component"]: r for r in results}

    for ch in chapters:
        ch_lines = []
        for pg in ch["pages"]:
            comp_name = None
            for pid, cname in extract_route_map_cache.items():
                if pid == pg["id"]:
                    comp_name = cname
                    break
            if not comp_name or comp_name not in result_map:
                continue
            r = result_map[comp_name]
            f_abbr = FILE_ABBREV.get(r["source_file"], "??")
            lc = r["line_count"]
            m = ok if r["ui_components"].get("meta_strip") else ng
            l = ok if r["ui_components"].get("learning_map") else ng
            secs = [ok if r["sections"].get(s) else ng for s in SECTION_IDS]
            nav = ok if r["ui_components"].get("page_nav") else ng
            sc = f"{r['completeness_score']*100:.0f}%"
            issues_str = ""
            if r["issues"]:
                issues_str = f"  << {', '.join(r['issues'])}"
            ch_lines.append(f"  {comp_name:<22} {f_abbr:<5} {lc:>5}  {m}  {l}  {secs[0]}  {secs[1]}  {secs[2]}  {secs[3]}  {secs[4]}  {secs[5]}  {nav}   {sc:>4}{issues_str}")
        if ch_lines:
            lines.append(f"  -- {ch['num']} {ch['title']} --")
            lines.extend(ch_lines)

    lines.append(sep)
    total = len(results)
    complete = sum(1 for r in results if r["completeness_score"] >= 1.0)
    with_issues = sum(1 for r in results if r["issues"])
    avg = sum(r["completeness_score"] for r in results) / total if total else 0
    lines.append(f"Summary: {total} pages | {complete} complete | {with_issues} with issues | avg {avg*100:.0f}%")
    return "\n".join(lines)


def write_report(results, chapters, output_path):
    ch_results = []
    result_map = {r["component"]: r for r in results}
    for ch in chapters:
        ch_pages = []
        for pg in ch["pages"]:
            comp_name = extract_route_map_cache.get(pg["id"])
            if comp_name and comp_name in result_map:
                r = dict(result_map[comp_name])
                del r["component"]
                r["page_id"] = pg["id"]
                r["page_title"] = pg["title"]
                ch_pages.append(r)
        ch_results.append({"id": ch["id"], "num": ch["num"], "title": ch["title"], "pages": ch_pages})

    total = len(results)
    report = {
        "meta": {
            "generated_at": datetime.now().isoformat(),
            "source_files": SOURCE_FILES,
            "total_pages": total,
            "average_completeness": round(sum(r["completeness_score"] for r in results) / total, 2) if total else 0,
        },
        "summary": {
            "fully_complete": sum(1 for r in results if r["completeness_score"] >= 1.0),
            "with_issues": sum(1 for r in results if r["issues"]),
            "not_defined": sum(1 for r in results if not r["defined"]),
            "not_routed": sum(1 for r in results if not r["routed"]),
        },
        "chapters": ch_results,
    }
    output_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return report


extract_route_map_cache = {}


def main():
    parser = argparse.ArgumentParser(description="denken3-riron-wiki evaluator")
    parser.add_argument("--chapter", help="Filter to specific chapter (e.g., ch5)")
    parser.add_argument("--issues-only", action="store_true", help="Show only pages with issues")
    parser.add_argument("--json-only", action="store_true", help="JSON output only")
    parser.add_argument("--component", help="Single component deep-dive")
    args = parser.parse_args()

    sources = load_sources()
    html = sources.get("denken3-riron-wiki.html", "")

    global extract_route_map_cache
    extract_route_map_cache = extract_route_map(html)
    chapters = parse_chapters(html)
    comp_defs = find_component_defs(sources)

    if args.chapter:
        chapters = [ch for ch in chapters if ch["id"] == args.chapter]

    results = []
    for ch in chapters:
        for pg in ch["pages"]:
            comp_name = extract_route_map_cache.get(pg["id"])
            if not comp_name:
                results.append({
                    "component": f"?({pg['id']})", "page_id": pg["id"], "chapter": ch["id"],
                    "source_file": None, "start_line": None, "line_count": 0,
                    "defined": False, "routed": False, "exported": False,
                    "sections": {s: False for s in SECTION_IDS},
                    "ui_components": {k: False for k in UI_PATTERNS},
                    "completeness_score": 0, "issues": ["NOT_ROUTED"],
                })
                continue
            if args.component and comp_name != args.component:
                continue
            comp_def = comp_defs.get(comp_name)
            page_info = {"chapter_id": ch["id"]}
            r = evaluate_component(comp_name, comp_def, extract_route_map_cache, sources, page_info)
            results.append(r)

    if args.issues_only:
        results = [r for r in results if r["issues"]]

    output_path = BASE / "wiki-evaluation.json"
    write_report(results, chapters, output_path)

    if not args.json_only:
        print(format_table(results, chapters))
        print(f"\nReport saved: {output_path}")


if __name__ == "__main__":
    main()
