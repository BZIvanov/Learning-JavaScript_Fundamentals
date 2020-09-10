function attachButtonEvents() {
  $('#formRegister').on('submit', function (event) {
    event.preventDefault();
    const username = $('#formRegister input[name=username]').val();
    const password = $('#formRegister input[name=pass]').val();
    const checkPass = $('#formRegister input[name=checkPass]').val();
    if (username.length > 4 && password === checkPass && password) {
      kinveyRequester.registerUser(username, password);
    } else if (username.length < 5) {
      showError('Username must be at least 5 characters long!');
    } else if (password !== checkPass) {
      showError('Password does not match!');
    } else {
      showError('Username and password can not be empty!');
    }
  });

  $('#formLogin').on('submit', function (event) {
    event.preventDefault();
    const username = $('#formLogin input[name=username]').val();
    const password = $('#formLogin input[name=pass]').val();
    kinveyRequester.loginUser(username, password);
  });

  $('#linkLogout > a').on('click', function () {
    kinveyRequester.logoutUser();
  });

  $('#formAddFlight').on('submit', function (event) {
    event.preventDefault();
    const destination = $('#formAddFlight input[name=destination]').val();
    const origin = $('#formAddFlight input[name=origin]').val();
    const departureDate = $('#formAddFlight input[name=departureDate]').val();
    const departureTime = $('#formAddFlight input[name=departureTime]').val();
    const seats = $('#formAddFlight input[name=seats]').val();
    const cost = $('#formAddFlight input[name=cost]').val();
    const img = $('#formAddFlight input[name=img]').val();
    const isPublic = $('#formAddFlight input[type=checkbox]').is(':checked');
    if (
      destination &&
      origin &&
      departureDate &&
      departureTime &&
      seats &&
      cost
    ) {
      kinveyRequester.postFlight(
        destination,
        origin,
        departureDate,
        departureTime,
        seats,
        cost,
        img,
        isPublic
      );
    } else {
      showError('Please fill all the fields.');
    }
  });

  $('#formEditFlight').on('submit', function (event) {
    event.preventDefault();
    const id = $('#viewEditFlight').attr('flightId');
    const destination = $('#formEditFlight input[name=destination]').val();
    const origin = $('#formEditFlight input[name=origin]').val();
    const departureDate = $('#formEditFlight input[name=departureDate]').val();
    const departureTime = $('#formEditFlight input[name=departureTime]').val();
    const seats = $('#formEditFlight input[name=seats]').val();
    const cost = $('#formEditFlight input[name=cost]').val();
    const img = $('#formEditFlight input[name=img]').val();
    const isPublic = $('#formEditFlight input[type=checkbox]').is(':checked');
    kinveyRequester.editFlight(
      id,
      destination,
      origin,
      departureDate,
      departureTime,
      seats,
      cost,
      img,
      isPublic
    );
  });
}
