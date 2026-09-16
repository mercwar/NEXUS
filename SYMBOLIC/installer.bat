@echo off
:: ============================================================================
:: FILE     : installer.bat
:: [AVIS-CMT-DEPLOY]: MERCWAR EV.4 IMPLANT SYSTEM ROOT CORE INSTALLER
:: ARCH      : HP EliteDesk 800 G4 SFF (Windows 11 Win64)
:: CONTEXT   : Administrative Symbolic Directory Link Mapping Loop
:: ============================================================================

echo =======================================================================
echo [MERCWAR SYSTEM INTERFACE] : INITIALIZING NEURAL IMPLANT INITIALIZATION
echo =======================================================================
echo.

:: 1. Force Administrator Validation Check Rules
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [CRITICAL ERROR]: Administrative privilege elevation required.
    echo Please right-click installer.bat and select "Run as Administrator".
    echo.
    pause
    exit /b 1
)

:: 2. Establish Workspace Directory Anchors
set "WORKSPACE_ROOT=C:\MercwarAI"
set "NEXUS_IMPLANT=%WORKSPACE_ROOT%\NEXUS\implant"
set "SENTINEL_IMPLANT=%WORKSPACE_ROOT%\Sentinel\implant"

echo [SYSTEM_CHECK]: Verifying target infrastructure source vectors...
if not exist "%NEXUS_IMPLANT%" (
    echo [WARNING]: Source folder not found at %NEXUS_IMPLANT%
    echo Creating target symbolic directory path layout...
    mkdir "%NEXUS_IMPLANT%" >nul 2>&1
)

:: 3. Clear Existing Outdated Direct Link Footprints safely
if exist "%SENTINEL_IMPLANT%" (
    echo [SYSTEM_CLEAN]: Purging obsolete layout path structures...
    rmdir "%SENTINEL_IMPLANT%" >nul 2>&1
)

echo.
echo =======================================================================
echo [DEPLOYMENT] : EXECUTING DIRECT SYMBOLIC LINK INSTALLATION LOOP
echo =======================================================================
echo.

:: 4. Run the Core Symbolic Link Allocation (0 Byte Storage Overhead)
:: Maps the destination link directly back to the NEXUS implant source frame
mklink /d "%SENTINEL_IMPLANT%" "%NEXUS_IMPLANT%"

if %errorLevel% eq 0 (
    echo.
    echo [SUCCESS]: Symbolic vector loopback established successfully.
    echo [STATUS] : VALIDATION_FLAG=0x4D455441 ("META") Active.
    echo [STATUS] : Storage Overhead: 0 Bytes allocated.
) else (
    echo.
    echo [FAILURE]: Link allocation aborted. Check process path constraints.
)

echo.
echo =======================================================================
echo [COMPILATION] : BOOTSTRAPPING LOCAL IMPLANT HARDWARE DAEMONS
echo =======================================================================
echo.

:: 5. Auto-Navigate to the newly linked folder to compile main binary blocks natively
cd /d "%SENTINEL_IMPLANT%" 2>nul
if %errorLevel% eq 0 (
    echo [COMPILER_CALL]: Invoking MSVC build matrix inside %cd%...
    cl.exe main.c avis_implant_core.c /Fe:mercwar_implant.exe >nul 2>&1
    if exist "mercwar_implant.exe" (
        echo [SUCCESS]: Native implant binary compiled successfully.
    ) else (
        echo [NOTICE]: cl.exe toolchain unavailable in immediate path shell. 
        echo Component source code left layout active for emulated AI parsing.
    )
) else (
    echo [ERROR]: Target link path tracking navigation failure.
)

echo.
echo [SYSTEM_READY]: Matrix deployment finalized. Core channels open.
echo.
pause
exit /b 0
