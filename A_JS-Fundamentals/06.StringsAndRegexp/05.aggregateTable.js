function aggregateTable(input) {
    let sum = 0
    let towns = []
    for(let i of input) {
        [town, price] = i.split('|').filter(x => x !== '')
        towns.push(town.trim())
        sum += Number(price)
    }
    console.log(towns.join(', '))
    console.log(sum)
}

aggregateTable(['| Sofia           | 300',
'| Veliko Tarnovo  | 500',
'| Yambol          | 275'])