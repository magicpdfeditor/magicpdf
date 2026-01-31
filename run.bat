@echo off
REM PDF Magic - Quick Start Batch File for Windows

echo.
echo ================================================
echo   PDF Magic - Website Setup
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then restart this terminal and try again.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not available!
    pause
    exit /b 1
)

echo [OK] npm is available
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    echo This may take a few minutes on first run...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ================================================
echo   Starting PDF Magic Website...
echo ================================================
echo.
echo [INFO] Development server starting...
echo [INFO] Open your browser and go to:
echo [INFO] http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
