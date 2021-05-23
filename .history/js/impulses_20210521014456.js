import { loadAudio, loadConvolver } from './common.js';
export const impulses = ["bathroom.wav"];
export const segments = [];
impulses.map((impulse, i) => {

    let imp = {
        audio: loadAudio(impulse),
        playButton: document.getElementById('play-' + i),
        stopButton: document.getElementById('stop-' + i),
        volumeSlider: document.getElementById('volume-' + i),
        effects: [{
            instance: loadConvolver(impulse),
            parameters: {
                mix: document.getElementById('convolver-mix')
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