import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';
// import { Pane } from 'tweakpane';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

const params = {
    cols: 10,
    rows: 10,
    scaleMin: 1,
    scaleMax: 30,
    freq: 0.001,
    amp: 0.2,
    frame: 0,
    animate: true,
    lineCap: 'butt',
};

const sketch = () => {
    return ({ context, width, height ,frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        const columns = params.cols;
        const rows = params.rows;
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

            const f = params.animate ? frame : params.frame;
            const noise = utils.random.noise2D(x + frame * 10, y, params.freq);
            // const noise = random.noise3D(x, y, f * 10, params.freq);
            const angle = noise * Math.PI * 0.2;

            // const scale =  (noise + 1) / 2 *30;
            // const scale =  (noise * 0.5 + 0.5) * 30;
            const scale = utils.math.mapRange(noise, -1, 1, params.scaleMin, params.scaleMax);

            context.save();
            context.lineWidth = scale;
            context.lineCap = params.lineCap;
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

const createPane = () => {
    const pane = new Tweakpane.Pane();
    let folder;

    folder = pane.addFolder({ title: 'Grid '});
    folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' }});
    folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
    folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

    folder = pane.addFolder({ title: 'Noise' });
    folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
    folder.addInput(params, 'amp', { min: 0, max: 1 });
    folder.addInput(params, 'animate');
    folder.addInput(params, 'frame', { min: 0, max: 999 });
};

createPane();
canvasSketch(sketch, settings);
