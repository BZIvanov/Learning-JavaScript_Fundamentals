let expect = require("chai").expect;

class SubscriptionCard {
    constructor(firstName, lastName, SSN) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._SSN = SSN;
      this._subscriptions = [];
      this._blocked = false;
    }
  
    get firstName() {
      return this._firstName;
    }
  
    get lastName() {
      return this._lastName;
    }
  
    get SSN() {
      return this._SSN;
    }
  
    get isBlocked() {
      return this._blocked;
    }
  
    addSubscription(line, startDate, endDate) {
      this._subscriptions.push({
        line,
        startDate,
        endDate
      });
    }
  
    isValid(line, date) {
      if (this.isBlocked) return false;
      return this._subscriptions.filter(s => s.line === line || s.line === '*')
        .filter(s => {
          return s.startDate <= date &&
            s.endDate >= date;
        }).length > 0;
    }
  
    block() {
      this._blocked = true;
    }
  
    unblock() {
      this._blocked = false;
    }
  }
  

describe("test SubscriptionCard class", function() {
    describe("instantate class tests", function() {
        it("to be instance of SubscriptionCard", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(subscr instanceof SubscriptionCard).to.be.true;
        });
        it("to be instantiated correctly", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(subscr._firstName).to.equal("Pesho");
            expect(subscr._lastName).to.equal("Petrov");
            expect(subscr._SSN).to.equal("00000000");
            expect(subscr._subscriptions).to.be.an("array").that.is.empty;
            expect(subscr._blocked).to.be.false;
        });
        it("to be instantiated with no parameters", function() {
            let subscr = new SubscriptionCard();
            expect(subscr._firstName).to.be.undefined;
            expect(subscr._lastName).to.be.undefined;
            expect(subscr._SSN).to.be.undefined;
            expect(subscr._subscriptions).to.be.an("array").that.is.empty;
            expect(subscr._blocked).to.be.false;
        });
    });

    describe("test block and unblock", function() {
        it("block card", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.block();
            expect(subscr._blocked).to.be.true;
        });
        it("unblock card", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.block();
            subscr.unblock();
            expect(subscr._blocked).to.be.false;
        });
    });

    describe("addSubscription method", function() {
        it("add normal case", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(subscr._subscriptions).to.have.lengthOf(1);
            expect(subscr._subscriptions[0]).to.be.an('object');
            expect(subscr._subscriptions[0].line).to.equal('120');
            expect(subscr._subscriptions[0].startDate < subscr._subscriptions[0].endDate).to.be.true;
        });
    });

    describe("isValid method", function() {
        it("normal case", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(subscr.isValid("120", new Date('2018-04-24'))).to.be.true;
            expect(subscr.isValid("120", new Date('2018-03-24'))).to.be.false;
            expect(subscr.isValid("120", new Date('2018-05-22'))).to.be.false;
            expect(subscr.isValid("120", new Date('2018-04-22'))).to.be.true;
            expect(subscr.isValid("120", new Date('2018-05-21'))).to.be.true;
        });
        it("for all lines", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.true;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
            expect(subscr.isValid("15", new Date('2018-05-22'))).to.be.false;
            expect(subscr.isValid("280", new Date('2018-05-21'))).to.be.true;
        });
        it("incorrect line", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('@', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.false;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
        });
        it("incorrect startDate", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('*', new Date('pesho'), new Date('2018-05-21'));
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.false;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
        });
        it("incorrect endDate", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('*', new Date('2018-04-22'), new Date('who'));
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.false;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
        });
        it("for blocked user", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            subscr.block();
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.false;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
        });
        it("no subscriptions", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.false;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
        });
        it("startDate bigger than endDat", function() {
            let subscr = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            subscr.addSubscription('*', new Date('2019-04-22'), new Date('2018-05-21'));
            expect(subscr.isValid("5", new Date('2018-04-24'))).to.be.false;
            expect(subscr.isValid("12", new Date('2018-03-24'))).to.be.false;
        });
    });
});