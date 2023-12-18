var fs = require('fs');
var readline = require('readline');

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function includeDigit(str) {
    let result;

    for (const digit of digits) {
        if (str.includes(digit)) {
            result = digits.indexOf(digit) + 1;
        }
    }

    return result;
}

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
        const digit = includeDigit(tmp);

        if (digit && !digit1)
            digit1 = digit;
        else if (!isNaN(char) && !digit1)
            digit1 = parseInt(char);

        if (digit) {
            digit2 = digit;
            tmp = tmp[tmp.length - 1];
        }
        if (!isNaN(char))
            digit2 = parseInt(char);
    }

    total += digit1 * 10 + digit2;
    console.log(total);
});