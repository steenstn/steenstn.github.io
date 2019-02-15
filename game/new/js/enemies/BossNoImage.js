class BossNoImage extends Enemy {
    constructor(enemy, currentLevel) {
        super(new BossStrategy(enemy, currentLevel));
        this.speedx = 4.5;
        this.speedy = 0;
        this.width = 60;
        this.height = 60;
        this.type = "boss";
        this.currentState = BossStrategy.JUMPING;
        this.maxHp = 30;
        this.breakingBlock = false;
        this.x = enemy.x;
        this.y = enemy.y;
        this.hp = this.maxHp;
        this.oldHp = this.hp;
        this.hurtAnimationCounter = 10;
        this.firing = false;
    }
    draw(context) {
    }
    drawHp(context) {
    }
}
