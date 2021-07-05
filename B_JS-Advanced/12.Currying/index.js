// sign that we should be using currying is when we are often repeating some parameters to the functions

// EXAMPLE 1
const curriedMultiply = (a) => (b) => a * b;
const curriedMultiplyByFive = curriedMultiply(5);

console.log(curriedMultiplyByFive(4)); // 20
console.log(curriedMultiplyByFive(5)); // 25

// EXAMPLE 2
const greeter = function (greeting) {
  return function (name) {
    console.log(greeting + ' ' + name);
  };
};

const welcomeGreet = greeter('Welcome');

welcomeGreet('Iva'); // Welcome Iva
welcomeGreet('Ani'); // Welcome Ani
