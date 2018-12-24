var IntroStar = (function () {
    function IntroStar() {
        this.x = 320;
        this.y = 80;
        var randomAngle = Math.random() * 360;
        this.speedx = Math.cos(randomAngle) * Math.random() * 5;
        this.speedy = Math.sin(randomAngle) * Math.random() * 5;
    }
    IntroStar.prototype.move = function () {
        this.x += this.speedx;
        this.y += this.speedy;
        var starIsOutOfBounds = this.x < 0
            || this.y < 0
            || this.x > Viewport.width
            || this.y > Viewport.height;
        if (starIsOutOfBounds) {
            this.x = 320;
            this.y = 80;
        }
    };
    IntroStar.prototype.render = function (context) {
        context.fillRect(Math.round(this.x), Math.round(this.y), 2, 2);
    };
    return IntroStar;
}());
