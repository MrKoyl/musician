export default class Musician {

    constructor(type = 'triangle') {
        this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this._audio = this._audioContext.createOscillator();
        this._audioContext.type = type;
    }

    static getNote({octave, note}) {
        if (note) {
            const notes = {
                b2: {
                    C: 16.352,
                    D: 18.354,
                    E: 20.602,
                    F: 21.827,
                    G: 24.500,
                    A: 27.500,
                    B: 30.868
                }
            };
            return notes[octave || 1][note];
        }
        throw "No note was given!";
    }

    play(sound, duration) {
        if (sound && duration) {
            this._audio.frequency.setValueAtTime(Musician.getNote(sound), this._audioContext.currentTime);
            this._audio.connect(this._audioContext.destination);
            this._audio.start();
            setTimeout(() => {this._audio.stop()}, duration);
        }
    }
}