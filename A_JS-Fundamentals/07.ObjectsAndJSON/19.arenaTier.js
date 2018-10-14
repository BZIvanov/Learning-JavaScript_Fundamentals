function arenaTier(arr) {
    let gladiators = {};

    for(let row of arr) {
        if(row.indexOf(' -> ') > -1) {
            let [glad, skill, level] = row.split(' -> ');
            if(!gladiators.hasOwnProperty(glad)) {
                gladiators[glad] = { '___total___': 0 };
            }
            if(!gladiators[glad].hasOwnProperty(skill)) {
                gladiators[glad][skill] = 0;
            }
            if(gladiators[glad][skill] < +level) {
                let previousValue = gladiators[glad][skill];
                gladiators[glad][skill] = +level;
                gladiators[glad]['___total___'] += (+level - previousValue);
            }
            
        } else if(row.indexOf(' vs ') > -1) {
            let [first, second] = row.split(' vs ');
            if(gladiators.hasOwnProperty(first) && gladiators.hasOwnProperty(second)) {
                let firstSkills = Object.keys(gladiators[first]).filter((x) => x !== '___total___');
                let secondSkills = Object.keys(gladiators[second]).filter((x) => x !== '___total___');
                let haveSkillInCommon = false;
                for(let s of firstSkills) {
                    if(secondSkills.includes(s)) {
                        haveSkillInCommon = true;
                    }
                }

                if(haveSkillInCommon) {
                    if(gladiators[first]['___total___'] > gladiators[second]['___total___']) {
                        delete gladiators[second];
                    } else {
                        delete gladiators[first];
                    }
                }
            }
        } else {
            let sortedKeys = Object.keys(gladiators).sort((a, b) => {
                return gladiators[b]['___total___'] - gladiators[a]['___total___'] || a.localeCompare(b);
            })
            for(let key of sortedKeys) {
                console.log(`${key}: ${gladiators[key]['___total___']} skill`);
                let sortedInnerKeys = Object.keys(gladiators[key]).filter((x) => x !== '___total___').sort((a,b) => {
                    return gladiators[key][b] - gladiators[key][a] || a.localeCompare(b);
                })
                for(let innerKey of sortedInnerKeys) {
                    console.log(`- ${innerKey} <!> ${gladiators[key][innerKey]}`);
                }
            }
            break;
        }
    }
}

// arenaTier(['Pesho -> BattleCry -> 400',
//     'Gosho -> PowerPunch -> 300',
//     'Stamat -> Duck -> 200',
//     'Stamat -> Tiger -> 250',
//     'Ave Cesar']);

arenaTier(['Pesho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho',
    'Ave Cesar']);