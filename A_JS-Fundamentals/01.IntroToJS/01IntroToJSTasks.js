// 02. Sum VAT
function sumAndVAT(numbers) {
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }
    console.log("sum = " + sum);
    console.log("VAT = " + sum * 0.2);
    console.log("total = " + sum * 1.2);
}
sumAndVAT([1.20, 2.60, 3.50]);

// 03. Letter occurrencies
function letterOccurrencies(str, letter) {
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        if (letter === str[i]) {
            counter++;
        }
    }
    console.log(counter);
}
letterOccurrencies('hello', 'l');

// 04. Filter Age
function filterByAge(minAge, nameA, ageA, nameB, ageB) {
    let personA = { name: nameA, age: ageA};
    let personB = { name: nameB, age: ageB};

    if (personA['age'] >= minAge) {
        console.log(personA);
    }
    if (personB.age >= minAge) {
        console.log(personB);
    } 
}
filterByAge(12, 'Ivan', 15, 'Asen', 9);

// 05. String 1 to N
function stringNumbers1toN(n) {
    let str = "";
    for (let i = 1; i <= Number(n); i++) {
        str += i;
    }
    console.log(str);
}
stringNumbers1toN('11');

// 06. Figure Area
function figureArea(w, h, W, H) {
    [s1, s2, s3] = [w * h, W * H, Math.min(w, W) * Math.min(h, H)];
    let result = s1 + s2 - s3;
    return result;
}
console.log(figureArea(2, 4, 5, 3));

// 07. Next Day
function nextDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    let oneDay = 24 * 60 * 60 * 1000; // miliseconds in 1 day
    let nextDay = new Date(date.getTime() + oneDay);
    console.log(nextDay.getFullYear() + '-' + (nextDay.getMonth() + 1) + '-' + nextDay.getDate());
}
nextDay(2016, 9, 30);

// 08. Distance
function distanceBetweenPoints(x1, y1, x2, y2) {
    let pointA = { x: x1, y: y1 };
    let pointB = { x: x2, y: y2 };

    let sideA = Math.pow(Math.abs(pointA.x - pointB.x), 2);
    let sideB = Math.pow(Math.abs(pointA['y'] - pointB['y']), 2);
    let result = Math.sqrt(sideA + sideB);
    return result;
}
console.log(distanceBetweenPoints(2, 4, 5, 0));
