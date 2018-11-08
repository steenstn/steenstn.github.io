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
            if (this.mode === Smoke.LandingSmoke) {
                context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
            }
            else if (this.mode === Smoke.LeftSmoke) {
                context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
            }
            else if (this.mode === Smoke.RightSmoke) {
                context.drawImage(Smoke.image, Math.floor(this.animationTimer) * 20 + 10, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
            }
            this.animationTimer += 0.3;
            if (this.animationTimer > this.numFrames) {
                this.done = true;
            }
        }
    };
    Smoke.image = new Image();
    Smoke.LandingSmoke = 0;
    Smoke.LeftSmoke = 1;
    Smoke.RightSmoke = 2;
    return Smoke;
}());
