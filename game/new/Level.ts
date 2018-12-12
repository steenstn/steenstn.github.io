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

	
	static getInput(enemies: any, player) {
		var tempLevel = [];
		for(var i = 0; i < Level.currentLevel.length; i++) {
			if(Level.currentLevel[i].type === '.') {
				tempLevel.push(0);
			} else if (Level.currentLevel[i].type === 'h') { // Tree
				tempLevel.push(0);
			}else if (Level.currentLevel[i].type === 's') { // LP
				tempLevel.push(0);
			}else if (Level.currentLevel[i].type === 'p') { // Health
				tempLevel.push(0);
			} else {
				tempLevel.push(1);
			}
			
		}
		for(var i = 0; i < enemies.length; i++) {
			var enemyIndex = Level.getIndexAt(enemies[i].x+1 + enemies[i].width/2, enemies[i].y + enemies[i].height/2);
			tempLevel[enemyIndex] = 0.8;
		}
		var indexPlayer = Level.getIndexAt(player[0].x + player[0].width/2, player[0].y + player[0].height/2);
		tempLevel[indexPlayer] = 0.4;
		//indexPlayer = Level.getIndexAt(player[1].x + player[1].width/2, player[1].y + player[1].height/2);
   // tempLevel[indexPlayer] = 0.6;
		var result = [];
		var startx=Math.floor(-Viewport.x/Level.tileSize);
  	var starty=Math.floor(-Viewport.y/Level.tileSize);
  	if(startx<0)
  		startx=0;
  	if(starty<0)
  		starty=0;
  	var endx=startx+Viewport.width/Level.tileSize;
  	var endy=starty+Viewport.height/Level.tileSize;

  	if(endx>Level.width)
  		endx=Level.width;
  	if(endy>Level.height)
  		endy=Level.height;
	/*	
		var enemyIndices = [];
		for(var i = 0; i < enemies.length; i++) {
			tempLevel[Level.getIndexAt(enemies[i].x+enemies[i].width/2, enemies[i].y+enemies[i].height/2)] = "2";
		}
*/
  	for(var y=starty;y<endy;y++) {
  		for(var x=startx;x<endx;x++) {
  			var posx = Math.round(Viewport.x+x*Level.tileSize);
  			var posy = Math.round(Viewport.y+y*Level.tileSize);
				result.push(tempLevel[x+y*Level.width]);
        /*var tile = tempLevel[x+y*Level.width];
  			if(tile === "." ||tile === "h") 
					result.push(tile);
  			} else {
					result.push(1);
				}*/

  		}
		}
		return result;
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
