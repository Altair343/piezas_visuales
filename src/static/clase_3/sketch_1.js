import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;


        const points = {x: 800, y: 800, radius:20 };
        context.beginPath();
        context.arc(points.x, points.y, points.radius, 0, Math.PI * 2);
        context.fillStyle = 'black';
        context.fill();

    };
};

canvasSketch(sketch, settings);