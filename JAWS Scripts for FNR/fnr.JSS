/*
JAWS scripts for the Find and Replace (FNR) open source tool.
https://github.com/accdc/fnr-for-jaws
Authored by Bryan Garaventa.
*/

Include "HjGlobal.jsh" ; default HJ global variables
Include "hjconst.jsh" ; default HJ constants
Include "common.jsm"

globals
object fsUIA
const
clsEdit = "WindowsForms10.EDIT.app.0.141b42a_r14_ad1",
clsText = "WindowsForms10.STATIC.app.0.141b42a_r14_ad1",
clsBtn = "WindowsForms10.BUTTON.app.0.141b42a_r14_ad1",
clsREdit = "WindowsForms10.RichEdit20W.app.0.141b42a_r14_ad1"

Void Function FocusChangedEvent (handle FocusWindow, handle PrevWindow)
var handle next, int found = 0

if GetWindowClass (FocusWindow) == clsEdit
next = GetNextWindow (FocusWindow)
if GetWindowClass (next) == clsText && GetWindowName (next) == "Dir:"
found = 1
Say ("Search Folder:", 0, 0)
Say ("Alt+S", 0, 0)
elIf GetWindowClass (next) == clsText && GetWindowName (next) == "Exclude Dir:"
found = 1
Say ("Exclude Folder:", 0, 0)
Say ("Alt+E", 0, 0)
elIf GetWindowClass (next) == clsText && GetWindowName (next) == "File Mask:"
found = 1
Say ("File Mask:", 0, 0)
Say ("Alt+M", 0, 0)
elIf GetWindowClass (next) == clsText && GetWindowName (next) == "Exclude Mask:"
found = 1
Say ("Exclude Mask:", 0, 0)
else
FocusChangedEvent (FocusWindow, PrevWindow)
endIf
if found
Say ("Edit", 0, 0)
endIf
Say (GetEditFieldText (FocusWindow), 0, 0)

elIf GetWindowClass (FocusWindow) == clsBtn
next = GetNextWindow (GetNextWindow (FocusWindow))
if GetWindowClass (next) == clsText && GetWindowName (next) == "Dir:"
found = 1
Say ("Browse Folder:", 0, 0)
Say ("Control+B", 0, 0)
else
FocusChangedEvent (FocusWindow, PrevWindow)
endIf
if found
SayLine ()
endIf

elIf GetWindowClass (FocusWindow) == clsREdit
if GetWindowName (GetFirstChild (GetNextWindow (GetParent (FocusWindow)))) == "Replace"
found = 1
Say ("Find:", 0, 0)
Say ("Alt+F", 0, 0)
elIf GetWindowName (GetFirstChild (GetNextWindow (GetNextWindow (GetParent (FocusWindow))))) == "Replace"
found = 1
Say ("Replace:", 0, 0)
Say ("Alt+R", 0, 0)
else
FocusChangedEvent (FocusWindow, PrevWindow)
endIf
if found
Say ("Edit", 0, 0)
endIf
Say (GetRichEditFieldText (FocusWindow), 0, 0)

else
FocusChangedEvent (FocusWindow, PrevWindow)
endIf
EndFunction

String Function GetRichEditFieldText (handle hwnd)
var object d = GetRichEditDocument (hwnd)
var object range = d.selection.duplicate
range.expand(6)
var string s = range.text
return s
EndFunction

String Function GetEditFieldText (handle hwnd)
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
var object v = o.GetValuePattern()
return v.Value
EndFunction

Script SayWindowPromptAndText()
var handle next, int found = 0, handle FocusWindow = GetFocus ()

if GetWindowClass (FocusWindow) == clsEdit
next = GetNextWindow (FocusWindow)
if GetWindowClass (next) == clsText && GetWindowName (next) == "Dir:"
found = 1
Say ("Search Folder:", 0, 0)
Say ("Alt+S", 0, 0)
elIf GetWindowClass (next) == clsText && GetWindowName (next) == "Exclude Dir:"
found = 1
Say ("Exclude Folder:", 0, 0)
Say ("Alt+E", 0, 0)
elIf GetWindowClass (next) == clsText && GetWindowName (next) == "File Mask:"
found = 1
Say ("File Mask:", 0, 0)
Say ("Alt+M", 0, 0)
elIf GetWindowClass (next) == clsText && GetWindowName (next) == "Exclude Mask:"
found = 1
Say ("Exclude Mask:", 0, 0)
else
PerformScript SayWindowPromptAndText()
endIf
if found
Say ("Edit", 0, 0)
endIf
Say (GetEditFieldText (FocusWindow), 0, 0)

elIf GetWindowClass (FocusWindow) == clsBtn
next = GetNextWindow (GetNextWindow (FocusWindow))
if GetWindowClass (next) == clsText && GetWindowName (next) == "Dir:"
found = 1
Say ("Browse Folder:", 0, 0)
Say ("Control+B", 0, 0)
else
PerformScript SayWindowPromptAndText()
endIf
if found
SayLine ()
endIf

elIf GetWindowClass (FocusWindow) == clsREdit
if GetWindowName (GetFirstChild (GetNextWindow (GetParent (FocusWindow)))) == "Replace"
found = 1
Say ("Find:", 0, 0)
Say ("Alt+F", 0, 0)
elIf GetWindowName (GetFirstChild (GetNextWindow (GetNextWindow (GetParent (FocusWindow))))) == "Replace"
found = 1
Say ("Replace:", 0, 0)
Say ("Alt+R", 0, 0)
else
PerformScript SayWindowPromptAndText()
endIf
if found
Say ("Edit", 0, 0)
endIf
Say (GetRichEditFieldText (FocusWindow), 0, 0)

else
PerformScript SayWindowPromptAndText()
endIf
EndScript

Script MoveToBrowseBtn ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetFirstChild (GetFirstChild (GetPriorWindow (GetLastWindow (GetFirstChild (top)))))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
Pause ()
{space}
EndScript

Script MoveToSearchEdit ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetNextWindow (GetFirstChild (GetFirstChild (GetPriorWindow (GetLastWindow (GetFirstChild (top))))))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript

Script MoveToExcludeEdit ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetNextWindow (GetFirstChild (GetPriorWindow (GetLastWindow (GetFirstChild (top)))))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript

Script MoveToFileMaskEdit ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetPriorWindow (FindWindow (top, clsText, "File Mask:"))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript

Script MoveToFindField ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetFirstChild (GetPriorWindow (GetPriorWindow (FindWindow (top, clsText, "Replace:"))))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript

Script MoveToReplaceField ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetFirstChild (GetPriorWindow (GetPriorWindow (GetPriorWindow (FindWindow (top, clsText, "Replace:")))))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript

Script MoveToFindBtn ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = FindWindow (top, clsBtn, "Find Only")
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
Pause ()
{space}
EndScript

Script MoveToReplaceBtn ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = FindWindow (top, clsBtn, "Replace")
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
Pause ()
{space}
EndScript

Script MoveToResultsField ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetNextWindow (GetNextWindow (FindWindow (top, clsText, "Results:")))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript

Script MoveToPreviewField ()
var handle top = GetTopLevelWindow (GetFocus ())
var handle hwnd = GetNextWindow (FindWindow (top, clsText, "Results:"))
if !fsUIA
let fsUIA = CreateObjectEx ("FreedomSci.UIA", false, "UIAScriptAPI.x.manifest")
endIf
var object o = fsUIA.GetElementFromHandle(hwnd)
o.SetFocus()
EndScript
