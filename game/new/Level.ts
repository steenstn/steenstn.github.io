class Level {
  // The size of the level in tiles
  static readonly width = 200;
  static readonly height = 100;

  static readonly tileSize = 32;
  static currentLevel = new Array(Level.width*Level.height);
  static tileset : any;

  static loadTileset() {
      Level.tileset = new Image();
      Level.tileset.src = "tileset.png";
  }

  static getBlockAt(x: number, y:number) {
    let index = Math.floor(x/Level.tileSize)+Math.floor(y/Level.tileSize)*Level.width;
    return Level.currentLevel[index];
  }

  static getIndexAt(x: number, y: number) : number {
    return Math.floor(x/Level.tileSize)+Math.floor(y/Level.tileSize)*Level.width;
  }

  static render(context) {

    //Only loop through tiles that are almost in the screen
  	var startx=Math.floor(-Viewport.x/Level.tileSize)-1;
  	var starty=Math.floor(-Viewport.y/Level.tileSize)-1;
  	if(startx<0)
  		startx=0;
  	if(starty<0)
  		starty=0;
  	var endx=startx+Viewport.width/Level.tileSize+2;
  	var endy=starty+Viewport.height/Level.tileSize+2;

  	if(endx>Level.width)
  		endx=Level.width;
  	if(endy>Level.height)
  		endy=Level.height;


  	for(var y=starty;y<endy;y++) {
  		for(var x=startx;x<endx;x++) {
  			var posx = Math.round(Viewport.x+x*Level.tileSize);
  			var posy = Math.round(Viewport.y+y*Level.tileSize);

        var isAirTile = Level.currentLevel[x+y*Level.width].type==="."
  			if(!isAirTile) {
  				context.drawImage(Level.tileset,Level.currentLevel[x+y*Level.width].tileOffsetx,Level.currentLevel[x+y*Level.width].tileOffsety, Level.tileSize,
  					Level.tileSize,posx,posy, Level.tileSize, Level.tileSize);
  			}

  		}
  	}
  }
}
