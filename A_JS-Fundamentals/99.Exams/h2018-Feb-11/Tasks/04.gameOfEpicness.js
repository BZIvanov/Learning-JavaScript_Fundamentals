function gameOfEpicness(objects, arr) {
    let kingdoms = {};
    //arrange kingdoms
    for(let obj of objects) {
        let kd = obj['kingdom'];
        let gr = obj['general'];
        let am = obj['army'];
        if(!kingdoms.hasOwnProperty(kd)) {
            kingdoms[kd] = { '___totalWins___': 0, '___totalLosses___': 0 };
        }
        if(!kingdoms[kd].hasOwnProperty(gr)) {
            kingdoms[kd][gr] = { 'wins': 0, 'losses': 0, 'army': 0 };
        }
        kingdoms[kd][gr]['army'] += +am;
    }

    //arrange fights
    for(let row of arr) {
        if(row[0] === row[2]) {
            continue;
        }
        if(!kingdoms[row[0]] || !kingdoms[row[2]]) {
            continue;
        }
        if(kingdoms[row[0]].hasOwnProperty(row[1]) && kingdoms[row[2]].hasOwnProperty(row[3])) {
            let attackingArmy = kingdoms[row[0]][row[1]]['army'];
            let defendingArmy = kingdoms[row[2]][row[3]]['army'];
            if(attackingArmy > defendingArmy) {
                kingdoms[row[0]][row[1]]['army'] = Math.floor(kingdoms[row[0]][row[1]]['army'] * 1.1)
                kingdoms[row[2]][row[3]]['army'] = Math.floor(kingdoms[row[2]][row[3]]['army'] * 0.9)
                kingdoms[row[0]][row[1]]['wins']++;
                kingdoms[row[2]][row[3]]['losses']++;
                kingdoms[row[0]]['___totalWins___']++;
                kingdoms[row[2]]['___totalLosses___']++;
            } else if(attackingArmy < defendingArmy) {
                kingdoms[row[0]][row[1]]['army'] = Math.floor(kingdoms[row[0]][row[1]]['army'] * 0.9)
                kingdoms[row[2]][row[3]]['army'] = Math.floor(kingdoms[row[2]][row[3]]['army'] * 1.1)
                kingdoms[row[0]][row[1]]['losses']++;
                kingdoms[row[2]][row[3]]['wins']++;
                kingdoms[row[0]]['___totalLosses___']++;
                kingdoms[row[2]]['___totalWins___']++;
            }
        }
    }

    //print results
    let winner = Object.keys(kingdoms).sort((a, b) => {
        return kingdoms[b]['___totalWins___'] - kingdoms[a]['___totalWins___'] || kingdoms[a]['___totalLosses___'] - kingdoms[b]['___totalLosses___'] || a.localeCompare(b);
    })[0];
    console.log(`Winner: ${winner}`);
    let sortedGenerals = Object.keys(kingdoms[winner]).filter((x) => (x !== '___totalWins___' && x !== '___totalLosses___')).sort((a, b) => {
        return kingdoms[winner][b]['army'] - kingdoms[winner][a]['army']
        })
    for(let gen of sortedGenerals) {
        console.log(`/\\general: ${gen}`);
        console.log(`---army: ${kingdoms[winner][gen]['army']}`);
        console.log(`---wins: ${kingdoms[winner][gen]['wins']}`);
        console.log(`---losses: ${kingdoms[winner][gen]['losses']}`);
    }
}