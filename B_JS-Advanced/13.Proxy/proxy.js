const movie = {
  title: 'Some movie',
  year: 2020,
};

const movieController = {
  get(obj, propName) {
    if (propName === 'year') {
      return obj[propName] + 1;
    }

    return obj[propName] || 'Invalid property name';
  },
  set(obj, propName, value) {
    if (propName === 'name') {
      return;
    }

    obj[propName] = value;
  },
};

// the first parameter is the actual object, the second is the wrapper  for the first object which will add additional logic
const movieProxy = new Proxy(movie, movieController);

console.log(movieProxy.title); // Some movie
console.log(movieProxy.year); // 2021
console.log(movieProxy.hello); // Invalid property name

movieProxy.name = 'Not allowed';
console.log(movieProxy.name); // Invalid property name

movieProxy.genre = 'Action';
console.log(movieProxy.genre); // Action
