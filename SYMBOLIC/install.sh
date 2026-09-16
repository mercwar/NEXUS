#!/bin/bash
# ============================================================================
# FILE     : installer_build.sh
# COMPILER : GCC x86_64
# CONTEXT  : Compiles workspace deployment scripts under POSIX layout boundaries
# ============================================================================

echo "======================================================================="
echo "[MERCWAR SYSTEM INTERFACE] : RUNNING GCC COMPILATION PIPELINE"
echo "======================================================================="

# Verify target C file existence properties in workspace
if [ ! -f "installer.c" ]; then
    echo "[CRITICAL ERROR]: installer.c source node target missing."
    exit 1
fi

# Compile engine with high optimization flags
# Note: For strict native Linux environments, ensure code leverages symlink()
gcc -O3 -Wall -march=native installer.c -o installer.out

if [ $? -eq 0 ]; then
    echo "[SUCCESS]: Native GCC execution binary compiled as: installer.out"
    chmod +x installer.out
else
    echo "[FAILURE]: GCC compilation sequence returned non-zero exception codes."
    exit 1
fi
