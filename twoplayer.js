//possibilities: 
// check word against dictionary api to see if it's real
// draw man


const playButton = document.querySelector('.playButton');
const spacesContainer = document.querySelector('.spaces-container');
const heading = document.querySelector('#info-header');
const inputBox = document.querySelector('.word-input');
const alphabetBar = document.querySelector('.alphabet')
const playAgainButton = document.querySelector('.playAgain');
const mainMenuButton = document.querySelector('.main-menu');
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let word = [];
let correctlyGuessedLetters = [];
let numberGuesses = 0;

// add event listeners
playButton.addEventListener('click', checkWord);
inputBox.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        playButton.click();
    }
});

function checkWord() {
    const wordInput = document.querySelector('.word-input').value.toLowerCase();
    console.log(wordInput);
    
// fetch the right API
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordInput}?key=6042af0f-dbfe-4420-8b9a-03966c7bf2f7`)
       .then((response) => response.json())
       .then((response) => {
            if(typeof response[0] === 'string') {
                heading.innerText = `hey! ${wordInput} ain\'t a word!`
            } else {
                playGame();
            }
        });
}


// set game up
function playGame() {

    const wordInput = document.querySelector('.word-input').value.toLowerCase();
    const wordLetters = [];
    console.log(wordInput);
    
    for (i = 0; i < wordInput.length; i++) {
        wordLetters[i] = wordInput.substr(i, 1);
        word[i] = wordInput.substr(i, 1);
        let div = document.createElement('div');
        div.setAttribute('class', 'space')
        div.setAttribute('id', `letter${i}`)
        spacesContainer.appendChild(div);
    }
    console.log(wordLetters);
    heading.innerText = 'player 2: guess!';
    document.querySelector('.word-input').value = '';
    makeAlphabet();
    inputBox.style.display = 'none';
    playButton.style.display = 'none';
}


function makeAlphabet() {
    for (let i = 26; i <= 51; i++) {
        let letterButton = document.createElement('a');
        letterButton.innerText = `${alphabet[i]}`;
        letterButton.setAttribute('class', `${alphabet[i]}`);
        letterButton.classList.add('letter');
        letterButton.setAttribute('href', '#');
        letterButton.addEventListener('click', guessLetter);
        alphabetBar.appendChild(letterButton);
    }
}


function guessLetter() {
    window.clearTimeout(timer);
    numberGuesses += 1;
    const wordLetters = [];
    let isGuessCorrect = '';
    let characterCorrect = [];
    for (i = 0; i < word.length; i++) {
        wordLetters.push(word[i]);
    }
    for (i = 0; i <= wordLetters.length; i++) {
        if (event.target.innerText === wordLetters[i]) {
            isGuessCorrect = true;
            characterCorrect.push(i);
            correctlyGuessedLetters.push(wordLetters[i]);
            word[i] = '0';
            console.log(characterCorrect);
            
        }
    }
    if (isGuessCorrect === true) {
        for (let i=0; i < characterCorrect.length; i++) {        
            document.querySelector(`#letter${characterCorrect[i]}`).innerText = wordLetters[characterCorrect[i]];
            heading.innerText = 'nice one!';
        }
        // this code to remind people to guess isn't working idk why
        // if (correctlyGuessedLetters.length < word.length) {
        //   setTimeout(putHeaderBack, 4000);
        // }
        console.log('correct');
        checkWinner();
    } else {
        guessWrong();
        console.log('WRONG');
    }
}



function checkWinner() {
    if (correctlyGuessedLetters.length === word.length) {
        heading.innerText = 'PLAYER 2 WINS';
        heading.fontSize = '120px';
        gameOver();
    }
}

var timer;

function guessWrong() {
    if (numberGuesses <= 5) {
        heading.innerText = 'wrong!';
        timer = setTimeout(putHeaderBack, 1100);
    }
    else if (numberGuesses == 6) {
        window.clearTimeout(timer);
        heading.innerText = 'WRONG! PLAYER 1 WINS';
        gameOver();
    }
}

function putHeaderBack() {
    heading.innerText = 'guess again!';
}

function gameOver() {
    console.log('game over!');
    alphabetBar.style.display = 'none';
    spacesContainer.style.display = 'none';
    setTimeout(playAgain, 3000);
}

function playAgain() {
    playAgainButton.style.display = 'inline';
    mainMenuButton.style.display = 'inline';
    heading.innerText = '...play again?';
}
