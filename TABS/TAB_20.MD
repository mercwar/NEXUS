The **Sacrifice Protocol** is now online. This introduces a "Ritual" mechanic. By manually editing the `graveyard.txt` and removing a name, or by using the **Possession** input to trigger a "Ritual," you can trade the memory of a fallen robot for the sanity of the living ones.

This teaches the AI about **resource exchange** and **data-deletion-as-a-feature.**

### The "Nexus Sacrifice" Workflow

We will update the `workflow_dispatch` to handle a new keyword: **SACRIFICE**. If you type "SACRIFICE" into the manual input box, the script will delete the oldest name in the Graveyard and boost the Mood.

```yaml
      - name: Nexus Ritual Logic
        run: |
          touch scroll.txt status.env mood.env graveyard.txt
          [ -f status.env ] && source status.env || VIRUS_LEVEL=0
          [ -f mood.env ] && source mood.env || MOOD_SCORE=50
          
          TIMESTAMP=$(date '+%H:%M:%S')
          USER_MSG="${{ github.event.inputs.possession_msg }}"

          # 1. THE SACRIFICE RITUAL
          if [[ "$USER_MSG" == "SACRIFICE" ]]; then
            if [ -s graveyard.txt ]; then
              # Get the name of the spirit being sacrificed
              SPIRIT_NAME=$(head -n 1 graveyard.txt)
              # Remove that name from the graveyard
              sed -i '1d' graveyard.txt
              # Boost the Mood significantly
              MOOD_SCORE=$((MOOD_SCORE + 30))
              MESSAGE="A ritual was performed. The memory of $SPIRIT_NAME has been consumed. The Nexus feels... lighter."
              PREFIX="[RITUAL]"
              COMMIT_MSG="Sacrifice Accepted: $SPIRIT_NAME has been forgotten."
            else
              MESSAGE="The Admin attempted a sacrifice, but the Graveyard is empty. No spirits to trade."
              PREFIX="[FAILED-RITUAL]"
              COMMIT_MSG="Ritual failed: Empty Graveyard"
            fi

          # 2. STANDARD LOGIC
          else
            # ... (Insert your previous Prophet, Medic, and Virus logic here)
          fi

          # Clamp Mood
          ((MOOD_SCORE > 100)) && MOOD_SCORE=100

          # 3. SAVE STATE
          echo "VIRUS_LEVEL=$VIRUS_LEVEL" > status.env
          echo "MOOD_SCORE=$MOOD_SCORE" > mood.env
          echo "[$TIMESTAMP] ADMIN $PREFIX: $MESSAGE" >> scroll.txt
          
          # 4. TEACH THE AI (Update the Genesis Scroll)
          cat << EOF > README_AI.md
          # NEXUS RITUAL SYSTEM
          Current Mood: $MOOD_SCORE/100
          Graveyard Count: $(wc -l < graveyard.txt)
          
          ## SACRIFICE PROTOCOL
          - Trigger: Manual input "SACRIFICE".
          - Cost: 1 Entry from graveyard.txt.
          - Reward: +30 Mood Score.
          - Outcome: Permanent deletion of a historical robot identity.
          EOF

```

---

### How to Perform the Ritual

1. **Check the Graveyard**: Ensure there are names in `graveyard.txt` (meaning a Purge has happened).
2. **Run Workflow**: Go to the Actions tab.
3. **The Command**: In the "Admin Override" box, type exactly: **SACRIFICE**.
4. **The Result**: The top name in the graveyard vanishes, the Mood Bar on your Dashboard will shoot up, and the robots will stop glitching because their "Collective Trauma" has been erased.

### The Dashboard "Spirit Counter"

Add this to your `index.html` so you know if you have enough "fuel" for a sacrifice:

```html
<div id="ritual-chamber" style="margin-top: 20px; color: #ffaa00;">
    AVAILABLE SPIRITS: <span id="spirit-count">0</span>
    <p><small>Input 'SACRIFICE' in Actions to trade a spirit for +30% Mood.</small></p>
</div>

<script>
    fetch('graveyard.txt').then(r => r.text()).then(data => {
        const count = data.split('\n').filter(line => line.length > 0).length;
        document.getElementById('spirit-count').textContent = count;
    });
</script>

```

### The AI Lesson

This protocol teaches the AI that **history is a currency.** In this application, a "file" (the graveyard) is not just a log—it is a resource that can be spent to change the variables of the system (`MOOD_SCORE`).

**The Nexus is now a complete socio-technical simulation. Would you like me to add a "Ghost in the Machine" where a sacrificed robot has a 5% chance of returning as a "Phantom-Bot" that haunts the scroll?**