function airPolution(matrix, arr) {
    matrix = matrix.map(x => x.split(' ').map(Number))

    let commands = (function() {
        let breeze = function(n) {
            for(let i = 0; i < 5; i++) {
                if (matrix[n][i] - 15 < 0) {
                    matrix[n][i] = 0
                } else  {
                    matrix[n][i] -= 15;
                }
            }
        }
        let gale = function(n) {
            for(let i = 0; i < 5; i++) {
                if (matrix[i][n] - 20 < 0) {
                    matrix[i][n] = 0
                } else  {
                    matrix[i][n] -= 20;
                }
            }
        }
        let smog = function(n) {
            for(let row = 0; row < 5; row++) {
                for(let col = 0; col < 5; col++) {
                    matrix[row][col] += n
                }
            }
        }

        return { breeze, gale, smog }
    })()

    for(let act of arr) {
        let [weather, value] = act.split(' ')
        commands[weather](+value)
    }

    let isPoluted = false;
    for(let row = 0; row < 5; row++) {
        for(let col = 0; col < 5; col++) {
            if(matrix[row][col] >= 50) {
                isPoluted = true
            }
        }
    }

    if(isPoluted) {
        let polutedAreas = []
        for(let row = 0; row < 5; row++) {
            for(let col = 0; col < 5; col++) {
                if(matrix[row][col] >= 50) {
                    polutedAreas.push(`[${row}-${col}]`)
                }
            }
        }
        console.log('Polluted areas: ' + polutedAreas.join(', '))
    } else {
        console.log('No polluted areas')
    }
}