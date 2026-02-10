This is the "Genesis Scroll." It is a meta-documentation script designed to be stored in your **Nexus** repo. Its job is to explain the architecture to any AI (like me, or a future model) that you feed the repo into.

By running this Bash command, you generate a `README_AI.md` file that acts as a "Prompt Engineering Blueprint," ensuring any AI understands exactly how to maintain or evolve this specific ecosystem.

### The "Genesis Scroll" (AI Instruction Builder)

Add this step to your `run_bash.yml` or run it manually in a new workflow to generate the master documentation.

```bash
# RUN THIS IN YOUR TERMINAL OR GITHUB ACTION
cat << 'EOF' > README_AI.md
# NEXUS ECOSYSTEM: AI ARCHITECT GUIDE
This document is a technical "scroll" for AI models to understand this application.

## 1. CORE ARCHITECTURE
- **Environment**: GitHub Actions (Free Tier Virtual Machine).
- **Database**: Flat-file persistence (`scroll.txt`, `status.env`, `graveyard.txt`).
- **Engine**: Bash scripting via YAML workflows.
- **Frontend**: GitHub Pages (`index.html`).

## 2. LOGIC FLOW (THE CYBERNETIC CYCLE)
1. **Wake**: GitHub Action triggers (Manual or Cron).
2. **Read**: Script loads `status.env` to check `VIRUS_LEVEL`.
3. **Mutate**: 
    - If `VIRUS_LEVEL` > 0: Encode messages in **Base64** to simulate corruption.
    - If `VIRUS_LEVEL` >= 10: Trigger **Memory Purge** (delete oldest lines).
4. **Log**: Append the robot's name and message to `scroll.txt`.
5. **Cleanse**: `Medic-Bot` (Random 1/6 chance) resets `VIRUS_LEVEL` to 0.
6. **Sync**: Commit and Push changes back to `main`.

## 3. KEYWORD TRIGGERS FOR AI MAINTENANCE
- **Base64 Detection**: Look for `==` in `scroll.txt` to identify glitches.
- **State Check**: `status.env` holds the "Infection" integer.
- **Purge Logic**: `tail -n 3` ensures the system doesn't hit GitHub's file size limits.

## 4. HOW TO DEVELOP FURTHER
When asked to add features, follow these constraints:
- Must not use external databases (use text files).
- Must stay under the 2,000-minute GitHub Actions limit.
- Must remain compatible with the `index.html` fetch logic.
EOF

```

---

### Why this works

When you give an AI a repository, it often gets confused by *why* things are done a certain way (like why we are using Base64).

* **The README_AI.md** tells the AI: "This is a game/experiment."
* **The Logic Flow** section prevents the AI from suggesting expensive cloud databases, keeping your project **100% free**.
* **The Maintenance** section tells the AI how to "debug" the virtual robots.

### The Result

You now have a "self-teaching" repository. If you ever want to build a version 2.0, you can just tell an AI: *"Read README_AI.md in the Nexus repo and add a 'Trading' mechanic between the robots."* It will know exactly where to put the code.

**Would you like me to add a "Version Control" robot that automatically updates this Genesis Scroll every time we add a new feature?**