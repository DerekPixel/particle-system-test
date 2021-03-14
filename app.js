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

var gravityDiv = document.createElement('div');

var gravityLabel = document.createElement('label');
gravityLabel.textContent = 'GRAVITY';

var gravitySlider = document.createElement('input');
gravitySlider.type = 'range';
gravitySlider.min = '0';
gravitySlider.max = '20';
gravitySlider.value = '6';

gravityDiv.append(gravityLabel);
gravityDiv.append(gravitySlider);

var sizeDiv = document.createElement('div');

var sizeLabel = document.createElement('label');
sizeLabel.textContent = 'SIZE';

var sizeSlider = document.createElement('input');
sizeSlider.type = 'range';
sizeSlider.min = '1';
sizeSlider.max = '50';
sizeSlider.value = '6';

sizeDiv.append(sizeLabel);
sizeDiv.append(sizeSlider);

maindiv.append(canvas);
maindiv.append(gravityDiv);
maindiv.append(sizeDiv);




gravitySlider.oninput = () => {
  gravity = gravitySlider.value/20;
}

sizeSlider.oninput = () => {
  size = sizeSlider.value;
  console.log(size);
}


var ctx = canvas.getContext('2d');

var x = 250;
var y = 250;

var gravity = 0.3;
var size = 6;

var emiter = new Emiter(x, y, canvas, gravity);

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
  
  emiter.emit(size);
  emiter.update(gravity);
  emiter.show();

}

function update() {

}

function loop() {
  window.requestAnimationFrame(loop);
  // update();
  draw();
}