#!/usr/bin/env python3
"""
wiki_verify.py — Wiki DOM検証 + スクリーンショット
Usage:
  python wiki_verify.py [page_hash] [--screenshot] [--file hoki]
  python wiki_verify.py transistor --screenshot
  python wiki_verify.py koji-shi-ho --file hoki

  --file riron  → denken3-riron-wiki.html (default)
  --file hoki   → denken-hoki-wiki.html
  --file <url>  → arbitrary URL

Returns JSON to stdout. Screenshot saved as wiki_verify_<hash>.png.
Token cost for Claude: only the JSON output (small).
"""
import sys
import io
import json
import argparse

# Windows stdout UTF-8 強制
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from pathlib import Path
from playwright.sync_api import sync_playwright

FILE_ALIASES = {
    "riron": "http://localhost:8092/denken3-riron-wiki.html",
    "hoki":  "http://localhost:8092/denken-hoki-wiki.html",
}
DEFAULT_BASE = FILE_ALIASES["riron"]
WAIT_MS = 4000   # Babel transpile wait

CHECKS = {
    "search_chips":    "document.querySelectorAll('.search-chip').length",
    "toc_items":       "document.querySelectorAll('.toc li').length",
    "toc_texts":       "[...document.querySelectorAll('.toc li a')].map(a=>a.textContent).slice(0,8)",
    "h2_with_id":      "document.querySelectorAll('.main h2[id]').length",
    "prereq_table":    "!!document.querySelector('.main .data-table')",
    "svg_in_main":     "document.querySelectorAll('.main svg').length",
    "console_errors":  "window.__errors || []",
    "current_hash":    "location.hash",
    "page_title":      "document.querySelector('.page-title')?.textContent || ''",
}

def run(page_hash: str, screenshot: bool, output_dir: Path, base_url: str = DEFAULT_BASE):
    url = f"{base_url}#{page_hash}" if page_hash else base_url
    results = {"url": url, "page": page_hash}

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1400, "height": 900})
        page = ctx.new_page()

        # エラー収集
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))

        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(WAIT_MS)

        for key, js in CHECKS.items():
            try:
                results[key] = page.evaluate(js)
            except Exception as e:
                results[key] = f"ERROR: {e}"

        results["js_errors"] = errors

        if screenshot:
            path = output_dir / f"wiki_verify_{page_hash or 'home'}.png"
            page.screenshot(path=str(path), full_page=False)
            results["screenshot"] = str(path)

        browser.close()

    return results

def main():
    parser = argparse.ArgumentParser(description="Wiki DOM verification")
    parser.add_argument("page", nargs="?", default="transistor",
                        help="Page hash (e.g. transistor, home, formulas)")
    parser.add_argument("--screenshot", "-s", action="store_true",
                        help="Save screenshot PNG")
    parser.add_argument("--out", default=".", help="Output directory for screenshots")
    parser.add_argument("--file", "-f", default="riron",
                        help="Wiki file: riron (default) | hoki | arbitrary URL")
    args = parser.parse_args()

    base_url = FILE_ALIASES.get(args.file, args.file if args.file.startswith("http") else DEFAULT_BASE)

    output_dir = Path(args.out)
    output_dir.mkdir(parents=True, exist_ok=True)

    result = run(args.page, args.screenshot, output_dir, base_url)
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
