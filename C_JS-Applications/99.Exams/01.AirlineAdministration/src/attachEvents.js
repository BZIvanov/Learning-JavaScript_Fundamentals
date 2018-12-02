function showHideLinks() {
    hideAllLinks();

    // this will check if we have any user logged in
    if (sessionStorage.getItem("authToken")) {
        $('#linkFlights').show()
        $('#linkLogout').show()
    } else {
        $('#linkLogin').show()
        $('#linkRegister').show()
    }
}

async function showHomeView() {
    $('#linkLogout > span').text("Welcome, " + sessionStorage.getItem("username") + "!")
    hideAllViews()
    $("#viewCatalog > div > a").remove()
    if (sessionStorage.getItem("username")) {
        $("#viewCatalog > a").show()
        let flights = await kinveyRequester.getAllPublicFlight()
        renderHomeView(flights)
        $('#viewCatalog').show()
    } else {
        $("#viewCatalog > a").hide()
    }
}

function hideAllViews() {
    $('#container > section').hide()
}

function hideAllLinks() {
    $('#linkFlights').hide()
    $('#linkLogin').hide()
    $('#linkRegister').hide()
    $('#linkLogout').hide()
}

function attachLinkEvents() {
    $('#linkHome').on('click', function () {
        hideAllViews()
        $('#viewCatalog').show()
    })
    $('#linkFlights').on('click', async function () {
        hideAllViews()
        let flights = await kinveyRequester.getMyFlights()
        renderMyFlights(flights)
        $('#viewMyFlights').show()
    })
    $('#linkLogin').on('click', function () {
        hideAllViews()
        $('#viewLogin').show()
    })
    $('#linkRegister').on('click', function () {
        hideAllViews()
        $('#viewRegister').show()
    })
    $('#viewCatalog > a').on('click', function () {
        hideAllViews()
        $('#viewAddFlight').show()
    })
}

