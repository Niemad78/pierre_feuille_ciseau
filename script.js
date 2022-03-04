const counter = document.getElementById("counter");
const btnStart = document.getElementById("start");
const containerHands = document.getElementById("containerHands")
const canvas = document.getElementById("canvas");
const playerScore = document.getElementById("playerScore");
const botScore = document.getElementById("botScore");
const endScreen = document.getElementById("endScreen");

let timerId;
let secs = 6;
let bot;
let player;
let botSco = 0;
let playerSco = 0;

const arrayImg = ["./assets/pierre.png", "./assets/feuille.png", "./assets/ciseaux.png"]

function reset() {
  btnStart.classList.replace("displayNone", "btnStart");
  secs = 6;
  player = undefined;
};

function resultDisplay() {
  playerScore.innerHTML = playerSco;
  botScore.innerHTML = botSco;
};

function getResult() {
  if (bot === player) {
    endScreen.innerHTML = "match nul";
    console.log(player)
    reset();
  }
  if (bot === 0 && player === 1 || bot === 1 && player === 2 || bot === 2 && player === 0) {
    endScreen.innerHTML = "joueur gagne";
    playerSco++;
    console.log(player)
    reset();
    resultDisplay();
  }
  if (player === 0 && bot === 1 || player === 1 && bot === 2 || player === 2 && bot === 0) {
    endScreen.innerHTML = "robot gagne";
    botSco++;
    console.log(player)
    reset();
    resultDisplay();
  }
}

function resultBot() {
  let result = new Image();
  let resultPlayer = new Image();
  const randomId = Math.floor(Math.random() * 3);
  bot = randomId;
  result.src = arrayImg[randomId];
  resultPlayer.src = arrayImg[player];
  result.classList.add("resultHands");
  resultPlayer.classList.add("resultHands");
  if (player !== undefined) {
    canvas.appendChild(resultPlayer);
    canvas.appendChild(result);
    getResult();
  } else {
    reset();
  }
};

function timer() {
  secs--;
  counter.classList.replace("displayNone", "counter");
  counter.innerHTML = secs;
  if (secs > 0) {
    timerId = setTimeout(timer, 1000)
  }
  if (secs === 0) {
    counter.classList.replace("counter", "displayNone");
    containerHands.classList.replace("containerHands", "displayNone");
    resultBot();
  }
};

function countdown() {
  timer();
};

function start() {
  endScreen.innerHTML = "";
  btnStart.classList.replace("btnStart", "displayNone");
  containerHands.classList.replace("displayNone", "containerHands");
  canvas.classList.add("displayNone")
  timerId = setTimeout(countdown, 100);
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
};

function playerChoice(id) {
  player = id;
}