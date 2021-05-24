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
    // appendElements('#impulse_responses', impulses, '#template1');
    // appendElements('#impulse_responses_pro', impulses_pro, '#template2');
    // export const segments_imp = shapeObject('./impulses/', impulses);
    // export const segments_imp_pro = shapeObject('./impulses_pro/', impulses_pro);