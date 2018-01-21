var MutantStrategy = (function () {
    function MutantStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
        this.mutantWidth = 88;
        this.mutantHeight = 36;
        this.idleTimer = 60;
        this.idle = false;
    }
    MutantStrategy.prototype.move = function (enemy) {
        if (!this.idle) {
            if (enemy.direction == 1) {
                enemy.x += enemy.speedx;
            }
            else {
                enemy.x -= enemy.speedx;
            }
            enemy.idleAnimationCounter++;
            if (enemy.idleAnimationCounter > 4) {
                enemy.idleCurrentFrame = 1 - enemy.idleCurrentFrame;
                enemy.idleAnimationCounter = 0;
            }
        }
        else {
            this.idleTimer--;
            if (this.idleTimer < 0) {
                this.idle = false;
            }
            enemy.idleAnimationCounter++;
            if (enemy.idleAnimationCounter > 10) {
                enemy.idleCurrentFrame = 1 - enemy.idleCurrentFrame;
                enemy.idleAnimationCounter = 0;
            }
        }
        var enemyWidth = typeof enemy.width == 'number' ? enemy.width : this.mutantWidth;
        var enemyHeight = typeof enemy.height == 'number' ? enemy.height : this.mutantHeight;
        var arrayPos = Math.floor((enemy.x + 5) / Level.tileSize) + Math.floor((enemy.y + 5) / Level.tileSize) * Level.width;
        var bottomArrayPos = Math.floor((enemy.x + enemyWidth / 2) / Level.tileSize) + Math.floor((enemy.y + enemyHeight) / Level.tileSize) * Level.width;
        if (this.currentLevel[bottomArrayPos].type == ".") {
            enemy.y++;
        }
        if (this.currentLevel[arrayPos].blocking == 1 || this.currentLevel[arrayPos].type == "h")
            enemy.direction = 1 - enemy.direction;
        if (enemy.direction == 1)
            arrayPos = Math.floor((enemy.x + enemyWidth + 5) / Level.tileSize) + Math.floor((enemy.y + enemyHeight + 15) / Level.tileSize) * Level.width;
        else
            arrayPos = Math.floor((enemy.x - 5) / Level.tileSize) + Math.floor((enemy.y + enemyHeight + 15) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 0) {
            enemy.direction = 1 - enemy.direction;
        }
        if (!this.idle && Math.random() > 0.995) {
            this.idleTimer = 60 + Math.random() * 20;
            this.idle = true;
        }
    };
    return MutantStrategy;
}());
