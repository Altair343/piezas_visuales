import canvasSketch from 'canvas-sketch';
import utils from 'canvas-sketch-util';

const settings = {
    dimensions: [ 1080, 1080 ],
    animate:true,
    // fps:60
};
let audio, manager;
let audioContext, audioData, sourceNode, analyserNode;

const sketch = ({ context, width, height }) => {

    return ({ context, width, height, frame }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        if (!audioContext) return;
        analyserNode.getFloatFrequencyData(audioData);
        const average = getAverage(audioData);
        const mappedAverage = utils.math.mapRange(audioData[12], analyserNode.minDecibels, analyserNode.maxDecibels, 0, 1, true);
        const radius = mappedAverage * 200;
        context.save();
        context.translate(width * 0.5, height  * 0.5);
        context.lineWidth = 10;

        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.strokeStyle = 'black';
        context.stroke();
        context.restore();

    };
};

const addListeners = () => {
    globalThis.addEventListener('mouseup', (event) => {
        console.log(event);

        if (!audioContext) createAudio();

        if(audio.paused) {
            audio.play();
            manager.play();
        } else{
            audio.pause();
            manager.pause();
        }
    });
};

const createAudio = () => {
    audio = document.createElement('audio');
    audio.src = 'src/static/audio/hazme_una_señal.mp3';

    audioContext = new AudioContext();
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(audioContext.destination);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 512;
    sourceNode.connect(analyserNode);

    audioData = new Float32Array(analyserNode.frequencyBinCount);
};

const getAverage = (data) => {
    let sum = 0;
    for (const value of data) {
    sum += value;
    }
    return sum / data.length;
};

const start = async () => {
    addListeners();
    manager = await canvasSketch(sketch, settings);
    manager.pause();
};

start();
