function generateClasses() {
  class Figure {
    constructor() {
      // both if's will simulate abstract class, preventing it from being instantiated
      if (new.target === Figure) {
        throw new Error('Abstract class cannot be instantiated');
      }
      if (this.constructor === Figure) {
        throw new Error('Abstract class cannot be instantiated');
      }
    }

    get area() {}

    toString() {
      return `${this.constructor.name} - `;
    }
  }

  class Circle extends Figure {
    constructor(radius) {
      super();
      this.radius = radius;
    }

    get area() {
      return Math.PI * this.radius * this.radius;
    }

    toString() {
      return super.toString() + `radius: ${this.radius}`;
    }
  }

  class Rectangle extends Figure {
    constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
    }

    get area() {
      return this.width * this.height;
    }

    toString() {
      return super.toString() + `width: ${this.width}, height: ${this.height}`;
    }
  }

  return { Figure, Circle, Rectangle };
}

const objectClasses = generateClasses();

const f = new objectClasses.Figure(); // Error

const c = new objectClasses.Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Circle - radius: 5

const r = new objectClasses.Rectangle(3, 4);
console.log(r.area); // 12
console.log(r.toString()); // Rectangle - width: 3, height: 4
