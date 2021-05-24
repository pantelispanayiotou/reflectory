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

const appendElement = (idToSelect, files, idToAppend, selector) => {
    for (let i = 0; i < files.length; i++) {
        const template = $(idToSelect).html();
        var item = $(template).clone();
        item.find(".album__name").text(files[i].title);
        item.find(".album__description").text(files[i].description);
        item.find(".play-button").attr("id", selector + "-play-" + i);
        item.find(".stop-button").attr("id", selector + "-stop-" + i);
        item.find(".effects-button").attr("data-target", `#${selector}-effects-${i}`);
        item.find(".effects-button").attr("aria-controls", `${selector}-effects-${i}`);
        item.find(".collapse-panel").attr("id", selector + "-effects-" + i);
        item.find(".volume-slider").attr("id", selector + "-volume-" + i);
        item.find(".mix-slider").attr("id", selector + "-mix-" + i);
        item.find(".volume-label").attr("for", selector + "-volume-" + i);
        item.find(".mix-label").attr("for", selector + "-mix-" + i);
        //Append to the source
        $(idToAppend).append(item);
    }
}
appendElement('#template1', impulses, '#impulse-responses', 'n');
appendElement('#template2', impulses_pro, '#impulse-responses-pro', 'p');

const shapeObject = (root_path, files, selector) => {
    const array = new Array();
    files.map((impulse, i) => {
        let convolver;
        let audio;
        if (selector !== 'c') {
            convolver = loadConvolver(root_path, impulse.track);

        } else {
            convolver = new Pz.Effects.Convolver({ impulse: files[0] });
        }
        audio = loadAudio("./audio/drums.mp3", convolver);
        let imp = {
            audio: audio,
            playButton: document.getElementById(selector + "-play-" + i),
            stopButton: document.getElementById(selector + "-stop-" + i),
            volumeSlider: document.getElementById(selector + "-volume-" + i),
            effects: [{
                instance: convolver,
                parameters: {
                    mix: document.getElementById(selector + "-mix-" + i),
                },
            }, ],
        };
        console.log(imp);
        array.push(imp);
    })

    return array;
}

function handleFiles(event) {
    var files = event.target.files;
    let impulse = URL.createObjectURL(files[0]);
    const custom = shapeObject('', [impulse], 'c');

}

document.getElementById("upload").addEventListener("change", handleFiles, false);


export const segments_imp = shapeObject('./impulses/', impulses, 'n');
export const segments_imp_pro = shapeObject('./impulses_pro/', impulses_pro, 'p');