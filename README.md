# orangutan-buzz
Orangutan Buzzer Converter

This is a simple web application that converts music notes into one of the Orangutan usable function representation.

## Syntax

- Each note is a two digit number, the first digit being the note and the second representing the octave. For example, the Middle C is just "14". Specifically, a rest is represented by "0"
- You can add dashes to extend a note. For example, a whole C4 would become "14---"
- Valid separators are comma (",") or space (" ")

## Example

*Immortal*
```
0,16,75,65,75,65,35,65,0,16,75,75,75,65,65,0,0,16,75,65,75,65,35,65,0,16,75,65,75,0,65,0
```

would be translated to

```c
//Melody:
SILENT_NOTE, C(6), B(5), A(5), B(5), A(5), E(5), A(5), SILENT_NOTE, C(6), B(5), SILENT_NOTE, B(5), SILENT_NOTE, B(5), A(5), SILENT_NOTE, A(5), SILENT_NOTE, SILENT_NOTE, C(6), B(5), A(5), B(5), A(5), E(5), A(5), SILENT_NOTE, C(6), B(5), A(5), B(5), SILENT_NOTE, A(5), SILENT_NOTE 
//Time:
250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 30, 220, 30, 220, 250, 30, 220, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250
```
