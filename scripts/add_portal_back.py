#!/usr/bin/env python3
"""
add_portal_back.py

Inject a "← Portal" navigation link into HTML pages under .secretary/.
Called by PostToolUse hook on Write|Edit of *.html files in .secretary/.

Idempotent. Skips when:
- file is not under .secretary/
- file is not *.html
- file is index.html at the root
- file already contains the "portal-back" class
- file has no <header> tag

Input: file path via argv[1] OR JSON on stdin
       ({"tool_input":{"file_path":...}} / {"tool_response":{"filePath":...}})

Behavior:
- Computes correct ../index.html relative path based on directory depth
- Appends a CSS rule for .portal-back to the last <style> block (or injects a new one)
- Inserts <a class="portal-back" ...> right after the <header> opening tag
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

SECRETARY_ROOT = Path(__file__).resolve().parent.parent  # scripts/.. = .secretary/

CSS_BLOCK = (
    "header{position:relative}"
    ".portal-back{position:absolute;top:12px;right:16px;"
    "font:11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;"
    "padding:4px 10px;border:1px solid rgba(255,255,255,0.15);border-radius:6px;"
    "background:rgba(255,255,255,0.03);color:#8a94b0;text-decoration:none;"
    "transition:border-color .15s,color .15s}"
    ".portal-back:hover{color:#fff;border-color:#ffd54f}"
)


def _resolve_path() -> Path | None:
    if len(sys.argv) > 1 and sys.argv[1]:
        try:
            return Path(sys.argv[1]).resolve()
        except OSError:
            return None
    # Try stdin JSON (hook payload)
    try:
        if sys.stdin.isatty():
            return None
        raw = sys.stdin.read()
        if not raw.strip():
            return None
        data = json.loads(raw)
    except (json.JSONDecodeError, OSError):
        return None
    candidate = None
    tr = data.get("tool_response") or {}
    if isinstance(tr, dict):
        candidate = tr.get("filePath") or tr.get("file_path")
    if not candidate:
        ti = data.get("tool_input") or {}
        if isinstance(ti, dict):
            candidate = ti.get("file_path") or ti.get("filePath")
    if not candidate:
        return None
    try:
        return Path(candidate).resolve()
    except OSError:
        return None


def _should_process(fp: Path) -> tuple[bool, str]:
    if fp.suffix.lower() != ".html":
        return False, "not .html"
    try:
        rel = fp.relative_to(SECRETARY_ROOT)
    except ValueError:
        return False, "outside .secretary/"
    if fp.name.lower() == "index.html" and len(rel.parts) == 1:
        return False, "is root index.html"
    if not fp.exists():
        return False, "missing"
    return True, ""


def _inject(content: str, rel_index: str) -> str | None:
    # Look for the class attribute specifically, not the literal string in body text
    if re.search(r'class\s*=\s*"[^"]*\bportal-back\b', content):
        return None  # already done
    if not re.search(r"<header[^>]*>", content, re.IGNORECASE):
        return None  # no <header>, can't inject

    # 1) Inject CSS into the last <style> block, or create one before </head>
    style_close_iter = list(re.finditer(r"</style>", content, re.IGNORECASE))
    if style_close_iter:
        last = style_close_iter[-1]
        content = content[: last.start()] + CSS_BLOCK + "\n" + content[last.start() :]
    else:
        head_close = re.search(r"</head>", content, re.IGNORECASE)
        if not head_close:
            return None
        block = f"<style>{CSS_BLOCK}</style>\n"
        content = content[: head_close.start()] + block + content[head_close.start() :]

    # 2) Insert anchor right after the <header ...> opening tag
    header_open = re.search(r"<header[^>]*>", content, re.IGNORECASE)
    if not header_open:
        return None
    anchor = f'<a class="portal-back" href="{rel_index}">← Portal</a>'
    return content[: header_open.end()] + anchor + content[header_open.end() :]


def main() -> int:
    fp = _resolve_path()
    if not fp:
        return 0
    ok, _reason = _should_process(fp)
    if not ok:
        return 0

    try:
        original = fp.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return 0

    rel = fp.relative_to(SECRETARY_ROOT)
    depth = len(rel.parts) - 1
    rel_index = "../" * depth + "index.html"

    new = _inject(original, rel_index)
    if new is None or new == original:
        return 0

    try:
        fp.write_text(new, encoding="utf-8")
    except OSError:
        return 0

    sys.stderr.write(f"[portal-back] linked {rel} -> {rel_index}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
