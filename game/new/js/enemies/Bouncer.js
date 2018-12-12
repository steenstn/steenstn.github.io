class Bouncer extends Enemy {
    constructor(enemy, currentLevel) {
        super(new FlyingStrategy(enemy, currentLevel));
        this.currentFrame = 0;
        this.width = 20;
        this.height = 20;
        this.x = enemy.x;
        this.y = enemy.y;
        this.oldx = enemy.oldx;
        this.oldy = enemy.oldy;
        this.speedx = enemy.speedx;
        this.speedy = enemy.speedy;
        Bouncer.image.src = "hand.png";
    }
    draw(context) {
        let offsety;
        if (this.speedx < 0 && this.speedy < 0) {
            offsety = 0;
        }
        else if (this.speedx < 0 && this.speedy > 0) {
            offsety = 1;
        }
        else if (this.speedx > 0 && this.speedy < 0) {
            offsety = 2;
        }
        else if (this.speedx > 0 && this.speedy > 0) {
            offsety = 3;
        }
        context.drawImage(Bouncer.image, 0 + 20 * this.currentFrame, 20 * offsety, 20, 20, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 20);
    }
}
Bouncer.image = new Image();
