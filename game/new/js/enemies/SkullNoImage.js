class SkullNoImage extends Enemy {
    constructor(enemy, currentLevel) {
        super(new GlidingStrategy(enemy, currentLevel));
        this.speedx = 0;
        this.width = 28;
        this.height = 35;
        this.offsetx = 3;
        this.x = enemy.x;
        this.y = enemy.y;
        this.oldx = enemy.oldx;
        this.oldy = enemy.oldy;
        this.direction = enemy.direction;
        this.acceleration = this.direction > 0 ? 0.5 : -0.5;
    }
    draw(context) {
    }
}
