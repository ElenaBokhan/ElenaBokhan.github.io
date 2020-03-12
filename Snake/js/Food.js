class Food {
    constructor() {
        this.x = null;
        this.y = null;
    }
    init(settings, board, snake) {
        this.settings = settings;
        this.board = board;
        this.snake = snake;
    }

    setNewFood() {
        let foodCoord = this.getRandomCoordinate();     
        this.board.renderFood(foodCoord);
    }
    setFood(){
        let newSet=this.board.getCellEll(this.x,this.y)
        this.board.renderFood(newSet);
    }
    getRandomCoordinate() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount + 1);
            this.y = Math.floor(Math.random() * this.settings.rowsCount + 1);
            let cellFood = this.board.getCellEll(this.x, this.y);

            if(cellFood==null) continue;
            if (cellFood.classList.contains("snakeBody")) continue;
            return cellFood;
        }
        
    }
}
