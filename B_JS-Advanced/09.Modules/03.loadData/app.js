let functions = require('./load-data');

let sortedResult = functions.sort("shipTo");
let filteredResult = functions.filter('status', 'shipped');

console.log(sortedResult);
console.log(filteredResult);
