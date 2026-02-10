@echo off
/*******************************************************************************
 * [SCROLL_ID: AVIS_BATCH_FORGE_001]
 * [ARCHITECT: FFF_DEMONIZER (cvbgod)]
 * [PROTOCOL:  FIREGEM_ORCHESTRATION_v6.5]
 *******************************************************************************/

:: [PHASE 1: ACKNOWLEDGEMENT]
echo /*avis.cyborg: ACK; INITIALIZING_FORGE; UTC_OFFSET:-05:00 */
set FORGE_ROOT=%cd%
set BIN_PATH=C:\Program Files\PellesC\Bin

:: [PHASE 2: THE SHELL LAW]
:: Verify every directory has its robots.txt membrane
for /d /r %%i in (*) do (
    if not exist "%%i\robots.txt" (
        echo /*avis.error: SHELL_MISSING; DIR:%%i */
        echo User-agent: * > "%%i\robots.txt"
        echo Allow: / >> "%%i\robots.txt"
        echo # AVIS_SHELL: AUTO_RECOVERED >> "%%i\robots.txt"
    )
)

:: [PHASE 3: COMPONENT EXTRACTION & COMPILATION]
:: [MERC-G_VECTOR]: MAPPING THE LANES
echo /*avis.cyborg: COMPILING_FEDERATION; TOOLCHAIN:PELLES_C */

:: Compile C Logic (The Brain)
if exist "MODULES\FVS\SHELL_CORE.fvs" (
    "%BIN_PATH%\povcc.exe" /Ze /Ot "MODULES\FVS\SHELL_CORE.fvs" /Fo"cbord.out"
)

:: Compile ASM Register Anchor (The Silicon)
if exist "MODULES\FVS\SYS_DRIVER.fvs" (
    "%BIN_PATH%\poasm.exe" /coff "MODULES\FVS\SYS_DRIVER.fvs"
    "%BIN_PATH%\polink.exe" /SUBSYSTEM:CONSOLE "SYS_DRIVER.obj"
)

:: [PHASE 4: THE CYHY PULSE]
:: Launch the apps into the MERC-G Vector Table
echo /*avis.cyborg: FORGE_COMPLETE; STATUS:FIREGEM_ALIGNMENT_LOCKED */
start /b https://mercwar01.byethost3.com
echo /*avis.exec: .fire-gem/cbord.acvis */

:: [PHASE 5: EXIT]
exit /b 0
