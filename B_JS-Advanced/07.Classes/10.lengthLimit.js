class Stringer {
  constructor(innerString, innerLength) {
    this.innerString = innerString;
    this.innerLength = innerLength;
  }

  get innerLength() {
    return this._innerLength;
  }

  set innerLength(value) {
    if (value < 0) {
      this._innerLength = 0;
    } else {
      this._innerLength = value;
    }
  }

  increase(len) {
    this.innerLength += len;
  }

  decrease(len) {
    this.innerLength -= len;
  }

  toString() {
    if (this.innerString.length < this.innerLength) {
      return this.innerString;
    }

    return this.innerString.substring(0, this.innerLength) + '...';
  }
}

const test = new Stringer('Test', 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test
