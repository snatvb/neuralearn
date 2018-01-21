import Perceptron from './Perceptron';
import {loadImage, drawImg, getMatrixImg} from './utils';
import {fileList, IFileImage} from './contants';

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.getElementById('canvas-container');
const resultBlock = document.getElementById('result');
canvasContainer.appendChild(canvas);

const perceptron = new Perceptron(3, 5);
perceptron.limit = 40;
console.log(perceptron);

function toTeach(img: HTMLImageElement) {
    canvas.width = img.width;
    canvas.height = img.height;
    drawImg(ctx, img);
    const matrix = getMatrixImg(ctx, perceptron.size.x, perceptron.size.y);
    perceptron.setInput(matrix);

    perceptron.mulW();
    perceptron.summa();
    console.log('sum:', perceptron.sum, 'wight:', perceptron.weight);
    resultBlock.innerText = `${perceptron.result() ? "this is 5" : "this is not 5"}`;
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
    let maxIterations = 5000;
    let successively = 0;
    let needSuccessively = 70;

    function doTeach() {
        const filename = getRandomFile();
        const number = parseInt(filename.number, 10);
        load(filename)
            .then(() => {
                    iterations++;
                    if (iterations > maxIterations) return;
                    const result = perceptron.result();
                    const correcting = () => result ? perceptron.decW() : perceptron.incW();
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
        // perceptron.incW();
        this.reloadData();
    }

    private incorrectClick() {
        if (perceptron.result()) {
            perceptron.decW();
        } else {
            perceptron.incW();
        }
        this.reloadData();
    }

    private reloadData() {
        load().catch(console.error);
    }
}

const ui = new ControllerUI();

