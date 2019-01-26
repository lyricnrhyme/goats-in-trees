let canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

// ctx.moveTo(0,0);
// ctx.lineTo(200, 100);
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();

let img = document.getElementById("goat");
canvas.appendChild(img);
ctx.drawImage(img, 100, 100);