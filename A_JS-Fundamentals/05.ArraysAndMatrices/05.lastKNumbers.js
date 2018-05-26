function lastKNumbers(n, k) {
    let result = [1]
    for(let i = 1; i < n; i++) {
        let sum = 0
        let start = result.length - k
        if(start < 0) {
            start = 0
        }
        let tempArr = result.slice(start)
        for(let num of tempArr) {
            sum += num
        }
        result.push(sum)
    }
    console.log(result)
}

lastKNumbers(6, 3)