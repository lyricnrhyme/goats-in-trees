let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

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

let goatWidth = 90;
let startingX;
let startingY = -100;

function generateGoatStartingCoords(min, max){
  startingX = randomIntFromRange(0 + goatWidth, canvas.width - goatWidth);
  console.log('starting X', startingX);
}

function Goat (x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;


  this.draw = function(){
    // console.log('drawing');

    let img = document.getElementById("goat");
    canvas.appendChild(img);

    let goatX = this.x; 
    let goatY = this.y;
    let goatH = 100; 
    let goatW = 100; 

    ctx.drawImage(img, goatX, goatY, goatH, goatW);
    
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

    if(this.x < (600 + goatWidth/2) && this.x > (100 - goatWidth/2) && this.y > (300 - 5 - goatWidth - 3)){
      this.y = 300 - goatWidth - 3;
    } else {
      this.y += this.dy;
    }
    this.draw();
  }
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

  goat.update();

}
// ctx.moveTo(0,0);
// ctx.lineTo(200, 100);
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();



