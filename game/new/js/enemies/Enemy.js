var Enemy = (function () {
    function Enemy(movementStrategy) {
        this.hp = 1;
        this.movementStrategy = movementStrategy;
    }
    Enemy.prototype.move = function () {
        this.movementStrategy.move(this);
    };
    Enemy.prototype.drawHp = function (context) {
    };
    return Enemy;
}());
