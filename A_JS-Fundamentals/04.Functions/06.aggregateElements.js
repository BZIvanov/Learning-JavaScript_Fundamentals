function solve(arr) {
    aggregate(arr, 0, (a, b) => a + b)
    aggregate(arr, 0, (a, b) => a + 1 / b)
    aggregate(arr, '', (a, b) => a + b)

    function aggregate(array, init, func) {
        for(let i = 0; i < array.length; i++) {
            init = func(init, array[i])
        }
        console.log(init)
    }
}

solve([1, 2, 3])
