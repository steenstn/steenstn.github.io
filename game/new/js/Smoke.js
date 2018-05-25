var Smoke = (function () {
    function Smoke(x, y) {
        this.x = x;
        this.y = y;
        this.numFrames = 7;
        Smoke.image.src = "smoke.png";
        this.animationTimer = 0;
    }
    Smoke.prototype.draw = function (context) {
        context.drawImage(Smoke.image, this.animationTimer * 20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
        this.animationTimer++;
    };
    return Smoke;
}());
Smoke.image = new Image();
