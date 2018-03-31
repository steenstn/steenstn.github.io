class Helper {
  static clamp(input: number, min: number, max: number) {
    return input > max ? max : input < min ? min : input;
  }

  static overlap(x,y,width,height,x2,y2,width2,height2) {
  	return (x < x2+width2 && x+width > x2 && y < y2+height2 && y+height > y2);
  }
  static outOfBounds(x : number, y : number) {
    return Math.abs(Viewport.x + x - Viewport.width/2) > Viewport.width*0.6;
  }

  static loadJsonFile(path) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, false);
    xobj.send(null);
    var jsonTexto = xobj.responseText;
    return JSON.parse(jsonTexto);
  }
}
