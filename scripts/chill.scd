(
s.boot;
s.waitForBoot({
    SynthDef(\chill, { |freq=440|
        var env = EnvGen.kr(Env.perc(0.05, 1), doneAction:2);
        Out.ar(0, SinOsc.ar(freq, 0, 0.2) * env ! 2);
    }).add;
    s.sync;
    s.record(path: "../public/audio/chill.wav");
    Synth(\chill);
    3.wait;
    s.stopRecording;
    s.quit;
});
)
