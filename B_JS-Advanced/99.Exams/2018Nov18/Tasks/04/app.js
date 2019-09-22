function realEstateAgency() {
	let rentPrice = $('#regOffer input[name="apartmentRent"]');
	let apartmentType = $('#regOffer input[name="apartmentType"]');
	let comissionRate = $('#regOffer input[name="agencyCommission"]');
	let regOfferButton = $('#regOffer button[name="regOffer"]');
	let building = $("#building");
	let notification = $("#notifications");

	let familyBudget = $('#findOffer input[name="familyBudget"]');
	let searchedType = $('#findOffer input[name="familyApartmentType"]');
	let familyName = $('#findOffer input[name="familyName"]');
	let findOfferButton = $('#findOffer button[name="findOffer"]');
	
	let agency = $("#roof h1");
	
	regOfferButton.on("click", function () {
		let areValid = validInputs();
		function validInputs() {
			let rp = false;
			let cr = false;
			let at = false;
			if (+rentPrice.val() > 0) {
				rp = true;
			} else {
				rp = false;
			}
			if (+comissionRate.val() >= 0 && +comissionRate.val() <= 100) {
				cr = true;
			} else {
				cr = false;
			}
			if (apartmentType.val() !== "" && !(apartmentType.val().indexOf(":") > -1)) {
				at = true;
			} else {
				at = false;
			}
			if (rp && cr && at) {
				return true;
			} else {
				return false;
			}
		}

		if (areValid) {
			notification.empty();
			let divElement = $('<div class="apartment"></div>');
			let pRent = $(`<p>Rent: ${rentPrice.val()}</p>`);
			let pType = $(`<p>Type: ${apartmentType.val()}</p>`);
			let pComission = $(`<p>Commission: ${comissionRate.val()}</p>`);

			let notifySuccess = $('<p id="message">Your offer was created successfully.</p>');
			
			divElement.append(pRent);
			divElement.append(pType);
			divElement.append(pComission);
			building.append(divElement);

			notification.append(notifySuccess);
		} else {
			notification.empty();
			let notifyFail = $('<p id="message">Your offer registration went wrong, try again.</p>');
			notification.append(notifyFail);
		}

		rentPrice.val("");
		apartmentType.val("");
		comissionRate.val("");
	});

	findOfferButton.on("click", function() {
		let fam = familyName.val();
		let secondAreValid = validInputsTwo();
		function validInputsTwo() {
			let fb = false;
			let st = false;
			let fn = false;
			if (+familyBudget.val() > 0) {
				fb = true;
			} else {
				fb = false;
			}
			if (+searchedType.val() !== "") {
				st = true;
			} else {
				st = false;
			}
			if (familyName.val() !== "" ) {
				fn = true;
			} else {
				fn = false;
			}
			if (fb && st && fn) {
				return true;
			} else {
				return false;
			}
		}

		if (secondAreValid) {
			let availableOffers = [];
			let ofrs = building.children();
			let entriesValid = true;
			for (let i = 0; i < ofrs.length; i++) {
				let tempObj = {};
				let priceAsked = Number($(ofrs[i]).find("p").eq(0).text().substring(6));
				let apartType = $(ofrs[i]).find("p").eq(1).text().substring(6);
				let comRate = Number($(ofrs[i]).find("p").eq(2).text().substring(12));
				let total = priceAsked + (priceAsked * (comRate / 100));
				tempObj = { total, apartType, priceAsked, comRate };

				availableOffers.push(tempObj);
			}

			let agencyProfit = 0;
			for (let i = 0; i < availableOffers.length; i++) {
				if (searchedType.val() === availableOffers[i].apartType && +familyBudget.val() >= availableOffers[i].total) {
					entriesValid = false;
					let currentHouse = $(building).find("div").eq(i);
					currentHouse.attr("style", "border: 2px solid red;");
					currentHouse.empty();

					let pa = $(`<p>${familyName.val()}</p>`);
					let pb = $(`<p>live here now</p>`);
					let pbutton = $(`<button>MoveOut</button>`);
					
					pbutton.on("click", function() {
						notification.empty();
						let noty = $(`<p id="message">They had found cockroaches in ${fam}\'s apartment</p>`);
						$(this).parent().remove();
						notification.append(noty);
					});

					agencyProfit += (availableOffers[i].priceAsked * (availableOffers[i].comRate / 100)) * 2;
					agency.text(`Agency profit: ${agencyProfit} lv.`);
					currentHouse.append(pa);
					currentHouse.append(pb);
					currentHouse.append(pbutton);

					notification.empty();
					let notif = $('<p id="message">Enjoy your new home! :))</p>');
					notification.append(notif);
				}
			}
			if (entriesValid) {
				notification.empty();
				let notif = $('<p id="message">We were unable to find you a home, so sorry :(</p>');
				notification.append(notif);
			}
		} else {
			notification.empty();
			let notif = $('<p id="message">We were unable to find you a home, so sorry :(</p>');
			notification.append(notif);
		}
		familyBudget.val("");
		searchedType.val("");
		familyName.val("");
	});
}
