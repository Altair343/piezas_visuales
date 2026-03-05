import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true
};

let text = 'A';
let fontSize = 1200;
let fontFamily = 'sans-serif';


const sketch = () => {
    return ({ context, width, height ,frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        context.lineWidth = width * 0.01;

        context.fillStyle = 'black';
        context.font = `${fontSize}px "${fontFamily}"`;
        context.textBaseline = 'middle';
        context.textAlign = 'center';


        const metrics = context.measureText(text);
        console.log(metrics);

        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        const x = (width - mw) * 0.5 - mx;
        const y = (height - mh) * 0.5 - my;

        context.save();
        context.translate(x, y);
        context.lineWidth = 1;
        context.rect(mx, my, mw, mh);
        context.stroke();

        context.fillText(text, 0, 0);
        context.restore();


    };
};

canvasSketch(sketch, settings);
