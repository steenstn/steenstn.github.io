var JumpingStrategy = (function () {
    function JumpingStrategy(enemy, currentLevel, maxSpeedy, gravity) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
        this.maxSpeedy = maxSpeedy;
        this.gravity = gravity;
    }
    JumpingStrategy.prototype.move = function () {
        if (this.enemy.direction == 1)
            this.enemy.x += 3.5;
        else
            this.enemy.x -= 3.5;
        var arrayPos = Math.floor((this.enemy.x + 5) / Level.tileSize) + Math.floor((this.enemy.y + 5) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1 || this.currentLevel[arrayPos].type == "h")
            this.enemy.direction = 1 - this.enemy.direction;
        if (this.enemy.jumping == 0) {
            if (this.enemy.direction == 1)
                arrayPos = Math.floor((this.enemy.x + 15) / Level.tileSize) + Math.floor((this.enemy.y + 15) / Level.tileSize) * Level.width;
            else
                arrayPos = Math.floor((this.enemy.x - 15) / Level.tileSize) + Math.floor((this.enemy.y + 15) / Level.tileSize) * Level.width;
            if (this.currentLevel[arrayPos].blocking == 0 || Math.random() > 0.98) {
                this.enemy.jumping = 1;
                this.enemy.speedy = -5;
            }
        }
        arrayPos = Math.floor((this.enemy.x + 5) / Level.tileSize) + Math.floor((this.enemy.y) / Level.tileSize) * Level.width;
        if (this.enemy.speedy < this.maxSpeedy)
            this.enemy.speedy += this.gravity;
        this.enemy.y += this.enemy.speedy;
        arrayPos = Math.floor((this.enemy.x + 5) / Level.tileSize) + Math.floor((this.enemy.y + 5) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1) {
            this.enemy.y = this.enemy.oldy;
            this.enemy.jumping = 0;
        }
    };
    return JumpingStrategy;
}());