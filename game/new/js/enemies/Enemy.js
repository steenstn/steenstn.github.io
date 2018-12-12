class Enemy {
    constructor(movementStrategy) {
        this.hp = 1;
        this.movementStrategy = movementStrategy;
    }
    move() {
        this.movementStrategy.move(this);
    }
    drawHp(context) {
    }
}
