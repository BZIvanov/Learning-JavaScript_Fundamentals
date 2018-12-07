const handlers = {};

$(() => {
    const app = Sammy('#main', function () {
        this.use("Handlebars", "hbs");

        this.get('/index.html', handlers.someFunctionNameHere);
        this.get('#/home', handlers.someFunctionNameHere);
    });

    app.run();
});