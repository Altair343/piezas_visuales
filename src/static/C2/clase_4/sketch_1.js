import canvasSketch from 'canvas-sketch';


const settings = {
    dimensions: [ 1080, 1080 ],
};
let audio;

const sketch = ({ context, width, height }) => {

    audio = document.createElement('audio');
    audio.src = 'src/static/audio/hazme_una_señal.mp3';
    // audio.autoplay = true;
    // audio.play();

    return ({ context, width, height, frame }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

    };
};

const addListeners = () => {
    globalThis.addEventListener('mouseup', (event) => {
        console.log(event);

        if(audio.paused) audio.play();
        else audio.pause();
    });
};

addListeners();
canvasSketch(sketch, settings);
