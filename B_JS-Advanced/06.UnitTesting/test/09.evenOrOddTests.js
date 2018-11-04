let expect = require("chai").expect;
let isOddOrEven = require("../09.evenOrOdd").isOddOrEven;

describe("Test odd/even function", function() {
    it("test input is number", function() {
        let testCase = isOddOrEven(5);
        expect(testCase).to.be.undefined;
    });
    it("test input is array", function() {
        let testCase = isOddOrEven([1]);
        expect(testCase).to.be.undefined;
    });
    it("test input is object", function() {
        let testCase = isOddOrEven({});
        expect(testCase).to.be.undefined;
    });

    it("test input is even normal case", function() {
        let testCase = isOddOrEven("Hi");
        expect(testCase).equal("even");
    });
    it("test input is even for empty string", function() {
        let testCase = isOddOrEven("");
        expect(testCase).equal("even");
    });

    it("test input is odd normal case", function() {
        let testCase = isOddOrEven("job");
        expect(testCase).equal("odd");
    });
});