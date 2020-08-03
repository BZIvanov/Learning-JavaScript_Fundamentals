const sumator = (function () {
  let total = 0;
  return function sum(a) {
    total += a;
    sum.toString = () => total;
    return sum;
  };
})();

console.log(sumator(1)(3).toString());
