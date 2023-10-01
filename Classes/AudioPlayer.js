class AudioPlayer {
  constructor(gameInstance, audioFile, volume, loop, pitch = 1) {
    this.loop = loop;
    this.gameInstance = gameInstance;
    this.audioFile = audioFile;
    this.volume = volume;
    this.pitch = pitch;
    this.createAudio();
    this.play();
  }

  createAudio() {
    const audio = document.createElement("audio");
    audio.src = this.audioFile;
    audio.style.display = "none";
    this.audio = audio;
    this.audio.loop = this.loop;
    this.audio.playbackRate = this.pitch;
    this.audio.volume = this.volume;
    this.audio.onended = () => {
      this.destroy();
    };
    document.body.appendChild(audio);
  }

  setVolume(volume) {
    this.volume = volume;
    this.audio.volume = this.volume;
  }

  setPitch(pitch) {
    this.pitch = pitch;
    this.audio.playbackRate = this.pitch;
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }

  destroy() {
    if (!this.audio) return;
    this.stop();
    this.audio.parentElement.removeChild(this.audio);
  }
}
