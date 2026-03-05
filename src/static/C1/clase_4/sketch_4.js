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

        const columns = 10;
        const rows = 10;
        const numCells = columns * rows;

        const gridWidth = width * 0.8;
        const gridHeight = height * 0.8;
        const cellWidth = gridWidth / columns;
        const cellHeight = gridHeight / rows;
        const marginX = (width - gridWidth) * 0.5;
        const marginY = (height - gridHeight) * 0.5;

        for (let i = 0; i < numCells; i++) {
            const column = i % columns;
            const row = Math.floor(i / columns);


            const x = column * cellWidth;
            const y = row * cellHeight;
            const w = cellWidth * 0.8;
            const h = cellHeight * 0.8;

            const noise = utils.random.noise2D(x, y, 0.001);
            const angle = noise * Math.PI * 0.2;

            context.save();
            context.lineWidth = 4;
            context.translate(x, y);
            context.translate(marginX, marginY);
            context.translate(cellWidth * 0.5, cellHeight * 0.5);
            context.rotate(angle);
            context.beginPath();
            context.moveTo(w * -0.5, 0);
            context.lineTo(w * 0.5, 0);
            context.stroke();


            context.restore();
        }

    };
};

canvasSketch(sketch, settings);
