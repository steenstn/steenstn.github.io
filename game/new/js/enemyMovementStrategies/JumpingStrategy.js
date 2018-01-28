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
        var arrayPos;
        if (enemy.direction == 1) {
            enemy.x += enemy.speedx;
            arrayPos = Level.getBlockAt(enemy.x + 20, enemy.y + 15);
        }
        else {
            enemy.x -= enemy.speedx;
            arrayPos = Level.getBlockAt(enemy.x - 5, enemy.y + 15);
        }
        if (arrayPos.blocking == 1 || arrayPos.type == "h")
            enemy.direction = 1 - enemy.direction;
        if (enemy.jumping == 0) {
            if (enemy.direction == 1)
                arrayPos = Level.getBlockAt(enemy.x + 15, enemy.y + 15);
            else
                arrayPos = Level.getBlockAt(enemy.x - 15, enemy.y + 15);
            var shouldJump = (arrayPos.blocking == 0 && Math.random() > 0.8) || Math.random() > 0.98;
            if (shouldJump) {
                enemy.jumping = 1;
                enemy.speedy = -5;
            }
        }
        arrayPos = Level.getBlockAt(enemy.x + 5, enemy.y);
        if (enemy.speedy < WorldConstants.maxSpeedy)
            enemy.speedy += WorldConstants.gravity;
        enemy.y += enemy.speedy;
        arrayPos = Level.getBlockAt(enemy.x + 15, enemy.y + 30);
        if (arrayPos.blocking == 1) {
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
