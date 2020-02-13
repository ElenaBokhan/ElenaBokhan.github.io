window.addEventListener("load", function () {
    let tetris = [];
    let tetrisField = document.getElementById('tetris-field');
    let scoreField = document.querySelector('.score-field');
    let color = [1, 2, 3, 4, 5];
    let timer;
    let score = 0;
    let flag;
    let status = "playing";

    // заполняем массив
    function init() {
        let x = 9;
        let y = 12;
        for (let i = 0; i < y; i++) {
            tetris[i] = [];
            for (let j = 0; j < x; j++)
                tetris[i][j] = 0;
        }
        console.table(tetris);
    }

    // рисуем игровое поле 
    function draw() {
        let out = '';
        for (let i = 0; i < tetris.length; i++) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] == 0) {
                    out += '<div class="white"></div>';
                } else if (tetris[i][j] == 1 || tetris[i][j] == 11) {
                    out += '<div class="orange"></div>';
                } else if (tetris[i][j] == 2 || tetris[i][j] == 12) {
                    out += '<div class="green"></div>';
                } else if (tetris[i][j] == 3 || tetris[i][j] == 13) {
                    out += '<div class="blue"></div>';
                } else if (tetris[i][j] == 4 || tetris[i][j] == 14) {
                    out += '<div class="red"></div>';
                } else if (tetris[i][j] == 5 || tetris[i][j] == 15) {
                    out += '<div class="pirple"></div>';
                }
            }
        }
        tetrisField.innerHTML = out;
        scoreField.innerHTML = `Ваш счет: <br><br>${score}<br><br>диван-очков`;
    }

    function colorRound() {
        function randomInteger(min, max) {
            // случайное число от min до (max+1)
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        tetris[0][0] = randomInteger(1, color.length);
    }

    function run() {
        timer = setTimeout(function () {
            if (status == "playing") {
                if (finish()) return false;
                draw();
                flag = true;
                for (let i = tetris.length - 1; i >= 0; i--) {
                    for (let j = 0; j < tetris[i].length; j++) {
                        if (tetris[i][j] < 10) {
                            if (tetris[i][j] != 0) {
                                if (i == tetris.length - 1) {
                                    tetris[i][j] = tetris[i][j] + 10
                                } else if (tetris[i + 1][j] == 0) {
                                    tetris[i + 1][j] = tetris[i][j];
                                    tetris[i][j] = 0;
                                    flag = false;
                                }
                            }
                        }
                    }
                }
                checkLineGorizont();
                checkLineVertical();
                //checkLineDiagonal();
                if (flag) colorRound();
                run();
            }
        }, 500);
    }
    function tetrisRight() {

        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = tetris[i].length - 1; j >= 0; j--) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0 && tetris[i][j + 1] == 0 && tetris[i + 1][j] == 0) {
                        tetris[i][j + 1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }
    function tetrisLeft() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0 && tetris[i][j - 1] == 0 && tetris[i + 1][j] == 0) {
                        tetris[i][j - 1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }
    function tetrisBottom() {
        draw();
        let flagNextBlock = true;
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0) {
                        if (i == tetris.length - 1) {
                            tetris[i][j] = tetris[i][j] + 10;
                        } else if (tetris[i + 1][j] == 0) {
                            tetris[i + 1][j] = tetris[i][j];
                            tetris[i][j] = 0;
                            tetris[i][j].innerHTML = "0";
                            flagNextBlock = false;
                        }
                    }
                }

            }
        }
    }
    function checkLineGorizont() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] > 10 && tetris[i][j + 1] != undefined && tetris[i][j + 2] != undefined) {
                    if (tetris[i][j] == tetris[i][j + 1] && tetris[i][j] == tetris[i][j + 2]) {
                        tetris[i][j] = 0;
                        tetris[i][j + 1] = 0;
                        tetris[i][j + 2] = 0;
                        score += 30;
                    }
                }
                else if (i < 11 && tetris[i][j] != 0 && tetris[i][j + 1] != undefined && tetris[i][j + 2] != undefined) {
                    if (tetris[i][j] == tetris[i][j + 1] && tetris[i][j] == tetris[i][j + 2]) {
                        tetris[i][j] = 0;
                        tetris[i][j + 1] = 0;
                        tetris[i][j + 2] = 0;
                        score += 30;
                    }
                }
            }
        }
    }

    function checkLineVertical() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (i <= 9 && tetris[i][j] != 0 && tetris[i + 1][j] != 0 && tetris[i + 2][j] != 0) {
                    if ((tetris[i][j] === tetris[i + 1][j] && tetris[i][j] === tetris[i + 2][j]) || (tetris[i][j] === tetris[i + 1][j] && tetris[i][j] === tetris[i + 2][j] - 10)) {
                        tetris[i][j] = 0;
                        tetris[i + 1][j] = 0;
                        tetris[i + 2][j] = 0;
                        score += 30;
                    }
                }
            }
        }
    }

    // function checkLineDiagonal() {
    //     for (let i = tetris.length - 1; i >= 0; i--) {
    //         for (let j = 0; j < tetris[i].length; j++) {
    //             if (tetris[i][j] >10 && tetris[i + 1][j + 1] != undefined && tetris[i + 2][j + 2] != undefined) {
    //                 if (tetris[i][j] === tetris[i + 1][j + 1] + 10 && tetris[i][j] === tetris[i + 2][j + 2] + 10) {
    //                     tetris[i][j] = 0;
    //                     tetris[i + 1][j + 1] = 0;
    //                     tetris[i + 2][j + 2] = 0;
    //                     score += 30;
    //                 }
    //             }
    //         }
    //     }
    // }

    function finish() {
        let stop = false;
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                stop = true;
                for (let k = 0; k < tetris.length; k++) {
                    if (tetris[k][j] == 0) {
                        stop = false;
                        break;
                    }
                }
                if (stop) {
                    clearTimeout(timer);
                    alert("The END!");
                    break;
                }
            }
            if (stop) break;
        }
        return stop;
    }



    let start = document.querySelector('#start');
    start.addEventListener('click', () => {
        init();
        draw();
        colorRound();
        run()
    });

    let pause = document.querySelector('#pause');
    pause.addEventListener('click', () => {
        if (status == "playing") {
            return status = "paused";
        } else if (status == "paused") {
            status = "playing";
            run();
        }
    });
    document.addEventListener("keydown", function (event) {
        let keys = event.code;
        console.log(keys);
        switch (keys) {
            case 'ArrowRight':
                tetrisRight();
                break;
            case 'ArrowLeft':
                tetrisLeft();
                break;
            case 'ArrowDown':
                tetrisBottom();
                break;
            default:
                break;

        }
        return false;
    })
})


