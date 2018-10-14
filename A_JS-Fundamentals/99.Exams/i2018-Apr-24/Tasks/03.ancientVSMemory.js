function ancientMemory(arr) {
    let numbers = arr.join(' ').split('32656 19759 32763').filter(x => x !== '').map(z => z.trim()).map(y => y.split(' '))

    let result = [];
    for(let row of numbers) {
        let wordLength = +row[1]

        let word = ''
        for(let i = 3; i < wordLength + 3; i++) {
            word += String.fromCharCode(row[i])
        }
        result.push(word)
    }
    console.log(result.join('\n'))
}