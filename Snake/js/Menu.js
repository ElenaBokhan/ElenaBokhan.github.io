class Menu {
    constructor(){
       this.startBtn = document.getElementById("start-btn");
        this.pauseBtn = document.getElementById("pause-btn");
    }
    addButtonsListeners(startClickHandler,pauseClickHandler){
        this.startBtn.addEventListener("click",startClickHandler);
        this.pauseBtn.addEventListener("click",pauseClickHandler);
    }
}