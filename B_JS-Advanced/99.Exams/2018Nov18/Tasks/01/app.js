function acceptance() {
  const company = $('#fields input[name="shippingCompany"]');
  const product = $('#fields input[name="productName"]');
  const quantity = $('#fields input[name="productQuantity"]');
  const scrape = $('#fields input[name="productScrape"]');
  const wh = $('#warehouse');

  if (
    company.val() !== '' &&
    product.val() !== '' &&
    !isNaN(+quantity.val()) &&
    !isNaN(+scrape.val())
  ) {
    const q = +quantity.val();
    const s = +scrape.val();
    if (q > s) {
      const divElement = $('<div>');
      const pElement = $(
        `<p>[${company.val()}] ${product.val()} - ${q - s} pieces</p>`
      );

      const button = $(`<button type="button">Out of stock</button>`);

      button.on('click', function () {
        $(this).parent().remove();
      });

      divElement.append(pElement);
      divElement.append(button);
      wh.append(divElement);

      company.val('');
      product.val('');
      quantity.val('');
      scrape.val('');
    }
  }
}
