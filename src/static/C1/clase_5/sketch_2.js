import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

const sketch = () => {
    return ({ context, width, height ,frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        context.fillStyle = 'black';
        context.font = '1200px "sans-serif"';
        context.textBaseline = 'middle';
        context.textAlign = 'center';

        const text = 'A';
        const metrics = context.measureText(text);
        console.log(metrics);

        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const textHeight = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const textWidth = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        context.save();
        context.translate(width * 0.5, height * 0.5);

        context.rect(mx, my, textHeight, textWidth);
        context.stroke();

        context.fillText(text, 0, 0);
        context.restore();


    };
};

canvasSketch(sketch, settings);
