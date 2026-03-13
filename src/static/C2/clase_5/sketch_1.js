import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true,
    // fps: 60
};

const particles = [];

const sketch = ({ context, width, height }) => {
    let x = width * 0.5;
    let y = height * 0.5;

    for (let i = 0; i < 1; i++) {
        particles.push(new Particle(x, y));
    }

    return ({ context, width, height , frame}) => {
        context.fillStyle = '#141414';
        context.fillRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
            particle.draw(context);
        });


    };
};

canvasSketch(sketch, settings);

class Particle {
    constructor(x, y, radius = 10) {
        // Position
        this.x = x;
        this.y = y;

        // Aceleration
        this.ax = 0;
        this.ay = 0;

        // velocity
        this.vx = 0;
        this.vy = 0;

        // Initial position
        this.ix = x;
        this.iy = y;

        // Size
        this.radius = radius;
    }


    update() {
        this.ax += 0.001;

        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = 'white';

        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}
