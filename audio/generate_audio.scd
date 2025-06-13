{
    |freq = 440|
    SinOsc.ar(freq, 0, 0.2) ! 2
}.play;

// To render to an audio file, evaluate:
// s.record(duration: 2, server: s);
// (\freq: 440).play;
// s.stopRecording;
