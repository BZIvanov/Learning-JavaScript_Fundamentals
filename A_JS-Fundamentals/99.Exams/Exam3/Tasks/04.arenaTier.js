function arenaTier(arr) {
    let gladiators = {}

    for(let row of arr) {
        let type = row.indexOf('->')
        if(type > -1 && row !== 'Ave Cesar') {
            let [name, skill, level] = row.split(' -> ')

            if(!gladiators.hasOwnProperty(name)) {
                gladiators[name] = { '__total__': 0 };
            }
            if(!gladiators[name].hasOwnProperty(skill)) {
                gladiators[name][skill] = 0;
            }
            if(gladiators[name][skill] < level) {
                gladiators[name][skill] = +level
                gladiators[name]['__total__'] += +level
            }
        } else if(row !== 'Ave Cesar') {
            let [g1, g2] = row.split(' vs ')

            if(gladiators.hasOwnProperty(g1) && gladiators.hasOwnProperty(g2)) {
                let g1Skills = Object.keys(gladiators[g1]).filter(x => x !== '__total__')
                let g2Skills = Object.keys(gladiators[g2]).filter(x => x !== '__total__')

                let haveSame = false
                let skillName = ''
                for(let prop of g1Skills) {
                    if(g2Skills.includes(prop)) {
                        haveSame = true
                        skillName = prop
                        break;
                    }
                }

                if(haveSame) {
                    if(gladiators[g1][skillName] > gladiators[g2][skillName]) {
                        delete gladiators[g2]
                    } else {
                        delete gladiators[g1]
                    }
                }
            }
        } else {
            break;
        }
    }

    // sorting logic below
    let sortedKeys = Object.keys(gladiators).sort((a, b) => {
        let diff = gladiators[b]['__total__'] - gladiators[a]['__total__']
        if(diff === 0) {
            return a.localeCompare(b)
        }
        return diff
    })
    
    for(let key of sortedKeys) {
        let nestSorted = Object.keys(gladiators[key]).filter(x => x !== '__total__').sort((a, b) => {
            let diff = gladiators[key][b] - gladiators[key][a]
            if(diff === 0) {
                return a.localeCompare(b)
            }
            return diff
        })

        console.log(`${key}: ${gladiators[key]['__total__']} skill`)
        for(let nest of nestSorted) {
            console.log(`- ${nest} <!> ${gladiators[key][nest]}`)
        }
    }
}