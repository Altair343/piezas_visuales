import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        const x_alt      = width * 0.5;
        const y_alt      = height * 0.5;
        const width_alt  = width * 0.01;
        const height_alt = height * 0.1;
        let x, y;

        const num        = 12;
        const radius     = width * 0.3;

        for (let i = 0; i < num; i++) {
            const slice = utils.math.degToRad(360 / num);
            const angle = slice * i;

            x = x_alt + radius * Math.sin(angle);
            y = y_alt + radius * Math.cos(angle);

            context.fillStyle = 'black';
            context.save();

            context.translate(x, y);
            context.rotate(-angle);
            context.scale(utils.random.range(0.5, 1), utils.random.range(0.5, 1));

            context.beginPath();
            context.rect(-width_alt * 0.5, -height_alt * 0.5, width_alt, height_alt);
            context.fill();
            context.restore();
        }

    };
};

canvasSketch(sketch, settings);