var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('../input.txt'),
    output: process.stdout,
    terminal: false,
});

let result = 0;

rl.on('line', (line) => {
    const numbers = line.split(':')[1].trim();
    const winningNumbers = numbers.split('|')[0].trim().split(/\s+/);
    const myNumbers = numbers.split('|')[1].trim().split(/\s+/);
    let correctNumbers = 0;

    for (const number of myNumbers) {
        if (winningNumbers.includes(number)) {
            correctNumbers++;
        }
    }

    if (correctNumbers - 1 >= 0)
        result += Math.pow(2, correctNumbers - 1);

    console.log(result);
});