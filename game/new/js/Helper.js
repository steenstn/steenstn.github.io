var Helper = (function () {
    function Helper() {
    }
    Helper.clamp = function (input, min, max) {
        return input > max ? max : input < min ? min : input;
    };
    Helper.overlap = function (x, y, width, height, x2, y2, width2, height2) {
        return (x < x2 + width2 && x + width > x2 && y < y2 + height2 && y + height > y2);
    };
    return Helper;
}());
