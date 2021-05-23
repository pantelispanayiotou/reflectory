import { segments } from './impulses.js';

// Dolby format detection - taken from https://s3-us-west-1.amazonaws.com/dolbydeveloper/1.1.0/js/dolby.min.js
var Dolby = Dolby || {};
!(function() {
    "use strict";
    Dolby.supportDDPlus = !1;
    var e = new Audio();
    "" != e.canPlayType('audio/mp4;codecs="ec-3"') &&
        ((-1 == navigator.userAgent.indexOf("CPU iPhone OS 9_3") &&
                -1 == navigator.userAgent.indexOf("CPU OS 9_3")) ||
            -1 == navigator.userAgent.indexOf("Safari") ||
            -1 == navigator.userAgent.indexOf("Version/9") ||
            (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Mac OS X 10_1") &&
            -1 != navigator.userAgent.indexOf("Safari") &&
            -1 != navigator.userAgent.indexOf("Version/9") &&
            (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Edge") && (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Windows Phone 10") &&
            (Dolby.supportDDPlus = !1)),
        (Dolby.checkDDPlus = function() {
            return Dolby.supportDDPlus;
        });
})();
var dolbySupported = Dolby.checkDDPlus();

// Effects
var delay = new Pizzicato.Effects.Delay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5,
});
var pingPongDelay = new Pizzicato.Effects.PingPongDelay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5,
});
var dubDelay = new Pizzicato.Effects.DubDelay({
    feedback: 0.6,
    time: 0.7,
    mix: 0.5,
    cutoff: 700,
});

var compressor = new Pizzicato.Effects.Compressor({
    threshold: -24,
    ratio: 12,
});
var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 400,
    peak: 10,
});
var highPassFilter = new Pizzicato.Effects.HighPassFilter({
    frequency: 10,
    peak: 10,
});
var distortion = new Pizzicato.Effects.Distortion({
    gain: 0.4,
});
var quadrafuzz = new Pizzicato.Effects.Quadrafuzz();
var flanger = new Pizzicato.Effects.Flanger();
var stereoPanner = new Pizzicato.Effects.StereoPanner();
var reverb = new Pizzicato.Effects.Reverb();
var convolver = new Pizzicato.Effects.Convolver({
    impulse: "./audio/scala-milan.wav",
});
var tremolo = new Pizzicato.Effects.Tremolo({
    speed: 7,
    mix: 0.8,
    depth: 0.8,
});
var ringModulator = new Pizzicato.Effects.RingModulator({
    speed: 30,
    distortion: 1,
    mix: 0.5,
});

// Sounds
var sineWave = new Pz.Sound();
var sineWaveRelease = new Pz.Sound({
    source: "wave",
    options: { frequency: 220, release: 1, attack: 0.5 },
});
var acoustic = new Pz.Sound(
    dolbySupported ? "./audio/acoustic_Dolby.mp4" : "./audio/acoustic.mp3"
);

var timba = new Pz.Sound({
        source: "file",
        options: {
            path: dolbySupported ? "./audio/timba_Dolby.mp4" : "./audio/timba.mp3",
            loop: true,
        },
    },
    function() {
        timba.addEffect(delay);
    }
);

var electro = new Pz.Sound({
        source: "file",
        options: {
            path: dolbySupported ?
                "./audio/electro_Dolby.mp4" : "./audio/electro.mp3",
            loop: true,
        },
    },
    function() {
        electro.addEffect(compressor);
    }
);

var synth = new Pz.Sound({
        source: "file",
        options: {
            path: dolbySupported ? "./audio/synth_Dolby.mp4" : "./audio/synth.mp3",
            loop: true,
        },
    },
    function() {
        synth.addEffect(lowPassFilter);
    }
);

var synth2 = new Pz.Sound({
        source: "file",
        options: {
            path: dolbySupported ? "./audio/synth2_Dolby.mp4" : "./audio/synth2.mp3",
            loop: true,
        },
    },
    function() {
        synth2.addEffect(highPassFilter);
    }
);

var guitar = new Pz.Sound({
        source: "file",
        options: {
            path: dolbySupported ? "./audio/guitar_Dolby.mp4" : "./audio/guitar.mp3",
            loop: true,
        },
    },
    function() {
        guitar.addEffect(distortion);
    }
);

var walkGuitar = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/uttl.mp3",
            loop: true,
        },
    },
    function() {
        walkGuitar.addEffect(quadrafuzz);
    }
);

var electricGuitar = new Pz.Sound({
        source: "file",
        options: {
            path: dolbySupported ?
                "./audio/electric-guitar_Dolby.mp4" : "./audio/electric-guitar.mp3",
            loop: true,
        },
    },
    function() {
        electricGuitar.addEffect(flanger);
    }
);

var wah = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/wah.mp3",
            loop: true,
        },
    },
    function() {
        wah.addEffect(pingPongDelay);
    }
);

var chop = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/chop.mp3",
            loop: true,
        },
    },
    function() {
        chop.addEffect(dubDelay);
    }
);

var stanceBass = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/stance-bass.mp3",
            loop: true,
        },
    },
    function() {
        stanceBass.addEffect(stereoPanner);
    }
);

var cavaquinho = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/cavaquinho.mp3",
            loop: true,
        },
    },
    function() {
        cavaquinho.addEffect(reverb);
    }
);

var tremoloGuitar = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/tremolo-guitar.mp3",
            loop: true,
        },
    },
    function() {
        tremoloGuitar.addEffect(tremolo);
    }
);

var whiteNoise = new Pz.Sound(function(e) {
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < e.outputBuffer.length; i++) output[i] = Math.random();
});

var countdown = new Pz.Sound({
        source: "file",
        options: {
            path: "./audio/countdown.mp3",
            loop: true,
        },
    },
    function() {
        countdown.addEffect(ringModulator);
    }
);




for (var i = 0; i < segments.length; i++) {
    (function(segment) {
        segment.audio.on("play", function() {
            $(segment.playButton)
                .find("i")
                .removeClass("ion-ios-play")
                .addClass("ion-ios-pause");
            segment.playButton.classList.add("pause");
        });

        segment.audio.on("stop", function() {
            if ($(segment.playButton).find("ios-ion-pause")) {
                $(segment.playButton)
                    .find("i")
                    .removeClass("ion-ios-pause")
                    .addClass("ion-ios-play");
            }
            segment.playButton.classList.remove("pause");
        });

        segment.audio.on("pause", function() {
            $(segment.playButton)
                .find("i")
                .removeClass("ion-ios-pause")
                .addClass("ion-ios-play");
            segment.playButton.classList.remove("pause");
        });

        segment.playButton.addEventListener("click", function(e) {
            if (segment.playButton.classList.contains("pause")) segment.audio.pause();
            else segment.audio.play();
        });

        segment.stopButton.addEventListener("click", function(e) {
            segment.audio.stop();
        });

        segment.volumeSlider.addEventListener('input', function(e) {
            var volumeDisplay = segment.volumeSlider.parentNode.getElementsByClassName('slider-value')[0];
            volumeDisplay.innerHTML = segment.audio.volume = e.target.valueAsNumber;
        });



        //		if (segment.releaseSlider) {
        //			segment.releaseSlider.addEventListener('input', function(e) {
        //				var releaseDisplay = segment.releaseSlider.parentNode.getElementsByClassName('slider-value')[0];
        //				releaseDisplay.innerHTML = segment.audio.release = e.target.valueAsNumber;
        //			});
        //		}
        //
        //		if (segment.attackSlider) {
        //			segment.attackSlider.addEventListener('input', function(e) {
        //				var attackDisplay = segment.attackSlider.parentNode.getElementsByClassName('slider-value')[0];
        //				attackDisplay.innerHTML = segment.audio.attack = e.target.valueAsNumber;
        //			});
        //		}

        if (!segment.effects || !segment.effects.length) return;

        for (var i = 0; i < segment.effects.length; i++) {
            var effect = segment.effects[i];

            for (var key in effect.parameters) {
                (function(key, slider, instance) {
                    var display =
                        slider.parentNode.getElementsByClassName("slider-value")[0];
                    console.log(slider);
                    slider.addEventListener("input", function(e) {
                        display.innerHTML = instance[key] = e.target.valueAsNumber;

                    });
                })(key, effect.parameters[key], effect.instance);
            }
        }
    })(segments[i]);
}