const container = document.querySelector("#game_container");
const formContainer = document.querySelector("#form_container")
const guessWord = document.querySelector("#guess_word");
const guessSubmit = document.querySelector("#guess_submit");
let trying = 6;

function selectAWord(trying) {
    fetch("/motus/mots.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const word = response[Math.floor(Math.random() * 7)];
            const div = document.createElement("div");
            container.appendChild(div);
            console.log(word);

            let explodedWord = [];
            for (let i = 0; i < word.mot.length; i++) {
                explodedWord.push(word.mot[i]);
                const span = document.createElement("span");
                div.appendChild(span);
                if (i === 0) {
                    span.innerText = word.mot[i];
                    span.classList.add("good");
                } else {
                    span.innerText = "_";
                }
            }
            console.log(trying);

            guessSubmit.addEventListener("click", function () { displayGuess(word, explodedWord) });

        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayGuess(word, explodedWord) {
    const div = document.createElement("div");
    container.appendChild(div);
    for (let i = 0; i < word.mot.length; i++) {
        const span = document.createElement("span");
        div.appendChild(span);


        let letterExist = false;
        explodedWord.forEach(element => {
            if (element === guessWord.value[i]) {
                letterExist = true;
            }
        });


        if (i !== 0) {
            if (word.mot[i] === guessWord.value[i]) {
                span.classList.add("good");
            }
            else if (letterExist) {
                span.classList.add("almost");
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
    trying--;
    console.log(trying);

    if (trying === 0) {
        console.log("finito pepito");
        formContainer.classList.add("endGame");
    }
}

selectAWord(trying);

// Nb lettre
