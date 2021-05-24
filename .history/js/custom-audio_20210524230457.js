export const loadListeners = (segments) => {
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
                console.log(segment.audio)
            });

            segment.volumeSlider.addEventListener('input', function(e) {
                console.log(segment.volumeSlider);
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