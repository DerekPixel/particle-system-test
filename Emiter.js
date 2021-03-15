import Particle from './Particle.js';
import Vector from './Vector.js';

class Emiter {
  constructor(x, y, canvas) {
    this.position = new Vector(x, y);
    this.particles = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  emit(size) {
    if(Math.random() > 0) {
      for(var i = 0; i < 2; i++) {
        this.particles.push(new Particle(this.position.x, this.position.y, size));
      }
    }
  }

  update(gravity, resistance) {
    for(var particle of this.particles) {
      particle.applyForce(new Vector(0, gravity), resistance);
      particle.update();
      particle.edges(this.canvas);
    }
  
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show(this.ctx);
    }
  }

}

export default Emiter;