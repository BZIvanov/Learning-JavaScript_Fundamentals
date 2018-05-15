function letterOccurrencies(str, letter) {
    let counter = 0
    for( let i = 0; i < str.length; i++) {
        if(letter === str[i]) {
            counter++
        }
    }
    console.log(counter)
}

letterOccurrencies('hello', 'l')