class Game {
    constructor() {
        this.tickIdentifier = null;
        this.message = document.querySelector(".message");

    }
    init(settings, board, snake, food, status, menu) {
        this.settings = settings;
        this.board = board;
        this.snake = snake;
        this.food = food;
        this.status = status;
        this.menu = menu;
    }

    run() {
        this.menu.addButtonsListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener("keydown", this.pressKeyHandler.bind(this));

    }
    start() {
        if (this.status.condition == "paused") {
            this.status.setPlayed()
        }
        this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed)
    }
    pause() {
        if (this.status.condition == "played") {
            this.status.setPaused();
        }
        clearInterval(this.tickIdentifier);
    }
    doTick() {
        this.snake.perfomStep();
        if (this.isGameOver()) return;
        if (this.isGameWon()) return;
        if (this.isFoodOnHead()) {

            this.snake.increaseBody();
            this.food.setNewFood();

        }
        this.board.clearBoard();
        this.food.setFood();
        this.board.renderSnake();
    }

    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.direction = "up";
                break;
            case "ArrowDown":
                this.snake.direction = "down";
                break;
            case "ArrowLeft":
                this.snake.direction = "left";
                break;
            case "ArrowRight":
                this.snake.direction = "right";
                break;
        }
    }
    isGameOver() {
        if (this.isNextStepOnBodySnake(this.snake.body[0])) {
            clearInterval(this.tickIdentifier);
            this.message.innerText = "Вы проиграли";
            return true;
        }
        return false;
    }
    isGameWon() {
        this.board.score.innerText = this.snake.body.length;
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.message.innerText = "Вы выиграли";
            return true;
        }
        return false;
    }
    isFoodOnHead() {
        return document.querySelector(".food").classList.contains("snakeBody");
    }
    isNextStepOnBodySnake(nextCoord) {
        let nextStepCoord = {
            x: nextCoord.x,
            y: nextCoord.y,
        }
        let nextHead = this.board.getCellEll(nextStepCoord.x, nextStepCoord.y)
        return nextHead.classList.contains("snakeBody");
    }
}