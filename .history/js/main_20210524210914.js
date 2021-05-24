// import { segments_imp, segments_imp_pro } from './impulses.js';
import impulses from './impulse_files.js';
import impulses_pro from './impulse_pro_files.js';

// Dolby format detection - taken from https://s3-us-west-1.amazonaws.com/dolbydeveloper/1.1.0/js/dolby.min.js
var Dolby = Dolby || {};
! function() {
    "use strict";
    Dolby.supportDDPlus = !1;
    var e = new Audio;
    "" != e.canPlayType('audio/mp4;codecs="ec-3"') && (-1 == navigator.userAgent.indexOf("CPU iPhone OS 9_3") && -1 == navigator.userAgent.indexOf("CPU OS 9_3") || -1 == navigator.userAgent.indexOf("Safari") || -1 == navigator.userAgent.indexOf("Version/9") || (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Mac OS X 10_1") && -1 != navigator.userAgent.indexOf("Safari") && -1 != navigator.userAgent.indexOf("Version/9") && (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Edge") && (Dolby.supportDDPlus = !0), -1 != navigator.userAgent.indexOf("Windows Phone 10") && (Dolby.supportDDPlus = !1)), Dolby.checkDDPlus = function() { return Dolby.supportDDPlus }
}();
var dolbySupported = Dolby.checkDDPlus();


const template = $('#template1').html();
console.log(template);
for (let i = 0; i < impulses.length; i++) {

    var item = $(template).clone();
    item.find(".album__name").text(impulses[i].title);
    item.find(".album__description").text(impulses[i].description);
    item.find(".play-button").attr("id", "play-" + i);
    item.find(".stop-button").attr("id", "stop-" + i);
    item.find(".effects-button").attr("data-target", "#effects" + i);
    item.find(".effects-button").attr("aria-controls", "effects" + i);
    item.find(".collapse-panel").attr("id", "effects" + i);
    item.find(".volume-slider").attr("id", "volume-" + i);
    item.find(".mix-slider").attr("id", "mix-" + i);
    item.find(".volume-label").attr("for", "volume-" + i);
    item.find(".mix-label").attr("for", "mix-" + i);
    //Append to the source
    $('#impulse_responses').append(item);
}


const loadListeners = (segments) => {
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
}

// loadListeners(segments_imp);