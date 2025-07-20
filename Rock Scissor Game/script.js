let playerScore = 0;
let computerScore = 0;

const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const playerChoiceElement = document.getElementById('playerChoice');
const computerChoiceElement = document.getElementById('computerChoice');
const resultElement = document.getElementById('result');

const choices = {
    rock: '🗿',
    paper: '📄',
    scissors: '✂️'
};

window.onload = function() {
    loadScores();
};

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    
    playerChoiceElement.textContent = choices[playerChoice];
    computerChoiceElement.textContent = choices[computerChoice];
    
    const result = getWinner(playerChoice, computerChoice);
    
    updateScore(result);
    
    showResult(result, playerChoice, computerChoice);
    
    saveScores();
}

function getComputerChoice() {
    const choiceArray = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choiceArray[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    }
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

function showResult(result, playerChoice, computerChoice) {
    resultElement.className = '';
    
    if (result === 'win') {
        resultElement.textContent = `You Win! ${choices[playerChoice]} beats ${choices[computerChoice]}`;
        resultElement.classList.add('win');
    } else if (result === 'lose') {
        resultElement.textContent = `You Lose! ${choices[computerChoice]} beats ${choices[playerChoice]}`;
        resultElement.classList.add('lose');
    } else {
        resultElement.textContent = `It's a Draw! Both chose ${choices[playerChoice]}`;
        resultElement.classList.add('draw');
    }
}

function resetGame() {
    if (confirm('Reset the game? This will clear all scores.')) {
        playerScore = 0;
        computerScore = 0;
        playerScoreElement.textContent = '0';
        computerScoreElement.textContent = '0';
        playerChoiceElement.textContent = '?';
        computerChoiceElement.textContent = '?';
        resultElement.textContent = 'Choose your weapon!';
        resultElement.className = '';
        
        localStorage.removeItem('playerScore');
        localStorage.removeItem('computerScore');
    }
}

function saveScores() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

function loadScores() {
    const savedPlayerScore = localStorage.getItem('playerScore');
    const savedComputerScore = localStorage.getItem('computerScore');
    
    if (savedPlayerScore) {
        playerScore = parseInt(savedPlayerScore);
        playerScoreElement.textContent = playerScore;
    }
    
    if (savedComputerScore) {
        computerScore = parseInt(savedComputerScore);
        computerScoreElement.textContent = computerScore;
    }
}