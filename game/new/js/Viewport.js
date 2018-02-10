var Viewport = (function () {
    function Viewport() {
        Viewport.x = 0;
        Viewport.y = 0;
        Viewport.oldx = Viewport.x;
        Viewport.oldy = Viewport.y;
    }
    Viewport.moveToCenter = function (x1, y1, x2, y2) {
        Viewport.oldx = Viewport.x;
        Viewport.oldy = Viewport.y;
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
    Viewport.moveTowardsCenter = function (x1, y1, x2, y2) {
        Viewport.oldx = Viewport.x;
        Viewport.oldy = Viewport.y;
        var xMidpoint = (x1 + x2) / 2;
        var yMidpoint = (y1 + y2) / 2;
        var xTarget = Math.round(-xMidpoint + (Viewport.numTilesInScreenWidth / 2) * Level.tileSize);
        var yTarget = Math.round(-yMidpoint + (Viewport.numTilesInScreenHeight / 2) * Level.tileSize);
        var xDist = Math.abs(xTarget - Viewport.oldx);
        var yDist = Math.abs(yTarget - Viewport.oldy);
        var normalizedXDist = Helper.clamp(xDist / 100, 0, 1);
        var normalizedYDist = Helper.clamp(yDist / 100, 0, 1);
        var xSpeed = Math.pow(normalizedXDist, 5) * 10;
        var ySpeed = Math.pow(normalizedYDist, 5) * 10;
        xSpeed = Helper.clamp(xSpeed, 0, 10);
        ySpeed = Helper.clamp(ySpeed, 0, 10);
        if (xSpeed < 0.08) {
            xSpeed = 0;
        }
        if (ySpeed < 0.08) {
            ySpeed = 0;
        }
        Viewport.x += xTarget > Viewport.oldx ? xSpeed : -xSpeed;
        Viewport.y += yTarget > Viewport.oldy ? ySpeed : -ySpeed;
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
Viewport.width = 640;
Viewport.height = 300;
Viewport.numTilesInScreenWidth = Math.round(Viewport.width / Level.tileSize);
Viewport.numTilesInScreenHeight = Math.round(Viewport.height / Level.tileSize);
