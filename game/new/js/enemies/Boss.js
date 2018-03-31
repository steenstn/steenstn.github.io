var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss(enemy, currentLevel) {
        var _this = _super.call(this, new BossStrategy(enemy, currentLevel)) || this;
        _this.speedx = 4.5;
        _this.speedy = 0;
        _this.width = 60;
        _this.height = 60;
        _this.type = "boss";
        _this.maxHp = 40;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.hp = _this.maxHp;
        _this.oldHp = _this.hp;
        Boss.image.src = "deloused.png";
        _this.hurtAnimationCounter = 10;
        return _this;
    }
    Boss.prototype.draw = function (context) {
        if (this.hp !== this.oldHp) {
            this.hurtAnimationCounter = 10;
        }
        var offsetx = this.hurtAnimationCounter > 0 ? 120 : 60;
        var offsety = this.speedx > 0 ? 1 : 0;
        context.fillStyle = "#fafafa";
        context.drawImage(Boss.image, offsetx, 60 * offsety, 60, 60, Math.round(this.x + Viewport.x), Math.round(this.y + Viewport.y), 60, 60);
        this.hurtAnimationCounter--;
    };
    Boss.prototype.drawHp = function (context) {
        context.fillStyle = this.hp !== this.oldHp ? "#ffffff" : "#fa0000";
        context.fillRect(Viewport.width - 50, Viewport.height - 2 * this.hp - 20, 30, 2 * this.hp);
        context.strokeStyle = "#ffffff";
        context.strokeRect(Viewport.width - 50, Viewport.height - 2 * this.maxHp - 20, 30, 2 * this.maxHp);
        this.oldHp = this.hp;
    };
    return Boss;
}(Enemy));
Boss.image = new Image();
