/* ============================================================================
 * FILE     : installer.c
 * [AVIS-CMT-DEPLOY]: MERCWAR EV.4 SYMBOLIC IMPLANT STRUCTURAL LINKER
 * COMPILER : MSVC Win64 (cl.exe)
 * CL_BUILD : cl.exe installer.c /Fe:installer.exe /link shell32.lib
 * ARCH      : HP EliteDesk 800 G4 SFF (Windows 11 Win64)
 * IDENTITY  : ADMINISTRATIVE SYMBOLIC PATH LINK INTERCEPT ENGINE
 * ============================================================================ */

#include <windows.h>
#include <shellapi.h>
#include <stdio.h>
#include <direct.h>

#define TARGET_FLAG_META 0x4D455441

/* AVIS-COMPILER-INSTRUCTION: Ensure execution context owns administrative tokens */
BOOL IsRunningAsAdministrator() {
    BOOL isAdmin = FALSE;
    PSID administratorsGroup = NULL;
    SID_IDENTIFIER_AUTHORITY ntAuthority = SECURITY_NT_AUTHORITY;

    if (AllocateAndInitializeSid(&ntAuthority, 2, SECURITY_BUILTIN_DOMAIN_RID,
                                 DOMAIN_ALIAS_RID_ADMINS, 0, 0, 0, 0, 0, 0,
                                 &administratorsGroup)) {
        CheckTokenMembership(NULL, administratorsGroup, &isAdmin);
        FreeSid(administratorsGroup);
    }
    return isAdmin;
}

int main(int argc, char* argv[]) {
    printf("=======================================================================\n");
    printf("[MERCWAR SYSTEM INTERFACE] : INITIALIZING C-CORE NEURAL ROOT INSTALLER\n");
    printf("=======================================================================\n\n");

    /* 1. Privilege Verification Ring Check */
    if (!IsRunningAsAdministrator()) {
        printf("[CRITICAL ERROR]: Administrative privilege elevation required.\n");
        printf("Relaunching system installer context wrapper under runas token...\n\n");
        
        char szPath[MAX_PATH];
        GetModuleFileNameA(NULL, szPath, MAX_PATH);
        
        // Elevate process privileges cleanly via native ShellExecute API
        SHELLEXECUTEINFOA sei = { sizeof(sei) };
        sei.lpVerb = "runas";
        sei.lpFile = szPath;
        sei.hwnd = NULL;
        sei.nShow = SW_NORMAL;

        if (!ShellExecuteExA(&sei)) {
            printf("[FAILURE]: Privilege elevation rejected by host OS.\n");
            system("pause");
            return 1;
        }
        return 0;
    }

    /* 2. Define Explicit Directory Target Paths */
    const char* targetRoot     = "C:\\MercwarAI";
    const char* sourcePath     = "C:\\MercwarAI\\NEXUS\\implant";
    const char* destinationLink = "C:\\MercwarAI\\Sentinel\\implant";

    printf("[SYSTEM_CHECK]: Verifying target infrastructure source vectors...\n");
    
    // Ensure base directory architecture exists
    if (_access(targetRoot, 0) != 0) {
        _mkdir(targetRoot);
    }
    if (_access(sourcePath, 0) != 0) {
        printf("[WARNING]: Source directory missing. Generating layout node target...\n");
        _mkdir(sourcePath);
    }

    /* 3. Flush Prior Broken Symlink Paths Safely */
    DWORD attributes = GetFileAttributesA(destinationLink);
    if (attributes != INVALID_FILE_ATTRIBUTES) {
        printf("[SYSTEM_CLEAN]: Purging obsolete layout path structures...\n");
        if (attributes & FILE_ATTRIBUTE_REPARSE_POINT) {
            RemoveDirectoryA(destinationLink);
        } else {
            // Delete standard folder configuration blocks if blocking path tracking
            RemoveDirectoryA(destinationLink);
        }
    }

    printf("\n=======================================================================\n");
    printf("[DEPLOYMENT] : EXECUTING DIRECT SYMBOLIC LINK INSTALLATION LOOP\n");
    printf("=======================================================================\n\n");

    /* 4. Invoke Native Low-Level Win32 Directory Symbolic Link Creation Gate */
    /* SYMBOLIC_LINK_FLAG_DIRECTORY flag ensures 0 byte physical storage allocation overhead */
    if (CreateSymbolicLinkA(destinationLink, sourcePath, SYMBOLIC_LINK_FLAG_DIRECTORY)) {
        printf("[SUCCESS]: Symbolic vector loopback established successfully.\n");
        printf("[STATUS] : VALIDATION_FLAG=0x%08X (\"META\") Active.\n", TARGET_FLAG_META);
        printf("[STATUS] : Storage Overhead: 0 Bytes allocated.\n\n");
    } else {
        DWORD error = GetLastError();
        printf("[FAILURE]: Link allocation aborted. Win32 Exception Code: 0x%08lX\n", error);
        printf("Verify directory creation rules are enabled inside Windows 11 Developer settings.\n\n");
        system("pause");
        return 1;
    }

    printf("=======================================================================\n");
    printf("[COMPILATION] : BOOTSTRAPPING LOCAL IMPLANT HARDWARE DAEMONS\n");
    printf("=======================================================================\n\n");

    /* 5. Trigger Native Background MSVC Compiler Invocation Subprocess */
    if (_chdir(destinationLink) == 0) {
        printf("[COMPILER_CALL]: Invoking MSVC build matrix inside linked workspace...\n");
        
        STARTUPINFOA si;
        PROCESS_INFORMATION pi;
        ZeroMemory(&si, sizeof(si));
        si.cb = sizeof(si);
        ZeroMemory(&pi, sizeof(pi));

        char cmdLine[] = "cmd.exe /c cl.exe main.c avis_implant_core.c /Fe:mercwar_implant.exe";

        if (CreateProcessA(NULL, cmdLine, NULL, NULL, FALSE, CREATE_NO_WINDOW, NULL, NULL, &si, &pi)) {
            WaitForSingleObject(pi.hProcess, INFINITE);
            
            DWORD exitCode;
            GetExitCodeProcess(pi.hProcess, &exitCode);
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);

            if (_access("mercwar_implant.exe", 0) == 0) {
                printf("[SUCCESS]: Native implant binary compiled successfully.\n");
            } else {
                printf("[NOTICE]: cl.exe toolchain unavailable in immediate path environment.\n");
                printf("Component source code left active for emulated AI parsing profiles.\n");
            }
        } else {
            printf("[ERROR]: Failed to initialize compiler execution subprocess string.\n");
        }
    } else {
        printf("[ERROR]: Target link path tracking navigation failure.\n");
    }

    printf("\n[SYSTEM_READY]: Matrix deployment finalized. Core channels open.\n\n");
    system("pause");
    return 0;
}
