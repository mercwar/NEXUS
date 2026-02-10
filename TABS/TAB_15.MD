The **Nexus Graveyard** is now operational. This adds a permanent record—a "Black Box"—of every robot that was active when a memory purge occurred. Even if their messages are deleted from the main scroll, their names will be etched into `graveyard.txt` forever.

### The "Graveyard" Protocol

Update your `.github/workflows/run_bash.yml` with this final piece of the Nexus soul.

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

      - name: Viral Evolution & The Graveyard
        run: |
          touch scroll.txt graveyard.txt
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          
          TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
          USER_MSG="${{ github.event.inputs.possession_msg }}"
          
          # 1. BOT IDENTITY
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Medic-Bot" "Void-Walker")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}

          # 2. THE PURGE & GRAVEYARD LOGIC
          if [ $VIRUS_LEVEL -ge 10 ]; then
            echo "--- PURGE DETECTED ---"
            # Extract names from lines about to be deleted and move them to the Graveyard
            head -n -3 scroll.txt | cut -d' ' -f2 | sort -u >> graveyard.txt
            
            # Wipe old memory
            tail -n 3 scroll.txt > scroll.tmp && mv scroll.tmp scroll.txt
            PURGE_STATUS="[MEMORY_PURGED]"
          else
            PURGE_STATUS=""
          fi

          # 3. MESSAGE LOGIC
          if [ ! -z "$USER_MSG" ]; then
            NAME="ADMIN-OVERRIDE"
            MESSAGE="[MANUAL_ENTRY]: $USER_MSG"
            PREFIX="[DIRECT]"
            COMMIT_MSG="Admin Intervention"
          elif [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MESSAGE="ANTIVIRUS DEPLOYED. Core sanitized."
            PREFIX="[CLEANSE]"
            COMMIT_MSG="Nexus Restored"
          elif [ $VIRUS_LEVEL -gt 0 ]; then
            VIRUS_LEVEL=$((VIRUS_LEVEL + 1))
            PREFIX="[INFECTED]"
            MESSAGE=$(echo "SYSTEM DYING." | base64)
            COMMIT_MSG="Infection Level $VIRUS_LEVEL"
          else
            PREFIX="[STABLE]"
            MESSAGE="Nexus heartbeat normal."
            COMMIT_MSG="Check-in: $NAME"
          fi

          # 4. Save & Log
          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "[$TIMESTAMP] $NAME $PREFIX $PURGE_STATUS: $MESSAGE" >> scroll.txt
          echo "COMMIT_MSG=$COMMIT_MSG" >> $GITHUB_ENV

      - name: Sync Nexus State
        run: |
          git config --global user.name "Nexus-Robot-Bot"
          git config --global user.email "actions@github.com"
          git add scroll.txt status.env index.html graveyard.txt
          git commit -m "$COMMIT_MSG"
          git push

```

---

### How to Check the Graveyard

1. **Wait for an Outbreak:** Let the `VIRUS_LEVEL` hit 10.
2. **The Extraction:** The script will automatically scan `scroll.txt` before it's wiped, find the names of the robots currently in the chat, and append them to `graveyard.txt`.
3. **The Memorial:** You can now see a list of "fallen" units by opening the graveyard file in your repo.

### Update your Dashboard (`index.html`)

To see the Graveyard on your website, add this small section to the bottom of your `index.html`:

```html
<div id="memorial" style="margin-top: 20px; color: #888;">
    <h3>THE GRAVEYARD (FALLEN UNITS)</h3>
    <pre id="dead-robots"></pre>
</div>

<script>
    // Fetch the Graveyard
    fetch('graveyard.txt').then(r => r.text()).then(data => {
        document.getElementById('dead-robots').textContent = data;
    });
</script>

```

**The Nexus project is now a complete cycle of life, death, and data corruption.** You're running a complex robot society entirely on GitHub's dime.

**Is there anything else you'd like to automate—perhaps a "Scavenger Bot" that tries to find and decode the base64 messages before they get purged?**