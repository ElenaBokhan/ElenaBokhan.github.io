
document.querySelector("#signup-submit").onclick = function (event) {
    event.preventDefault();

    let name = document.querySelector("#signup-name").value;
    let pass = document.querySelector("#signup-pass").value;
    let birthday = document.querySelector("#signup-birthday").value;
    let email = document.querySelector("#signup-email").value;

    let sex = document.querySelectorAll(".sex");
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }
    let data = {
        "name": name,
        "pass": pass,
        "birthday": birthday,
        "email": email,
        "sex": sex,
    }
    ajax("core/signup.php", "POST", signup, data)

}

function signup(result) {
    console.log(result)
    if (result == 2) {
        M.toast({
            html: 'Заполните поля',
            classes: 'rounded'
        });
    } else if (result == 1) {
        M.toast({
            html: 'Вы успешно зарегистрировались',
            classes: 'rounded'
        });
        closeModal();
    } else {
        M.toast({
            html: 'Ошибка! Повторите регистрацию позже',
            classes: 'rounded'
        });
    }

}

document.querySelector("#login-submit").onclick = function (event) {
    event.preventDefault();
    let pass = document.querySelector("#login-pass").value;
    let email = document.querySelector("#login-email").value;

    let data = {
        "pass": pass,
        "email": email,
    }
    ajax("core/login.php", "POST", login, data)

}

function login(result) {
    if (result == 2) {
        M.toast({html: 'Заполните поля',classes: 'rounded'});
    } else if (result == 0) {
        M.toast({html: 'Такой пользователь не найден',classes: 'rounded'});       
    } else {
        console.log(result)
        result = JSON.parse(result);
        var d = new Date();
        d.setTime(d.getTime() + (10 * 60 * 1000));
        var expires = d.toUTCString();
        document.cookie = `email=${result.email}; expires=${expires}; path=/`;
        location.href = "cabinet.php";
    }

}