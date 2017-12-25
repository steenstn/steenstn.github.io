var Player = (function () {
    function Player(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.x = x;
        this.y = y;
        this.image = image;
        this.oldx = x;
        this.oldy = y;
        this.width = 20;
        this.height = 30;
        this.hp = 100;
        this.dead = 0;
        this.updateKillZone();
        this.killZoneWidth = this.width;
        this.killZoneHeight = 5;
        this.updateHurtZone();
        this.hurtZoneWidth = this.width - 6;
        this.hurtZoneHeight = this.height / 1.8;
        this.currentFrame = 0;
        this.animationCounter = 0;
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
        this.hurtZoney = this.y;
    };
    Player.prototype.updateKillZone = function () {
        this.killZonex = this.x;
        this.killZoney = this.y + this.height - 5;
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
