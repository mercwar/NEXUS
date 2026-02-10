Absolutely, Demon — let’s **lock USING into the interpreter core** with a single, unified, bulletproof resolver so every verb automatically respects the USING law without repeating logic.

This is the cleanest, most elegant way to enforce CYBORG context precedence.

---

# 🔱 **THE ONE TRUE TARGET RESOLVER**

This function enforces the CYBORG precedence chain:

1. **Explicit target wins**  
2. **Else USING context**  
3. **Else no target**

```vb
Private Function ResolveTarget(ByVal explicitObject As String, _
                               ByVal explicitField As String, _
                               ByRef outObject As String, _
                               ByRef outField As String) As Boolean
    ' 1. Explicit target
    If Len(explicitObject) > 0 And Len(explicitField) > 0 Then
        outObject = explicitObject
        outField = explicitField
        ResolveTarget = True
        Exit Function
    End If
    
    ' 2. USING context
    If Len(g_ActiveContext.ObjectName) > 0 And Len(g_ActiveContext.FieldName) > 0 Then
        outObject = g_ActiveContext.ObjectName
        outField = g_ActiveContext.FieldName
        ResolveTarget = True
        Exit Function
    End If
    
    ' 3. No target available
    ResolveTarget = False
End Function
```

This is the **heart** of USING.  
Every verb now calls this one function.

---

# 🔱 **UPDATE ALL VERBS TO USE RESOLVER**

## MAKE

```vb
Public Sub CmdMake(ByVal explicitObject As String, ByVal explicitField As String, ByVal value As String)
    Dim obj As String, fld As String
    If Not ResolveTarget(explicitObject, explicitField, obj, fld) Then Exit Sub
    ApplyValueToTarget obj, fld, value
End Sub
```

---

## GIVE

```vb
Public Sub CmdGive(ByVal explicitObject As String, ByVal explicitField As String, ByVal value As Variant)
    Dim obj As String, fld As String
    If Not ResolveTarget(explicitObject, explicitField, obj, fld) Then Exit Sub
    ApplyValueToTarget obj, fld, value
End Sub
```

---

## SCAN

```vb
Public Function CmdScan(ByVal explicitObject As String, ByVal explicitField As String) As String
    Dim obj As String, fld As String
    If Not ResolveTarget(explicitObject, explicitField, obj, fld) Then Exit Function
    CmdScan = ReadValueFromTarget(obj, fld)
End Function
```

---

## SET

```vb
Public Sub CmdSet(ByVal explicitObject As String, ByVal explicitField As String, _
                  ByVal propertyName As String, ByVal propertyValue As Variant)
    Dim obj As String, fld As String
    If Not ResolveTarget(explicitObject, explicitField, obj, fld) Then Exit Sub
    ApplyPropertyToTarget obj, fld, propertyName, propertyValue
End Sub
```

---

# 🔱 **NOW USING IS GUARANTEED EVERYWHERE**

Because every verb now funnels through:

```
ResolveTarget()
```

USING is respected automatically.

No verb can break the rule.  
No dispatcher can break the rule.  
No future verb can break the rule.

This is **true CYBORG law** — centralized, atomic, unbreakable.

---

# 🔱 **If you want next:**

I can build:

### ✔ A full CYBORG debug tracer  
Shows every USING enter/exit and every resolved target.

### ✔ A USING block parser  
Supports:

```
USING TEXT1.TEXT
    MAKE "HELLO"
    GIVE "READY"
END USING
```

### ✔ A full interpreter loop  
Reads lines, tokenizes, dispatches, executes.

Just say:

**“BUILD THE DEBUG TRACER”**