handlers.displayHomeView = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    if(sessionStorage.getItem('authtoken') !== null) {
        let endpoint = 'pets?query={}&sort={"likes":-1}';
        requester.get('appdata', endpoint, 'kinvey')
            .then(function(response) {
                context.pets = response;
                context.pets = context.pets.filter((el) => {
                    return sessionStorage.getItem('userId') !== el._acl.creator;
                })

                context.pets = context.pets.sort((a, b) => {
                    return +b.likes - +a.likes;
                });
                
                context.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs'
                }).then(function() {
                    this.partial('./templates/homePage.hbs');
                });  
            }).catch(servicer.handleError);
    } else {
        context.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function() {
            this.partial('./templates/homePage.hbs');
        });
    }
}

handlers.displayRegisterPage = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/forms/registerForm.hbs');
    });
}

handlers.registerNewUser = function(context) {
    const username = context.params.username;
    const password = context.params.password;

    if(username.length < 3) {
        servicer.showError('Username must be at least 3 symbols');
    } else if(password.length < 6) {
        servicer.showError('Password must be at least 6 symbols');
    } else {
        servicer.register(username, password)
            .then(function(response) {
                servicer.showInfo('User registration successful.');
                servicer.saveSession(response);
                context.redirect('#/home');
            }).catch(servicer.handleError);
    }
}

handlers.displayLoginPage = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/forms/loginForm.hbs');
    });
}

handlers.loginUser = function(context) {
    const username = context.params.username;
    const password = context.params.password;

    if(username.length < 3) {
        servicer.showError('Username must be at least 3 symbols');
    } else if(password.length < 6) {
        servicer.showError('Password must be at least 6 symbols');
    } else {
        servicer.login(username, password)
            .then(function(response) {
                servicer.showInfo('Login successful.');
                servicer.saveSession(response);
                context.redirect('#/home');
            }).catch(servicer.handleError);
    }
}

handlers.logoutUser = function(context) {
    servicer.logout()
        .then(function(response) {
            servicer.showInfo('Logout successful.');
            sessionStorage.clear();
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.displayCategory = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    let animalType = context.params.type.substr(1);
    let endpoint = '';
    if(animalType !== 'All') {
        endpoint = `pets?query={"category":"${animalType}"}&sort={"likes":-1}`;
    } else {
        endpoint = `pets?query={}&sort={"likes":-1}`;
    }

    requester.get('appdata', endpoint, 'kinvey')
        .then(function(response) {
            context.pets = response;
            context.pets = context.pets.filter((el) => {
                return sessionStorage.getItem('userId') !== el._acl.creator;
            });

            context.pets = context.pets.sort((a, b) => {
                return +b.likes - +a.likes;
            });

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/categoryPage.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.displayAddPetPage = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/addPetPage.hbs');
    });
}

handlers.addNewPet = function(context) {
    let name = context.params.name;
    let description = context.params.description;
    let imageURL = context.params.imageURL;
    let category = context.params.category;
    let likes = 0;

    let data = { name, description, imageURL, category, likes };
    
    requester.post('appdata', 'pets', 'kinvey', data)
        .then(function(response) {
            servicer.showInfo("Pet created.");
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.displayMyPets = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    requester.get('appdata', 'pets', 'kinvey')
        .then(function(response) {
            context.pets = response;
            context.pets = context.pets.filter((el) => {
                return sessionStorage.getItem('userId') === el._acl.creator;
            });
            
            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/myPets.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.displayeditPetPage = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    let id = context.params.id.substr(1);

    requester.get('appdata', `pets/${id}`, 'kinvey')
        .then(function(response) {
            context.name = response.name;
            context.description = response.description;
            context.imageURL = response.imageURL;
            context.category = response.category;
            context.likes = response.likes;
            context.id = id;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/editMyPet.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.editMyPet = function(context) {
    let name = context.params.name;
    let description = context.params.description;
    let imageURL = context.params.imageURL;
    let likes = context.params.likes;
    let category = context.params.category;
    let id = context.params.id.substr(1);
    
    let data = { name, description, imageURL, category, likes };

    requester.update('appdata', `pets/${id}`, 'kinvey', data)
        .then(function(response) {
            servicer.showInfo('Updated successfully!');
            context.redirect('#/home');
        })
}

handlers.displayDeletePage = function(context) {
    let id = context.params.id.substr(1);

    

    requester.get('appdata', `pets/${id}`, 'kinvey')
        .then(function(response) {
            context.name = response.name;
            context.description = response.description;
            context.imageURL = response.imageURL;
            context.category = response.category;
            context.likes = response.likes;
            context.id = id;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/deletionPage.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.deleteMyPet = function(context) {
    let id = context.params.id.substr(1);

    requester.remove('appdata', `pets/${id}`, 'kinvey')
        .then(function(response) {
            servicer.showInfo('Pet removed successfully!');
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.displayOtherDetails = function(context) {
    context.isLogged = sessionStorage.getItem('authtoken') !== null;
    context.myself = sessionStorage.getItem('username');

    let id = context.params.id.substr(1);
    
    requester.get('appdata', `pets/${id}`, 'kinvey')
        .then(function(response) {
            context.name = response.name;
            context.description = response.description;
            context.imageURL = response.imageURL;
            context.category = response.category;
            context.likes = response.likes;
            context.id = id;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function() {
                this.partial('./templates/displayOther.hbs');
            });
        }).catch(servicer.handleError);
}

handlers.increasePetCount = function(context) {
    let id = context.params.id.substr(1);
    
    requester.get('appdata', `pets/${id}`, 'kinvey')
        .then(function(response) {
            let name = response.name;
            let description = response.description;
            let imageURL = response.imageURL;
            let likes = +response.likes + 1;
            let category = response.category;

            let data = { name, description, imageURL, likes, category };

            requester.update('appdata', `pets/${id}`, 'kinvey', data)
                .then(function(response) {
                    context.redirect('#/home')
                }).catch(servicer.handleError);

        }).catch(servicer.handleError);

}

