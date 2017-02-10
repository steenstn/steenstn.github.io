var flyingStrategy = function(tilesize, levelWidth, currentLevel) {
	this.move = function(enemy) {
		if(enemy.speedx>0) // Going right
			{
				arrayPos=Math.floor((enemy.x+20)/tilesize)+Math.floor((enemy.y+15)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
				if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h" )
				{
					enemy.speedx*=-1;
				}
				
			}
			else if(enemy.speedx<0) // Going left
			{
				arrayPos=Math.floor((enemy.x)/tilesize)+Math.floor((enemy.y+15)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
				if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h" )
				{
					enemy.speedx*=-1;
				}
				
			}
			if(enemy.speedy<0) // Going up up up
			{
				arrayPos=Math.floor((enemy.x+10)/tilesize)+Math.floor((enemy.y-1)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
				if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h" )
				{
					enemy.speedy*=-1;
				}
				
			}
			else if(enemy.speedy>0) // Going down
			{
				arrayPos=Math.floor((enemy.x+10)/tilesize)+Math.floor((enemy.y+31)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
				if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h" )
				{
					enemy.speedy*=-1;
				}
				
			}
			enemy.x+=enemy.speedx;
			enemy.y+=enemy.speedy;
			}
}