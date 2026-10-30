@echo off
setlocal EnableExtensions EnableDelayedExpansion
title AVSS LITE - HACKER TEST LAB
color 0A
cls
echo.
echo ============================================
echo    AVSS LITE - SECURITY TEST LAB
echo    ENGINE: VITEST + V8 COVERAGE
echo ============================================
echo.
if not exist package.json goto missing
if not exist node_modules\.bin\vitest.cmd goto novitest
echo [OK] Project detected
echo [OK] Vitest detected
echo.
echo [SYSTEM] Initializing test environment...
echo [#.............] Initializing...
timeout /t 1 /nobreak >nul
echo [#####.........] Loading test engine...
timeout /t 1 /nobreak >nul
echo [##########....] Preparing test suite...
timeout /t 1 /nobreak >nul
echo [##############] Ready!
echo.
echo [RUN] Starting comprehensive test suite...
echo ============================================
call npm run test:coverage
set "TEST_EXIT=!ERRORLEVEL!"
echo.
echo ============================================
if "!TEST_EXIT!"=="0" (echo [PASS] Tests completed successfully.) else (echo [FAIL] Exit code !TEST_EXIT!)
echo ============================================
goto finish
:missing
echo [ERROR] package.json tidak ditemukan.
goto finish
:novitest
echo [ERROR] Vitest tidak ditemukan. Jalankan npm install.
goto finish
:finish
echo.
pause
endlocal
