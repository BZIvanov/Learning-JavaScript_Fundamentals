// EXAMPLE 1

const myObj = {
  name: 'Iva',
  greet() {
    console.log(this.name);
  },
};

myObj.greet(); // Iva
// with call we can provide what 'this' will be
myObj.greet.call({ name: 'Hristina' }); // Hristina

// EXAMPLE 2

const user = {
  firstName: 'Iva',
};

const greeter = function (text, punct) {
  console.log(text + ' ' + this.firstName + punct);
};

// the first parameter is what we will use for this and every next parameter is parameter to the function
greeter.call(user, 'Hello', '!'); // Hello Iva!
