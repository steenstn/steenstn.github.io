class MutantNoImage extends Enemy {
    constructor(enemy, currentLevel) {
        super(new MutantStrategy(enemy, currentLevel));
        this.speedx = 3;
        this.width = 80;
        this.height = 36;
        this.offsetx = 5;
        this.offsety = 5;
        this.idleAnimationCounter = 0;
        this.idleCurrentFrame = 0;
        this.x = enemy.x;
        this.y = enemy.y;
        this.oldx = enemy.oldx;
        this.oldy = enemy.oldy;
        this.direction = enemy.direction;
    }
    draw(context) {
    }
}
