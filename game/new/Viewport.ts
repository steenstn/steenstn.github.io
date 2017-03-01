class Viewport {
  static x : number;
  static y : number;
  static oldx : number;
  static oldy : number;
  constructor() {

    Viewport.x = 0;
    Viewport.y = 0;
    Viewport.oldx = Viewport.x;
    Viewport.oldy = Viewport.y;
  }
}
