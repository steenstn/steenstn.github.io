class HealthParticle extends Particle {
  private xAcc = 0;
  private yAcc = 0;
  private movingState = 0;
  private target : any;
  private lifetime = 20;
  constructor(x: number, y:number, xSpeed: number, ySpeed: number, image: any, target: any) {
    super(x, y, xSpeed, ySpeed, image);
    this.target = target;
    this.xFriction = 1.085;
  }

  move() {
    super.move();
    
    if(this.movingState===0) {
      this.xSpeed/=this.xFriction;
      this.ySpeed/=this.xFriction;
      if(Math.abs(this.xSpeed) < Math.random() && Math.abs(this.ySpeed) < Math.random()) {
        this.movingState = 1;
      }
    } else {
      //let angle = Math.atan2(-Viewport.y-this.y,-Viewport.x+Viewport.width/2-this.x);
      let angle = Math.atan2(this.target.y+this.target.height/2-this.y,this.target.x+this.target.height/2-this.x);
      this.xAcc = Math.cos(angle);
      this.yAcc = Math.sin(angle);

      this.xSpeed+=this.xAcc;
      this.ySpeed+=this.yAcc;
      this.xSpeed = Helper.clamp(this.xSpeed,-8,8);
      this.ySpeed = Helper.clamp(this.ySpeed,-8,8);
      if(Helper.overlap(this.x, this.y, 2, 2, this.target.x, this.target.y, this.target.width, this.target.height)) {
        this.target.hp+=0.5;
        this.target.hp = Helper.clamp(this.target.hp,0,100);
        this.shouldBeDeleted = true;
      }
    }

    this.x+=this.xSpeed;
    this.y+=this.ySpeed;


  }
}
