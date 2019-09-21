let assert = require("chai").assert;
let sum = require("../04.sumOfNumbers").sum;

describe("Test sum function", function() {
    it("check for positive numbers", function() {
        let result = sum([1, 2, 3]);
        assert.equal(result, 6);
    });
    it("check for negative numbers", function() {
        let result = sum([1, -2, -3]);
        assert.equal(result, -4);
    });
    it("check for floating numbers", function() {
        let result = sum([1, -2.1, -3.5]);
        assert.equal(result, -4.6);
    });
    it("check for empty array", function() {
        let result = sum([]);
        assert.equal(result, 0);
    });
});
