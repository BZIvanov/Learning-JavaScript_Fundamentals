# Terminology

## General

- **compilation** - the source code of a program is compiled all at once.

- **interpretation** - one line of code is executed before proceeding to the next line of the source code. Syntax errors for example are still thrown on later lines, because JS engine first parse the entire program, before it is executed.

## JS

- **interpolation** - it allows us to use simple expressions or variable in a string. The string must be surrounded with back-ticks. Example:

```javascript
const city = 'Sofia';
console.log(`I am from ${city}`);

console.log(`eight = ${5 + 3}`);
```

- **coercion** - automatic or implicit conversion of values from one data type to another data type. Example:

```javascript
console.log('Hi ' + 5); // the number 5 will converted to string and concatenated with the word Hi
```

## Keyboard keys

- **back-tick** - the symbol above tab **`**. In javascript it is used for _interpolation_
