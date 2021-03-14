import Vector from './Vector.js';

class Particle {
  constructor(x, y, r) {
    this.position = new Vector(x, y)
    this.velocity = new Vector(
      ((Math.random() < 0.5 ? -1 : 1) * Math.random()) * 5, 
      ((Math.random() < 0.5 ? -1 : 1) * Math.random()) * 5
    );
    this.acceleration = new Vector(0, 0);
    this.r = r;
    this.lifeTime = 50;

    this.red = Math.random() * 255;
    this.green = Math.random() * 255;
    this.blue = Math.random() * 255;
  }

  applyForce(force, resistance = 1) {
    this.acceleration.addTo(force);
    this.velocity.multiplyBy(resistance);
  }

  edges(canvas) {
    if (this.position.y >= canvas.height - this.r) {
      this.position.y = canvas.height - this.r;
      this.velocity.y *= -1;
    } else if(this.position.y <= this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }

    if (this.position.x >= canvas.width - this.r) {
      this.position.x = canvas.width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x <= this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    }
  }

  update() {
    this.velocity.addTo(this.acceleration);
    this.position.addTo(this.velocity);
    this.acceleration = new Vector(0, 0);
    this.lifeTime -= 1;
  }

  norm(val, max, min) {
    return (val - min) / (max - min); 
  }

  show(ctx) {
    
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    ctx.rect(0, 0, this.r, this.r);
    // ctx.arc(0, 0, this.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(
      ${this.red}, 
      ${this.green}, 
      ${this.blue}, 
      ${this.norm(this.lifeTime, 50, 0)}
    )`;
    ctx.fill();
    ctx.restore();
  }

  finished() {
    return this.lifeTime <= 0;
  }

}

export default Particle;