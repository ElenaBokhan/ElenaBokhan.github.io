class Ship {
    constructor() {
        this.x = null;
        this.y = null;
        this.possibleCells = [];
        this.currentCEllsShip = [];
        this.currentSiblingsForNextStep = [];
        this.currentSiblingsShip = [];
    }

    init(setting, board) {
        this.setting = setting;
        this.board = board;
    }
    // getAllPossibleCells() {
    //     this.board.boardGame.querySelectorAll("td").forEach((elem) => {
    //         this.possibleCells.push(elem)
    //     })
    // }
    getAllPossibleCells() {
        for (let y = 1; y <= this.setting.rowsCount; y++) {
            for (let x = 1; x <= this.setting.colsCount; x++) {
                let arr = {
                    x: x,
                    y: y
                };
                this.possibleCells.push(arr);
            }
        }
    }
    // расставляю карабли. Length - наращивает палубы. Цикл с J - количество каждых караблей 
    arrangeShips() {
        let length = 4;
        let amount = 1;
        while (length > 0 && amount < 5) {
            for (let j = 0; j < amount; j++) {
                for (let i = 0; i < length; i++) {
                    if (i == 0) {
                        // перед поиском первой ячейки для следующего карабля,
                        //очищаю массив с возможными вариантами ячеек и массив с ячейками предыдущего корабля
                        this.currentCEllsShip = [];
                        this.currentSiblingsForNextStep = [];
                        this.currentSiblingsShip = [];
                        // ищу первую ячейку                  
                        this.getFirstCell(length);
                    } else {
                        //поиск последующих ячеек при length>1
                        this.getNextCells(length);
                    }

                }
                this.deleteCurrentCellsAndSiblingsFromArr();
            }
            amount++;
            length--;
        }

    }
    getFirstCell(length) {
        // получаю рандомный элемент 
        let randomCell = this.possibleCells[Math.floor(Math.random() * this.possibleCells.length)];
        let cellShip = this.board.getCellElem(randomCell.x, randomCell.y);
        cellShip.classList.add(`ship${length}`);
        //cellShip.style.backgroundColor = "yellow";
        this.getAllSiblings(randomCell.x, randomCell.y);

        //добавляю готовую ячейку в массив хранящий все ячейки текущего корабля 
        this.currentCEllsShip.push(randomCell);
        if (length > 1) {
            //у текущей ячейки делаю выборку координат для последущих вариантов хода
            this.getSiblingsForNextStep(randomCell.x, randomCell.y);
        }
    }
    getNextCells(length) {

        let nextRandomCellForShip = Math.floor(Math.random() * this.currentSiblingsForNextStep.length);
        let nextCellCoords = this.currentSiblingsForNextStep[nextRandomCellForShip];
        let nextCellShip = this.board.getCellElem(nextCellCoords.x, nextCellCoords.y);
        nextCellShip.classList.add(`ship${length}`);

        //nextCellShip.style.backgroundColor = "yellow";

        this.currentCEllsShip.push(nextCellCoords);
        this.currentSiblingsForNextStep.splice(this.currentSiblingsForNextStep.indexOf(nextCellCoords), 1);
        this.x = nextCellCoords.x;
        this.y = nextCellCoords.y;
        this.getAllSiblings(this.x, this.y);
        this.getSiblingsForNextStep(this.x, this.y);
    }

    getSiblingsForNextStep(x, y) {
        let siblings = [{
            x: x,
            y: y - 1
        }, {
            x: x - 1,
            y: y
        }, {
            x: x + 1,
            y: y
        }, {
            x: x,
            y: y + 1
        }];
        for (let elem of siblings) {
            if (this.possibleCells.find(element => element.x == elem.x && element.y == elem.y)) {
                let siblingsForNextStep = this.board.getCellElem(elem.x, elem.y);
                if (this.currentSiblingsForNextStep.find(element => element.x == elem.x && element.y == elem.y)) continue;
                if (siblingsForNextStep != null && siblingsForNextStep.classList.length == 0) {
                    this.currentSiblingsForNextStep.push(elem);
                }
            }

        }
    }

    getAllSiblings(x, y) {
        let siblingsShip = [{
                x: x - 1,
                y: y - 1
            },
            {
                x: x,
                y: y - 1
            }, {
                x: x + 1,
                y: y - 1
            },
            {
                x: x - 1,
                y: y
            }, {
                x: x + 1,
                y: y
            },
            {
                x: x,
                y: y + 1
            }, {
                x: x - 1,
                y: y + 1
            },
            {
                x: x + 1,
                y: y + 1
            }
        ];
        for (let elem of siblingsShip) {
            let siblings = this.board.getCellElem(elem.x, elem.y);
            if (this.isCurrentSiblingsShipHaveElem(elem)) continue;

            if (siblings != null && siblings.classList.length == 0) {
                this.currentSiblingsShip.push(elem);
                //siblings.style.backgroundColor = "green";
            }
        }
    }
    isCurrentSiblingsShipHaveElem(elem) {
        let alreadyHave = this.currentSiblingsShip.find(element => element.x == elem.x && element.y == elem.y)
        return alreadyHave;
    }
    deleteCurrentCellsAndSiblingsFromArr() {
        for (let current of this.currentSiblingsShip) {
            let alreadyHave = this.possibleCells.find(element => element.x == current.x && element.y == current.y)
            if (alreadyHave) {
                this.possibleCells.splice(this.possibleCells.indexOf(alreadyHave), 1);
            };
        }
        for (let cell of this.possibleCells) {
            for (let currentCell of this.currentCEllsShip) {
                if (cell.x == currentCell.x && cell.y == currentCell.y) {
                    this.possibleCells.splice(this.possibleCells.indexOf(cell), 1);
                }
            }
        }
    }
}