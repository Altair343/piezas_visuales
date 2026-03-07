import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate:true
};

const sketch = ({ context, width, height }) => {
    const cols = 12;
    const rows = 6;
    const numCells = cols * rows;

    // Grid
    const gridW = width * 0.8;
    const gridH = height * 0.8;
    // Cell
    const cellW = gridW / cols;
    const cellH = gridH / rows;
    // Margin
    const marginX = (width - gridW) * 0.5;
    const marginY = (height - gridH) * 0.5;

    let x, y, n;
    const points = [];
    let frequency = 0.002;
    let amplitude = 90;

    for(let i = 0; i < numCells; i++){
        x = (i % cols * cellW);
        y  = Math.floor(i / cols) * cellH;
        n = utils.random.noise2D(x, y, frequency, amplitude);
        x += n
        y += n
        points.push(new Point(x,y));
    }

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        context.save();
        context.translate(marginX, marginY);
        context.translate(cellW * 0.5, cellH * 0.5);
        context.strokeStyle = 'blue';
        context.lineWidth = 4;

        // Draw Lines
        for (let r = 0; r < rows; r++){
            context.beginPath();
            for(let c = 0; c < cols-1; c++){

                const current = points[r * cols + c + 0];
                const next = points[r * cols + c + 1];

                const midX = current.x + (next.x - current.x) * 0.5;
                const midY = current.y + (next.y - current.y) * 0.5;

                if(c === 0)context.moveTo(current.x, current.y);
                else if(c == cols - 2) context.quadraticCurveTo(current.x, current.y, next.x, next.y);
                else context.quadraticCurveTo(current.x, current.y, midX, midY);


               
            }
            context.stroke();
        }
        // Draw points
        points.forEach(point => point.draw(context));
        context.restore();

    };
};
canvasSketch(sketch, settings);

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2);
        context.fillStyle = 'blue';
        context.fill();
        context.restore();
    }
}