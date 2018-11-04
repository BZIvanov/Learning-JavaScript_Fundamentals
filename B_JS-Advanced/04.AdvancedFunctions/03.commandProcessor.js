function processor(arr) {
    let commandProcessor = (function() {
        let result = ''
        return {
            'append': (str) => { result += str },
            'removeStart': (num) => { result = result.substring(num) },
            'removeEnd': (num) => { result = result.substring(0, result.length - num) },
            'print': () => { console.log(result) }
        }
    })()

    for(const comm of arr) {
        let [command, item] = comm.split(' ')
        commandProcessor[command](item)
    }
}

processor(['append 123',
'append 45',
'removeStart 2',
'removeEnd 1',
'print']);