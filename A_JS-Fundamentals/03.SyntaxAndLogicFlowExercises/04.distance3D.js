function distance3D(arr) {
    [x1, y1, z1, x2, y2, z2] = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]]
    let result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z1 - z2, 2))
    console.log(result)
}

distance3D([1, 1, 0, 5, 4, 0]);