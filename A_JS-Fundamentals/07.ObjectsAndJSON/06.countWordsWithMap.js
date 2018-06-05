function countWordsWithMap(input) {
    let myMap = new Map()
    input.join(' ').toLowerCase().split(/[^\w]+/).filter(x => x !== '').forEach(word => {
        if(!myMap.has(word)) {
            myMap.set(word, 0)
        }
        myMap.set(word, myMap.get(word) + 1)
    })

    let sortedKeys = Array.from(myMap.keys()).sort()

    // values in the sortedKeys are the keys from myMap
    for(let value of sortedKeys) {
        console.log(`'${value}' -> ${myMap.get(value)} times`)
    }
}

countWordsWithMap(["Far too slow, you're far too slow.", "hello"])