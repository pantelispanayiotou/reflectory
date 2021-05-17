const impulses = ["bathroom.wav", "big_closet.wav", 'big_room.wav', 'bin.wav', 'castle_open_room.wav', 'castle_stairwell.wav', 'closet.wav', 'dungeon.wav', 'metallic_room.wav', 'narrow_alley.wav', 'small_room.wav', 'tunnel.wav', 'wooden_room.wav'];
var segments = [
  {
    audio: loadAudio(impulses[0]),
    playButton: document.getElementById("play-1"),
    stopButton: document.getElementById("stop-1"),
    volumeSlider: document.getElementById("volume-1"),
    effects: [
      {
        instance: loadConvolver(impulses[0]),
        parameters: {
          mix: document.getElementById("convolver-mix"),
        },
      },
    ],
  },
  {
    audio: loadAudio(impulses[1]),
    playButton: document.getElementById("play-2"),
    stopButton: document.getElementById("stop-2"),
    volumeSlider: document.getElementById("volume-2"),
    effects: [
      {
        instance: loadConvolver(impulses[1]),
        parameters: {
          mix: document.getElementById("convolver-mix"),
        },
      },
    ],
  },
];