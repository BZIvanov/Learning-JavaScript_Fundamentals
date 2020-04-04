## Arrow functions

Arrow functions are useful in cases where we want to preserve **this**, because they use the context they are placed in.

```javascript
const printName = () => console.log("Ina")
```
```javascript
const printName = name => console.log(name)
```
```javascript
const printName = (name) => console.log(name)
```
```javascript
const printName = (first, last) => console.log(first + " " + last)
```
```javascript
const sumNumbers = (first, second) => {
    let sum = first + second;
    return sum;
}
```

## Class

ES6 version
```javascript
class Human {
    constructor() {
        this.gender = 'male';
    }

    printGender() {
        console.log(this.gender);
    }
}

class Person extends Human {
    constructor() {
        super();
        this.name = 'Ina';
        this.gender = 'female';
    }

    printMyName() {
        console.log(this.name);
    }
}

const person = new Person();
person.printMyName();
person.printGender();
```

ES7 shorthand syntax

Here we can set properties directly saving us the constructor. And for methods we can use arrow functions stored as variables, so we will not have issues with **this**
```javascript
class Human {
    gender = 'male';

    printGender = () => {
        console.log(this.gender);
    }
}

class Person extends Human {
    name = 'Ina';
    gender = 'female';

    printMyName = () => {
        console.log(this.name);
    }
}

const person = new Person();
person.printMyName();
person.printGender();
```

## Spread operator

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4]; // adding more is optional like 4 number here
console.log(newNumbers); // results in [1, 2, 3, 4]
```

```javascript
const person = {
    name: 'Ina'
};
const newPerson = {
    ...person,
    age: 28
}
console.log(newPerson); // results in { name: "Ina", age: 28 }
```

!!! Something VERY important. Object with spread operator are not cloned in a new object deeply, meaning that nested object will not get new reference, but will point to the same nested object. If that is your case you need to clone deeply manually.

Also when working with arrays you will often want to use concat() method where it will return new array instead using push() method where it mutates the already existing array.

## Destructuring

What we do in the below example is we get the name and save it differently named variable *firstName*. For age we have default value of *21* in case none is provided. For *favColor* we do both of giving different variable name and default value. In the *...rest* variable we will put all the other object properties.

```javascript
const person = {
    name: 'Ina',
    age: 24,
    favColor: 'red',
    pet: 'spider',
    specialty: 'JS'
}

const { name: firstName, age = 21, favColor: color = 'purple', ...rest } = person;

console.log(firstName);     // Ina
console.log(age);           // 24
console.log(color);         // red
console.log(rest);          // { pet: 'spider', specialty: 'JS' }
```
