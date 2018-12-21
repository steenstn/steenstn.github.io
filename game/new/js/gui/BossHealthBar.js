var BossHealthBar = (function () {
    function BossHealthBar(boss) {
        var _this = this;
        this.barSize = 4;
        this.render = function (context) {
            if (!_this.boss || _this.boss.hp < 1) {
                return;
            }
            context.fillStyle = _this.boss.hp !== _this.oldHp ? "#ffffff" : "#fa0000";
            context.fillRect(Viewport.width - 50, Viewport.height - _this.barSize * _this.boss.hp - 10, 30, _this.barSize * _this.boss.hp);
            context.strokeStyle = "#ffffff";
            context.strokeRect(Viewport.width - 50, Viewport.height - _this.barSize * _this.boss.maxHp - 10, 30, _this.barSize * _this.boss.maxHp);
            _this.oldHp = _this.boss.hp;
        };
        this.boss = boss;
        this.oldHp = boss.hp;
    }
    return BossHealthBar;
}());
