outerLoop: for (let i = 0; i < 3; i++) {
  console.log('-Outer-', i);
  innerLoop: for (let j = 0; j < 3; j++) {
    if (j === 2) {
      break outerLoop;
    }
    console.log('Inner', j);
  }
}
