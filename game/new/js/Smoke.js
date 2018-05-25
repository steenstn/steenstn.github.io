var Smoke = (function () {
    function Smoke(x, y, mode) {
        this.x = x;
        this.y = y;
        this.mode = mode;
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
            if (this.mode === 0) {
                context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
            }
            else if (this.mode === 1) {
                context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
            }
            else if (this.mode === 2) {
                context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20 + 10, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
            }
            this.animationTimer += 0.3;
            if (this.animationTimer > this.numFrames) {
                this.done = true;
            }
        }
    };
    return Smoke;
}());
Smoke.image = new Image();
