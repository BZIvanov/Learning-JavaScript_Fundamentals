class Vacationer {
  constructor(fullName, creditCard) {
    this.fullName = fullName;
    this.creditCard = creditCard;
    this.wishList = [];
    this.idNumber = this.generateIDNumber();
  }

  getVacationerInfo() {
    let wishListDestinations = '';
    if (this.wishList.length === 0) {
      wishListDestinations = 'empty';
    } else {
      wishListDestinations = this.wishList.join(', ');
    }
    let strResult = '';
    strResult += `Name: ${this._fullName.firstName} ${this._fullName.middleName} ${this._fullName.lastName}\n`;
    strResult += `ID Number: ${this._idNumber}\n`;
    strResult += 'Wishlist:\n';
    strResult += wishListDestinations + '\n';
    strResult += 'Credit Card:\n';
    strResult += `Card Number: ${this._creditCard.cardNumber}\n`;
    strResult += `Expiration Date: ${this._creditCard.expirationDate}\n`;
    strResult += `Security Number: ${this._creditCard.securityNumber}\n`;

    return strResult;
  }

  addDestinationToWishList(destination) {
    if (this.wishList.includes(destination)) {
      throw new Error(`Destination already exists in wishlist`);
    } else {
      this.wishList.push(destination);
      this.wishList.sort(function (a, b) {
        return a.length - b.length;
      });
    }
  }

  addCreditCardInfo(input) {
    let cardNum = input[0];
    let expirationDate = input[1];
    let securityNumber = input[2];

    if (input.length === 3) {
      if (typeof cardNum !== 'number' || typeof securityNumber !== 'number') {
        throw new Error(`Invalid credit card details`);
      } else {
        let card = {};
        card['cardNumber'] = Number(cardNum);
        card['expirationDate'] = expirationDate;
        card['securityNumber'] = Number(securityNumber);
        this._creditCard = card;
      }
    } else {
      throw new Error(`Missing credit card information`);
    }
  }

  get creditCard() {
    return this._creditCard;
  }

  set creditCard(value) {
    let card = {};
    if (value === undefined) {
      card['cardNumber'] = 1111;
      card['expirationDate'] = '';
      card['securityNumber'] = 111;
    } else {
      if (typeof value[0] !== 'number' || typeof value[2] !== 'number') {
        throw new Error(`Invalid credit card details`);
      } else {
        card['cardNumber'] = Number(value[0]);
        card['expirationDate'] = value[1];
        card['securityNumber'] = Number(value[2]);
      }
    }
    this._creditCard = card;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(value) {
    if (value.length === 3) {
      let nameValidator = /\b[A-Z][a-z]+\b/;
      if (
        nameValidator.test(value[0]) &&
        nameValidator.test(value[1]) &&
        nameValidator.test(value[2])
      ) {
        let fullName = {};
        fullName['firstName'] = value[0];
        fullName['middleName'] = value[1];
        fullName['lastName'] = value[2];
        this._fullName = fullName;
      } else {
        throw new Error(`Invalid full name`);
      }
    } else {
      throw new Error(
        `Name must include first name, middle name and last name`
      );
    }
  }

  generateIDNumber() {
    let firstNameLetter = this._fullName['firstName'].charCodeAt(0);
    let formula = 231 * firstNameLetter + 139 * this.fullName.middleName.length;
    let lastChar = this._fullName.lastName.slice(-1);
    if (isVowel(lastChar)) {
      formula += '8';
    } else {
      formula += '7';
    }
    return (this._idNumber = formula);

    function isVowel(c) {
      return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1;
    }
  }
}

// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(['Vania', 'Ivanova', 'Zhivkova']);

let vacationer2 = new Vacationer(
  ['Tania', 'Ivanova', 'Zhivkova'],
  [123456789, '10/01/2018', 777]
);

// Should throw an error (Invalid full name)
try {
  let vacationer3 = new Vacationer(['Vania', 'Ivanova', 'ZhiVkova']);
} catch (err) {
  console.log('Error: ' + err.message);
}

// Should throw an error (Missing credit card information)
try {
  let vacationer3 = new Vacationer(['Zdravko', 'Georgiev', 'Petrov']);
  vacationer3.addCreditCardInfo([123456789, '20/10/2018']);
} catch (err) {
  console.log('Error: ' + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());
