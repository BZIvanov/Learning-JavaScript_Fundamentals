let expect = require("chai").expect;
let mathEnforcer = require("../11.mathEnforcer").mathEnforcer;

describe("Test mathEnforcer object", function() {
    describe("Test the object", function() {
        it("is it object", function() {
            expect(mathEnforcer).to.be.an('object');
        });
        it("to have the properties", function() {
            expect(mathEnforcer).to.have.a.property('addFive');
            expect(mathEnforcer).to.have.a.property('subtractTen');
            expect(mathEnforcer).to.have.a.property('sum');
        });
    });
    describe("Test addFive property", function() {
        it("for NaN", function() {
            let testCase = mathEnforcer.addFive("five");
            expect(testCase).to.be.undefined;
        });
        it("normal case", function() {
            let testCase = mathEnforcer.addFive(7);
            expect(testCase).to.equal(12);
        });
        it("negative value", function() {
            let testCase = mathEnforcer.addFive(-2);
            expect(testCase).to.equal(3);
        });
        it("floating value", function() {
            let testCase = mathEnforcer.addFive(2.1);
            expect(testCase).to.equal(7.1);
        });
        it("zero value", function() {
            let testCase = mathEnforcer.addFive(0);
            expect(testCase).to.equal(5);
        });
    });
    describe("Test subtractTen property", function() {
        it("for NaN", function() {
            let testCase = mathEnforcer.subtractTen("hi");
            expect(testCase).to.be.undefined;
        });
        it("normal case", function() {
            let testCase = mathEnforcer.subtractTen(1);
            expect(testCase).to.equal(-9);
        });
        it("negative value", function() {
            let testCase = mathEnforcer.subtractTen(-120);
            expect(testCase).to.equal(-130);
        });
        it("floating value", function() {
            let testCase = mathEnforcer.subtractTen(25.7);
            expect(testCase).to.equal(15.7);
        });
        it("zero value", function() {
            let testCase = mathEnforcer.subtractTen(0);
            expect(testCase).to.equal(-10);
        });
    });
    describe("Test sum property", function() {
        it("for NaN first", function() {
            let testCase = mathEnforcer.sum("hi", 5);
            expect(testCase).to.be.undefined;
        });
        it("for NaN second", function() {
            let testCase = mathEnforcer.sum(2, "nice");
            expect(testCase).to.be.undefined;
        });
        it("for two strings", function() {
            let testCase = mathEnforcer.sum("2", "5");
            expect(testCase).to.be.undefined;
        });
        it("for NaN both", function() {
            let testCase = mathEnforcer.sum([], "nice");
            expect(testCase).to.be.undefined;
        });
        it("normal case", function() {
            let testCase = mathEnforcer.sum(1, 5);
            expect(testCase).to.equal(6);
        });
        it("negative value", function() {
            let testCase = mathEnforcer.sum(-120, 45);
            expect(testCase).to.equal(-75);
        });
        it("negative both", function() {
            let testCase = mathEnforcer.sum(-120, -45);
            expect(testCase).to.equal(-165);
        });
        it("floating value", function() {
            let testCase = mathEnforcer.sum(1.1, 2.2);
            expect(testCase).to.be.closeTo(3.3, 0.1);
        });
        it("floating values", function() {
            let testCase = mathEnforcer.sum(2.5, 1.2);
            expect(testCase).to.equal(3.7);
        });
        it("zeros", function() {
            let testCase = mathEnforcer.sum(0, 0);
            expect(testCase).to.equal(0);
        });
    });
});
