import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';
import risoColors from 'riso-colors';

const settings = {
    dimensions: [ 1080, 1080 ],
    // animate: true,
    fps: 60
};

const sketch = ({ context, width, height }) => {
    let x,y, w, h, fill, stroke, blend;
    const num = 40;
    const degrees = -30;
    const rects = [];

    const rectColors = [
        utils.random.pick(risoColors),
        utils.random.pick(risoColors),
        utils.random.pick(risoColors)
    ]
    const bgColor = utils.random.pick(risoColors).hex;

    for (let i = 0; i < num; i++) {
            x = utils.random.range(0, width);
            y = utils.random.range(0, height);
            w = utils.random.range(200, 600);
            h = utils.random.range(40, 200);

            fill = utils.random.pick(rectColors).hex;
            stroke = utils.random.pick(rectColors).hex;
            blend = ( utils.random.value() > 0.5) ? 'overlay' : 'source-over';
            rects.push({x,y,w,h,fill, stroke, blend});
    }

    const mask = {
        radius : width * 0.4,
        sides : 3,
        x: width * 0.5,
        y: height * 0.58

    }

    return ({ context, width, height , frame}) => {
        context.fillStyle = bgColor;
        context.fillRect(0, 0, width, height);

        context.save();
        context.translate(mask.x, mask.y);

        drawPolygon({context, radius: mask.radius, sides: mask.sides});
        context.restore();
        context.clip();

        rects.forEach(rect => {
            const {x,y,w,h,fill, stroke, blend} = rect;
            let shadowColor;

            context.save();
            context.translate(x, y);
            context.strokeStyle = stroke;
            context.fillStyle = fill;
            context.lineWidth = 10;

            context.globalCompositeOperation = blend;

            drawSkewedRect({context,degrees});

            shadowColor = utils.color.offsetHSL(fill, 0, 0, -20);
            shadowColor.rgba[3] = 0.5;

            context.shadowColor = utils.color.style(shadowColor.rgba, 0.5);
            context.shadowOffsetX = -10;
            context.shadowOffsetY = 20;
            context.shadowBlur = 2;

            context.fill();
            context.shadowColor = null;
            context.stroke();

            context.globalCompositeOperation = 'source-over';
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
            context.restore();
        });
        context.restore();

        context.save();
        context.translate(mask.x, mask.y);
        drawPolygon({context, radius: mask.radius, sides: mask.sides});
        context.globalCompositeOperation = 'color-burn';
        context.lineWidth = 15;
        context.strokeStyle = rectColors[0].hex;
        context.stroke();

        context.restore();
    };
};

const drawSkewedRect = ({context, w = 600, h = 200, degrees = 45}) => {
    const angle = utils.math.degToRad(degrees);
    const rx = w * Math.cos(angle);
    const ry = w * Math.sin(angle);

    context.save();
    context.translate(rx * -0.5, (ry  + h) * -0.5);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(rx,ry);
    context.lineTo(rx,ry + h);
    context.lineTo(0,h);
    context.closePath();
    context.stroke();
    context.restore();
}

const drawPolygon = ({context,radius = 100, sides= 3}) => {
    const slice = Math.PI * 2 / sides;
    context.beginPath();
    context.moveTo(0,-radius);

    for (let i = 1; i < sides; i++) {
        let theta = i * slice - Math.PI  * 0.5;
        context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
    }
    context.closePath();
}

canvasSketch(sketch, settings);