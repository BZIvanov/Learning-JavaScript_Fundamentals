function distanceBetweenPoints(x1, y1, x2, y2) {
    let pointA = { x: x1, y: y1 }
    let pointB = { x: x2, y: y2 }

    let sideA = Math.pow(Math.abs(pointA.x - pointB.x), 2)
    let sideB = Math.pow(Math.abs(pointA.y - pointB.y), 2)
    let result = Math.sqrt(sideA + sideB)
    return result
}

console.log(distanceBetweenPoints(2, 4, 5, 0))