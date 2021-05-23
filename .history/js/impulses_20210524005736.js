export const impulses = [{
        track: "bathroom.wav",
        title: 'Bathroom',
        description: 'Recorded in a tiled bathroom, which results in a brighter sounding reverb due to the lack of wood or fabric-covered walls.'
    },
    {
        track: "closet.wav",
        title: 'Closet',
        description: 'Recorded in a small wooden closet. Muted, short tale with darker tone.'
    }

]; //"big_room.wav", "bin.wav", "castle_open_room.wav", "castle_room.wav", "castle_stairwell.wav", "dungeon.wav", "small_room.wav", "metallic_room.wav", "tunnel.wav", "wooden_room.wav"]
export const segments = [];
const impulse_root = "./impulses/";

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

const loadConvolver = (path_name) => {
    return new Pz.Effects.Convolver({ impulse: impulse_root + path_name });
};

impulses.map((impulse, i) => {
    const convolver = loadConvolver(impulse.track);
    const audio = loadAudio('./audio/drums.mp3', convolver)
    let imp = {
        audio: audio,
        playButton: document.getElementById('play-' + i),
        stopButton: document.getElementById('stop-' + i),
        volumeSlider: document.getElementById('volume-' + i),
        effects: [{
            instance: convolver,
            parameters: {
                mix: document.getElementById('mix-' + i)
            }
        }]
    }
    segments.push(imp);

})