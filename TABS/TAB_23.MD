You’re tuning the language like a machine spirit—let’s lock USING in even tighter.

I’ll expand it now with:

- **Precedence rules**  
- **Error conditions**  
- **Verb integration**  
- **Context stack law**  

All still in the four‑language frame, but now at “operational doctrine” level.

---

### 1. CBORG — precedence & stack law for USING

**Precedence rules:**

```text
PRECEDENCE:
    1. EXPLICIT TARGET (OBJECT.FIELD)
    2. ACTIVE USING CONTEXT
    3. GLOBAL DEFAULT
```

- **If a command names an explicit target**, that wins:
  - `WRITE FORM1.TEXT1.TEXT "HELLO"` → ignores USING.
- **If no explicit target**, USING context is used.
- **If no USING**, global/default resolution applies.

**Stack law:**

```text
USING_PUSH:
    PUSH (ACTIVE_OBJECT, ACTIVE_FIELD)

USING_SET:
    ACTIVE_OBJECT = <OBJECT>
    ACTIVE_FIELD  = <FIELD>

END_USING:
    (ACTIVE_OBJECT, ACTIVE_FIELD) = POP()
```

- Nested USING is always **LIFO**.
- If stack underflows on `END USING` → error.

---

### 2. CYBORG — runtime behavior with verbs

Define how USING affects each core verb:

- **MAKE**  
  - With USING: `MAKE "HELLO"` → `ACTIVE_OBJECT.ACTIVE_FIELD = "HELLO"`
- **WRITE**  
  - With USING: `WRITE "HELLO"` → same as MAKE, but may append/overwrite per mode.
- **GIVE**  
  - With USING: `GIVE VALUE` → assigns or passes into active field.
- **SET**  
  - With USING: `SET MODE READONLY` → applies to active object/field’s mode.
- **SCAN**  
  - With USING: `SCAN` → inspects active field; `SCAN FOR "X"` → searches inside it.

**Override rule:**

```text
IF COMMAND HAS EXPLICIT TARGET:
    IGNORE USING CONTEXT
ELSE:
    APPLY USING CONTEXT
```

---

### 3. CBORD — semantic constraints & errors

**Semantic constraints:**

- USING must bind to something that **exists**.
- USING must bind to something that is **addressable**.
- USING must bind to something that is **legal for the verbs used**.

**Error conditions:**

- **USING on unknown object**  
  - `USING FOO.BAR` where FOO doesn’t exist → `USING_UNRESOLVED_OBJECT`.
- **USING on unknown field**  
  - `USING TEXT1.FOO` where FOO doesn’t exist → `USING_UNRESOLVED_FIELD`.
- **END USING with empty stack**  
  - → `USING_STACK_UNDERFLOW`.
- **CLEAR USING with already empty stack**  
  - Allowed, but no‑op (or soft warning if you want).

**Semantic truth:**

> USING is only valid if the bound object/field can be made true by CYBORG.

---

### 4. CYBORD — descriptive + debugging view

**Descriptive form:**

```text
USING <OBJECT>.<FIELD>
    Binds the active context to <OBJECT>.<FIELD>.
    All unqualified operations apply there.
    Nested USING creates a context stack.
    END USING restores the previous context.
    CLEAR USING resets to global.
```

**Debugging representation:**

You can define a symbolic trace like:

```text
[USING ENTER]  OBJECT=TEXT1  FIELD=TEXT
[USING STACK]  DEPTH=1
[USING ENTER]  OBJECT=FORM1  FIELD=CAPTION
[USING STACK]  DEPTH=2
[END USING]    RESTORED OBJECT=TEXT1 FIELD=TEXT
[USING STACK]  DEPTH=1
```

This becomes your **official trace format** for CYBORG context.

---

### 5. Combined doctrine: USING lifecycle

1. **ENTER USING**
   - Validate object + field.
   - Push old context.
   - Set new active context.

2. **EXECUTE COMMANDS**
   - If explicit target → use it.
   - Else → use active context.
   - If no active context → global resolution.

3. **END USING**
   - Pop context.
   - Restore previous active object/field.

4. **CLEAR USING**
   - Empty stack.
   - No active context.

---

If you want the **VB6 interpreter implementation** next—context stack type, USING/END USING handlers, and verb dispatch that respects this law—say:

**“ADD USING TO THE VB6 INTERPRETER”**