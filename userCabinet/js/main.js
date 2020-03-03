document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, {
        "format": "yyyy-mm-dd"
    });
});

document.querySelectorAll(".modal-show").forEach(function (element) {
    element.onclick = showModal;
});

document.querySelectorAll(".modal-project-close").forEach(function (element) {
    element.onclick = closeModal;
});

document.querySelectorAll(".modal-wrp").forEach(function (elem) {
    elem.onclick = closeModal;
});
document.querySelector("#log-in .modal-project").onclick = function (event) {
    event.stopPropagation();
}
document.querySelector("#sign-up .modal-project").onclick = function (event) {
    event.stopPropagation();
}

function showModal() {
    document.querySelectorAll(".modal-wrp").forEach(function (elem) {
        elem.classList.add("hide");
    });
    let modalId = this.dataset.modal;
    document.querySelector(modalId).classList.remove("hide");
    document.onkeydown = function (e) {
        if (e.keyCode == 27) {
            closeModal();
        }
    };
}

function closeModal() {
    document.querySelectorAll(".modal-wrp").forEach(function (elem) {
        elem.classList.add("hide");
    });
    document.onkeydown = null;
}
document.querySelector('.read-rules').onclick = function () {
    document.querySelector(".slider-form").style.marginLeft = "-300px";
}
document.querySelectorAll('.read-rules-back').forEach(function (elem) {
    elem.onclick = function () {
        document.querySelector(".slider-form").style.marginLeft = "0";
    }
})

document.querySelector("#agree-rules").onchange=function(){
    if(this.checked){        
        document.querySelector("#signup-submit").classList.remove("disabled");
    }else{ document.querySelector("#signup-submit").classList.add("disabled");}
}