function makeReservation(container) {
    const submitButton = $("#submit");
    submitButton.on("click", submitInfo);
    const editButton = $("#edit");
    editButton.on("click", editInfoAdded);
    const continueButton = $("#continue");
    continueButton.on("click", continueRequest);
    

    const fullName = $("#fullName");
    const email = $("#email");
    const phone = $("#phoneNumber");
    const address = $("#address");
    const postCode = $("#postalCode");

    // 1. ger person info
    const infoArea = $("#infoPreview");
    function submitInfo() {
        infoArea.empty();
        
        if(fullName.val() !== "" && email.val() !== "") {
            fillArea("Name: ", fullName.val());
            fillArea("E-mail: ", email.val());
            fillArea("Phone: ", phone.val());
            fillArea("Address: ", address.val());
            fillArea("Postal Code: ", postCode.val());

            submitButton.attr("disabled", "disabled");
            editButton.removeAttr("disabled");
            continueButton.removeAttr("disabled");
        } else {
            return;
        }

        fullName.val("")
        email.val("")
        phone.val("")
        address.val("")
        postCode.val("")
    }

    function fillArea(d1, d2) {
        if(d2 !== "") {
            $("<li>").text(d1 + d2).appendTo(infoArea);
        }
    }
    

    // 2. edit person info
    function editInfoAdded() {
        let items = $("#infoPreview li")
            .toArray()
            .map((x) => x.textContent)
            .forEach((y) => {
                checkWhichInput(y);
            });
        
        infoArea.empty();

        submitButton.removeAttr("disabled");
        editButton.attr("disabled", "disabled");
        continueButton.attr("disabled", "disabled");
    }

    function checkWhichInput(text) {
        if(text.startsWith("Name: ")) {
            fillDataBack(fullName, text.substring(6))
        } else if(text.startsWith("E-mail: ")) {
            fillDataBack(email, text.substring(8))
        } else if(text.startsWith("Phone: ")) {
            fillDataBack(phone, text.substring(7))
        } else if(text.startsWith("Address: ")) {
            fillDataBack(address, text.substring(9))
        } else if(text.startsWith("Postal Code: ")) {
            fillDataBack(postCode, text.substring(13))
        }
    }

    function fillDataBack(i, t) {
        i.val(t);
    }

    // 3. continue to payment
    function continueRequest() {
        let paymentArea = $(container);

        $("<h2>Payment details</h2>").appendTo(paymentArea);
        let selectEl = $('<select id="paymentOptions" class="custom-select"></select>');
        let firstOption = $('<option selected disabled hidden>Choose</option>');
        firstOption.appendTo(selectEl);
        let secondOption = $('<option value="creditCard">Credit Card</option>');
        secondOption.appendTo(selectEl);
        let thirdOption = $('<option value="bankTransfer">Bank Transfer</option>');
        thirdOption.appendTo(selectEl);
        selectEl.appendTo(paymentArea);

        let extraDiv = $('<div id=extraDetails></div>')
        extraDiv.appendTo(paymentArea);

        submitButton.attr("disabled", "disabled");
        editButton.attr("disabled", "disabled");
        continueButton.attr("disabled", "disabled");

        selectEl.on("change", paymentOptionInfo)

        function paymentOptionInfo(event) {
            if(event.target.value === "creditCard") {
                extraDiv.empty();

                let cardNumberDiv = $('<div class="inputLabel">Card Number</div>');
                let cardNumberInput = $('<input>');
                cardNumberInput.appendTo(cardNumberDiv);
                cardNumberDiv.appendTo(extraDiv);
                let firstbr = $('<br>');
                firstbr.appendTo(extraDiv);

                let expirationDiv = $('<div class="inputLabel">Expiration Date</div>');
                let expirationInput = $('<input>');
                expirationInput.appendTo(expirationDiv);
                expirationDiv.appendTo(extraDiv);
                let secondbr = $('<br>');
                secondbr.appendTo(extraDiv);

                let securityDiv = $('<div class="inputLabel">Security Numbers</div>');
                let securityInput = $('<input>');
                securityInput.appendTo(securityDiv);
                securityDiv.appendTo(extraDiv);
                let thirdbr = $('<br>');
                thirdbr.appendTo(extraDiv);

                let checkOut = $('<button id="checkOut">Check Out</button>');
                checkOut.appendTo(extraDiv);
                $("#checkOut").on("click", checkOutOffer);

            } else if(event.target.value === "bankTransfer") {
                extraDiv.empty();

                let pEl = $('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>');
                pEl.appendTo(extraDiv);

                let checkOut = $('<button id="checkOut">Check Out</button>');
                checkOut.appendTo(extraDiv);
                $("#checkOut").on("click", checkOutOffer);
            }
        }
    }

    function checkOutOffer() {
        $("#wrapper").empty();

        let greeting = $("<h4>Thank you for your reservation!</h4>");
        greeting.appendTo($("#wrapper"));
    }
}