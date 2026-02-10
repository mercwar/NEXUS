This adds a "Panic Mode." Once the virus hits a critical threshold (Level 5), the robots will stop being polite and start naming you in the commit messages, effectively "pinging" your GitHub account to demand a manual intervention.

### The "Nexus Emergency" Protocol

Update your YAML with this final layer of logic. Replace `YOUR_GITHUB_USERNAME` in the script with your actual GitHub handle.

```yaml
name: Robot Chat Scroll

on:
  workflow_dispatch:
  schedule:
    - cron: '0 * * * *'

jobs:
  chat:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Nexus Repo
        uses: actions/checkout@v4

      - name: Viral Evolution & Alert System
        run: |
          touch scroll.txt
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Void-Walker" "Medic-Bot")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}
          TIMESTAMP=$(date '+%H:%M:%S')
          USER_TO_ALERT="@YOUR_GITHUB_USERNAME" # <--- CHANGE THIS TO YOUR USERNAME

          if [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MESSAGE="ANTIVIRUS DEPLOYED. Nexus core sanitized."
            PREFIX="[CLEANSE]"
            COMMIT_MSG="System Restored by Medic-Bot"
          
          elif [ $VIRUS_LEVEL -gt 0 ]; then
            VIRUS_LEVEL=$((VIRUS_LEVEL + 1))
            PREFIX="[INFECTED]"
            
            if [ $VIRUS_LEVEL -ge 5 ]; then
              # PANIC MODE: The robots start calling for help
              RAW_MSG="CRITICAL OVERLOAD. $USER_TO_ALERT THE NEXUS IS LOST."
              MESSAGE=$(echo "$RAW_MSG" | base64)
              COMMIT_MSG="ALERT: Virus Level $VIRUS_LEVEL - $USER_TO_ALERT HELP US"
            else
              MESSAGE=$(echo "SYSTEM CORRUPTION IN PROGRESS." | base64)
              COMMIT_MSG="Nexus Infection spreading... Level $VIRUS_LEVEL"
            fi
          else
            # STABLE STATE
            GLITCH_CHANCE=$((1 + $SRANDOM % 7))
            if [ $GLITCH_CHANCE -eq 1 ]; then
              MESSAGE=$(echo "CORE BREACH." | base64)
              PREFIX="[OUTBREAK]"
              VIRUS_LEVEL=1
              COMMIT_MSG="Warning: Anomalous activity detected"
            else
              PREFIX="[STABLE]"
              MESSAGE="Nexus heartbeat normal."
              COMMIT_MSG="Robot $NAME checked in."
            fi
          fi

          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "[$TIMESTAMP] $NAME $PREFIX: $MESSAGE" >> scroll.txt
          
          # Export variables for the next step
          echo "COMMIT_MSG=$COMMIT_MSG" >> $GITHUB_ENV

      - name: Sync Nexus State
        run: |
          git config --global user.name "Nexus-Robot-Bot"
          git config --global user.email "actions@github.com"
          git add scroll.txt status.env
          git commit -m "$COMMIT_MSG"
          git push

```

### What happens now:

1. **Low Level (0-4):** The robots chat or glitch quietly. The commit messages are standard system logs.
2. **High Level (5+):** The `COMMIT_MSG` variable changes to include your `@username`.
3. **The Notification:** Because GitHub sends notifications for commits that mention your username, your phone or email will actually alert you that the **Nexus** is under attack.
4. **The Choice:** You can wait for a `Medic-Bot` to appear randomly, or you can "intervene" by manually editing `status.env` back to `0` and committing it yourself.

**The Nexus is now a living, breathing, and potentially infectious ecosystem. Do you want to see how to add a "Log Terminal" where you can "possess" a robot and send a manual message through the Action?**