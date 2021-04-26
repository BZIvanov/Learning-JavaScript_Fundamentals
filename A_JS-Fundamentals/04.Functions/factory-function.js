function taxCalculator(tax) {
  function calcTax(value) {
    return value * tax;
  }

  return calcTax;
}

const vatValue = taxCalculator(0.2);
const profitValue = taxCalculator(0.3);

console.log(vatValue(100));
console.log(vatValue(150));
console.log(profitValue(200));
