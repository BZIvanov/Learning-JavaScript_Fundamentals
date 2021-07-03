const cache = {};

function memoizedAddTo80(n) {
  // side note - in keyword unlike hasOwnProperty allow us to check not only for property/method on the specific object, but also up in the prototype chain
  if (n in cache) {
    console.log('from cache');
    return cache[n];
  } else {
    console.log('new value');
    cache[n] = n + 80;
    return cache[n];
  }
}

memoizedAddTo80(5);
memoizedAddTo80(5);
