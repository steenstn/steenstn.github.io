class Jumper extends Enemy {
  static image = new Image();

  speedx = 3.5;
  speedy = 0;
  jumping = 1;
  direction : number;

  constructor(enemy, currentLevel) {
    super(new JumpingStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;
  }

  draw(context) {
    context.drawImage(Jumper.image,36,0,17,30,Viewport.x+this.x,Viewport.y+this.y, 17, 30);
    }
}
