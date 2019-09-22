function attachButtonEvents() {
    $('#formRegister').on('submit', function (event) {
        event.preventDefault();
        let username = $("#formRegister input[name=username]").val();
        let password = $("#formRegister input[name=pass]").val();
        let checkPass = $("#formRegister input[name=checkPass]").val();
        if (username.length > 4 && password === checkPass && password) {
            kinveyRequester.registerUser(username, password);
        } else if (username.length < 5) {
            showError("Username must be at least 5 characters long!");
        } else if (password !== checkPass) {
            showError("Password does not match!");
        } else {
            showError("Username and password can not be empty!");
        }
    });

    $('#formLogin').on('submit', function (event) {
        event.preventDefault();
        let username = $("#formLogin input[name=username]").val();
        let password = $("#formLogin input[name=pass]").val();
        kinveyRequester.loginUser(username, password);
    });

    $("#linkLogout > a").on('click', function () {
        kinveyRequester.logoutUser();
    });

    $("#formAddFlight").on('submit', function (event) {
        event.preventDefault();
        let destination = $("#formAddFlight input[name=destination]").val();
        let origin = $("#formAddFlight input[name=origin]").val();
        let departureDate = $("#formAddFlight input[name=departureDate]").val();
        let departureTime = $("#formAddFlight input[name=departureTime]").val();
        let seats = $("#formAddFlight input[name=seats]").val();
        let cost = $("#formAddFlight input[name=cost]").val();
        let img = $("#formAddFlight input[name=img]").val();
        let isPublic = $("#formAddFlight input[type=checkbox]").is(':checked');
        if (destination && origin && departureDate && departureTime && seats && cost) {
            kinveyRequester.postFlight(destination, origin, departureDate, departureTime,
                seats, cost, img, isPublic);
        } else {
            showError("Please fill all the fields.");
        }
    })

    $("#formEditFlight").on('submit', function (event) {
        event.preventDefault();
        let id = $('#viewEditFlight').attr('flightId');
        let destination = $("#formEditFlight input[name=destination]").val();
        let origin = $("#formEditFlight input[name=origin]").val();
        let departureDate = $("#formEditFlight input[name=departureDate]").val();
        let departureTime = $("#formEditFlight input[name=departureTime]").val();
        let seats = $("#formEditFlight input[name=seats]").val();
        let cost = $("#formEditFlight input[name=cost]").val();
        let img = $("#formEditFlight input[name=img]").val();
        let isPublic = $("#formEditFlight input[type=checkbox]").is(':checked');
        kinveyRequester.editFlight(id, destination, origin, departureDate, departureTime, seats,
            cost, img, isPublic);
    })
}
