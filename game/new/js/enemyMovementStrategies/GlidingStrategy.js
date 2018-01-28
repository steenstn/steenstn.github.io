var GlidingStrategy = (function () {
    function GlidingStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
    }
    GlidingStrategy.prototype.move = function (enemy) {
        if (enemy.direction == 1) {
            var blockInFrontOfFace = Level.getBlockAt(enemy.x + 38, enemy.y + 20);
            if (blockInFrontOfFace.blocking == 1) {
                enemy.acceleration = -0.2;
                enemy.direction = 0;
            }
        }
        if (enemy.direction == 0) {
            var blockInFrontOfFace = Level.getBlockAt(enemy.x - 5, enemy.y + 20);
            if (blockInFrontOfFace.blocking == 1) {
                enemy.acceleration = 0.2;
                enemy.direction = 1;
            }
        }
        enemy.speedx = enemy.speedx + enemy.acceleration;
        if (enemy.speedx > 2) {
            enemy.speedx = 2;
        }
        if (enemy.speedx < -2) {
            enemy.speedx = -2;
        }
        enemy.x += enemy.speedx;
    };
    return GlidingStrategy;
}());
