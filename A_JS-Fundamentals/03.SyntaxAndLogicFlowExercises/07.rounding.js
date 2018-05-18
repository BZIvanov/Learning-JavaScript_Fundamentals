function rounding(arr) {
    [num, d] = [arr[0], arr[1]]
    if(d > 15) {
        d = 15
    }
    let zeroShifter = Math.pow(10, d)
    console.log(Math.round(num * zeroShifter) / zeroShifter)
}

rounding([10.5, 3])
