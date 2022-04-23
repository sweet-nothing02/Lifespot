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