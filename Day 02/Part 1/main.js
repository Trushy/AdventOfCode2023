var fs = require('fs');
var readline = require('readline');

const maxColors = {
    red: 12,
    green: 13,
    blue: 14
}

const rl = readline.createInterface({
    input: fs.createReadStream('../input.txt'),
    output: process.stdout,
    terminal: false,
});

let result = 0;

rl.on('line', (line) => {
    line = line.split(':');
    const gameId = parseInt(line[0].slice(5));
    const sets = line[1].split(';');
    let isValid = true;

    for (const set of sets) {
        const parts = set.split(',');

        for (const part of parts) {
            const cube = part.trim().split(' ');
            const nbr = parseInt(cube[0]);
            const color = cube[1];

            if (nbr > maxColors[color]) {
                isValid = false;
                break;
            }
        }
    }

    if (isValid)
        result += gameId;
    console.log(result);
});