const mapSort = require('./sort-maps');

let map = new Map();
map.set(3, 'Pesho');
map.set(1, 'Gosho');
map.set(7, 'Aleks');
map = mapSort(map);

console.log(map);
