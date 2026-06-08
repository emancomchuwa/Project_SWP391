@echo off
title VLance - Auto Start All Services
echo.
echo =======================================================
echo   VLance - Khoi dong he thong tu dong
echo =======================================================
echo.

REM 1. Giai phong Port 3000 (Frontend Vite)
echo [1/3] Dang kiem tra va giai phong port 3000 (Frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)
timeout /t 1 /nobreak >nul

REM 2. Giai phong Port 8080 (Backend Spring Boot)
echo.
echo [2/3] Dang kiem tra va giai phong port 8080 (Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a 2>nul
)
timeout /t 1 /nobreak >nul

REM 3. Khoi dong Backend
echo.
echo [3/3] Dang khoi dong Backend (Spring Boot)...
start "vLance Backend API" cmd.exe /c "cd /d %~dp0backend && run_backend.bat"
echo     Backend dang duoc khoi chay trong cua so moi...

REM 4. Doi backend khoi dong (5 giay)
echo.
echo Dang doi Backend khoi tao (5 giay)...
timeout /t 5 /nobreak >nul

REM 5. Khoi dong Frontend
echo.
echo Dang khoi dong Frontend (React Vite)...
start "vLance Frontend" cmd.exe /k "cd /d %~dp0frontend && npm.cmd run dev"
echo     Frontend dang duoc khoi chay trong cua so moi...

echo.
echo =======================================================
echo   HE THONG DA SAN SANG!
echo   - Frontend: http://localhost:3000/
echo   - Backend: http://localhost:8080/api/
echo =======================================================
echo.
echo Nhan phim bat ky de dong cua so nay...
pause >nul
