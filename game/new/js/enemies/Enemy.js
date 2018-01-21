var Enemy = (function () {
    function Enemy(movementStrategy) {
        this.movementStrategy = movementStrategy;
    }
    Enemy.prototype.move = function () {
        this.movementStrategy.move(this);
    };
    return Enemy;
}());
