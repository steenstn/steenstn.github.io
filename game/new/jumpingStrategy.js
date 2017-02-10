var jumpingStrategy = function(tilesize, levelWidth, currentLevel) {
	this.move = function(enemy) {
		if(enemy.direction==1)
			enemy.x+=3.5;
		else
			enemy.x-=3.5;
			
		arrayPos=Math.floor((enemy.x+5)/tilesize)+Math.floor((enemy.y+5)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
			
		if(currentLevel[arrayPos].blocking==1 || currentLevel[arrayPos].type=="h")
			enemy.direction=1-enemy.direction;
				
			
		// Check one tile ahead and below, if it's empty, jump
		if(enemy.jumping==0)
		{
			if(enemy.direction==1) // Going right
				arrayPos=Math.floor((enemy.x+15)/tilesize)+Math.floor((enemy.y+15)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
			else
				arrayPos=Math.floor((enemy.x-15)/tilesize)+Math.floor((enemy.y+15)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
			
			if(currentLevel[arrayPos].blocking==0 || Math.random()>0.98) // Check for holes in the ground
			{
				enemy.jumping=1;
				enemy.speedy=-5;
			}
		}
		arrayPos=Math.floor((enemy.x+5)/tilesize)+Math.floor((enemy.y)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
		
		if(enemy.speedy<maxSpeedy)
			enemy.speedy+=gravity;
		
		enemy.y+=enemy.speedy;
		arrayPos=Math.floor((enemy.x+5)/tilesize)+Math.floor((enemy.y+5)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)
			
		if(currentLevel[arrayPos].blocking==1) {
			enemy.y=enemy.oldy;
			enemy.jumping=0;
		}
	}
}