var GameState = (function () {
    function GameState() {
    }
    GameState.animating = 0;
    GameState.bossKilled = false;
    GameState.score = 0;
    GameState.scoreTimer = 0;
    GameState.currentLevel = 1;
    return GameState;
}());
