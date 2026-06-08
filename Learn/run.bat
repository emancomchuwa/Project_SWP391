@echo off
echo ==============================================
echo       KHOI DONG DU AN LEARN (STUDENT)
echo ==============================================
echo.

echo [1/2] Dang khoi dong Backend (Spring Boot)...
start "Learn Backend" cmd /k "cd /d "%~dp0backend" && mvn spring-boot:run"

echo [2/2] Dang khoi dong Frontend (React Vite)...
start "Learn Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Da mo 2 cua so moi de chay Backend va Frontend!
echo Vui long doi khoang 10-15 giay de he thong khoi dong hoan tat.
echo.
pause
