// 01. Sum VAT
function sumAndVAT(numbers) {
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }
    console.log("sum = " + sum);
    console.log("VAT = " + sum * 0.2);
    console.log("total = " + sum * 1.2);
}
sumAndVAT([1.20, 2.60, 3.50]);

// 02. Figure Area
function figureArea(w, h, W, H) {
    [s1, s2, s3] = [w * h, W * H, Math.min(w, W) * Math.min(h, H)];
    return s1 + s2 - s3;
}
console.log(figureArea(2, 4, 5, 3));

// 03. Next Day
function nextDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    let oneDay = 24 * 60 * 60 * 1000; // miliseconds in 1 day
    let nextDay = new Date(date.getTime() + oneDay);
    console.log(nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate());
}
nextDay(2016, 9, 30);

// 04. Distance
function distanceBetweenPoints(x1, y1, x2, y2) {
    const pointA = { x: x1, y: y1 };
    const pointB = { x: x2, y: y2 };

    const sideA = Math.pow(Math.abs(pointA.x - pointB.x), 2);
    const sideB = Math.pow(Math.abs(pointA['y'] - pointB['y']), 2);
    const result = Math.sqrt(sideA + sideB);
    return result;
}
console.log(distanceBetweenPoints(2, 4, 5, 0));
