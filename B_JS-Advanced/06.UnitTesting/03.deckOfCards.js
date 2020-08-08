function printDeckOfCards(cards) {
  function makeCard(face, suit) {
    const validFaces = [
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
    const validSuits = {
      S: '\u2660', // ♠
      H: '\u2665', // ♥
      D: '\u2666', // ♦
      C: '\u2663', // ♣
    };

    if (!validFaces.includes(face) || !validSuits.hasOwnProperty(suit)) {
      throw new Error('Invalid card: ' + face + suit);
    }

    const card = {
      face: face,
      suit: suit,
      toString: () => {
        return card.face + validSuits[card.suit];
      },
    };

    return card;
  }

  for (let i = 0; i < cards.length; i++) {
    const f = cards[i].substring(0, cards[i].length - 1);
    const s = cards[i].substr(cards[i].length - 1, 1);
    try {
      cards[i] = makeCard(f, s);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  console.log(cards.join(' '));
}
printDeckOfCards(['AS', '10D', 'KH', '2C']); // A♠ 10♦ K♥ 2♣
printDeckOfCards(['5S', '3D', 'QD', '1C']); // Invalid card: 1C
