import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;


        const points_a = new Agent(800, 400);
        const points_b = new Agent(300, 700,'red');

        points_a.draw(context);
        points_b.draw(context);
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