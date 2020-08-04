const result = (function () {
  const FACES = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];

  const SUITS = {
    CLUBS: '\u2663',
    DIAMONDS: '\u2666',
    HEARTS: '\u2665',
    SPADES: '\u2660',
  };

  class Card {
    constructor(face, suit) {
      this.face = face;
      this.suit = suit;
    }

    get face() {
      return this._face;
    }
    set face(face) {
      if (FACES.indexOf(face) < 0) {
        throw new Error('Not a valid face');
      }
      this._face = face;
    }

    get suit() {
      return this._suit;
    }
    set suit(suit) {
      if (
        [...Object.keys(SUITS)].filter((k) => SUITS[k] === suit).length <= 0
      ) {
        throw new Error('Not a valid suit');
      }
      this._suit = suit;
    }
  }

  return { Card, SUITS };
})();

const Card = result.Card;
const SUITS = result.SUITS;
const card = new Card('Q', SUITS.CLUBS);
card.face = 'A';
card.suit = SUITS.DIAMONDS;
const card2 = new Card('1', SUITS.DIAMONDS); // Should throw Error
