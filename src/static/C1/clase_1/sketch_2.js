import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        const width_alt 	= width  * 0.10;
        const height_alt 	= height * 0.10;
        const gap = width  * 0.03;
        const ix 	= width  * 0.17;
        const iy 	= height * 0.17;
        const off = width  * 0.02;

        let x, y;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                x = ix + (width_alt + gap) * i;
                y = iy + (height_alt + gap) * j;

                context.beginPath();
                context.strokeStyle = 'black';
                context.rect(x, y, width_alt, height_alt);
                context.stroke();

                if (Math.random() > 0.5) {
                    context.beginPath();
                    context.strokeStyle = 'blue';
                    context.rect(x + off / 2, y + off / 2, width_alt - off, height_alt - off);
                    context.stroke();
                }
            }
        }
    };
};

canvasSketch(sketch, settings);