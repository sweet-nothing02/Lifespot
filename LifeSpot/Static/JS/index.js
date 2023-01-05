//Сохранение данных сессии сразу при заходе пользователя на страницу
function handleSession(logger, checker) {
    if (window.sessionStorage.getItem("startDate") == null) {
        window.sessionStorage.setItem("startDate", new Date().toLocaleString())
    }
    if (window.sessionStorage.getItem("userAgent") == null) {
        window.sessionStorage.setItem("userAgent", window.navigator.userAgent)
    }
    if (window.sessionStorage.getItem("userAge") == null) {
        let input = prompt("Пожалуйста, введите ваш возраст");
        window.sessionStorage.setItem("userAge", input)

        checker(true)
    } else {
        checker(false)
    }

    logger()
}

//Проверка возраста
let checker = function (newVisit) {
    if (window.sessionStorage.getItem("userAge") >= 18) {
        // Добавим проверку на первое посещение, чтобы не показывать приветствие
        // лишний раз
        if (newVisit) {
            alert("Приветствуем на LifeSpot! " + '\n' + "Текущее время: " + new Date().toLocaleString());
        }
    }
    else {
        alert("Наши трансляции не предназначены для лиц моложе 18 лет. Вы будете перенаправлены");
        window.location.href = "http://www.google.com"
    }
}

//Вывод в консоль
let logger = function () {
    console.log('Начало сессии: ' + window.sessionStorage.getItem("startDate"))
    console.log('Даныне клиента: ' + window.sessionStorage.getItem("userAgent"))
    console.log('Возраст пользователя: ' + window.sessionStorage.getItem("userAge"))
}

//Фильтрация контента
function filterContent( inputParseFunction ) {
    let elements = document.getElementsByClassName('video-container');

    for (let i = 0; i <= elements.length; i++) {
        let videoText = elements[i].querySelector(".video-title").innerText;
        if (!videoText.toLowerCase().includes(inputParseFunction().toLowerCase())) {
            elements[i].style.display = 'none';
        } else {
            elements[i].style.display = 'inline-block';
        }
    }
}

function showTime(city, timeZone) {
    let time = document.getElementById(city);
    let h = new Date().getUTCHours();
    let m = new Date().getUTCMinutes();
    let s = new Date().getUTCSeconds();

    if (h + timeZone > 23 || h + timeZone < 0)
        h = Math.abs(h + timeZone - 24);
    else
        h = h + timeZone;
    if (h < 10)
        h = '0' + h;
    if (m < 10)
        m = '0' + m;
    if (s < 10)
        s = '0' + s;
    time.innerHTML = h + ":" + m + ":" + s;
}