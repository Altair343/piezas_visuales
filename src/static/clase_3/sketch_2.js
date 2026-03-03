import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;


        const points_a = new Point(800, 400, 10);
        const points_b = new Point(300, 700, 10);

        context.beginPath();
        context.arc(points_a.x, points_a.y, points_a.radius, 0, Math.PI * 2);
        context.fillStyle = 'black';
        context.fill();

        context.beginPath();
        context.arc(points_b.x, points_b.y, points_b.radius, 0, Math.PI * 2);
        context.fillStyle = 'blue';
        context.fill();

    };
};

canvasSketch(sketch, settings);


class Point {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }


};