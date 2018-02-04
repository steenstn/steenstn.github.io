class HealthParticleFactory {
  private particleImage : any;

  constructor(image) {
    this.particleImage = image;
  }

  createParticle(x: number, y: number, player: any, playerToHeal: any) {
    return new HealthParticle(x, y+25, -9 + 20*Math.random(), -10*Math.random(), this.particleImage, player, playerToHeal);
  }
}
