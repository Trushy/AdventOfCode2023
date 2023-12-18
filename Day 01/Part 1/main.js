var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('../input.txt'),
    output: process.stdout,
    terminal: false,
});

let total = 0;

rl.on('line', (line) => {
    let digit1, digit2;
    let tmp = '';

    for (const char of line) {
        tmp += char;

        if (!isNaN(char) && !digit1)
            digit1 = parseInt(char);

        if (!isNaN(char))
            digit2 = parseInt(char);
    }

    total += digit1 * 10 + digit2;
    console.log(total);
});