@echo off
rem Secretary link checker weekly runner
cd /d "%~dp0.."
py health-monitor\link_checker.py > health-monitor\last-run.log 2>&1
exit /b %errorlevel%
