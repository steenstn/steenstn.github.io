var FlyingStrategy = (function () {
    function FlyingStrategy(enemy, tilesize, currentLevel) {
        this.enemy = enemy;
        this.tilesize = tilesize;
        this.currentLevel = currentLevel;
    }
    FlyingStrategy.prototype.move = function () {
        var xOffset = 0;
        var yOffset = 15;
        if (this.enemy.speedx > 0) {
            xOffset = 20;
        }
        else if (this.enemy.speedx < 0) {
            xOffset = 0;
        }
        var arrayPos = Math.floor((this.enemy.x + xOffset) / this.tilesize) + Math.floor((this.enemy.y + yOffset) / this.tilesize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1 || this.currentLevel[arrayPos].type == "h") {
            this.enemy.speedx *= -1;
        }
        xOffset = 10;
        if (this.enemy.speedy < 0) {
            yOffset = -1;
        }
        else if (this.enemy.speedy > 0) {
            yOffset = 31;
        }
        arrayPos = Math.floor((this.enemy.x + xOffset) / this.tilesize) + Math.floor((this.enemy.y + yOffset) / this.tilesize) * Level.width;
        if (this.currentLevel[arrayPos].blocking == 1 || this.currentLevel[arrayPos].type == "h") {
            this.enemy.speedy *= -1;
        }
        this.enemy.x += this.enemy.speedx;
        this.enemy.y += this.enemy.speedy;
    };
    return FlyingStrategy;
}());
