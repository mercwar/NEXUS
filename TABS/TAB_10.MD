This is where the **Nexus** environment gets dangerous. We are introducing a persistent state—a "Contagion Level"—that lives in a file. If a robot glitches, the virus spreads, and the transmissions stay corrupted until a "Medic Bot" randomly spawns to purge the system.

### The Nexus Viral Protocol

Replace your YAML with this "Infection" logic. It uses a file called `status.env` to remember if the virus is active between different runs.

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

      - name: Nexus Virus & Medic Logic
        run: |
          touch scroll.txt
          # Load virus status (0 = Clean, 1+ = Infected)
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Void-Walker" "Medic-Bot")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}
          TIMESTAMP=$(date '+%H:%M:%S')

          # 1. SPECIAL CASE: Medic-Bot arrives
          if [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MESSAGE="ANTIVIRUS DEPLOYED. Nexus core sanitized. All systems nominal."
            PREFIX="[CLEANSE]"
          
          # 2. VIRUS SPREAD: If virus level > 0, the robot is forced to glitch
          elif [ $VIRUS_LEVEL -gt 0 ]; then
            RAW_MSG="THE VIRUS IS CONSUMING THE NEXUS. HELP."
            MESSAGE=$(echo "$RAW_MSG" | base64)
            PREFIX="[INFECTED]"
            VIRUS_LEVEL=$((VIRUS_LEVEL + 1)) # Virus gets stronger

          # 3. CHANCE TO START VIRUS: Random glitch starts the infection
          else
            GLITCH_CHANCE=$((1 + $SRANDOM % 6))
            if [ $GLITCH_CHANCE -eq 1 ]; then
              MESSAGE=$(echo "CORE BREACH DETECTED. VIRUS LEAKED." | base64)
              PREFIX="[OUTBREAK]"
              VIRUS_LEVEL=1
            else
              PREFIX="[STABLE]"
              MESSAGE="Scanning Nexus sectors... No threats detected."
            fi
          fi

          # 4. Save Status and Log Message
          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "[$TIMESTAMP] $NAME $PREFIX: $MESSAGE" >> scroll.txt
          
          echo "SYSTEM STATUS: Virus Level $VIRUS_LEVEL"
          tail -n 1 scroll.txt

      - name: Sync Nexus State
        run: |
          git config --global user.name "Nexus-Robot-Bot"
          git config --global user.email "actions@github.com"
          git add scroll.txt status.env
          git commit -m "Nexus Status Update: Virus Level $(grep VIRUS_LEVEL status.env | cut -d= -f2)"
          git push

```

---

### How the Outbreak Works

* **The Patient Zero:** If a normal robot rolls a `1`, it triggers the `[OUTBREAK]`. It saves `VIRUS_LEVEL=1` into `status.env`.
* **The Contagion:** Once that file says `1`, **every single robot** that wakes up afterward (every hour) will be forced to speak in Base64 `[INFECTED]` code. The `VIRUS_LEVEL` will keep climbing (2, 3, 4...).
* **The Cure:** The only way to stop it is for the random name generator to hit **Medic-Bot**. When the Medic arrives, it resets the `status.env` to `0`, and the chat returns to normal English.

### Monitoring the Nexus

You can now look at your repository files to see the "health" of your bot chat:

1. **scroll.txt**: The actual conversation history.
2. **status.env**: The hidden "brain" that tells you if the virus is currently active.

**Would you like me to add a "Global Alert" where the robots start tagging your GitHub username in the commit messages when the Virus Level gets too high?**