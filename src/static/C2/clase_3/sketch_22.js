import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';
import colormap from 'colormap';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate:true
};


const sketch = ({ context, width, height }) => {
    const cols = 70;
    const rows = 8;
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

    let x, y, n, lineWidth, color;
    const points = [];
    let frequency = 0.02;
    let amplitude = 70;

    const colors = colormap({
        colormap: 'summer',
        nshades: amplitude,
        format: 'hex',
        alpha: 1
    })

    for(let i = 0; i < numCells; i++){
        x = (i % cols * cellW);
        y  = Math.floor(i / cols) * cellH;
        n = utils.random.noise2D(x, y, frequency, amplitude);
        x += n
        y += n
        lineWidth = utils.math.mapRange(n, -amplitude, amplitude, 0, 5);
        color = colors[Math.floor(utils.math.mapRange(n, -amplitude, amplitude, 0, amplitude))];
        points.push(new Point(x,y, lineWidth, color));
    }

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        context.save();
        context.translate(marginX, marginY);
        context.translate(cellW * 0.5, cellH * 0.5);
        context.strokeStyle = 'blue';
        context.lineWidth = 4;

        let lastX, lastY;

        // Draw Lines
        for (let r = 0; r < rows; r++){
            for(let c = 0; c < cols-1; c++){
                
                const current = points[r * cols + c + 0];
                const next = points[r * cols + c + 1];
                
                const midX = current.x + (next.x - current.x) * 0.8;
                const midY = current.y + (next.y - current.y) * 4.4;
                
                if (c === 0){
                    lastX = current.x;
                    lastY = current.y;
                }
                context.beginPath();
                context.lineWidth = current.lineWidth;
                context.strokeStyle = current.color;
                context.moveTo(lastX,lastY);
                context.quadraticCurveTo(current.x, current.y, midX, midY);
                context.stroke();
                lastX = midX - c / cols * 250;
                lastY = midY - r / rows * 250;
            }
        }
        // Draw points
        // points.forEach(point => point.draw(context));
        context.restore();

    };
};
canvasSketch(sketch, settings);

class Point{
    constructor(x,y, lineWidth, color){
        this.x = x;
        this.y = y;
        this.lineWidth = lineWidth;
        this.color = color;
    }

    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();
        context.restore();
    }
}