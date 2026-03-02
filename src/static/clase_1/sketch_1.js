import canvasSketch from 'canvas-sketch';

const settings = {
    dimensions: [ 600, 600 ]
};
const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        // Condincionales
        const width_alt = 60;
        const height_alt = 60;
        const gab = 20;
        let x, y;

        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                x = 100 + (width_alt + gab) * i;
                y = 100 + (height_alt + gab) * j;

                context.beginPath();
                context.lineWidth = 3;
                context.strokeStyle = 'black';
                context.rect(x, y, width_alt, height_alt);
                context.stroke();

                if(Math.random() > 0.5){
                    context.beginPath();
                    context.strokeStyle = 'blue';
                    context.rect(x+8, y+8, width_alt-16, height_alt-16);
                    context.stroke();
                }
            }
        }
    };
};

canvasSketch(sketch, settings);