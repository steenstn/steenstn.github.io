var BossStrategy = (function () {
    function BossStrategy(enemy, currentLevel) {
        this.enemy = enemy;
        this.currentLevel = currentLevel;
    }
    BossStrategy.prototype.move = function (enemy) {
        var offsetx = enemy.speedx > 0 ? enemy.width + 5 : -5;
        var offsety = enemy.height;
        enemy.speedy += WorldConstants.gravity;
        if (Level.getBlockAt(enemy.x + offsetx, enemy.y).blocking === true || Level.getBlockAt(enemy.x + offsetx, enemy.y).type == 'h') {
            enemy.speedx *= -1;
            enemy.speedy = -4;
        }
        if (Level.getBlockAt(enemy.x + enemy.width / 2, enemy.y + offsety).blocking === true) {
            enemy.speedy = -8;
            if (Math.random() > 0.5) {
                Level.currentLevel[Level.getIndexAt(enemy.x + enemy.width / 2, enemy.y + offsety)] = LevelTile.newFromCharacter('.');
            }
        }
        enemy.x += enemy.speedx;
        enemy.y += enemy.speedy;
    };
    return BossStrategy;
}());
