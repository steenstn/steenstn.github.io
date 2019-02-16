importScripts("https://wagenaartje.github.io/neataptic/cdn/1.4.7/neataptic.js","js/Original.js", "js/Vector.js","js/TinyQueue.js","js/PathFinder.js","js/Level.js","js/LevelTile.js","js/Viewport.js","js/Player.js","js/Jukebox.js","js/Background.js","js/WorldConstants.js","js/particles/Particle.js","js/particles/BloodParticle.js","js/particles/TimedParticle.js","js/particles/HealthParticle.js","js/particles/BloodFactory.js","js/particles/TimedParticleFactory.js","js/particles/HealthParticleFactory.js","js/Helper.js","js/particles/ParticleCleaner.js","js/enemies/Enemy.js","js/enemies/MutantNoImage.js","js/enemies/BouncerNoImage.js","js/enemies/SkullNoImage.js","js/enemies/JumperNoImage.js","js/enemies/BossNoImage.js","js/Fly.js","js/Bedlam.js","js/enemyMovementStrategies/GlidingStrategy.js","js/enemyMovementStrategies/JumpingStrategy.js","js/enemyMovementStrategies/FlyingStrategy.js","js/enemyMovementStrategies/MutantStrategy.js","js/enemyMovementStrategies/BossStrategy.js")



var debug = 0;
var pixelBackground = 0;
var keyHeldDown = 0;
var numFramesSinceStart = 0;
var maxFitness = 0;
var gLoop;

var pathFinder;
var goal;
var rewardPath;
var rewardPathLength = 0;
var rewardPathInitialLength = 0;
var Architect = neataptic.architect;
var populationSize = 50;
var elitism = 0.2
var mutationRate = 0.3;

var neat;

var originalLevel = [];

var running = false;

var animating = 0;
var lastLevel = 0;
var levelNow = 2; // Number of current level

var numDeaths = 0;
var score = 0;
var dead=0;
var totalNumVinylCollected = 0;

var vinylCollectedInLevel = 0;
var numVinylInLevel = 0;
var totalVinylsInAllLevels = 0;


var bossDeadTimer = 160;
var bossKilled = false;

var particleCleaner = new ParticleCleaner();

var flowers = [];
var effects = [];

var bedlam;




var players = [];//[new Player(2*Level.tileSize, 2*Level.tileSize, image), new Player(2*Level.tileSize,2*Level.tileSize,image2)];

var playerIsOutOfBounds = false;
var outOfBoundsTimer = 0;
var scoreTimer = 0;

var playerKeys = [];

// A - 65
// D 68
// W 87
// S 83
// 38 up 37 left 39 right
/*
players[0].keyLeft = 37
players[0].keyUp = 38
players[0].keyRight = 39
if(players[1]) {
  players[1].keyLeft = 65
  players[1].keyRight = 68
  players[1].keyUp = 87
}*/

var lastScore = 0;
var startPos = {};
var mutantSpecs;

for(var i=0;i<Level.currentLevel.length;i++)
	Level.currentLevel[i]=new Object();

var enemies={};
var content = [];
var backgroundContent = [];
var foregroundContent = [];
var particles = [];

var flies = [];

var init = function() {

  distanceMoved = oldDistanceMoved = startPos.x;
  numFramesSinceStart = 0;
  health = 40;

	particles = [];

  for(var i = 0; i < players.length; i++) {
    players[i].x = players[i].oldx;
  	players[i].y = players[i].oldy;
    players[i].speedx = 0;
    players[i].speedy = 0;
  	score=lastScore;
  	players[i].hp=100;
    players[i].inBucket = false;
  }

}

var addPlayer = function(playerImage, keyLeft, keyUp, keyRight) {
  var p = new Player(0,0,playerImage);
  p.keyLeft = keyLeft;
  p.keyUp = keyUp;
  p.keyRight = keyRight;
  players.push(p);
}

var setUpKeyMap = function() {
  playerKeys.push(["⇦", "⇧", "⇨"]);
if(players[1]) {
  playerKeys.push(["A", "W", "D"]);
}
}


var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
/*
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
*/

var clear = function(){
}

var clearBlack = function() {
}

var render = function(){
};

var renderEnemies = function()
{
}

var renderBackgroundContent = function() {
}

var renderForegroundContent = function() {
}

var renderContent = function(content) {

}

var updatePlayer = function(index) {

  if(index === 0 && players[1]) { // Collision between players
    var distX = players[0].x+players[0].width/2 - (players[1].x+players[1].width/2);
    var distY = players[0].y+players[0].height/2 - (players[1].y+players[1].height/2);

    var squareDist = distX*distX + distY*distY;
    if(squareDist <= (players[0].width/2 + players[1].width/2) * (players[0].width/2 + players[1].width/2)){
      players[0].x = players[0].oldx;
      players[0].y = players[0].oldy;

      players[1].x = players[1].oldx;
      players[1].y = players[1].oldy;

      var xSpeed = players[0].speedx;
      var ySpeed = players[0].speedy;
      players[0].speedx = players[1].speedx;
      players[0].speedy = players[1].speedy != 0 ? players[1].speedy : -players[0].speedy;

      players[1].speedx = xSpeed;
      players[1].speedy = ySpeed != 0 ? ySpeed : -players[1].speedy;

    }
  }

	players[index].oldx = players[index].x;
	players[index].oldy = players[index].y;


  if(players[index].x + Viewport.x < -1*players[index].width+5) {
    players[index].speedx = WorldConstants.kickbackForce;
    playerIsOutOfBounds = true;
    outOfBoundsTimer = 100;
  }
  if(players[index].x + Viewport.x > Viewport.width -5) {
    players[index].speedx = -1*WorldConstants.kickbackForce;
    playerIsOutOfBounds = true;
    outOfBoundsTimer = 100;
  }
  if(players[index].y + Viewport.y > Viewport.height - players[index].height+10) {
    players[index].speedy = -1*WorldConstants.kickbackForce;
    playerIsOutOfBounds = true;
    outOfBoundsTimer = 100;
  }
	players[index].x += players[index].speedx;

	// Check to the left if going left and stop the player if he collides with a blocking tile
	if(players[index].speedx < 0) {
       
		var arrayPos=Level.getBlockAt(players[index].x, players[index].y + players[index].height/2+5);

		if(arrayPos.blocking==1) {
			players[index].x = players[index].oldx;
			players[index].speedx *=-0.5;
		}
	} else {// Check to the right

		var arrayPos=Level.getBlockAt(players[index].x + players[index].width, players[index].y + players[index].height/2+5);


		if(typeof arrayPos !== 'NaN' && arrayPos.blocking==1) {
			players[index].x = players[index].oldx;
			players[index].speedx *= -0.5;
		}
	}

	if(players[index].speedy < WorldConstants.maxSpeedy) {
		players[index].speedy += WorldConstants.gravity;
	}

	players[index].y += players[index].speedy;

	// If going up, check for blocking tiles
	if(players[index].speedy < 0) {
		arrayPos=Math.floor((players[index].x+players[index].width-8)/Level.tileSize)+Math.floor((players[index].y+5)/Level.tileSize)*Level.width;
    var leftCollisionPoint = Math.floor((players[index].x+8)/Level.tileSize)+Math.floor((players[index].y+5)/(Level.tileSize))*Level.width;
    // If the player lands on a blocking tile, iteratively move him upwards until he is free from the
		// tile. This will remove bouncing when landing in high speed
    var rightCollisionPointCollided = typeof Level.currentLevel[arrayPos] != "undefined" && Level.currentLevel[arrayPos].blocking==1;
    var leftCollisionPointCollided = typeof Level.currentLevel[leftCollisionPoint] != "undefined" && Level.currentLevel[leftCollisionPoint].blocking==1;

		if(rightCollisionPointCollided || leftCollisionPointCollided) {
			players[index].y = players[index].oldy;
			players[index].speedy = 0;
      players[index].jumping=WorldConstants.maxJump;
		}
	} else if(players[index].speedy > 0) { // Going down, check for blocking tiles

		arrayPos=Math.floor((players[index].x+players[index].width-8)/Level.tileSize)+Math.floor((players[index].y+players[index].height)/(Level.tileSize))*Level.width;
    var leftCollisionPoint = Math.floor((players[index].x+8)/Level.tileSize)+Math.floor((players[index].y+players[index].height)/(Level.tileSize))*Level.width;
    // If the player lands on a blocking tile, iteratively move him upwards until he is free from the
		// tile. This will remove bouncing when landing in high speed
    var rightCollisionPointCollided = typeof Level.currentLevel[arrayPos] != "undefined" && Level.currentLevel[arrayPos].blocking==1;
    var leftCollisionPointCollided = typeof Level.currentLevel[leftCollisionPoint] != "undefined" && Level.currentLevel[leftCollisionPoint].blocking==1;

		if(rightCollisionPointCollided || leftCollisionPointCollided) {
			players[index].jumping = 0;
      var movePlayerUp = true;
      players[index].drawingSmoke++;
			while(typeof Level.currentLevel[arrayPos] != "undefined" && Level.getBlockAt(players[index].x+players[index].width-8, players[index].y+players[index].height).blocking==1
        || Level.currentLevel[leftCollisionPoint] != "undefined" && Level.getBlockAt(players[index].x+8, players[index].y+players[index].height).blocking==1) {
				players[index].y-=0.2;
			}
			players[index].speedy=0;
		}
    if(!rightCollisionPointCollided && !leftCollisionPointCollided) { // Disable jumping when in mid-air
  		players[index].jumping=WorldConstants.maxJump;
      players[index].drawingSmoke = 0;
  	}
	}


	if(typeof Level.currentLevel[arrayPos] != "undefined" && Level.currentLevel[arrayPos].type=="g") // Ice block
		players[index].friction=1; // No friction
	else
		players[index].friction=WorldConstants.normalFriction;


	players[index].updateKillZone();
	players[index].updateHurtZone();

	arrayPos=Math.floor((players[index].x+players[index].width/2)/Level.tileSize)+Math.floor((players[index].y+players[index].height)/Level.tileSize)*Level.width;

	if(Level.currentLevel[arrayPos].type=="p" || Level.currentLevel[arrayPos].type=="q") // health
	{
		Level.currentLevel[arrayPos].type=".";
    score += 10;
	}
	if(Level.currentLevel[arrayPos].type=="s") // Coins
	{
		score+=20;
    scoreTimer=10;
    vinylCollectedInLevel++;
		Level.currentLevel[arrayPos].type=".";
	}
	if(Level.currentLevel[arrayPos].type=="l" || Level.currentLevel[arrayPos].type=="m" || Level.currentLevel[arrayPos].type=="n" || Level.currentLevel[arrayPos].type=="o") // Phadderist
	{
		score+=50;
    scoreTimer=10;
		Level.currentLevel[arrayPos].type=".";
	}

}

var updateEnemies = function() {

	for(i=0;i<enemies.length;i++) {
		enemies[i].oldx=enemies[i].x;
		enemies[i].oldy=enemies[i].y;
    var enemyIsInteracting = false;
    var enemyIsDead = false;
    for(var playerIndex = 0; playerIndex < players.length; playerIndex++) {

      var enemyWidth = typeof enemies[i].width == 'number' ? enemies[i].width : 20;
      var enemyHeight = typeof enemies[i].height == 'number' ? enemies[i].height : 20;
      var offsetx = typeof enemies[i].offsetx == 'number' ? enemies[i].offsetx : 0;
      var offsety = typeof enemies[i].offsety == 'number' ? enemies[i].offsety : 0;

      var enemyInHurtZone = Helper.overlap(enemies[i].x+offsetx,enemies[i].y+offsety,enemyWidth,enemyHeight,players[playerIndex].hurtZonex,players[playerIndex].hurtZoney,players[playerIndex].hurtZoneWidth,players[playerIndex].hurtZoneHeight);
      var enemyInKillZone = Helper.overlap(enemies[i].x+offsetx,enemies[i].y+offsety,enemyWidth,enemyHeight,players[playerIndex].killZonex,players[playerIndex].killZoney,players[playerIndex].killZoneWidth,players[playerIndex].killZoneHeight);
      var dangerWidth = 60;
      var dangerHeight = 20;
      var enemyWidth = enemies[i].width ? enemies[i].width : 20;
      var enemyHeight = enemies[i].height ? enemies[i].height : 20;
      //ctx.fillStyle = "#fff";
      //ctx.fillRect(Viewport.x+enemies[i].x-dangerWidth, Viewport.y + enemies[i].y-dangerHeight,2*dangerWidth+enemyWidth, 2*dangerHeight+enemyHeight);
      if(Helper.overlap(enemies[i].x-dangerWidth, enemies[i].y-dangerHeight,2*dangerWidth+enemyWidth, 2*dangerHeight+enemyHeight, players[playerIndex].x, players[playerIndex].y, players[playerIndex].width, players[playerIndex].height) &&
      !players[playerIndex].isFacingPosition(enemies[i].x)) {
          players[playerIndex].runningFromEnemy = 1;
      }

  		if(enemyInHurtZone) { // 1 = right
        var direction = enemies[i].speedx > 0 ? 1 : -1;
        players[playerIndex].speedx=direction * WorldConstants.kickbackForce;
        

        players[playerIndex].speedy=-0.25*WorldConstants.kickbackForce;
        players[0].hp-=2;
        //currentGenome.score-=60;
        enemyIsInteracting = true;
  		} else if(enemyInKillZone) {

        enemies[i].hp--;
        if(enemies[i].type=="boss") {
            players[playerIndex].speedy=-8;
            enemies[i].speedy/=1.5;
        } else {
          players[playerIndex].speedy=-4;
        }

        if(enemies[i].hp <= 0) {
          var bloodAmount = typeof enemies[i].width == 'number' ? (enemies[i].width + enemies[i].height)*2 : WorldConstants.bloodAmount;
          
          if(enemies[i].type == "boss") {
            animating = 3;
            bossKilled = true;

          }
          enemies.splice(i,1); // Remove the enemy from the array

    			score+=100;
          scoreTimer = 10;
          enemyIsDead = true;
          //currentGenome.score+=100;
          break;
        }

  		}

    }
        if(!enemyIsDead && !enemyIsInteracting) {
            enemies[i].move();
        }
	}

  for(var j = 0 ; j < enemies.length; j++) {
    if(enemies[j].type=="boss") {
      if(enemies[j].firing) {

        for(var playerIndex = 0; playerIndex < players.length; playerIndex++) {
          var currentPlayer = players[playerIndex];
          var beamWidth;
          var beamStartx;
          var beamStarty;
          var beamHeight;
          if(enemies[j].speedx < 0) {
            beamWidth = enemies[j].x;
            beamStartx = 0;
            beamStarty = enemies[j].y
            beamHeight = enemies[j].height;
          } else {
            beamWidth  = Viewport.width;
            beamStartx = enemies[j].x+enemies[j].width;
            beamStarty = enemies[j].y
            beamHeight = enemies[j].height;
          }
          if(Helper.overlap(currentPlayer.x, currentPlayer.y, currentPlayer.width, currentPlayer.height,beamStartx, beamStarty, beamWidth,beamHeight)) {
            var direction = enemies[j].speedx > 0 ? 1 : -1;
            currentPlayer.speedx=direction*WorldConstants.kickbackForce;
            
            players[0].hp-=0.9;
          }

        }
      }
    }
  }
}

var updateParticles = function() {
  for(var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
}

var checkKeys = function (modifier) {

//console.log(keysDown);
  if(79 in keysDown) { // o
    keyHeldDown++;
    if(keyHeldDown === 1) {
      debug = 1 - debug;
    }
  } else if(71 in keysDown) { // g
    keyHeldDown++;
    if(keyHeldDown === 1) {
      pixelBackground = 1 - pixelBackground;
    }
  } else {
    keyHeldDown = 0;
  }
	for(var i = 0; i < players.length; i++) {
    if(players[i].drawingLeftBrakingSmoke > 1) {
      players[i].drawingLeftBrakingSmoke = 0;
    }
    if(players[i].drawingRightBrakingSmoke > 1) {
      players[i].drawingRightBrakingSmoke = 0;
    }
		if (animating=== 0 && players[i].keyUp in keysDown) {
      //playerKeys[i][1] = "";
			if(players[i].jumping < WorldConstants.maxJump) {
				players[i].jumping++;
        players[i].drawingSmoke++;
				if(players[i].speedy>-WorldConstants.jumpStrength)
				    players[i].speedy=-WorldConstants.jumpAcc;
        }
		} else if(animating === 0 && players[i].speedy<0) {
      players[i].jumping=WorldConstants.maxJump;
      players[i].speedy/=1.05;
    }

		if (animating === 0 && players[i].keyLeft in keysDown) {
     // playerKeys[i][0] = "";
		players[i].goingLeft = 1;
		players[i].animationCounter++;
    if(players[i].speedx> WorldConstants.maxSpeedx-1) {
      players[i].drawingRightBrakingSmoke++;
    }
			if(players[i].speedx>-WorldConstants.maxSpeedx)
				players[i].speedx -= WorldConstants.playerAcc * modifier;
		}
		else if (animating === 0 && players[i].keyRight in keysDown) {
     // playerKeys[i][2] = "";
		players[i].goingLeft = 0;
		players[i].animationCounter++;
    if(players[i].speedx< -WorldConstants.maxSpeedx+1) {
      players[i].drawingLeftBrakingSmoke++;
    }
			if(players[i].speedx<WorldConstants.maxSpeedx)
				players[i].speedx += WorldConstants.playerAcc * modifier;
		}
		else
			players[i].speedx/=players[i].friction; // Decelerate
      if(Math.abs(players[i].speedx) < 0.05) {
        players[i].x = Math.round(players[i].x);
        players[i].idleAnimationCounter++;
      }
		}

}


var loadContent = function(levelName) {

	enemies = [];
  for(var i = 0; i < enemies.length; i++) {
    switch(Original.enemies[i].type) {
      case "skull":
      case "skurkerist": // Flies back and forth, no gravity
          enemies[i]= new SkullNoImage(enemies[i], Level.currentLevel)
        break;
      case "mutant":
        enemies[i] = new MutantNoImage(enemies[i], Level.currentLevel);
        break;
      case "jumper": // Runs around, jumps when it discovers an edge
        enemies[i] = new JumperNoImage(enemies[i], Level.currentLevel);
        break;
      case "bouncer": // Flies around and bounces on the walls
        enemies[i] = new BouncerNoImage(enemies[i], Level.currentLevel);
        break;
      case "boss":
        enemies[i] = new BossNoImage(enemies[i], Level.currentLevel);
        break;
    }


  }
	var tempContent = Original.content;

  for(var i = 0; i < tempContent.length; i++) {
    if(tempContent[i].type=="vines1") {
      var numTypes = 3;
      tempContent[i].offset = i%numTypes;
    } else if(tempContent[i].type=="flower1") {
        var numTypes = 4;
        tempContent[i].offset = i%numTypes;
    } else if(tempContent[i].type=="tree1") {
        var numTypes = 5;
        tempContent[i].offset = (i-1)%numTypes;
    } else if(tempContent[i].type == "rock1") {
        var numTypes = 5;
        tempContent[i].offset = i%numTypes;
    } else if(tempContent[i].type == "grass") {
      var numTypes = 3;
      tempContent[i].offset = i%numTypes;
    }
    if(typeof tempContent[i].flower !== 'undefined' && tempContent[i].flower === true) {
      content.push(tempContent[i]);
    } if(typeof tempContent[i].zIndex !== 'undefined' && tempContent[i].zIndex === 0) {
      backgroundContent.push(tempContent[i]);
    } else if(typeof tempContent[i].zIndex !== 'undefined' && tempContent[i].zIndex === 1){
      foregroundContent.push(tempContent[i]);
    } else {
      content.push(tempContent[i]);
    }
  }
}

var loadLevel = function(levelNumber) {
  numVinylInLevel = 0;
  vinylCollectedInLevel = 0;
  
    Level.currentLevel = Original.level;
/*
    for(var i=0;i<Level.currentLevel.length;i++) { // set up an object for all tiles
        Level.currentLevel[i]=new Object();
    }
   for(var y=0;y<Level.height;y++) {

        for(var x=0;x<Level.width;x++) {
            var arrayPos = x+y*Level.width;
            Level.currentLevel[arrayPos].type=originalLevel[arrayPos]; // What kind of block is it?
            var tile = LevelTile.newFromCharacter(Level.currentLevel[arrayPos].type);
            postMessage(originalLevel[arrayPos]);
            Level.currentLevel[arrayPos].blocking=tile.blocking; // Blocking tile
            Level.currentLevel[arrayPos].tileOffsetx=tile.drawingOffsetx; // Where in the tileset the tile is
            Level.currentLevel[arrayPos].tileOffsety=tile.drawingOffsety;
            if(allText[arrayPos]==='s') {
                numVinylInLevel++;
            }

        }
   }*/

  content.length = 0;
  flies.length = 0;
  backgroundContent.length = 0;
  foregroundContent.length = 0;
  flowers.length = 0;
  loadContent("levelName");
  setUpContent();
  pathFinder = new Pathfinder(Level.currentLevel, Level.width, Level.height);
  var done = false;
  
  for(var x = 0; x < Level.width; x++) {
    for(var y = 0; y < Level.height; y++) {
      
      if(Level.currentLevel[x+y*Level.width].type === "k") {
        
        done = true;
        goal = new Vector(x,y);
        break;
      }
    }
    if(done) break;
  }
  
  rewardPath = pathFinder.findPath(new Vector(Math.round(startPos.x/Level.tileSize), Math.round(startPos.y/Level.tileSize)), goal);
  rewardPathLength = rewardPath.length;
}

var setUpContent = function() {

	for(var i = 0; i < content.length; i++) {
		switch(content[i].type) {
			case "startPos":
        var offset = 15;
        players[0].x = players[0].oldx = content[i].x - offset;
        players[0].y = players[0].oldy = content[i].y;
        if(players[1]) {
          players[1].x = players[1].oldx = content[i].x + offset;
          players[1].y = players[1].oldy = content[i].y;
				
        }
        startPos.x = content[i].x;
        startPos.y = content[i].y;
	      break;
      case "flynest":

        break;
      case "flower1":
        flowers.push(content[i]);
        break;
		}
	}


}


var genomeIndex = 0;

var currentGenome;
var distanceMoved = 0;
var oldDistanceMoved = 0;


var health = 40;
function evolve() {
    //console.log("generation " + neat.generation + " average score " + neat.getAverage());
    neat.sort();
    var newPopulation = [];
    if(neat.population[0].score > maxFitness) {
      maxFitness = neat.population[0].score;
    }
    
    postMessage("Generation " + neat.generation + " max fitness " + neat.population[0].score);
   // console.log("maxFitness: " + maxFitness);
    for(var i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    for(var i = 0; i < neat.popsize - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    neat.population = newPopulation;
    neat.mutate();
    neat.generation++;
    
    postMessage(['new', neat.export(), neat.generation]);
}
var input = [];
var simSpeed = 1;
var output;
var r = Math.random();

self.addEventListener('message', function(e) {

    if(e.data[0] === true) {
        Original.enemies = e.data[1];
        Original.content = e.data[2];
        Original.level = e.data[3];
        addPlayer(null, 37, 38, 39)
       // originalLevel = Level.currentLevel.slice();
       // postMessage(originalLevel);
        loadLevel(1);
        neat = new neataptic.Neat(
            200,
            3,
            null,
            {
              mutation: [
                neataptic.methods.mutation.ADD_NODE,
                neataptic.methods.mutation.SUB_NODE,
                neataptic.methods.mutation.ADD_CONN,
                neataptic.methods.mutation.SUB_CONN,
                neataptic.methods.mutation.MOD_WEIGHT,
                neataptic.methods.mutation.MOD_BIAS,
                neataptic.methods.mutation.MOD_ACTIVATION,
                neataptic.methods.mutation.ADD_GATE,
                neataptic.methods.mutation.SUB_GATE,
                neataptic.methods.mutation.ADD_SELF_CONN,
                neataptic.methods.mutation.SUB_SELF_CONN,
                neataptic.methods.mutation.ADD_BACK_CONN,
                neataptic.methods.mutation.SUB_BACK_CONN
              ],
              popsize: populationSize,
              mutationRate: mutationRate,
              elitism: Math.round(elitism * populationSize),
              network: new Architect.Perceptron(
                200,
                50,
                3
              )
            }
          );
        
        neat.import(e.data[4]);
        
        currentGenome = neat.population[genomeIndex];
        currentGenome.score = 0;
        neat.generation = e.data[5];
        running = true;
        GameLoop();
    } else {
        running = false;
    }
    
});

var GameLoop = function(){
    postMessage("Starting game loop");
  while(running) {
    keysDown = {};
    numFramesSinceStart++;
      clear();
  
      if(players[0].hp<1) {
        players[0].hp=0;
        if(players[1]) {
            players[1].hp=0;
        }
            score=lastScore;
        numDeaths++;
        vinylCollectedInLevel = 0;
        flies= [];
            loadLevel(levelNow);
        genomeIndex++;
        if(genomeIndex >= populationSize) {
            evolve();
            
            genomeIndex = 0;
        }
        currentGenome = neat.population[genomeIndex];
        currentGenome.score = 0;
            init();
            
        animating = 1;
      }
    if(animating===1) {
        
      
      Viewport.moveToCenter(startPos.x,startPos.y,startPos.x,startPos.y, 30);
      if(players[0].x + Viewport.x > -1*players[0].width+5 &&
         players[0].x + Viewport.x < Viewport.width -5 &&
         players[0].y + Viewport.y < Viewport.height - players[0].height+10 &&
         players[0].y + Viewport.y > 0) {
  
         animating = 0;
      }
    }
  
      if(animating===0) {
      input = [];
      input = Level.getInput(enemies, players);
      
      
      output = currentGenome.activate(input);
      var softmaxOutput = softmax(output);
     
      if(numFramesSinceStart%10===0) {
         
        r = Math.random();
      }
      
      let buttonLeft = 37;
      let buttonRight = 39;
  
      if(softmaxOutput[0] > r) {
        keysDown[37] = true;
      }
      if(softmaxOutput[1] > r) {
        keysDown[38] = true;
      }
      if(softmaxOutput[2] > r) {
        keysDown[39] = true;
      }
  
      
      
          checkKeys(1);
  
      playerIsOutOfBounds = false;
      for(var i = 0; i < players.length; i++) {
        updatePlayer(i);
          
      }
      if(numFramesSinceStart%10===0) {
        rewardPath = pathFinder.findPath(new Vector(Math.round(players[0].x/Level.tileSize), Math.round(players[0].y/Level.tileSize)), goal);
        if(rewardPath.length < rewardPathLength) {
          rewardPathLength = rewardPath.length;
          currentGenome.score+=10;
          health = health > 800 ? 800 : health+30;
        } else  {
          if(rewardPath.length > rewardPathLength){
            currentGenome.score-=2;
          }
       }
      }  
       if (Math.abs(players[0].speedx) < 1){
            health--;
            /*if(numFramesSinceStart%20===0) {
              currentGenome.score--;  
            }*/
            
       }
      
      
  
      if(health<=0) {
        players[0].hp = 0;
      }
  
      var x2 = players[1] ? players[1].x : players[0].x+(players[0].goingLeft ? -50 : 50)+10*players[0].speedx;
      var y2 = players[1] ? players[1].y : players[0].y;
      
      Viewport.moveTowardsCenter(players[0].x, players[0].y, x2, y2);
  
      }
    //renderBackgroundContent();
    if(animating === 0) {
      //render();
      updateEnemies();
      updateParticles();
      for(var i = 0; i < flies.length; i++) {
        flies[i].move(players, flowers);
      }
    }
  
    //renderEnemies();
   // Level.render(ctx);
  
  
    //renderForegroundContent();
  
    if(animating===2) {
      playerIsOutOfBounds = false;
      checkKeys(1);
     // render();
      bedlam.move(players);
      bedlam.render(ctx);
      if(bedlam.isComplete()) {
        bedlam = null;
        animating = 0;
        totalNumVinylCollected+=vinylCollectedInLevel;
        if(bossKilled) {
          //jukeBox.playFinalSong();
          endScreen();
          return;
        } else {
  
          loadLevel(levelNow);
  
          init();
              
          var x2 = players[1] ? players[1].x : players[0].x;
          var y2 = players[1] ? players[1].y : players[0].y;
          Viewport.moveToCenter(players[0].x, players[0].y, x2, y2);
  
        }
  
      }
    }
  
    if(animating===3) {
      bossDeadTimer--;
      checkKeys(0);
      for(var i = 0; i < players.length; i++) {
        updatePlayer(i);
    }
  
      var x2 = players[1] ? players[1].x : players[0].x;
      var y2 = players[1] ? players[1].y : players[0].y;
      Viewport.moveTowardsCenter(players[0].x, players[0].y, x2, y2);
     // render();
      updateParticles();
      if(bossDeadTimer<=0) {
        bedlam = new Bedlam();
        animating = 2;
      }
    }
  
    if(numFramesSinceStart%50 === 0) {
      particleCleaner.cleanupBlood(particles);
      cleanSmoke();
    } else if(numFramesSinceStart%20 === 0) {
  
      for(var i = 0; i < particles.length; i++) {
        if(particles[i].shouldBeDeleted) {
          particles.splice(i,1);
        }
      }
    }
  
    var arrayPos1 = Level.getBlockAt(players[0].x + players[0].width/2, players[0].y + players[0].height/2);
    var arrayPos2 = players[1] ? Level.getBlockAt(players[1].x + players[1].width/2, players[1].y + players[1].height/2) : arrayPos1;
  
      if(animating===0 && (arrayPos1.type=="k" || arrayPos2.type=="k")) {
          //	levelNow++;
              lastScore=score;
        animating=2;
        bedlam = new Bedlam();
    }
  
  
    
 }
}

var cleanSmoke = function() {
  var allEffectsDone = true;
  for(var i = 0; i < effects.length; i++) {
    if(!effects[i].isDone()) {
      allEffectsDone = false;
      break;
    }
  }
  if(allEffectsDone) {
    effects = [];
  }
}

function softmax(arr) {
    const C = Math.max(...arr);
    const d = arr.map((y) => Math.exp(y - C)).reduce((a, b) => a + b);
    return arr.map((value, index) => { 
        return Math.exp(value - C) / d;
    })
}