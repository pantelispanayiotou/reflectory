import { loadAudio, loadConvolver } from './common.js';
const impulse_root = "./impulses/";
export const impulses = ["bathroom.wav", "closet.wav"]; //"big_room.wav", "bin.wav", "castle_open_room.wav", "castle_room.wav", "castle_stairwell.wav", "dungeon.wav", "small_room.wav", "metallic_room.wav", "tunnel.wav", "wooden_room.wav"]
export const segments = [];
impulses.map((impulse, i) => {
    const convolver = loadConvolver(impulse);
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


export const loadAudio = (path_name, convolver) => {
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
export const loadConvolver = (path_name) => {
    return new Pz.Effects.Convolver({ impulse: impulse_root + path_name });
};