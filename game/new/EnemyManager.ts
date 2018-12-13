class EnemyManager {

    static updateEnemy(enemy: Enemy, players: Array<Player>, bloodFactory: BloodFactory, particles: any) {
        enemy.oldx = enemy.x;
        enemy.oldy = enemy.y;
        var enemyIsInteracting = false;
        for(var playerIndex = 0; playerIndex < players.length; playerIndex++) {
    
            var enemyWidth = typeof enemy.width == 'number' ? enemy.width : 20;
            var enemyHeight = typeof enemy.height == 'number' ? enemy.height : 20;
            var offsetx = typeof enemy.offsetx == 'number' ? enemy.offsetx : 0;
            var offsety = typeof enemy.offsety == 'number' ? enemy.offsety : 0;

            var enemyInHurtZone = Helper.overlap(enemy.x+offsetx,enemy.y+offsety,enemyWidth,enemyHeight,players[playerIndex].hurtZonex,players[playerIndex].hurtZoney,players[playerIndex].hurtZoneWidth,players[playerIndex].hurtZoneHeight);
            var enemyInKillZone = Helper.overlap(enemy.x+offsetx,enemy.y+offsety,enemyWidth,enemyHeight,players[playerIndex].killZonex,players[playerIndex].killZoney,players[playerIndex].killZoneWidth,players[playerIndex].killZoneHeight);
          
    
            if(enemyInHurtZone) { // 1 = right
                var direction = enemy.speedx > 0 ? 1 : -1;
                players[playerIndex].speedx=direction * WorldConstants.kickbackForce;
                for(var bloodIndex = 0; bloodIndex < WorldConstants.bloodAmount; bloodIndex++) {
                    particles.push(bloodFactory.createBlood(players[playerIndex].x, players[playerIndex].y, direction));
                }

                players[playerIndex].speedy=-0.25*WorldConstants.kickbackForce;
                        players[0].hp-=2;
                enemyIsInteracting = true;
            } else if(enemyInKillZone) {

                enemy.hp--;
                if(enemy.type=="boss") {
                    players[playerIndex].speedy=-8;
                    enemy.speedy/=1.5;
                } else {
                    players[playerIndex].speedy=-4;
                }

                if(enemy.hp <= 0) {
                    var bloodAmount = typeof enemy.width == 'number' ? (enemy.width + enemy.height)*2 : WorldConstants.bloodAmount;
                    for(var bloodIndex = 0; bloodIndex < bloodAmount; bloodIndex++) {
                        particles.push(bloodFactory.createBlood(enemy.x, enemy.y, 1));
                        particles.push(bloodFactory.createBlood(enemy.x, enemy.y, -1));
                    }
                    if(enemy.type == "boss") {
                        GameState.animating = 3;
                        GameState.bossKilled = true;
                    }
                    enemy.alive = false; 

                    GameState.score+=100;
                    GameState.scoreTimer = 10;
                    break;
                }

            }
    
        }
        if(enemy.alive && !enemyIsInteracting) {
            enemy.move();
        }
    }
}