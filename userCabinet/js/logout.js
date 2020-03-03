document.querySelector("#logout").onclick = function () {
    let c = document.cookie;
    console.log(c);
    let d = new Date();
    d.setTime(d.getTime() - (10 * 60 * 1000));
    let expires = d.toUTCString();
    document.cookie = `${c}; expires=${expires}; path=/`;
    location.reload();
}