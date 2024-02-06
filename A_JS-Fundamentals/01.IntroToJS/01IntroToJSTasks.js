// 01. Figure Area
function figureArea(w, h, W, H) {
  const [s1, s2, s3] = [w * h, W * H, Math.min(w, W) * Math.min(h, H)];
  return s1 + s2 - s3;
}
console.log(figureArea(2, 4, 5, 3));

// 02. Next Day
function nextDay(year, month, day) {
  const date = new Date(year, month - 1, day);
  const oneDay = 24 * 60 * 60 * 1000; // miliseconds per 1 day
  const nextDay = new Date(date.getTime() + oneDay);
  console.log(
    nextDay.getFullYear() +
      '-' +
      (nextDay.getMonth() + 1) +
      '-' +
      nextDay.getDate()
  );
}
nextDay(2016, 9, 30);

// 03. Distance
function distanceBetweenPoints(x1, y1, x2, y2) {
  const pointA = { x: x1, y: y1 };
  const pointB = { x: x2, y: y2 };

  const sideA = Math.pow(Math.abs(pointA.x - pointB.x), 2);
  const sideB = Math.pow(Math.abs(pointA['y'] - pointB['y']), 2);
  const result = Math.sqrt(sideA + sideB);
  return result;
}
console.log(distanceBetweenPoints(2, 4, 5, 0));

// 04. Exponentiation
function exponent(a, b) {
  console.log(a ** b); // 125
}
exponent(5, 3);
