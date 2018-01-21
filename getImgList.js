/**
 * Created by snatvb on 21.01.2018.
 */

const fs = require('fs');
const path = require('path');

const result = fs.readdirSync(path.join(__dirname, 'img'));
console.log(result);
