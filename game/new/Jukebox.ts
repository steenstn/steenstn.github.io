class Jukebox {
  private currentSong : any;
  private levelSongs : Array<string>;
  constructor() {
    this.levelSongs = ["roulette_dares.mp3","teflon.mp3", "vermicide.mp3"];
  }

  selectSong(songNumber : number) {
    let songIsPlaying = this.currentSong && (!this.currentSong.paused || this.currentSong.currentTime);
    if(songIsPlaying) {
      this.currentSong.pause();
    }
    let indexInBounds = songNumber >= 0 && songNumber < this.levelSongs.length;

    if(indexInBounds) {
      let songName = this.levelSongs[songNumber];
      this.currentSong = new Audio(songName);
    } else {
      this.currentSong = new Audio(this.levelSongs[0]);
    }
  }

  playCurrentSong() {
    this.currentSong.play();
  }
}
