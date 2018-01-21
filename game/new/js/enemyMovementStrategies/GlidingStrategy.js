var GlidingStrategy = (function () {
    function GlidingStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
    }
    GlidingStrategy.prototype.move = function (enemy) {
        enemy.x += enemy.speedx;
        var arrayPos = Math.floor((enemy.x + 5) / Level.tileSize) + Math.floor((enemy.y + 5) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1) {
            enemy.direction = 1 - enemy.direction;
            enemy.speedx = -1 * enemy.speedx;
        }
    };
    return GlidingStrategy;
}());
