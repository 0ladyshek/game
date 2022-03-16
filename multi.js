var BALL = {
    color: "#FF6E40",
    x:  450,
    y: 80, 
    size: 20,
    directionY: 0,
    directionX: -5,
}

var GAME = {
    width: 500,
    height: 500,
    background: "#F5F0E1",
    pause: false,
}

var PLAYER = {
    color: "#1E3D59",
    sizeX: 20,
    sizeY: 100,
    X: 30,
    Y: 50,
    directionY: 0,
    score: 0,

}

var COMPUTER = {
    color: "#1E3D59",
    sizeX: 20,
    sizeY: 90,
    X: 470,
    Y: 30,
    directionY: 5,
    score: 0,
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawBall(BALL);
    drawPlayer(PLAYER);
    drawComputer(COMPUTER);
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawBall(ball) {
    canvasContext.fillStyle = ball.color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.size / 2, 0, 2 * Math.PI);
    canvasContext.fill();
}

function updateBall(ball) {
    ball.x += ball.directionX;
    ball.y += ball.directionY;
}

function checkBall(ball) {
    if ((ball.x >= GAME.height - ball.size / 2) || (ball.x <= ball.size / 2)) {
        ball.y = 250;
        ball.x = 250;
        ball.directionX = 3;
        ball.directionY = 5;
        GAME.score = 0;
        GAME.pause = true
        return
    }
    if ((ball.y >= GAME.width - ball.size / 2) || (ball.y <= ball.size / 2)) {
        console.log(ball.x)
        ball.directionY = -ball.directionY;
    }
    if ((ball.x >= GAME.height - ball.size / 2) || (ball.x <= ball.size / 2)) {
        console.log(ball.x)
        ball.directionX = -ball.directionX;
    }
}

function drawPlayer(rocket) {
    canvasContext.fillStyle = rocket.color;
    canvasContext.fillRect(rocket.X, rocket.Y, rocket.sizeX, rocket.sizeY);
}

function drawComputer(rocket) {
    canvasContext.fillStyle = rocket.color;
    canvasContext.fillRect(rocket.X, rocket.Y, rocket.sizeX, rocket.sizeY);
}

function checkColision(ball, rocket, isPlayer) {
    var up = ball.y >= rocket.Y + ball.size / 2
    var down = ball.y <= rocket.X + rocket.sizeY + ball.size / 2
    if (isPlayer) {
        var right = ball.x - ball.size / 2 <= rocket.X + rocket.sizeX
        var left = ball.x >= rocket.X + ball.size / 2  
    } else {
        var right = ball.x <= rocket.X + rocket.sizeY - ball.size / 2
        var left = ball.x >= rocket.X - ball.size / 2  
    }
    return up && down && right && left;
}   

function updatePlayer(rocket) {
    if ((rocket.Y + rocket.sizeY >= GAME.height) || (rocket.Y + rocket.directionY <= 0)) {
        rocket.directionY = -rocket.directionY;
    }
    rocket.Y += rocket.directionY;
}

function updateComputer(ball, computer) {
    // if ((ball.y >= computer.y) && (ball.y <= computer.y)) {
    //     computer.directionY = 0
    //     return
    // }
    // if (ball.y > computer.y) {computer.directionY = -computer.directionY}
    // if (ball.y < computer.y) {computer.directionY = -computer.directionY}
    computer.Y = ball.y - ball.size / 2
    console.log(computer.Y)
}

function drawPause() {
    document.getElementById("title").innerHTML = "PAUSE"
}

function moveMouse(event) {
    PLAYER.Y = event.clientY
    PLAYER.directionY = 0
    if (event.clientY >= GAME.height - PLAYER.sizeY) {PLAYER.Y = GAME.height - PLAYER.sizeY}
}

function checkKeyboard(event) {
    if ((event.code === "Escape") || (event.code === 'Enter')) {
        GAME.pause = !GAME.pause;
    } 
    if (event.code === 'ArrowUp') {
        PLAYER.directionY = -5;
    }
    if (event.code === 'ArrowDown') {
        PLAYER.directionY = 5
    }
}

function checkMouse(event) {
    if (event.button == 1) {
        GAME.pause = !GAME.pause;
    }
}

function initListenerSingle() {
    canvas.addEventListener('mousemove', moveMouse);
    document.addEventListener('keydown', checkKeyboard);
    document.addEventListener("mousedown", checkMouse)
}

function playMulti() {
    if (!GAME.pause) {
        drawFrame(); 
        updatePlayer(PLAYER);
        updateComputer(BALL, COMPUTER);
        if(checkColision(BALL, PLAYER, true) || checkColision(BALL, COMPUTER, false)) {
            BALL.directionY = -BALL.directionY - Math.random() * 0.5
            BALL.directionX = -BALL.directionX - Math.random() * 0.5
            //rocket.score++;
        };
        checkBall(BALL);
        updateBall(BALL);
    } else {
        drawPause();
    }
    requestAnimationFrame(playMulti);
}

function initMulti() {
    initListenerSingle();
    playMulti(mode);
}