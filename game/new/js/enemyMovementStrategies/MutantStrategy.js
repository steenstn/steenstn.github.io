var MutantStrategy = (function () {
    function MutantStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
        this.mutantWidth = 88;
        this.mutantHeight = 36;
        this.idleTimer = 60;
        this.idle = false;
    }
    MutantStrategy.prototype.move = function () {
        if (!this.idle) {
            if (this.enemy.direction == 1) {
                this.enemy.x += this.enemy.speedx;
            }
            else {
                this.enemy.x -= this.enemy.speedx;
            }
        }
        else {
            this.idleTimer--;
            if (this.idleTimer < 0) {
                this.idle = false;
            }
        }
        var enemyWidth = typeof this.enemy.width == 'number' ? this.enemy.width : this.mutantWidth;
        var enemyHeight = typeof this.enemy.height == 'number' ? this.enemy.height : this.mutantHeight;
        var arrayPos = Math.floor((this.enemy.x + 5) / Level.tileSize) + Math.floor((this.enemy.y + 5) / Level.tileSize) * Level.width;
        var bottomArrayPos = Math.floor((this.enemy.x + enemyWidth / 2) / Level.tileSize) + Math.floor((this.enemy.y + enemyHeight) / Level.tileSize) * Level.width;
        if (this.currentLevel[bottomArrayPos].type == ".") {
            this.enemy.y++;
        }
        if (this.currentLevel[arrayPos].blocking == 1 || this.currentLevel[arrayPos].type == "h")
            this.enemy.direction = 1 - this.enemy.direction;
        if (this.enemy.direction == 1)
            arrayPos = Math.floor((this.enemy.x + enemyWidth + 5) / Level.tileSize) + Math.floor((this.enemy.y + enemyHeight + 15) / Level.tileSize) * Level.width;
        else
            arrayPos = Math.floor((this.enemy.x - 5) / Level.tileSize) + Math.floor((this.enemy.y + enemyHeight + 15) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 0) {
            this.enemy.direction = 1 - this.enemy.direction;
        }
        if (!this.idle && Math.random() > 0.995) {
            this.idleTimer = 60 + Math.random() * 20;
            this.idle = true;
        }
    };
    return MutantStrategy;
}());
