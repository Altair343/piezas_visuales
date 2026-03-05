import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

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
        drawSkewedRect({context});
        context.stroke();
        context.restore();

    };
};

const drawSkewedRect = ({context, w = 600, h = 200, degrees = 30}) => {
    const angle = utils.math.degToRad(degrees);
    const rx = w * Math.cos(angle);
    const ry = w * Math.sin(angle);

    context.save();
    context.translate(rx * -0.5, (ry  + h) * -0.5);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(rx,ry);
    context.lineTo(rx,ry + h);
    context.lineTo(0,h);
    context.closePath();
    context.stroke();
    context.restore();
}

canvasSketch(sketch, settings);