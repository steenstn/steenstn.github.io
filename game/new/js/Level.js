var Level = (function () {
    function Level() {
    }
    Level.getBlockAt = function (x, y) {
        var index = Math.floor(x / Level.tileSize) + Math.floor(y / Level.tileSize) * Level.width;
        return Level.currentLevel[index];
    };
    return Level;
}());
Level.width = 200;
Level.height = 100;
Level.tileSize = 32;
Level.currentLevel = new Array(Level.width * Level.height);
