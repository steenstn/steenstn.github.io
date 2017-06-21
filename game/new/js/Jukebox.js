var Jukebox = (function () {
    function Jukebox(songs) {
        this.levelSongs = songs;
    }
    Jukebox.prototype.selectSong = function (songNumber) {
        var songIsPlaying = this.currentSong && (!this.currentSong.paused || this.currentSong.currentTime);
        if (songIsPlaying) {
            this.currentSong.pause();
        }
        var indexInBounds = songNumber >= 0 && songNumber < this.levelSongs.length;
        if (indexInBounds) {
            var songName = this.levelSongs[songNumber];
            this.currentSong = new Audio(songName);
        }
        else {
            this.currentSong = new Audio(this.levelSongs[0]);
        }
    };
    Jukebox.prototype.playCurrentSong = function () {
        this.currentSong.play();
    };
    return Jukebox;
}());
