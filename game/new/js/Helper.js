var Helper = (function () {
    function Helper() {
    }
    Helper.clamp = function (input, min, max) {
        return input > max ? max : input < min ? min : input;
    };
    Helper.overlap = function (x, y, width, height, x2, y2, width2, height2) {
        return (x < x2 + width2 && x + width > x2 && y < y2 + height2 && y + height > y2);
    };
    Helper.outOfBounds = function (x, y) {
        return Math.abs(Viewport.x + x - Viewport.width / 2) > Viewport.width * 0.6;
    };
    Helper.loadJsonFile = function (path) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, false);
        xobj.send(null);
        var jsonTexto = xobj.responseText;
        return JSON.parse(jsonTexto);
    };
    return Helper;
}());
