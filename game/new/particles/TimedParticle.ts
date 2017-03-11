class TimedParticle extends Particle {

  lifetime : number;

    constructor(x: number, y: number, xSpeed: number, ySpeed: number, image: any, lifetime: number) {
      super(x, y, xSpeed, ySpeed, image);
      this.lifetime = lifetime;
    }

    move() {
      this.lifetime--;
      
      if(this.lifetime <= 0) {
        return;
      }
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;

      this.xSpeed/=this.xFriction;
      this.ySpeed+=0.8;
    }
}
