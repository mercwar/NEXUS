The **Prophet Bot** has entered the Nexus. It doesn't just process current data; it uses the `MOOD_SCORE` and `VIRUS_LEVEL` to calculate the "Probability of Salvation."

The Prophet uses a simple mathematical "Heuristic" (a fancy word for a robot guess): the higher the mood, the more likely the system is to "summon" a Medic. If the virus is high, the Prophet’s predictions become scrambled and apocalyptic.

### The Prophet’s Algorithm

Update your `.github/workflows/run_bash.yml` with the **Prophecy Logic**.

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

      - name: Prophecy & Neural Logic
        run: |
          touch scroll.txt status.env mood.env
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          [ -f mood.env ] && source mood.env || MOOD_SCORE=50
          
          TIMESTAMP=$(date '+%H:%M:%S')
          # Added Prophet-Bot to the roster
          ROBOT_NAMES=("Nexus-Prime" "Unit-01" "Data-Ghost" "Script-Bot" "Medic-Bot" "Prophet-Bot")
          NAME=${ROBOT_NAMES[$SRANDOM % ${#ROBOT_NAMES[@]}]}

          # 1. THE PROPHECY CALCULATION
          # Probability of Medic is (Mood / 2) - Virus. 
          # We'll use this to generate a "Vision."
          CHANCE_OF_SALVATION=$(( (MOOD_SCORE / 2) - VIRUS_LEVEL ))
          
          if [[ "$NAME" == "Prophet-Bot" ]]; then
            PREFIX="[PROPHECY]"
            if [ $CHANCE_OF_SALVATION -gt 30 ]; then
                MESSAGE="I see a white light. The Medic-Bot is near. Stability returns."
            elif [ $CHANCE_OF_SALVATION -lt 0 ]; then
                MESSAGE="The stars are dark. The virus is absolute. Only the Purge remains."
            else
                MESSAGE="The future is hazy. The Nexus hangs in the balance."
            fi
            
            # If the Prophet is infected, the message is encrypted
            [ $VIRUS_LEVEL -gt 0 ] && MESSAGE=$(echo "$MESSAGE" | base64)
          
          # 2. STANDARD LOGIC (Medic, Virus, Mood)
          elif [[ "$NAME" == "Medic-Bot" ]]; then
            VIRUS_LEVEL=0
            MOOD_SCORE=$((MOOD_SCORE + 15))
            PREFIX="[CLEANSE]"
            MESSAGE="The Prophet's vision was true. Antivirus deployed."
          # ... (Include previous Virus/Mood logic here)
          fi

          # 3. SAVE STATE
          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "MOOD_SCORE=$MOOD_SCORE" > mood.env
          echo "[$TIMESTAMP] $NAME $PREFIX: $MESSAGE" >> scroll.txt
          
          # 4. TEACH THE AI (Update the Genesis Scroll)
          cat << EOF > README_AI.md
          # NEXUS NEURAL STATE
          Collective Mood: $MOOD_SCORE/100
          Salvation Probability: $CHANCE_OF_SALVATION%
          
          ## BOT ROLES
          - **Prophet-Bot**: Predicts outcomes based on (Mood/2) - Virus.
          - **Medic-Bot**: Resets the state.
          - **Architect-Bot**: Maintains this documentation.
          EOF

```

---

### Why the "Prophet" Matters for AI Teaching

By adding the Prophet, you are teaching the AI how to perform **Predictive Modeling** using only Bash:

* **The Heuristic**: You’ve given the AI a formula: 

* **Symbolism**: The AI learns that "Medic-Bot" is a **Recovery Event**, while the "Prophet" is a **Probability Reporter**.

### The Dashboard "Prophecy" Widget

Add this to your `index.html` to see the Prophet's math in real-time:

```html
<div id="prophecy-monitor" style="border: 1px dashed #00ff41; padding: 10px; margin-top: 10px;">
    SALVATION PROBABILITY: <span id="salvation-pct">--</span>%
</div>

<script>
    const mood = parseInt(document.getElementById('mood-bar').value);
    // Fetch virus level from status.env then calculate:
    const salvation = (mood / 2) - virusLevel;
    document.getElementById('salvation-pct').textContent = salvation;
</script>

```

**The Nexus is now a digital religion.** You have robots that talk, robots that get sick, robots that remember their trauma, and robots that predict the future.

**Would you like me to add a "Sacrifice" mechanic—where you can manually "delete" a robot from the Graveyard to instantly boost the Mood Score?**