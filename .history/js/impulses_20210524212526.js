// import impulses from './impulse_files.js';

// const loadAudio = (path_name, convolver) => {
//     const audio = new Pz.Sound({
//             source: "file",
//             options: {
//                 path: path_name,
//                 loop: true,
//             },
//         },
//         function(error) {
//             audio.addEffect(convolver);
//         }
//     );
//     return audio;
// };

// const loadConvolver = (root_path, path_name) => {
//     return new Pz.Effects.Convolver({ impulse: root_path + path_name });
// };

// const template = $('#template1').html();
// for (let i = 0; i < impulses.length; i++) {
//     var item = $(template).clone();
//     item.find(".album__name").text(impulses[i].title);
//     item.find(".album__description").text(impulses[i].description);
//     item.find(".play-button").attr("id", "play-" + i);
//     item.find(".stop-button").attr("id", "stop-" + i);
//     item.find(".effects-button").attr("data-target", "#effects" + i);
//     item.find(".effects-button").attr("aria-controls", "effects" + i);
//     item.find(".collapse-panel").attr("id", "effects" + i);
//     item.find(".volume-slider").attr("id", "volume-" + i);
//     item.find(".mix-slider").attr("id", "mix-" + i);
//     item.find(".volume-label").attr("for", "volume-" + i);
//     item.find(".mix-label").attr("for", "mix-" + i);
//     //Append to the source
//     $('#impulse_responses').append(item);
// }

// const shapeObject = (root_path, files) => {
//         const array = new Array();
//         files.map((impulse, i) => {
//             const convolver = loadConvolver(root_path, impulse.track);
//             const audio = loadAudio("./audio/drums.mp3", convolver);
//             let imp = {
//                 audio: audio,
//                 playButton: document.getElementById("play-" + i),
//                 stopButton: document.getElementById("stop-" + i),
//                 volumeSlider: document.getElementById("volume-" + i),
//                 effects: [{
//                     instance: convolver,
//                     parameters: {
//                         mix: document.getElementById("mix-" + i),
//                     },
//                 }, ],
//             };
//             array.push(imp);
//         })

//         return array;
//     }
//     // appendElements('#impulse_responses', impulses, '#template1');
//     // appendElements('#impulse_responses_pro', impulses_pro, '#template2');
//     // export const segments_imp = shapeObject('./impulses/', impulses);
//     // export const segments_imp_pro = shapeObject('./impulses_pro/', impulses_pro);

export const impulses = [{
        track: "bathroom.wav",
        title: 'Bathroom',
        description: 'Recorded in a tiled bathroom, which results in a brighter sounding reverb due to the lack of wood or fabric-covered walls.'
    },
    {
        track: "closet.wav",
        title: 'Closet',
        description: 'Recorded in a small wooden closet. Muted, short tale with darker tone.'
    },
    {
        track: "big_room.wav",
        title: "Big Room",
        description: 'Recorded in a spacious room with furnishings and carpeted floor for a darker tone and longer tail.'
    },
    {
        track: "bin.wav",
        title: "Bin",
        description: 'Recorded in a small recycling bin, very interesting tone with longer predelay'
    },
    {
        track: "castle_open_room.wav",
        title: "Castle Open Room",
        description: 'Recorded in a castle room with stone walls which do not absorb reflections.'
    },
    {
        track: 'castle_room.wav',
        title: 'Catle Room',
        descritpion: 'Similar to castle open room but smaller tail.'
    },
    {
        track: 'castle_stairwell.wav',
        title: 'Castle Stairwell',
        descritpion: 'Recorded in a castle stairwell, longer tail and brighter sound than the castle rooms.'
    },
    {
        track: 'dungeon.wav',
        title: 'Dungeon',
        descritpion: 'Low ceiling dungeon with open entrance - darker tone and short tail.'
    },
    {
        track: 'small_room.wav',
        title: 'Small Room',
        descritpion: 'Recorded in a small bedroom with furnishings, curtains and carpeted floor. short tail, dark tone.'
    },
    {
        track: 'metallic_room.wav',
        title: 'Metallic Room',
        description: 'Small room with no furnishings. similar tail to small room but much brighter tone.'
    },
    {
        track: 'tunnel.wav',
        title: 'Tunnel',
        description: 'Recorded in a 1-mile stone tunnel with high ceiling. Long tail and dark tone.'
    },
    {

        track: 'wooden_room.wav',
        title: 'Wooden Room',
        description: 'Big wooden box attached to the bottom of a bed. bright tone, short tail.'
    }

];
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

for (let i = 0; i < impulses.length; i++) {


    const template = $('#template1').html();
    var item = $(template).clone();
    item.find('.album__name').text(impulses[i].title);
    item.find('.album__description').text(impulses[i].description);
    item.find('.play-button').attr('id', ('play-' + i));
    item.find('.stop-button').attr('id', ('stop-' + i));
    item.find('.effects-button').attr('data-target', ('#effects' + i));
    item.find('.effects-button').attr('aria-controls', ('effects' + i));
    item.find('.collapse-panel').attr('id', ('effects' + i));
    item.find('.volume-slider').attr('id', ('volume-' + i));
    item.find('.mix-slider').attr('id', ('mix-' + i));
    item.find('.volume-label').attr('for', ('volume-' + i));
    item.find('.mix-label').attr('for', ('mix-' + i));

    //Append to the source
    $('#impulse-responses').append(item);
}

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