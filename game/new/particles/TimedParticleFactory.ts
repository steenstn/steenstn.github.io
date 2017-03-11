class TimedParticleFactory {

  private particleImage : any;
  private particleLifetime = 50;

  constructor(image) {
    this.particleImage = image;
  }

  createParticle(x: number, y: number, lifetime: number) {
    return new TimedParticle(x, y+25, 10*Math.random(), -10*Math.random(), this.particleImage, this.particleLifetime)
  }
}
