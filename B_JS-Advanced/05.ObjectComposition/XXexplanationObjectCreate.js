// create an basic object
let obj1 = {
    name: "Jana"
}
console.log(obj1);
console.log("-".repeat(20));

// object2 will be based on object 1
let obj2 = Object.create(obj1);
obj2.height = 1.7;
console.log(obj2);
console.log(obj2.__proto__);
console.log("-".repeat(20));

//object 3 will be based on object 2
let obj3 = Object.create(obj2);
console.log(obj3);
console.log(obj3.__proto__);
console.log(obj3.__proto__.__proto__);
console.log("-".repeat(20));

//Every other new created object has all properties accessible by it's __proto__ property.