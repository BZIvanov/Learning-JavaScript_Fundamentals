let expect = require("chai").expect;
let lookupChar = require("../10.charLookup").lookupChar;

describe("Test lookupChar function", function() {
    it("invalid string value", function() {
        let testCase = lookupChar(5, 5);
        expect(testCase).to.be.undefined;
    });
    it("invalid index value", function() {
        let testCase = lookupChar("Hello", "hi");
        expect(testCase).to.be.undefined;
    });
    it("invalid index value floating", function() {
        let testCase = lookupChar("Hello", 3.2);
        expect(testCase).to.be.undefined;
    });
    it("index out of range", function() {
        let testCase = lookupChar("Hello", 20);
        expect(testCase).equal("Incorrect index");
    });
    it("negative index", function() {
        let testCase = lookupChar("Hello", -1);
        expect(testCase).equal("Incorrect index");
    });
    it("close index", function() {
        let testCase = lookupChar("Hello", 5);
        expect(testCase).equal("Incorrect index");
    });
    it("correct edge index", function() {
        let testCase = lookupChar("Hello", 0);
        expect(testCase).equal("H");
    });
    it("normal case", function() {
        let testCase = lookupChar("Party time", 4);
        expect(testCase).equal("y");
    });
});
