function storeCatalogue(arr) {
    let store = new Map()
    for(let row of arr) {
        let [product, price] = row.split(" : ")
        let letter = product[0]
        if(!store.has(letter)) {
            store.set(letter, new Map())
        }
        store.get(letter).set(product, price) 
    }

    function alphaSort(a, b) {
        return a[0].toLowerCase().localeCompare(b[0].toLowerCase())
    }

    let sortedLetters = Array.from(store).sort(alphaSort)
    for(let [key, value] of sortedLetters) {
        console.log(key)
        let sortedProducts = Array.from(value).sort(alphaSort)
        for(let [k, v] of sortedProducts) {
            console.log(`  ${k}: ${v}`)
        }
    }
}

storeCatalogue(["Appricot : 20.4",
    "Fridge : 1500",
    "TV : 1499",
    "Deodorant : 10",
    "Boiler : 300",
    "Apple : 1.25",
    "Anti-Bug Spray : 15",
    "T-Shirt : 10"
])