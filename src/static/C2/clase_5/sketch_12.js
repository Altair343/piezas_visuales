import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';
import eases from 'eases';
import colormap from 'colormap';
import interpolate from 'color-interpolate';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate: true,
    // fps: 60
};

const particles = [];
let cursor = { x: 9999, y: 9999};
let canvasAlt, imgA, imgB;

const colors = colormap({
    colormap: 'magma',
    nshades: 20,
    format: 'hex',
    alpha: 1
})

const sketch = ({ canvas, width, height , frame}) => {
    let x, y, radius;

    const imgACamvas = document.createElement('canvas');
    const imgAContext = imgACamvas.getContext('2d');
    imgACamvas.width = imgA.width;
    imgACamvas.height = imgA.height;
    imgAContext.drawImage(imgA, 0, 0);
    const imgAData = imgAContext.getImageData(0, 0, imgA.width, imgA.height).data;

    const imgBCamvas = document.createElement('canvas');
    const imgBContext = imgBCamvas.getContext('2d');
    imgBCamvas.width = imgB.width;
    imgBCamvas.height = imgB.height;
    imgBContext.drawImage(imgB, 0, 0);
    const imgBData = imgBContext.getImageData(0, 0, imgB.width, imgB.height).data;

    const numCircles = 30;
    const gapCircle = 2;
    const gapDot = 2;
    let dotRadius = 12;
    let circleRadius = 0;
    const fitRadius = dotRadius;

    canvasAlt = canvas;
    canvas.addEventListener('mousedown', onMouseDown);

    for (let i = 0; i < numCircles; i++) {
        const circumference = Math.PI * 2 * circleRadius;
        const numFit = i ? Math.floor(circumference / (fitRadius * 2 + gapDot)) : 1;
        const fitSlice = Math.PI * 2 / numFit;
        let r, g, b, colA, ix, iy, idx, colB, ixAlt, iyAlt, idxB, colMap;

        for (let j = 0; j < numFit; j++) {
            const theta = fitSlice * j;

            x = (width * 0.5) + Math.cos(theta) * circleRadius;
            y = (height * 0.5) + Math.sin(theta) * circleRadius;
            radius = dotRadius;

            ix = Math.floor((x /width) * imgA.width);
            iy = Math.floor((y /height) * imgA.height);
            idx = (iy * imgA.width + ix) * 4;

            r = imgAData[idx + 1];
            g = imgAData[idx + 2];
            b = imgAData[idx + 3];
            colA = `rgba(${r}, ${g}, ${b}, 1)`;


            ixAlt = Math.floor((x /width) * imgB.width);
            iyAlt = Math.floor((y /height) * imgB.height);
            idxB = (iyAlt * imgB.width + ixAlt) * 4;
            r = imgBData[idxB + 1];
            g = imgBData[idxB + 2];
            b = imgBData[idxB + 3];
            colB = `rgba(${r}, ${g}, ${b}, 1)`;


            colMap = interpolate([colA, colB]);

            particles.push(new Particle(x, y, radius, colMap));
        }

        circleRadius += fitRadius * 2 + gapCircle;
        dotRadius = (1- eases.quadOut(i / numCircles)) * fitRadius;

    }

    return ({ context, width, height , frame}) => {
        context.fillStyle = '#141414';
        context.fillRect(0, 0, width, height);

        // Draw the image
        // context.drawImage(imgA, 0, 0, width, height);

        particles.sort((a, b) => a.scale - b.scale);

        particles.forEach(particle => {
            particle.update();
            particle.draw(context);
        });


    };
};

const onMouseDown = (e) => {
    globalThis.addEventListener('mousemove', onMouseMove);
    globalThis.addEventListener('mouseup', onMouseUp);
    onMouseMove(e);
};

const onMouseMove = (e) => {
    const x = (e.offsetX / canvasAlt.offsetWidth) * canvasAlt.width;
    const y = (e.offsetY / canvasAlt.offsetHeight) * canvasAlt.height;

    cursor.x = x;
    cursor.y = y;
};

const onMouseUp = (e) => {
    globalThis.removeEventListener('mousemove', onMouseMove);
    globalThis.removeEventListener('mouseup', onMouseUp);

    cursor.x = 9999;
    cursor.y = 9999;
};


const loadImage = async (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.crossOrigin = 'Anonymous';
        img.src = src;
    });
};

const start = async () => {
    imgA = await loadImage('src/static/img/img1.jpg');
    imgB = await loadImage('src/static/img/img2.avif');
    canvasSketch(sketch, settings);
};

start();


class Particle {
    constructor(x, y, radius = 10, colMap) {
        // Position
        this.x = x;
        this.y = y;

        // Aceleration
        this.ax = 0;
        this.ay = 0;

        // velocity
        this.vx = 0;
        this.vy = 0;

        // Initial position
        this.ix = x;
        this.iy = y;

        // Size
        this.radius = radius;
        this.scale = 1;
        this.colMap = colMap;
        this.color = this.colMap(0);

        this.minDist = utils.random.range(100, 200);
        this.pushFactor = utils.random.range(0.01, 0.02);
        this.pullFactor = utils.random.range(0.002, 0.006);
        this.dampFactor = utils.random.range(0.9, 0.96);
    }


    update() {
        let dx, dy, dd, distDelta;

        // pull force
        dx = this.ix - this.x;
        dy = this.iy - this.y;
        dd = Math.hypot(dx, dy);

        this.ax = dx * this.pullFactor;
        this.ay = dy * this.pullFactor;
        this.scale = utils.math.mapRange(dd, 0, 200, 1, 5);

        this.color = this.colMap(utils.math.mapRange(dd , 0, 200, 0, 1, true));

        // push force
        dx = this.x - cursor.x;
        dy = this.y - cursor.y;
        dd = Math.hypot(dx, dy);
        distDelta = this.minDist - dd;
        if (dd < this.minDist) {
            this.ax += (dx / dd) * distDelta * this.pushFactor;
            this.ay += (dy / dd) * distDelta * this.pushFactor;
        }

        this.vx += this.ax;
        this.vy += this.ay;

        this.vx *= this.dampFactor;
        this.vy *= this.dampFactor;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.color;

        context.beginPath();
        context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }
}
