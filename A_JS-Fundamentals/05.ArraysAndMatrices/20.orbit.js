function orbitOfMatrix(arr){
    let [width, height, x, y] = arr;
    let matrix = [];
    //fill matrix with zeroes
    for(let i = 0; i < width; i++) {
        let rs = [];
        for(let j = 0; j < height; j++) {
            rs.push(0);
        }
        matrix.push(rs);
    }
    let number = 2;
    let colEnd = y;
    let rowEnd = x;
    let colStart = y;
    let rowStart = x;
    matrix[x][y] = 1;
    let counterRowEnd = rowEnd;
    let counterColEnd = colEnd;
    let counterRowStart = rowEnd;
    let counterColStart = colEnd;
    while(true)
    {
        counterRowEnd++;
        counterColEnd++;
        counterRowStart--;
        counterColStart--;
        //check if out of matrix size
        if(counterRowEnd > width-1 && counterColEnd > height-1 && counterRowStart < 0 && counterColStart < 0)break;
        if(rowEnd >= width-1) rowEnd = width-1;
        else rowEnd++;
        if(colEnd >= height-1) colEnd = height-1;
        else colEnd++;
        if(rowStart == 0) rowStart = 0;
        else rowStart--;
        if(colStart == 0) colStart = 0;
        else colStart--;
        for (let i = rowStart; i <= rowEnd; i++) {
            for (let j = colStart; j <= colEnd; j++) {
                if(matrix[i][j] == 0){matrix[i][j] = number;}
            }
        }
        number++;
    }
    for(let row of matrix){
        console.log(row.join(' '));
    }
}

orbitOfMatrix([4, 4, 0, 0]);
