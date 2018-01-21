class Neuron {
    mul: number[][];
    weight: number[][];
    input: number[][];
    limit: number = 9;
    sum: number = 0;
    size = {
        x: 0,
        y: 0
    };

    lastResult = false;

    constructor(sizeX : number, sizeY: number) {
        this.size = {
            x: sizeX,
            y: sizeY
        };
        this.weight = this.generateEmptyArray(this.size.x, this.size.y);
        this.mul = this.generateEmptyArray(this.size.x, this.size.y);
        this.input = this.generateEmptyArray(this.size.x, this.size.y);
        this.fillField(this.weight, 1);
    }

    setInput(matrix: number[][]) {
        for (let x = 0; x < matrix.length; x++) {
            let line = matrix[x];
            for (let y = 0; y < line.length; y++) {
                this.input[x][y] = line[y];
            }
        }
    }

    private fillField(field:number[][], num:number) {
        for (let x = 0; x < field.length; x++) {
            let line = field[x];
            for (let y = 0; y < line.length; y++) {
                field[x][y] = num;
            }
        }
    }

    private generateEmptyArray(x: number, y: number) {
        const result : number [][] = [];
        for (let i = 0; i < x; i++) {
            result.push(new Array(y));
        }
        return result;
    }

    public mulW() {
        for (let x = 0; x < this.input.length; x++) {
            for (let y = 0; y < this.input[x].length; y++) {
                this.mul[x][y] = this.input[x][y] * this.weight[x][y];
            }
        }
    }

    public summa() {
        this.sum = 0;
        for (let x = 0; x < this.input.length; x++) {
            for (let y = 0; y < this.input[x].length; y++) {
                this.sum += this.mul[x][y];
            }
        }
    }

    public result() : boolean {
        return this.lastResult = this.sum >= this.limit;
    }

    public incW() {
        for (let x = 0; x < this.input.length; x++) {
            for (let y = 0; y < this.input[x].length; y++) {
                this.weight[x][y] += this.input[x][y];
            }
        }
    }

    public decW() {
        for (let x = 0; x < this.input.length; x++) {
            for (let y = 0; y < this.input[x].length; y++) {
                this.weight[x][y] -= this.input[x][y];
            }
        }
    }
}

export default Neuron;