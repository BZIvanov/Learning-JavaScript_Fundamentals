function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    // Write your code here

    let product = $(".custom-select");
    product.on("keyup", checkProduct);
    let submitButton = $("#submit");
    submitButton.on("click", submitData);
    let list = $("ul.display");
    let price = $("#price");
    let quantity = $("#quantity");
    let capacity = $("#capacity");
    let sum = $("#sum");
    let currentCapacity = 0;
    let currentSum = 0;
    
    function checkProduct() {
        if ($(this).val() !== "") {
            submitButton.removeAttr("disabled");
        } else {
            submitButton.attr("disabled", "disabled");
        }
    }
    
    function submitData() {
        currentCapacity += +quantity.val();
        currentSum += +price.val();
        
        let textItem = `Product: ${product.val()} Price: ${price.val()} Quantity: ${quantity.val()}`;
        let liElement = $("<li>").text(textItem);
        liElement.appendTo(list);

        capacity.val(currentCapacity);
        sum.val(currentSum);

        product.val("");
        price.val(1);
        quantity.val(1);
        submitButton.attr("disabled", "disabled");

        if (currentCapacity >= 150) {
            capacity.val("full").addClass("fullCapacity");

            product.attr("disabled", "disabled");
            price.attr("disabled", "disabled");
            quantity.attr("disabled", "disabled");
            submitButton.attr("disabled", "disabled");
        }
    }
}
