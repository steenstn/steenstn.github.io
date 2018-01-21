class FlyingStrategy{
  constructor(public enemy, public currentLevel){

  }

  move() {
    var xOffset = 0;
    var yOffset = 15;

    if(this.enemy.speedx>0) // Going right
		{
			xOffset = 20;
		}	else if(this.enemy.speedx<0) {// Going left
			xOffset = 0;
		}

    var arrayPos=Math.floor((this.enemy.x+xOffset)/Level.tileSize)+Math.floor((this.enemy.y+yOffset)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)
    if(this.currentLevel[arrayPos].blocking==1 || this.currentLevel[arrayPos].type=="h" )
    {
      this.enemy.speedx*=-1;
    }

    xOffset = 10;

		if(this.enemy.speedy<0) // Going up up up
		{
			yOffset = -1;
		}
		else if(this.enemy.speedy>0) // Going down
		{
			yOffset = 31;
		}

    arrayPos=Math.floor((this.enemy.x+xOffset)/Level.tileSize)+Math.floor((this.enemy.y+yOffset)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

		if(this.currentLevel[arrayPos].blocking==1 || this.currentLevel[arrayPos].type=="h" )
		{
			this.enemy.speedy*=-1;
		}

		this.enemy.x+=this.enemy.speedx;
		this.enemy.y+=this.enemy.speedy;
  }
}
