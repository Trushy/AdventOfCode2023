var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('../input.txt'),
    output: process.stdout,
    terminal: false,
});

const schematic = []
let result = 0;
let gears = []

rl.on('line', (line) => {
    schematic.push(line.split(''));
});

rl.on('close', () => {
    let toRegister = false;

    for (let i = 0; i < schematic.length; i++) {
        let number = "";
        for (let j = 0; j < schematic[i].length; j++) {
            if (!isNaN(schematic[i][j])) {
                number += schematic[i][j];
                if (!toRegister) {
                    toRegister = checkAround(schematic, i, j);
                }
            } else {
                if (number.length && toRegister)
                    result += parseInt(number);
                number = "";
                toRegister = false;
            }

            if (j === schematic[i].length - 1 && number.length && toRegister) {
                result += parseInt(number);
            }
        }
    }

    console.log(result);
});

function checkAround(schematic, i, j) {
    return checkCell(schematic, i - 1, j - 1) ||
    checkCell(schematic, i - 1, j) ||
    checkCell(schematic, i - 1, j + 1) ||
    checkCell(schematic, i, j - 1) ||
    checkCell(schematic, i, j + 1) ||
    checkCell(schematic, i + 1, j - 1) ||
    checkCell(schematic, i + 1, j) ||
    checkCell(schematic, i + 1, j + 1);
}

function checkCell(schematic, i, j) {
    if (i >= 0 && i < schematic.length && j >= 0 && j < schematic[i].length) {
        if (schematic[i][j] !== '.' && isNaN(schematic[i][j])) {
            return `${i},${j}`;
        }
    }
    return false;
}
