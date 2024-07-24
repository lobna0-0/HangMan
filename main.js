// letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach(letter => {
    // create span
    let span = document.createElement("span");
    // create letter text node
    let theLetter = document.createTextNode(letter);
    // append the letter to span 
    span.appendChild(theLetter);
    // add class on span
    span.className = 'letter-box';
    // append span to the letters container
    lettersContainer.appendChild(span);
});

// opject of words + categories
const words = {
    programming: ['php','javascript','go','scala','fortran','r','mysql','python'],
    movies: ['prestige','inception','parasite','interstellar','whiplash','memento','coco','up'],
    people: ['albert einstien','hitchcock','alexander','cleopatra','mahatma ghandi'],
    countries: ['syria','palestine','yemen','egypt','bahrain','qatar']
}
// get random property
let allKeys = Object.keys(words);
// random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// category
let randomPropName = allKeys[randomPropNumber];
// category words
let randomPropValue = words[randomPropName];
// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
// the chosen word
let randomValueValue = randomPropValue[randomValueNumber];
// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");
// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);
// increase success counter

let successCounter = 0;
// create spans depend on word
lettersAndSpace.forEach(letter => {
    // create empty span
    let emptySpan = document.createElement("span");
    // if letter is space
    if (letter === ' ') {
        // add class to the span
        emptySpan.className = 'with-space';
    }
    // append spans to the the lettrs guess container
    lettersGuessContainer.appendChild(emptySpan);
});
// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// set wrong attempts
let wrongAttempts = 0;
//select the draw element
let theDraw = document.querySelector(".hangman-draw");
// handle clicking on letters
document.addEventListener("click",(e)=>{
    // set the chose status
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        // get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // the chosen word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        // console.log(lettersAndSpace); 

        theChosenWord.forEach((wordLetter, wordIndex) =>{
            // if the clicked letter = one of the chosen word letter
            if (theClickedLetter == wordLetter) {
                // set status to correct
                theStatus = true;
                // loop on all guess spans
                guessSpans.forEach((span, spanIndex) =>{
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClickedLetter;
                        // increase success counter
                        successCounter++;
                    }
                });
            }
        });
        // outside loop
        // if letter is wrong
        if (theStatus !== true) {
            // increase the wrong attempts
            wrongAttempts++;
            // add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // play fail sound
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame(`Game Over !, The Word Is ${randomValue}.`);
            }
        } else {
            // play success sound
            document.getElementById("success").play();
            if (successCounter === lettersAndSpace.length) {
                endGame(`You Win , You Made ${wrongAttempts} Wrong Attempts.`);
            }
        }
    }
});
// end game function
function endGame(txt) {
    lettersContainer.classList.add("finished");
    // create popup div
    let div = document.createElement("div");
    // create text 
    let divText = document.createTextNode(txt);
    // append text to div
    div.appendChild(divText);
    // add class on div
    div.className = 'popup';
    // append to the body
    document.body.appendChild(div);
}
