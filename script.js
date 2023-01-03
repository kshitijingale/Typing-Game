const settingBtn = document.getElementById('settings-btn');
const difficultySelect = document.getElementById('difficulty');
const word = document.getElementById('word');
const inputText = document.getElementById('input-text');
const time = document.getElementById('time');
const score = document.getElementById('score');
const settingForm = document.querySelector('.settings-form');
const endgameContainer = document.getElementById('endgame-container');
const settingContainer = document.querySelector('.settings-container');

// Init Word
let randomWord;

// Init Score
let scoreValue = 0;

// Init time
let timeValue = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = difficulty;

// List
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
]

const timeInterval = setInterval(updateTime, 1000);

// Focus on input from start
inputText.focus();

function updateTime() {
    timeValue--;
    time.innerHTML = timeValue + 's';

    if (timeValue === 0) {
        clearInterval(timeInterval);

        gameOver();
    }
}

function updateScore() {
    scoreValue++;
    score.innerText = scoreValue;
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

// Add random word to DOM
function addWord() {
    word.innerText = getRandomWord();
}
addWord();

function gameOver() {
    endgameContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${scoreValue}</p>
    <button onclick="location.reload()">Reload</button>
  `;

    endgameContainer.style.display = 'flex';
}

// Event Listeners

inputText.addEventListener('input', (e) => {
    if (word.innerText === e.target.value) {
        addWord();
        updateScore();

        if (difficulty === 'hard') {
            timeValue += 2;
        } else if (difficulty === 'medium') {
            timeValue += 3;
        } else {
            timeValue += 5;
        }
        inputText.value = '';
    }
})

settingForm.addEventListener('change', e => {
    difficulty = e.target.value;
    difficultySelect.value = difficulty;
    localStorage.setItem('difficulty', difficulty);
})

settingBtn.addEventListener('click', () => {
    settingContainer.classList.toggle('hide');
})