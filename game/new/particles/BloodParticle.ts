class BloodParticle extends Particle{

  static readonly ACTIVE = 1;
  static readonly INACTIVE = 0;
  static readonly DRIPPING = 2;

  move() {
    super.move();
    if(this.state === BloodParticle.ACTIVE) {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
      this.ySpeed+=0.3;
      this.xSpeed/=this.xFriction;
    } else if (this.state === BloodParticle.DRIPPING) {
      this.ySpeed = 0.015;
      this.xSpeed = 0;
      this.y+=this.ySpeed;
    } else {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
    }
  }
}
