const container = document.querySelector("#game_container");
const formContainer = document.querySelector("#form_container")
const guessWord = document.querySelector("#guess_word");
const guessSubmit = document.querySelector("#guess_submit");
let trying = 6;
let number = 0;

function selectAWord(trying, number) {
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
            container.appendChild(div);
            console.log(word);

            let explodedWord = [];
            let letterOccurences = {};
            for (let i = 0; i < word.mot.length; i++) {
                explodedWord.push(word.mot[i]);
                let letter = explodedWord[i];
                if (letterOccurences[letter]) {
                    letterOccurences[letter]++;
                }
                else {
                    letterOccurences[letter] = 1;
                }
                const span = document.createElement("span");
                div.appendChild(span);
                if (i === 0) {
                    span.innerText = word.mot[i];
                    span.classList.add("good");
                } else {
                    span.innerText = "_";
                }
            }
            guessSubmit.addEventListener("click", function () { displayGuess(word, explodedWord, letterOccurences) });

        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayGuess(word, explodedWord, letterOccurences) {
    number++;
    let guessOccurences = {}

    for (let i = 0; i < word.mot.length; i++) {
        if (guessOccurences[guessWord.value[i]]) {
            guessOccurences[guessWord.value[i]]++;
        }
        else {
            guessOccurences[guessWord.value[i]] = 1;
        }

    }
    const div = document.createElement("div");
    container.appendChild(div);

    let occurencesDifferences = {};

    for (let i = 0; i < word.mot.length; i++) {
        const span = document.createElement("span");
        div.appendChild(span);

        let letterExist = false;
        explodedWord.forEach(letter => {
            if (letter === guessWord.value[i]) {
                letterExist = true;
            }
        });


        if (i !== 0) {
            if (word.mot[i] === guessWord.value[i]) {
                span.classList.add("good", "occurenceOf_" + guessWord.value[i] + "_" + number);
            }
            else if (letterExist) {
                span.classList.add("almost");

                if (guessOccurences[guessWord.value[i]] > letterOccurences[guessWord.value[i]]) {
                    occurencesDifferences[guessWord.value[i]] = guessOccurences[guessWord.value[i]] - letterOccurences[guessWord.value[i]];
                    span.classList.add("occurenceOf_" + guessWord.value[i] + "_" + number);
                }
            }
            else {
                span.classList.add("wrong");
            }

            span.innerText = "_";

            if (guessWord.value[i] !== undefined) {
                span.innerText = guessWord.value[i];
            }
        } else {
            span.innerText = word.mot[i];
            span.classList.add("good", "occurenceOf_" + guessWord.value[i] + "_" + number);

        }
    }

    for (let letter in occurencesDifferences) {
        let goodOcc = document.querySelectorAll(".good.occurenceOf_" + letter + "_" + number);
        let occ = document.querySelectorAll(".almost.occurenceOf_" + letter + "_" + number);

        for (let i = occurencesDifferences[letter]; i > 0; i--) {
            if (letterOccurences[letter] - goodOcc.length === 0) {
                occ[i - 1].classList.add("wrong");
                occ[i - 1].classList.remove("almost", ".occurenceOf_" + letter + "_" + number);
            } else if (letterOccurences[letter] - goodOcc.length > 0) {
                occ[i].classList.add("wrong");
                occ[i].classList.remove("almost", ".occurenceOf_" + letter + "_" + number);
            }
        }
    }

    trying--;
    guessWord.value = word.mot[0];


    if (trying === 0) {
        console.log("Finito pepito !");
        formContainer.classList.add("endGame");
    }
}

selectAWord(trying);

// Création Modal pour défaite / victoire
