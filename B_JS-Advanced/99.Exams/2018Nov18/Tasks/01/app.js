function acceptance() {
	let company = $('#fields input[name="shippingCompany"]');
	let product = $('#fields input[name="productName"]');
	let quantity = $('#fields input[name="productQuantity"]');
	let scrape = $('#fields input[name="productScrape"]');
	let wh = $("#warehouse");

	if (company.val() !== "" && product.val() !== "" && !isNaN(+quantity.val()) && !isNaN(+scrape.val())) {
		let q = +quantity.val();
		let s = +scrape.val();
		if (q > s) {
			let divElement = $("<div>");
			let pElement = $(`<p>[${company.val()}] ${product.val()} - ${q - s} pieces</p>`);

			let button = $(`<button type="button">Out of stock</button>`);

			button.on("click", function() {
				$(this).parent().remove();
			});

			divElement.append(pElement);
			divElement.append(button);
			wh.append(divElement);

			company.val("");
			product.val("");
			quantity.val("");
			scrape.val("");
		}
	}
}
