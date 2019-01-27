

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame)

function startGame() {
  gameOver = false;
  liveCounter = 0;
  points = 0;
  for (var i = 0; i < liveArr.length; i++) {
    liveArr[i].src = aliveGoat
  }
  animate();
  document.getElementById('startDiv').style.display = 'none';
}

let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

window.addEventListener('keydown', moveGoat, false);

let bigRedButton = document.getElementById('bigRedButton');
bigRedButton.addEventListener('click', turnGravityOff);

let gravity = true;

let staticGoatsArr =[];
let goat;

let audio = new Audio('/assets/goatscream.mp3');
let goatsBleating = new Audio('/assets/goatsbleating.mp3');

let branches = [
  {x1: 650, x2: 775, y: 150},
  {x1: 790, x2: 925, y: 250},
  {x1: 475, x2: 600, y: 375},
  {x1: 675, x2: 800, y: 425},
  {x1: 750, x2: 890, y: 550},
]

// pairs of x,y coordinates, function that generates the branches and also defines the areas where the goat stops

let points = 0;
let pointsPerGoat = 20;
let pointDiv = document.getElementById('points');

let liveCounter = 0;

let aliveGoat = '/assets/goat-green.png';
let deadGoat = '/assets/goat-red.png';

let live1 = document.getElementById('live1');
let live2 = document.getElementById('live2');
let live3 = document.getElementById('live3');

live1.src = aliveGoat;
live2.src = aliveGoat;
live3.src = aliveGoat;

let liveArr = [live1, live2, live3];

let gameOver = false;
let newGame = false;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
  console.log('running random Int');
}

function randomFloatFromRange(min, max) {
    return Math.random() * (max - min + 1) + min
}

let goatWidth = 100;
let startingX;
let startingY = -50;

function generateGoatStartingCoords(min, max){
  startingX = randomIntFromRange(0 + goatWidth, canvas.width - goatWidth);
  console.log('starting X', startingX);
}

let splodeCounter = 0;

let splodeImg = new Image(100, 100);
splodeImg.src = '/assets/goatsplode.png';
canvas.appendChild(splodeImg);

let splode;
let displaySplode = false;
// console.log('display splode', displaySplode);

function Splode (x){
  // console.log('running Splode');
  this.x = x;
  this.alpha = 0;
  this.da = 0.1;
  this.active = false;
  this.height = 100;
  this.width = 100;

  this.draw = function(){
    if (splodeCounter < 35) {
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(splodeImg, this.x, (canvas.height - 55), 100, 100);
    } else {
      displaySplode = false;
    }
  }

  this.update = function(){
    splodeCounter++;
    this.alpha += this.da;
    this.draw();
  }
}

let goatImg = new Image(100, 100);
goatImg.src = '/assets/goats/goat.png';
canvas.appendChild(goatImg);

let TO_RADIANS = Math.PI/180;
let degrees = 10;

function Goat (x, y, dx, dy, height, width) {
  // console.log('running Goat');
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.height = height;
  this.width = width;
  this.dxgravity = randomFloatFromRange(-1.5,1.5);
  this.dygravity = -randomFloatFromRange(0.5,1);

  this.draw = function(){
    // console.log('drawing');
    // let goatX = this.x;
    // let goatY = this.y;
    // let goatH = 100;
    // let goatW = 100;

    ctx.globalAlpha = 1;
    if (gravity == false){
      ctx.save();
      ctx.translate((this.x + 50), (this.y + 50));
      ctx.rotate(degrees * TO_RADIANS);
      ctx.drawImage(goatImg, -50, -50, 100, 100);
      ctx.restore();
      degrees+=0.5;
    } else {
      ctx.drawImage(goatImg, this.x, this.y, this.height, this.width);
    }
  }

  this.update = function(){
    console.log('this.dy:', this.dy);
    let hit = branches.filter(goat => this.x < (goat.x2) && this.x > (goat.x1) && this.y >  (goat.y-goatWidth) && this.y < (goat.y+16))
    if(gravity == true){
      if(hit.length > 0){
        this.y = hit[0].y - goatWidth;
          staticGoatsArr.push(this);
          // console.log('our static goats', staticGoatsArr.length);
          generateGoatStartingCoords();
          if (staticGoatsArr.length % 5 === 0) {
            this.dy *= 1.25;
            goat = new Goat (startingX, startingY, 0, this.dy, 100, 100);
          } else {
            goat = new Goat (startingX, startingY, 0, this.dy, 100, 100);
          }
          points += pointsPerGoat;
          pointDiv.innerHTML = points;

      } else {
        this.y += this.dy;
      }

      if(this.y - this.height > canvas.height){
        splode = new Splode(this.x, -10, 100, 100);
        splodeCounter = 0;
        displaySplode = true;

        generateGoatStartingCoords();

        goat = new Goat (startingX, startingY, 0, this.dy, 100, 100);
        goat.x = startingX;
        goat.y = startingY;
        audio.play();
        if (liveCounter < 3){
          liveCounter ++;
          liveArr[liveCounter-1].src = deadGoat;
          if (liveCounter === 3) {
            gameOver = true;
            newGame = true;
            staticGoatsArr = [];
            liveCounter = 0;
            live1.src = aliveGoat;
            live2.src = aliveGoat;
            live3.src = aliveGoat;
            document.getElementById('startDiv').style.display = 'flex';
          }
        }
      }
    } else {
      this.x += this.dxgravity;
      this.y += this.dygravity;

    }

    this.draw();
  }
}

function moveGoat(e){
  switch(e.keyCode){
    case 39:
      console.log('move RIGHT, goat!');
      goat.x += 15;
      // goat.dy = 1;
      break;
    case 37:
      console.log('move LEFT, goat!!');
      goat.x -= 15;
      // goat.dy = 1;
      break;
    case 40:
      console.log('move down, goat!');
      goat.y += 15;
      break;
  }
  e.preventDefault();
}

function turnGravityOff(){
  if (gravity == true){
    gravity = false;
    audio.currentTime = 5;
    goatsBleating.play();

    setTimeout(function(){
      goatsBleating.pause();
    }, 6000);
  }
}

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i=0; i<branches.length; i++) {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(branches[i].x1, branches[i].y);
    ctx.lineTo(branches[i].x2, branches[i].y);
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  for(var i = 0; i < staticGoatsArr.length; i++){
    if (gravity == true){
      staticGoatsArr[i].draw();
    } else {
      staticGoatsArr[i].update();
    }
  }

  if(!gameOver) {
    goat.update();
  }

  if (displaySplode == true){
    splode.update();
  }
}

generateGoatStartingCoords();
goat = new Goat (startingX, startingY, 0, 4, goatWidth, goatWidth);
console.log('static goats', staticGoatsArr.length);
// animate();


