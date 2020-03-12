class Status {
    constructor() {
        this.setPaused()
    }

    setPaused() {
        this.condition = "paused";
    }
    setPlayed() {
        this.condition = "played";
    }
    isPaused() {
        if(this.condition==="paused"){
            return true;
        }        
    }
    isPlayed() {
        if(this.condition==="played"){
            return true;
        }    
    }
}