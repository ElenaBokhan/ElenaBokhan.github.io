window.addEventListener("load", (event) => {
    const board = new Board();
    const ship = new Ship();
    const game = new Game();
    const menu = new Menu();
    const setting = new Setting();
    const status = new Status();

    setting.init();
    board.init(setting, ship);
    ship.init(setting, board)
    game.init(setting, board, ship, status, menu);

    event.preventDefault();
    event.stopPropagation();

    board.renderBoard();
    ship.getAllPossibleCells();
    ship.arrangeShips();
    menu.run()
    game.run();
})