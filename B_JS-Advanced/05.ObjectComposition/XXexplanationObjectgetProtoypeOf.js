const audi = {
  color: 'red',
  doors: 2,
};

const myCar = Object.create(audi);
myCar.wheels = 4;

const mySecondCar = Object.create(myCar);

console.log(mySecondCar); // {}
console.log(Object.getPrototypeOf(mySecondCar)); // { wheels: 4 }
