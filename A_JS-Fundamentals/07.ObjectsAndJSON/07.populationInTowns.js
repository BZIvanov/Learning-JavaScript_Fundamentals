function populationInTowns(arr) {
    let myMap = new Map()

    for(let str of arr) {
        let [town, population] = str.split(/\s*<->\s*/)
        if(!myMap.has(town)) {
            myMap.set(town, 0)
        }
        myMap.set(town, myMap.get(town) + +population)
    }

    for(let [key, value] of myMap) {
        console.log(`${key} : ${value}`)
    }
}

populationInTowns(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000'])