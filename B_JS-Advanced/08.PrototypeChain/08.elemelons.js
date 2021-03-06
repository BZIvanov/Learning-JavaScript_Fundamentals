function generateMelonClasses() {
  class Melon {
    constructor(weight, melonSort) {
      if (new.target === Melon) {
        throw new Error('Melon class cannot be instantiated.');
      }

      this.weight = weight;
      this.melonSort = melonSort;
      this.element = '';
    }

    get elementIndex() {
      return this.weight * this.melonSort.length;
    }

    toString() {
      let output = `Element: ${this.element}\n`;
      output += `Sort: ${this.melonSort}\n`;
      output += `Element Index: ${this.elementIndex}`;

      return output;
    }
  }

  class Watermelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Water';
    }
  }

  class Firemelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Fire';
    }
  }

  class Earthmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Earth';
    }
  }

  class Airmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Air';
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this._elements = ['Water', 'Fire', 'Earth', 'Air'];
      this.morph();
    }

    morph() {
      let current = this._elements.shift();
      this.element = current;
      this._elements.push(current);
    }
  }

  return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon };
}

const m = generateMelonClasses();
const test = new m.Melon(100, 'Test');
//Throws error

const watermelon = new m.Watermelon(12.5, 'Kingsize');
console.log(watermelon.toString());
// Element: Water
// Sort: Kingsize
// Element Index: 100
