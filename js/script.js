const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
  const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await data.text();
  const wordArray = words.split("\n");
  word = wordArray[Math.floor(Math.random() * wordArray.length)].trim();
  progress(word);
}

//start game
getWord();

const progress = function(word) {
  const progressLettersArray = [];
  for (const letter of word) {
    progressLettersArray.push("●");
  }
  wordInProgress.innerText = progressLettersArray.join("");
};

//progress(word);

guessButton.addEventListener("click", function(e) {
  e.preventDefault();
  let userGuess = letter.value;
  letter.value = "";
  message.innerText = "";
  const validated = validateInput(userGuess);
  if (validated) {
    makeGuess(validated);
  }
})

const validateInput = function(input) {
  const acceptedLetter = /[a-zA-Z]/;
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
  const letterUpperCase = letter.toUpperCase();
  if (guessedLetters.includes(letterUpperCase)) {
    message.innerText = "You already guessed that letter! Try again.";
  }
  else {
    guessedLetters.push(letterUpperCase);
    displayGuesses();
    checkGuess(letterUpperCase);
    updateWordInProgress(guessedLetters);
  }
  //console.log(guessedLetters);
}

const displayGuesses = function() {
  guessed.innerHTML = "";
  guessed.innerHTML = guessedLetters.join(" ");
}

const updateWordInProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  wordArray.forEach(function (tempLetter, index) {
    if (!guessedLetters.includes(wordArray[index])) {
      wordArray[index] = "●";
    }
  })
  wordInProgress.innerText = wordArray.join("");
  checkIfWon();
}

const checkGuess = function(userGuess) {
  if (word.toUpperCase().includes(userGuess)) {
    message.innerText = "You guessed a correct letter!"
  }
  else {
    message.innerText = "You guessed incorrectly.";
    remainingGuesses -= 1;
    if (remainingGuesses === 0) {
     message.innerText = `Sorry, you are out of guesses. The word was ${word}.`;
     startOver();
   }
   else if (remainingGuesses === 1) {
      remainingGuessesParagraph.innerText = "Good luck, this is your last guess!"
   }
    else {
     remainingGuessesParagraph.innerText = `You have ${remainingGuesses} left.`;
   }
  }
}

const checkIfWon = function() {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win")
    message.innerHTML = '<p class="highlight"> You guessed the correct word! Congrats!</p>';
  
    startOver();
  }
};

const startOver = function() {
  guessButton.classList.add("hide");
  remainingGuessesParagraph.classList.add("hide");
  wordInProgress.classList.add("hide");
  playAgainButton.classList.remove("hide");
}

playAgainButton.addEventListener("click", function() {
  message.classList.remove("win");
  message.innerText = "";
  playAgainButton.classList.add("hide");
  guessButton.classList.remove("hide");
  guessedLetters.length = 0;
  console.log(guessedLetters);
  guessed.innerHTML = "";
  remainingGuesses = 8;
  // need to empty array - guessedLetters = [];
  remainingGuessesParagraph.innerText = `You have ${remainingGuesses} guesses left.`; 
  console.log(remainingGuessesParagraph);
  remainingGuessesParagraph.classList.remove("hide");

  wordInProgress.classList.remove("hide");
  wordInProgress.innerText = "";
  getWord();
})

