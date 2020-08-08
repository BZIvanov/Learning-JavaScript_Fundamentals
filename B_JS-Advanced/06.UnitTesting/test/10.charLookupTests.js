const expect = require('chai').expect;
const lookupChar = require('../10.charLookup').lookupChar;

describe('Test lookupChar function', function () {
  it('invalid string value', function () {
    const testCase = lookupChar(5, 5);
    expect(testCase).to.be.undefined;
  });
  it('invalid index value', function () {
    const testCase = lookupChar('Hello', 'hi');
    expect(testCase).to.be.undefined;
  });
  it('invalid index value floating', function () {
    const testCase = lookupChar('Hello', 3.2);
    expect(testCase).to.be.undefined;
  });
  it('index out of range', function () {
    const testCase = lookupChar('Hello', 20);
    expect(testCase).equal('Incorrect index');
  });
  it('negative index', function () {
    const testCase = lookupChar('Hello', -1);
    expect(testCase).equal('Incorrect index');
  });
  it('close index', function () {
    const testCase = lookupChar('Hello', 5);
    expect(testCase).equal('Incorrect index');
  });
  it('correct edge index', function () {
    const testCase = lookupChar('Hello', 0);
    expect(testCase).equal('H');
  });
  it('normal case', function () {
    const testCase = lookupChar('Party time', 4);
    expect(testCase).equal('y');
  });
});
