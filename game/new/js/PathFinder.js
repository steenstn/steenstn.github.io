class Pathfinder {
    constructor(level, levelWidth, levelHeight) {
        this.level = level;
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
    }
    findPath(start, goal) {
        this.frontier = new TinyQueue([], function (a, b) {
            return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
        });
        this.cameFrom = new Map();
        this.costSoFar = new Map();
        this.frontier.push({ Vector: start, priority: 0 });
        this.cameFrom.set(start.x + start.y * this.levelWidth, null);
        this.costSoFar.set(start.x + start.y * this.levelWidth, 0);
        while (this.frontier.length > 0) {
            let current = this.frontier.pop().Vector;
            if (current.x === goal.x && current.y === goal.y) {
                break;
            }
            let neighbours = this.getNeighbours(current);
            for (let i = 0; i < neighbours.length; i++) {
                var newCost = this.costSoFar.get(current.x + current.y * this.levelWidth) ? this.costSoFar.get(current.x + current.y * this.levelWidth) + 1 : 1;
                if (!this.hasVector(neighbours[i]) || newCost < this.costSoFar[neighbours[i].x + neighbours[i].y * this.levelWidth]) {
                    this.costSoFar.set(neighbours[i].x + neighbours[i].y * this.levelWidth, newCost);
                    var prio = newCost + this.heuristic(goal, neighbours[i]);
                    this.frontier.push({ Vector: neighbours[i], priority: prio });
                    this.cameFrom.set(neighbours[i].x + neighbours[i].y * this.levelWidth, current);
                }
            }
        }
        let path = [];
        let c = goal;
        while (c && !(c.x === start.x && c.y === start.y)) {
            path.push(c);
            c = this.cameFrom.get(c.x + c.y * this.levelWidth);
        }
        return path;
    }
    hasVector(p) {
        for (var value of this.costSoFar.values()) {
            if (value && value.x === p.x && value.y === p.y) {
                return true;
            }
        }
        return false;
    }
    inBounds(p) {
        return (p.x >= 0 && p.x < this.levelWidth && p.y >= 0 && p.y < this.levelHeight);
    }
    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    getNeighbours(p) {
        if (!this.inBounds(p)) {
            return [];
        }
        var result = [];
        var n = new Vector(p.x + 1, p.y);
        if (this.isValidWalkingTile(n)) {
            result.push(n);
        }
        n = new Vector(p.x - 1, p.y);
        if (this.isValidWalkingTile(n)) {
            result.push(n);
        }
        n = new Vector(p.x, p.y + 1);
        if (this.isValidWalkingTile(n)) {
            result.push(n);
        }
        n = new Vector(p.x, p.y - 1);
        if (this.isValidWalkingTile(n)) {
            result.push(n);
        }
        n = new Vector(p.x - 1, p.y - 1);
        if (this.isValidWalkingTile(n) && this.isValidDiagonal(n)) {
            result.push(n);
        }
        n = new Vector(p.x + 1, p.y - 1);
        if (this.isValidWalkingTile(n) && this.isValidDiagonal(n)) {
            result.push(n);
        }
        n = new Vector(p.x - 1, p.y + 1);
        if (this.isValidWalkingTile(n) && this.isValidDiagonal(n)) {
            result.push(n);
        }
        n = new Vector(p.x - 1, p.y - 1);
        if (this.isValidWalkingTile(n) && this.isValidDiagonal(n)) {
            result.push(n);
        }
        return result;
    }
    isValidWalkingTile(p) {
        return !this.cameFrom.get(p.x + p.y * this.levelWidth) && this.inBounds(p)
            && this.level[p.x + p.y * this.levelWidth] && !this.level[p.x + p.y * this.levelWidth].blocking;
    }
    isValidDiagonal(p) {
        return !this.level[p.x + 1 + p.y * this.levelWidth].blocking &&
            !this.level[p.x - 1 + p.y * this.levelWidth].blocking &&
            !this.level[p.x + (p.y + 1) * this.levelWidth].blocking &&
            !this.level[p.x + (p.y - 1) * this.levelWidth].blocking;
    }
}
