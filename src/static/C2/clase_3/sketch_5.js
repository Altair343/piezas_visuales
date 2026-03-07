import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate:true
};

let canvasAlt;
let points;

const sketch = ({canvas}) => {

    points = [
        new Point(200, 540),
        new Point(400, 300, true),
        new Point(880, 540),
        new Point(600, 700, true),
        new Point(640, 900),
    ];

    canvas.addEventListener('mousedown', onMouseDown);
    canvasAlt = canvas;

    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i += 2){
            context.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        }
   
        context.stroke();

        points.forEach(point => point.draw(context));

    };
};


const onMouseDown = (e) => {
    globalThis.addEventListener('mousemove', onMouseMove);
    globalThis.addEventListener('mouseup', onMouseUp);

    const x = (e.offsetX / canvasAlt.offsetWidth) * canvasAlt.width;
    const y = (e.offsetY / canvasAlt.offsetHeight) * canvasAlt.height;

    points.forEach(point => {
        point.isDragging = point.hitTest(x,y);
    });
};

const onMouseMove = (e) => {
    const x = (e.offsetX / canvasAlt.offsetWidth) * canvasAlt.width;
    const y = (e.offsetY / canvasAlt.offsetHeight) * canvasAlt.height;

    points.forEach(point => {
        if(point.isDragging){
            point.x = x;
            point.y = y;
        }
    });
};

const onMouseUp = (e) => {
    globalThis.removeEventListener('mousemove', onMouseMove);
    globalThis.removeEventListener('mouseup', onMouseUp);
};


canvasSketch(sketch, settings);

class Point{
    constructor(x,y, control = false){
        this.x = x;
        this.y = y;
        this.control = control;
    }

    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2);
        context.fillStyle = this.control ? 'red' : 'black';
        context.fill();
        context.restore();
    }

    hitTest(x,y){
        const dx = this.x - x;
        const dy = this.y - y;
       return Math.sqrt(dx * dx + dy * dy) < 20;
    }

}