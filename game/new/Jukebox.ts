class Jukebox {
  private currentSong : any;
  private levelSongs : Array<string>;
  private canPlay : boolean;
  private finalSong: string;
  constructor(songs: string[], finalSong: string) {
    this.levelSongs = songs;
    this.finalSong = finalSong;
  }

  selectSong(songNumber : number) {
    this.canPlay = false;

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

    var _self = this;
    this.currentSong.oncanplay = function() {
      _self.canPlay = true;
    };
  }

  playFinalSong() {
    this.currentSong.pause();
    this.currentSong = new Audio(this.finalSong);
    this.currentSong.play();
  }

  playCurrentSong() {
      if (typeof this.currentSong.loop == 'boolean')
      {
          this.currentSong.loop = true;
      }
      else
      {
          this.currentSong.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);
      }
    this.currentSong.play();
  }

  isSongReady() {
    return this.canPlay;
  }

  isSongPlaying() { return this.currentSong.currentTime > 0;}
}
