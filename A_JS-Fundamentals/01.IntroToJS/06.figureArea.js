function figureArea(w, h, W, H) {
    [s1, s2, s3] = [w * h, W * H, Math.min(w, W) * Math.min(h, H)]
    let result = s1 + s2 - s3
    return result
}

console.log(figureArea(2, 4, 5, 3))