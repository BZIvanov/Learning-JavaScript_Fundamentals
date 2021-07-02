const user = {
  firstName: 'Iva',
};

const greeter = function (text, moreText, punct) {
  console.log(text + ' ' + this.firstName + moreText + punct);
};

// bind returns new function
const morning = greeter.bind(user, 'Good morning', ', welcome');
console.log(morning('!')); // Good morning Iva, welcome!
