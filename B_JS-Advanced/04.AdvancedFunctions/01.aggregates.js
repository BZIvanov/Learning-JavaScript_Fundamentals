function aggregates(arr) {
    console.log('Sum = ' + arr.reduce((a, b) => a + b))
    console.log('Min = ' + arr.reduce((a, b) => Math.min(a, b)))
    console.log('Max = ' + arr.reduce((a, b) => Math.max(a, b)))
    console.log('Multiply = ' + arr.reduce((a, b) => a * b))
    console.log('Concatenate = ' + arr.reduce((a, b) => '' + a + b))
}

aggregates([2,3,10,5]);