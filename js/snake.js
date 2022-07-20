import { getUser } from "./login.js";
let user;
const canvas = document.querySelector("#canvas");
const canvasDiv = document.querySelector(".canvas");
const resetBtn = document.querySelector("#game-start");
let responseBtns = document.querySelectorAll(".arrow-event");
const ctx = canvas.getContext("2d");

// snake part
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// game variable
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//game loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    document.body.style.overflowY = "scroll";
    return;
  } else {
    document.addEventListener("keydown", keyDown);
    document.addEventListener("click", function () {
      document.body.style.overflowY = "scroll";
    });
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === canvas.height / 10 / 2) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === canvas.height / 10 / 2) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " orange");
    ctx.fillStyle = gradient;
    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);



    // set score
    user = getUser;
    let scoreBord = JSON.parse(localStorage.getItem("score")) || [];

    let scoreUser;

    let nameScoreBord = scoreBord.map((obj) => obj.userName);

    if (nameScoreBord.includes(user.userName)) {
      scoreBord.forEach((obj) => {
        if (obj.score < score && obj.userName == user.userName) {
          obj.score = score;
        }
      });
    }
    if (!nameScoreBord.includes(user.userName)) {
      scoreUser = { userName: user.userName, score: score };
      scoreBord.push(scoreUser);
    }

    localStorage.setItem("score", JSON.stringify(scoreBord));

    // first player
    if (scoreBord.length == 0) {
      scoreUser = { userName: user.userName, score: score };
      scoreBord.push(scoreUser);
      localStorage.setItem("score", JSON.stringify(scoreBord));
    }
// update 
    headX = 10;
    headY = 10;
    appleX = 5;
    appleY = 5;
    inputsXVelocity = 0;
    inputsYVelocity = 0;
    xVelocity = 0;
    yVelocity = 0;
    score = 0;
    speed = 7;
    tileCount = 20;
    tileSize = canvas.width / tileCount - 2;
    snakeParts = [];
    tailLength = 2;

    resetBtn.style.display = "block";
  }
  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score: " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "blue";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    ctx.beginPath();
  }
  //put an item at the end of the list next to the head
  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.beginPath();
  ctx.arc(appleX * tileCount, appleY * tileCount, tileSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    speed++;
  }
}

function keyDown(e) {
  //up
  if (e.keyCode == 38 || e.keyCode == 87) {
    //87 is w
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (e.keyCode == 40 || e.keyCode == 83) {
    // 83 is s
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (e.keyCode == 37 || e.keyCode == 65) {
    // 65 is a
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (e.keyCode == 39 || e.keyCode == 68) {
    //68 is d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
  document.body.style.overflow = "hidden";
}

resetBtn.addEventListener("click", function () {
  drawGame();
  resetBtn.style.display = "none";
});

responseBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.id) {
      case "arrow-up":
        if (inputsYVelocity == 1) return;
        inputsYVelocity = -1;
        inputsXVelocity = 0;
        break;
      case "arrow-down":
        if (inputsYVelocity == -1) return;
        inputsYVelocity = 1;
        inputsXVelocity = 0;

        break;
      case "arrow-right":
        if (inputsXVelocity == -1) return;
        inputsYVelocity = 0;
        inputsXVelocity = 1;
        break;
      case "arrow-left":
        if (inputsXVelocity == 1) return;
        inputsYVelocity = 0;
        inputsXVelocity = -1;
        break;
    }
  });
});

export { drawGame };
