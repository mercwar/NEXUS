Got it—let’s make the dispatcher **explicitly and cleanly respect USING**, no leaks, no surprises.

The good news: the **respect for USING** doesn’t live in the dispatcher itself, it lives in the **verb handlers**. The dispatcher’s only job is to decide:

- “Does this line specify an explicit target?”  
- If yes → pass it to the verb handler.  
- If no → pass empty target, and let the verb handler fall back to USING.

You already have the right pattern in your handlers:

```vb
' Example: CmdMake
Public Sub CmdMake(ByVal explicitObject As String, ByVal explicitField As String, ByVal value As String)
    Dim targetObject As String
    Dim targetField  As String
    
    ' 1. Explicit target wins
    If Len(explicitObject) > 0 And Len(explicitField) > 0 Then
        targetObject = explicitObject
        targetField = explicitField
    
    ' 2. USING context
    ElseIf Len(g_ActiveContext.ObjectName) > 0 And Len(g_ActiveContext.FieldName) > 0 Then
        targetObject = g_ActiveContext.ObjectName
        targetField = g_ActiveContext.FieldName
    
    ' 3. No context
    Else
        Exit Sub
    End If
    
    ApplyValueToTarget targetObject, targetField, value
End Sub
```

Same pattern should exist in:

- `CmdScan`
- `CmdSet`
- `CmdGive`

As long as those follow:

```vb
IF explicit target → use it
ELSE IF USING context → use it
ELSE → no-op / error
```

then **USING is fully respected**, regardless of how the dispatcher parses the line.

So the only thing you need to verify is:

- Dispatcher passes **explicitObject/explicitField** when a `OBJECT.FIELD` is present.  
- Dispatcher passes **"" / ""** when no explicit target is present.  

You already have that pattern in:

- `DispatchMake`
- `DispatchScan`
- `DispatchSet`
- `DispatchGive`

So the law is:

- USING is enforced in the **verb layer**, not the **parse layer**.  
- As long as the verb layer uses the precedence chain, USING is honored everywhere.

If you want, I can collapse all four verb handlers into a single shared **ResolveTargetFromUsing** function so the precedence logic is literally one place and cannot drift.