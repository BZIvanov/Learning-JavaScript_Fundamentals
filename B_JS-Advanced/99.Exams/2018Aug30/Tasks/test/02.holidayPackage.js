let expect = require("chai").expect;

// class to be tested
class HolidayPackage {
    constructor(destination, season) {
        this.vacationers = [];
        this.destination = destination;
        this.season = season;
        this.insuranceIncluded = false; // Default value
    }

    showVacationers() {
        if (this.vacationers.length > 0)
            return "Vacationers:\n" + this.vacationers.join("\n");
        else
            return "No vacationers are added yet";
    }

    addVacationer(vacationerName) {
        if (typeof vacationerName !== "string" || vacationerName === ' ') {
            throw new Error("Vacationer name must be a non-empty string");
        }
        if (vacationerName.split(" ").length !== 2) {
            throw new Error("Name must consist of first name and last name");
        }
        this.vacationers.push(vacationerName);
    }

    get insuranceIncluded() {
        return this._insuranceIncluded;
    }

    set insuranceIncluded(insurance) {
        if (typeof insurance !== 'boolean') {
            throw new Error("Insurance status must be a boolean");
        }
        this._insuranceIncluded = insurance;
    }

    generateHolidayPackage() {
        if (this.vacationers.length < 1) {
            throw new Error("There must be at least 1 vacationer added");
        }
        let totalPrice = this.vacationers.length * 400;

        if (this.season === "Summer" || this.season === "Winter") {
            totalPrice += 200;
        }

        totalPrice += this.insuranceIncluded === true ? 100 : 0;

        return "Holiday Package Generated\n" +
            "Destination: " + this.destination + "\n" +
            this.showVacationers() + "\n" +
            "Price: " + totalPrice;
    }
}

// tests
describe("Test holiday class", function() {
    let holidayPackage;
        beforeEach(function() {
            holidayPackage = new HolidayPackage('Italy', 'Summer');
    });

    describe("Test instantiated class", function() {
        it("should instantiate correctly", function() {
            expect(holidayPackage.destination).to.equal("Italy");
            expect(holidayPackage.season).to.equal("Summer");
            expect(holidayPackage.insuranceIncluded).to.be.false;
            expect(holidayPackage.vacationers).to.be.an('array').that.is.empty;
        });
        it("undefined properties", function() {
            let holidayPackage = new HolidayPackage();
            expect(holidayPackage.destination).to.be.undefined;
            expect(holidayPackage.season).to.be.undefined;
        });
        it("instantiated with 1 parameter only", function() {
            let holidayPackage = new HolidayPackage("Paris");
            expect(holidayPackage.destination).to.equal("Paris");
            expect(holidayPackage.season).to.be.undefined;
        });
    });

    describe("Test showVacationers() methos", function() {
        it("test with no vacationers", function() {
            expect(holidayPackage.showVacationers()).to.equal("No vacationers are added yet");
        });
        it("test with 1 vacationer", function() {
            holidayPackage.addVacationer("Ivan Petrov");
            expect(holidayPackage.showVacationers()).to.equal("Vacationers:\nIvan Petrov");
        });
        it("test with 2 vacationers", function() {
            holidayPackage.addVacationer("Ivan Petrov");
            holidayPackage.addVacationer("Mariq Petrova");
            expect(holidayPackage.showVacationers()).to.equal("Vacationers:\nIvan Petrov\nMariq Petrova");
        });
    });

    describe("Test addVacationer() method", function() {
        it("Correct name", function() {
            holidayPackage.addVacationer("Qna Ionkova")
            expect(holidayPackage.vacationers).to.be.an('array').that.includes("Qna Ionkova");
        });
        it("Correct name for more than 1 person", function() {
            holidayPackage.addVacationer("Qna Ionkova")
            holidayPackage.addVacationer("Tina Ivanova")
            expect(holidayPackage.vacationers).to.have.lengthOf(2);
        });
        it("Incorrect non-string name", function() {
            // use throw in a function to work, in this example arrow function
            expect(() => {holidayPackage.addVacationer(5)}).to.throw("Vacationer name must be a non-empty string");
        });
        it("No input", function() {
            expect(() => {holidayPackage.addVacationer()}).to.throw(Error);
        });
        it("Incorrect name, just 1 string", function() {
            expect(() => {holidayPackage.addVacationer("Pesho")}).to.throw(Error);
        });
        it("Incorrect 2 names, random too long string", function() {
            expect(() => {holidayPackage.addVacationer("Petq Is Here")}).to.throw("Name must consist of first name and last name");
        });
        it("Incorrect name, space string", function() {
            expect(() => {holidayPackage.addVacationer(" ")}).to.throw(Error);
        });
    });

    describe("Test insuranceIncluded property", function() {
        it("should return false normal case", function() {
            expect(holidayPackage.insuranceIncluded).to.be.false;
        });
        it("not boolean value", function() {
            expect(() => { 
                holidayPackage.insuranceIncluded = "true"
            }).to.throw("Insurance status must be a boolean");
        });
        it("change status normal case", function() {
            expect(holidayPackage.insuranceIncluded = true).to.be.true;
        });
    });

    describe("Test generateHolidayPackage()", function() {
        it("should throw with no vacationers", function() {
            expect(() => {
                holidayPackage.generateHolidayPackage()
            }).to.throw("There must be at least 1 vacationer added");
        });
        it("test with 1 vacationer in summer and no insurance", function() {
            let anotherHolidayPackage = new HolidayPackage('Italy', 'Summer');
            anotherHolidayPackage.addVacationer("Mariq Petrova");
            expect(anotherHolidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nMariq Petrova\nPrice: 600")
        });
        it("test with 1 vacationer in winter and insuranced", function() {
            let anotherHolidayPackage = new HolidayPackage('Italy', 'Winter');
            anotherHolidayPackage.addVacationer("Mariq Petrova");
            anotherHolidayPackage.insuranceIncluded = true;
            expect(anotherHolidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: Italy\nVacationers:\nMariq Petrova\nPrice: 700")
        });
        it("test with 2 vacationer in autumn and insuranced", function() {
            let anotherHolidayPackage = new HolidayPackage('France', 'Autumn');
            anotherHolidayPackage.addVacationer("Mariq Petrova");
            anotherHolidayPackage.addVacationer("Boris Mihailov");
            anotherHolidayPackage.insuranceIncluded = true;
            expect(anotherHolidayPackage.generateHolidayPackage()).to.equal("Holiday Package Generated\nDestination: France\nVacationers:\nMariq Petrova\nBoris Mihailov\nPrice: 900")
        });
    });
});
