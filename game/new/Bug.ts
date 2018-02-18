class Bug {
  private x : number;
  private y : number;
  private targetx : number;
  private targety : number;
  private homex : number;
  private homey : number;
  private image : any;
  private state : number;
  private safex : number;
  private safey : number;
  private safePositionSet = false;

  private static GOING_HOME = 0;
  private static FLEEING = 1;
  private homeAttacked = 0;
  constructor(image : any, x: number, y: number, homex : number, homey : number) {
    this.x = x;
    this.y = y;
    this.targetx = homex;
    this.targety = homey;
    this.homex = homex;
    this.homey = homey;
    this.image = image;
    this.state = Bug.GOING_HOME;
  }

  move(players : any) {
      if((Math.abs(this.homex-players[0].x) < 30 && Math.abs(this.homey-players[0].y) < 30) ||
          Math.abs(this.homex-players[1].x) < 30 && Math.abs(this.homey-players[1].y) < 30) {
        this.homeAttacked = 1;
        if(!this.safePositionSet) {
          let angle = Math.atan2(this.y-this.homey,this.x - this.homex);
          let xCoefficient = Math.cos(angle);
          let yCoefficient = Math.sin(angle);

          this.safex = this.homex + xCoefficient*70+Math.random()*30*xCoefficient;
          this.safey = this.homey + yCoefficient*70;+Math.random()*30*yCoefficient;
          this.targetx = this.safex;
          this.targety = this.safey;
          this.safePositionSet = true;
        }

        this.state = Bug.FLEEING;
      } else {
        this.homeAttacked = 0;
        this.state = Bug.GOING_HOME;
        this.safePositionSet = false;
      }

    let baseTargetx;
    let baseTargety;
    if(this.state == Bug.GOING_HOME) {
      baseTargetx = this.homex;
      baseTargety = this.homey;
    } else if(this.state == Bug.FLEEING) {
      baseTargetx = this.safex;
      baseTargety = this.safey;
    }
    let arrivedAtTarget = Math.abs(this.x-this.targetx) < 10 && Math.abs(this.y-this.targety) < 10;
    if(arrivedAtTarget) {
      this.targetx = baseTargetx + Math.random()*50-25;
      this.targety = baseTargety + Math.random()*50-25;
    }
    let angle = Math.atan2(this.targety-this.y,this.targetx-this.x);
    let xCoefficient = Math.cos(angle);
    let yCoefficient = Math.sin(angle);
    let xSpeed = xCoefficient*2;
    let ySpeed = yCoefficient*2;

    let sideMovement = Math.random()*8-4;
    let sideSpeedX = Math.cos(angle+90)*sideMovement;
    let sideSpeedY = Math.sin(angle+90)*sideMovement;

    this.x+=xSpeed+sideSpeedX;
    this.y+=ySpeed+sideSpeedY;

  }

  render(context) {
    context.drawImage(this.image, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y));
  }
}
