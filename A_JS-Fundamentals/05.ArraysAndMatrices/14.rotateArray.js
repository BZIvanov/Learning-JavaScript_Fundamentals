function rotateArray(input) {
    let n = Number(input.pop())
    n = n % input.length;

    let zero = input[0]
    for(let i = 0; i < n; i++) {
        let last = input[input.length - 1]
        input.pop()
        input.unshift(last)
    }
    console.log(input.join(' '))
}

rotateArray(["Banana", "Orange", "Coconut", "Apple", "15"])
rotateArray(["1", "2", "3", "4", "2"])