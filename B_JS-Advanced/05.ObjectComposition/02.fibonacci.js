const fib = (function () {
  let first = 0;
  let prev = 1;

  return function () {
    let temp = first;
    first = prev;
    prev = temp + first;
    return first;
  };
})();

console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
