var fs = require('fs');
var readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('../input.txt'),
    output: process.stdout,
    terminal: false,
});

let result = 0;

rl.on('line', (line) => {
    line = line.split(':');
    const sets = line[1].split(';');
    const minCubes = {
        red: 0,
        green: 0,
        blue: 0,
    }

    for (const set of sets) {
        const parts = set.split(',');

        for (const part of parts) {
            const cube = part.trim().split(' ');
            const nbr = parseInt(cube[0]);
            const color = cube[1];

            if (nbr > minCubes[color]) {
                minCubes[color] = nbr;
            }
        }
    }

    result += minCubes.red * minCubes.green * minCubes.blue;
    console.log(result);
});