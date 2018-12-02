function renderHomeView(flights) {
    for (const flight of flights) {
        let a = $(`<a href="#" class="added-flight"></a>`).on('click', function () {
            renderDetailsView(flight)
        })
        a.append($(`<img src="${flight.img}" alt="" class="picture-added-flight">`))
        a.append($(`<h3>${flight.destination}</h3>`))
        a.append($(`<span>from ${flight.origin}</span><span>${flight.departureDate}</span>`))
        $("#viewCatalog > div").append(a)
    }
}

function renderDetailsView(flight) {
    hideAllViews()
    $('#viewFlightDetails').show()
    $('#viewFlightDetails').empty()
    let mainDiv = $(`<div class="ticket-area"></div>`)
    mainDiv.append($(`<div class="ticket-area-left"><img src="${flight.img}" alt=""></div>`))
    let innerDiv = $(`<div class="ticket-area-right"></div>`)
    innerDiv.append($(`<h3>${flight.destination}</h3><div>from ${flight.origin}</div>`))
    let mostInnerDiv = $(`<div class="data-and-time">${flight.departureDate} ${flight.departureTime}</div>`)
    if (sessionStorage.getItem("userId") === flight._acl.creator) {
        mostInnerDiv.append($(`<a href="#" class="edit-flight-detail"></a>`).on('click', function (e) {
            e.stopPropagation()
            renderEditView(flight)
        }))
    }
    innerDiv.append(mostInnerDiv)
    innerDiv.append($(`<div>${flight.seats} Seats (${flight.cost} per seat)</div>`))
    mainDiv.append(innerDiv)
    $('#viewFlightDetails').append(mainDiv)
}

function renderEditView(flight) {
    hideAllViews()
    $('#viewEditFlight').show()
    $('#viewEditFlight').attr('flightId', flight._id)
    $("#formEditFlight input[name=destination]").val(flight.destination)
    $("#formEditFlight input[name=origin]").val(flight.origin)
    $("#formEditFlight input[name=departureDate]").val(flight.departureDate)
    $("#formEditFlight input[name=departureTime]").val(flight.departureTime)
    $("#formEditFlight input[name=seats]").val(Number(flight.seats))
    $("#formEditFlight input[name=cost]").val(Number(flight.cost))
    $("#formEditFlight input[name=img]").val(flight.img)
    $("#formEditFlight input[type=checkbox]").val(flight.isPublic)
}

function renderMyFlights(flights) {
    $('#viewMyFlights > div').remove()
    for (const f of flights) {
        let mainDiv = $(`<div class="flight-ticket"></div>`)
        mainDiv.append($(`<div class="flight-left"><img src="${f.img}" alt=""></div>`))
        let innerDiv = $('<div class="flight-right"></div>')
        innerDiv.append(`
            <div>
                <h3>${f.destination}</h3><span>${f.departureDate}</span>
            </div>
            <div>
                from ${f.origin} <span>${f.departureTime}</span>
            </div>
            <p>${f.seats} Seats (${f.cost}$ per seat) </p>`)
        innerDiv.append($(`<a href="#" class="remove">REMOVE</a>`).on('click', function (event) {
            kinveyRequester.removeFlight(f._id)
        }))
        innerDiv.append($(`<a href="#" class="details">Details</a>`).on('click', function (event) {
            renderDetailsView(f)
        }))
        mainDiv.append(innerDiv)
        $('#viewMyFlights').append(mainDiv)
    }
}