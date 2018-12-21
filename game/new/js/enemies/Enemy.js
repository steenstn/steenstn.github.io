var Enemy = (function () {
    function Enemy(movementStrategy) {
        this.hp = 1;
        this.alive = true;
        this.movementStrategy = movementStrategy;
    }
    Enemy.prototype.move = function () {
        this.movementStrategy.move(this);
    };
    return Enemy;
}());
