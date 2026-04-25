@echo off
REM Phase 6 スケジューラ起動スクリプト
REM Windows スタートアップフォルダに配置することで、システム起動時に自動実行

cd /d "%~dp0"

REM スケジューラがすでに実行中の場合はスキップ
tasklist /FI "WINDOWTITLE eq Phase 6*" 2>NUL | find /I /N "python.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Phase 6 Scheduler already running
    goto :EOF
)

REM バックグラウンドで起動（最小化されたウィンドウ）
start "Phase 6 Scheduler" /MIN python run_phase6_scheduler.py

echo Phase 6 Scheduler started (background)
timeout /t 3 /nobreak
