// Class for modal display and hiding
class Modal {
  constructor(id) {
    this.modal = document.querySelector(`#${id}`);
  }

  // Display the modal
  display() {
    this.modal.style.display = "block";
  }

  // Hide the modal
  hide() {
    this.modal.style.display = "none";
  }
}

// Class for the game
class Game {
  constructor() {
    // Control
    this.withoutSpecialChar = /^[A-Za-z\-]+$/;
    // Counter
    this.trying = 0;
    this.totalScore = 0;
    // Words and iteration stokage
    this.allWords = [];
    this.playedWord = [];
    this.word = "";
    this.explodedWord = [];
    this.letterOccurrences = {};
    // HTML elements
    this.container = document.querySelector("#game-container");
    this.gameHeader = document.querySelector("#game-header");
    this.wordToGuess = document.querySelector("#word-to-guess");
    this.guessContainer = document.querySelector("#guess-container");
    this.gameForm = document.querySelector("#game-header__form");
    this.guessWord = document.querySelector("#guess_word");
    this.guessSubmit = document.querySelector("#guess_submit");
    this.quits = document.querySelector("#quits-btn");
    this.double = document.querySelector("#double-btn");
    this.userScore = document.querySelector("#user-score");
    this.errorMessage = document.querySelector("#error-message");
    this.errorBtn = document.querySelector("#error-btn");
    this.scoreContainer = document.querySelectorAll(".score");
    // Modals
    this.looseModal = new Modal("loose-modal");
    this.winModal = new Modal("win-modal");
    this.quitsModal = new Modal("quits-modal");
    this.doubleModal = new Modal("double-modal");
    this.errorModal = new Modal("error-modal");

    // Event listeners
    this.quits.addEventListener("click", () => {
      this.displayQuitsModal();
    });

    this.double.addEventListener("click", () => {
      this.resetGame();
    });

    this.guessSubmit.addEventListener("click", () => {
      this.displayGuess();
    });

    this.guessWord.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.displayGuess();
      }
    });

    this.errorBtn.addEventListener("click", () => {
      this.errorModal.hide();
    });
  }

  // Initialize the game
  async initGame() {
    try {
      const words = await this.fetchData();
      this.allWords.push(...words);
      this.startGame();
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch the word data from the server
  fetchData() {
    return new Promise((resolve, reject) => {
      fetch("/motus/mots.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((response) => {
          const words = response.map((word) => word);
          resolve(words);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Display the quits modal
  displayQuitsModal() {
    this.winModal.hide();
    this.quitsModal.display();
  }

  // Reset the game
  resetGame() {
    this.winModal.hide();
    this.guessWord.value = "";
    this.wordToGuess.innerHTML = "";
    this.guessContainer.innerHTML = "";
    this.trying = 0;
    this.startGame();
  }

  // Start the game
  startGame() {
    const wordSelected = this.getRandomWord();
    // Check for a new word not already used
    for (let i = 0; i < this.playedWord.length; i++) {
      if (this.playedWord[i] === wordSelected.mot) {
        this.startGame();
        return;
      }
    }

    // Create an object of occurences of the selected word
    let newExplodedWord = wordSelected.mot.split("");
    let newLetterOccurrences = {};
    for (let i = 0; i < wordSelected.mot.length; i++) {
      let letter = newExplodedWord[i];
      if (newLetterOccurrences[letter]) {
        newLetterOccurrences[letter]++;
      } else {
        newLetterOccurrences[letter] = 1;
      }
      // Insert the selected word in the webpage
      const span = document.createElement("span");
      span.classList.add("letter_container", "reference_word");
      this.wordToGuess.appendChild(span);
      if (i === 0) {
        span.innerText = wordSelected.mot[i];
        span.classList.add("good");
      } else {
        span.innerText = "_";
      }
    }
    this.playedWord.push(wordSelected.mot);
    this.word = wordSelected;
    this.explodedWord = newExplodedWord;
    this.letterOccurrences = newLetterOccurrences;
  }

  // Get a random word from the list
  getRandomWord() {
    return this.allWords[Math.floor(Math.random() * this.allWords.length)];
  }

  // Display the guess result
  displayGuess() {
    if (this.guessWord.value === "") {
      this.errorMessage.innerText = "Vous devez rentrez un mot !";
      this.errorModal.display();
      return;
    }

    if (!this.withoutSpecialChar.test(this.guessWord.value)) {
      this.errorMessage.innerText =
        "Le mot proposé contient des caractères spéciaux !";
      this.errorModal.display();
      return;
    }
    if (this.guessWord.value.length < 6) {
      this.errorMessage.innerText =
        "Le mot proposé contient moins de six caractères !";
      this.errorModal.display();
      return;
    }

    // if (this.guessWord.value.lenght )

    this.trying++;
    let explodedGuessWord = this.guessWord.value.split("");

    // If the guessing word is correct, exit
    if (this.explodedWord.toString() === explodedGuessWord.toString()) {
      const referenceWord = document.querySelectorAll(".reference_word");
      let count = 0;
      referenceWord.forEach((element) => {
        element.classList.add("good");
        element.innerText = this.explodedWord[count];
        count++;
      });
      this.winModal.display();
      this.displayScore();
      return;
    }

    // Create Occurence of the guessing word
    let guessOccurrences = {};
    for (let i = 0; i < this.guessWord.value.length; i++) {
      if (guessOccurrences[this.guessWord.value[i]]) {
        guessOccurrences[this.guessWord.value[i]]++;
      } else {
        guessOccurrences[this.guessWord.value[i]] = 1;
      }
    }

    // Create the container for the guessing word
    const div = document.createElement("div");
    div.classList.add("no_wrap");
    this.guessContainer.appendChild(div);

    let occurrencesDifferences = {};
    for (let i = 0; i < this.word.mot.length; i++) {
      const span = document.createElement("span");
      span.classList.add("letter_container");
      div.appendChild(span);

      let letterExist = false;
      // Check if letter exist in the word to find
      this.explodedWord.forEach((letter) => {
        if (letter === this.guessWord.value[i]) {
          letterExist = true;
        }
      });

      if (this.word.mot[i] === this.guessWord.value[i]) {
        span.classList.add(
          "good",
          "occurenceOf_" + this.guessWord.value[i] + "_" + this.trying
        );
      } else if (letterExist) {
        span.classList.add("almost");
        // Create the difference of occurences
        if (
          guessOccurrences[this.guessWord.value[i]] >
          this.letterOccurrences[this.guessWord.value[i]]
        ) {
          occurrencesDifferences[this.guessWord.value[i]] =
            guessOccurrences[this.guessWord.value[i]] -
            this.letterOccurrences[this.guessWord.value[i]];
          span.classList.add(
            "occurenceOf_" + this.guessWord.value[i] + "_" + this.trying
          );
        }
      } else {
        span.classList.add("wrong");
      }

      span.innerText = "_";

      if (this.guessWord.value[i] !== undefined) {
        span.innerText = this.guessWord.value[i];
      }
    }

    // Convert excess letter form almost to wrong
    for (let letter in occurrencesDifferences) {
      let goodOcc = document.querySelectorAll(
        ".good.occurenceOf_" + letter + "_" + this.trying
      );
      let occ = document.querySelectorAll(
        ".almost.occurenceOf_" + letter + "_" + this.trying
      );

      for (let i = occurrencesDifferences[letter]; i > 0; i--) {
        if (this.letterOccurrences[letter] - goodOcc.length === 0) {
          occ[i - 1].classList.add("wrong");
          occ[i - 1].classList.remove(
            "almost",
            ".occurenceOf_" + letter + "_" + this.trying
          );
        } else if (this.letterOccurrences[letter] - goodOcc.length > 0) {
          occ[i].classList.add("wrong");
          occ[i].classList.remove(
            "almost",
            ".occurenceOf_" + letter + "_" + this.trying
          );
        }
      }
    }

    this.guessWord.value = "";
    this.guessWord.focus();

    // Verify try limit
    if (this.trying === 6) {
      this.gameForm.classList.add("endGame");
      this.looseModal.display();
    }
  }

  // Display the score
  displayScore() {
    let score;
    score = Math.round(50 / this.trying);
    this.totalScore += parseInt(score);
    this.scoreContainer.forEach((element) => {
      element.innerText = "Votre score est de " + this.totalScore + " points !";
    });
    this.userScore.value = this.totalScore;
  }
}

const game = new Game();
game.initGame();
