import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        const agents = [];
        for (let i = 0; i < 40; i++) {
            const x = utils.random.range(0, 1080);
            const y = utils.random.range(0, 1080);
            agents.push(new Agent(x, y));
        }

        agents.forEach(agent => agent.draw(context));
    };
};

canvasSketch(sketch, settings);


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

class Agent {
    constructor(x, y, color) {
        this.pos = new Point(x, y);
        this.radius = 10;
        this.color = color || 'black';
    }

    draw(context) {
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }

};