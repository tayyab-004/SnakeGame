// Constants & Variables of Game
let inputDir = {x: 0, y:0};
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let lastPaintTime = 0;
let speed = 5;
let snakeArr = [
    { x:13, y:15 }
];
let food = { x:6, y:7 };
let score = 0;

// Functions of Game
function main(currTime) {
    window.requestAnimationFrame(main);
    if((currTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currTime;
    gameEngine();
}

function isCollied(snake) {
    // If snake bump into its body
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If snake bump into the wall
    if(snake[0].x >=18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine() {
    // Updating the snake array and food
    if(isCollied(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x:0, y:0 };
        alert("Game over, Press any key to Play Again!");
        snakeArr = [{ x:13, y:15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: "+ highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, 
        y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()),
        y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);    
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic Here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: "+ highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=> {
    inputDir = { x:0, y:1 }     // start the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});