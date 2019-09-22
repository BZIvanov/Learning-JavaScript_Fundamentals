const handlers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use("Handlebars", "hbs");

        this.get('/index.html', handlers.showHome);
        this.get('#/home', handlers.showHome);
        
        this.get('#/login', handlers.displayLoginPage);
        this.post('#/login', handlers.loginUser);

        this.get('#/register', handlers.displayRegisterPage);
        this.post('#/register', handlers.registerUser);

        this.get('#/logout', handlers.logoutUser);

        this.get('#/listAdds', handlers.listAllAdvertisements);

        this.get('#/createAdd', handlers.createNewAddForm);
        this.post('#/createAdd', handlers.createAdd);

        this.get('#/edit/:id', handlers.editAdd);
        this.post('#/edit/:id', handlers.editInDatabase);
    });

    app.run();
});
