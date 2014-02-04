var canv = document.getElementsByTagName("canvas")[0];
var width = canv.width = 400;
var height = canv.height = 300;
var paddleWidth = 50;
var paddleHeight = 8;
var paddleSpeed = 7;
var ballSize = 8;
var paddleY = height - paddleHeight / 2 - 5;
var FPS = 20;
var pong = canv.getContext("2d");
var paddleX, ballX, ballY, ballDX, ballDY, interval, score;
init();

function init() {
 paddleX = (width - paddleWidth) / 2;
 ballX = (width - ballSize) / 2;
 ballY = ballSize + 5;
 ballDX = Math.random() * 2 - 1;
 ballDX += (ballDX > 0)? 0.5 : -0.5;
 ballDY = 8;
 document.getElementsByTagName('input')[0].value = "Start";
 score = 0;
 document.getElementById('scoreanzeige').firstChild.nodeValue = 'Drücken Sie Return, um das Spiel zu starten!';
 draw();
 document.forms[0].elements[0].focus();
 document.forms[0].onsubmit = startGame;
}

function draw() {
 pong.beginPath();
 pong.moveTo(paddleX, paddleY);
 pong.lineTo(paddleX + paddleWidth, paddleY);
 pong.strokeStyle = "black";
 pong.lineWidth = paddleHeight;
 pong.stroke();
 pong.closePath();

 pong.beginPath();
 pong.arc(ballX, ballY, ballSize, 0, 2*Math.PI, true);
 pong.lineWidth = 1;
 pong.fillStyle = '#ff6060';
 pong.fill();
 pong.stroke();
 pong.closePath();
}

function startGame() {
 if (navigator.appName == 'Opera') document.onkeypress = movePaddle;
 else document.onkeydown = movePaddle;
 document.getElementById('scoreanzeige').firstChild.nodeValue = 'Spiel gestartet';
 interval = setInterval("reDraw()", 1000/FPS);
 document.forms[0].onsubmit = stopGame;
 document.getElementsByTagName('input')[0].value = "Stop";
}

function reDraw() {
 pong.clearRect(0, 0, width, height);
 ballX += ballDX;
 if (ballX < ballSize || ballX >= width - ballSize) {
  ballDX *= -1;
  ballX += 2 * ballDX;
 }
 ballY += ballDY;
 if (ballY < ballSize) {
  ballDY *= -1;
  ballY += 2 * ballDY;
 }
 if (ballY > paddleY - ballSize - paddleHeight/2
  && ballY < height - 5
  && ballX >= paddleX
  && ballX <= paddleX + paddleWidth) {
  ballDY *= -1;
  ballY += 2 * ballDY;
  ballDX += (ballX - paddleX) / 7;
  document.getElementById('scoreanzeige').firstChild.nodeValue = 'Punkte: ' + ++score;
 }
 draw();
 if (ballY > height) stopGame();
}

function movePaddle(event) {
 if (event.keyCode == 37) {
  if (paddleX > 0) paddleX -= paddleSpeed;
 } else if (event.keyCode == 39) {
  if (paddleX + paddleWidth < width) paddleX += paddleSpeed;
 }
}

function stopGame() {
 window.clearInterval(interval);
 canv.width = width;
 init();
}
