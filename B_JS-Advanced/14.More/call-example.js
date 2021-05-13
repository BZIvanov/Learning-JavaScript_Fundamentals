const myObj = {
  name: 'Iva',
  greet() {
    console.log(this.name);
  },
};

myObj.greet(); // Iva
// with call we can provide what 'this' will be
myObj.greet.call({ name: 'Hristina' }); // Hristina
