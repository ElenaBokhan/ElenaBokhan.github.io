window.addEventListener("load", () => {
  const settings = new Settings();
  const status = new Status();
  const snake = new Snake();
  const board = new Board();
  const menu = new Menu();
  const food = new Food();
  const game = new Game();

  settings.init({
    speed: 5,
    winLength: 15
  });
  board.init(settings, snake);
  food.init(settings, board, snake);
  game.init(settings, board, snake, food, status, menu);

  board.renderBoard();
  board.renderSnake();
  food.setNewFood();
  game.run();
});