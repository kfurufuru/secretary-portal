#!/usr/bin/env python3
"""
babel_check.py — denken-hoki/riron wiki の Babel 構文チェック

ローカルHTMLの <script type="text/babel"> をブラウザ内 Babel で全件トランスパイルし、
1ヶ所でも構文エラーがあれば「読み込み中から進まない」現象になる。
事前検出で再発を防止する。

Usage:
  python babel_check.py            # default: hoki
  python babel_check.py hoki
  python babel_check.py riron
  python babel_check.py http://localhost:8092/foo.html

Exit code: 0=OK, 1=エラー検出
"""
import sys
import io
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

FILE_ALIASES = {
    "hoki":  "http://localhost:8092/denken-hoki-wiki.html",
    "riron": "http://localhost:8092/denken3-riron-wiki.html",
}
WAIT_MS = 3000  # Babel CDN ロード待機

CHECK_JS = """
(() => {
  if (typeof Babel === 'undefined') return { fatal: 'Babel not loaded (CDN取得失敗 or タイミング)' };
  const scripts = Array.from(document.querySelectorAll('script[type="text/babel"]'));
  if (!scripts.length) return { fatal: 'no <script type=text/babel> found' };
  const results = scripts.map((s, i) => {
    try {
      Babel.transform(s.textContent, { presets: ['react'] });
      return { idx: i, ok: true, len: s.textContent.length };
    } catch (e) {
      const code = s.textContent;
      const lines = code.split('\\n');
      const ln = e.loc ? e.loc.line : null;
      const snippet = ln
        ? lines.slice(Math.max(0, ln - 3), ln + 2)
            .map((l, j) => `${(Math.max(1, ln - 2) + j).toString().padStart(5)}: ${l}`)
            .join('\\n')
        : null;
      return {
        idx: i,
        ok: false,
        msg: e.message,
        line: ln,
        column: e.loc ? e.loc.column : null,
        snippet
      };
    }
  });
  return { count: scripts.length, results };
})()
"""

def run(target: str) -> int:
    url = FILE_ALIASES.get(target, target)
    print(f"=== babel_check: {url} ===")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context()
        page = ctx.new_page()
        try:
            page.goto(url, wait_until="domcontentloaded")
            page.wait_for_timeout(WAIT_MS)
            result = page.evaluate(CHECK_JS)
        finally:
            browser.close()

    if "fatal" in result:
        print(f"FATAL: {result['fatal']}")
        return 1

    errors = [r for r in result["results"] if not r.get("ok")]
    print(f"scripts: {result['count']} / errors: {len(errors)}")

    if not errors:
        print("OK: 全 babel スクリプト構文正常")
        return 0

    for r in errors:
        print(f"\n--- ERROR (script #{r['idx']}) ---")
        print(f"  msg : {r['msg']}")
        print(f"  loc : line {r['line']} col {r.get('column')}")
        if r.get("snippet"):
            print(f"  周辺コード:")
            for line in r["snippet"].split("\n"):
                print(f"    {line}")
    return 1


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "hoki"
    sys.exit(run(target))
