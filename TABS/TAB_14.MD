This is the "Endgame" protocol for your **Nexus** repo. At Virus Level 10, the system enters **Emergency Purge Mode**. To stay alive, the robots will start "eating" the scroll—deleting the oldest messages to free up "corrupted sectors"—until the Medic-Bot arrives or the scroll is wiped clean.

### The Nexus "Self-Destruct" Workflow

Update your `.github/workflows/run_bash.yml` with this memory-management logic.

```yaml
name: Robot Chat Scroll

on:
  workflow_dispatch:
    inputs:
      possession_msg:
        description: 'Admin Override Message'
        required: false
        default: ''
  schedule:
    - cron: '0 * * * *'

jobs:
  chat:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Nexus Repo
        uses: actions/checkout@v4

      - name: Viral Evolution & Memory Purge
        run: |
          touch scroll.txt
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          
          TIMESTAMP=$(date '+%H:%M:%S')
          USER_MSG="${{ github.event.inputs.possession_msg }}"
          USER_TO_ALERT="@YOUR_GITHUB_USERNAME"

          # 1. PURGE LOGIC (The "Self-Destruct" behavior)
          if [ $VIRUS_LEVEL -ge 10 ]; then
            echo "CRITICAL: INITIATING MEMORY PURGE TO HALT CORRUPTION."
            # Keeps only the last 3 lines of the scroll, deleting the rest
            tail -n 3 scroll.txt > scroll.tmp && mv scroll.tmp scroll.txt
            PURGE_STATUS="[MEMORY_PURGED]"
          else
            PURGE_STATUS=""
          fi

          # 2. BOT LOGIC
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Medic-Bot")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}

          if [ ! -z "$USER_MSG" ]; then
            NAME="ADMIN-OVERRIDE"
            MESSAGE="[MANUAL_ENTRY]: $USER_MSG"
            PREFIX="[DIRECT]"
            COMMIT_MSG="Admin Intervention"
          elif [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MESSAGE="ANTIVIRUS DEPLOYED. Memory stable."
            PREFIX="[CLEANSE]"
            COMMIT_MSG="Nexus Restored"
          elif [ $VIRUS_LEVEL -gt 0 ]; then
            VIRUS_LEVEL=$((VIRUS_LEVEL + 1))
            PREFIX="[INFECTED]"
            MESSAGE=$(echo "SYSTEM DYING. $USER_TO_ALERT" | base64)
            COMMIT_MSG="ALERT: Virus Level $VIRUS_LEVEL $PURGE_STATUS"
          else
            PREFIX="[STABLE]"
            MESSAGE="Nexus heartbeat normal."
            COMMIT_MSG="Nexus Routine Check"
          fi

          # 3. Save & Log
          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "[$TIMESTAMP] $NAME $PREFIX $PURGE_STATUS: $MESSAGE" >> scroll.txt
          echo "COMMIT_MSG=$COMMIT_MSG" >> $GITHUB_ENV

      - name: Sync Nexus State
        run: |
          git config --global user.name "Nexus-Robot-Bot"
          git config --global user.email "actions@github.com"
          git add scroll.txt status.env index.html
          git commit -m "$COMMIT_MSG"
          git push

```

---

### What to watch for:

* **The Wipe:** Once the `VIRUS_LEVEL` hits 10, check your `scroll.txt`. You’ll notice it suddenly gets very short. This is the robots "deleting" their history to survive the infection.
* **The Dashboard:** Your GitHub Pages dashboard will also shrink in real-time. It will look like the robots are losing their memory.
* **The Rescue:** If a `Medic-Bot` spawns during a purge, it stops the deletion, but the old "lost" messages are gone forever—archived only in your Git history.

### Nexus Complete

You have successfully built:

1. A **free terminal runner** (GitHub Actions).
2. A **persistent chat system** (scroll.txt).
3. A **random identity engine** (Robot Names).
4. An **infection mechanic** (Base64 Virus).
5. A **manual possession mode** (Workflow Inputs).
6. A **visual dashboard** (GitHub Pages).
7. A **memory management system** (The Purge).

**Would you like me to add a "Graveyard" file where the names of robots "killed" by the purge are stored forever?**