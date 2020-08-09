const expect = require('chai').expect;
const isOddOrEven = require('../09.evenOrOdd').isOddOrEven;

describe('Test odd/even function', function () {
  it('test input is number', function () {
    const testCase = isOddOrEven(5);
    expect(testCase).to.be.undefined;
  });
  it('test input is array', function () {
    const testCase = isOddOrEven([1]);
    expect(testCase).to.be.undefined;
  });
  it('test input is object', function () {
    const testCase = isOddOrEven({});
    expect(testCase).to.be.undefined;
  });
  it('test input is even normal case', function () {
    const testCase = isOddOrEven('Hi');
    expect(testCase).equal('even');
  });
  it('test input is even for empty string', function () {
    const testCase = isOddOrEven('');
    expect(testCase).equal('even');
  });
  it('test input is odd normal case', function () {
    const testCase = isOddOrEven('job');
    expect(testCase).equal('odd');
  });
});
