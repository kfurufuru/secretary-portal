#!/usr/bin/env python3
"""
Phase 6 統合実行スクリプト
- sync_to_vault.py: JSON → Markdown 変換
- link_generator.py: wiki-link 自動生成
- archive_rotation.py: 90日超+低スコア記事を archive/ へ移動
"""
import subprocess
import sys
from pathlib import Path

def run_phase6():
    base_dir = Path(__file__).parent
    scripts = [
        'sync_to_vault.py',
        'link_generator.py', 
        'archive_rotation.py'
    ]
    
    print('[Phase 6] 月1回統合実行開始...')
    for script in scripts:
        script_path = base_dir / script
        if not script_path.exists():
            print(f'[ERROR] {script} not found')
            sys.exit(1)
        
        print(f'[Running] {script}...')
        result = subprocess.run([sys.executable, str(script_path)], cwd=base_dir)
        if result.returncode != 0:
            print(f'[ERROR] {script} failed with code {result.returncode}')
            sys.exit(1)
    
    print('[Phase 6] ✅ 統合実行完了')

if __name__ == '__main__':
    run_phase6()
