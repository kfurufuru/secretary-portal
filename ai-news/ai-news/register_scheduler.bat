@echo off
REM Phase 6 月1回実行タスクを登録するバッチファイル

set TASK_NAME=Phase6_RSS_Integration
set SCRIPT_PATH=C:\Users\kfuru\.secretary\ai-news\ai-news\run_phase6_integration.py

REM 既存タスク削除
schtasks /delete /tn "%TASK_NAME%" /f >nul 2>&1

REM 新規タスク作成：毎月1日 01:00 に実行
schtasks /create /tn "%TASK_NAME%" /tr "python \"%SCRIPT_PATH%\"" /sc monthly /d 1 /st 01:00 /ru SYSTEM /f

if %ERRORLEVEL% equ 0 (
    echo.
    echo ============================================
    echo [OK] Task Scheduler task registered
    echo ============================================
    echo Task Name: %TASK_NAME%
    echo Schedule: 1st day of every month at 01:00 AM
    echo Script: run_phase6_integration.py
    echo.
    echo Verify with:
    echo   schtasks /query /tn "%TASK_NAME%" /v
    echo.
) else (
    echo [ERROR] Task registration failed (exit code: %ERRORLEVEL%)
)

pause
