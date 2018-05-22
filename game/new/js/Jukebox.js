var Jukebox = (function () {
    function Jukebox(songs, finalSong) {
        this.levelSongs = songs;
        this.finalSong = finalSong;
    }
    Jukebox.prototype.selectSong = function (songNumber) {
        this.canPlay = false;
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
        var _self = this;
        this.currentSong.oncanplay = function () {
            _self.canPlay = true;
        };
    };
    Jukebox.prototype.playFinalSong = function () {
        this.currentSong.pause();
        this.currentSong = new Audio(this.finalSong);
        this.currentSong.play();
    };
    Jukebox.prototype.playCurrentSong = function () {
        if (typeof this.currentSong.loop == 'boolean') {
            this.currentSong.loop = true;
        }
        else {
            this.currentSong.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        this.currentSong.play();
    };
    Jukebox.prototype.isSongReady = function () {
        return this.canPlay;
    };
    Jukebox.prototype.isSongPlaying = function () { return this.currentSong.currentTime > 0; };
    return Jukebox;
}());
