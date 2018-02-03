var Particle = (function () {
    function Particle(x, y, xSpeed, ySpeed, image) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.image = image;
        this.xFriction = 1.1;
        this.shouldBeDeleted = false;
    }
    Particle.prototype.move = function () {
        if (this.shouldBeDeleted) {
            return;
        }
        var arrayPos = Level.getBlockAt(this.x, this.y);
        var downRight = Level.getBlockAt(this.x + 1, this.y + 1);
        var downLeft = Level.getBlockAt(this.x - 1, this.y + 1);
        var down = Level.getBlockAt(this.x, this.y + 1);
        var arrayPosOutsideLevel = typeof arrayPos === 'undefined';
        var downRightOutsideLevel = typeof downRight === 'undefined';
        var downLeftOutsideLevel = typeof downLeft === 'undefined';
        var downOutsideLevel = typeof down === 'undefined';
        var anyCheckingPointOutsideOfLevel = arrayPosOutsideLevel || downRightOutsideLevel || downLeftOutsideLevel || downOutsideLevel;
        if (anyCheckingPointOutsideOfLevel) {
            this.shouldBeDeleted = true;
        }
        else {
            var isDownLeftBlocked = downLeft.blocking == 1;
            var isDownRightBlocked = downRight.blocking == 1;
            var isDownBlocked = down.blocking == 1;
            if (isDownBlocked && isDownRightBlocked && isDownLeftBlocked) {
                this.state = 0;
            }
            else if (isDownBlocked && (!isDownRightBlocked || !isDownLeftBlocked)) {
                this.state = 2;
            }
            else {
                this.state = 1;
            }
        }
    };
    Particle.prototype.render = function (context) {
        context.drawImage(this.image, this.x + Viewport.x, this.y + Viewport.y);
    };
    return Particle;
}());
