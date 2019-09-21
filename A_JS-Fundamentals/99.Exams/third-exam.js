// 01. Gladiator expenses
function gladiatorExpenses(loses, helm, sword, shield, armor) {
    let expenses = 0;

    for (let i = 1; i <= loses; i++) {
        if (i % 2 === 0) {
            expenses += helm;
        }
        if (i % 3 === 0) {
            expenses += sword;
        } 
        if (i % 6 === 0) {
            expenses += shield;
        }
        if (i % 12 === 0) {
            expenses += armor;
        }
    }
    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}

// 02. Gladiator inventory
function gladiatorInventory(arr) {
    let inventory = arr.shift().split(' ');

    let commands = (function() {
        let Buy = function(item) {
            if (!inventory.includes(item)) {
                inventory.push(item);
            }
        }
        let Trash = function(item) {
            let index = inventory.indexOf(item)
            if (index > -1) {
                inventory.splice(index, 1);
            }
        }
        let Repair = function(item) {
            let index = inventory.indexOf(item)
            if (index > -1) {
                let item = inventory.splice(index, 1);
                inventory.push(item[0]);
            }
        }
        let Upgrade = function(str) {
            let [item, up] = str.split('-');
            let index = inventory.indexOf(item);
            if (index > -1) {
                let upgraded = item + ':' + up;
                inventory.splice(index + 1, 0, upgraded);
            }
        }
        let Fight = function() {
            console.log(inventory.join(' '));
        }
 
        return { Buy, Trash, Repair, Upgrade, Fight };
    })();

    for (let row of arr) {
        let [com, item] = row.split(' ');
        if (com === 'Fight!') {
            com = com.substring(0, com.length - 1);
        }
        commands[com](item);
    }
}

// 03. Ancient vs Memory
function ancientMemory(arr) {
    let numbers = arr.join(' ').split('32656 19759 32763').filter(x => x !== '').map(z => z.trim()).map(y => y.split(' '));

    let result = [];
    for (let row of numbers) {
        let wordLength = +row[1];
        let word = '';
        for (let i = 3; i < wordLength + 3; i++) {
            word += String.fromCharCode(row[i]);
        }
        result.push(word);
    }
    console.log(result.join('\n'));
}

// 04. Arena tier
function arenaTier(arr) {
    let gladiators = {};

    for (let row of arr) {
        let type = row.indexOf('->');
        if (type > -1 && row !== 'Ave Cesar') {
            let [name, skill, level] = row.split(' -> ');

            if (!gladiators.hasOwnProperty(name)) {
                gladiators[name] = { '__total__': 0 };
            }
            if (!gladiators[name].hasOwnProperty(skill)) {
                gladiators[name][skill] = 0;
            }
            if (gladiators[name][skill] < level) {
                gladiators[name][skill] = +level;
                gladiators[name]['__total__'] += +level;
            }
        } else if (row !== 'Ave Cesar') {
            let [g1, g2] = row.split(' vs ');

            if(gladiators.hasOwnProperty(g1) && gladiators.hasOwnProperty(g2)) {
                let g1Skills = Object.keys(gladiators[g1]).filter(x => x !== '__total__');
                let g2Skills = Object.keys(gladiators[g2]).filter(x => x !== '__total__');

                let haveSame = false;
                let skillName = '';
                for (let prop of g1Skills) {
                    if (g2Skills.includes(prop)) {
                        haveSame = true;
                        skillName = prop;
                        break;
                    }
                }

                if (haveSame) {
                    if(gladiators[g1][skillName] > gladiators[g2][skillName]) {
                        delete gladiators[g2];
                    } else {
                        delete gladiators[g1];
                    }
                }
            }
        } else {
            break;
        }
    }

    // sorting logic below
    let sortedKeys = Object.keys(gladiators).sort((a, b) => {
        let diff = gladiators[b]['__total__'] - gladiators[a]['__total__'];
        if (diff === 0) {
            return a.localeCompare(b);
        }
        return diff;
    });
    
    for (let key of sortedKeys) {
        let nestSorted = Object.keys(gladiators[key]).filter(x => x !== '__total__').sort((a, b) => {
            let diff = gladiators[key][b] - gladiators[key][a];
            if (diff === 0) {
                return a.localeCompare(b);
            }
            return diff;
        })

        console.log(`${key}: ${gladiators[key]['__total__']} skill`);
        for (let nest of nestSorted) {
            console.log(`- ${nest} <!> ${gladiators[key][nest]}`);
        }
    }
}
