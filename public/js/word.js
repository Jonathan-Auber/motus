const container = document.querySelector("#game_container");
const formContainer = document.querySelector("#form_container")
const guessWord = document.querySelector("#guess_word");
const guessSubmit = document.querySelector("#guess_submit");
let trying = 6;
// Test
// let number = 0;

function selectAWord(trying, number) {
    fetch("/motus/mots.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const word = response[Math.floor(Math.random() * 7)];
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
            console.log(letterOccurences);

            guessSubmit.addEventListener("click", function () { displayGuess(word, explodedWord, letterOccurences) });

        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayGuess(word, explodedWord, letterOccurences) {
    // Test
    // number++;
    let guessOccurences = {}

    for (let i = 0; i < word.mot.length; i++) {
        if (guessOccurences[guessWord.value[i]]) {
            guessOccurences[guessWord.value[i]]++;
        }
        else {
            guessOccurences[guessWord.value[i]] = 1;
        }
        console.log(guessOccurences[guessWord.value[i]]);

    }
    // 
    const div = document.createElement("div");
    container.appendChild(div);


    for (let i = 0; i < word.mot.length; i++) {
        const span = document.createElement("span");
        // span.classList.add("groupEl" + number)
        div.appendChild(span);

        let letterExist = false;
        explodedWord.forEach(letter => {
            if (letter === guessWord.value[i]) {
                letterExist = true;
            }
        });


        if (i !== 0) {
            if (word.mot[i] === guessWord.value[i]) {
                span.classList.add("good");
            }
            else if (letterExist) {
                // Comment traiter les occurences pour valider almost ou non?
                // Test
                // console.log(letterOccurences[guessWord.value[i]]);
                // console.log(guessOccurences[guessWord.value[i]]);
                // console.log(guessOccurences[guessWord.value[i]] > letterOccurences[guessWord.value[i]]);
                // 
                if (guessOccurences[guessWord.value[i]] > letterOccurences[guessWord.value[i]]) {
                    span.classList.add("wrong");
                } else {
                    span.classList.add("almost");

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
            span.classList.add("good");

        }
    }
    // Test
    // let allSpan = document.querySelectorAll(".groupEl" + number);
    // console.log(allSpan);
    // allSpan.forEach(element => {
    //     if (element.classList.contains("almost")) {
    //         console.log("Alors, tu galères pepito ?");
    //     }
    // })
    // 
    trying--;
    guessWord.value = word.mot[0];

    console.log(guessOccurences);


    if (trying === 0) {
        console.log("Finito pepito !");
        formContainer.classList.add("endGame");
    }
}

selectAWord(trying);

// Nb lettre
// Création Modal pour défaite / victoire
