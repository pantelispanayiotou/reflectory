const impulse_root = "./impulses/";
export const loadAudio = (path_name) => {
  const audio = new Pz.Sound(
    {
      source: "file",
      options: {
        path: "./audio/audio_example.wav",
        loop: true,
      },
    },
    function () {
      const convolver = loadConvolver(path_name);
      audio.addEffect(convolver);
    }
  );
  return audio;
};
export const loadConvolver = (path_name) => {
  return new Pz.Effects.Convolver({ impulse: impulse_root + path_name });
};