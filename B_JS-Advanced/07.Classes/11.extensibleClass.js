const extensible = (function () {
  let id = 0;

  return class Extensible {
    constructor() {
      this.id = id++;
    }

    extend(template) {
      for (const prop in template) {
        if (typeof template[prop] === 'function') {
          Extensible.prototype[prop] = template[prop];
        } else {
          this[prop] = template[prop];
        }
      }
    }
  };
})();

const obj1 = new extensible();
const obj2 = new extensible();
const obj3 = new extensible();
console.log(obj1.id); // 0
console.log(obj2.id); // 1
console.log(obj3.id); // 2
