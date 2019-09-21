let fib = (function () {
    let first = 0;
    let prev = 1;
    
    return function () {
        let temp = first;
        first = prev;
        prev = temp + first;
        return first;
    }
})();

console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
