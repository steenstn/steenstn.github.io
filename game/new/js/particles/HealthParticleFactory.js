var HealthParticleFactory = (function () {
    function HealthParticleFactory(image) {
        this.particleImage = image;
    }
    HealthParticleFactory.prototype.createParticle = function (x, y, player) {
        return new HealthParticle(x, y + 25, -9 + 20 * Math.random(), -10 * Math.random(), this.particleImage, player);
    };
    return HealthParticleFactory;
}());
