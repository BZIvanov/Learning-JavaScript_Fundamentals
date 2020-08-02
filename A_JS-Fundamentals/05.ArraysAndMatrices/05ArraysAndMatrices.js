// 03. Positive and negative numbers
function poseNegNumbers(arr) {
  const result = [];

  for (let num of arr) {
    if (num < 0) {
      result.unshift(num);
    } else {
      result.push(num);
    }
  }
  return result.join('\n');
}
console.log(poseNegNumbers([7, -2, 8, 9]));

// 04. First last k numbers
function firstAndLastKNumbers(arr) {
  const k = arr.shift();
  console.log(arr.slice(0, k));
  console.log(arr.slice(arr.length - k));
}
firstAndLastKNumbers([3, 6, 7, 8, 9]);

// 05. Last k numbers
function lastKNumbers(n, k) {
  const result = [1];
  for (let i = 1; i < n; i++) {
    let sum = 0;
    let start = result.length - k;
    if (start < 0) {
      start = 0;
    }
    let tempArr = result.slice(start);
    for (let num of tempArr) {
      sum += num;
    }
    result.push(sum);
  }
  console.log(result);
}
lastKNumbers(6, 3);

// 06. Process odd numbers
function processOddNumbers(arr) {
  const result = arr
    .filter((el, i) => i % 2 !== 0)
    .map((x) => x * 2)
    .reverse();
  console.log(result.join(' '));
}
processOddNumbers([10, 15, 20, 25]);

// 07. Smallest two numbers
function smallestTwoNumbers(arr) {
  const result = arr
    .sort((a, b) => a - b)
    .slice(0, 2)
    .join(' ');
  console.log(result);
}
smallestTwoNumbers([3, 0, 10, 4, 7, 3]);

// 08. Biggest element
function biggestElelemnt(matrix) {
  let max = Number.NEGATIVE_INFINITY;
  matrix.map((el) =>
    el.map((x) => {
      if (x > max) {
        max = x;
      }
    })
  );
  console.log(max);
}

biggestElelemnt([
  [3, 5, 7, 12],
  [-1, 4, 33, 2],
  [8, 3, 0, 4],
]);

// 11. Given delimeter
function givenDelimeter(arr) {
  const delimeter = arr.pop();
  console.log(arr.join(delimeter));
}
givenDelimeter(['One', 'Two', 'Three', 'Four', 'Five', '-']);

// 12. Nth element
function everyNthElement(arr) {
  const step = Number(arr.pop());
  for (let i = 0; i < arr.length; i += step) {
    console.log(arr[i]);
  }
}
everyNthElement(['dsa', 'asd', 'test', 'sett', 'est', '2']);

// 13. Add remove element
function addRemove(arr) {
  const result = [];
  let value = 1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'add') {
      result.push(value);
      value++;
    }
    if (arr[i] === 'remove') {
      result.pop();
      value++;
    }
  }
  if (result.length === 0) {
    console.log('Empty');
    return;
  }
  console.log(result.join('\n'));
}
addRemove(['add', 'add', 'add', 'add']);
addRemove(['add', 'add', 'remove', 'add', 'add']);

// 14. Rotate array
function rotateArray(input) {
  let n = Number(input.pop());
  n = n % input.length;

  for (let i = 0; i < n; i++) {
    const last = input[input.length - 1];
    input.pop();
    input.unshift(last);
  }
  console.log(input.join(' '));
}
rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', '15']);
rotateArray(['1', '2', '3', '4', '2']);

// 15. Increasing subsequence
function increasingSubsequence(arr) {
  const result = [];
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= max) {
      result.push(arr[i]);
      max = arr[i];
    }
  }
  console.log(result.join('\n'));
}
increasingSubsequence([1, 2, 8, 4, 10, 12, 3, 2, 24]);

// 16. Sort array
function sortArray(input) {
  input.sort((a, b) => a.length - b.length || a.localeCompare(b));
  console.log(input.join('\n'));
}
sortArray(['Isacc', 'Theodor', 'Jack', 'Harrison', 'George']);
sortArray(['test', 'Deny', 'omen', 'Default']);

// 17. Magical matrices
function magicalMatrices(input) {
  const sum = input[0].reduce((a, b) => a + b, 0);
  for (let row in input) {
    const rowSum = input[row].reduce((a, b) => a + b, 0);
    if (rowSum != sum) {
      return false;
    }
  }
  const calcSum = function (arr) {
    return arr.reduce((a, b) => a + b, 0);
  };
  const colSums = input.map(function (row, i) {
    return calcSum(input.map((row) => row[i]));
  });
  for (let s of colSums) {
    if (s != sum) {
      return false;
    }
  }
  return true;
}
console.log(
  magicalMatrices([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5],
  ])
);
console.log(
  magicalMatrices([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1],
  ])
);
console.log(
  magicalMatrices([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ])
);

// 18. Spiral matrix
function generateSpiralMatrix(rows, cols) {
  const matrix = [];
  for (let row = 0; row < rows; row++) {
    matrix[row] = [];
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = 0;
    }
  }

  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  let index = 1;
  let direction = 0;
  while (top <= bottom && left <= right) {
    switch (direction % 4) {
      case 0:
        for (let col = left; col <= right; col++) {
          matrix[top][col] = index++;
        }
        top++;
        direction++;
        break;
      case 1:
        for (let row = top; row <= bottom; row++) {
          matrix[row][right] = index++;
        }
        right--;
        direction++;
        break;
      case 2:
        for (let col = right; col >= left; col--) {
          matrix[bottom][col] = index++;
        }
        bottom--;
        direction++;
        break;
      default:
        for (let row = bottom; row >= top; row--) {
          matrix[row][left] = index++;
        }
        left++;
        direction++;
        break;
    }
  }
  console.log(matrix.map((r) => r.join(' ')).join('\n'));
}
generateSpiralMatrix(5, 5);

// 19. Diagonal attack
function diagonalsAttack(matrixRows) {
  const matrix = matrixRows.map((row) => row.split(' ').map(Number));

  let sumFirstDiagonal = 0;
  for (let i = 0; i < matrix.length; i++) {
    sumFirstDiagonal = sumFirstDiagonal + matrix[i][i];
  }
  let sumSecondDiagonal = 0;
  for (let j = 0; j < matrix.length; j++) {
    sumSecondDiagonal = sumSecondDiagonal + matrix[j][matrix.length - 1 - j];
  }

  if (sumFirstDiagonal === sumSecondDiagonal) {
    for (let q = 0; q < matrix.length; q++) {
      for (let z = 0; z < matrix.length; z++) {
        if (q !== z && q !== matrix.length - 1 - z) {
          matrix[q][z] = sumFirstDiagonal;
        }
      }
    }
    printMatrix(matrix);
  } else {
    printMatrix(matrix);
  }

  function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      console.log(matrix[i].join(' '));
    }
  }
}
diagonalsAttack(['1 2 3', '4 5 6', '7 8 9']);

// 20. Orbit
function orbitOfMatrix(arr) {
  const [width, height, x, y] = arr;
  const matrix = [];

  for (let i = 0; i < width; i++) {
    const rs = [];
    for (let j = 0; j < height; j++) {
      rs.push(0);
    }
    matrix.push(rs);
  }

  let number = 2;
  let colEnd = y;
  let rowEnd = x;
  let colStart = y;
  let rowStart = x;
  matrix[x][y] = 1;
  let counterRowEnd = rowEnd;
  let counterColEnd = colEnd;
  let counterRowStart = rowEnd;
  let counterColStart = colEnd;

  while (true) {
    counterRowEnd++;
    counterColEnd++;
    counterRowStart--;
    counterColStart--;
    //check if out of matrix size
    if (
      counterRowEnd > width - 1 &&
      counterColEnd > height - 1 &&
      counterRowStart < 0 &&
      counterColStart < 0
    )
      break;
    if (rowEnd >= width - 1) rowEnd = width - 1;
    else rowEnd++;
    if (colEnd >= height - 1) colEnd = height - 1;
    else colEnd++;
    if (rowStart == 0) rowStart = 0;
    else rowStart--;
    if (colStart == 0) colStart = 0;
    else colStart--;
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        if (matrix[i][j] == 0) {
          matrix[i][j] = number;
        }
      }
    }
    number++;
  }
  for (let row of matrix) {
    console.log(row.join(' '));
  }
}
orbitOfMatrix([4, 4, 0, 0]);
