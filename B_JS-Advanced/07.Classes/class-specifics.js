// class example
class PersonC {
  name = 'Iva';

  constructor() {
    this.city = 'Sofia';
  }

  greet() {
    console.log(`Greetings from ${this.name}`);
  }
}

// under the hood what actually happens is that new function is created and this is set to an empty object to which we assign all the prperties
function PersonF() {
  this.name = 'Eva';
  this.city = 'Sofia';
  this.greet = function () {
    console.log(`Greetings from ${this.name}`);
  };
}

// and this is how more methods are added
PersonF.prototype.checkCity = function () {
  console.log(`I am from ${this.city}`);
};

const iva = new PersonC();
iva.greet();

// function created with the new keyword is what will make the class behaviour
const eva = new PersonF();
eva.greet();
eva.checkCity();
