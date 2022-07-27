const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingParagraph = document.querySelector(".remaining");
const guessesRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const progress = function(word) {
  const wordArray = word.split("");
  wordArray.forEach(function (tempLetter, index) {
    wordArray[index] = "●";
  })
  wordInProgress.innerText = wordArray.join("");
}
progress(word);
guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  let userGuess = letter.value;
  console.log(userGuess);
  userGuess = "";
})