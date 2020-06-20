const curriedMultiply = (a) => (b) => a * b;
const curriedMultiplyByFive = curriedMultiply(5);

console.log(curriedMultiplyByFive(4));
console.log(curriedMultiplyByFive(5));
