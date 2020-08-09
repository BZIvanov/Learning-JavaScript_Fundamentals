const assert = require('chai').assert;
const isSymmetric = require('../05.checkForSymmetry').isSymmetric;

describe('Test Symmetry function', function () {
  describe('Test true cases', function () {
    it('true for numbers only', function () {
      const testCase = isSymmetric([1, 2, 1]);
      assert.isTrue(testCase);
    });
    it('true for negative numbers', function () {
      const testCase = isSymmetric([10, 20, 20, 10]);
      assert.isTrue(testCase);
    });
    it('true for even elements array', function () {
      const testCase = isSymmetric([
        'pesho',
        new Date(2016, 8, 15),
        false,
        new Date(2016, 8, 15),
        'pesho',
      ]);
      assert.isTrue(testCase);
    });
    it('true for mixed types', function () {
      const testCase = isSymmetric([
        5,
        'hi',
        { a: 5 },
        new Date(),
        { a: 5 },
        'hi',
        5,
      ]);
      assert.isTrue(testCase);
    });
    it('true for empty array', function () {
      const testCase = isSymmetric([]);
      assert.isTrue(testCase);
    });
    it('true for 1 element only', function () {
      const testCase = isSymmetric([1]);
      assert.isTrue(testCase);
    });
    it('true for 1 element only', function () {
      const testCase = isSymmetric([[1, 2], [2], [1, 2]]);
      assert.isTrue(testCase);
    });
  });
  describe('Test false cases', function () {
    it('false for numbers only', function () {
      const testCase = isSymmetric([1, 2, -1]);
      assert.isFalse(testCase);
    });
    it('false for mixed types', function () {
      const testCase = isSymmetric([10, 20, 30, 10]);
      assert.isFalse(testCase);
    });
    it('false for not array', function () {
      const testCase = isSymmetric([
        'pesho',
        new Date(2016, 8, 15),
        false,
        'pesho',
      ]);
      assert.isFalse(testCase);
    });
    it('false for 2 elements array', function () {
      const testCase = isSymmetric(['2', 2]);
      assert.isFalse(testCase);
    });
    it('false for 2 elements array', function () {
      const testCase = isSymmetric('hello');
      assert.isFalse(testCase);
    });
  });
});
