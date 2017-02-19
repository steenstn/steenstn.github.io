var glidingStrategy = function(enemy, tilesize, levelWidth, currentLevel) {
	this.enemy = enemy;
	this.move = function() {
		if(enemy.direction==1)
			enemy.x+=2;
		else
			enemy.x-=2;


		arrayPos=Math.floor((enemy.x+5)/tilesize)+Math.floor((enemy.y+5)/tilesize)*levelWidth; // The position in the level array(Middle of the enemy at the moment)

		if(currentLevel[arrayPos].blocking==1) {
			enemy.direction=1-enemy.direction;
		}
	}
};
