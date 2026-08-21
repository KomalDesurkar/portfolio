@echo off
title Komal Desurkar Portfolio - Local Server
echo Starting Local Web Server...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
