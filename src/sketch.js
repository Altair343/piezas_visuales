import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 1080, 1080 ],
    // animate: true,
    // fps: 60
};

const sketch = ({ context, width, height }) => {
    return ({ context, width, height , frame}) => {
        context.fillStyle = '#EEEAE0';
        context.fillRect(0, 0, width, height);


    };
};

canvasSketch(sketch, settings);