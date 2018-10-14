function expedition(main, secondary, mods, startPoint) {
    let modified = main.slice(0)
    let iterations = mods.length;
    for(let i = 0; i < iterations; i++) {
        modified = modifier(modified, secondary, mods[i])
    }

    function modifier(m, s, p) {
        let topLeftRow = p[0];
        let endRow = Math.min(topLeftRow + s.length, m.length);
        let topLeftCol = p[1];
        let endCol = Math.min(topLeftCol + s[0].length, m[0].length);
        let smallRow = 0;
        let smallCow = 0;
        for(let row = topLeftRow; row < endRow; row++) {
            for(let col = topLeftCol; col < endCol; col++) {
                if(s[smallRow][smallCow] === 1) {
                    if(m[row][col] === 1) {
                        m[row][col] = 0;
                    } else {
                        m[row][col] = 1;
                    }
                }
                smallCow++;
            }
            smallCow = 0;
            smallRow++;
        }
        return m;
    }

    //console.log(modified)
    let startRow = startPoint[0];
    let startCol = startPoint[1];
    let steps = 0
    while(true) {
        
        if(steps !== 0) {
            let top = checkTop(startRow, startCol)
            let bottom = checkBottom(startRow, startCol)
            let left = checkLeft(startRow, startCol)
            let right = checkRight(startRow, startCol)

            if(!top && !bottom && !left && !right) {
                if(startRow === 0) {
                    console.log(steps)
                    console.log('Top')
                    break;
                } else if(startRow === modified.length - 1) {
                    console.log(steps)
                    console.log('Bottom')
                    break;
                } else if(startCol === 0) {
                    console.log(steps)
                    console.log('Left')
                    break;
                } else if(startCol === modified[0].length - 1) {
                    console.log(steps)
                    console.log('Right')
                    break;
                } else {
                    console.log(steps)

                    //find quadrant
                    let quadrant = 0;
                    let horizontal = modified[0].length / 2 - 1;
                    let vertical = modified.length / 2 - 1;
                    if(startRow <= vertical && startCol > horizontal) {
                        quadrant = 1;
                    } else if(startRow > vertical && startCol > horizontal) {
                        quadrant = 4;
                    } else if(startRow > vertical && startCol <= horizontal) {
                        quadrant = 3;
                    } else if(startRow <= vertical && startCol <= horizontal) {
                        quadrant = 2;
                    }
                    console.log(`Dead end ${quadrant}`)
                    break;
                }
            }

            if(top) {
                modified[startRow][startCol] = 1
                startRow -= 1 
            } else if(bottom) {
                modified[startRow][startCol] = 1
                startRow += 1
            } else if(left) {
                modified[startRow][startCol] = 1
                startCol -= 1
            } else if(right) {
                modified[startRow][startCol] = 1
                startCol += 1
            }
        }
        steps++
    }

    function checkTop(a, b) {
        if(modified[a - 1] && modified[a - 1][b] === 0) {
            return true;
        } else {
            return false;
        }
    }
    function checkBottom(a, b) {
        if(modified[a + 1] && modified[a + 1][b] === 0) {
            return true;
        } else {
            return false;
        }
    }
    function checkLeft(a, b) {
        if(modified[a][b - 1] === 0) {
            return true;
        } else {
            return false;
        }
    }
    function checkRight(a, b) {
        if(modified[a][b + 1] === 0) {
            return true;
        } else {
            return false;
        }
    }
}

expedition([[1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0]],
   [[0, 1, 1],
    [0, 1, 0],
    [1, 1, 0]],
   [[1, 1],
    [2, 3],
    [5, 3]],
   [0, 2]);