export function loadImage (url: string) {
    return new Promise<HTMLImageElement>((resolve: Function, reject: Function) => {
        const img = new Image();

        img.onload = function() {
            resolve(img);
        };
        img.onerror = err => reject(err);
        img.src = url;
    });
}

export function drawImg(ctx:CanvasRenderingContext2D, img:HTMLImageElement) {
    ctx.drawImage(img, 0, 0);
}

export function checkingPixel(rgba: number[] | Uint8ClampedArray) {
    const l = rgba.length - 1;
    if(rgba[l] < 5) {
        return false;
    }
    for (let i = 0; i < rgba.length; i++) {
        const pixel = rgba[i];
        if(i === l) {
            return false;
        }
        if(pixel < 250) {
            return true;
        }
    }
    return false;
}

export function getMatrixImg(ctx:CanvasRenderingContext2D, width: number, height: number) {
    const result : number[][] = [];
    for (let x = 0; x < width; x++) {
        let line : number[] = [];
        for (let y = 0; y < height; y++) {
            const data = ctx.getImageData(x, y, 1, 1).data;
            // console.log(checkingPixel(data));
            if(checkingPixel(data)) {
                line.push(1);
            } else {
                line.push(0);
            }
        }
        result.push(line);
    }
    return result;
}