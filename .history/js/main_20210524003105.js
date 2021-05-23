import { segments } from './impulses.js';
// Dolby format detection - taken from https://s3-us-west-1.amazonaws.com/dolbydeveloper/1.1.0/js/dolby.min.js
var Dolby = Dolby || {};
! function() {
    "use strict";
    Dolby.supportDDPlus = !1;
    var e = new Audio;
    "" != e.canPlayType('audio/mp4;codecs="ec-3"') && (-1 == navigator.userAgent.indexOf("CPU iPhone OS 9_3") && -1 == navigator.userAgent.indexOf("CPU OS 9_3") || -1 == navigator.userAgent.indexOf("Safari") || -1 == navigator.userAgent.indexOf("Version/9") || (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Mac OS X 10_1") && -1 != navigator.userAgent.indexOf("Safari") && -1 != navigator.userAgent.indexOf("Version/9") && (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Edge") && (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Windows Phone 10") && (Dolby.supportDDPlus = !1)), Dolby.checkDDPlus = function() { return Dolby.supportDDPlus }
}();
var dolbySupported = Dolby.checkDDPlus();
for (let i = 0; i < segments.length; i++) {
    let trackTemplate = $ `
<div class="album">
                      <div class="album__info">
                        <div class="album__info__art">
                          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/7022/whenDarkOut.jpg" alt="When It's Dark Out">
                        </div>
                        <div class="album__info__meta">
                          <div class="album__name">Bathroom</div>
                          <p>
                            Recorded in a tiled bathroom, which results in a
                            brighter sounding reverb due to the lack of wood or
                            fabric-covered walls.
                          </p>
                          <div class="album__actions">
                            <button class="button-dark play" id="play-0">
                              <i class="ion-ios-play"></i>
                            </button>
                            <button class="button-light" id="stop-0">
                              Stop
                            </button>
                            <button type="button" data-toggle="collapse" data-target="#effects0" aria-expanded="true" aria-controls="effects0" class="button-light effects">
                              EFFECTS ${i}
                            </button>
                          </div>
                        </div>
                        <div class="collapse in" id="effects0" aria-expanded="true" style="">
                          <div class="slider-group">
                            <div class="slider">
                                <label for="volume-0">Volume</label>
                                <input type="range" min="0" max="1" step="0.01" value="1" id="volume-0">
                                <div class="slider-value">1</div>
                            </div>
                            <div class="slider">
                                <label for="mix-0">Mix</label>
                                <input type="range" min="0" max="1" step="0.01" value="0.5" id="mix-0">
                                <div class="slider-value">0.5</div>
                            </div>
                        </div>
                        </div>
                      </div>
                    </div>`;
    console.log(trackTemplate);
    $('#impulse-responses').append(jQuery.trim(trackTemplate));
}

for (let i = 0; i < segments.length; i++) {
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

        segment.playButton.addEventListener('click', function(e) {
            if (segment.playButton.classList.contains('pause'))
                segment.audio.pause();
            else
                segment.audio.play();
        });

        segment.stopButton.addEventListener('click', function(e) {
            segment.audio.stop();
        });

        segment.volumeSlider.addEventListener('input', function(e) {
            var volumeDisplay = segment.volumeSlider.parentNode.getElementsByClassName('slider-value')[0];
            volumeDisplay.innerHTML = segment.audio.volume = e.target.valueAsNumber;
        });

        if (segment.releaseSlider) {
            segment.releaseSlider.addEventListener('input', function(e) {
                var releaseDisplay = segment.releaseSlider.parentNode.getElementsByClassName('slider-value')[0];
                releaseDisplay.innerHTML = segment.audio.release = e.target.valueAsNumber;
            });
        }

        if (segment.attackSlider) {
            segment.attackSlider.addEventListener('input', function(e) {
                var attackDisplay = segment.attackSlider.parentNode.getElementsByClassName('slider-value')[0];
                attackDisplay.innerHTML = segment.audio.attack = e.target.valueAsNumber;
            });
        }

        if (!segment.effects || !segment.effects.length)
            return;

        for (var i = 0; i < segment.effects.length; i++) {
            var effect = segment.effects[i];

            for (var key in effect.parameters) {
                (function(key, slider, instance) {

                    var display = slider.parentNode.getElementsByClassName('slider-value')[0];

                    slider.addEventListener('input', function(e) {
                        display.innerHTML = instance[key] = e.target.valueAsNumber;
                    });

                })(key, effect.parameters[key], effect.instance);
            }
        }

    })(segments[i]);
}