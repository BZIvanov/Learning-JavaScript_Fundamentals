function countWords(input) {
    input = input.join('').split(/\W+/g).filter(x => x !== '')
    let result = {}

    for(let i = 0; i < input.length; i++) {
        if(result.hasOwnProperty(input[i])) {
            result[input[i]] += 1
        } else {
            result[input[i]] = 1
        }
    }
    console.log(JSON.stringify(result))
}

countWords(["Far too slow, you're far too slow."])