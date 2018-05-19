function figureFourSquares(n) {
    let result = ""
    let symbols = n - 2
    if (n % 2 === 0) {
        n -= 1
    }

    for(let i = 1; i <= n; i++) {
        if(i === 1 || i === n || i === Math.floor((1 + n) / 2)) {
            result += `+${'-'.repeat(symbols)}+${'-'.repeat(symbols)}+\n`
        } else {
            result += `|${' '.repeat(symbols)}|${' '.repeat(symbols)}|\n`
        }
    }
    console.log(result)
}

figureFourSquares(6)
