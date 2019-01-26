let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

window.addEventListener('keydown', moveGoat, false);

let staticGoatsArr =[];

const colors = ['#4deeea', '#74ee15', '#ffe700', '#f000ff', '#001eff', '#ff0303', '#8400ff', '#00fff6', '#0028ff', '#00ff28', '#ffa300', '#cf0060', '#ff00ff', '#13a8fe', '#4e87a4', '#b0d5ce', '#fff1e4', '#fa86ab', '#ee2889','#7b297d', '#e87888', '#eae8e5', '#b1185a','#c351a2', '#efa9df', '#f3cff1']

let goatsArray = [];


// branches
ctx.beginPath();
ctx.moveTo(200,300);
ctx.lineTo(400,300);
ctx.strokeStyle = 'brown';
ctx.lineWidth = 5;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(500,400);
ctx.lineTo(700,400);
ctx.strokeStyle = 'brown';
ctx.lineWidth = 5;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100,500);
ctx.lineTo(300,500);
ctx.strokeStyle = 'brown';
ctx.lineWidth = 5;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(600,600);
ctx.lineTo(800,600);
ctx.strokeStyle = 'brown';
ctx.lineWidth = 5;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50,700);
ctx.lineTo(250,700);
ctx.strokeStyle = 'brown';
ctx.lineWidth = 5;
ctx.stroke();

// pairs of x,y coordinates, function that generates the branches and also defines the areas where the goat stops

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let goatWidth = 100;
let startingX;
let startingY = -100;

function generateGoatStartingCoords(min, max){
  startingX = randomIntFromRange(0 + goatWidth, canvas.width - goatWidth);
  console.log('starting X', startingX);
}

function Goat (x, y, dx, dy, height, width) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.height = height;
  this.width = width;


  this.draw = function(){
    // console.log('drawing');

    let img = document.getElementById("goat");
    canvas.appendChild(img);

    // let goatX = this.x;
    // let goatY = this.y;
    // let goatH = 100;
    // let goatW = 100;

    ctx.drawImage(img, this.x, this.y, this.height, this.width);

    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // // ctx.fillStyle = 'black';
    // ctx.fillStyle=imgFill;
    // ctx.fill();
    // // ctx.strokeStyle = this.stroke
    // // ctx.lineWidth = 2
    // // ctx.stroke()
    // // ctx.shadowBlur = 20
    // // ctx.shadowColor = 'white'
    // // ctx.globalAlpha = 0.9
    // ctx.closePath();
  }

  this.update = function(){
    // console.log('updating');

    if(this.x < (600 + goatWidth) && this.x > (100 - goatWidth) && this.y > (300 - 5 - goatWidth - 3)){
      this.y = 300 - goatWidth - 3;
      staticGoatsArr.push(this);
      console.log('our static goats', staticGoatsArr);
      generateGoatStartingCoords();
      goat = new Goat (startingX, startingY, 0, 4, 100, 100);
    } else {
      this.y += this.dy;
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

generateGoatStartingCoords();

let goat = new Goat (startingX, startingY, 0, 4, goatWidth);
console.log(goat);
goat.draw();
animate();

// sample cirlce by itself
// ctx.beginPath();
// ctx.arc(0, 0, 40, 0, Math.PI * 2, false);
// ctx.fillStyle = 'black';
// ctx.fill();

function animate(){
  // console.log('refreshing');
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // branches

  ctx.beginPath();
  ctx.moveTo(100,300);
  ctx.lineTo(600,300);
  ctx.strokeStyle = 'brown';
  ctx.lineWidth = 5;
  ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(200,300);
  // ctx.lineTo(400,300);
  // ctx.strokeStyle = 'brown';
  // ctx.lineWidth = 5;
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(500,400);
  // ctx.lineTo(700,400);
  // ctx.strokeStyle = 'brown';
  // ctx.lineWidth = 5;
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(100,500);
  // ctx.lineTo(300,500);
  // ctx.strokeStyle = 'brown';
  // ctx.lineWidth = 5;
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(600,600);
  // ctx.lineTo(800,600);
  // ctx.strokeStyle = 'brown';
  // ctx.lineWidth = 5;
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(50,700);
  // ctx.lineTo(250,700);
  // ctx.strokeStyle = 'brown';
  // ctx.lineWidth = 5;
  // ctx.stroke();

  for(var i = 0; i < staticGoatsArr.length; i++){
    staticGoatsArr[i].draw();
  }

  goat.update();

}
// ctx.moveTo(0,0);
// ctx.lineTo(200, 100);
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();



