// 01. Bitcoin mining
function bitcoinMining(arr) {
  let goldAmount = 0;
  let bitcoins = 0;
  let firstPurchase = 0;
  for (let i = 0; i < arr.length; i++) {
    if ((i + 1) % 3 === 0) {
      arr[i] = +arr[i] * 0.7;
    }

    goldAmount += +arr[i] * 67.51;

    while (goldAmount >= 11949.16) {
      goldAmount -= 11949.16;
      bitcoins++;
      if (bitcoins === 1 && firstPurchase === 0) {
        firstPurchase = i + 1;
      }
    }
  }

  console.log(`Bought bitcoins: ${bitcoins}`);
  if (firstPurchase) {
    console.log(`Day of the first purchased bitcoin: ${firstPurchase}`);
  }
  console.log(`Left money: ${goldAmount.toFixed(2)} lv.`);
}

// 02. Air polution
function airPolution(matrix, arr) {
  matrix = matrix.map((x) => x.split(' ').map(Number));

  let commands = (function () {
    let breeze = function (n) {
      for (let i = 0; i < 5; i++) {
        if (matrix[n][i] - 15 < 0) {
          matrix[n][i] = 0;
        } else {
          matrix[n][i] -= 15;
        }
      }
    };
    let gale = function (n) {
      for (let i = 0; i < 5; i++) {
        if (matrix[i][n] - 20 < 0) {
          matrix[i][n] = 0;
        } else {
          matrix[i][n] -= 20;
        }
      }
    };
    let smog = function (n) {
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          matrix[row][col] += n;
        }
      }
    };

    return { breeze, gale, smog };
  })();

  for (let act of arr) {
    let [weather, value] = act.split(' ');
    commands[weather](+value);
  }

  let isPoluted = false;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] >= 50) {
        isPoluted = true;
      }
    }
  }

  if (isPoluted) {
    let polutedAreas = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] >= 50) {
          polutedAreas.push(`[${row}-${col}]`);
        }
      }
    }
    console.log('Polluted areas: ' + polutedAreas.join(', '));
  } else {
    console.log('No polluted areas');
  }
}

// 03. Survey parser
function surveyParser(input) {
  let surveyReg = /<svg>((.|\n)*?)<\/svg>/g;
  let catReg = /<cat><text>((.|\n)*?)\[((.|\n)*?)]((.|\n)*?)<\/text><\/cat>\s*<cat>((.|\n)*?)<\/cat>/g;
  let ratingsReg = /<g><val>([0-9]+)<\/val>([0-9]+)<\/g>/g;

  if (!surveyReg.test(input)) {
    console.log('No survey found');
  } else if (!catReg.test(input)) {
    console.log('Invalid format');
  } else {
    catReg = /<cat><text>((.|\n)*)\[((.|\n)*)]((.|\n)*)<\/text><\/cat>\s*<cat>((.|\n)*)<\/cat>/g;
    let matches = catReg.exec(input);
    let label = matches[3];
    let ratings = ratingsReg.exec(input);
    let sum = 0;
    let votesCount = 0;
    while (ratings) {
      let value = Number(ratings[1]);
      let count = Number(ratings[2]);

      if (value <= 0 || value > 10) {
        ratings = ratingsReg.exec(input);
        continue;
      }
      sum += value * count;
      votesCount += count;
      ratings = ratingsReg.exec(input);
    }

    let avg = +(sum / votesCount).toFixed(2);
    console.log(`${label}: ${avg}`);
  }
}

// 04. Game of epicness
function gameOfEpicness(objects, arr) {
  let kingdoms = {};
  //arrange kingdoms
  for (let obj of objects) {
    let kd = obj['kingdom'];
    let gr = obj['general'];
    let am = obj['army'];
    if (!kingdoms.hasOwnProperty(kd)) {
      kingdoms[kd] = { ___totalWins___: 0, ___totalLosses___: 0 };
    }
    if (!kingdoms[kd].hasOwnProperty(gr)) {
      kingdoms[kd][gr] = { wins: 0, losses: 0, army: 0 };
    }
    kingdoms[kd][gr]['army'] += +am;
  }

  //arrange fights
  for (let row of arr) {
    if (row[0] === row[2]) {
      continue;
    }
    if (!kingdoms[row[0]] || !kingdoms[row[2]]) {
      continue;
    }
    if (
      kingdoms[row[0]].hasOwnProperty(row[1]) &&
      kingdoms[row[2]].hasOwnProperty(row[3])
    ) {
      let attackingArmy = kingdoms[row[0]][row[1]]['army'];
      let defendingArmy = kingdoms[row[2]][row[3]]['army'];
      if (attackingArmy > defendingArmy) {
        kingdoms[row[0]][row[1]]['army'] = Math.floor(
          kingdoms[row[0]][row[1]]['army'] * 1.1
        );
        kingdoms[row[2]][row[3]]['army'] = Math.floor(
          kingdoms[row[2]][row[3]]['army'] * 0.9
        );
        kingdoms[row[0]][row[1]]['wins']++;
        kingdoms[row[2]][row[3]]['losses']++;
        kingdoms[row[0]]['___totalWins___']++;
        kingdoms[row[2]]['___totalLosses___']++;
      } else if (attackingArmy < defendingArmy) {
        kingdoms[row[0]][row[1]]['army'] = Math.floor(
          kingdoms[row[0]][row[1]]['army'] * 0.9
        );
        kingdoms[row[2]][row[3]]['army'] = Math.floor(
          kingdoms[row[2]][row[3]]['army'] * 1.1
        );
        kingdoms[row[0]][row[1]]['losses']++;
        kingdoms[row[2]][row[3]]['wins']++;
        kingdoms[row[0]]['___totalLosses___']++;
        kingdoms[row[2]]['___totalWins___']++;
      }
    }
  }

  //print results
  let winner = Object.keys(kingdoms).sort((a, b) => {
    return (
      kingdoms[b]['___totalWins___'] - kingdoms[a]['___totalWins___'] ||
      kingdoms[a]['___totalLosses___'] - kingdoms[b]['___totalLosses___'] ||
      a.localeCompare(b)
    );
  })[0];
  console.log(`Winner: ${winner}`);
  let sortedGenerals = Object.keys(kingdoms[winner])
    .filter((x) => x !== '___totalWins___' && x !== '___totalLosses___')
    .sort((a, b) => {
      return kingdoms[winner][b]['army'] - kingdoms[winner][a]['army'];
    });
  for (let gen of sortedGenerals) {
    console.log(`/\\general: ${gen}`);
    console.log(`---army: ${kingdoms[winner][gen]['army']}`);
    console.log(`---wins: ${kingdoms[winner][gen]['wins']}`);
    console.log(`---losses: ${kingdoms[winner][gen]['losses']}`);
  }
}
