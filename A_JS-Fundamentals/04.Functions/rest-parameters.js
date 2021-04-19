// if we have not prior knowledge of the number of the arguments we can combine them in an array with rest operator
function myFunc(...values) {
  console.log(values); // [ 1, 3, 5, 7, 9 ]
}

myFunc(1, 3, 5, 7, 9);

// here we want to specifically get the first and second argument and put all the rest in rest array variable
function myOtherFunc(first, second, ...rest) {
  console.log(first); // 1
  console.log(second); // 3
  console.log(rest); // [ 5, 7, 9 ]
}

myOtherFunc(1, 3, 5, 7, 9);
