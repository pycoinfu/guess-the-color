const currentColorText = document.getElementById("current-color");
const colorElements = document.getElementsByClassName("color");
const guessElement = document.getElementById("guess");
const correctGuessesEElement = document.getElementById("correct-guesses");
let currentColor;

let correctGuesses = localStorage.getItem("correct-guesses");
if (correctGuesses === null) {
    correctGuesses = 0;
}
correctGuessesEElement.textContent = `Correct guesses: ${correctGuesses}`;

function randomColor() {
    return [
        (Math.random() * 255).toFixed(0),
        (Math.random() * 255).toFixed(0),
        (Math.random() * 255).toFixed(0),
    ];
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
  
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function render() {
    currentColor = randomColor();
    let allColors = [currentColor, randomColor(), randomColor()]
    shuffle(allColors);

    currentColorText.textContent = `rgb(${currentColor.toString()})`;

    for (let i = 0; i < allColors.length; i++) {
        colorElements[i].style.background = `rgb(${allColors[i].toString()})`
    }
}

render();

for (let i = 0; i < colorElements.length; i++) {
    colorElements[i].addEventListener("click", () => {
        if (colorElements[i].style.background === `rgb(${currentColor.join(", ")})`) {
            guessElement.textContent = "correct!";
            correctGuesses++;
            localStorage.setItem("correct-guesses", correctGuesses);
            correctGuessesEElement.textContent = `Correct guesses: ${correctGuesses}`;
        } else {
            guessElement.textContent = "wrong!";
        }
        render()
    })
}