function insideVolume(input) {
    for(let i = 0; i < input.length; i += 3) {
        let x = Number(input[i])
        let y = Number(input[i + 1])
        let z = Number(input[i + 2])

        if (isInside(x, y, z)) {
            console.log("inside")
        } else {
            console.log("outside")
        }
    }

    function isInside(a, b, c) {
        let x1 = 10, x2 = 50;
        let y1 = 20, y2 = 80;
        let z1 = 15, z2 = 50;

        if(a >= x1 && a <= x2) {
            if(b >= y1 && b <= y2) {
                if(c >= z1 && c <= z2) {
                    return true
                }
            }
        } else {
            return false
        }
    }
}

insideVolume([13.1, 50, 31.5, 
            50, 80, 50,
            -5, 18, 43]
)
