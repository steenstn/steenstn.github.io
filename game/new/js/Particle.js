var Particle = (function () {
    function Particle(x, y, xSpeed, ySpeed, image) {
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.image = image;
        this.xFriction = 1.1;
    }
    Particle.prototype.render = function (context) {
        context.drawImage(this.image, this.x + Viewport.x, this.y + Viewport.y);
    };
    return Particle;
}());
