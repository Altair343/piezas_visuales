import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 800, 800 ],
    // animate: true,
    fps: 60
};

const sketch = ({ context, width, height }) => {
    let x,y, w, h;

    return ({ context, width, height , frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);


        x = width * 0.5;
        y = height * 0.5;
        w = width * 0.6;
        h = height * 0.1;

        context.strokeStyle = 'blue';

        context.save();
        context.translate(x, y);

        // context.strokeRect(x, y, w, h);
        // context.strokeRect(x - w * 0.5, y - h * 0.5, w, h);
        context.strokeRect(w * -0.5,h * -0.5, w, h);
        context.restore();

    };
};

canvasSketch(sketch, settings);