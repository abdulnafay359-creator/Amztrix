@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0" || exit /b 1
title Amztrix local website
set "WEBSITE_PORT=5000"
set "WEBSITE_URL=http://127.0.0.1:%WEBSITE_PORT%/"
set "NEXT_CLI=node_modules\next\dist\bin\next"

where.exe node.exe >nul 2>&1
if errorlevel 1 set "PATH=%ProgramFiles%\nodejs;%LocalAppData%\Programs\nodejs;%PATH%"
node --version >nul 2>&1
if errorlevel 1 (
  echo Node.js is required. Install a current LTS release and try again.
  goto failed
)

powershell.exe -NoProfile -Command "try { $response=& curl.exe --silent --noproxy '*' --max-time 15 $env:WEBSITE_URL; if ($LASTEXITCODE -eq 0 -and $response -match 'AMZTRIX') { exit 0 } } catch {}; exit 1" >nul 2>&1
if not errorlevel 1 (
  echo AMZTRIX is already running at %WEBSITE_URL%
  if /i not "%~1"=="--no-open" start "" "%WEBSITE_URL%"
  exit /b 0
)

if exist "%NEXT_CLI%" goto dependencies_ready
echo Restoring dependencies from the project lockfile...
call npm ci
if errorlevel 1 goto failed

:dependencies_ready

echo Open %WEBSITE_URL%
echo Keep this window open while previewing. Press Ctrl+C to stop.
if /i not "%~1"=="--no-open" start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "$url=$env:WEBSITE_URL; for($i=0;$i -lt 60;$i++){ try { $null=Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 3; Start-Process $url; break } catch { Start-Sleep -Seconds 1 } }"
node "%NEXT_CLI%" dev --hostname 127.0.0.1 --port %WEBSITE_PORT% 
if errorlevel 1 goto failed
exit /b 0

:failed
echo Setup or startup failed. See the error above.
if /i not "%~1"=="--no-open" pause
exit /b 1
