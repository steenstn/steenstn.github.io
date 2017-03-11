var GlidingStrategy = (function () {
    function GlidingStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
    }
    GlidingStrategy.prototype.move = function () {
        if (this.enemy.direction === 1) {
            this.enemy.x += this.enemy.speedx;
        }
        else {
            this.enemy.x -= this.enemy.speedx;
        }
        var arrayPos = Math.floor((this.enemy.x + 5) / Level.tileSize) + Math.floor((this.enemy.y + 5) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1) {
            this.enemy.direction = 1 - this.enemy.direction;
        }
    };
    return GlidingStrategy;
}());
