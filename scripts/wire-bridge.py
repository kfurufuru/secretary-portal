"""
wire-bridge.py
business-skills/ 配下の全 *.html に selfcheck-bridge.js を冪等挿入する。

挿入位置: </head> 直前
挿入内容:
  <script src="skill-tracker.js" defer></script>   ← 未挿入の場合のみ
  <script src="selfcheck-bridge.js" defer></script> ← 未挿入の場合のみ

Usage:
  py scripts/wire-bridge.py            # 本実行
  py scripts/wire-bridge.py --dry-run  # 対象確認のみ
"""

import sys
import os
import glob

# --- 設定 ---
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'business-skills')
TRACKER_TAG = '<script src="skill-tracker.js" defer></script>'
BRIDGE_TAG  = '<script src="selfcheck-bridge.js" defer></script>'
INSERT_MARKER = '</head>'

dry_run = '--dry-run' in sys.argv

html_files = sorted(glob.glob(os.path.join(BASE_DIR, '*.html')))

# type="checkbox" を含むファイルのみ対象
target_files = []
for f in html_files:
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            if 'type="checkbox"' in fh.read():
                target_files.append(f)
    except Exception as e:
        print(f'[WARN] 読み込み失敗 (スキップ): {os.path.basename(f)} — {e}')

print(f'対象ファイル数: {len(target_files)}')
if dry_run:
    print('[DRY-RUN] 以下のファイルに挿入予定:')
    for f in target_files:
        print(f'  {os.path.basename(f)}')
    sys.exit(0)

inserted = 0
skipped  = 0
failed   = []

for f in target_files:
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            content = fh.read()

        # 冪等チェック: bridge が既に挿入済みならスキップ
        if BRIDGE_TAG in content:
            skipped += 1
            continue

        # </head> の位置を探す
        idx = content.find(INSERT_MARKER)
        if idx == -1:
            print(f'[WARN] </head> が見つかりません (スキップ): {os.path.basename(f)}')
            failed.append(os.path.basename(f))
            continue

        # 挿入する行を組み立てる
        lines_to_insert = []
        if TRACKER_TAG not in content:
            lines_to_insert.append(TRACKER_TAG)
        lines_to_insert.append(BRIDGE_TAG)

        insert_text = '\n'.join(lines_to_insert) + '\n'
        new_content = content[:idx] + insert_text + content[idx:]

        with open(f, 'w', encoding='utf-8', newline='') as fh:
            fh.write(new_content)

        inserted += 1
        print(f'[OK] {os.path.basename(f)}')

    except Exception as e:
        print(f'[ERROR] {os.path.basename(f)} — {e}')
        failed.append(os.path.basename(f))

print()
print(f'--- 完了 ---')
print(f'挿入: {inserted} / スキップ(挿入済み): {skipped} / 失敗: {len(failed)}')
if failed:
    print('失敗ファイル:')
    for f in failed:
        print(f'  {f}')
