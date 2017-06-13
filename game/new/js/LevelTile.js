var LevelTile = (function () {
    function LevelTile(character, blocking, drawingOffsetx, drawingOffsety) {
        this.character = character;
        this.blocking = blocking;
        this.drawingOffsetx = drawingOffsetx;
        this.drawingOffsety = drawingOffsety;
    }
    LevelTile.newFromCharacter = function (character) {
        switch (character) {
            case ".":
                return new LevelTile(".", false, 0, 0);
            case "1":
                return new LevelTile("1", true, 0, 0);
            case "2":
                return new LevelTile("2", true, 32, 0);
            case "3":
                return new LevelTile("3", true, 64, 0);
            case "4":
                return new LevelTile("4", true, 96, 0);
            case "5":
                return new LevelTile("5", true, 0, 32);
            case "6":
                return new LevelTile("6", true, 32, 32);
            case "7":
                return new LevelTile("7", true, 64, 32);
            case "8":
                return new LevelTile("8", true, 96, 32);
            case "9":
                return new LevelTile("9", true, 0, 64);
            case "0":
                return new LevelTile("0", true, 32, 64);
            case "a":
                return new LevelTile("a", true, 64, 64);
            case "b":
                return new LevelTile("b", true, 96, 64);
            case "c":
                return new LevelTile("c", true, 0, 96);
            case "d":
                return new LevelTile("d", true, 32, 96);
            case "e":
                return new LevelTile("e", true, 64, 96);
            case "f":
                return new LevelTile("f", true, 96, 96);
            case "g":
                return new LevelTile("g", true, 0, 128);
            case "h":
                return new LevelTile("h", false, 32, 128);
            case "i":
                return new LevelTile("i", true, 64, 128);
            case "j":
                return new LevelTile("j", true, 96, 128);
            case "k":
                return new LevelTile("k", false, 0, 160);
            case "l":
                return new LevelTile("l", false, 96, 160);
            case "m":
                return new LevelTile("m", false, 32, 192);
            case "n":
                return new LevelTile("n", false, 64, 192);
            case "o":
                return new LevelTile("o", false, 0, 192);
            case "p":
                return new LevelTile("p", false, 96, 224);
            case "q":
                return new LevelTile("q", false, 64, 224);
            case "s":
                return new LevelTile("s", false, 64, 128);
        }
    };
    return LevelTile;
}());
