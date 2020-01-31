// 01. Leap Year
function leapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        console.log("yes");
    }
    else {
        console.log("no");
    }
}
leapYear(2000);

// 02. Triangle Area
function triangleArea(a, b, c) {
    let sp = (a + b + c) / 2;
    let area = Math.sqrt(sp * (sp - a) * (sp - b) * (sp - c));
    console.log(area);
}
triangleArea(2, 3.5, 4);

// 03. Cone
function cone(r, h) {
    let s = Math.sqrt(r * r + h * h);
    let volume = Math.PI * r * r * h / 3;
    console.log("volume = " + volume);
    let area = Math.PI * r * (r + s);
    console.log("area = " + area);
}
cone(3, 5);

// 04. Odd even
function oddEven(n) {
    if (!Number.isInteger(n)) {
        console.log("invalid");
    } else if (n % 2 === 0) {
        console.log("even");
    } else {
        console.log("odd");
    }
}
oddEven(5);

// 05. Fruit or vegetable
function fruitOrVegetable(food) {
    switch (food) {
        case "banana": 
        case "apple":
        case "kiwi":
        case "cherry":
        case "lemon":
        case "grapes":
        case "peach":
            console.log("fruit"); break;
        case "tomato":
        case "cucumber":
        case "pepper":
        case "onion":
        case "garlic":
        case "parsley":
            console.log("vegetable"); break;
        default:
            console.log("unknown"); break;
    }
}
fruitOrVegetable("banana");

// 06. Colorfull numbers
function colorfulNumbers(n) {
    let html = "<ul>\n";
    for (let i = 1; i <= n; i ++) {
        let color = i % 2 == 0 ? "blue" : "green";
        html += `   <li><span> style='color:${color}'>${i}</span></li>\n`;
    }
    html += "</ul>";

    return html;
}
console.log(colorfulNumbers(10));

// 07. Chess board
function chessBoard(n) {
    let html = "<div class=\"chessboard\">\n";
    for (let i = 0; i < n; i++) {
        html += "   <div>\n";
        let color = i % 2 == 0 ? "black" : "white";
        for (let j = 0; j < n; j++) {
            html += `       <span class="${color}"></span>\n`;
            color = color === "black" ? "white" : "black";
        }
        html += "   </div>\n";
    }
    html += "</div>";
    console.log(html);
}
chessBoard(3);

// 08. Binary logarithm
function binaryLogarithm(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(Math.log2(arr[i]));
    }
}
binaryLogarithm([2, 5, 6, 8, 9]);

// 09. Prime Checker
function isPrime(num) {
    let prime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
            prime = false;
            break;
        }
    }
    //return prime && (num > 1);
    console.log(prime && (num > 1));
}
isPrime(7);
