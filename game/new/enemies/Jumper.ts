class Jumper extends Enemy {
  static image = new Image();

  speedx = 3.5;
  speedy = 0;
  jumping = 1;
  direction : number;
  animationCounter = 0;
  currentFrame = 0;

  constructor(enemy, currentLevel) {
    super(new JumpingStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;
  }

  draw(context) {
    context.drawImage(Jumper.image,16*this.currentFrame,30-30*this.direction,16,30,Viewport.x+this.x,Viewport.y+this.y, 16, 30);
    }
}
