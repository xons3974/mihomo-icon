@echo off
chcp 65001 >nul
:: 切换到脚本所在目录（防止以管理员运行时找不到节点缓存）
cd /d "%~dp0"
title Mihomo Core 启停开关

set "MIHOMO_EXE=mihomo-windows-amd64.exe"

:: 检测进程是否在运行
tasklist | find /i "%MIHOMO_EXE%" >nul
if not errorlevel 1 (
    echo.
    echo [状态] 发现 Mihomo 正在后台运行中。
    echo [操作] 正在停止 Mihomo...
    taskkill /F /IM "%MIHOMO_EXE%" >nul 2>&1
    echo.
    echo [成功] Mihomo 已关闭！
    :: 延迟 2 秒后自动退出黑框
    timeout /t 2 >nul
    exit
) else (
    echo.
    echo [状态] Mihomo 当前未运行。
    echo [操作] 正在后台启动 Mihomo...
    powershell -Command "Start-Process -WindowStyle Hidden -FilePath '.\%MIHOMO_EXE%' -ArgumentList '-d .'"
    echo.
    echo [成功] Mihomo 已启动！(节点缓存已加载)
    :: 延迟 2 秒后自动退出黑框
    timeout /t 2 >nul
    exit
)