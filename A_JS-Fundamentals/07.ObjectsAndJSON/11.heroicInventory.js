function heroicInventory(arr) {
    let result = []
    for(let row of arr) {
        let [name, level, items] = row.split(/\s*\/\s*/)
        level = Number(level)
        items ? items = items.split(/\W+/g) : items = []
    
        let tempObject = { name, level, items }
        result.push(tempObject)
    }
    console.log(JSON.stringify(result))
}

heroicInventory(["Isacc / 25 / Apple",
                "Derek / 12 / BarrelVest, DestructionSword",
                "Hes / 1 "])