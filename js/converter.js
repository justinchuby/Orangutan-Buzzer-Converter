'use strict';
var convert = function (txt, noteLen, silentLen) {
    var notes = txt.split(/\s*\,\s*|\s+/);
    for (var i = 0; i < notes.length; i++) {
        notes[i] = notes[i].trim();
    }
    return convertFromList(notes, noteLen, silentLen);
};

var convertFromList = function (notes, noteLen, silentLen) {
    var melody = [];
    var duration = [];
    if (noteLen) {
        var NOTE_LEN = noteLen;
    } else {
        var NOTE_LEN = 250;
    }
    if (silentLen) {
        var SILENT_LEN = silentLen;
    } else {
        var SILENT_LEN = 30;
    }

    var NOTE_RE = /(\d)(\d?)(\-*)/;
    var NOTE_MAP = {
        "0": "SILENT_NOTE",
        "1": "NOTE_C",
        "2": "NOTE_D",
        "3": "NOTE_E",
        "4": "NOTE_F",
        "5": "NOTE_G",
        "6": "NOTE_A",
        "7": "NOTE_B",
    };
    var prevNote = {};

    for (var j = 0; j < notes.length; j++) {
        var noteRaw = notes[j];
        // console.log(noteRaw);
        var match = noteRaw.match(NOTE_RE);

        if (match) {
            var note = {
                "raw": noteRaw,
                "name": "",
                "num": match[1],
                "octave": match[2],
                "tie": match[3],
                "string": ""
            };
            if (note.num in NOTE_MAP) {
                note.name = NOTE_MAP[note.num];
            } else {
                note.name = NOTE_MAP["0"];
            }
            if (!note.octave) {
                note.octave = 5;
            }
            if (!note.tie) {
                note.tie = 1;
            } else {
                note.tie = note.tie.length + 1;
            }
            if (note.name === NOTE_MAP["0"]) {
                note.string = note.name;
            } else {
                note.string = note.name + "(" + note.octave + ")";
            }

            // console.log("note.string " + note.string);

            if (note.name === NOTE_MAP["0"] || note.name !== prevNote.name || note.octave !== prevNote.octave) {
                melody = melody.concat([note.string]);
                duration = duration.concat([NOTE_LEN * note.tie]);
            } else {
                melody = melody.concat([NOTE_MAP["0"], note.string]);
                duration = duration.concat([SILENT_LEN, NOTE_LEN * note.tie - SILENT_LEN]);
            }
        }

        prevNote = note;
    }
    return({"melody": melody.join(", "), "duration": duration.join(", ")});
};
