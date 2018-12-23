class HealthParticle extends Particle {
  private xAcc = 0;
  private yAcc = 0;
  private movingState = 0;
  private target : any;
  private targetToHeal : any;
  private oldPosition : Array<Vector>;
  private trailLength = 3;

  constructor(x: number, y:number, xSpeed: number, ySpeed: number, image: any, target: any, targetToHeal: any) {
    super(x, y, xSpeed, ySpeed, image);
    this.target = target;
    this.targetToHeal = targetToHeal;
    this.xFriction = 1.085;
    this.oldPosition = [];
    
    for(let i = 0; i < this.trailLength; i++) {
      this.oldPosition.push(new Vector(x,y));
    }
    
  }

  move() {
    super.move();

    if(this.shouldBeDeleted) {
      return;
    }

    if(this.movingState===0) {
      this.xSpeed/=this.xFriction;
      this.ySpeed/=this.xFriction;
      if(Math.abs(this.xSpeed) < Math.random() && Math.abs(this.ySpeed) < Math.random()) {
        this.movingState = 1;
      }
    } else {
      let angle = Math.atan2(this.target.y+this.target.height/2-this.y,this.target.x+this.target.height/2-this.x);
      this.xAcc = Math.cos(angle);
      this.yAcc = Math.sin(angle);

      this.xSpeed+=this.xAcc;
      this.ySpeed+=this.yAcc;
      this.xSpeed = Helper.clamp(this.xSpeed,-8,8);
      this.ySpeed = Helper.clamp(this.ySpeed,-8,8);
      if(Helper.overlap(this.x, this.y, 2, 2, this.target.x, this.target.y, this.target.width, this.target.height)) {
        this.targetToHeal.hp+=0.5;
        this.targetToHeal.hp = Helper.clamp(this.targetToHeal.hp,0,100);
        this.shouldBeDeleted = true;
      }
    }
    for(let i = this.oldPosition.length-1; i >0; i--) {
      this.oldPosition[i] = new Vector(this.oldPosition[i-1].x, this.oldPosition[i-1].y);
    }
    this.oldPosition[0] = new Vector(this.x, this.y);
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;

    
  }

  render(context) {
    super.render(context);
    context.beginPath();
    context.moveTo(Math.round(this.x + Viewport.x), Math.round(this.y+Viewport.y));
    let oldLineWidth = context.lineWidth;
    context.lineWidth = 2;
    this.oldPosition.forEach((p, index) => {
      let r = Math.floor(Math.random()*255);
      context.strokeStyle = "rgba("+r+",255,80,"+index/(this.oldPosition.length*2) + ")";
      context.lineTo(Math.round(p.x + Viewport.x), Math.round(p.y + Viewport.y))
      context.stroke();
    });
    context.lineWidth = oldLineWidth;
  }
}
