// Shadowing example - the function parameter named city will shadow the global variable named city
let city = 'Sofia'; // <- city in global scope

function printCity(city) {
  // <- city in function scope

  // here we reassign the value of variable city, but this variable is the function parameter
  // this is the city variable from the function scope
  city = city.toUpperCase();
  console.log(city);
}

printCity('Plovdiv');
// PLOVDIV

printCity(city);
// SOFIA

console.log(city);
// Sofia
