var Particle = (function () {
    function Particle(x, y, xSpeed, ySpeed, image) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.image = image;
        this.xFriction = 1.1;
    }
    Particle.prototype.move = function () {
        if (this.state === Particle.ACTIVE) {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.ySpeed += 0.3;
            this.xSpeed /= this.xFriction;
        }
        else if (this.state === Particle.DRIPPING) {
            this.ySpeed = 0.02;
            this.xSpeed = 0;
            this.y += this.ySpeed;
        }
        else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
    };
    Particle.prototype.render = function (context, screenx, screeny) {
        context.drawImage(this.image, this.x + screenx, this.y + screeny);
    };
    return Particle;
}());
Particle.ACTIVE = 1;
Particle.INACTIVE = 0;
Particle.DRIPPING = 2;
