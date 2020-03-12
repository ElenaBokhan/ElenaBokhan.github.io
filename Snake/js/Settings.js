class Settings {

    init(param) {
        let defaultParams = { speed: 2, rowsCount: 14, colsCount: 21, winLength: 50 };
        Object.assign(defaultParams, param);

        if(defaultParams.speed<1 || defaultParams.speed>10){
            throw new Error("Неверные настройки")
        }
        this.speed = defaultParams.speed

        if(defaultParams.rowsCount<10 || defaultParams.rowsCount>30){
            throw new Error("Неверные настройки")
        }
        this.rowsCount = defaultParams.rowsCount

        if(defaultParams.colsCount<10 || defaultParams.colsCount>30){
            throw new Error("Неверные настройки")
        }
        this.colsCount = defaultParams.colsCount

        if(defaultParams.winLength<5 || defaultParams.winLength>50){
            throw new Error("Неверные настройки")
        }
        this.winLength = defaultParams.winLength
    }
}