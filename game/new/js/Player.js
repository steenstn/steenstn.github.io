var Player = (function () {
    function Player(x, y, image) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.image = image;
        this.friction = WorldConstants.normalFriction;
        this.animationSpeed = 3;
        this.getHp = function () {
            return _this.hp;
        };
        this.x = x;
        this.y = y;
        this.image = image;
        this.drawingSmoke = 0;
        this.drawingLeftBrakingSmoke = this.drawingRightBrakingSmoke = 3;
        this.oldx = x;
        this.oldy = y;
        this.width = 20;
        this.height = 30;
        this.hp = 100;
        this.dead = 0;
        this.runningFromEnemy = 0;
        this.updateKillZone();
        this.killZoneWidth = this.width - 10;
        this.killZoneHeight = 5;
        this.updateHurtZone();
        this.hurtZoneWidth = this.width - 6;
        this.hurtZoneHeight = this.height / 1.8;
        this.currentFrame = 0;
        this.animationCounter = 0;
        this.idleAnimationCounter = Math.round(5 * Math.random());
        this.idleCurrentFrame = 0;
        this.goingLeft = 0;
        this.speedx = 0;
        this.speedy = 0;
        this.jumping = 0;
        this.keyUp = 0;
        this.keyLeft = 0;
        this.keyRight = 0;
    }
    Player.prototype.updateHurtZone = function () {
        this.hurtZonex = this.x + 3;
        this.hurtZoney = this.y + 5;
    };
    Player.prototype.updateKillZone = function () {
        this.killZonex = this.x + 5;
        this.killZoney = this.y + this.height - 5;
    };
    Player.prototype.isFacingPosition = function (x) {
        if (this.x > x && this.goingLeft === 1) {
            return true;
        }
        else if (this.x < x && this.goingLeft === 1) {
            return false;
        }
        else if (this.x > x && this.goingLeft === 0) {
            return false;
        }
        else {
            return true;
        }
    };
    Player.prototype.draw = function (context) {
        if (this.animationCounter > this.animationSpeed) {
            this.animationCounter = 0;
            this.currentFrame = 1 - this.currentFrame;
        }
        if (this.idleAnimationCounter > this.animationSpeed * 3) {
            this.idleAnimationCounter = 0;
            this.idleCurrentFrame = 1 - this.idleCurrentFrame;
        }
        if (this.speedy < -0.5) {
            context.drawImage(this.image, 40, 30 * this.goingLeft, 20, 30, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), this.width, this.height);
        }
        else if (this.speedy > 0.5) {
            context.drawImage(this.image, 60, 30 * this.goingLeft, 20, 30, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), this.width, this.height);
        }
        else if (this.speedx > 0.05 || this.speedx < -0.05) {
            context.drawImage(this.image, 80 + 20 * this.currentFrame, 30 * this.goingLeft + 60 * this.runningFromEnemy, 20, 30, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), this.width, this.height);
        }
        else {
            context.drawImage(this.image, 0 + 20 * this.idleCurrentFrame, 30 * this.goingLeft, 20, 30, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), this.width, this.height);
        }
        this.runningFromEnemy = 0;
    };
    Player.prototype.getCenter = function () {
        return new Vector(this.x + this.width / 2, this.y + this.height / 2);
    };
    Player.prototype.drawHurtZone = function (context) {
        context.fillStyle = '#FF0a00';
        context.beginPath();
        context.rect(this.hurtZonex + Viewport.x, this.hurtZoney + Viewport.y, this.hurtZoneWidth, this.hurtZoneHeight);
        context.closePath();
        context.fill();
    };
    Player.prototype.drawKillZone = function (context) {
        context.fillStyle = '#0aDD00';
        context.beginPath();
        context.rect(this.killZonex + Viewport.x, this.killZoney + Viewport.y, this.killZoneWidth, this.killZoneHeight);
        context.closePath();
        context.fill();
    };
    return Player;
}());
