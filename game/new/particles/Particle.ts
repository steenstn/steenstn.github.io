class Particle {
  x : number;
  y : number;
  xSpeed : number;
  ySpeed : number;
  image : any;
  state : number;
  xFriction : number;
  shouldBeDeleted : boolean;

  constructor(x, y, xSpeed, ySpeed, image) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.image = image;

    this.xFriction = 1.1;
    this.shouldBeDeleted = false;
  }

  move() {
    if(Math.abs(this.x+Viewport.x) > Viewport.width*2 &&
       Math.abs(this.y+Viewport.y) > Viewport.height*2) {
         return;
    }
    if(this.shouldBeDeleted) {
      return;
    }
    var arrayPos = Level.getBlockAt(this.x, this.y);
    var downRight = Level.getBlockAt(this.x+1,this.y+1);
    var downLeft = Level.getBlockAt(this.x-1,this.y+1);
    var down = Level.getBlockAt(this.x,this.y+1);

    var arrayPosOutsideLevel = typeof arrayPos==='undefined';
    var downRightOutsideLevel = typeof downRight==='undefined';
    var downLeftOutsideLevel = typeof downLeft==='undefined';
    var downOutsideLevel = typeof down==='undefined';

    var anyCheckingPointOutsideOfLevel = arrayPosOutsideLevel || downRightOutsideLevel || downLeftOutsideLevel || downOutsideLevel;

    if(anyCheckingPointOutsideOfLevel) {
      this.shouldBeDeleted = true;
    } else {
      var isDownLeftBlocked = downLeft.blocking==1;
      var isDownRightBlocked = downRight.blocking==1;
      var isDownBlocked = down.blocking==1;

      if(isDownBlocked && isDownRightBlocked && isDownLeftBlocked) {
        this.state = 0;
      } else if(isDownBlocked && (!isDownRightBlocked || !isDownLeftBlocked)) {
        this.state = 2;
      } else {
        this.state = 1;
      }

    }
  }
  render(context) {
    if(Helper.outOfBounds(this.x, this.y)) {
      return;
    }
    context.drawImage(this.image, Math.round(this.x + Viewport.x), Math.round(this.y + Viewport.y));
  }
}
