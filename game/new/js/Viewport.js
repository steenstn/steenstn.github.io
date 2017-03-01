var Viewport = (function () {
    function Viewport() {
        Viewport.x = 0;
        Viewport.y = 0;
        Viewport.oldx = Viewport.x;
        Viewport.oldy = Viewport.y;
    }
    Viewport.move = function (x1, y1, x2, y2) {
        var xMidpoint = (x1 + x2) / 2;
        var yMidpoint = (y1 + y2) / 2;
        Viewport.x = Math.round(-xMidpoint + (Viewport.numTilesInScreenWidth / 2) * Level.tileSize);
        Viewport.y = Math.round(-yMidpoint + (Viewport.numTilesInScreenHeight / 2) * Level.tileSize);
        if (Viewport.x > 0)
            Viewport.x = 0;
        if (Viewport.x < -Level.width * Level.tileSize + Viewport.numTilesInScreenWidth * Level.tileSize)
            Viewport.x = -Level.width * Level.tileSize + Viewport.numTilesInScreenWidth * Level.tileSize;
        if (Viewport.y > 0)
            Viewport.y = 0;
        if (Viewport.y < -Level.height * Level.tileSize + Viewport.numTilesInScreenHeight * Level.tileSize)
            Viewport.y = -Level.height * Level.tileSize + Viewport.numTilesInScreenHeight * Level.tileSize;
    };
    return Viewport;
}());
Viewport.width = 800;
Viewport.height = 450;
Viewport.numTilesInScreenWidth = Math.round(Viewport.width / Level.tileSize);
Viewport.numTilesInScreenHeight = Math.round(Viewport.height / Level.tileSize);
