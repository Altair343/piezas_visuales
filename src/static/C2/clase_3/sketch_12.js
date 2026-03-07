import canvasSketch from 'canvas-sketch';

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

    let x, y;
    const points = [];

    for(let i = 0; i < numCells; i++){
        x = (i % cols * cellW);
        y  = Math.floor(i / cols) * cellH;
        points.push(new Point(x,y));
    }

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        context.save();
        context.translate(marginX, marginY);
        context.translate(cellW * 0.5, cellH * 0.5);
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
        context.fillStyle = 'red';
        context.fill();
        context.restore();
    }
}