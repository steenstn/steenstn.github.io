var BloodFactory = (function () {
    function BloodFactory(bloodImage) {
        this.bloodImage = bloodImage;
    }
    BloodFactory.prototype.createBlood = function (x, y, direction) {
        direction > 0 ? 1 : -1;
        return new BloodParticle(x, y + Math.random() * 25, direction * 21 * Math.random(), -3 * Math.random(), this.bloodImage);
    };
    return BloodFactory;
}());
