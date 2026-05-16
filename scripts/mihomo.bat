@echo off
chcp 65001 >nul
rem 切换目录
cd /d "%~dp0"
title Mihomo Core 启停开关

set "MIHOMO_EXE=mihomo-windows-amd64.exe"
set "CONFIG_FILE=config.yaml"
set "PROXY_SERVER=127.0.0.1:7890"
set "PROXY_BYPASS=localhost;127.*;10.*;172.16.*;192.168.*;<local>"

tasklist | find /i "%MIHOMO_EXE%" >nul
if not errorlevel 1 goto StopProcess
goto StartProcess

:StopProcess
echo.
echo *** 发现 Mihomo 正在运行 ***
echo *** 正在停止进程...
taskkill /F /IM "%MIHOMO_EXE%" >nul 2>&1

echo *** 正在关闭系统代理...
call :DisableSystemProxy

echo.
echo *** Mihomo 已关闭 , 系统代理已恢复直连 ***

rem 修改黑框关闭时间说明:
rem 1. 修改 /t 后的数字可更改秒数
rem 2. 改为 timeout /t 0 为瞬间秒关
rem 3. 整行改为 pause 会永远不关直到按任意键
timeout /t 2 >nul
exit

:StartProcess
echo.
echo *** Mihomo 当前未运行 ***
echo.
echo ********************************************************
echo *** 请选择本次启动的模式 ***
echo *** 1. TUN 模式 * 全局接管
echo *** 2. 代理模式 * 仅接管浏览器
echo ********************************************************
echo.

choice /C 12 /N /M "请输入对应数字 * 1 或 2 * : "

if errorlevel 2 goto ModeProxy
if errorlevel 1 goto ModeTun

:ModeProxy
echo.
echo *** 正在修改配置 , 关闭 TUN 模式... ***
set "TUN_STATE=false"
call :ModifyTun

echo *** 正在开启 Windows 系统代理 %PROXY_SERVER% ... ***
call :EnableSystemProxy
goto RunMihomo

:ModeTun
echo.
echo *** 正在修改配置 , 启用 TUN 模式... ***
set "TUN_STATE=true"
call :ModifyTun

echo *** 正在确保系统代理已关闭... ***
call :DisableSystemProxy
goto RunMihomo

:RunMihomo
echo *** 正在后台启动 Mihomo... ***
powershell -Command "Start-Process -WindowStyle Hidden -FilePath '.\%MIHOMO_EXE%' -ArgumentList '-d .'"
echo.
echo *** Mihomo 已启动 , 节点缓存已加载 ***

rem 修改黑框关闭时间说明:
rem 1. 修改 /t 后的数字可更改秒数
rem 2. 改为 timeout /t 0 为瞬间秒关
rem 3. 整行改为 pause 会永远不关直到按任意键
timeout /t 2 >nul
exit

:ModifyTun
if not exist "%CONFIG_FILE%" (
    echo *** 未找到 %CONFIG_FILE% , 跳过修改 ***
    exit /b
)
set "PS_CMD=$file='%CONFIG_FILE%'; $enc=[System.Text.Encoding]::UTF8; $lines=[System.IO.File]::ReadAllLines($file, $enc); $inTun=$false; for($i=0; $i -lt $lines.Length; $i++){ if($lines[$i] -match '^tun:\s*$') { $inTun=$true } elseif($lines[$i] -match '^[a-zA-Z_-]+:') { $inTun=$false } if($inTun -and $lines[$i] -match '^\s+enable:\s*(true|false)') { $lines[$i] = $lines[$i] -replace 'enable:\s*(true|false)', ('enable: ' + '%TUN_STATE%'); break; } } $utf8NoBom = New-Object System.Text.UTF8Encoding $false; [System.IO.File]::WriteAllLines($file, $lines, $utf8NoBom);"
powershell -NoProfile -Command "%PS_CMD%"
exit /b

:EnableSystemProxy
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /t REG_SZ /d "%PROXY_SERVER%" /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyOverride /t REG_SZ /d "%PROXY_BYPASS%" /f >nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f >nul
powershell -NoProfile -Command "$q=[char]34; $t='[DllImport('+$q+'wininet.dll'+$q+')] public static extern bool InternetSetOption(int h, int o, int p, int d);'; $w=Add-Type -MemberDefinition $t -Name W -PassThru; $w::InternetSetOption(0,39,0,0) | Out-Null; $w::InternetSetOption(0,37,0,0) | Out-Null"
exit /b

:DisableSystemProxy
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f >nul
powershell -NoProfile -Command "$q=[char]34; $t='[DllImport('+$q+'wininet.dll'+$q+')] public static extern bool InternetSetOption(int h, int o, int p, int d);'; $w=Add-Type -MemberDefinition $t -Name W -PassThru; $w::InternetSetOption(0,39,0,0) | Out-Null; $w::InternetSetOption(0,37,0,0) | Out-Null"
exit /b
