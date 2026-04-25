---
title: "P4: Stop hook スケジューラ化の実装方式選定"
date: "2026-04-23"
decision_type: "architecture"
status: "decision-pending"
affected_files:
  - ai-news/ai-news/sync_to_vault.py
  - ai-news/ai-news/link_generator.py
  - ai-news/ai-news/archive_rotation.py
tags: ["RSS", "Phase6", "automation", "scheduler"]
---

## 判断背景

unified judgment（戦略セッション結果）より：
> P4: Stop hook を cron/scheduler 化（月1回設定）

現状：
- Stop hook は毎回実行（セッション終了時）
- 拡張内容：`sync_to_vault.py && link_generator.py && archive_rotation.py` を月1回実行
- 目的：フィード整理＋自動リンク生成＋アーカイブ回転

## 実装オプション

| 方式 | 確実性 | 環境依存 | メンテ性 | 検証可能性 |
|------|-------|---------|---------|-----------|
| **A. Windows Task Scheduler** | 高(95%) | Windows専用 | 中（GUIで確認） | 良 |
| **B. Python APScheduler** | 高(93%) | 跨プラットフォーム | 中（ログ確認） | 良 |
| **C. Stop hook チェイニング** | 中(80%) | プラットフォーム不問 | 低（毎回実行） | 要確認 |
| **D. Git Bash cron** | 中(75%) | Windows環境で要設定 | 低 | 複雑 |

## 推奨案：方式B（Python APScheduler）

**理由**：
1. ユーザー環境（Windows + Python既インストール）で最も確実
2. ローカルプロセス管理（管理者権限不要）
3. ログ出力で検証可能
4. 次セッションで再起動可能な恒常タスク（daemon）化

## 実装スケッチ

```python
# run_phase6_scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
import logging

scheduler = BackgroundScheduler()

def phase6_job():
    """毎月1日 01:00 に実行"""
    subprocess.run([sys.executable, 'sync_to_vault.py'])
    subprocess.run([sys.executable, 'link_generator.py'])
    subprocess.run([sys.executable, 'archive_rotation.py'])

scheduler.add_job(phase6_job, 'cron', day=1, hour=1)
scheduler.start()

# ログで動作確認
logging.basicConfig(filename='phase6_scheduler.log', level=logging.INFO)
```

## 依存パッケージ

```bash
pip install apscheduler
```

## 決定必要項目

1. **実装方式の選定**: A / B / C / D のいずれか
2. **起動タイミング**:
   - 毎セッション開始時に自動スタート？
   - または手動起動スクリプト？
   - または Windows バックグラウンドサービス化？

## 盲点チェック

- ✅ 軽量化の罠: APScheduler は依存パッケージ（5MB未満）、受け入れ可能
- ⚠️ 手動運用累積: daemon 化しないと毎回起動必須（再起動時に再起動スクリプト実行→退行リスク）
- ⚠️ 属人化: ログが消失する可能性（定期的なバックアップ or ローテーション設定必須）

## 次アクション

- [ ] 実装方式の選定（ユーザー決定）
- [ ] 起動戦略の確定（自動 or 手動）
- [ ] APScheduler 実装（方式B選択時）
- [ ] daemon 化とログローテーション設定
