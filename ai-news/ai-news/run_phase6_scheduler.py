#!/usr/bin/env python3
"""
Phase 6 スケジューラ
毎月1日 01:00 JST に以下を自動実行：
1. sync_to_vault.py - JSON → Markdown
2. link_generator.py - wiki-link 自動生成
3. archive_rotation.py - 90日超+低スコア記事を archive/ へ移動
"""

import subprocess
import sys
import logging
from pathlib import Path
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

# ロギング設定
log_file = Path(__file__).parent / "phase6_scheduler.log"
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file, encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def run_phase6():
    """Phase 6 統合実行"""
    base_dir = Path(__file__).parent
    scripts = [
        ('sync_to_vault.py', 'JSON → Markdown変換'),
        ('link_generator.py', 'wiki-link 自動生成'),
        ('archive_rotation.py', 'アーカイブ回転（90日超+スコア<3）')
    ]

    logger.info("=" * 60)
    logger.info("[Phase 6] 月1回統合実行開始")
    logger.info("=" * 60)

    failed = []
    for script_name, description in scripts:
        script_path = base_dir / script_name
        if not script_path.exists():
            logger.error(f"[ERROR] {script_name} not found")
            failed.append(script_name)
            continue

        logger.info(f"[Running] {script_name} ({description})")
        try:
            result = subprocess.run(
                [sys.executable, str(script_path)],
                cwd=base_dir,
                capture_output=True,
                text=True,
                timeout=300  # 5分タイムアウト
            )

            if result.returncode != 0:
                logger.error(f"[FAIL] {script_name} exited with code {result.returncode}")
                if result.stderr:
                    logger.error(f"  stderr: {result.stderr}")
                failed.append(script_name)
            else:
                logger.info(f"[OK] {script_name} completed")
                if result.stdout:
                    for line in result.stdout.strip().split('\n'):
                        logger.info(f"  > {line}")

        except subprocess.TimeoutExpired:
            logger.error(f"[TIMEOUT] {script_name} exceeded 5 minutes")
            failed.append(script_name)
        except Exception as e:
            logger.error(f"[ERROR] {script_name}: {e}")
            failed.append(script_name)

    # サマリー
    logger.info("=" * 60)
    if failed:
        logger.warning(f"[Phase 6] 部分失敗 - {len(failed)}件のスクリプトが失敗")
        for script in failed:
            logger.warning(f"  ✗ {script}")
    else:
        logger.info("[Phase 6] ✅ 統合実行完了（全スクリプト成功）")
    logger.info("=" * 60)

    return len(failed) == 0

def start_scheduler():
    """バックグラウンドスケジューラを開始"""
    scheduler = BackgroundScheduler()

    # 毎月1日 01:00 JST (UTC+9) に実行
    # APScheduler は UTC で動作するため、UTC+9 の場合は -8 時間で調整
    trigger = CronTrigger(day=1, hour=16, minute=0)  # 01:00 JST = 16:00 UTC（冬時間）

    scheduler.add_job(
        run_phase6,
        trigger=trigger,
        id='phase6_job',
        name='Phase 6 Monthly Integration',
        replace_existing=True,
        misfire_grace_time=300  # 5分以内なら遅延実行を許容
    )

    scheduler.start()
    logger.info(f"Scheduler started. Next execution: {scheduler.get_job('phase6_job').next_run_time}")

    return scheduler

if __name__ == '__main__':
    logger.info(f"Phase 6 Scheduler v1.0 - Started at {datetime.now().isoformat()}")

    try:
        scheduler = start_scheduler()
        logger.info("✅ Scheduler is running. Press Ctrl+C to stop.")

        # バックグラウンド実行（Ctrl+C で停止可能）
        while True:
            import time
            time.sleep(1)

    except KeyboardInterrupt:
        logger.info("Scheduler stopped by user")
        scheduler.shutdown()
    except Exception as e:
        logger.error(f"Fatal error: {e}", exc_info=True)
        sys.exit(1)
