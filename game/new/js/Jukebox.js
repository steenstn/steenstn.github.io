var Jukebox = (function () {
    function Jukebox(songs) {
        this.levelSongs = songs;
        this.songReadyToPlay = false;
    }
    Jukebox.prototype.selectSong = function (songNumber) {
        this.songReadyToPlay = false;
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
        var _self = this;
        this.currentSong.oncanplay = function () {
            _self.songReadyToPlay = true;
        };
    };
    Jukebox.prototype.isSongReady = function () {
        return this.songReadyToPlay;
    };
    return Jukebox;
}());
