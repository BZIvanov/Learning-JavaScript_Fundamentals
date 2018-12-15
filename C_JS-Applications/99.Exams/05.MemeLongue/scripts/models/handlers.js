handlers.displayHomePage = function(context) {

    if(context.isLogged) {
        requester.get('appdata', 'memes?query={}&sort={"_kmd.ect":-1}', 'kinvey')
            .then(function(response) {
                context.memes = response;
                context.memes.forEach((el) => {
                    el.isOwner = sessionStorage.getItem('username') === el.creator;
                });
                
                context.loadPartials({
                    navbar: './templates/common/navbar.hbs',
                    footer: './templates/common/footer.hbs'
                }).then(function() {
                    this.partial('./templates/homePage.hbs');
                });
            }).catch(servicer.handleError);

    } else {
        context.loadPartials({
            navbar: './templates/common/navbar.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/homePage.hbs');
        });
    }
}

handlers.displayRegisterPage = function(context) {
    context.loadPartials({
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/forms/registerPage.hbs');
    })
}

handlers.registerNewUser = function(context) {
    const username = context.params.username;
    const password = context.params.password;
    const repeatPassword = context.params.repeatPass;
    const email = context.params.email;
    const avatarUrl = context.params.avatarUrl;

    let usernameRegex = /[A-Za-z]{3,}/;
    let passwordRegex = /[A-Za-z0-9]{6,}/;
    if(!usernameRegex.test(username)) {
        servicer.showError("Username should contain 3 or more latin letters!");
    } else if(!passwordRegex.test(password)) {
        servicer.showError("Password should contain 6 or more latin letters or digits!");
    } else if(password !== repeatPassword) {
        servicer.showError("Both passwords should match!")
    } else {
        let data = { username, password, email, avatarUrl };
        requester.post('user', '', 'basic', data)
            .then(function(response) {
                servicer.saveSession(response);
                servicer.showInfo('User registration successful.');
                context.redirect('#/home');
            }).catch(servicer.handleError);
    }
}

handlers.displayLoginPage = function(context) {
    context.loadPartials({
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/forms/loginPage.hbs');
    });
}

handlers.loginUser = function(context) {
    const username = context.params.username;
    const password = context.params.password;

    let usernameRegex = /[A-Za-z]{3,}/;
    let passwordRegex = /[A-Za-z0-9]{6,}/;
    if(!usernameRegex.test(username)) {
        servicer.showError("Username should contain 3 or more latin letters!");
    } else if(!passwordRegex.test(password)) {
        servicer.showError("Password should contain 6 or more latin letters or digits!");
    } else {
        servicer.login(username, password)
            .then(function(response) {
                servicer.saveSession(response);
                servicer.showInfo('User login successful.');
                context.redirect('#/home');
            }).catch(servicer.handleError);
    }
}

handlers.logoutUser = function(context) {
    servicer.logout()
        .then(function(response) {
            sessionStorage.clear();
            servicer.showInfo("Logout successful");
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.displayCreateMemePage = function(context) {
    context.loadPartials({
        navbar: './templates/common/navbar.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/forms/createMemePage.hbs');
    });
}

handlers.uploadNewMeme = function(context) {
    let title = context.params.title;
    let description = context.params.description;
    let imageUrl = context.params.imageUrl;

    if(title.length === 0 || title.length > 33) {
        servicer.showError('Title should not be empty or more than 33 symbols!');
    } else if(description.length < 30 || description.length > 450) {
        servicer.showError('Description should be between 30 and 450 characters!');
    } else if(!imageUrl.startsWith('http')) {
        servicer.showError('Please enter a valid image URL');
    } else {
        const creator = sessionStorage.getItem('username');
        let data = { creator, title, description, imageUrl }

        requester.post('appdata', 'memes', 'kinvey', data)
            .then(function(response) {
                servicer.showInfo('Successfully create new meme!');
                context.redirect('#/home');
            }).catch(servicer.handleError);
    }
}

handlers.displayProfilePage = function(context) {
    let userId = context.params.id.substr(1);
    
    requester.get('user', userId, 'kinvey')
        .then(function(response) {
            context.memeName = response.username;
            context.memeEmail = response.email;
            context.avatarUrl = response.avatarUrl;
            context.canDelete = response.username === sessionStorage.getItem('username');
            let memeCreator = response.username;
            let endpoint = `memes?query={"creator":"${memeCreator}"}&sort={"_kmd.ect":-1}`;
            requester.get('appdata', endpoint, 'kinvey')
                .then(function(response) {
                    context.ownerMemes = response;
                    context.ownerMemes.forEach((el) => {
                        el.isOwner = sessionStorage.getItem('userId') === el._acl.creator;
                    })
                    
                    context.loadPartials({
                        navbar: './templates/common/navbar.hbs',
                        footer: './templates/common/footer.hbs'
                    }).then(function() {
                        this.partial('./templates/userProfilePage.hbs');
                    });
                }).catch(servicer.handleError);
        }).catch(servicer.handleError);
}

handlers.displayMemeDetails = function(context) {
    let memeId = context.params.id.substr(1);

    requester.get('appdata', `memes/${memeId}`, 'kinvey')
        .then(function(response) {
            context.details = response;
            context.isOwner = context.details.creator === context.username;

            context.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/detailsPage.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.displayEditPage = function(context) {
    let memeId = context.params.id.substr(1);

    requester.get('appdata', `memes/${memeId}`, 'kinvey')
        .then(function(response) {
            context.memeInfo = response;

            context.loadPartials({
                navbar: './templates/common/navbar.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/editPage.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.editMeme = function(context) {
    let memeId = context.params.id.substr(1);

    let creator = sessionStorage.getItem('username');
    let title = context.params.title;
    let description = context.params.description;
    let imageUrl = context.params.imageUrl;

    let endpoint = `memes/${memeId}`;
    let data = { creator, title, description, imageUrl };
    requester.update('appdata', endpoint, 'kinvey', data)
        .then(function(response) {
            servicer.showInfo("Successfully updated meme!");
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.deleteMeme = function(context) {
    let memeId = context.params.id.substr(1);

    requester.remove('appdata', `memes/${memeId}`, 'kinvey')
        .then(function() {
            servicer.showInfo('Successfully deleted meme!');
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.deleteUser = function(context) {
    let userId = context.params.id.substr(1);

    requester.remove('user', userId, 'kinvey')
        .then(function() {
            servicer.showInfo('Successfully deleted user');
            sessionStorage.clear();
            context.redirect('#/home');
        }).catch(servicer.handleError);
}