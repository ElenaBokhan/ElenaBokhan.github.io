class Snake {
    constructor() {
        this.possibleDirection = ["down", "up", "left", "right"];
        this.body = [{
            x: 1,
            y: 1
        }]
        this.direction = "down"
    }
    perfomStep() {
        let currentHeadSnake = this.body[0];
        let nextHeadSnake = {
            x: currentHeadSnake.x,
            y: currentHeadSnake.y
        }

        switch (this.direction) {
            case "down":
                nextHeadSnake.y++;
                break;
            case "up":
                nextHeadSnake.y--;
                break;
            case "right":
                nextHeadSnake.x++;
                break;
            case "left":
                nextHeadSnake.x--;
                break;
        }
        if (nextHeadSnake.x == 22) nextHeadSnake.x = 0;
        else if (nextHeadSnake.x == 0) nextHeadSnake.x = 21;
        else if (nextHeadSnake.y == 0) nextHeadSnake.y = 14;
        else if (nextHeadSnake.y == 15) nextHeadSnake.y = 0;
        this.body.unshift(nextHeadSnake);
        this.body.pop();
        return;
    }
    increaseBody() {
        let lastCell = this.body[this.body.length - 1];
        let lastCellSnake = {
            x: lastCell.x,
            y: lastCell.y
        };
        this.body.push(lastCellSnake);
    }
}