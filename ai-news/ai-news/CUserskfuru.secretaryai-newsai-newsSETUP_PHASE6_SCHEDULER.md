# Phase 6 スケジューラ セットアップガイド

## 概要
Phase 6 RSS統合を月1回（毎月1日 01:00 JST）に自動実行するスケジューラです。

## セットアップ手順

### 1. 前提条件
```bash
✅ Python 3.10+
✅ APScheduler （`pip install apscheduler`で自動インストール済み）
✅ Phase 5 完了（sync_to_vault.py が feeds/ に記事を保存中）
```

### 2. 自動起動設定（推奨）

#### Windows スタートアップに登録

```cmd
# Windows ファイルエクスプローラで以下を開く
%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup

# ここに start_phase6_scheduler.bat をコピーまたはショートカットを作成
copy start_phase6_scheduler.bat "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\"
```

すると、Windows 起動時にスケジューラが自動起動します。

### 3. 手動起動（テスト用）

```bash
cd C:\Users\kfuru\.secretary\ai-news\ai-news
python run_phase6_scheduler.py
```

ログ出力：
```
2026-04-23 20:38:46,968 - INFO - Scheduler started. Next execution: 2026-05-01 16:00:00+09:00
```

### 4. ログの確認

```bash
# スケジューラログ（毎月実行時に記録）
cat phase6_scheduler.log

# Phase 6 統合スクリプトの個別ログ
cat ai-news-sync.log      (sync_to_vault.py)
cat link-generation.log    (link_generator.py)
cat archive-rotation.log   (archive_rotation.py)
```

## 仕様

### 実行スケジュール
- **実行日時**: 毎月1日 01:00 JST (UTC 16:00 前日)
- **実行内容**:
  1. `sync_to_vault.py` - Notion AI知識化ページ → ai-news/feeds/ に保存
  2. `link_generator.py` - feeds 内の関連記事を wiki-link で自動接続（ai_category + score≥3）
  3. `archive_rotation.py` - 90日超 + score<3 の記事を archive/YYYY-MM/ に移動

### タイムアウト
各スクリプトは5分以内に完了することを想定。超過時はログに記録され、スケジューラは継続動作。

### エラーハンドリング
- スクリプト実行エラー → `phase6_scheduler.log` に記録、メール通知なし（ローカル運用）
- スケジューラダウン → Windows 再起動時に自動復帰

## トラブルシューティング

### スケジューラが起動していない
```cmd
tasklist | find "python"  # python.exe があれば実行中
```

### ログが出力されない
- `phase6_scheduler.log` が存在しないか確認
- パーミッション: `ai-news/` フォルダへの書き込み権限を確認

### 実行タイミングがズレている
- システムの時刻を確認：`time /t`
- APScheduler は UTC で動作（ログの時刻と 9 時間差）

## 今後の拡張
- [ ] メール通知（実行成功/失敗）
- [ ] Slack 通知
- [ ] 実行統計ダッシュボード（実行日時・所要時間・スキップ数）
