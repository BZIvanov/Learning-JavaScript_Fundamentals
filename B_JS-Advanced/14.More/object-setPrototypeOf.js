const obj = { firstName: 'Iva', lastName: 'Ivanova' };

const objProto = {
  printFullName() {
    console.log(this.firstName + ' ' + this.lastName);
  },
};

// this is one of the ways of how we can attach methods to the object prototype
Object.setPrototypeOf(obj, objProto);

console.log('All the props including up in the prototype chain');
for (const prop in obj) {
  console.log('---' + prop + '  ' + typeof obj[prop]);
}

console.log('Only props owned by the obj');
for (const prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log('---' + prop + '  ' + typeof obj[prop]);
  }
}
