function isSymmetric(arr) {
  if (!Array.isArray(arr)) return false; // Non-arrays are non-symmetric
  const reversed = arr.slice(0).reverse(); // Clone and reverse
  const equal = JSON.stringify(arr) === JSON.stringify(reversed);
  return equal;
}

module.exports = { isSymmetric };
