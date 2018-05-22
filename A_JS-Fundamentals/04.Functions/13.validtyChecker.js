function validtyChecker(arr) {
    [a, b, c, d] = [arr[0], arr[1], arr[2], arr[3]]
    
    if(checkIt(a, b, 0, 0)) {
        printIt(a, b, 0, 0, "valid")
    } else {
        printIt(a, b, 0, 0, "invalid")
    }
    if(checkIt(c, d, 0, 0)) {
        printIt(c, d, 0, 0, "valid")
    } else {
        printIt(c, d, 0, 0, "invalid")
    }
    if(checkIt(a, b, c, d)) {
        printIt(a, b, c, d, "valid")
    } else {
        printIt(a, b, c, d, "invalid")
    }

    function checkIt(x1, y1, x2, y2) {
        let sideA = Math.max(x1, x2) - Math.min(x1, x2)
        let sideB = Math.max(y1, y2) - Math.min(y1, y2)
        let distance = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2))
        if (distance === Math.round(distance)) {
            return true
        }
        return false
    }

    function printIt(p1, p2, p3, p4, word) {
        console.log(`{${p1}, ${p2}} to {${p3}, ${p4}} is ${word}`)
    }
}

validtyChecker([2, 1, 1, 1])