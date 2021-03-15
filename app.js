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

const makeNewSlider = (name, min, max, value) => {
  var div = document.createElement('div');

  var label = document.createElement('label');
  label.textContent = `${name}`;

  var slider = document.createElement('input');
  slider.type = 'range';
  slider.min = `${min}`;
  slider.max = `${max}`;
  slider.value = `${value}`;

  div.append(label);
  div.append(slider);

  return {div, slider}
}

var textInput = document.createElement('input');
textInput.type = 'text';
textInput.value = '0.997';


var gravityDiv = makeNewSlider('GRAVITY', 0, 20, 6);
var sizeDiv = makeNewSlider('SIZE', 1, 50, 6);

maindiv.append(canvas);
maindiv.append(gravityDiv.div);
maindiv.append(sizeDiv.div);
maindiv.append(textInput);

gravityDiv.slider.oninput = () => {
  gravity = gravityDiv.slider.value/20;
}
sizeDiv.slider.oninput = () => {
  size = sizeDiv.slider.value;
}

textInput.oninput = () => {
  var value = parseFloat(textInput.value);
  if(value > 1) {
    resistance = 1;
  } else if(value < 0) {
    resistance = 0;
  } else {
    resistance = value;
  }
}


var ctx = canvas.getContext('2d');

var x = 250;
var y = 250;

var gravity = 0.3;
var size = 6;
var resistance = 0.997;

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
  emiter.update(gravity, resistance);
  emiter.show();

}

function update() {

}

function loop() {
  window.requestAnimationFrame(loop);
  // update();
  draw();
}