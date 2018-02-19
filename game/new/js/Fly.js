var Fly = (function () {
    function Fly(image, x, y) {
        this.safePositionSet = false;
        this.homeAttacked = 0;
        this.x = x;
        this.y = y;
        this.targetx = x;
        this.targety = y;
        this.homex = x;
        this.homey = y;
        this.image = image;
        this.state = Fly.GOING_HOME;
    }
    Fly.prototype.move = function (players) {
        if (Helper.outOfBounds(this.x, this.y)) {
            return;
        }
        if ((Math.abs(this.homex - players[0].x) < 30 && Math.abs(this.homey - players[0].y) < 30) ||
            Math.abs(this.homex - players[1].x) < 30 && Math.abs(this.homey - players[1].y) < 30) {
            this.homeAttacked = 1;
            if (!this.safePositionSet) {
                var angle_1 = Math.atan2(this.y - this.homey, this.x - this.homex);
                var xCoefficient_1 = Math.cos(angle_1);
                var yCoefficient_1 = Math.sin(angle_1);
                this.safex = this.homex + xCoefficient_1 * 70 + Math.random() * 30 * xCoefficient_1;
                this.safey = this.homey + yCoefficient_1 * 70;
                +Math.random() * 30 * yCoefficient_1;
                this.targetx = this.safex;
                this.targety = this.safey;
                this.safePositionSet = true;
            }
            this.state = Fly.FLEEING;
        }
        else {
            this.homeAttacked = 0;
            this.state = Fly.GOING_HOME;
            this.safePositionSet = false;
        }
        var baseTargetx;
        var baseTargety;
        var speed;
        if (this.state == Fly.GOING_HOME) {
            baseTargetx = this.homex;
            baseTargety = this.homey;
            speed = 1;
        }
        else if (this.state == Fly.FLEEING) {
            baseTargetx = this.safex;
            baseTargety = this.safey;
            speed = 2;
        }
        var arrivedAtTarget = Math.abs(this.x - this.targetx) < 10 && Math.abs(this.y - this.targety) < 10;
        if (arrivedAtTarget) {
            this.targetx = baseTargetx + Math.random() * 50 - 25;
            this.targety = baseTargety + Math.random() * 50 - 25;
        }
        var angle = Math.atan2(this.targety - this.y, this.targetx - this.x);
        var xCoefficient = Math.cos(angle);
        var yCoefficient = Math.sin(angle);
        var xSpeed = xCoefficient * speed;
        var ySpeed = yCoefficient * speed;
        var sideMovement = Math.random() * 4 * speed - 2 * speed;
        var sideSpeedX = Math.cos(angle + 90) * sideMovement;
        var sideSpeedY = Math.sin(angle + 90) * sideMovement;
        this.x += xSpeed + sideSpeedX;
        this.y += ySpeed + sideSpeedY;
    };
    Fly.prototype.render = function (context) {
        context.drawImage(this.image, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y));
    };
    return Fly;
}());
Fly.GOING_HOME = 0;
Fly.FLEEING = 1;
