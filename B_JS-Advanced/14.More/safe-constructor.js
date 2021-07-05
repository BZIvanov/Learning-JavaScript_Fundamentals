// this is example how we can still create properly new User if we forgot the keyword 'new'
// otherwise in the browser for example without strict mode we will attach the variables to the global scope
const User = function (name, city) {
  if (this instanceof User) {
    this.name = name;
    this.city = city;
  } else {
    return new User(name, city);
  }
};

const userA = new User('Iva', 'Sofia');
const userB = User('Iva', 'Sofia');

console.log(userA);
console.log(userB);
