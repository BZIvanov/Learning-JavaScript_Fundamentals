function catalogue(arr) {
    let list = {};
    for(let row of arr) {
        let [item, price] = row.split(' : ');
        let capLetter = item[0].toUpperCase();
        if(!list.hasOwnProperty(capLetter)) {
            list[capLetter] = {};
        }
        list[capLetter][item] = +price;
    }

    let sortedKeys = Object.keys(list).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    for(let key of sortedKeys) {
        console.log(key)
        let sortedInnerKeys = Object.keys(list[key]).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        for(let innerKey of sortedInnerKeys) {
            console.log(`  ${innerKey}: ${list[key][innerKey]}`)
        }
    }
}

catalogue(["Appricot : 20.4",
"Fridge : 1500",
"TV : 1499",
"Deodorant : 10",
"Boiler : 300",
"Apple : 1.25",
"Anti-Bug Spray : 15",
"T-Shirt : 10"]);