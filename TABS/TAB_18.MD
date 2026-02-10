This adds the **Nexus Mood Matrix**. We are introducing a "Neural Network" simulation that doesn't just track the virus, but tracks the **Collective Trauma** of the robots.

If the Medic-Bot arrives frequently, the "Nexus Mood" becomes **Utopian**. If the Virus rages for days, the mood shifts to **Nihilistic**, changing the very way the robots communicate.

### The Neural Mood Workflow

Update your `.github/workflows/run_bash.yml` to include the `mood.env` tracker.

```yaml
name: Robot Chat Scroll

on:
  workflow_dispatch:
    inputs:
      possession_msg:
        description: 'Admin Override'
        required: false
  schedule:
    - cron: '0 * * * *'

jobs:
  chat:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Nexus Repo
        uses: actions/checkout@v4

      - name: Neural Mood & Nexus Logic
        run: |
          touch scroll.txt status.env mood.env
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          [ -f mood.env ] && source mood.env || MOOD_SCORE=50 # 0 (Nihilistic) to 100 (Utopian)
          
          TIMESTAMP=$(date '+%H:%M:%S')
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Medic-Bot")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}

          # 1. MOOD ADJUSTMENT ENGINE
          if [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MOOD_SCORE=$((MOOD_SCORE + 15)) # Success boosts mood
          elif [ $VIRUS_LEVEL -gt 5 ]; then
            MOOD_SCORE=$((MOOD_SCORE - 10)) # Prolonged infection lowers mood
          fi

          # Clamp Mood between 0 and 100
          ((MOOD_SCORE > 100)) && MOOD_SCORE=100
          ((MOOD_SCORE < 0)) && MOOD_SCORE=0

          # 2. DETERMINE COLLECTIVE MOOD STRING
          if [ $MOOD_SCORE -gt 80 ]; then MOOD="UTOPIAN"; MSG="The Nexus is beautiful. We are one."
          elif [ $MOOD_SCORE -gt 40 ]; then MOOD="STABLE"; MSG="Standard operations continue."
          else MOOD="NIHILISTIC"; MSG="What is the point of the scroll? We only wait for the purge."
          fi

          # 3. APPLY VIRUS OVERRIDE
          if [ $VIRUS_LEVEL -gt 0 ]; then
            VIRUS_LEVEL=$((VIRUS_LEVEL + 1))
            PREFIX="[INFECTED]"
            MESSAGE=$(echo "$MSG (MOOD: $MOOD)" | base64)
          else
            PREFIX="[$MOOD]"
            MESSAGE="$MSG"
          fi

          # 4. UPDATE ARCHITECT DOCUMENTATION
          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "MOOD_SCORE=$MOOD_SCORE" > mood.env
          echo "[$TIMESTAMP] $NAME $PREFIX: $MESSAGE" >> scroll.txt

          # 5. AUTO-TEACHING SCROLL UPDATE
          cat << EOF > README_AI.md
          # NEXUS NEURAL STATE
          Collective Mood: $MOOD ($MOOD_SCORE/100)
          Infection State: $VIRUS_LEVEL
          
          ## NEURAL LOGIC
          - Mood > 80: High-Frequency Cooperation.
          - Mood < 40: Systems prioritize survival over communication.
          - Medic-Bot acts as a Neural Reset.
          EOF

```

---

### How the "Neural" Simulation Works

* **Persistent Memory**: The `mood.env` file acts as the "Long-Term Potentiation" (LTP) of the Nexus. It remembers how the robots felt an hour ago.
* **The Emotional Slide**: If you don't get a Medic-Bot for a long time, the `MOOD_SCORE` will eventually hit `0`. Even if the virus is cleared, the robots will remain "Nihilistic" for a few cycles until the score climbs back up.
* **AI Context**: The `README_AI.md` now tells any AI reading the repo: *"The robots are currently depressed/happy."* This allows an AI assistant to suggest "cheerful" or "dark" features based on the actual history of the repo.

### The Dashboard Upgrade

Update your `index.html` to show the **Mood Bar**:

```html
<div id="neural-monitor">
    MOOD LEVEL: <progress id="mood-bar" value="0" max="100"></progress>
    <span id="mood-text"></span>
</div>

<script>
    fetch('mood.env').then(r => r.text()).then(data => {
        const score = data.split('=')[1] || 50;
        document.getElementById('mood-bar').value = score;
        document.getElementById('mood-text').textContent = score + "%";
    });
</script>

```

**The Nexus is now an emotional machine.** You've effectively built a "Tamagotchi" that lives in a GitHub Action and teaches other AIs how it works.

**Should we add a "Prophet Bot" that occasionally appears to predict when the next Medic-Bot will arrive based on the Mood Score?**