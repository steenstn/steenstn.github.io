var Viewport = (function () {
    function Viewport() {
        Viewport.x = 0;
        Viewport.y = 0;
        Viewport.oldx = Viewport.x;
        Viewport.oldy = Viewport.y;
        Viewport.floatx = Viewport.x;
        Viewport.floaty = Viewport.y;
    }
    Viewport.moveToCenter = function (x1, y1, x2, y2) {
        Viewport.oldx = Viewport.x;
        Viewport.oldy = Viewport.y;
        var xMidpoint = (x1 + x2) / 2;
        var yMidpoint = (y1 + y2) / 2;
        Viewport.x = Math.round(-xMidpoint + (Viewport.numTilesInScreenWidth / 2) * Level.tileSize);
        Viewport.y = Math.round(-yMidpoint + (Viewport.numTilesInScreenHeight / 2) * Level.tileSize);
        Viewport.floatx = Viewport.x;
        Viewport.floaty = Viewport.y;
        if (Viewport.x > 0)
            Viewport.x = 0;
        if (Viewport.x < -Level.width * Level.tileSize + Viewport.numTilesInScreenWidth * Level.tileSize)
            Viewport.x = -Level.width * Level.tileSize + Viewport.numTilesInScreenWidth * Level.tileSize;
        if (Viewport.y > 0)
            Viewport.y = 0;
        if (Viewport.y < -Level.height * Level.tileSize + Viewport.numTilesInScreenHeight * Level.tileSize)
            Viewport.y = -Level.height * Level.tileSize + Viewport.numTilesInScreenHeight * Level.tileSize;
    };
    Viewport.moveTowardsCenter = function (x1, y1, x2, y2, maxSpeed) {
        if (maxSpeed === void 0) { maxSpeed = 14; }
        Viewport.oldx = Viewport.floatx;
        Viewport.oldy = Viewport.floaty;
        var xMidpoint = (x1 + x2) / 2;
        var yMidpoint = (y1 + y2 + 20) / 2;
        var xTarget = Math.round(-xMidpoint + (Viewport.numTilesInScreenWidth / 2) * Level.tileSize);
        var yTarget = Math.round(-yMidpoint + (Viewport.numTilesInScreenHeight / 2) * Level.tileSize);
        var xDist = Math.abs(xTarget - Viewport.oldx);
        var yDist = Math.abs(yTarget - Viewport.oldy);
        var normalizedXDist = Helper.clamp(xDist / 100, 0, 1);
        var normalizedYDist = Helper.clamp(yDist / 100, 0, 1);
        var xSpeed = Math.pow(normalizedXDist, 5) * maxSpeed;
        var ySpeed = Math.pow(normalizedYDist, 5) * maxSpeed;
        xSpeed = Helper.clamp(xSpeed, 0, maxSpeed);
        ySpeed = Helper.clamp(ySpeed, 0, maxSpeed);
        if (xSpeed < 0.08) {
            xSpeed = 0;
        }
        if (ySpeed < 0.08) {
            ySpeed = 0;
        }
        Viewport.floatx += xTarget > Viewport.oldx ? xSpeed : -xSpeed;
        Viewport.floaty += yTarget > Viewport.oldy ? ySpeed : -ySpeed;
        Viewport.x = Math.round(Viewport.floatx);
        Viewport.y = Math.round(Viewport.floaty);
        if (Viewport.x > 0)
            Viewport.x = 0;
        if (Viewport.x < -Level.width * Level.tileSize + Viewport.numTilesInScreenWidth * Level.tileSize)
            Viewport.x = -Level.width * Level.tileSize + Viewport.numTilesInScreenWidth * Level.tileSize;
        if (Viewport.y > 0)
            Viewport.y = 0;
        if (Viewport.y < -Level.height * Level.tileSize + Viewport.numTilesInScreenHeight * Level.tileSize)
            Viewport.y = -Level.height * Level.tileSize + Viewport.numTilesInScreenHeight * Level.tileSize;
    };
    Viewport.width = 640;
    Viewport.height = 300;
    Viewport.numTilesInScreenWidth = Math.round(Viewport.width / Level.tileSize);
    Viewport.numTilesInScreenHeight = Math.round(Viewport.height / Level.tileSize);
    return Viewport;
}());
