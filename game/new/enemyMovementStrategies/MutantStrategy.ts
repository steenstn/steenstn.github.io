class MutantStrategy {
  private mutantWidth = 88;
  private mutantHeight = 36;
  private idleTimer = 50;
  private idle = false;
  constructor(public enemy, public currentLevel) {

  }

  move() {
    if(!this.idle) {
      if(this.enemy.direction==1) {
  			this.enemy.x+=this.enemy.speedx;
      }	else {
  			this.enemy.x-=this.enemy.speedx;
      }
    } else {
      this.idleTimer--;
      if(this.idleTimer < 0) {
        this.idle = false;
      }
    }

    let enemyWidth = typeof this.enemy.width == 'number' ? this.enemy.width : this.mutantWidth;
    let enemyHeight = typeof this.enemy.height == 'number' ? this.enemy.height : this.mutantHeight;

		var arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)
    var bottomArrayPos = Math.floor((this.enemy.x+enemyWidth/2)/Level.tileSize)+Math.floor((this.enemy.y+enemyHeight)/Level.tileSize)*Level.width;
    if(this.currentLevel[bottomArrayPos].type==".") {
      this.enemy.y++;
    }
		if(this.currentLevel[arrayPos].blocking==1 || this.currentLevel[arrayPos].type=="h")
			this.enemy.direction=1-this.enemy.direction;


		// Check one tile ahead and below, if it's empty, turn around
		if(this.enemy.direction==1) // Going right
			arrayPos=Math.floor((this.enemy.x+enemyWidth+5)/Level.tileSize)+Math.floor((this.enemy.y+enemyHeight+15)/Level.tileSize)*Level.width;
		else
			arrayPos=Math.floor((this.enemy.x-5)/Level.tileSize)+Math.floor((this.enemy.y+enemyHeight+15)/Level.tileSize)*Level.width;

    if(this.currentLevel[arrayPos].blocking==0) {
      this.enemy.direction=1-this.enemy.direction;
    }
    if(!this.idle && Math.random() > 0.99) {
      this.idleTimer = 50 + Math.random()*20;
      this.idle = true;
    }
	}
}
