// 01. Distance 3D
function distance3D(arr) {
  [x1, y1, z1, x2, y2, z2] = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
  const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z1 - z2, 2));
  console.log(result);
}
distance3D([1, 1, 0, 5, 4, 0]);

// 02. Grads to degrees
function gradsToDegrees(g) {
  g %= 400;

  if (g < 0) {
    g += 400;
  }
  
  g *= 0.9;
  console.log(g);
}
gradsToDegrees(850);
gradsToDegrees(0);

// 03. Rounding
function rounding(arr) {
  [num, d] = [arr[0], arr[1]];
  if(d > 15) {
    d = 15;
  }
  let zeroShifter = Math.pow(10, d);
  console.log(Math.round(num * zeroShifter) / zeroShifter);
}
rounding([10.5, 3]);

// 04. Imperial units
function imperialUnits(n) {
  let main = Math.floor(n / 12, 0);
  let subMain = n % 12;
  console.log(`${main}'-${subMain}"`);
}
imperialUnits(55);

// 05. Binary to decimal
function binaryToDecimal(bin) {
    console.log(parseInt(bin, 2));
}
binaryToDecimal("00001001");

// 06. Assign properties
function assignProperty(input) {
  let obj = {};
  for (let i = 0; i < input.length - 1; i += 2) {
    obj[input[i]] = input[i + 1];
  }
  console.log(obj);
}
assignProperty(['name', 'Pesho', 'age', '23', 'gender', 'male']);

// 07. Last month
function lastDayOfPrevMonth(arr) {
  // 0 for day value will return the last day from previous month
  let currentDate = new Date(arr[2], arr[1] - 1, 0);
  console.log(currentDate.getDate());
}
lastDayOfPrevMonth([17, 3, 2002]);

// 08. Point in rectangle
function pointInRectangle([x, y, xMin, xMax, yMin, yMax]) {
  if ((xMin <= x && x <= xMax) && (yMin <= y && y <= yMax)) {
    console.log("inside");
  } else {
    console.log("outside");
  }
}
pointInRectangle([8, -1, 2, 12, -3, 3]);
