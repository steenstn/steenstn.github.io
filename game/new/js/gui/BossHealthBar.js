var BossHealthBar = (function () {
    function BossHealthBar(getValueMethod) {
        var _this = this;
        this.barSize = 4;
        this.render = function (context) {
            var value = _this.getValueMethod();
            if (!value || value < 1) {
                return;
            }
            context.fillStyle = value !== _this.oldValue ? "#ffffff" : "#fa0000";
            context.fillRect(Viewport.width - 50, Viewport.height - _this.barSize * value - 10, 30, _this.barSize * value);
            context.strokeStyle = "#ffffff";
            context.strokeRect(Viewport.width - 50, Viewport.height - _this.barSize * _this.barMaxValue - 10, 30, _this.barSize * _this.barMaxValue);
            _this.oldValue = value;
        };
        this.getValueMethod = getValueMethod;
        this.oldValue = this.getValueMethod();
        this.barMaxValue = this.oldValue;
    }
    return BossHealthBar;
}());
