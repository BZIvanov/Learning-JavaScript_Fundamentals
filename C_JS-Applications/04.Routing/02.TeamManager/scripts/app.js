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
        this.get('#/catalog/:id', getTeamDetails);
        this.get('#/join/:id', joinTeam);
        this.get('#/leave', leaveTeam);
        this.get('#/edit/:id', editPage);
        this.post('#/edit/:id', editInfo);
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

    function getTeamDetails(context) {
        let teamId = context.params.id.substr(1);

        teamsService.loadTeamDetails(teamId)
            .then(function(teamInfo) {
                context.loggedIn = sessionStorage.getItem('authtoken') !== null;
                context.username = sessionStorage.getItem('username');
                context.teamId = teamInfo._id;
                context.name = teamInfo.name;
                context.comment = teamInfo.comment;
                context.isOnTeam = sessionStorage.getItem('teamId') === teamInfo._id;
                context.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId');

                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                    teamControls: 'templates/catalog/teamControls.hbs'
                }).then(function() {
                    this.partial('templates/catalog/details.hbs')
                })
            }).catch(auth.handleError);
    }

    function joinTeam(context) {
        let teamId = context.params.id.substr(1);
        let member = sessionStorage.getItem('username');
        console.log(context)

        teamsService.joinTeam(teamId)
            .then(function(userInfo) {
                auth.saveSession(userInfo);
                auth.showInfo(`${member} joined`);
                context.redirect('#/catalog');
            }).catch(auth.handleError);
    }

    function leaveTeam(context) {
        teamsService.leaveTeam()
            .then(function(userInfo) {
                auth.saveSession(userInfo);
                auth.showInfo(`${userInfo.username} left the team`);
                context.redirect('#/catalog');
            }).catch(auth.handleError);
    }

    function editPage(context) {
        let teamId = context.params.id.substr(1);

        teamsService.loadTeamDetails(teamId)
            .then(function(teamInfo) {
                context.teamId = teamId;
                context.name = teamInfo.name;
                context.comment = teamInfo.comment;

                context.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs',
                    editForm: 'templates/edit/editForm.hbs'
                }).then(function() {
                    this.partial('templates/edit/editPage.hbs');
                });
            }).catch(auth.handleError);
    }

    function editInfo(context) {
        console.log(context)
        let teamId = context.params.id.substr(1);
        let teamName = context.params.name;
        let teamComment = context.params.comment;

        teamsService.edit(teamId, teamName, teamComment)
            .then(function() {
                auth.showInfo(`Team ${teamName} edited`);
                context.redirect('#/catalog');
            }).catch(auth.handleError);
    }

    app.run();
});