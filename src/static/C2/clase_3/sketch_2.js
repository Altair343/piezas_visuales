import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(200,540);
        context.quadraticCurveTo(400,300,880,540);
        context.stroke();

    };
};

canvasSketch(sketch, settings);