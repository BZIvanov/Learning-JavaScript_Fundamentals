const cache = {};

function memoizedAddTo80(n) {
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
