import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

let text = 'A';
let fontSize = 1200;
let fontFamily = 'sans-serif';


const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');


const sketch = ({ context, width, height ,frame}) => {
    const cell = 20;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;

    return ({ context, width, height ,frame}) => {
        typeContext.fillStyle = 'black';
        typeContext.fillRect(0, 0, cols, rows);
        typeContext.lineWidth = cols * 0.01;

        fontSize = cols;
        typeContext.fillStyle = 'white';
        typeContext.font = `${fontSize}px "${fontFamily}"`;
        typeContext.textBaseline = 'middle';
        typeContext.textAlign = 'center';

        const metrics = typeContext.measureText(text);

        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        const tx = (cols - mw) * 0.5 - mx;
        const ty = (rows - mh) * 0.5 - my;

        typeContext.save();
        typeContext.translate(tx, ty);
        typeContext.lineWidth = 1;
        typeContext.rect(mx, my, mw, mh);
        typeContext.stroke();

        typeContext.fillText(text, 0, 0);
        typeContext.restore();

        const typeData = typeContext.getImageData(0, 0, cols, rows).data;
        
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        
        context.drawImage(typeCanvas, 0, 0);
        for (let i = 0; i < numCells; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = col * cell;
            const y = row * cell;


            const r = typeData[i * 4 + 0];
            const g = typeData[i * 4 + 1];
            const b = typeData[i * 4 + 2];
            const a = typeData[i * 4 + 3];

            const glyph = utils.math.mapRange(r, 0, 255, 0, 1) < 0.5 ? 'd' : text;

            context.font = `${cell * 1.7}px "${fontFamily}"`;

            context.fillStyle = `rgba(${r},${g},${b},${a})`;
            context.save();
            context.translate(x, y);
            context.translate(cell * 0.5, cell * 0.5);

            // context.fillRect(0, 0, cell, cell);

            context.fillText(glyph, 0, 0);


            context.restore();
        }
    };
};

canvasSketch(sketch, settings);