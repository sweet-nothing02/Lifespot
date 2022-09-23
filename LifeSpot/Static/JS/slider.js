////// Получаем видимую часть слайда
////let viewport = document.getElementById("viewport").offsetWidth;
////// Получаем кнопку вперёд
////let btnNext = document.getElementById("next");
////// Получаем кнопку назад
////let btnPrev = document.getElementById("prev");
////// Получаем элемент со всеми слайдами
////let slider = document.querySelector("div.slider");
////// Получаем элементы показа слайда
////let viewSliders = document.querySelectorAll(".viewSlide");
////// Объявляем переменную номера слайда
////let viewSlide = 0;

////// Назначаем цвет индикатор слайда зелёный
////viewSliders[0].style.backgroundColor = "green";

////// Обработка клика на кнопку вперёд
////btnNext.addEventListener("click", function () {
////    // Делаем индикатор слайда красный
////    viewSliders[viewSlide].style.backgroundColor = "red";
////    // Условие, если номер слайда меньше четырёх
////    if (viewSlide < 4) { // Если верно то
////        // Увеличиваем номер слайда на один
////        viewSlide++;
////    } else { // Иначе
////        // Номер слайда равен нулю
////        viewSlide = 0;
////    }
////    // Закрашиваем индикатор слайда в зелёный
////    viewSliders[viewSlide].style.backgroundColor = "green";
////    // Меняем позицию всего слайда
////    slider.style.left = -viewSlide * viewport + "px";
////});

////// Обработка клика на кнопку назад
////btnPrev.addEventListener("click", function () {
////    // Делаем индикатор слайда красный
////    viewSliders[viewSlide].style.backgroundColor = "red";
////    // Условие, если номер слайда больше нуля
////    if (viewSlide > 0) { // Если верно то
////        // Уменьшаем номер слайда
////        viewSlide--;
////    } else { // Иначе
////        // Номер слайда равен четырём
////        viewSlide = 4;
////    }
////    // Закрашиваем индикатор слайда в зелёный
////    viewSliders[viewSlide].style.backgroundColor = "green";
////    // Меняем позицию всего слайда
////    slider.style.left = -viewSlide * viewport + "px";
////});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}