# fnr-for-jaws
JAWS scripts for the Find and Replace (FNR) open source tool.

Intro
-----

Find and Replace (FNR) is an open source tool to find and replace text in multiple files. It can quickly search through large numbers of files and also find the information using regular expressions specifying the form of what you want, instead of literal text.
http://findandreplace.io/overview

Example: Regular Expression for recursively searching for and replacing image elements without alt attributes.

Search for: `(<img(?!.*?alt=(['"]).*?\2)[^>]*?)(/?>)`

Replace with: `$1 alt="" $3`

This will automatically skip all img elements that already include alt attributes, but will add alt="" to all others that don't.

JAWS scripts are included to make the FNR application accessible for screen reader users.

Extra JAWS Screen Reader Commands
-----

After a Find or Replace action is performed:

* Press Alt+V to view the results table.
* Press Alt+P to set focus to the Preview window.

All other JAWS hotkeys are announced while moving focus between fields so that focus can quickly be moved back and forth between them.

How to Install the JAWS Scripts
-----

* Copy the files within the JAWS Script Files into the JAWS For Windows script files folder. This is typically located in the path: `"%appdata%\Freedom Scientific\JAWS\2019\Settings\ENU"`, where the number 2019 should be changed to match the JAWS version where the scripts are being installed.

Distributed under the terms of the Open Source Initiative OSI - MIT License.

Developed and maintained by: Bryan Garaventa https://www.linkedin.com/in/bgaraventa
Or on Twitter at https://twitter.com/bryanegaraventa
