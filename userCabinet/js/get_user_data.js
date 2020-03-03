document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, {
        "format": "yyyy-mm-dd"
    });
  });

let userData = getCookie("email");
console.log(getCookie("email"));
ajax("core/get_user_data.php", "POST", getUserData, {
    "email": userData
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getUserData(result) {
    result = JSON.parse(result);
    document.querySelector("#signup-name").value = result.name;
    document.querySelector("#signup-pass").value = result.password;
    document.querySelector("#signup-birthday").value = result.birthday;
    M.updateTextFields();
}

document.querySelector("#signup-submit").onclick = function (event) {
    event.preventDefault();
    let sex = document.querySelectorAll(".sex");
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }
    let updateData = {
        "email": userData,
        "name": document.querySelector("#signup-name").value,
        "pass": document.querySelector("#signup-pass").value,
        "birthday": document.querySelector("#signup-birthday").value,
        "sex": sex,
    }
    ajax("core/update_user_data.php", "POST", updateUserData, updateData);
}

function updateUserData(result) {
    result = JSON.parse(result);
    console.log(result);
    if (result == 1) {
        M.toast({html: 'Данные успешно обновлены',classes: 'rounded'});
       
    } else {
        M.toast({html: 'Ошибка обновления',classes: 'rounded'});        
    }
}