function maxElement(arr) {
    // the first parameter is not used after Math has not this
    return Math.max.apply("no matter", arr);
}
console.log(maxElement([1, 44, 123, 33]));
