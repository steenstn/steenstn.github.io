class BouncerNoImage extends Enemy {
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
    }
    draw(context) {
    }
}
