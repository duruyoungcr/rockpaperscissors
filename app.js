//variable declarations
let userScore = 0;
let compScore = 0;
let compChoice = 0;
let scores = {};
const userSpan = document.getElementById("user-score");
const compSpan = document.getElementById("computer-score");
const choices = document.getElementById("choices");
const result = document.getElementById("result-text");
const reset = document.getElementById("reset");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

//choice logic
choices.addEventListener("click", function (event) {
  let id = event.target.dataset.id;
  let userChoice = Number(id);
  compChoice = Math.floor(Math.random() * 3);
  //draw
  if (compChoice === userChoice) {
    result.className = "result-text";
    result.innerText = "Draw !!!!";
  }
  //computer choose rock & user chooses paper
  else if (compChoice == 0 && userChoice == 1) {
    userScore++;
    result.className = "result-text green";
    result.innerText = "Paper covers Rock, You win !!!";
    updateScores(userScore, compScore);
    save(userScore, compScore);
    Storage.saveScores(scores);
    paper.className = "choice green-glow";
    setTimeout(() => (paper.className = "choice"), 1000);
  }
  //computer choose rock & user chooses scissors
  else if (compChoice == 0 && userChoice == 2) {
    compScore++;
    result.className = "result-text red";
    result.innerText = "Rock beats Scissors, You lose !!!";
    updateScores(userScore, compScore);
    save(userScore, compScore);
    Storage.saveScores(scores);
    scissors.className = "choice red-glow";
    setTimeout(() => (scissors.className = "choice"), 1000);
  }
  //computer choose paper & user chooses scissors
  else if (compChoice == 1 && userChoice == 2) {
    userScore++;
    result.className = "result-text green";
    result.innerText = "Scissors cuts Paper, You win !!!";
    updateScores(userScore, compScore);
    save(userScore, compScore);
    Storage.saveScores(scores);
    scissors.className = "choice green-glow";
    setTimeout(() => (scissors.className = "choice"), 1000);
  }
  //computer choose paper & user chooses rock
  else if (compChoice == 1 && userChoice == 0) {
    compScore++;
    result.className = "result-text red";
    result.innerText = "Paper covers Rock, You lose !!!!";
    updateScores(userScore, compScore);
    save(userScore, compScore);
    Storage.saveScores(scores);
    rock.className = "choice red-glow";
    setTimeout(() => (rock.className = "choice"), 1000);
  }
  //computer choose scissors & user chooses rock
  else if (compChoice == 2 && userChoice == 0) {
    userScore++;
    result.className = "result-text green";
    result.innerText = "Rock beats Scissors, You win !!!!";
    updateScores(userScore, compScore);
    save(userScore, compScore);
    Storage.saveScores(scores);
    rock.className = "choice green-glow";
    setTimeout(() => (rock.className = "choice"), 1000);
  }
  //computer choose scissors & user chooses paper
  else if (compChoice == 2 && userChoice == 1) {
    compScore++;
    result.className = "result-text red";
    result.innerText = "Scissors cuts Paper, You lose !!!";
    updateScores(userScore, compScore);
    save(userScore, compScore);
    Storage.saveScores(scores);
    paper.className = "choice red-glow";
    setTimeout(() => (paper.className = "choice"), 1000);
  }
});
//update scores
function updateScores(userScore, compScore) {
  userSpan.innerText = userScore;
  compSpan.innerText = compScore;
}
//save scores
function save(userScore, compScore) {
  scores = {
    user: userScore,
    computer: compScore,
  };
}
//set up
function setUp() {
  if (localStorage.getItem("scores")) {
    scores = Storage.getScores();
    userScore = scores.user;
    compScore = scores.computer;
    updateScores(userScore, compScore);
  } else {
    updateScores(0, 0);
  }
}
//reset scores
function resetScores() {
  scores = Storage.getScores();
  scores.user = 0;
  scores.computer = 0;
  userScore = scores.user;
  compScore = scores.computer;
  Storage.saveScores(scores);
  updateScores(userScore, compScore);
  result.innerText = "";
}
//local Storage
class Storage {
  static saveScores(scores) {
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  static getScores() {
    return localStorage.getItem("scores")
      ? JSON.parse(localStorage.getItem("scores"))
      : {};
  }
}
//loading
document.addEventListener("DOMContentLoaded", () => setUp());
