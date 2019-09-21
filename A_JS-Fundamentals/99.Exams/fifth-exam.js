// 01. Kompot
function kompot(arr) {
    let kompots = {
        cherry: 0,
        plum: 0,
        peach: 0,
        other: 0
    };
    for (let row of arr) {
        let [fruit, weight] = row.split(' ').filter((x) => x !== '');
        if (fruit === 'cherry') {
            kompots['cherry'] += (+weight * 1000);
        } else if (fruit === 'plum') {
            kompots['plum'] += (+weight * 1000);
        } else if (fruit === 'peach') {
            kompots['peach'] += (+weight * 1000);
        } else {
            kompots['other'] += (+weight * 1000);
        }
    }
    console.log(`Cherry kompots: ${Math.floor(kompots['cherry'] / (25 * 9))}`);
    console.log(`Peach kompots: ${Math.floor(kompots['peach'] / (2.5 * 140))}`);
    console.log(`Plum kompots: ${Math.floor(kompots['plum'] / (10 * 20))}`);
    console.log(`Rakiya liters: ${((kompots['other'] * 0.2) / 1000).toFixed(2)}`);
}
kompot(['apple 6',
    'peach 25.158',
    'strawberry 0.200',
    'peach 0.1',
    'banana 1.55',
    'cherry 20.5',
    'banana 16.8',
    'grapes 205.65',
    'watermelon 20.54'
]);

// 02. F1 race
function race(arr) {
    let pilots = arr.shift().split(' ').filter(x => x !== '');

    let commands = (function() {
        function join(name) {
            if (!pilots.includes(name)) {
                pilots.push(name);
            }
        }
        function crash(name) {
            if (pilots.includes(name)) {
                let index = pilots.indexOf(name);
                pilots.splice(index, 1);
            }
        }
        function pit(name) {
            if (pilots.includes(name)) {
                let index = pilots.indexOf(name);
                if (index !== pilots.length - 1) {
                    pilots.splice(index, 1);
                    pilots.splice(index + 1, 0, name);
                }
            }
        }
        function overtake(name) {
            if (pilots.includes(name)) {
                let index = pilots.indexOf(name);
                if (index !== 0) {
                    pilots.splice(index, 1);
                    pilots.splice(index - 1, 0, name);
                }
            }
        }
        
        return { join, crash, pit, overtake };
    })();

    for (let row of arr) {
        let [action, pilot] = row.split(' ').filter(x => x !== '');
        action = action.toLowerCase();
        commands[action](pilot);
    }

    console.log(pilots.join(' ~ '));
}
race(["Vetel Hamilton Raikonnen Botas Slavi",
"Pit Hamilton",
"Overtake LeClerc",
"Join Ricardo",
"Crash Botas",
"Overtake Ricardo",
"Overtake Ricardo",
"Overtake Ricardo",
"Crash Slavi"]);

// 03. DNAex
function DNAex(arr) {
    let species = {};

    let regex = /([!@#$?a-z]+)=(\d+)--(\d+)<<([a-z]+)/g;
    let match = regex.exec(arr);
    while (match) {
        let gene = match[1].replace(/[!@#$?]+/g, '');
        let geneLength = match[2];
        let countOFGenes = match[3];
        let organism = match[4];

        if (gene.length === +geneLength) {
            if(!species.hasOwnProperty(organism)) {
                species[organism] = 0;
            }
            species[organism] += +countOFGenes;
        }
        match = regex.exec(arr);
    }

    let sortedKeys = Object.keys(species).sort((a, b) => {
        return species[b] - species[a];
    });
    for (let key of sortedKeys) {
        console.log(`${key} has genome size of ${species[key]}`);
    }
}
DNAex(['!@ab?si?di!a@=7--152<<human',
    'b!etu?la@=6--321<<dog',
    '!curtob@acter##ium$=14--230<<dog',
    '!some@thin@g##=9<<human',
    'Stop!'
]);

// 04. F1 championship
function championsip(arr) {
    let pilots = {};
    for (let row of arr) {
        let [team, pilot, points] = row.split(' -> ');
        if (!pilots.hasOwnProperty(team)) {
            pilots[team] = { "___totalPoints___": 0 };
        }
        if (!pilots[team].hasOwnProperty(pilot)) {
            pilots[team][pilot] = 0;
        }
        pilots[team][pilot] += +points;
        pilots[team]["___totalPoints___"] += +points;
    }

    let sortedKeys = Object.keys(pilots).sort((a, b) => {
        return pilots[b]["___totalPoints___"] - pilots[a]["___totalPoints___"];
    }).slice(0,3);
    for (let key of sortedKeys) {
        console.log(`${key}: ${pilots[key]["___totalPoints___"]}`);
        let sortedInnerKeys = Object.keys(pilots[key]).filter((x) => x !== "___totalPoints___").sort((a, b) => {
            return pilots[key][b] - pilots[key][a];
        });
        for (let innerKey of sortedInnerKeys) {
            console.log(`-- ${innerKey} -> ${pilots[key][innerKey]}`);
        }
    }
}
championsip(["Ferrari -> Kimi Raikonnen -> 25",
    "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 10",
    "Mercedes -> Valteri Bottas -> 8",
    "Red Bull -> Max Verstapen -> 6",
    "Red Bull -> Daniel Ricciardo -> 4",
    "Blue Bull -> Mikky Ricciardo -> 10",
]);
