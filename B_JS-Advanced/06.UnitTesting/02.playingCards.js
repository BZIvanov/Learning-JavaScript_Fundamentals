function makeCard(face, suit) {
    const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J','Q', 'K', 'A'];
    const validSuits = {
        'S': "\u2660", // ♠
        'H': "\u2665", // ♥
        'D': "\u2666", // ♦
        'C': "\u2663", // ♣
    };    
    
    if (!validFaces.includes(face)) {
        throw new Error("Invalid card face: " + face);
    }
    if (!validSuits.hasOwnProperty(suit)) {
        throw new Error("Invalid card suit: " + suit);
    }
    
    let card = {
        face: face,
        suit: suit,
        toString: () => { 
            return card.face + validSuits[card.suit];
        }
    };
    
    return card;
}

console.log('' + makeCard('A', 'S'));