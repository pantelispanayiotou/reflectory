import impulses from './impulse_files.js';
import impulses_pro from './impulse_pro_files.js';

const loadAudio = (path_name, convolver) => {
    const audio = new Pz.Sound({
            source: "file",
            options: {
                path: path_name,
                loop: true,
            },
        },
        function(error) {
            audio.addEffect(convolver);
        }
    );
    return audio;
};

const loadConvolver = (root_path, path_name) => {
    return new Pz.Effects.Convolver({ impulse: root_path + path_name });
};

const appendElements = (idToAppend, impulses, idToSelect) => {
    for (let i = 0; i < impulses.length; i++) {
        const template = $(idToSelect).html();
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
        $(idToAppend).append(item);
    }
}

const shapeObject = (root_path, files) => {
    const array = new Array();
    files.map((impulse, i) => {
        const convolver = loadConvolver(root_path, impulse.track);
        const audio = loadAudio("./audio/drums.mp3", convolver);
        let imp = {
            audio: audio,
            playButton: document.getElementById("play-" + i),
            stopButton: document.getElementById("stop-" + i),
            volumeSlider: document.getElementById("volume-" + i),
            effects: [{
                instance: convolver,
                parameters: {
                    mix: document.getElementById("mix-" + i),
                },
            }, ],
        };
        array.push(imp);
    })

    return array;
}
appendElements('#impulse_responses', impulses, '#template1');
appendElements('#impulse_responses_pro', impulses_pro, '#template2');
export const segments_imp = shapeObject('./impulses/', impulses);
export const segments_imp_pro = shapeObject('./impulses_pro/', impulses_pro);