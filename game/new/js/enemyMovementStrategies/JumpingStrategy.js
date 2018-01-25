var JumpingStrategy = (function () {
    function JumpingStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
    }
    JumpingStrategy.prototype.move = function (enemy) {
        enemy.animationCounter++;
        if (enemy.animationCounter > 3) {
            enemy.currentFrame = 1 - enemy.currentFrame;
            enemy.animationCounter = 0;
        }
        if (enemy.direction == 1)
            enemy.x += enemy.speedx;
        else
            enemy.x -= enemy.speedx;
        var arrayPos = Math.floor((enemy.x + 5) / Level.tileSize) + Math.floor((enemy.y + 5) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1 || this.currentLevel[arrayPos].type == "h")
            enemy.direction = 1 - enemy.direction;
        if (enemy.jumping == 0) {
            if (enemy.direction == 1)
                arrayPos = Math.floor((enemy.x + 15) / Level.tileSize) + Math.floor((enemy.y + 15) / Level.tileSize) * Level.width;
            else
                arrayPos = Math.floor((enemy.x - 15) / Level.tileSize) + Math.floor((enemy.y + 15) / Level.tileSize) * Level.width;
            var shouldJump = (this.currentLevel[arrayPos].blocking == 0 && Math.random() > 0.8) || Math.random() > 0.98;
            if (shouldJump) {
                enemy.jumping = 1;
                enemy.speedy = -5;
            }
        }
        arrayPos = Math.floor((enemy.x + 5) / Level.tileSize) + Math.floor((enemy.y) / Level.tileSize) * Level.width;
        if (enemy.speedy < WorldConstants.maxSpeedy)
            enemy.speedy += WorldConstants.gravity;
        enemy.y += enemy.speedy;
        arrayPos = Math.floor((enemy.x + 15) / Level.tileSize) + Math.floor((enemy.y + 30) / Level.tileSize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1) {
            enemy.y = enemy.oldy;
            if (enemy.speedy < 0) {
                enemy.speedy = 0;
            }
            else {
                enemy.jumping = 0;
            }
        }
    };
    return JumpingStrategy;
}());
