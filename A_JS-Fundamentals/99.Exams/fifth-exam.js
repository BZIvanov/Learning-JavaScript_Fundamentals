// 02. F1 race
function race(arr) {
  const pilots = arr
    .shift()
    .split(' ')
    .filter((x) => x !== '');

  const commands = (function () {
    function join(name) {
      if (!pilots.includes(name)) {
        pilots.push(name);
      }
    }
    function crash(name) {
      if (pilots.includes(name)) {
        const index = pilots.indexOf(name);
        pilots.splice(index, 1);
      }
    }
    function pit(name) {
      if (pilots.includes(name)) {
        const index = pilots.indexOf(name);
        if (index !== pilots.length - 1) {
          pilots.splice(index, 1);
          pilots.splice(index + 1, 0, name);
        }
      }
    }
    function overtake(name) {
      if (pilots.includes(name)) {
        const index = pilots.indexOf(name);
        if (index !== 0) {
          pilots.splice(index, 1);
          pilots.splice(index - 1, 0, name);
        }
      }
    }

    return { join, crash, pit, overtake };
  })();

  for (const row of arr) {
    let [action, pilot] = row.split(' ').filter((x) => x !== '');
    action = action.toLowerCase();
    commands[action](pilot);
  }

  console.log(pilots.join(' ~ '));
}
race([
  'Vetel Hamilton Raikonnen Botas Slavi',
  'Pit Hamilton',
  'Overtake LeClerc',
  'Join Ricardo',
  'Crash Botas',
  'Overtake Ricardo',
  'Overtake Ricardo',
  'Overtake Ricardo',
  'Crash Slavi',
]);

// 03. DNAex
function DNAex(arr) {
  const species = {};

  const regex = /([!@#$?a-z]+)=(\d+)--(\d+)<<([a-z]+)/g;
  let match = regex.exec(arr);
  while (match) {
    const gene = match[1].replace(/[!@#$?]+/g, '');
    const geneLength = match[2];
    const countOFGenes = match[3];
    const organism = match[4];

    if (gene.length === +geneLength) {
      if (!species.hasOwnProperty(organism)) {
        species[organism] = 0;
      }
      species[organism] += +countOFGenes;
    }
    match = regex.exec(arr);
  }

  const sortedKeys = Object.keys(species).sort((a, b) => {
    return species[b] - species[a];
  });
  for (const key of sortedKeys) {
    console.log(`${key} has genome size of ${species[key]}`);
  }
}
DNAex([
  '!@ab?si?di!a@=7--152<<human',
  'b!etu?la@=6--321<<dog',
  '!curtob@acter##ium$=14--230<<dog',
  '!some@thin@g##=9<<human',
  'Stop!',
]);

// 04. F1 championship
function championsip(arr) {
  const pilots = {};

  for (const row of arr) {
    const [team, pilot, points] = row.split(' -> ');
    if (!pilots.hasOwnProperty(team)) {
      pilots[team] = { ___totalPoints___: 0 };
    }
    if (!pilots[team].hasOwnProperty(pilot)) {
      pilots[team][pilot] = 0;
    }
    pilots[team][pilot] += +points;
    pilots[team]['___totalPoints___'] += +points;
  }

  const sortedKeys = Object.keys(pilots)
    .sort((a, b) => {
      return pilots[b]['___totalPoints___'] - pilots[a]['___totalPoints___'];
    })
    .slice(0, 3);
  for (const key of sortedKeys) {
    console.log(`${key}: ${pilots[key]['___totalPoints___']}`);
    const sortedInnerKeys = Object.keys(pilots[key])
      .filter((x) => x !== '___totalPoints___')
      .sort((a, b) => {
        return pilots[key][b] - pilots[key][a];
      });
    for (const innerKey of sortedInnerKeys) {
      console.log(`-- ${innerKey} -> ${pilots[key][innerKey]}`);
    }
  }
}
championsip([
  'Ferrari -> Kimi Raikonnen -> 25',
  'Ferrari -> Sebastian Vettel -> 18',
  'Mercedes -> Lewis Hamilton -> 10',
  'Mercedes -> Valteri Bottas -> 8',
  'Red Bull -> Max Verstapen -> 6',
  'Red Bull -> Daniel Ricciardo -> 4',
  'Blue Bull -> Mikky Ricciardo -> 10',
]);
