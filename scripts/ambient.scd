(
s.boot;
s.waitForBoot({
    SynthDef(\ambient, { |freq=220|
        var osc1 = SinOsc.ar(freq, 0, 0.15);
        var osc2 = SinOsc.ar(freq*1.5, 0, 0.1);
        var osc3 = SinOsc.ar(freq*0.5, 0, 0.1);
        var mix = (osc1 + osc2 + osc3) * 0.3;
        var env = EnvGen.kr(Env.linen(0.5, 2, 0.5), doneAction:2);
        Out.ar(0, mix * env ! 2);
    }).add;
    s.sync;
    s.record(path: "../public/audio/ambient.wav");
    Synth(\ambient);
    4.wait;
    s.stopRecording;
    s.quit;
});
)
