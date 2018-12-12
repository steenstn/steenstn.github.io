class TimedParticleFactory {
    constructor(image) {
        this.particleLifetime = 50;
        this.particleImage = image;
    }
    createParticle(x, y, lifetime) {
        return new TimedParticle(x, y + 25, -9 + 20 * Math.random(), -10 * Math.random(), this.particleImage, this.particleLifetime);
    }
}
