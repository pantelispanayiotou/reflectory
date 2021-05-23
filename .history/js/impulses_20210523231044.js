import { loadAudio, loadConvolver } from './common.js';
export const impulses = ["bathroom.wav", "closet.wav"]; //"big_room.wav", "bin.wav", "castle_open_room.wav", "castle_room.wav", "castle_stairwell.wav", "dungeon.wav", "small_room.wav", "metallic_room.wav", "tunnel.wav", "wooden_room.wav"]
export const segments = [];
impulses.map((impulse, i) => {
    const convolver = new Pz.Effects.Convolver({ impulse: './audio/scala-milan.wav' });
    const audio = new Pz.Sound({
        source: 'file',
        options: {
            path: './audio/drums.mp3',
            loop: true
        }
    }, function() {
        audio.addEffect(convolver);
    });
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

// export const segments = [
//   {
//     audio: loadAudio(impulses[0]),
//     playButton: document.getElementById("play-1"),
//     stopButton: document.getElementById("stop-1"),
//     volumeSlider: document.getElementById("volume-1"),
//     effects: [
//       {
//         instance: loadConvolver(impulses[0]),
//         parameters: {
//           mix: document.getElementById("convolver-mix-1"),
//         },
//       },
//     ],
//   },
//   {
//     audio: loadAudio(impulses[1]),
//     playButton: document.getElementById("play-2"),
//     stopButton: document.getElementById("stop-2"),
//     volumeSlider: document.getElementById("volume-2"),
//     effects: [
//       {
//         instance: loadConvolver(impulses[1]),
//         parameters: {
//           mix: document.getElementById("convolver-mix-1"),
//         },
//       },
//     ],
//   },
// ];