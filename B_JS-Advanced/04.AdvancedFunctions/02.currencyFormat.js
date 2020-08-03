function currencyFormatter(separator, symbol, symbolFirst, value) {
  let result = Math.trunc(value) + separator;
  result += value.toFixed(2).substr(-2, 2);
  if (symbolFirst) return symbol + ' ' + result;
  else return result + ' ' + symbol;
}

function getDollarFormatter(currency) {
  function formatter(currency) {
    return currencyFormatter(',', '$', true, currency);
  }
  return formatter(currency);
}

console.log(getDollarFormatter(5345));
