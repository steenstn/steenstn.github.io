var PlayerHealthBar = (function () {
    function PlayerHealthBar(getValueMethod) {
        var _this = this;
        this.render = function (context) {
            var value = _this.getValueMethod();
            _this.counter++;
            var g = value * 2 + 29;
            var r = 250 - value * 2;
            var b = 28;
            context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            if (value > 20) {
                context.fillRect(Viewport.width / 2 - 50, 16, Math.round(value), 8);
            }
            else {
                if (_this.counter % 40 > 20) {
                    context.fillRect(Viewport.width / 2 - 50, 16, Math.round(value), 8);
                }
            }
            context.strokeStyle = "black";
            context.strokeRect(Viewport.width / 2 - 51, 15, 102, 10);
        };
        this.counter = 0;
        this.getValueMethod = getValueMethod;
    }
    return PlayerHealthBar;
}());
