class Smoke {
  static image = new Image();
  private animationTimer: number;
  private numFrames = 7
  private done : boolean;
  static readonly LandingSmoke = 0;
  static readonly LeftSmoke = 1;
  static readonly RightSmoke = 2;

  constructor(private x: number, private y: number,private mode: number) {
    Smoke.image.src="smoke.png";
    this.animationTimer = 0;
    this.done = false;
  }

  isDone() : boolean {
    return this.done;
  }

  draw(context: any) {
    if(!this.isDone()) {
      if(this.mode === Smoke.LandingSmoke) {
        context.drawImage(Smoke.image, Math.floor(this.animationTimer)*20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
      } else if(this.mode === Smoke.LeftSmoke) {
        context.drawImage(Smoke.image, Math.floor(this.animationTimer)*20, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
      } else if(this.mode === Smoke.RightSmoke) {
        context.drawImage(Smoke.image, Math.floor(this.animationTimer)*20+10, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
      }
      this.animationTimer+=0.3;
      if(this.animationTimer>this.numFrames) {
        this.done = true;
      }
    }
  }
}
