//=============================================================================================
// ARROW FUNCTIONS

// below is example with declaring normal function and calling it
function example(x) {
  return x + 1;
}
console.log(example(5));

// arrow functions are nameless so we have to save them in another variable
// below we just remove the function name and save in variable f
let f = function(x) {
  return x + 1;
}
console.log(f(6));

// after our function is saved in a variable we can also remove function key-word
let g = (x) => {
  return x + 1;
};
console.log(g(8));

// in arrow functions the symbols "=>" work as return so we can also remove return key-word
let h = (x) => x + 1;
console.log(h(9));

// if our function takes only 1 parameter we can also remove its brackets
let k = x => x + 1;
console.log(k(10));

//=============================================================================================
// FILTER FUNCTION
let animals = [
  { name: "fluffy", species: "rabbit"},
  { name: "Caro", species: "dog"},
  { name: "Hamilton", species: "dog"},
  { name: "Harold", species: "fish"},
  { name: "Ursula", species: "cat"},
  { name: "Jimmy", species: "fish"},
];

// The filter function will loop through all of the elements and return
// only those for which the specified condition is True

// arrow function example
let dogs = animals.filter(e => e.species === "dog");

// normal function example
let doggies = animals.filter(function (animal) {
  return animal.species === "dog";
});
console.log(dogs);
console.log(doggies);

// Another example with function passed as an argument
let isDog = function(animal) {
  return animal.species === "dog";
};

let onlyDogs = animals.filter(isDog);
console.log(onlyDogs);

//=============================================================================================
// IIFE AND CLOSURE

// we declare function and call it right after declaration
(function hello() {
  console.log("hello 1");
})();

// the above example function example is not visible to the code outside of the IIFE function
// so we can just remove the name after we cant use it anyway
(function () {
  console.log("hello 2");
})();

// Closure examples
//IIFE is mostly used as closure to close a state, for example for specific variable.
// We need to save IIFE in another variable to be able to re-use it
// Closure is a function returning another function 
let f = (function () {
  let a = 1;
  return function () {
    console.log(a++);
  }
})();

f();
f();
f();

//=============================================================================================
// MAP FUNCTION
let animals = [
  { name: "fluffy", species: "rabbit"},
  { name: "Caro", species: "dog"},
  { name: "Hamilton", species: "dog"},
  { name: "Harold", species: "fish"},
  { name: "Ursula", species: "cat"},
  { name: "Jimmy", species: "fish"},
];

// The map function will loop through all of the elements and apply some action on all of the elements

// arrow function example
let names = animals.map(e => e.name);

// normal function example
let namesArr = animals.map(function (animal) {
  return animal.name;
});
console.log(names);
console.log(namesArr);

// Another example with function passed as an argument
let eachName = function(animal) {
  return animal.name;
};

let allNames = animals.map(eachName);
console.log(allNames);

//=============================================================================================
// REDUCE FUNCTION
let orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 300 },
  { amount: 200 },
];

// first parameter for reduce is the function that will be applied on each element,
// the second parameter is initial value. On the second iteration init will be replaced
// from 0 with the result from previous iteration

// arrow function example
let total = orders.reduce(((init, a) => init + a.amount), 0);
console.log(total);

// normal function example
let totalAmount = orders.reduce(function (init, a) {
  return init + a.amount;
}, 0);
console.log(totalAmount);

// in the example init starts at 0 as second parameter and then it is equal to the
// returned value from the first execution on reduce function. Init value increases
// with the value of the second paramtere which is every element from the array

// !!! the second parameter on the reduce function goes as first parameter in the inside function
