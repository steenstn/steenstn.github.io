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
var Mutant = (function (_super) {
    __extends(Mutant, _super);
    function Mutant(enemy, currentLevel) {
        var _this = _super.call(this, new MutantStrategy(enemy, currentLevel)) || this;
        _this.speedx = 3;
        _this.width = 88;
        _this.height = 36;
        _this.idleAnimationCounter = 0;
        _this.idleCurrentFrame = 0;
        _this.type = "mutant";
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.oldx = enemy.oldx;
        _this.oldy = enemy.oldy;
        _this.direction = enemy.direction;
        return _this;
    }
    return Mutant;
}(Enemy));
