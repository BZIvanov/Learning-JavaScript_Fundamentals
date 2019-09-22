let expect = require("chai").expect;
let PaymentPackage = require("../02.paymentPackage");

describe("Test PaymentPackage class", function() {
    describe("Instantiate class", function() {
        it("should instantiate correctly", function() {
            let pack = new PaymentPackage('HR Services', 1500);
            expect(pack instanceof PaymentPackage).to.be.true;
            expect(pack.name).to.equal("HR Services");
            expect(pack.value).to.equal(1500);
            expect(pack.VAT).to.equal(20);
            expect(pack.active).to.be.true;
        });
    });

    describe("test name property", function() {
        it("incorrect name", function() {
            expect(() => { new PaymentPackage('', 1500) }).to.throw(Error);
            expect(() => { new PaymentPackage(24, 1500) }).to.throw(Error);
            expect(() => { new PaymentPackage([], 1500) }).to.throw(Error);
            expect(() => { new PaymentPackage({}, 1500) }).to.throw(Error);
        });
    });

    describe("test value property", function() {
        it("incorrect value", function() {
            expect(() => { new PaymentPackage('Consultation', "hi") }).to.throw(Error);
            expect(() => { new PaymentPackage('Consultation', "150") }).to.throw(Error);
            expect(() => { new PaymentPackage('Consultation', -10) }).to.throw(Error);
            expect(() => { new PaymentPackage('Consultation', -1000.1) }).to.throw(Error);
        });
        it("with zero", function() {
            let pack = new PaymentPackage('Consultation', 0);
            expect(pack.value).to.equal(0);
        });
    });

    describe("test VAT property", function() {
        it("incorrect value", function() {
            let pack = new PaymentPackage('Consultation', 100);
            expect(() => { pack.VAT = "number" }).to.throw(Error);
            expect(() => { pack.VAT = "10" }).to.throw(Error);
            expect(() => { pack.VAT = -1 }).to.throw(Error);
            expect(() => { pack.VAT = -10.5 }).to.throw(Error);
            expect(() => { pack.VAT = {} }).to.throw(Error);
        });
        it("correct value", function() {
            let pack = new PaymentPackage('Consultation', 100);
            pack.VAT = 10;
            expect(pack.VAT).to.equal(10);
        });
    });

    describe("test active property", function() {
        it("incorrect value", function() {
            let pack = new PaymentPackage('Partnership Fee', 1200);
            expect(() => { pack.active = "number" }).to.throw(Error);
            expect(() => { pack.active = "10" }).to.throw(Error);
            expect(() => { pack.active = -1 }).to.throw(Error);
            expect(() => { pack.active = -10.5 }).to.throw(Error);
            expect(() => { pack.active = {} }).to.throw(Error);
        });
        it("correct value", function() {
            let pack = new PaymentPackage('Consultation', 100);
            pack.active = false;
            expect(pack.active).to.be.false;
        });
    });

    describe("test toString method", function() {
        it("active property to true", function() {
            let pack = new PaymentPackage('Partnership Fee', 1200);
            expect(pack.toString()).to.equal("Package: Partnership Fee\n- Value (excl. VAT): 1200\n- Value (VAT 20%): 1440");
        });
        it("active property to false", function() {
            let pack = new PaymentPackage('Partnership Fee', 1000);
            pack.active = false;
            expect(pack.toString()).to.equal("Package: Partnership Fee (inactive)\n- Value (excl. VAT): 1000\n- Value (VAT 20%): 1200");
        });
    });
});
