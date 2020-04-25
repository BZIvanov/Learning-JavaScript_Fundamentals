// 01. Leap Year
function leapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log('yes');
  } else {
    console.log('no');
  }
}
leapYear(2000);

// 02. Cone
function cone(r, h) {
  const s = Math.sqrt(r * r + h * h);
  const volume = (Math.PI * r * r * h) / 3;
  console.log('volume = ' + volume);
  const area = Math.PI * r * (r + s);
  console.log('area = ' + area);
}
cone(3, 5);

// 03. Chess board
function chessBoard(n) {
  let html = '<div class="chessboard">\n';
  for (let i = 0; i < n; i++) {
    html += '   <div>\n';
    let color = i % 2 == 0 ? 'black' : 'white';
    for (let j = 0; j < n; j++) {
      html += `       <span class="${color}"></span>\n`;
      color = color === 'black' ? 'white' : 'black';
    }
    html += '   </div>\n';
  }
  html += '</div>';
  console.log(html);
}
chessBoard(3);

// 04. Binary logarithm
function binaryLogarithm(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(Math.log2(arr[i]));
  }
}
binaryLogarithm([2, 5, 6, 8, 9]);

// 05. Prime Checker
function isPrime(num) {
  let prime = true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i == 0) {
      prime = false;
      break;
    }
  }
  //return prime && (num > 1);
  console.log(prime && num > 1);
}
isPrime(7);
