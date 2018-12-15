const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use("Handlebars", "hbs");

        this.get('/index.html', handlers.displayHomeView);
        this.get('#/home', handlers.displayHomeView);

        this.get('#/registerForm', handlers.displayRegisterForm);
        this.post('#/registerForm', handlers.registerUser);
        this.get('#/loginForm', handlers.displayLoginForm);
        this.post('#/loginForm', handlers.loginUser);
        this.get('#/logout', handlers.logoutUser);

        this.get('#/createListing', handlers.displayCreateListingPage);
        this.post('#/createListing', handlers.uploadNewCar);
        this.get('#/myListing', handlers.displayMyListing);

        this.get('#/details/:carId', handlers.displayCarDetails);
        this.get('#/edit/:carId', handlers.displayEditCarView);
        this.post('#/edit/:carId', handlers.requestEditChange);
        this.get('#/delete/:carId', handlers.deleteCar);
    });

    app.run();
});