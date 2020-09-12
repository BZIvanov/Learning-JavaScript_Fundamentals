handlers.displayHomeView = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  if (!context.isLogged) {
    this.loadPartials({
      navbar: './templates/common/navbar.hbs',
      footer: './templates/common/footer.hbs',
    }).then(function () {
      this.partial('./templates/homePage.hbs');
    });
  } else {
    const endpoint = `cars?query={}&sort={"_kmd.ect":-1}`;

    requester
      .get('appdata', endpoint, 'kinvey')
      .then(function (response) {
        context.cars = response;
        context.cars.forEach((el) => {
          el.isOwner = el.seller === sessionStorage.getItem('username');
        });

        context
          .loadPartials({
            navbar: './templates/common/navbar.hbs',
            footer: './templates/common/footer.hbs',
            car: 'templates/comps/car.hbs',
          })
          .then(function () {
            this.partial('./templates/homePage.hbs');
          });
      })
      .catch(servicer.handleError);
  }
};

handlers.displayRegisterForm = function (context) {
  this.loadPartials({
    navbar: './templates/common/navbar.hbs',
    footer: './templates/common/footer.hbs',
  }).then(function () {
    this.partial('./templates/forms/registerForm.hbs');
  });
};

handlers.registerUser = function (context) {
  const username = context.params.username;
  const password = context.params.password;
  const repeatPassword = context.params.repeatPass;

  const usernameRegex = /[A-Za-z]{3,}/;
  const passwordRegex = /[A-Za-z0-9]{6,}/;
  if (!usernameRegex.test(username)) {
    servicer.showError('Incorrect username!');
  } else if (password !== repeatPassword) {
    servicer.showError('Passwords must match!');
  } else if (!passwordRegex.test(password)) {
    servicer.showError('Incorrect password!');
  } else {
    servicer
      .register(username, password)
      .then(function (response) {
        servicer.saveSession(response);
        servicer.showInfo('User registration successful.');
        context.redirect('#/home');
      })
      .catch(servicer.handleError);
  }
};

handlers.displayLoginForm = function (context) {
  this.loadPartials({
    navbar: './templates/common/navbar.hbs',
    footer: './templates/common/footer.hbs',
  }).then(function () {
    this.partial('./templates/forms/loginForm.hbs');
  });
};

handlers.loginUser = function (context) {
  const username = context.params.username;
  const password = context.params.password;

  let usernameRegex = /[A-Za-z]{3,}/;
  let passwordRegex = /[A-Za-z0-9]{6,}/;
  if (!usernameRegex.test(username)) {
    servicer.showError('Incorrect username!');
  } else if (!passwordRegex.test(password)) {
    servicer.showError('Incorrect password!');
  } else {
    servicer
      .login(username, password)
      .then(function (response) {
        servicer.saveSession(response);
        servicer.showInfo('User login successful.');
        context.redirect('#/home');
      })
      .catch(servicer.handleError);
  }
};

handlers.logoutUser = function (context) {
  servicer
    .logout()
    .then(function (response) {
      sessionStorage.clear();
      servicer.showInfo('Successfuly loggedout!');
      context.redirect('#/home');
    })
    .catch(servicer.handleError);
};

handlers.displayCreateListingPage = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  context
    .loadPartials({
      navbar: './templates/common/navbar.hbs',
      footer: './templates/common/footer.hbs',
    })
    .then(function () {
      this.partial('./templates/createListingPage.hbs');
    });
};

handlers.uploadNewCar = function (context) {
  const title = context.params.title;
  const description = context.params.description;
  const brand = context.params.brand;
  const model = context.params.model;
  const year = context.params.year;
  const imageUrl = context.params.imageUrl;
  const fuel = context.params.fuelType;
  const price = context.params.price;

  let yearRegex = /[1-2][0-9]{3}/;
  if (title.length > 33) {
    servicer.showError('Title must be 33 or less chars!');
  } else if (description.length < 30 || description.length > 450) {
    servicer.showError('Description must be between 30 and 450 chars!');
  } else if (brand.length > 11 || fuel.length > 11 || model.length > 11) {
    servicer.showError('Brand, Fuel type and model must be 11 chars or less!');
  } else if (model.length < 4) {
    servicer.showError('Model must be 4 or more chars!');
  } else if (!yearRegex.test(year)) {
    servicer.showError('Year must be a valid one containing 4 chars!');
  } else if (+price > 1000000) {
    servicer.showError('Price can not be more than 1 million!');
  } else if (!imageUrl.startsWith('http')) {
    servicer.showError('Please enter valid url address!');
  } else if (
    title.length === 0 ||
    brand.length === 0 ||
    fuel.length === 0 ||
    price.length === 0
  ) {
    servicer.showError('Please fill all the fields!');
  } else {
    const seller = sessionStorage.getItem('username');
    let data = {
      seller,
      title,
      description,
      brand,
      model,
      year,
      imageUrl,
      fuel,
      price,
    };
    requester
      .post('appdata', 'cars', 'kinvey', data)
      .then(function (response) {
        servicer.showInfo('Successfully uploaded new car');
        context.redirect('#/home');
      })
      .catch(servicer.handleError);
  }
};

handlers.displayMyListing = function (context) {
  const username = sessionStorage.getItem('username');
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = username;
  let endpoint = `cars?query={"seller":"${username}"}&sort={"_kmd.ect":-1}`;

  requester
    .get('appdata', endpoint, 'kinvey')
    .then(function (response) {
      context.myCars = response;

      context
        .loadPartials({
          navbar: './templates/common/navbar.hbs',
          footer: './templates/common/footer.hbs',
          myCar: './templates/comps/myCar.hbs',
        })
        .then(function () {
          this.partial('./templates/myCarsPage.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.displayCarDetails = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  let id = context.params.carId.substr(1);
  let endpoint = `cars/${id}`;

  requester
    .get('appdata', endpoint, 'kinvey')
    .then(function (response) {
      context.carDetails = response;
      context.isOwner =
        context.carDetails.seller === sessionStorage.getItem('username');

      context
        .loadPartials({
          navbar: './templates/common/navbar.hbs',
          footer: './templates/common/footer.hbs',
        })
        .then(function () {
          this.partial('./templates/listDetails.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.displayEditCarView = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  let carId = context.params.carId.substr(1);

  requester
    .get('appdata', `cars/${carId}`, 'kinvey')
    .then(function (response) {
      context.title = response.title;
      context.description = response.description;
      context.brand = response.brand;
      context.model = response.model;
      context.year = response.year;
      context.imageUrl = response.imageUrl;
      context.fuel = response.fuel;
      context.price = response.price;

      context
        .loadPartials({
          navbar: './templates/common/navbar.hbs',
          footer: './templates/common/footer.hbs',
        })
        .then(function () {
          this.partial('./templates/editCarPage.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.requestEditChange = function (context) {
  let seller = sessionStorage.getItem('username');
  let title = context.params.title;
  let description = context.params.description;
  let brand = context.params.brand;
  let model = context.params.model;
  let year = context.params.year;
  let imageUrl = context.params.imageUrl;
  let fuel = context.params.fuelType;
  let price = context.params.price;

  let data = {
    seller,
    title,
    description,
    brand,
    model,
    year,
    imageUrl,
    fuel,
    price,
  };
  let id = context.params.carId.substr(1);
  let endpoint = `cars/${id}`;
  requester
    .update('appdata', endpoint, 'kinvey', data)
    .then(function (response) {
      servicer.showInfo('Successfuly updated your car!');
      context.redirect('#/home');
    })
    .catch(servicer.handleError);
};

handlers.deleteCar = function (context) {
  let id = context.params.carId.substr(1);
  let endpoint = `cars/${id}`;

  requester
    .remove('appdata', endpoint, 'kinvey')
    .then(function () {
      servicer.showInfo('Successfully remove your car!');
      context.redirect('#/home');
    })
    .catch(servicer.handleError);
};
