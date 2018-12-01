function attachEvents() {
    const appID = "kid_r1h92f607";
    const baseURL = "https://baas.kinvey.com/appdata/" + appID + "/";
    const username = "Fisher";
    const password = "f";
    const base64encode = btoa(username + ":" + password);
    const authHeaders = { "Authorization": "Basic " + base64encode };

    let loadButton = $("button.load");
    let addButton = $("button.add");
    loadButton.on("click", loadCatches);
    addButton.on("click", addCatch);

    function addCatch() {
        let anglerVal = $("#addForm .angler");
        let weightVal = $("#addForm .weight");
        let speciesVal = $("#addForm .species");
        let locVal = $("#addForm .location");
        let baitVal = $("#addForm .bait");
        let captureVal = $("#addForm .captureTime");

        let tempObject = {
            angler: anglerVal.val(),
            weight: +weightVal.val(),
            species: speciesVal.val(),
            location: locVal.val(),
            bait: baitVal.val(),
            captureTime: +captureVal.val()
        }

        anglerVal.val("");
        weightVal.val("");
        speciesVal.val("");
        locVal.val("");
        baitVal.val("");
        captureVal.val("");

        $.ajax({
            method: "POST",
            url: baseURL + "biggestCatches",
            headers: {"Authorization": "Basic " + base64encode, "Content-type": "application/json"},
            data: JSON.stringify(tempObject)
        })
        .then(loadCatches)
        .catch(displayError);
    }

    function loadCatches() {
        $.ajax({
            method: "GET",
            url: baseURL + "biggestCatches",
            headers: authHeaders
        })
        .then(displayCatches)
        .catch(displayError)
    }

    function displayCatches(catchers) {
        $("#catches").empty();
        for(let catcher of catchers) {
            let mainDiv = $(`<div class="catch" data-id="${catcher._id}">`);

            let anglerLabel = $("<label>Angler</label>");
            anglerLabel.appendTo(mainDiv);
            let anglerText = $(`<input type="text" class="angler" value="${catcher.angler}"/>`);
            anglerText.appendTo(mainDiv);
            let weightLabel = $("<label>Weight</label>");
            weightLabel.appendTo(mainDiv);
            let weightText = $(`<input type="number" class="weight" value="${catcher.weight}"/>`);
            weightText.appendTo(mainDiv);
            let speciesLabel = $("<label>Species</label>");
            speciesLabel.appendTo(mainDiv);
            let speciesText = $(`<input type="text" class="species" value="${catcher.species}"/>`);
            speciesText.appendTo(mainDiv);
            let locLabel = $("<label>Location</label>");
            locLabel.appendTo(mainDiv);
            let locText = $(`<input type="text" class="location" value="${catcher.location}"/>`);
            locText.appendTo(mainDiv);
            let baitLabel = $("<label>Bait</label>");
            baitLabel.appendTo(mainDiv);
            let baitText = $(`<input type="text" class="bait" value="${catcher.bait}"/>`);
            baitText.appendTo(mainDiv);
            let captureLabel = $("<label>Capture Time</label>");
            captureLabel.appendTo(mainDiv);
            let captureText = $(`<input type="number" class="captureTime" value="${catcher.captureTime}"/>`);
            captureText.appendTo(mainDiv);

            let updateButton = $('<button class="update">Update</button>');
            let deleteButton = $('<button class="delete">Delete</button>');
            updateButton.on("click", updateInfo);
            deleteButton.on("click", deleteCatcher);

            updateButton.appendTo(mainDiv);
            deleteButton.appendTo(mainDiv);
            
            mainDiv.appendTo($("#catches"));
        }
    }

    function updateInfo() {
        let catcherID = $(this).parent().attr("data-id");

        let anglerVal = $(`div[data-id="${catcherID}"] .angler`);
        let weightVal = $(`div[data-id="${catcherID}"] .weight`);
        let speciesVal = $(`div[data-id="${catcherID}"] .species`);
        let locVal = $(`div[data-id="${catcherID}"] .location`);
        let baitVal = $(`div[data-id="${catcherID}"] .bait`);
        let captureVal = $(`div[data-id="${catcherID}"] .captureTime`);

        let tempObject = {
            angler: anglerVal.val(),
            weight: +weightVal.val(),
            species: speciesVal.val(),
            location: locVal.val(),
            bait: baitVal.val(),
            captureTime: +captureVal.val()
        }

        $.ajax({
            method: "PUT",
            url: baseURL + "biggestCatches/" + catcherID,
            headers: {"Authorization": "Basic " + base64encode, "Content-type": "application/json"},
            data: JSON.stringify(tempObject)
        })
        .then(loadCatches)
        .catch(displayError);
    }

    function deleteCatcher() {
        let catcherID = $(this).parent().attr("data-id");
        
        $.ajax({
            method: "DELETE",
            url: baseURL + "biggestCatches/" + catcherID,
            headers: {"Authorization": "Basic " + base64encode, "Content-type": "application/json"}
        })
        .then(loadCatches)
        .catch(displayError);
    }

    function displayError(error) {
        console.log(error);
    }
}