// example of using flatMap to flatten an array of arrays
const nestedArrays = [[1, 2], [3, 4], [5]];

const flattenedArray = nestedArrays.flatMap((arr) => arr);

console.log(flattenedArray); // Output: [1, 2, 3, 4, 5]

// Example of using flatMap to transform and flatten an array of objects
const users = [
  { name: "Alice", hobbies: ["reading", "hiking"] },
  { name: "Bob", hobbies: ["gaming"] },
  { name: "Charlie", hobbies: ["cooking", "traveling"] },
];

const allHobbies = users.flatMap((user) => user.hobbies);

console.log(allHobbies); // Output: ['reading', 'hiking', 'gaming', 'cooking', 'traveling']

// Example of using flatMap to create a new array with transformed values from nested arrays
const numbers = [1, 2, 3, 4];

const doubledAndFlattened = numbers.flatMap((num) => [num, num * 2]);

console.log(doubledAndFlattened); // Output: [1, 2, 2, 4, 3, 6, 4, 8]

// Example of using flatMap to filter and transform an array
const mixedArray = [1, "two", 3, "four", 5];

const filteredAndTransformed = mixedArray.flatMap((item) =>
  typeof item === "number" ? item * 2 : []
);

console.log(filteredAndTransformed); // Output: [2, 6, 10]
