const impulse_root = "./impulses/";
export const loadAudio = (path_name) => {
    const audio = new Pz.Sound({
            source: "file",
            options: {
                path: "./audio/drums.mp3",
                loop: true,
            },
        },
        function(error) {
            const convolver = loadConvolver(path_name);
            console.log(convolver);
            audio.addEffect(convolver);


        }
    );
    return audio;
};
export const loadConvolver = (path_name) => {
    return new Pz.Effects.Convolver({ impulse: './audio/scala-milan.wav', mix: 0.5 });
};