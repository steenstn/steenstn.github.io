var PlayerHealthBar = (function () {
    function PlayerHealthBar(player) {
        var _this = this;
        this.render = function (context) {
            _this.counter++;
            var g = _this.player.hp * 2 + 29;
            var r = 250 - _this.player.hp * 2;
            context.fillStyle = "rgb(" + r + "," + g + ",28)";
            if (_this.player.hp > 20) {
                context.fillRect(Viewport.width / 2 - 50, 16, Math.round(_this.player.hp), 8);
            }
            else {
                if (_this.counter % 40 > 20) {
                    context.fillRect(Viewport.width / 2 - 50, 16, Math.round(_this.player.hp), 8);
                }
            }
        };
        this.counter = 0;
        this.player = player;
    }
    return PlayerHealthBar;
}());
