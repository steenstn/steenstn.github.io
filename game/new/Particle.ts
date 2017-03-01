class Particle {
  x : number;
  y : number;
  xSpeed : number;
  ySpeed : number;
  image : any;
  state : number;
  xFriction : number;

  static readonly ACTIVE = 1;
  static readonly INACTIVE = 0;
  static readonly DRIPPING = 2;

  constructor(x, y, xSpeed, ySpeed, image) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.image = image;

    this.xFriction = 1.1;
  }

  move() {
    if(this.state === Particle.ACTIVE) {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
      this.ySpeed+=0.3;
      this.xSpeed/=this.xFriction;
    } else if (this.state === Particle.DRIPPING) {
      this.ySpeed = 0.02;
      this.xSpeed = 0;
      this.y+=this.ySpeed;
    } else {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
    }
  }

  render(context) {
    context.drawImage(this.image, this.x + Viewport.x, this.y + Viewport.y);
  }
}
