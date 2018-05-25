var Smoke = (function () {
    function Smoke(x, y) {
        this.x = x;
        this.y = y;
        this.numFrames = 7;
        Smoke.image.src = "smoke.png";
        this.animationTimer = 0;
        this.done = false;
    }
    Smoke.prototype.isDone = function () {
        return this.done;
    };
    Smoke.prototype.draw = function (context) {
        if (!this.isDone()) {
            context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
            this.animationTimer += 0.3;
            if (this.animationTimer > this.numFrames) {
                this.done = true;
            }
        }
    };
    return Smoke;
}());
Smoke.image = new Image();
