function orderRectangles(inputs) {
  const rectangles = [];

  for (const input of inputs) {
    const tempObj = {
      width: input[0],
      height: input[1],
      area: function () {
        return this.width * this.height;
      },
      compareTo: function (other) {
        return other.area() - this.area() || other.width - this.width;
      },
    };

    rectangles.push(tempObj);
  }

  rectangles.sort((a, b) => a.compareTo(b));
  return rectangles;
}

console.log(
  orderRectangles([
    [10, 5],
    [3, 20],
    [5, 12],
  ])
);

console.log(
  orderRectangles([
    [1, 20],
    [20, 1],
    [5, 3],
    [5, 3],
  ])
);
