const backgrounds = document.querySelector(".backgrounds");

const IMG_NUMBER = 3;


function paintImg(imgNum) {

    backgrounds.classList.add(`color${imgNum + 1}`);

}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;

}

function randomBack() {
    var randomNum = genRandom();
    removeClassList();
    paintImg(randomNum);

}

function removeClassList() {
    // backgrounds.classList.add('fake');

    if (backgrounds.className === 'backgrounds color1') {
        backgrounds.classList.remove('color1');
    } else if (backgrounds.className === 'backgrounds color2') {
        backgrounds.classList.remove('color2');
    } else if (backgrounds.className === 'backgrounds color3') {
        backgrounds.classList.remove('color3');
    }

}

function init() {
    paintImg(genRandom());

    setInterval(function() {
        removeClassList();
        randomBack();
    }, 2000);
}

init();