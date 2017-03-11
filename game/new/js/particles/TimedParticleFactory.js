var TimedParticleFactory = (function () {
    function TimedParticleFactory(image) {
        this.particleLifetime = 50;
        this.particleImage = image;
    }
    TimedParticleFactory.prototype.createParticle = function (x, y, lifetime) {
        return new TimedParticle(x, y + 25, 10 * Math.random(), -10 * Math.random(), this.particleImage, this.particleLifetime);
    };
    return TimedParticleFactory;
}());
