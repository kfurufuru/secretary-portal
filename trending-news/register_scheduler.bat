@echo off
REM ================================================================
REM register_scheduler.bat — バズニュース 自動実行タスク登録
REM
REM 登録されるタスク:
REM   1. TrendingNews-Collector  : 毎日 07:00 に collector.py を実行
REM   2. TrendingNews-Digest     : 毎日 07:10 に digest_generator.py を実行
REM
REM 実行方法: このバッチファイルを「管理者として実行」してください
REM ================================================================

setlocal enabledelayedexpansion

REM ── Python のパスを検索 ──────────────────────────────────────
set PYTHONW=
where pythonw.exe >nul 2>&1
if %errorlevel%==0 (
    set PYTHONW=pythonw.exe
) else (
    for %%P in (
        "C:\Users\kfuru\AppData\Local\Programs\Python\Python312\pythonw.exe"
        "C:\Users\kfuru\AppData\Local\Programs\Python\Python311\pythonw.exe"
        "C:\Users\kfuru\AppData\Local\Programs\Python\Python310\pythonw.exe"
        "%LOCALAPPDATA%\Programs\Python\Python312\pythonw.exe"
    ) do (
        if exist %%P (
            set PYTHONW=%%~P
            goto :found_python
        )
    )
    echo [ERROR] pythonw.exe が見つかりません。Python を先にインストールしてください。
    pause
    exit /b 1
)
:found_python

REM ── スクリプトのディレクトリ（このバッチの場所）───────────────
set SCRIPT_DIR=%~dp0
REM 末尾の \ を除去
set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

set COLLECTOR=%SCRIPT_DIR%\collector.py
set DIGEST=%SCRIPT_DIR%\digest_generator.py

echo.
echo ================================================================
echo  バズニュース タスクスケジューラ登録
echo ================================================================
echo  Python    : %PYTHONW%
echo  Collector : %COLLECTOR%
echo  Digest    : %DIGEST%
echo ================================================================
echo.

REM ── 既存タスクを削除（再登録クリーン）──────────────────────────
schtasks /delete /tn "TrendingNews-Collector" /f >nul 2>&1
schtasks /delete /tn "TrendingNews-Digest"    /f >nul 2>&1

REM ── タスク1: 毎日 07:00 — RSS収集・スコアリング・HTML更新 ───────
schtasks /create ^
  /tn "TrendingNews-Collector" ^
  /tr "\"%PYTHONW%\" \"%COLLECTOR%\"" ^
  /sc daily ^
  /st 07:00 ^
  /ru "%USERNAME%" ^
  /rl HIGHEST ^
  /f
if %errorlevel% neq 0 (
    echo [ERROR] TrendingNews-Collector の登録に失敗しました
    pause
    exit /b 1
)
echo [OK] TrendingNews-Collector 登録完了 ^(毎日 07:00^)

REM ── タスク2: 毎日 07:10 — Haiku+Sonnet ダイジェスト生成 ─────────
schtasks /create ^
  /tn "TrendingNews-Digest" ^
  /tr "\"%PYTHONW%\" \"%DIGEST%\"" ^
  /sc daily ^
  /st 07:10 ^
  /ru "%USERNAME%" ^
  /rl HIGHEST ^
  /f
if %errorlevel% neq 0 (
    echo [ERROR] TrendingNews-Digest の登録に失敗しました
    pause
    exit /b 1
)
echo [OK] TrendingNews-Digest    登録完了 ^(毎日 07:10^)

echo.
echo ================================================================
echo  登録完了！毎朝 07:00 に自動でバズニュースが更新されます。
echo ================================================================
echo.
echo  確認コマンド:
echo    schtasks /query /tn "TrendingNews-Collector" /fo LIST
echo    schtasks /query /tn "TrendingNews-Digest"    /fo LIST
echo.
echo  手動実行:
echo    schtasks /run /tn "TrendingNews-Collector"
echo    schtasks /run /tn "TrendingNews-Digest"
echo.
echo  削除:
echo    schtasks /delete /tn "TrendingNews-Collector" /f
echo    schtasks /delete /tn "TrendingNews-Digest"    /f
echo.

pause
endlocal
