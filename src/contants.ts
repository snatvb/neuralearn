/**
 * Created by snatvb on 21.01.2018.
 */
declare function require(string:string): any;
const img_0 = require('./img/0.bmp');
const img_1 = require('./img/1.bmp');
const img_2 = require('./img/2.bmp');
const img_3 = require('./img/3.bmp');
const img_4 = require('./img/4.bmp');
const img_5 = require('./img/5.bmp');
const img_5_1 = require('./img/5_1.bmp');
const img_5_2 = require('./img/5_2.bmp');
const img_5_3 = require('./img/5_3.bmp');
const img_5_4 = require('./img/5_4.bmp');
const img_5_5 = require('./img/5_5.bmp');
const img_5_6 = require('./img/5_6.bmp');
const img_5_7 = require('./img/5_7.bmp');
const img_5_8 = require('./img/5_8.bmp');
const img_6 = require('./img/6.bmp');
const img_7 = require('./img/7.bmp');
const img_8 = require('./img/8.bmp');
const img_9 = require('./img/9.bmp');

export interface IFileImage {
    file: string,
    number: string
}


const fileList: IFileImage[] = [
    {
        file: img_0,
        number: "0"
    },
    {
        file: img_1,
        number: "1"
    },
    {
        file: img_2,
        number: "2"
    },
    {
        file: img_3,
        number: "3"
    },
    {
        file: img_4,
        number: "4"
    },
    {
        file: img_5,
        number: "5"
    },
    {
        file: img_5_1,
        number: "5"
    },
    {
        file: img_5_2,
        number: "5"
    },
    {
        file: img_5_3,
        number: "5"
    },
    {
        file: img_5_4,
        number: "5"
    },
    {
        file: img_5_5,
        number: "5"
    },
    {
        file: img_5_6,
        number: "5"
    },
    {
        file: img_5_7,
        number: "5"
    },
    {
        file: img_5_8,
        number: "5"
    },
    {
        file: img_6,
        number: "6"
    },
    {
        file: img_7,
        number: "7"
    },
    {
        file: img_8,
        number: "8"
    },
    {
        file: img_9,
        number: "9"
    },
];
export {
    fileList,
};
