$(() => {
    const app = Sammy('#main', function () {
        console.log("here")
        this.use("Handlebars", "hbs");

        this.get('/index.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/about', displayAbout);
        this.get('#/login', displayLogin);
        this.get('#/register', displayRegister)
    });

    function displayHome(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.teamId = sessionStorage.getItem('teamId') !== null;
        
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/home/home.hbs')
        }).catch(auth.handleError);
    }

    function displayAbout(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/about/about.hbs')
        }).catch(auth.handleError);
    }

    function displayLogin(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            loginForm: './templates/login/loginForm.hbs'
        }).then(function() {
            this.partial('./templates/login/loginPage.hbs')
        }).catch(auth.handleError);
    }

    function displayRegister(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            registerForm: './templates/register/registerForm.hbs'
        }).then(function() {
            this.partial('./templates/register/registerPage.hbs')
        }).catch(auth.handleError);
    }

    app.run();
});