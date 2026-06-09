@echo off
setlocal enabledelayedexpansion
set REPO=%~dp0
cd /d "%REPO%"

echo === PROMPT ASSET DEMO PIPELINE CI GATES ===
echo.

rem --- Gate 1: TypeScript Build ---
echo --- Gate 1: TypeScript Build ---
call npm run build 2>&1
if %ERRORLEVEL% neq 0 (
    echo FAIL: TypeScript compilation failed
    exit /b 1
)
echo PASS: TypeScript compiles
echo.

rem --- Gate 2: Tests ---
echo --- Gate 2: Tests ---
call npm test 2>&1
if %ERRORLEVEL% neq 0 (
    echo FAIL: Tests failed
    exit /b 1
)
echo PASS: All tests pass
echo.

rem --- Gate 3: Compiled Output ---
echo --- Gate 3: Compiled Output ---
if not exist "dist\cli.js" (
    echo FAIL: dist/cli.js missing
    exit /b 1
)
echo PASS: dist/cli.js present
echo.

rem --- Gate 4: CLI Smoke Test ---
echo --- Gate 4: CLI Smoke Test ---
node dist\cli.js --help >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo FAIL: CLI does not respond
    exit /b 1
)
echo PASS: CLI responds
echo.

echo === ALL GATES PASSED ===
exit /b 0
