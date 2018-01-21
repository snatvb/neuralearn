import Neuron from './Neuron';
import {loadImage, drawImg, getMatrixImg} from './utils';
import {fileList, IFileImage} from './contants';

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.getElementById('canvas-container');
const resultBlock = document.getElementById('result');
canvasContainer.appendChild(canvas);

const neuron = new Neuron(3, 5);
neuron.limit = 30;
console.log(neuron);

function toTeach(img: HTMLImageElement) {
    canvas.width = img.width;
    canvas.height = img.height;
    drawImg(ctx, img);
    const matrix = getMatrixImg(ctx, neuron.size.x, neuron.size.y);
    neuron.setInput(matrix);

    neuron.mulW();
    neuron.summa();
    console.log('sum:', neuron.sum, 'wight:', neuron.weight);
    resultBlock.innerText = `${neuron.result() ? "this is 5" : "this is not 5"}`;
    return matrix;
}


function getRandomFile() : IFileImage {
    return fileList[Math.floor(Math.random() * (fileList.length - 1))];
}

function load(fileImage: IFileImage = null) {
    return loadImage(`${fileImage ? fileImage.file : getRandomFile().file}`)
        .then(toTeach);
}


// load(fileList[0]).catch(console.error);

function autoTeacher() {
    let iterations = 0;
    let maxIterations = 1000;
    let successively = 0;
    let needSuccessively = 20;

    function doTeach() {
        const filename = getRandomFile();
        const number = parseInt(filename.number, 10);
        load(filename)
            .then(() => {
                    iterations++;
                    if (iterations > maxIterations) return;
                    const result = neuron.result();
                    const correcting = () => result ? neuron.decW() : neuron.incW();
                    if(number !== 5 && result) {
                        correcting();
                        successively = 0;
                    } else if (number == 5 && !result) {
                        correcting();
                        successively = 0;
                    } else {
                        successively++;
                    }
                    if(successively !== needSuccessively) {
                        doTeach();
                    } else {
                        console.log("iterations", iterations);
                    }
                }
            )
            .catch(console.error);
    }
    doTeach();
}

autoTeacher();

class ControllerUI {
    private buttons = {
        correct: document.getElementById('correct'),
        incorrect: document.getElementById('incorrect')
    };

    constructor() {
        this.binds();
    }

    private binds() {
        this.buttons.correct.addEventListener("click", this.correctClick.bind(this));
        this.buttons.incorrect.addEventListener("click", this.incorrectClick.bind(this));
    }

    private correctClick() {
        // neuron.incW();
        this.reloadData();
    }

    private incorrectClick() {
        if (neuron.result()) {
            neuron.decW();
        } else {
            neuron.incW();
        }
        this.reloadData();
    }

    private reloadData() {
        load().catch(console.error);
    }
}

const ui = new ControllerUI();

