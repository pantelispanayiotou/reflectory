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
        descritpion: 'recorded in a castle stairwell, longer tail and brighter sound than the castle rooms.'
    },
    {
        track: 'dungeon.wav',
        title: 'Dungeon',
        descritpion: 'recorded in a castle stairwell, longer tail and brighter sound than the castle rooms.'
    },

]; //"castle_room.wav", "castle_stairwell.wav", "dungeon.wav", "small_room.wav", "metallic_room.wav", "tunnel.wav", "wooden_room.wav"]
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


    const template = $('#template').html();
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