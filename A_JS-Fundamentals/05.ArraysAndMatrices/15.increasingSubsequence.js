function increasingSubsequence(arr) {
    let result = []
    let max = Number.NEGATIVE_INFINITY
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] >= max) {
            result.push(arr[i])
            max = arr[i]
        }
    }
    console.log(result.join('\n'))
}

increasingSubsequence([1, 2, 8, 4, 10, 12, 3, 2, 24])