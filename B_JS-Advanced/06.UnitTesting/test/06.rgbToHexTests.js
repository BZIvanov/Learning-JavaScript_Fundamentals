let assert = require("chai").assert;
let rgbToHexColor = require("../06.rgbToHex").rgbToHexColor;

describe("Test rgbToHex function", function() {
    it("red is NaN", function() {
        let testCase = rgbToHexColor("red", 234, 123);
        assert.isUndefined(testCase);
    })
    it("green is NaN", function() {
        let testCase = rgbToHexColor(125, "green", 123);
        assert.isUndefined(testCase);
    })
    it("blue is NaN", function() {
        let testCase = rgbToHexColor(125, 122, "blue");
        assert.isUndefined(testCase);
    })
    it("red is below zero", function() {
        let testCase = rgbToHexColor(-20, 234, 123);
        assert.isUndefined(testCase);
    })
    it("green is below zero", function() {
        let testCase = rgbToHexColor(125, -1, 123);
        assert.isUndefined(testCase);
    })
    it("blue is below zero", function() {
        let testCase = rgbToHexColor(125, 122, -14);
        assert.isUndefined(testCase);
    })
    it("red is above 255", function() {
        let testCase = rgbToHexColor(256, 234, 123);
        assert.isUndefined(testCase);
    })
    it("green is above 255", function() {
        let testCase = rgbToHexColor(125, 278, 200);
        assert.isUndefined(testCase);
    })
    it("blue is above 255", function() {
        let testCase = rgbToHexColor(125, 122, 256);
        assert.isUndefined(testCase);
    })
    it("red is floating number", function() {
        let testCase = rgbToHexColor(25.34, 234, 123);
        assert.isUndefined(testCase);
    })
    it("green is floating number", function() {
        let testCase = rgbToHexColor(125, 200.12, 200);
        assert.isUndefined(testCase);
    })
    it("blue is floating number", function() {
        let testCase = rgbToHexColor(125, 122, 254.90);
        assert.isUndefined(testCase);
    })
    it("all are correct", function() {
        let testCase = rgbToHexColor(25, 234, 123);
        assert.equal(testCase, "#19EA7B");
        assert.isString(testCase, "#19EA7B");
    })
    it("all are correct and zeros", function() {
        let testCase = rgbToHexColor(0, 0, 0);
        assert.equal(testCase, "#000000");
    })
    it("all are correct some 255 some not", function() {
        let testCase = rgbToHexColor(0, 255, 0);
        assert.equal(testCase, "#00FF00");
    })
    it("missing elements", function() {
        let testCase = rgbToHexColor(125, 122);
        assert.isUndefined(testCase);
    })
    it("incorrect input", function() {
        let testCase = rgbToHexColor("hello");
        assert.isUndefined(testCase);
    })
});