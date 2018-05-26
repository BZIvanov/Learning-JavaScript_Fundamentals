function firstAndLastKNumbers(arr) {
    let k = arr.shift()

    console.log(arr.slice(0, k))
    console.log(arr.slice(arr.length - k))
}

firstAndLastKNumbers([3, 6, 7, 8, 9])