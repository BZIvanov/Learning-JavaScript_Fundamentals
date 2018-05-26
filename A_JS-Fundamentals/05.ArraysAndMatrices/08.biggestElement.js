function biggestElelemnt(matrix) {
    let max = Number.NEGATIVE_INFINITY
    matrix.map(el => el.map(x => { if(x > max) {max = x} }))
    console.log(max)
}

biggestElelemnt([ [3, 5, 7, 12],
                [-1, 4, 33, 2],
                [8, 3, 0, 4] ])