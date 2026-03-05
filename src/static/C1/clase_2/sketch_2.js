import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
}

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
            const slice = degToRad(360 / num);
            const angle = slice * i;

            x = x_alt + radius * Math.sin(angle);
            y = y_alt + radius * Math.cos(angle);

            // Rectángulo
            context.fillStyle = 'black';
            context.save();

            // Forma 1
            // context.translate(x, y);
            // context.rotate(angle);
            // context.rotate(angle);

            // Forma 2
            // context.translate(x, y_alt);

            // Forma 3
            // context.translate(x, y_alt);
            // context.rotate(angle);

            // Forma 4
            context.translate(x, y);
            context.rotate(-angle);

            context.beginPath();
            context.rect(-width_alt * 0.5, -height_alt * 0.5, width_alt, height_alt);
            context.fill();
            context.restore();
        }

    };
};

canvasSketch(sketch, settings);