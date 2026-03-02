import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        let x= width * 0.5;
        let y= height * 0.5;
        const width_alt = width * 0.3;
        const height_alt = height * 0.3;
        context.fillStyle = 'black';

        // Rectángulo
        context.save();
        context.beginPath();
        context.rotate(0.25);
        context.rect(x, y, width_alt, height_alt);
        context.fill();
        context.restore();

        // Es igual a:
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.rotate(-0.50);
        context.fillStyle = 'red';
        context.rect(0, 0, width_alt, height_alt);
        context.fill();
        context.restore();
        
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.rotate(-0.50);
        context.fillStyle = 'blue';
        context.rect(width_alt *0.5, height_alt *0.5, width_alt, height_alt);
        context.fill();
        context.restore();

        context.save();
        context.beginPath();
        context.translate(100, 400);
        context.arc(0, 0, 50, 0, Math.PI * 2);
        context.fillStyle = 'green';
        context.fill();
        context.restore();
    };
};

canvasSketch(sketch, settings);