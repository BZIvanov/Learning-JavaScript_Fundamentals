const Checkbox = require('./models/Checkbox.js');
const Numberbox = require('./models/Numberbox.js');

const check = new Checkbox('Is Married:', '#married');
const number = new Numberbox('Age:', '#age', 1, 100);
const checkbox = $('#married');
const numberbox = $('#age');
checkbox.on('change', () => console.log(check.value));
numberbox.on('change', () => console.log(number.value));
