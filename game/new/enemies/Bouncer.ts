class Bouncer extends Enemy {
  static image = new Image();
  speedx : number;
  speedy : number;
  constructor(enemy, currentLevel) {
    super(new FlyingStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.speedx = enemy.speedx;
    this.speedy = enemy.speedy;
  }

  draw(context) {
    context.drawImage(Bouncer.image,67,0,17,30,Viewport.x+this.x,Viewport.y+this.y, 17, 30);
  }
}
