class Viewport {
  static x : number;
  static y : number;
  static oldx : number;
  static oldy : number;
  static width = 640;
  static height = 400;
  static numTilesInScreenWidth = Math.round(Viewport.width / Level.tileSize);
  static numTilesInScreenHeight = Math.round(Viewport.height / Level.tileSize);
  constructor() {

    Viewport.x = 0;
    Viewport.y = 0;
    Viewport.oldx = Viewport.x;
    Viewport.oldy = Viewport.y;
  }

  static moveToCenter(x1, y1, x2, y2) {

    let xMidpoint = (x1 + x2) / 2;
    let yMidpoint = (y1 + y2) / 2;

    Viewport.x=Math.round(-xMidpoint+(Viewport.numTilesInScreenWidth / 2)*Level.tileSize);
  	Viewport.y=Math.round(-yMidpoint+(Viewport.numTilesInScreenHeight / 2)*Level.tileSize);



  	// Do not move the screen outside of the level
  	if(Viewport.x>0)
  		Viewport.x=0;
  	if(Viewport.x<-Level.width*Level.tileSize+Viewport.numTilesInScreenWidth*Level.tileSize)
  		Viewport.x=-Level.width*Level.tileSize+Viewport.numTilesInScreenWidth*Level.tileSize;

  	if(Viewport.y>0)
  		Viewport.y=0;
  	if(Viewport.y<-Level.height*Level.tileSize+Viewport.numTilesInScreenHeight*Level.tileSize)
  		Viewport.y=-Level.height*Level.tileSize+Viewport.numTilesInScreenHeight*Level.tileSize

  }


}
