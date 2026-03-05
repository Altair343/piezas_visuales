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
       

        context.save();
        context.translate(width * 0.5, height * 0.5);
        context.fillText(text, 0, 0);
        context.restore();


    };
};

canvasSketch(sketch, settings);
