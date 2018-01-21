class Skull extends Enemy {
  static image = new Image();
  speedx = 2;
  direction : number;
  constructor(enemy, currentLevel) {
    super(new GlidingStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;
  }

  draw(context) {
    context.drawImage(Skull.image,Viewport.x+this.x,Viewport.y+this.y);

  }
}
