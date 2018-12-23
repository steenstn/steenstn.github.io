var GameState = (function () {
    function GameState() {
    }
    GameState.animating = 0;
    GameState.bossKilled = false;
    GameState.score = 0;
    GameState.scoreTimer = 0;
    GameState.lastScore = 0;
    GameState.currentLevel = 1;
    GameState.outOfBoundsTimer = 0;
    GameState.lastLevel = 0;
    GameState.numDeaths = 0;
    return GameState;
}());
