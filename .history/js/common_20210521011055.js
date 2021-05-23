const impulse_root = "./impulses/";
export const loadAudio = (path_name) => {
    const audio = new Pz.Sound({
            source: "file",
            options: {
                path: "./audio/drums.mp3",
                loop: true,
            },
        },
        function() {
            const convolver = loadConvolver(path_name);
            audio.addEffect(convolver);
            audio.play();
        }
    );
    return audio;
};
export const loadConvolver = (path_name) => {
    return new Pz.Effects.Convolver({ mix: 0.5, impulse: './audio/scala-milan.wav' });
};