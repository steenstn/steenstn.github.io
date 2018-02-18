var Bug = (function () {
    function Bug(image, x, y, homex, homey) {
        this.safePositionSet = false;
        this.homeAttacked = 0;
        this.x = x;
        this.y = y;
        this.targetx = homex;
        this.targety = homey;
        this.homex = homex;
        this.homey = homey;
        this.image = image;
        this.state = Bug.GOING_HOME;
    }
    Bug.prototype.move = function (players) {
        if ((Math.abs(this.homex - players[0].x) < 30 && Math.abs(this.homey - players[0].y) < 30) ||
            Math.abs(this.homex - players[1].x) < 30 && Math.abs(this.homey - players[1].y) < 30) {
            this.homeAttacked = 1;
            if (!this.safePositionSet) {
                var angle = Math.atan2(this.y - this.homey, this.x - this.homex);
                var xCoefficient = Math.cos(angle);
                var yCoefficient = Math.sin(angle);
                this.safex = this.homex + xCoefficient * 70 + Math.random() * 30 * xCoefficient;
                this.safey = this.homey + yCoefficient * 70;
                +Math.random() * 30 * yCoefficient;
                this.targetx = this.safex;
                this.targety = this.safey;
                this.safePositionSet = true;
            }
            this.state = Bug.FLEEING;
        }
        else {
            this.homeAttacked = 0;
            this.state = Bug.GOING_HOME;
            this.safePositionSet = false;
        }
        if (this.state == Bug.GOING_HOME) {
            if (Math.abs(this.x - this.targetx) < 10 && Math.abs(this.y - this.targety) < 10) {
                this.targetx = this.homex + Math.random() * 50 - 25;
                this.targety = this.homey + Math.random() * 50 - 25;
            }
            var angle = Math.atan2(this.targety - this.y, this.targetx - this.x);
            var xSpeed = Math.cos(angle) * 2;
            var ySpeed = Math.sin(angle) * 2;
            var sideMovement = Math.random() * 8 - 4;
            var sideSpeedX = Math.cos(angle + 90) * sideMovement;
            var sideSpeedY = Math.sin(angle + 90) * sideMovement;
            this.x += xSpeed + sideSpeedX;
            this.y += ySpeed + sideSpeedY;
        }
        else if (this.state == Bug.FLEEING) {
            if (Math.abs(this.x - this.targetx) < 10 && Math.abs(this.y - this.targety) < 10) {
                this.targetx = this.safex + Math.random() * 50 - 25;
                this.targety = this.safey + Math.random() * 50 - 25;
            }
            var angle = Math.atan2(this.targety - this.y, this.targetx - this.x);
            var xCoefficient = Math.cos(angle);
            var yCoefficient = Math.sin(angle);
            var xSpeed = xCoefficient * 2;
            var ySpeed = yCoefficient * 2;
            var sideMovement = Math.random() * 8 - 4;
            var sideSpeedX = Math.cos(angle + 90) * sideMovement;
            var sideSpeedY = Math.sin(angle + 90) * sideMovement;
            this.x += xSpeed + sideSpeedX;
            this.y += ySpeed + sideSpeedY;
        }
    };
    Bug.prototype.render = function (context) {
        context.drawImage(this.image, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y));
    };
    return Bug;
}());
Bug.GOING_HOME = 0;
Bug.FLEEING = 1;
