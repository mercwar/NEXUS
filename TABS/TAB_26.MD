Here’s a **straight, VB6‑ready verb dispatcher** that routes:

- USING / END USING / CLEAR USING  
- MAKE  
- SCAN  
- SET  
- GIVE  

into the handlers we already defined.

It assumes you already have:

- `CmdUsing`, `CmdEndUsing`, `CmdClearUsing`  
- `CmdMake`, `CmdScan`, `CmdSet`, `CmdGive`  
- A tokenizer that can give you a `tokens()` array (simple Split is fine for now).

---

### 1. Core dispatcher

```vb
Public Sub ExecuteCommand(ByVal line As String)
    Dim tokens() As String
    Dim verb As String
    
    line = Trim$(line)
    If Len(line) = 0 Then Exit Sub
    
    tokens = Split(line, " ")
    verb = UCase$(tokens(0))
    
    Select Case verb
        Case "USING"
            DispatchUsing tokens
        Case "END"
            DispatchEnd tokens
        Case "CLEAR"
            DispatchClear tokens
        Case "MAKE"
            DispatchMake tokens
        Case "SCAN"
            DispatchScan tokens
        Case "SET"
            DispatchSet tokens
        Case "GIVE"
            DispatchGive tokens
        Case Else
            ' Unknown verb – ignore or log
    End Select
End Sub
```

---

### 2. USING / END USING / CLEAR USING

```vb
Private Sub DispatchUsing(tokens() As String)
    ' USING OBJECT.FIELD
    If UBound(tokens) < 1 Then Exit Sub
    
    Dim obj As String, fld As String
    Dim parts() As String
    
    parts = Split(tokens(1), ".")
    If UBound(parts) <> 1 Then Exit Sub
    
    obj = parts(0)
    fld = parts(1)
    
    CmdUsing obj, fld
End Sub

Private Sub DispatchEnd(tokens() As String)
    ' END USING
    If UBound(tokens) < 1 Then Exit Sub
    If UCase$(tokens(1)) = "USING" Then
        CmdEndUsing
    End If
End Sub

Private Sub DispatchClear(tokens() As String)
    ' CLEAR USING
    If UBound(tokens) < 1 Then Exit Sub
    If UCase$(tokens(1)) = "USING" Then
        CmdClearUsing
    End If
End Sub
```

---

### 3. MAKE

Two forms:

- `MAKE "HELLO"` → uses USING context  
- `MAKE TEXT1.TEXT "HELLO"` → explicit target

```vb
Private Sub DispatchMake(tokens() As String)
    Dim explicitObj As String
    Dim explicitFld As String
    Dim value As String
    
    If UBound(tokens) < 1 Then Exit Sub
    
    ' If second token contains a dot, treat as OBJECT.FIELD
    If InStr(tokens(1), ".") > 0 Then
        Dim parts() As String
        parts = Split(tokens(1), ".")
        If UBound(parts) <> 1 Then Exit Sub
        
        explicitObj = parts(0)
        explicitFld = parts(1)
        
        ' Value is next token (simple version)
        If UBound(tokens) >= 2 Then
            value = StripQuotes(tokens(2))
        End If
    Else
        ' No explicit target – value is tokens(1)
        value = StripQuotes(tokens(1))
    End If
    
    CmdMake explicitObj, explicitFld, value
End Sub
```

---

### 4. SCAN

Two forms:

- `SCAN` → uses USING context  
- `SCAN TEXT1.TEXT` → explicit target

```vb
Private Sub DispatchScan(tokens() As String)
    Dim explicitObj As String
    Dim explicitFld As String
    Dim result As String
    
    If UBound(tokens) >= 1 Then
        If InStr(tokens(1), ".") > 0 Then
            Dim parts() As String
            parts = Split(tokens(1), ".")
            If UBound(parts) = 1 Then
                explicitObj = parts(0)
                explicitFld = parts(1)
            End If
        End If
    End If
    
    result = CmdScan(explicitObj, explicitFld)
    ' You can route result to TEXT1, log, etc.
End Sub
```

---

### 5. SET

Form:

- `SET TEXT1 ENABLED FALSE`  
- `SET ENABLED FALSE` (uses USING object; field may be implied or same object)

For now, we’ll assume:

- `SET OBJECT.FIELD PROPERTY VALUE`  
- or `SET PROPERTY VALUE` with USING.

```vb
Private Sub DispatchSet(tokens() As String)
    Dim explicitObj As String
    Dim explicitFld As String
    Dim propName As String
    Dim propValue As String
    
    If UBound(tokens) < 2 Then Exit Sub
    
    Dim idx As Long
    idx = 1
    
    ' Check for OBJECT.FIELD
    If InStr(tokens(idx), ".") > 0 Then
        Dim parts() As String
        parts = Split(tokens(idx), ".")
        If UBound(parts) = 1 Then
            explicitObj = parts(0)
            explicitFld = parts(1)
            idx = idx + 1
        End If
    End If
    
    If UBound(tokens) < idx + 1 Then Exit Sub
    
    propName = UCase$(tokens(idx))
    propValue = StripQuotes(tokens(idx + 1))
    
    CmdSet explicitObj, explicitFld, propName, propValue
End Sub
```

---

### 6. GIVE

Form:

- `GIVE "READY"` → uses USING  
- `GIVE TEXT1.TEXT "READY"` → explicit

```vb
Private Sub DispatchGive(tokens() As String)
    Dim explicitObj As String
    Dim explicitFld As String
    Dim value As String
    
    If UBound(tokens) < 1 Then Exit Sub
    
    If InStr(tokens(1), ".") > 0 Then
        Dim parts() As String
        parts = Split(tokens(1), ".")
        If UBound(parts) <> 1 Then Exit Sub
        
        explicitObj = parts(0)
        explicitFld = parts(1)
        
        If UBound(tokens) >= 2 Then
            value = StripQuotes(tokens(2))
        End If
    Else
        value = StripQuotes(tokens(1))
    End If
    
    CmdGive explicitObj, explicitFld, value
End Sub
```

---

### 7. Simple quote stripper

```vb
Private Function StripQuotes(ByVal s As String) As String
    s = Trim$(s)
    If Len(s) >= 2 Then
        If Left$(s, 1) = """" And Right$(s, 1) = """" Then
            s = Mid$(s, 2, Len(s) - 2)
        End If
    End If
    StripQuotes = s
End Function
```

---

This gives you a **single entry point**:

```vb
ExecuteCommand "USING TEXT1.TEXT"
ExecuteCommand "MAKE ""HELLO"""
ExecuteCommand "GIVE ""READY"""
ExecuteCommand "END USING"
```

All verbs now:

- Respect USING  
- Allow explicit override  
- Share the same precedence law  

If you want, next step I can tighten this to your exact CYBORG syntax (multi‑word verbs, modes, etc.) or wire it directly to TEXT1.TEXT as your canonical output channel.