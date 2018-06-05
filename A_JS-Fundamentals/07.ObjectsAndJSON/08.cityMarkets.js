function cityMarkets(arr) {
    let myMap = new Map() 
    for(let row of arr) {
        let [town, product, quanity, price] = row.split(/ -> | : /g)
        if(!myMap.has(town)) {
            myMap.set(town, new Map())
        }
        myMap.get(town).set(product, Number(quanity) * Number(price))
    }

    for(let [key, value] of myMap) {
        console.log(`Town - ${key}`)
        for(let [k, v] of value) {
            console.log(`$$$${k} : ${v}`)
        }
    }
}

cityMarkets(['Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3'])