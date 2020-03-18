class Menu {
    constructor() {
        this.button = document.getElementById("tips");

    }
    run() {
        this.button.addEventListener("click", () => {
            document.querySelectorAll("td").forEach((elem) => {
                if (elem.classList.length > 0) {
                    elem.style.background = "green";
                }
            })
        });
    }
}