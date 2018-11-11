let expect = require("chai").expect;

class Calculator {
    constructor() {
        this.expenses = [];
    }

    add(data) {
        this.expenses.push(data);
    }

    divideNums() {
        let divide;
        for (let i = 0; i < this.expenses.length; i++) {
            if (typeof (this.expenses[i]) === 'number') {
                if (i === 0 || divide===undefined) {
                    divide = this.expenses[i];
                } else {
                    if (this.expenses[i] === 0) {
                        return 'Cannot divide by zero';
                    }
                    divide /= this.expenses[i];
                }
            }
        }
        if (divide !== undefined) {
            this.expenses = [divide];
            return divide;
        } else {
           throw new Error('There are no numbers in the array!')
        }
    }

    toString() {
        if (this.expenses.length > 0)
            return this.expenses.join(" -> ");
        else return 'empty array';
    }

    orderBy() {
        if (this.expenses.length > 0) {
            let isNumber = true;
            for (let data of this.expenses) {
                if (typeof data !== 'number')
                    isNumber = false;
            }
            if (isNumber) {
                return this.expenses.sort((a, b) => a - b).join(', ');
            }
            else {
                return this.expenses.sort().join(', ');
            }
        }
        else return 'empty';
    }
}

describe("Test class Calculator", function() {
    let calculator;
    beforeEach(function() {
        calculator = new Calculator();
    });

    describe("Instantiate class", function() {
        it("Is instance of Calculator class", function() {
            expect(calculator instanceof Calculator).to.be.true;
        });
        it("Has property expenses and methods", function() {
            expect(calculator).to.have.property('expenses');
            expect(calculator).to.have.property('add');
            expect(calculator).to.have.property('divideNums');
            expect(calculator).to.have.property('toString');
            expect(calculator).to.have.property('orderBy');
            expect(calculator.expenses).to.be.an('array').that.is.empty;
        });
    });

    describe("Test add method", function() {
        it("should add any data types", function() {
            calculator.add(5);
            expect(calculator.expenses).to.eql([5]);
            calculator.add("2");
            expect(calculator.expenses).to.eql([5, "2"]);
            calculator.add({});
            expect(calculator.expenses).to.eql([5, "2", {}]);
            calculator.add(1.252);
            expect(calculator.expenses).to.eql([5, "2", {}, 1.252]);
            calculator.add(-4);
            expect(calculator.expenses).to.eql([5, "2", {}, 1.252, -4]);
            calculator.add(0);
            expect(calculator.expenses).to.eql([5, "2", {}, 1.252, -4, 0]);
        });
    });

    describe("Test divideNums method", function() {
        it("for numbers only", function() {
            calculator.add(10);
            calculator.add(5);
            calculator.divideNums();
            expect(calculator.toString()).to.equal('2');
        });
        it("with string", function() {
            calculator.add(20);
            calculator.add("hi");
            calculator.add(2.5);
            calculator.divideNums();
            expect(calculator.toString()).to.equal('8');
        });
        it("zero division", function() {
            calculator.add(3.14);
            calculator.add("hi");
            calculator.add(0);
            expect(calculator.divideNums()).to.equal("Cannot divide by zero");
        });
        it("for empty array", function() {
            expect(() => {calculator.divideNums()}).to.throw(Error);
        });
        it("for floating numbers", function() {
            calculator.add(3.3);
            calculator.add("hi");
            calculator.add(1.1);
            expect(calculator.divideNums()).to.equal(3.3 / 1.1);
        });
    });

    describe("Test toString method", function() {
        it("empty array", function() {
            expect(calculator.toString()).to.equal("empty array");
        });
        it("one element only", function() {
            calculator.add("nice");
            expect(calculator.toString()).to.equal("nice");
        });
        it("multiple elements", function() {
            calculator.add("nice");
            calculator.add(5);
            calculator.add([])
            expect(calculator.toString()).to.equal("nice -> 5 -> ");
        });
    });

    describe("Test orderBy method", function() {
        it("for empty", function() {
            expect(calculator.orderBy()).to.equal("empty");
        });
        it("for numbers only", function() {
            calculator.add(1);
            calculator.add(10);
            calculator.add(3.5);
            calculator.add(-1);
            calculator.add(0);
            expect(calculator.orderBy()).to.equal("-1, 0, 1, 3.5, 10");
        });
        it("for mixed data", function() {
            calculator.add(1);
            calculator.add("10");
            calculator.add("why");
            calculator.add(-1);
            calculator.add(0);
            expect(calculator.orderBy()).to.equal("-1, 0, 1, 10, why");
        });
    });
});
