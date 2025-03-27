const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = "RIGHT";
let nextDirection = "RIGHT";
let gameInterval ;

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawSquare(segment.x, segment.y, "blue"));
}

function generateFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
        y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    } while (snake.some(segment => segment.x === x && segment.y === y));
    return { x, y };
}

function drawFood() {
    drawSquare(food.x, food.y, "purple");
}

function moveSnake() {
    let head = { ...snake[0] };
    switch (nextDirection) {
        case "UP": head.y -= gridSize; break;
        case "DOWN": head.y += gridSize; break;
        case "LEFT": head.x -= gridSize; break;
        case "RIGHT": head.x += gridSize; break;
    }
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert("Game Over!");
        return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
    direction = nextDirection;
}

function updateGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    moveSnake();
    drawSnake();
    drawFood();
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") nextDirection = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") nextDirection = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") nextDirection = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") nextDirection = "RIGHT";
});

gameInterval = setInterval(updateGame, 300 );