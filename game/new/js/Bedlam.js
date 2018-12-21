var Bedlam = (function () {
    function Bedlam() {
        this.image = new Image();
        this.animCounter = 0;
        this.currentFrame = 0;
        this.x = -Viewport.x - 70;
        this.y = -Viewport.y + 118;
        this.image.src = "images/bedlam.png";
    }
    Bedlam.prototype.move = function (players) {
        this.animCounter++;
        if (this.animCounter > 4) {
            this.animCounter = 0;
            this.currentFrame = 1 - this.currentFrame;
        }
        this.x += 4;
        for (var i = 0; i < players.length; i++) {
            if (!players[i].inBucket && Math.abs(this.x - players[i].x) < 40) {
                players[i].inBucket = true;
            }
            if (players[i].inBucket) {
                players[i].x = this.x + 27 + 18 * i;
                players[i].y = this.y - 15;
            }
        }
    };
    Bedlam.prototype.isComplete = function () {
        return this.x > -Viewport.x + Viewport.width + 60;
    };
    Bedlam.prototype.render = function (context) {
        context.drawImage(this.image, 0 + 90 * this.currentFrame, 0, 90, 183, Math.round(this.x + Viewport.x), Math.round(this.y + Viewport.y), 90, 183);
    };
    return Bedlam;
}());
