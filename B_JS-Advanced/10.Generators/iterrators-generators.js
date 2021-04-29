const school = {
  students: ['Iva', 'Ani', 'Trifon'],
  [Symbol.iterator]: function* () {
    let currentIndex = 0;
    while (currentIndex < this.students.length) {
      yield this.students[currentIndex];
      currentIndex++;
    }
  },
};

// when the loop is executing it goes to the student object and searches for Symbol.iterator and when it finds it should return generator function
// and the 'next' function from the generator will be called every time until 'done' for the generator becomes 'true'
// also note that for the loop we provide the entire object, not an array so we can find and use our custome symbol.iterator
for (const student of school) {
  console.log(student);
}

// side note: for the below array in the proto we can see that we have provided by default symbol.iterator
const someArray = [1, 2];
