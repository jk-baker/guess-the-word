const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingParagraph = document.querySelector(".remaining");
const guessesRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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
  letter.value = "";
  message.innerText = "";
  const validated = validateInput(userGuess);
  if (validated != undefined) {
    makeGuess(validated);
  }
})

const validateInput = function(input) {
  const acceptedLetter = /[a-zA-Z]/
  if (input === "") {
    message.innerText = "Please enter a letter!";
  }
  else if (input.length > 1) {
    message.innerText = "Please enter only one letter!";
  }
  else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter!";
  }
  else {
    return input;
  }
}

const makeGuess = function(letter) {
  if (guessedLetters.includes(letter.toUpperCase())) {
    message.innerText = "You already guessed that letter! Try again.";
  }
  else {
    guessedLetters.push(letter.toUpperCase());
  }
  console.log(guessedLetters);
}