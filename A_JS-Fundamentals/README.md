## Object.freeze(obj)

This way we can freeze an object disallowing to be changed if used later.
For more info read [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

```javascript
const obj = {
  prop: 42,
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// expected output: 42
```

## Object.assign(obj)

This way we can combine properties from one object with another object. Click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```

## Destructuring arrays examples

Pulling the first and the rest of the elements

```javascript
const racers = ["Ivan", "Mira", "Toni", "Katq"];
const [winner, ...others] = racers;
console.log(winner); // "Ivan"
console.log(others); // "["Mira", "Toni", "Katq"]"
```

Pulling the first and the third elements and ignoring the second

```javascript
const racers = ["Ivan", "Mira", "Toni", "Katq"];
const [winner, , third] = racers;
console.log(winner); // "Ivan"
console.log(third); // "Toni"
```

## Destructuring objects examples

```javascript
const user = {
  name: "Iva",
  age: 27,
  city: "Sofia",
};

const { city: currentCity } = user;
console.log(currentCity); // "Sofia"
```
