//Background music and sounds used
let bgMusic = document.getElementById('bgMusic');
bgMusic.play();
let audio = new Audio('/assets/goatscream.mp3');
let goatsBleating = new Audio('/assets/goatsbleating.mp3');

//Initial canvas variables decleration
let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

//Big red button Lul
let bigRedButton = document.getElementById('bigRedButton');
bigRedButton.addEventListener('click', turnGravityOff);

//Initial variable declerations
let gravity = true;
let staticGoatsArr =[];
let goat;

//Branch placement coordinates
let branches = [
  {x1: 650, x2: 775, y: 150},
  {x1: 790, x2: 925, y: 250},
  {x1: 475, x2: 600, y: 375},
  {x1: 675, x2: 800, y: 425},
  {x1: 750, x2: 890, y: 525},
]

//Goat selection code
let goats = ['url("/assets/goats/cute-goat.png")', 'url("/assets/goats/cute-goat-1.png")', 'url("/assets/goats/cute-goat-2.png")', 'url("/assets/goats/cute-goat-3.png")',  'url("/assets/goats/cute-goat-4.png")',  'url("/assets/goats/cute-goat-5.png")', 'url("/assets/goats/cute-goat-6.png")', 'url("/assets/goats/cute-goat-7.png")', 'url("/assets/goats/cute-goat-8.png")']

let leftArrow = document.getElementById('leftSelect');
let rightArrow = document.getElementById('rightSelect');
let goatSelects = document.getElementsByClassName('goatImg');

for (let i=0; i<goatSelects.length; i++) {
  goatSelects[i].style.backgroundImage = goats[i];
  goatSelects[i].style.backgroundSize = 'contain';
  goatSelects[i].addEventListener('click', selectThisGoat);
}

leftArrow.addEventListener('click', selectLeft);
rightArrow.addEventListener('click', selectRight);

function selectLeft() {
  if (goatSelects[0].style.backgroundImage === goats[0]) {
  } else {
    for (let i=0; i<goatSelects.length; i++){
      goatSelects[i].style.backgroundImage = goats[goats.indexOf(goatSelects[i].style.backgroundImage) - 1];
      if (goatSelects[i].style.border === '1px solid skyblue') {
        goatSelects[i].style.border = 'none';
      }
    }
  }
}

function selectRight() {
  if (goatSelects[goatSelects.length-1].style.backgroundImage === goats[goats.length-1]) {
  } else {
    for (let i=0; i<goatSelects.length; i++){
      goatSelects[i].style.backgroundImage = goats[goats.indexOf(goatSelects[i].style.backgroundImage) + 1];
      if (goatSelects[i].style.border === '1px solid skyblue') {
        goatSelects[i].style.border = 'none';
      }
    }
  }
}

let goatImg = new Image(100, 100);
goatImg.src = '/assets/goats/cute-goat.png';
canvas.appendChild(goatImg);

function selectThisGoat() {
  for (let i=0; i<goatSelects.length; i++) {
    if (goatSelects[i].style.border === '3px solid rgb(72, 188, 224)') {
      goatSelects[i].style.border = 'none';
    }
  }
  this.style.border = '3px solid rgb(72, 188, 224)'
  let chosenGoat = this.style.backgroundImage.split('');
  chosenGoat.pop();
  chosenGoat.pop();
  chosenGoat.shift();
  chosenGoat.shift();
  chosenGoat.shift();
  chosenGoat.shift();
  chosenGoat.shift();
  chosenGoat.join('')
  goatImg.src = chosenGoat.join('')
}

//Point variable decleration
let highScore = 0;
let points = 0;
let pointsPerGoat = 20;
let pointDiv = document.getElementById('points');

//Score variable decleration
let previousScoreSpan = document.getElementById('previousScore');
let previousScoreContainer = document.getElementById('previousScoreContainer');

//Goat lives variables decleration and creation
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

//New Game variables decleration
let gameOver = false;
let newGame = false;

//Dead explosion variables decleration and creation
let splodeCounter = 0;

let splodeImg = new Image(100, 100);
splodeImg.src = '/assets/goatsplode.png';
canvas.appendChild(splodeImg);

let splode;
let displaySplode = false;

let goatWidth = 100;
let startingX;
let startingY = -50;

//Branch variable decleration and creation
let branchImg = new Image(100, 100);
branchImg.src = '/assets/branch2.png';
canvas.appendChild(branchImg);

// pairs of x,y coordinates, function that generates the branches and also defines the areas where the goat stops
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFloatFromRange(min, max) {
    return Math.random() * (max - min + 1) + min
}

function generateGoatStartingCoords(min, max){
  startingX = randomIntFromRange(175 + goatWidth, canvas.width - goatWidth - 175);
}

//Function that creates explosion of goats who didn't make it to a branch
function Splode (x){
  this.x = x;
  this.alpha = 0;
  this.da = 0.1;
  this.active = false;
  this.height = 150;
  this.width = 150;

  this.draw = function(){
    if (splodeCounter < 45) {
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(splodeImg, this.x - 45, (canvas.height - 70), 150, 150);
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

//Goat creation, branch hit detection, and update to generate new goat function
window.addEventListener('keydown', moveGoat, false);

function Goat (x, y, dx, dy, height, width) {
  let TO_RADIANS = Math.PI/180;
  let degrees = 10;

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.height = height;
  this.width = width;
  this.dxgravity = randomFloatFromRange(-1.5,1.5);
  this.dygravity = -randomFloatFromRange(0.5,1);

  this.draw = function(){

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
    let newdy = this.dy;

    let hit = branches.filter(goat => (this.x) < (goat.x2) && (this.x + goatWidth/2) > (goat.x1) && this.y >  (goat.y-goatWidth) && this.y < (goat.y+16))
    if(gravity == true){
      if(hit.length > 0){
        this.y = hit[0].y - goatWidth;
          staticGoatsArr.push(this);
          generateGoatStartingCoords();
          if (staticGoatsArr.length % 5 === 0) {
            if(this.dy === newdy) {
              newdy = this.dy * 1.25;
            } else {
              newdy *= 1.25;
            }
            goat = new Goat (startingX, startingY, 0, newdy, 100, 100);
          } else {
            goat = new Goat (startingX, startingY, 0, newdy, 100, 100);
          }
          points += pointsPerGoat;
          pointDiv.innerHTML = points;

      } else {
        this.y += this.dy;
      }

      if(this.y - this.height > canvas.height){
        if (liveCounter <= 3){
          splode = new Splode(this.x, 0, 100, 100);
          splodeCounter = 0;
          displaySplode = true;
      
          audio.play();

          liveCounter ++;
          liveArr[liveCounter-1].src = deadGoat;
        }
        if (liveCounter === 3) {
          displaySplode = false;
          gameOver = true;
          newGame = true;
          staticGoatsArr = [];
          liveCounter = 0;
          goat = new Goat (startingX, startingY, 0, 4, 100, 100);
          live1.src = aliveGoat;
          live2.src = aliveGoat;
          live3.src = aliveGoat;
          if(!displaySplode) {
            stopAnimation();
          }
        }

        // splode = new Splode(this.x, 0, 100, 100);
        // splodeCounter = 0;
        // displaySplode = true;

        generateGoatStartingCoords();
        goat = new Goat (startingX, startingY, 0, newdy, 100, 100);
        goat.x = startingX;
        goat.y = startingY;
      }
    } else {
      this.x += this.dxgravity;
      this.y += this.dygravity;
    }
    this.draw();
  }
}


//Registering movement of falling goat
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
    bigRedButton.classList.add('disabledButton');
    audio.currentTime = 5;
    goatsBleating.play();

    setTimeout(function(){
      gravity = true;
      goatsBleating.pause();
      gameOver = true;
      newGame = true;
      staticGoatsArr = [];
      liveCounter = 0;
      goat = new Goat (startingX, startingY, 0, 4, 100, 100);
      live1.src = aliveGoat;
      live2.src = aliveGoat;
      live3.src = aliveGoat;
      splodeCounter = 0;
      displaySplode = false;
      stopAnimation();
    }, 6000);
  }
}

//Start game function called when start game button is pressed
let startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame)

function startGame() {
  gameOver = false;
  liveCounter = 0;
  points = 0;
  pointDiv.innerHTML = points;
  for (var i = 0; i < liveArr.length; i++) {
    liveArr[i].src = aliveGoat;
  }

  bigRedButton.classList.add('bigRedButton');
  setTimeout(function(){
      animate();
    }, 2500);
  document.getElementById('startDiv').style.display = 'none';
  document.getElementById('header').classList.remove('startHeader');
}

//requestId is declared as an empty global var so that animate() and stopAnimation() has access to this
var requestId = "";

function stopAnimation(e) {
  cancelAnimationFrame(requestId);
  document.getElementById('header').classList.add('startHeader');
  bigRedButton.classList.remove('bigRedButton');
  bigRedButton.classList.remove('disabledButton');
  previousScoreSpan.innerHTML = points;
  previousScoreContainer.classList.remove('scoreSummaryHidden');
  document.getElementById('startDiv').style.display = 'flex';
  if (points > highScore) {
    highScore = points;
    document.getElementById('highScore').innerHTML = highScore;
  }
  points = 0;
  document.getElementById('points').innerHTML = 0;
}

//Animate function that gets called when start button is pressed
function animate(){
  requestId = requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i=0; i<branches.length; i++) {
    ctx.globalAlpha = 1;

    ctx.drawImage(branchImg, branches[i].x1, branches[i].y - 40, 150, 50)
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

//Initial goat generated
generateGoatStartingCoords();
goat = new Goat (startingX, startingY, 0, 4, goatWidth, goatWidth);


