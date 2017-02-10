var flyingStrategy = function(tilesize, levelWidth, currentLevel) {
	this.move = function(enemy) {
		var xOffset = 0;
		var yOffset = 15;
		if(enemy.speedx>0) // Going right
		{
			xOffset = 20;
		}
		else if(enemy.speedx<0) // Going left
		{
			xOffset = 0;
		}

		arrayPos=Math.floor((enemy.x+xOffset)/tilesize)+Math.floor((enemy.y+yOffset)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)

		if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h" )
		{
			enemy.speedx*=-1;
		}

		xOffset = 10;

		if(enemy.speedy<0) // Going up up up
		{
			yOffset = -1;
		}
		else if(enemy.speedy>0) // Going down
		{
			yOffset = 31;
		}

		arrayPos=Math.floor((enemy.x+xOffset)/tilesize)+Math.floor((enemy.y+yOffset)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)

		if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h" )
		{
			enemy.speedy*=-1;
		}

		enemy.x+=enemy.speedx;
		enemy.y+=enemy.speedy;
		}
}
