"""
CLAUDE.md 整合性監査
CLAUDE.md と .claude/rules/*.md 内のファイルパス参照を抽出し、実在チェックする。
ゴーストファイル参照（書いてあるのに存在しないパス）を検出。

Usage:
  python claude_md_audit.py
"""
import io
import re
import sys
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

ROOT = Path(__file__).parent
TARGETS = [
    ROOT / "CLAUDE.md",
    *(ROOT / ".claude" / "rules").glob("*.md"),
]

# バッククォート内パス: .md/.py/.html/.json/.jsx/.ts/.txt または / で終わるディレクトリ
PATH_PATTERN = re.compile(
    r"`([A-Za-z0-9_./\-]+(?:\.(?:md|py|html|json|jsx|ts|txt|csv|yaml|yml))|[A-Za-z0-9_./\-]+/)`"
)

# 除外: 明らかにパスでないもの
EXCLUDE = {
    "y/n", "key/value", "true/false",
}


def extract_paths(file: Path):
    out = []
    for i, line in enumerate(file.read_text(encoding="utf-8").splitlines(), 1):
        for m in PATH_PATTERN.finditer(line):
            p = m.group(1)
            if p in EXCLUDE:
                continue
            if p.startswith("--"):
                continue
            # ディレクトリ区切りなしの裸ファイル名は汎用パターン（_template.md等）として除外
            if "/" not in p:
                continue
            # プレースホルダー（YYYY-MM-DD等）はスキップ
            if any(ph in p for ph in ("YYYY", "MM-DD", "<", ">", "*")):
                continue
            out.append((i, p, line.strip()))
    return out


def resolve(p: str) -> Path:
    # 絶対パス風はそのまま
    if p.startswith(("C:/", "C:\\", "/")):
        return Path(p)
    return ROOT / p


def main():
    total = 0
    broken = []
    for f in TARGETS:
        if not f.exists():
            continue
        for line_no, p, ctx in extract_paths(f):
            total += 1
            target = resolve(p)
            if not target.exists():
                broken.append((f.relative_to(ROOT), line_no, p, ctx))

    print(f"=== CLAUDE.md 整合性監査 ===")
    print(f"対象: {len(TARGETS)} ファイル / 抽出パス: {total}")
    print(f"破損参照: {len(broken)}")
    print()

    if not broken:
        print("OK - 全参照が実在")
        return 0

    print("--- 破損参照一覧 ---")
    for src, line_no, p, ctx in broken:
        print(f"[{src}:{line_no}] {p}")
        print(f"  > {ctx[:120]}")
        print()
    return 1


if __name__ == "__main__":
    sys.exit(main())
