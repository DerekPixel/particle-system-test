import Emiter from './Emiter.js';
import Particle from './Particle.js'
import Vector from './Vector.js';

var maindiv = document.getElementById('main');

var canvas = document.createElement('canvas');
canvas.id = 'mycanvas';
canvas.width = 500;
canvas.height = 500;
canvas.style.borderStyle = 'solid';
canvas.style.borderWidth = '1px';

maindiv.append(canvas);

var ctx = canvas.getContext('2d');


var x = 250;
var y = 250;

var emiter = new Emiter(x, y, canvas);

loop();

function getCursorPosition(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  emiter.position.x = event.clientX - rect.left;
  emiter.position.y = event.clientY - rect.top;
}

canvas.addEventListener('mousemove', (e) => {
  getCursorPosition(e, canvas)
})

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  emiter.emit();
  emiter.update();
  emiter.show();

}

function update() {

}

function loop() {
  window.requestAnimationFrame(loop);
  // update();
  draw();
}