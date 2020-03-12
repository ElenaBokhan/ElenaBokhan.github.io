class Board {
    constructor() {
        this.boardElem = document.getElementById("game");
        this.score = document.querySelector("#score");
    }
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }
    renderBoard() {

        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement("tr");
            this.boardElem.appendChild(tr);
            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement("td");
                tr.appendChild(td);
            }
        }
    }
    renderSnake() {
        let snakeBody = this.snake.body;
        let bodyCell = [];
        for (let value of snakeBody) {
            let cellEl = this.getCellEll(value.x, value.y);
            bodyCell.push(cellEl);
        }
        for (let elem of bodyCell) {
            elem.classList.add("snakeBody");
        }
    }
    clearBoard() {
        document.querySelectorAll("td").forEach((elem) => {
            elem.className = "";
        })
    }

    renderFood(foodCell) {
        foodCell.classList.add("food");
    }
    getCellEll(x, y) {
        return document.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`)
    }
    isNextStepToWall(nextCoord) {
        let nextCellForHead = this.getCellEll(nextCoord.x, nextCoord.y);
        if (nextCellForHead === null) {
            return true;
        }
        return false;
    }
}