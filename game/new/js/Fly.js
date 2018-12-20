var Fly = (function () {
    function Fly(x, y) {
        this.safePositionSet = false;
        this.homeAttacked = 0;
        this.x = x;
        this.y = y;
        this.targetx = x;
        this.targety = y;
        this.homex = x;
        this.homey = y;
        this.state = Fly.SEARCHING;
        this.inDanger = false;
        this.nectarCollected = 0;
        Fly.image.src = "fly.png";
    }
    Fly.prototype.move = function (players, flowers) {
        if (Helper.outOfBounds(this.x, this.y)) {
            return;
        }
        this.inDanger = false;
        var dangerx = 0;
        var dangery = 0;
        for (var i = 0; i < players.length; i++) {
            if ((Math.abs(this.x - players[i].x) < 50 && Math.abs(this.y - players[i].y) < 50)) {
                this.state = Fly.FLEEING;
                dangerx = players[i].x;
                dangery = players[i].y;
                this.inDanger = true;
            }
        }
        if (this.state == Fly.FLEEING) {
            var angle_1 = Math.atan2(this.y - dangery, this.x - dangerx);
            var xCoefficient_1 = Math.cos(angle_1);
            var yCoefficient_1 = Math.sin(angle_1);
            this.safex = dangerx + xCoefficient_1 * 90 + Math.random() * 30 * xCoefficient_1;
            this.safey = dangery + yCoefficient_1 * 90;
            +Math.random() * 30 * yCoefficient_1;
            this.targetx = this.safex;
            this.targety = this.safey;
            if (!this.inDanger) {
                this.state = Fly.SEARCHING;
                this.targetx = this.x;
                this.targety = this.y;
            }
        }
        var baseTargetx = this.homex;
        var baseTargety = this.homey;
        var speed = 1;
        if (this.state == Fly.GOING_HOME) {
            var arrivedAtTarget = Math.abs(this.x - this.targetx) < 10 && Math.abs(this.y - this.targety) < 10;
            if (arrivedAtTarget) {
                baseTargetx = this.homex;
                baseTargety = this.homey;
                speed = 1;
                this.targetx = baseTargetx + Math.random() * 50 - 25;
                this.targety = baseTargety + Math.random() * 50 - 25;
                this.nectarCollected -= Math.random() * 10;
                if (this.nectarCollected <= 0) {
                    this.state = Fly.SEARCHING;
                }
            }
        }
        else if (this.state == Fly.FLEEING) {
            baseTargetx = this.safex;
            baseTargety = this.safey;
            speed = 2;
            var arrivedAtTarget = Math.abs(this.x - this.targetx) < 10 && Math.abs(this.y - this.targety) < 10;
            if (arrivedAtTarget) {
                this.targetx = baseTargetx + Math.random() * 50 - 25;
                this.targety = baseTargety + Math.random() * 50 - 25;
            }
        }
        else if (this.state == Fly.SEARCHING) {
            baseTargetx = this.homex;
            baseTargety = this.homey;
            speed = 1;
            var arrivedAtTarget = Math.abs(this.x - this.targetx) < 10 && Math.abs(this.y - this.targety) < 10;
            if (arrivedAtTarget) {
                this.targetx = baseTargetx + Math.random() * 500 - 250;
                this.targety = baseTargety + Math.random() * 100 - 50;
            }
            for (var i = 0; i < flowers.length; i++) {
                if ((Math.abs(this.x - flowers[i].x) < 30 && Math.abs(this.y - flowers[i].y) < 30)) {
                    this.targetx = flowers[i].x;
                    this.targety = flowers[i].y;
                    this.nectarCollected++;
                    if (this.nectarCollected > 250) {
                        this.state = Fly.GOING_HOME;
                    }
                }
            }
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
        context.drawImage(Fly.image, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y));
    };
    Fly.image = new Image();
    Fly.GOING_HOME = 0;
    Fly.FLEEING = 1;
    Fly.SEARCHING = 2;
    Fly.GATHERING = 3;
    return Fly;
}());
