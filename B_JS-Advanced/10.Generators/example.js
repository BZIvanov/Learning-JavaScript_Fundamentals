// BASIC USAGE
function* gen() {
  console.log('a');
  console.log('b');
}

const g = gen();
// we have to use next method to execute the function, otherwise it will do nothing
// after running the function we will get the result of the 2 console.logs
g.next();

//----------------------------------------------------------------------------------------

// USING WITH STEPS
function* gen(i) {
  yield i;
  yield i + 10;
}

const g = gen(5);

// each time we call next we get the result to the next breakpoint of the generator, which is the yield
const firstResult = g.next();
console.log(firstResult); // { value: 5, done: false }

const secondResult = g.next();
console.log(secondResult); // { value: 15, done: false }

// here we can see the last value is undefined, because the function is not returning anything
const thirdResult = g.next();
console.log(thirdResult); // { value: undefined, done: true }

//----------------------------------------------------------------------------------------

// SET VALUE FOR THE LAST CALL
function* gen(i) {
  yield i;
  yield i + 10;
  return 20;
}

const g = gen(5);

g.next();
g.next();

// after the generator is depleted with return value for the generator we will get it on the last next call instead of getting undefined
const thirdResult = g.next();
console.log(thirdResult); // { value: 20, done: true }
