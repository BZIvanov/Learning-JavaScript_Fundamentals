function subsum(arr, start, end) {
  if (!Array.isArray(arr)) {
    return NaN;
  }
  if (start < 0) {
    start = 0;
  }
  if (end > arr.length - 1) {
    end = arr.length - 1;
  }

  let sum = 0;
  for (let i = start; i <= end; i++) {
    sum += +arr[i];
  }
  return sum;
}

console.log(subsum([10, 20, 30, 40, 50, 60], 3, 300));
