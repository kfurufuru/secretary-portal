# auto-generated: 2026-04-30 | pattern: repeated_bash
# find/ls の繰り返しをPython一括処理に置き換える雛形
from pathlib import Path

BASE = Path("C:/Users/kfuru/.secretary")

def scan_directory(root=BASE, suffixes=None, max_depth=3):
    results = []
    for path in root.rglob("*"):
        depth = len(path.relative_to(root).parts)
        if depth > max_depth:
            continue
        if suffixes and path.suffix not in suffixes:
            continue
        results.append({
            "path": str(path),
            "is_dir": path.is_dir(),
            "size": path.stat().st_size if path.is_file() else 0,
        })
    return results

if __name__ == "__main__":
    import json
    print(json.dumps(scan_directory(), ensure_ascii=False, indent=2))
