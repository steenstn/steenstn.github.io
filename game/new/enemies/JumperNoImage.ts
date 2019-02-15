class JumperNoImage extends Enemy {
  width=10;
  height=20;
  offsetx=3;
  offsety=3;
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
    
  }
}
