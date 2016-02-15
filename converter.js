var convert = function (txt, noteLen, silentLen) {
    var notes = txt.split(/\s*\,\s*|\s+/);
    for (var i = 0; i < notes.length; i++) {
        notes[i] = notes[i].trim();
    };
    return convertFromList(notes, noteLen, silentLen);
};

var convertFromList = function (notes, noteLen, silentLen) {
    var melody = [];
    var time = [];
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

    const NOTE_RE = /(\d)(\d?)(\-*)/;
    const NOTE_MAP = {
        "0": "SILENT_NOTE",
        "1": "C",
        "2": "D",
        "3": "E",
        "4": "F",
        "5": "G",
        "6": "A",
        "7": "B",
    };
    var prevNote = ""

    for (var j = 0; j < notes.length; j++) {
        var noteRaw = notes[j];
        console.log(noteRaw);
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
                note.name = NOTE_MAP["0"]
            }
            if (!note.octave) {
                note.octave = 5;
            };
            if (!note.tie) {
                note.tie = 1;
            } else {
                note.tie = note.tie.length + 1;
            };
            if (note.name === NOTE_MAP["0"]) {
                note.string = note.name;
            } else {
                note.string = note.name + "(" + note.octave + ")";
            };

            console.log("note.string " + note.string);

            if (note.name === NOTE_MAP["0"] || note.name !== prevNote.name || note.octave !== prevNote.octave) {
                melody = melody.concat([note.string]);
                time = time.concat([NOTE_LEN * note.tie]);
            } else {
                melody = melody.concat([NOTE_MAP["0"], note.string]);
                time = time.concat([SILENT_LEN, NOTE_LEN * note.tie - SILENT_LEN]);
            };
        };

        prevNote = note;
    };
    return({"melody": melody.join(", "), "time": time.join(", ")});
};
