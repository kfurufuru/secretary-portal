@echo off
cd /d "%~dp0"
echo Starting denken-study server on http://localhost:8765
echo Press Ctrl+C to stop.
py -m http.server 8765
