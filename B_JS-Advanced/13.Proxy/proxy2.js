class PrimaryGreetings {
  english() {
    return 'Hello';
  }

  spanish() {
    return 'Hola';
  }
}

class SecondaryGreetings {
  german() {
    return 'Hallo';
  }

  french() {
    return 'Bonjour';
  }
}

const primaryGreetings = new PrimaryGreetings();
const secondaryGreetings = new SecondaryGreetings();

const greetings = new Proxy(secondaryGreetings, {
  get: function (target, property) {
    return target[property] || primaryGreetings[property];
  },
});

console.log(greetings.english()); // Hello
console.log(greetings.spanish()); // Hola
console.log(greetings.german()); // Hallo
console.log(greetings.french()); // Bonjour
