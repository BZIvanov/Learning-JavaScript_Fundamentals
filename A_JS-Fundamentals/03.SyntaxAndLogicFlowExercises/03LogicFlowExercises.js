// 02. Area and parameter
function areaAndPerimeter(a, b) {
    console.log(a * b);
    console.log(a * 2 + b * 2);
}
areaAndPerimeter(1, 3);

// 03. Distance
function distance(arr) {
    let speedAkmH = arr[0];
    let speedBkmH = arr[1];
    let timeInSeconds = arr[2];

    let hourValue = timeInSeconds / 60 / 60;

    let distanceTravelledAmeters = speedAkmH * hourValue * 1000;
    let distanceTravelledBmeters = speedBkmH * hourValue * 1000;
    console.log(Math.abs(distanceTravelledAmeters - distanceTravelledBmeters));
}
distance([11, 10, 120]);

// 04. Distance 3D
function distance3D(arr) {
    [x1, y1, z1, x2, y2, z2] = [arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]];
    let result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z1 - z2, 2));
    console.log(result);
}
distance3D([1, 1, 0, 5, 4, 0]);

// 05. Grads to degrees
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

// 06. Compound interest
function compoundInterest(input) {
    [p, i, n, t] = [input[0], input[1], input[2], input[3]];
    i /= 100;
    n  = 12 / n;

    let f = p * Math.pow(1 + i / n, n * t);
    console.log(f.toFixed(2));
}
compoundInterest([1500, 4.3, 3, 6]);

// 07. Rounding
function rounding(arr) {
    [num, d] = [arr[0], arr[1]];
    if(d > 15) {
        d = 15;
    }
    let zeroShifter = Math.pow(10, d);
    console.log(Math.round(num * zeroShifter) / zeroShifter);
}
rounding([10.5, 3]);

// 08. Imperial units
function imperialUnits(n) {
    let main = Math.floor(n / 12, 0);
    let subMain = n % 12;
    console.log(`${main}'-${subMain}"`);
}
imperialUnits(55);

// 10. Compose tag
function composeTag(input) {
    console.log(`<img src="${input[0]}" alt="${input[1]}">`);
}
composeTag(['smiley.gif', 'Smiley Face']);

// 11. Binary to decimal
function binaryToDecimal(bin) {
    console.log(parseInt(bin, 2));
}
binaryToDecimal("00001001");

// 12. Assign properties
function assignProperty(input) {
    let obj = {};
    for (let i = 0; i < input.length - 1; i += 2) {
        obj[input[i]] = input[i + 1];
    }
    console.log(obj);
}
assignProperty(['name', 'Pesho', 'age', '23', 'gender', 'male']);

// 13. Last month
function lastDayOfPrevMonth(arr) {
    // 0 for day value will return the last day from previous month
    let currentDate = new Date(arr[2], arr[1] - 1, 0);
    console.log(currentDate.getDate());
}
lastDayOfPrevMonth([17, 3, 2002]);

// 14. Biggest three
function biggestThree(arr) {
    console.log(Math.max(arr[0], arr[1], arr[2]));
}
biggestThree([5, -2, 7]);

// 15. Point in rectangle
function pointInRectangle([x, y, xMin, xMax, yMin, yMax]) {
    if ((xMin <= x && x <= xMax) && (yMin <= y && y <= yMax)) {
        console.log("inside");
    } else {
        console.log("outside");
    }
}
pointInRectangle([8, -1, 2, 12, -3, 3]);

// 17. Dollars triangle
function dollarsTriangle(n) {
    for (let i = 1; i <= n; i++) {
        console.log('$'.repeat(i));
    }
}
dollarsTriangle(5);

// 18. Movie prices
function moviePrices(input) {
    let movie = input[0].toLowerCase();
    let day = input[1].toLowerCase();
    if (movie === "the godfather") {
        switch(day) {
            case "monday": console.log(12); break;
            case "tuesday": console.log(10); break;
            case "wednesday": console.log(15); break;
            case "thursday": console.log(12.50); break;
            case "friday": console.log(15); break;
            case "saturday": console.log(25); break;
            case "sunday": console.log(30); break;
            default: console.log("error");
        }
    } else if (movie === "schindler's list") {
        switch(day) {
            case "monday": console.log(8.50); break;
            case "tuesday": console.log(8.50); break;
            case "wednesday": console.log(8.50); break;
            case "thursday": console.log(8.50); break;
            case "friday": console.log(8.50); break;
            case "saturday": console.log(15); break;
            case "sunday": console.log(15); break;
            default: console.log("error");
        }
    } else if (movie === "casablanca") {
        switch(day) {
            case "monday": console.log(8); break;
            case "tuesday": console.log(8); break;
            case "wednesday": console.log(8); break;
            case "thursday": console.log(8); break;
            case "friday": console.log(8); break;
            case "saturday": console.log(10); break;
            case "sunday": console.log(10); break;
            default: console.log("error");
        }
    } else if (movie === "the wizard of oz") {
        switch(day) {
            case "monday": console.log(10); break;
            case "tuesday": console.log(10); break;
            case "wednesday": console.log(10); break;
            case "thursday": console.log(10); break;
            case "friday": console.log(10); break;
            case "saturday": console.log(15); break;
            case "sunday": console.log(15); break;
            default: console.log("error");
        }
    } else {
        console.log("error");
    }
}
moviePrices(["The Godfather", "Friday"]);

// 19. Quadratic equation
function quadraticEquation(a, b, c) {
    let d = Math.pow(b, 2) - 4 * a * c;
    if (d > 0) {
        let x1 = (-b + Math.sqrt(d)) / (2 * a);
        let x2 = (-b - Math.sqrt(d)) / (2 * a);
        console.log(Math.min(x1, x2) + "\n" + Math.max(x1, x2));
    } else if (d == 0) {
        let x = -b / (2 * a);
        console.log(x);
    } else {
        console.log("No");
    }
}
quadraticEquation(6, 11, -35);

// 20. Multiplication table
function multiplicationTable(n) {
    let html = '<table border="1">\n';
    for (let row = 0; row <= n; row++) {
        html += "   <tr>";
        for (let col = 0; col <= n; col++) {
            if (row === 0 && col === 0) {
                html += "<th>x</th>";
                continue;
            }
            if (row === 0) {
                html += `<th>${col}</th>`;
            } else if (col === 0) {
                html += `<th>${row}</th>`;
            } else {
                html += `<td>${row * col}</td>`;
            }
        }
        html += "</tr>\n";
    }
    html += "</table>";

    return html;
}
console.log(multiplicationTable(5));

// 21. Figure of squares
function figureFourSquares(n) {
    let result = "";
    let symbols = n - 2;
    if (n % 2 === 0) {
        n -= 1;
    }

    for (let i = 1; i <= n; i++) {
        if (i === 1 || i === n || i === Math.floor((1 + n) / 2)) {
            result += `+${'-'.repeat(symbols)}+${'-'.repeat(symbols)}+\n`;
        } else {
            result += `|${' '.repeat(symbols)}|${' '.repeat(symbols)}|\n`;
        }
    }
    console.log(result);
}
figureFourSquares(6);
