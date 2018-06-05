function matrix(input){
    let sum = input[0].reduce((a, b) => a + b, 0);
    for(let row in input){
        let rowSum = input[row].reduce((a, b) => a + b, 0);
        if(rowSum != sum){
            return false
        }
    }
    let calcSum = function(arr) {
        return arr.reduce((a, b) => a + b, 0);
    };
    let colSums = input.map(function(row, i) {
        return calcSum(input.map((row) => row[i]));
    });
    for(let s of colSums){
        if(s != sum){
            return false;
        }
    }
    return true;
}

console.log(magicalMatrices([[4, 5, 6],
                [6, 5, 4],
                [5, 5, 5]]));

console.log(magicalMatrices([[11, 32, 45],
                [21, 0, 1],
                [21, 1, 1]]));

console.log(magicalMatrices([[1, 0, 0],
                [0, 0, 1],
                [0, 1, 0]]));