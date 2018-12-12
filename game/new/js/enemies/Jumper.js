class Jumper extends Enemy {
    constructor(enemy, currentLevel) {
        super(new JumpingStrategy(enemy, currentLevel));
        this.width = 10;
        this.height = 20;
        this.offsetx = 3;
        this.offsety = 3;
        this.speedx = 3.5;
        this.speedy = 0;
        this.jumping = 1;
        this.animationCounter = 0;
        this.currentFrame = 0;
        this.x = enemy.x;
        this.y = enemy.y;
        this.oldx = enemy.oldx;
        this.oldy = enemy.oldy;
        this.direction = enemy.direction;
        Jumper.image.src = "frances.png";
        Jumper.image.width = 32;
        Jumper.image.height = 60;
    }
    draw(context) {
        context.drawImage(Jumper.image, 16 * this.currentFrame, 30 - 30 * this.direction, 16, 30, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 16, 30);
    }
}
Jumper.image = new Image();
