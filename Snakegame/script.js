const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0;
let gameOver = false;
let paused = false;
let snake = [];
let food = {};
let d = "RIGHT";
let playgame;

function init() {
  score = 0;
  gameOver = false;
  paused = false;
  snake = [];
  snake[0] = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
  };
  food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
  };
  d = "RIGHT";
  if (playgame) clearInterval(playgame);
  playgame = setInterval(draw, 100);
}

init();

document.onkeydown = function (event) {
  const key = event.keyCode;
  if (key === 32) {
    // Space = pause
    paused = !paused;

    return;
  }
  if (key === 37 && d !== "RIGHT") d = "LEFT";
  else if (key === 38 && d !== "DOWN") d = "UP";
  else if (key === 39 && d !== "LEFT") d = "RIGHT";
  else if (key === 40 && d !== "UP") d = "DOWN";
};

function collision(head, body) {
  for (let i = 1; i < body.length; i++) {
    if (head.x === body[i].x && head.y === body[i].y) return true;
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2 - 90, canvas.height / 2 - 20);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(
      "Score: " + score,
      canvas.width / 2 - 40,
      canvas.height / 2 + 10,
    );

    ctx.fillStyle = "rgb(255, 166, 0)";
    ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 + 30, 120, 30);
    ctx.fillStyle = "aqua";
    ctx.font = "18px Arial";
    ctx.fillText("TRY AGAIN", canvas.width / 2 - 45, canvas.height / 2 + 52);
    return;
  }

  if (paused) {
    ctx.fillStyle = "yellow";
    ctx.font = "25px Arial";
    ctx.fillText("PAUSED", canvas.width / 2 - 50, canvas.height / 2);
    return;
  }

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.strokeStyle = "yellow";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, scale, scale);

  // Move snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d === "LEFT") snakeX -= scale;
  if (d === "UP") snakeY -= scale;
  if (d === "RIGHT") snakeX += scale;
  if (d === "DOWN") snakeY += scale;

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    collision(newHead, snake) ||
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height
  ) {
    gameOver = true;
  }

  if (!gameOver) snake.unshift(newHead);

  // Display score
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Try again click
canvas.addEventListener("click", function (e) {
  if (!gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (
    x >= canvas.width / 2 - 60 &&
    x <= canvas.width / 2 + 60 &&
    y >= canvas.height / 2 + 30 &&
    y <= canvas.height / 2 + 60
  ) {
    init();
  }
});
