class Game {
    constructor() {
        this.message = document.getElementById("message");
        this.messageStatus = document.getElementById("status");
    }
    init(setting, board, boardPlayer, ship, status, menu) {
        this.setting = setting;
        this.board = board;
        this.boardPlayer = boardPlayer;
        this.ship = ship;
        this.status = status;
        this.menu = menu;
    }
    run() {
        document.addEventListener("click", elem => {
            if (this.ship.allShipsPlayer.length < 20) {
                if (this.isClickCorrect(event, "gamePlayer")) {
                    this.ship.arrangeShips(elem);
                }
            } else {
                this.handlerClick(event)
            }
        });
    }

    handlerClick(event) {
        if (this.status.condition == "playerMove") {
            this.playerStep(event);
        }

    }
    playerStep(event) {
        if (this.isClickCorrect(event, "game")) {
            let hit = event.target;
            if (this.isHitTheMark(hit)) {
                hit.style.background = "red";
                this.ship.killedShips.push(hit);
                if (this.isKilledShip(hit, this.ship.killedShips,"deck")) {
                    this.message.innerText = "Убит"
                    if (this.isGameWon(this.ship.killedShips)) {
                        this.message.innerText = "Вы выиграли!";
                        return;
                    }
                } else {
                    this.message.innerText = "Ранен"
                }
            } else {
                hit.innerText = "X";
                this.message.innerText = "Мимо";
                this.messageStatus.innerText = "Ход соперника";
                this.status.setMoveComputer();
                event.preventDefault();
                setTimeout(() => {
                    this.computerStep(); 
                }, 2000); 
            }
        }
    }
    isClickCorrect(event, nameField) {
        if (this.isClickOnTable(event, nameField) && this.isClickOnEmptyCell(event)) {
            return true;
        }
    }
    isClickOnTable(event, nameField) {
        if (event.target.parentNode.parentNode.id == nameField) return true;
    }
    isClickOnEmptyCell(event) {
        if (event.target.innerText == "") return true;
    }
    isHitTheMark(hit) {
        if (hit.hasAttribute("deck")) return true;
    }
    isKilledShip(hit, array,attribute) {
        let numOfDeck = hit.getAttribute(attribute);
        let numShip = hit.getAttribute("data-number");
        let allHit = array.filter(item => (item.getAttribute(attribute) == `${numOfDeck}` && item.getAttribute("data-number") == `${numShip}`))
        if (allHit.length % numOfDeck == 0) {
            if(attribute=="deck"){
                let scoreField = document.querySelector(`div[score=\"${+numOfDeck}\"]`);
                scoreField.innerText++;
            }            
            return true;}
    }
    isGameWon(array) {
        return array.length == 20;
    }
    computerStep() {
        if (this.ship.currentCEllsShip.length == 0) {
            let randomCell = this.ship.getRandomCoords(this.ship.possibleCells);
            this.ship.x = randomCell.x;
            this.ship.y = randomCell.y;
        }else{
            this.ship.deleteCellFromArray({x:this.ship.x,y:this.ship.y}, this.ship.currentSiblingsForNextStep);
            let nextCell = this.ship.getRandomCoords(this.ship.currentSiblingsForNextStep);
            this.ship.x = nextCell.x;
            this.ship.y = nextCell.y;
        }   
        let cellShipCoords={
            x:this.ship.x,
            y:this.ship.y
        }     
        let cellShip = this.boardPlayer.getCellElem(this.ship.x, this.ship.y);
        if (cellShip.hasAttribute("deck-player")) {
            this.ship.killedShipsPlayers.push(cellShip);
            this.ship.currentCEllsShip.push(cellShipCoords);
            this.ship.getAllSiblings(this.ship.x, this.ship.y, this.boardPlayer);
            cellShip.style.background="red";
            if (this.isKilledShip(cellShip, this.ship.killedShipsPlayers,"deck-player")) {
                if (this.isGameWon(this.ship.killedShips)) {
                    this.message.innerText = "Вы проиграли!";
                    return;
                }
                this.ship.deleteCellFromArray(cellShipCoords, this.ship.possibleCells);
                this.ship.deleteCellsFromArr(this.ship.currentSiblingsShip, this.ship.possibleCells);
                this.ship.currentCEllsShip = [];
                this.ship.currentSiblingsForNextStep = [];
                this.ship.currentSiblingsShip = [];                
                setTimeout(() => {
                    this.computerStep(); 
                }, 2000);
            } else {                
                this.ship.getSiblingsForNextStep(this.ship.x, this.ship.y, this.boardPlayer);                
                this.ship.deleteCellFromArray(cellShipCoords, this.ship.possibleCells);                
                setTimeout(() => {
                    this.computerStep(); 
                }, 2000);
            }
        } else {
            cellShip.innerText = "X";
            this.ship.deleteCellFromArray(cellShipCoords, this.ship.possibleCells);
            this.ship.deleteCellFromArray(cellShipCoords, this.ship.currentSiblingsForNextStep);
            this.messageStatus.innerText = "Ваш ход";
            this.status.setMovePlayer();
            return;
        }
    }
}