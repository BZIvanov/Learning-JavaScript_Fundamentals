class PaymentProcessor {
    constructor(options) {
        this.options = options;
        this.payments = [];
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this.setOptions(value);
    }

    setOptions(value) {
        this._options = {
            types: ["service", "product", "other"],
            precision: 2
        } 
        if (value && value.hasOwnProperty("types")) {
            this._options.types = value.types;
        }
        if (value && value.hasOwnProperty("precision")) {
            this._options.precision = value.precision;
        }
    }

    registerPayment(id, name, type, value) {
        if (id === "" || name === "") {
            throw new Error("Invalid ID or name");
        }
        if (typeof value !== "number") {
            throw new Error("Invalid value!");
        }
        if (!this.options.types.includes(type)) {
            throw new Error("Invalid type!");
        }

        for (let i = 0; i < this.payments.length; i++) {
            if (this.payments[i].id === id) {
                throw new Error("ID already exists");
            }
        }
        value = value.toFixed(this.options.precision);

        this.payments.push({ id, name, type, value });
    }

    deletePayment(id) {
        let incorrectID = true;
        for (let i = 0; i < this.payments.length; i++) {
            if (this.payments[i].id === id) {
                incorrectID = false;
                this.payments.splice(i, 1);
                break;
            }
        }
        if (incorrectID) {
            throw new Error("ID not found!");
        }
    }

    get(id) {
        let incorrectID = true;
        for (let i = 0; i < this.payments.length; i++) {
            if (this.payments[i].id === id) {
                incorrectID = false;
                return `Details about payment ID: ${this.payments[i].id}\n- Name: ${this.payments[i].name}\n- Type: ${this.payments[i].type}\n- Value: ${(this.payments[i].value)}`;
            }
        }
        if (incorrectID) {
            throw new Error("ID not included!");
        }
    }

    toString() {
        let balance = 0;
        for (let i = 0; i < this.payments.length; i++) {
            balance += +this.payments[i].value;
        }
        
        return `Summary:\n- Payments: ${this.payments.length}\n- Balance: ${balance.toFixed(this.options.precision)}`;
    }
}

const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());
