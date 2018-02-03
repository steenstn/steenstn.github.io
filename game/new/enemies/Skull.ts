class Skull extends Enemy {
  static image = new Image();
  speedx = 0;
  acceleration = 0.5;
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
    let drawingOffsetx;
    let drawingWidth;
    if(this.speedx > 0.5) {
      drawingOffsetx = 75;
      drawingWidth = 36;
    } else if(this.speedx < -0.5) {
      drawingOffsetx = 0;
      drawingWidth = 36;
    } else {
      drawingOffsetx = 39;
      drawingWidth = 32;
    }
    context.drawImage(Skull.image,drawingOffsetx,0,drawingWidth,50,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), 36, 50);

  }
}