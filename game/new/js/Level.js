var Level = (function () {
    function Level() {
    }
    Level.loadTileset = function () {
        Level.tileset = new Image();
        Level.tileset.src = "tileset.png";
    };
    Level.getBlockAt = function (x, y) {
        var index = Math.floor(x / Level.tileSize) + Math.floor(y / Level.tileSize) * Level.width;
        return Level.currentLevel[index];
    };
    Level.getIndexAt = function (x, y) {
        return Math.floor(x / Level.tileSize) + Math.floor(y / Level.tileSize) * Level.width;
    };
    Level.render = function (context) {
        var startx = Math.floor(-Viewport.x / Level.tileSize) - 1;
        var starty = Math.floor(-Viewport.y / Level.tileSize) - 1;
        if (startx < 0)
            startx = 0;
        if (starty < 0)
            starty = 0;
        var endx = startx + Viewport.width / Level.tileSize + 2;
        var endy = starty + Viewport.height / Level.tileSize + 2;
        if (endx > Level.width)
            endx = Level.width;
        if (endy > Level.height)
            endy = Level.height;
        for (var y = starty; y < endy; y++) {
            for (var x = startx; x < endx; x++) {
                var posx = Math.round(Viewport.x + x * Level.tileSize);
                var posy = Math.round(Viewport.y + y * Level.tileSize);
                var isAirTile = Level.currentLevel[x + y * Level.width].type === ".";
                if (!isAirTile) {
                    context.drawImage(Level.tileset, Level.currentLevel[x + y * Level.width].tileOffsetx, Level.currentLevel[x + y * Level.width].tileOffsety, Level.tileSize, Level.tileSize, posx, posy, Level.tileSize, Level.tileSize);
                }
            }
        }
    };
    Level.width = 200;
    Level.height = 100;
    Level.tileSize = 32;
    Level.currentLevel = new Array(Level.width * Level.height);
    return Level;
}());
