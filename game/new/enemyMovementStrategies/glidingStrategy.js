var GlidingStrategy = (function () {
    function GlidingStrategy(enemy, tilesize, levelWidth, currentLevel) {
        this.enemy = enemy;
        this.tilesize = tilesize;
        this.levelWidth = levelWidth;
        this.currentLevel = currentLevel;
    }
    GlidingStrategy.prototype.move = function () {
        if (this.enemy.direction === 1) {
            this.enemy.x += 2;
        }
        else {
            this.enemy.x -= 2;
        }
        var arrayPos = Math.floor((this.enemy.x + 5) / this.tilesize) + Math.floor((this.enemy.y + 5) / this.tilesize) * this.levelWidth;
        if (this.currentLevel[arrayPos].blocking == 1) {
            this.enemy.direction = 1 - this.enemy.direction;
        }
    };
    return GlidingStrategy;
}());
