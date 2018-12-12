class HealthParticleFactory {
    constructor(image) {
        this.particleImage = image;
    }
    createParticle(x, y, player, playerToHeal) {
        return new HealthParticle(x, y + 25, -9 + 20 * Math.random(), -10 * Math.random(), this.particleImage, player, playerToHeal);
    }
}
