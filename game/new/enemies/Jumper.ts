class Jumper extends Enemy {
  static image = new Image();
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

  constructor(enemy) {
    super(new JumpingStrategy(enemy));
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
    context.drawImage(Jumper.image,16*this.currentFrame,30-30*this.direction,16,30,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), 16, 30);
    }
}
