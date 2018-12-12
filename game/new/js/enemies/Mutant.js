class Mutant extends Enemy {
    constructor(enemy, currentLevel) {
        super(new MutantStrategy(enemy, currentLevel));
        this.speedx = 3;
        this.width = 80;
        this.height = 36;
        this.offsetx = 5;
        this.offsety = 5;
        this.idleAnimationCounter = 0;
        this.idleCurrentFrame = 0;
        this.x = enemy.x;
        this.y = enemy.y;
        this.oldx = enemy.oldx;
        this.oldy = enemy.oldy;
        this.direction = enemy.direction;
        Mutant.image.src = "mutant.png";
        Mutant.image.width = 88;
        Mutant.image.height = 36;
    }
    draw(context) {
        context.drawImage(Mutant.image, 88 * this.idleCurrentFrame, 0, 88, 36, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 88, 36);
    }
}
Mutant.image = new Image();
