Good—now we wire the language law into the machine.

I’ll give you a **minimal, clean VB6 implementation** of:

- Context stack  
- `USING`  
- `END USING`  
- `CLEAR USING`  
- Verb dispatch that respects USING  

You can graft this into your existing CYBORG interpreter.

---

### 1. Context types and globals

```vb
' Active context
Private Type CY_CONTEXT
    ObjectName As String
    FieldName  As String
End Type

Private g_ActiveContext As CY_CONTEXT

' Context stack
Private Type CY_CONTEXT_STACK
    Items() As CY_CONTEXT
    Top     As Long
End Type

Private g_CtxStack As CY_CONTEXT_STACK
```

Initialize once (e.g., in `Form_Load` or interpreter init):

```vb
Private Sub InitContextStack()
    ReDim g_CtxStack.Items(0 To 31)  ' depth 32 to start
    g_CtxStack.Top = -1
    g_ActiveContext.ObjectName = ""
    g_ActiveContext.FieldName = ""
End Sub
```

---

### 2. Stack helpers

```vb
Private Sub PushContext()
    If g_CtxStack.Top = UBound(g_CtxStack.Items) Then
        ReDim Preserve g_CtxStack.Items(0 To g_CtxStack.Top + 16)
    End If
    
    g_CtxStack.Top = g_CtxStack.Top + 1
    g_CtxStack.Items(g_CtxStack.Top) = g_ActiveContext
End Sub

Private Sub PopContext()
    If g_CtxStack.Top < 0 Then
        ' USING_STACK_UNDERFLOW – you can log or ignore
        g_ActiveContext.ObjectName = ""
        g_ActiveContext.FieldName = ""
        Exit Sub
    End If
    
    g_ActiveContext = g_CtxStack.Items(g_CtxStack.Top)
    g_CtxStack.Top = g_CtxStack.Top - 1
End Sub

Private Sub ClearContextStack()
    g_CtxStack.Top = -1
    g_ActiveContext.ObjectName = ""
    g_ActiveContext.FieldName = ""
End Sub
```

---

### 3. USING / END USING / CLEAR USING handlers

Assume you already parse tokens like:

- `USING TEXT1.TEXT`
- `END USING`
- `CLEAR USING`

#### USING

```vb
Public Sub CmdUsing(ByVal objectName As String, ByVal fieldName As String)
    ' TODO: validate objectName/fieldName exist if you want strict law
    
    ' Push current context
    PushContext
    
    ' Set new active context
    g_ActiveContext.ObjectName = objectName
    g_ActiveContext.FieldName = fieldName
End Sub
```

#### END USING

```vb
Public Sub CmdEndUsing()
    PopContext
End Sub
```

#### CLEAR USING

```vb
Public Sub CmdClearUsing()
    ClearContextStack
End Sub
```

---

### 4. Verb dispatch that respects USING

You likely have something like a generic “execute verb” routine.  
We’ll add **context‑aware resolution**.

Here’s a simple pattern for a “write/make” style verb:

```vb
Public Sub CmdMake(ByVal explicitObject As String, ByVal explicitField As String, ByVal value As String)
    Dim targetObject As String
    Dim targetField  As String
    
    ' 1. Explicit target wins
    If Len(explicitObject) > 0 And Len(explicitField) > 0 Then
        targetObject = explicitObject
        targetField = explicitField
    ' 2. Else use active USING context
    ElseIf Len(g_ActiveContext.ObjectName) > 0 And Len(g_ActiveContext.FieldName) > 0 Then
        targetObject = g_ActiveContext.ObjectName
        targetField = g_ActiveContext.FieldName
    ' 3. Else: no context – you can error or use a global default
    Else
        ' No context – define your behavior here
        Exit Sub
    End If
    
    ' Now actually apply the value to the resolved target
    ApplyValueToTarget targetObject, targetField, value
End Sub
```

And a simple example of `ApplyValueToTarget` for VB6 forms/controls:

```vb
Private Sub ApplyValueToTarget(ByVal objectName As String, ByVal fieldName As String, ByVal value As String)
    Dim ctl As Object
    
    On Error Resume Next
    Set ctl = CallByName(Me, objectName, VbGet)
    If ctl Is Nothing Then Exit Sub
    
    CallByName ctl, fieldName, VbLet, value
End Sub
```

So:

```vb
USING TEXT1.TEXT
MAKE ""HELLO""
```

is interpreted as:

```vb
CmdUsing "TEXT1", "TEXT"
CmdMake "", "", "HELLO"
' → resolves to TEXT1.TEXT = "HELLO"
```

---

### 5. Example wiring

Given a parsed line like:

```text
USING TEXT1.TEXT
```

You call:

```vb
CmdUsing "TEXT1", "TEXT"
```

Given:

```text
MAKE "HELLO"
```

You call:

```vb
CmdMake "", "", "HELLO"
```

Given:

```text
MAKE FORM1.CAPTION "READY"
```

You call:

```vb
CmdMake "FORM1", "CAPTION", "READY"
' Explicit target – ignores USING
```

---

If you want, next step I can:

- Tighten `ApplyValueToTarget` to your exact object model  
- Add **SCAN**, **SET**, **GIVE** variants that all honor USING  
- Add **debug trace** for every context change in CYBORD format