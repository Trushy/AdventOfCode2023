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

function pushGear(toRegister, number) {
    const gear = gears.find(gear => gear.position === toRegister);
                    
    if (gear) {
        gear.number = parseInt(gear.number) * parseInt(number);
        gear.valid = true;
    } else
        gears.push({ position: toRegister, number, valid: false });
}

rl.on('line', (line) => {
    schematic.push(line.split(''));
});

rl.on('close', () => {
    let toRegister = null;

    for (let i = 0; i < schematic.length; i++) {
        let number = "";
        for (let j = 0; j < schematic[i].length; j++) {
            if (!isNaN(schematic[i][j])) {
                number += schematic[i][j];
                if (!toRegister) {
                    toRegister = checkAround(schematic, i, j);
                }
            } else {
                if (number.length && toRegister) {
                    pushGear(toRegister, number);
                }
                number = "";
                toRegister = false;
            }

            if (j === schematic[i].length - 1 && number.length && toRegister) {
                pushGear(toRegister, number);
            }
        }
    }

    for (const gear of gears) {
        if (gear.valid) {
            result += gear.number;
        }
    }
    console.log(result);
});

function checkAround(schematic, i, j) {
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            if (k !== i || l !== j) {
                const cell = checkCell(schematic, k, l);
                if (cell) {
                    return cell;
                }
            }
        }
    }
}

function checkCell(schematic, i, j) {
    if (i >= 0 && i < schematic.length && j >= 0 && j < schematic[i].length) {
        if (schematic[i][j] !== '.' && isNaN(schematic[i][j])) {
            return `${i},${j}`;
        }
    }
    return false;
}
