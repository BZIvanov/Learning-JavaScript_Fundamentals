// Optional chaining allows you to safely access deeply nested properties or methods
// without having to check if each reference in the chain is valid.

const users = [
  { name: "John", greet: (message) => console.log(`Hello, ${message}`) },
  { name: "Jane" },
];

users[0].greet("user"); // Outputs: Hello, user
users[1].greet?.("there"); // Outputs: undefined (no error thrown)
