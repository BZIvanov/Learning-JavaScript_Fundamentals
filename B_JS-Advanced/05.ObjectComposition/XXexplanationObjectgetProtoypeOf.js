let audi = {
    color: "red",
    doors: 2
}

let myCar = Object.create(audi);
myCar.wheels = 4;

let mySecondCar = Object.create(myCar);


console.log(mySecondCar)    // {}
console.log(Object.getPrototypeOf(mySecondCar))   // { wheels: 4 }
