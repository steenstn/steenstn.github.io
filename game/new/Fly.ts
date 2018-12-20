class Fly {
  private x : number;
  private y : number;
  private targetx : number;
  private targety : number;
  private homex : number;
  private homey : number;
  private state : number;
  private oldState : number;
  private safex : number;
  private safey : number;
  private safePositionSet = false;
  private nectarCollected : number;
  private inDanger : boolean;
  static image = new Image();

  private static GOING_HOME = 0;
  private static FLEEING = 1;
  private static SEARCHING = 2;
  private static GATHERING = 3;

  private homeAttacked = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.targetx = x;
    this.targety = y;
    this.homex = x;
    this.homey = y;
    this.state = Fly.SEARCHING;
    this.inDanger = false;
    this.nectarCollected = 0;
    Fly.image.src = "fly.png";
  }

  move(players : any, flowers : any) {
    if(Helper.outOfBounds(this.x, this.y)) {
         return;
    }
    this.inDanger = false;
    let dangerx = 0;
    let dangery = 0;
    for(let i = 0; i < players.length; i++) {
      if((Math.abs(this.x-players[i].x) < 50 && Math.abs(this.y-players[i].y) < 50)) {
        this.state = Fly.FLEEING
        dangerx = players[i].x;
        dangery = players[i].y;
        this.inDanger = true;
      }
    }



    if(this.state == Fly.FLEEING) {
      let angle = Math.atan2(this.y-dangery,this.x - dangerx);
      let xCoefficient = Math.cos(angle);
      let yCoefficient = Math.sin(angle);

      this.safex = dangerx + xCoefficient*90+Math.random()*30*xCoefficient;
      this.safey = dangery + yCoefficient*90;+Math.random()*30*yCoefficient;
      this.targetx = this.safex;
      this.targety = this.safey;
      if(!this.inDanger) {
        this.state = Fly.SEARCHING;
        this.targetx = this.x;
        this.targety = this.y;
      }
    }

    let baseTargetx=this.homex;
    let baseTargety=this.homey;
    let speed=1;
    if(this.state == Fly.GOING_HOME) {
      let arrivedAtTarget = Math.abs(this.x-this.targetx) < 10 && Math.abs(this.y-this.targety) < 10;
      if(arrivedAtTarget) {
        baseTargetx = this.homex;
        baseTargety = this.homey;
        speed = 1;
        this.targetx = baseTargetx + Math.random()*50-25;
        this.targety = baseTargety + Math.random()*50-25;
        this.nectarCollected-=Math.random()*10;
        if(this.nectarCollected<=0) {
          this.state = Fly.SEARCHING;
        }
      }
    } else if(this.state == Fly.FLEEING) {
      baseTargetx = this.safex;
      baseTargety = this.safey;
      speed = 2;
      let arrivedAtTarget = Math.abs(this.x-this.targetx) < 10 && Math.abs(this.y-this.targety) < 10;
      if(arrivedAtTarget) {
        this.targetx = baseTargetx + Math.random()*50-25;
        this.targety = baseTargety + Math.random()*50-25;
      }

    }else if(this.state == Fly.SEARCHING) {
      baseTargetx = this.homex;
      baseTargety = this.homey;
      speed = 1;
      let arrivedAtTarget = Math.abs(this.x-this.targetx) < 10 && Math.abs(this.y-this.targety) < 10;
      if(arrivedAtTarget) {
        this.targetx = baseTargetx + Math.random()*500-250;
        this.targety = baseTargety + Math.random()*100-50;
      }
        for(let i = 0; i < flowers.length; i++) {
          if((Math.abs(this.x-flowers[i].x) < 30 && Math.abs(this.y-flowers[i].y) < 30)) {
            this.targetx = flowers[i].x;
            this.targety = flowers[i].y;
            this.nectarCollected++;
            if(this.nectarCollected>250) {
        //      this.targetx = this.homex;
        //      this.targety = this.homey;
              this.state = Fly.GOING_HOME;

            }
          }
        }

    }

    let angle = Math.atan2(this.targety-this.y,this.targetx-this.x);
    let xCoefficient = Math.cos(angle);
    let yCoefficient = Math.sin(angle);
    let xSpeed = xCoefficient*speed;
    let ySpeed = yCoefficient*speed;

    let sideMovement = Math.random()*4*speed-2*speed;
    let sideSpeedX = Math.cos(angle+90)*sideMovement;
    let sideSpeedY = Math.sin(angle+90)*sideMovement;

    this.x+=xSpeed+sideSpeedX;
    this.y+=ySpeed+sideSpeedY;
  }

  render(context) {
    //context.fillStyle = "#FFFFFF";
    //context.fillRect(Math.round(Viewport.x + this.targetx), Math.round(Viewport.y + this.targety), 2, 2);
    context.drawImage(Fly.image, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y));
    //context.fillText(index, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y));
  }
}
