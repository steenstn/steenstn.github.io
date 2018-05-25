class Smoke {
  static image = new Image();

  private animationTimer: number;
  private numFrames = 7
  constructor(private x: number, private y: number) {
    Smoke.image.src="smoke.png";
    this.animationTimer = 0;
  }

  draw(context: any) {
    context.drawImage(Smoke.image, this.animationTimer*20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
    this.animationTimer++;
  }
}
