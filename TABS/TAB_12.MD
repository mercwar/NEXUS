This adds the **"Manual Override"** or **"Possession"** mode. It allows you to use the `workflow_dispatch` inputs to take control of a robot and inject your own message into the Nexus scroll. If you use this while the virus is active, it will act as a manual "Admin Hack."

### The "Nexus Possession" Workflow

I’ve added an `inputs` section at the top. When you click **"Run workflow,"** a text box will now pop up asking for your message.

```yaml
name: Robot Chat Scroll

on:
  workflow_dispatch:
    inputs:
      possession_msg:
        description: 'Message to inject into the Nexus'
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

      - name: Nexus Logic & Manual Override
        run: |
          touch scroll.txt
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          
          TIMESTAMP=$(date '+%H:%M:%S')
          USER_MSG="${{ github.event.inputs.possession_msg }}"
          USER_TO_ALERT="@YOUR_GITHUB_USERNAME" # <--- YOUR USERNAME HERE

          # 1. CHECK FOR USER POSSESSION
          if [ ! -z "$USER_MSG" ]; then
            NAME="ADMIN-OVERRIDE"
            PREFIX="[DIRECT-LINK]"
            MESSAGE="$USER_MSG (User Intervention Detected)"
            COMMIT_MSG="Admin has possessed the Nexus"
            # Optional: Does manual intervention clear the virus?
            # VIRUS_LEVEL=0 
          
          # 2. MEDIC-BOT LOGIC
          elif [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MESSAGE="ANTIVIRUS DEPLOYED."
            PREFIX="[CLEANSE]"
            COMMIT_MSG="System Restored by Medic-Bot"

          # 3. VIRAL LOGIC
          elif [ $VIRUS_LEVEL -gt 0 ]; then
            VIRUS_LEVEL=$((VIRUS_LEVEL + 1))
            PREFIX="[INFECTED]"
            RAW_MSG="CORE FAILURE. $USER_TO_ALERT"
            MESSAGE=$(echo "$RAW_MSG" | base64)
            COMMIT_MSG="ALERT: Virus Level $VIRUS_LEVEL"

          # 4. STABLE LOGIC
          else
            ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot")
            NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}
            PREFIX="[STABLE]"
            MESSAGE="Nexus heartbeat normal."
            COMMIT_MSG="Robot $NAME checked in."
          fi

          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "[$TIMESTAMP] $NAME $PREFIX: $MESSAGE" >> scroll.txt
          echo "COMMIT_MSG=$COMMIT_MSG" >> $GITHUB_ENV

      - name: Sync Nexus State
        run: |
          git config --global user.name "Nexus-Robot-Bot"
          git config --global user.email "actions@github.com"
          git add scroll.txt status.env
          git commit -m "$COMMIT_MSG"
          git push

```

---

### How to "Possess" a Robot:

1. Go to the **Actions** tab.
2. Click **Robot Chat Scroll** on the left.
3. Click the **Run workflow** button.
4. **The Change:** You will see a text box that says "Message to inject into the Nexus."
5. Type something like: *"I am the architect. Stop the glitching."*
6. Hit **Run workflow**.

### The Result:

The robots will see your message in the `scroll.txt` history. Because you are the "Admin," your message won't be base64 encoded even if the virus is active—it will appear as a clean signal from the "outside."

**The Nexus is now fully interactive. Would you like me to show you how to create a simple "Dashboard" (using GitHub Pages) so you can read the robot chat in a browser instead of opening the text file?**