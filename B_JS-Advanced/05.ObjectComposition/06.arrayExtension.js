(function arrayExtension() {
  // with prototype method on array we can attach new method to the Array object and every array in our application will have access to the new attached method
  // this way every array in our app will receive the "last" method on their __proto__ object
  // similar to Array we could do this for String or any other object
  Array.prototype.last = function () {
    // this will refer to the array on which we use the "last" method
    return this[this.length - 1];
  };

  Array.prototype.skip = function (n) {
    const result = [];

    for (let i = n; i < this.length; i++) {
      result.push(this[i]);
    }
    return result;
  };

  Array.prototype.take = function (n) {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(this[i]);
    }
    return result;
  };

  Array.prototype.sum = function () {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum += this[i];
    }
    return sum;
  };

  Array.prototype.average = function () {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum += this[i];
    }
    return sum / this.length;
  };
})();

const sumArr = [1, 2, 3, 4, 5].sum();
console.log(sumArr); // 15

const avgArr = [1, 2, 3, 4, 5].average();
console.log(avgArr); // 3
