function sortArray(inputArray, sortMethod) {
  const ascending = function (a, b) {
    return a - b;
  };
  const descending = function (a, b) {
    return b - a;
  };

  const sortingWay = {
    asc: ascending,
    desc: descending,
  };

  return inputArray.sort(sortingWay[sortMethod]);
}
console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
