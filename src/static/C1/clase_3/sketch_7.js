import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

const sketch = ({ context, width, height }) => {

    const agents = [];
    for (let i = 0; i < 40; i++) {
        const x = utils.random.range(0, width);
        const y = utils.random.range(0, height);

        agents.push(new Agent(x, y));
    }

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        agents.forEach(agent =>{
            agent.update();
            agent.draw(context)
        });
    };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

class Agent {
    constructor(x, y, color) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(utils.random.range(-1, 1), utils.random.range(-1, 1));
        this.radius = utils.random.range(4, 12);
        this.color = color || 'black';
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

    }

    draw(context) {

        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.lineWidth = 3;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        // context.fillStyle = this.color;
        context.fill();
        context.stroke();
        context.restore();
    }

};