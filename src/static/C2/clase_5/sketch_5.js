import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true,
    // fps: 60
};

const particles = [];
let cursor = { x: 9999, y: 9999};
let canvasAlt;

const sketch = ({ canvas, width, height , frame}) => {
    let x, y, particle, radius;

    const numCircles = 15;
    const gapCircle = 10;
    const gapDot = 4;
    let dotRadius = 12;
    let circleRadius = 0;
    const fitRadius = dotRadius;


    canvasAlt = canvas;
    canvas.addEventListener('mousedown', onMouseDown);

    for (let i = 0; i < numCircles; i++) {
        const circumference = Math.PI * 2 * circleRadius;
        const numFit = i ? Math.floor(circumference / (fitRadius * 2 + gapDot)) : 1;
        const fitSlice = Math.PI * 2 / numFit;

        for (let j = 0; j < numFit; j++) {
            const theta = fitSlice * j;
            
            x = (width * 0.5) + Math.cos(theta) * circleRadius;
            y = (height * 0.5) + Math.sin(theta) * circleRadius;
            radius = dotRadius;

            particle = new Particle(x, y, radius);
            particles.push(particle);
        }

        circleRadius += fitRadius * 2 + gapCircle;
        dotRadius = (1-i / numCircles) * fitRadius;

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

const onMouseDown = (e) => {
    globalThis.addEventListener('mousemove', onMouseMove);
    globalThis.addEventListener('mouseup', onMouseUp);
    onMouseMove(e);
};

const onMouseMove = (e) => {
    const x = (e.offsetX / canvasAlt.offsetWidth) * canvasAlt.width;
    const y = (e.offsetY / canvasAlt.offsetHeight) * canvasAlt.height;

    cursor.x = x;
    cursor.y = y;
};

const onMouseUp = (e) => {
    globalThis.removeEventListener('mousemove', onMouseMove);
    globalThis.removeEventListener('mouseup', onMouseUp);

    cursor.x = 9999;
    cursor.y = 9999;
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

        this.minDist = 100;
        this.pushFactor = 0.02;
        this.pullFactor = 0.004;
        this.dampFactor = 0.95;
    }


    update() {
        let dx, dy, dd, distDelta;

        // pull force
        dx = this.ix - this.x;
        dy = this.iy - this.y;

        this.ax = dx * this.pullFactor;
        this.ay = dy * this.pullFactor;


        // push force
        dx = this.x - cursor.x;
        dy = this.y - cursor.y;
        dd = Math.hypot(dx, dy);
        distDelta = this.minDist - dd;
        if (dd < this.minDist) {
            this.ax += (dx / dd) * distDelta * this.pushFactor;
            this.ay += (dy / dd) * distDelta * this.pushFactor;
        }

        this.vx += this.ax;
        this.vy += this.ay;

        this.vx *= this.dampFactor;
        this.vy *= this.dampFactor;

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
