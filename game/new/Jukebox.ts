class Jukebox {
  private currentSong : any;
  private levelSongs : Array<string>;
  private songReadyToPlay : boolean;

  constructor(songs: string[]) {
    this.levelSongs = songs;
    this.songReadyToPlay = false;
  }

  selectSong(songNumber : number) {
    this.songReadyToPlay = false;
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
    var _self = this;
    this.currentSong.oncanplay = function() {
      _self.songReadyToPlay = true;
    };
  }

  isSongReady() {
    return this.songReadyToPlay;
  }
}
