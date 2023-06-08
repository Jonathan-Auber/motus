// MODAL
const looseModal = document.querySelector("#looseM-modal");
const winModal = document.querySelector("#win-modal");
const quitsModal = document.querySelector("#quits-modal");
const doubleModal = document.querySelector("#double-modal");
const scoreContainer = document.querySelectorAll(".score");
const quits = document.querySelector("#quits-btn");
const double = document.querySelector("#double-btn");
const userScore = document.querySelector("#user-score");

quits.addEventListener("click", function () {
  displayQuitsModal();
});

double.addEventListener("click", function () {
  resetGame();
});

function displayQuitsModal() {
  winModal.style.display = "none";
  quitsModal.style.display = "block";
}

function resetGame() {
  winModal.style.display = "none";
  gameHeader.innerHTML = initialGameHeaderHTML;
  trying = 0;
  selectAWord(trying);
}

// GAME
let trying = 0;
let totalScore = 0;
console.log(totalScore);
const container = document.querySelector("#game-container");
const gameHeader = document.querySelector("#game-header");
const initialGameHeaderHTML = gameHeader.innerHTML;
const gameForm = document.querySelector("#game-header__form");
const guessWord = document.querySelector("#guess_word");
const guessSubmit = document.querySelector("#guess_submit");

function selectAWord(trying) {
  fetch("/motus/mots.json", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const word = response[Math.floor(Math.random() * 25)];
      guessWord.value = word.mot[0];
      const div = document.createElement("div");
      gameHeader.appendChild(div);
      div.classList.add("position-left");
      console.log(word);

      let explodedWord = word.mot.split("");

      let letterOccurences = {};
      for (let i = 0; i < word.mot.length; i++) {
        let letter = explodedWord[i];
        if (letterOccurences[letter]) {
          letterOccurences[letter]++;
        } else {
          letterOccurences[letter] = 1;
        }
        const span = document.createElement("span");
        span.classList.add("letter_container", "reference_word");
        div.appendChild(span);
        if (i === 0) {
          span.innerText = word.mot[i];
          span.classList.add("good");
        } else {
          span.innerText = "_";
        }
      }
      guessSubmit.addEventListener("click", function () {
        displayGuess(word, explodedWord, letterOccurences);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayGuess(word, explodedWord, letterOccurences) {
  trying++;
  let explodedGuessWord = guessWord.value.split("");

  // If the guessing word is the good
  if (explodedWord.toString() == explodedGuessWord.toString()) {
    const referenceWord = document.querySelectorAll(".reference_word");
    let count = 0;
    referenceWord.forEach((element) => {
      element.classList.add("good");
      element.innerText = explodedWord[count];
      count++;
    });
    winModal.style.display = "block";
    displayScore();
    return;
  }
  let guessOccurences = {};

  for (let i = 0; i < guessWord.value.length; i++) {
    if (guessOccurences[guessWord.value[i]]) {
      guessOccurences[guessWord.value[i]]++;
    } else {
      guessOccurences[guessWord.value[i]] = 1;
    }
  }

  const div = document.createElement("div");
  container.appendChild(div);

  let occurencesDifferences = {};

  for (let i = 0; i < word.mot.length; i++) {
    const span = document.createElement("span");
    span.classList.add("letter_container");
    div.appendChild(span);

    let letterExist = false;
    explodedWord.forEach((letter) => {
      if (letter === guessWord.value[i]) {
        letterExist = true;
      }
    });

    if (i !== 0) {
      if (word.mot[i] === guessWord.value[i]) {
        span.classList.add(
          "good",
          "occurenceOf_" + guessWord.value[i] + "_" + trying
        );
      } else if (letterExist) {
        span.classList.add("almost");

        if (
          guessOccurences[guessWord.value[i]] >
          letterOccurences[guessWord.value[i]]
        ) {
          occurencesDifferences[guessWord.value[i]] =
            guessOccurences[guessWord.value[i]] -
            letterOccurences[guessWord.value[i]];
          span.classList.add(
            "occurenceOf_" + guessWord.value[i] + "_" + trying
          );
        }
      } else {
        span.classList.add("wrong");
      }

      span.innerText = "_";

      if (guessWord.value[i] !== undefined) {
        span.innerText = guessWord.value[i];
      }
    } else {
      span.innerText = word.mot[i];
      span.classList.add(
        "good",
        "occurenceOf_" + guessWord.value[i] + "_" + trying
      );
    }
  }

  for (let letter in occurencesDifferences) {
    let goodOcc = document.querySelectorAll(
      ".good.occurenceOf_" + letter + "_" + trying
    );
    let occ = document.querySelectorAll(
      ".almost.occurenceOf_" + letter + "_" + trying
    );

    for (let i = occurencesDifferences[letter]; i > 0; i--) {
      if (letterOccurences[letter] - goodOcc.length === 0) {
        occ[i - 1].classList.add("wrong");
        occ[i - 1].classList.remove(
          "almost",
          ".occurenceOf_" + letter + "_" + trying
        );
      } else if (letterOccurences[letter] - goodOcc.length > 0) {
        occ[i].classList.add("wrong");
        occ[i].classList.remove(
          "almost",
          ".occurenceOf_" + letter + "_" + trying
        );
      }
    }
  }

  guessWord.value = word.mot[0];

  if (trying === 6) {
    console.log("Finito pepito !");
    gameForm.classList.add("endGame");
    looseModal.style.display = "block";
  }
}

function displayScore() {
  let score;
  score = Math.round(50 / trying);
  totalScore += score;
  scoreContainer.forEach((element) => {
    element.innerText += " " + score + " points !";
  });
  console.log(totalScore);

  userScore.value += totalScore;
}

selectAWord(trying);
