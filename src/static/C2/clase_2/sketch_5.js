import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 800, 800 ],
    // animate: true,
    fps: 60
};

const sketch = ({ context, width, height }) => {
    let x,y, w, h;
    let angle, rx, ry;

    return ({ context, width, height , frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);


        x = width * 0.5;
        y = height * 0.5;
        w = width * 0.6;
        h = height * 0.1;

        angle = utils.math.degToRad(30);
        rx = w * Math.cos(angle);
        ry = w * Math.sin(angle);

        context.strokeStyle = 'blue';

        context.save();
        context.translate(x, y);
        context.translate(rx * -0.5, (ry  + h) * -0.5);

        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(rx,ry);
        context.lineTo(rx,ry + h);
        context.lineTo(0,h);
        context.closePath();
        context.stroke();
        context.restore();

    };
};

canvasSketch(sketch, settings);