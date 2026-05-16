#!/usr/bin/env python3
"""work-rules.md 同期スクリプト

SoT: C:\\Users\\kfuru\\denken-wiki\\.claude\\rules\\work-rules.md
Mirror: C:\\Users\\kfuru\\.secretary\\.claude\\rules\\work-rules.md

使い方:
    python scripts/sync-work-rules.py            # 差分チェック（dry-run）
    python scripts/sync-work-rules.py --apply    # SoT → Mirror に上書き

設計:
- SoT は denken-wiki 側（MkDocs本体・更新頻度高い想定）
- .secretary 側は常に SoT のミラー
- MD5 比較で差分検出 → 差分なし時はスキップ
- 逆方向（.secretary → denken-wiki）の同期はサポートしない
  → .secretary 側で先に編集してしまった場合は手動で denken-wiki に転記してから --apply
"""
import argparse
import hashlib
import shutil
import sys
from pathlib import Path

# Windows標準出力のUTF-8強制（feedback_encoding_grep 対策）
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

SOT = Path(r"C:\Users\kfuru\denken-wiki\.claude\rules\work-rules.md")
MIRROR = Path(r"C:\Users\kfuru\.secretary\.claude\rules\work-rules.md")


def md5(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description="work-rules.md SoT → Mirror 同期")
    parser.add_argument("--apply", action="store_true", help="差分があれば実際にコピー実行")
    args = parser.parse_args()

    if not SOT.exists():
        print(f"[ERROR] SoT not found: {SOT}", file=sys.stderr)
        return 2
    if not MIRROR.exists():
        print(f"[WARN] Mirror not found, will create: {MIRROR}")
        sot_hash = md5(SOT)
        mirror_hash = None
    else:
        sot_hash = md5(SOT)
        mirror_hash = md5(MIRROR)

    print(f"SoT    {SOT}  md5={sot_hash}")
    print(f"Mirror {MIRROR}  md5={mirror_hash}")

    if sot_hash == mirror_hash:
        print("[OK] 同期済み（差分なし）")
        return 0

    print("[DIFF] SoT と Mirror に差分あり")

    if not args.apply:
        print("[DRY-RUN] --apply を付けると SoT → Mirror を上書きします")
        return 1

    MIRROR.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SOT, MIRROR)
    print(f"[APPLIED] {SOT} → {MIRROR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
