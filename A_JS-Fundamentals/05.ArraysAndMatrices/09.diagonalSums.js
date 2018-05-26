function diagonalSums(matrix) {
    let right = 0
    let left = 0
    for(let i = 0; i < matrix.length; i++) {
        right += matrix[i][i]
        left += matrix[i][matrix[i].length - 1 - i]
    }
    console.log(right + " " + left)
}

diagonalSums([[3, 5, 17],
            [-1, 7, 14],
            [1, -8, 89]])