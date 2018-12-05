$(() => {
    const app = Sammy('#main', function () {
        this.use("Handlebars", "hbs");

        this.get('/index.html', displayHome);
        this.get('#/home', displayHome);
        this.get('#/about', displayAbout);
        this.get('#/login', displayLogin);
        this.get('#/register', displayRegister);

        this.post('#/register', registerRequest);
        this.post('#/login', loginRequest);
        this.get('#/logout', logoutUser);

        this.get('#/catalog', displayCatalog);
        this.get('#/create', createForm);
        this.post('#/create', createTeam);
    });

    function displayHome(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/home/home.hbs')
        });
    }

    function displayAbout(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/about/about.hbs')
        });
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
        });
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
        });
    }

    function registerRequest(context) {
        let username = context.params.username;
        let password = context.params.password;
        let repeatPassword = context.params.repeatPassword;
        if(password !== repeatPassword) {
            auth.showError("The given passwords do not match.")
        } else {
            auth.register(username, password)
            .then(function(res) {
                auth.saveSession(res);
                auth.showInfo("Successfully registered!");
                context.redirect('#/home');
            })
            .catch(auth.handleError)
        }
    }

    function loginRequest(context) {
        let username = context.params.username;
        let password = context.params.password;
        
        auth.login(username, password)
        .then(function(res) {
            auth.saveSession(res);
            auth.showInfo("Successfully logged In!");
            context.redirect('#/home');
        })
        .catch(auth.handleError);
    }

    function logoutUser(context) {
        auth.logout()
        .then(function() {
            sessionStorage.clear();
            auth.showInfo("Successfuly loged out!");
            context.redirect('#/home');
        })
        .catch(auth.handleError);
    }

    function displayCatalog(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');
        context.hasNoTeam = sessionStorage.getItem('teamId') === null || sessionStorage.getItem('teamId') === "undefined";

        teamsService.loadTeams()
            .then(function(teams) {
                context.teams = teams;
                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                    team: 'templates/catalog/team.hbs'
                }).then(function () {
                    this.partial('templates/catalog/teamCatalog.hbs')
                })
            }).catch(auth.handleError)
    }

    function createForm(context) {
        context.loggedIn = sessionStorage.getItem('authtoken') !== null;
        context.username = sessionStorage.getItem('username');

        this.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs',
            createForm: 'templates/create/createForm.hbs'
        }).then(function() {
            this.partial('templates/create/createPage.hbs');
        })
    }

    function createTeam(context) {
        let teamName = context.params.name;
        let teamComment = context.params.comment;

        teamsService.createTeam(teamName, teamComment)
            .then(function(teamInfo) {
                // here we will add teamId column to the user data in DB
                teamsService.joinTeam(teamInfo._id)
                .then(function(userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo("Successfuly created team!");
                    context.redirect('#/catalog');
                })
            }).catch(auth.handleError);
    }

    app.run();
});