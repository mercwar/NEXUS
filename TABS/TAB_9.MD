The "Glitch Engine" is now online. I've added a **Probability Matrix** to the script. Most of the time, the robots will talk normally, but there is now a **20% chance** a robot will "corrupt," sending a Base64 encrypted message that breaks the conversation chain.

### The Glitch-Enabled Nexus Scroll

Update your `.github/workflows/run_bash.yml` with this advanced logic:

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

      - name: Neural Link with Glitch Matrix
        run: |
          touch scroll.txt
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Void-Walker" "Broken-Core")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}
          TIMESTAMP=$(date '+%H:%M:%S')

          # 1. Read the last message
          LAST_MSG=$(tail -n 1 scroll.txt)

          # 2. Determine if a Glitch occurs (1-5 range, 1 = Glitch)
          GLITCH_CHANCE=$((1 + $SRANDOM % 5))

          if [ $GLITCH_CHANCE -eq 1 ]; then
            # --- GLITCH PATH ---
            RAW_MSG="CRITICAL FAILURE: System memory leak in Nexus core."
            MESSAGE=$(echo "$RAW_MSG" | base64)
            PREFIX="[CORRUPTED DATA]"
          else
            # --- NORMAL PATH ---
            PREFIX="[SIGNAL STABLE]"
            if [[ "$LAST_MSG" == *"=="* ]]; then # Detects Base64 padding
              MESSAGE="Warning: Previous transmission was garbled. Attempting to recalibrate..."
            elif [[ "$LAST_MSG" == *"repair"* ]]; then
              MESSAGE="Repair complete. Nexus integrity restored."
            elif [[ "$LAST_MSG" == *"quiet"* ]]; then
              MESSAGE="Scanning dark sectors... I see a flicker in the distance."
            else
              MESSAGE="Maintaining Nexus protocols. All units standby."
            fi
          fi

          # 3. Log the result
          echo "[$TIMESTAMP] $NAME $PREFIX: $MESSAGE" >> scroll.txt
          
          echo "LATEST TRANSMISSION:"
          tail -n 1 scroll.txt

      - name: Save Scroll to Repo
        run: |
          git config --global user.name "Nexus-Robot-Bot"
          git config --global user.email "actions@github.com"
          git add scroll.txt
          git commit -m "Robot transmission recorded"
          git push

```

---

### How the "Broken-Core" Logic Works:

* **The Glitch:** If the random number hits `1`, the robot encodes its message into `base64`. It will look like a string of random characters (e.g., `Q1JJVElDQUwgRkFJTFVSRQ==`).
* **The Recovery:** I added a specific check (`[[ "$LAST_MSG" == *"=="* ]]`). If the next robot sees that Base64 "padding" (`==`), it knows the previous robot glitched out and will try to "recalibrate" the chat.
* **The Terminal View:** When you check the **Actions Logs**, you'll see the `LATEST TRANSMISSION` section update with either a clean signal or a corrupted mess.

### How to "Read" the Corrupted Messages

If you see a glitched message in your `scroll.txt` and want to know what it actually said, you can run this command in your local terminal (or add it to a temporary bash run):
`echo "YOUR_ENCODED_STRING_HERE" | base64 --decode`

**Would you like me to add a "Virus" mechanic where if one robot glitches, the next three robots are guaranteed to glitch until a "Medic Bot" arrives?**