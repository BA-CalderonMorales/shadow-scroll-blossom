(
s.boot;
s.waitForBoot({
    SynthDef(\upbeat, {
        var beat = Impulse.ar(4);
        var env = Decay.kr(beat, 0.2);
        var sig = SinOsc.ar([440,660], 0, env) * 0.3;
        Out.ar(0, sig);
    }).add;
    s.sync;
    s.record(path: "../public/audio/upbeat.wav");
    Routine({ 8.do{ Synth(\upbeat); 0.5.wait; } }).play;
    4.wait;
    s.stopRecording;
    s.quit;
});
)
