const assert = require('chai').assert;
const sum = require('../04.sumOfNumbers').sum;

describe('Test sum function', function () {
  it('check for positive numbers', function () {
    const result = sum([1, 2, 3]);
    assert.equal(result, 6);
  });
  it('check for negative numbers', function () {
    const result = sum([1, -2, -3]);
    assert.equal(result, -4);
  });
  it('check for floating numbers', function () {
    const result = sum([1, -2.1, -3.5]);
    assert.equal(result, -4.6);
  });
  it('check for empty array', function () {
    const result = sum([]);
    assert.equal(result, 0);
  });
});
