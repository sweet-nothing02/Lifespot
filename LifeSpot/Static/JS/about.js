function Comment() {
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true
        return
    }

    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    this.date = new Date().toLocaleString()
}

function addComment() {
    let comment = new Comment()

    if (comment.empty) {
        return;
    }

    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?')

    if (enableLikes) {
        let review = Object.create(comment)

        review.rate = 0;

        writeReview(review)
    } else {
        writeReview(comment)
    }
}

const writeReview = review => {
    let likeCounter = '';

    if (review.hasOwnProperty('rate')) {
        let commentId = Math.random();

        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `💚 ${review.rate}</button>`
    }
    document.getElementsByClassName('review-container')[0].innerHTML += ' <div class="review-text">\n' + `<p> <i> <b>${review['author']}</b> ${review['date']}${likeCounter}</i></p>` + `<p>${review['text']}</p>` + '</div>';
}

function addLike(id) {
    let element = document.getElementById(id);

    let array = element.innerText.split(' ')

    let resultNum = parseInt(array[array.length - 1], 10);

    resultNum += 1

    array[array.length - 1] = `${resultNum}`

    element.innerText = array.join(' ')
}

//Слайдер
const slides = document.getElementById("slides");
const allSlides = document.querySelectorAll(".slide");
const slidesLength = allSlides.length;
const slideWidth = allSlides[0].offsetWidth;

let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;

let canISlide = true;

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);

let description = document.getElementById("description");
const descriptions = ["Нью-Йорк, США<span class=\"tooltip\">Нью-Йорк — крупнейший город США, входящий в одну из крупнейших агломераций мира. Население города составляет 8 467 513 человек, агломерации — 19,77 млн (оценка на 2021 год). Нью-Йорк расположен на берегу Атлантического океана в юго-восточной части штата Нью-Йорк. Город был основан в начале XVII века голландскими колонистами и до 1664 года назывался Новый Амстердам.</span>",
    "Санкт-Петербург, Россия<span class=\"tooltip\">Санкт-Петербург – русский портовый город на побережье Балтийского моря, который в течение двух веков служил столицей Российской империи. Он был основан в 1703 году Петром I, которому воздвигнут знаменитый памятник \"Медный всадник\". Город по праву считается культурным центром страны.</span>",
    "Лондон, Великобритания<span class=\"tooltip\">Лондон — столица и крупнейший город Англии и Великобритании. Население составляет 8 908 081 чел.(2018) — третий по величине город Европы. Образует агломерацию Большой Лондон и более обширный метрополитенский район. Расположен на юго-востоке острова Великобритания, на равнине в устье Темзы, вблизи Северного моря. Главный политический, экономический и культурный центр Соединённого Королевства.</span>"];

slides.appendChild(cloneFirstSlide);
slides.insertBefore(cloneLastSlide, firstSlide);

next.addEventListener("click", () => switchSlide("next"));
prev.addEventListener("click", () => switchSlide("prev"));

slides.addEventListener("transitionend", checkIndex);

slides.addEventListener("mousedown", dragStart);

slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

function dragStart(e) {
    e.preventDefault();
    initialPosition = slides.offsetLeft;

    if (e.type == "touchstart") {
        posX1 = e.touches[0].clientX;
    } else {
        posX1 = e.clientX;

        document.onmouseup = dragEnd;
        document.onmousemove = dragMove;
    }
}

function dragMove(e) {
    if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
    } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
    }

    slides.style.left = `${slides.offsetLeft - posX2}px`;
}

function dragEnd() {
    finalPosition = slides.offsetLeft;
    if (finalPosition - initialPosition < -200) {
        switchSlide("next", "dragging");
    } else if (finalPosition - initialPosition > 200) {
        switchSlide("prev", "dragging");
    } else {
        slides.style.left = `${initialPosition}px`;
    }

    document.onmouseup = null;
    document.onmousemove = null;
}

function switchSlide(arg, arg2) {
    slides.classList.add("transition");

    if (canISlide) {
        if (!arg2) {
            initialPosition = slides.offsetLeft;
        }
        if (arg == "next") {
            slides.style.left = `${initialPosition - slideWidth}px`;
            index++;
        } else {
            slides.style.left = `${initialPosition + slideWidth}px`;
            index--;
        }
    }

    canISlide = false;
}

function checkIndex() {
    slides.classList.remove("transition");

    if (index == -1) {
        slides.style.left = `-${slidesLength * slideWidth}px`;
        index = slidesLength - 1;
    }

    if (index == slidesLength) {
        slides.style.left = `-${1 * slideWidth}px`;
        index = 0;
    }

    canISlide = true;
    description.innerHTML = descriptions[index];
}