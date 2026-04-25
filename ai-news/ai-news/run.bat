@echo off
cd /d C:\Users\kfuru\.secretary\ai-news

echo ========================================
echo  AI News Collector
echo ========================================

if "%1"=="--dry-run" (
    echo [DRY-RUN] APIなしでフィルタ確認...
    py collector.py --dry-run
) else if "%1"=="--open" (
    echo ダッシュボードを起動...
    start py -m http.server 8096 --directory .
    timeout /t 2 /nobreak >nul
    start http://localhost:8096/dashboard.html
) else (
    echo 通常収集を実行...
    py collector.py
    echo.
    echo 完了! ログ: collector.log
)
pause
