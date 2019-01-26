let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

window.addEventListener('keydown', moveGoat, false);

let staticGoatsArr =[];
let goat;

let audio = new Audio('/assets/goatscream.mp3');

let branches = [
  {x1: 200, x2: 400, y: 300},
  {x1: 500, x2: 700, y: 400},
  {x1: 100, x2: 300, y: 500},
  {x1: 600, x2: 800, y: 600},
  {x1: 50, x2: 250, y: 700},
]

// pairs of x,y coordinates, function that generates the branches and also defines the areas where the goat stops

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
  console.log('running random INt');
}

let goatWidth = 100;
let startingX;
let startingY = -50;

function generateGoatStartingCoords(min, max){
  startingX = randomIntFromRange(0 + goatWidth, canvas.width - goatWidth);
  console.log('starting X', startingX);
}

let splodeCounter = 0;

let splodeImg = new Image(100,100);
splodeImg.src = '/assets/goatsplode.png';
canvas.appendChild(splodeImg);

let splode;
let displaySplode = false;
console.log('display splode', displaySplode);

function Splode (x){
  console.log('running Splode');
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
    console.log('counter', splodeCounter);
    this.draw();
  }
}

let goatImg = new Image(100,100);
goatImg.src = '/assets/goat.png';
canvas.appendChild(goatImg);

function Goat (x, y, dx, dy, height, width) {
  console.log('running Goat');
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.height = height;
  this.width = width;


  this.draw = function(){
    // console.log('drawing');

    ctx.globalAlpha = 1;
    ctx.drawImage(goatImg, this.x, this.y, this.height, this.width);
  }

  this.update = function(){
    // console.log('updating');
    let hit = branches.filter(x => this.x < (x.x2) && this.x > (x.x1) && this.y > (x.y - goatWidth - 3))

    if(hit.length > 0){
      this.y = hit[0].y - goatWidth - 3;
        staticGoatsArr.push(this);
        console.log('our static goats', staticGoatsArr.length);
        generateGoatStartingCoords();
        goat = new Goat (startingX, startingY, 0, 4, 100, 100);
    } else {
      this.y += this.dy;
    }

    if(this.y - this.height > canvas.height){
      splode = new Splode(this.x, -10, 100, 100);
      splodeCounter = 0;
      displaySplode = true;


      // splode.active = true;
      // splode.draw();

      generateGoatStartingCoords();
      goat.x = startingX;
      goat.y = startingY;
      // audio.play();
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
    staticGoatsArr[i].draw();
  }

  goat.update();

  if (displaySplode == true){
    splode.update();
  }
}

generateGoatStartingCoords();
goat = new Goat (startingX, startingY, 0, 4, goatWidth, goatWidth);
console.log('static goats', staticGoatsArr.length);
animate();



