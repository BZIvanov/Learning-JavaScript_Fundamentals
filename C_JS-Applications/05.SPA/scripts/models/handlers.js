handlers.showHome = function(context) {
    context.isNotLoggedIn = sessionStorage.getItem('authtoken') === null;

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/home.hbs');
    });
    
}

handlers.displayLoginPage = function(context) {
    context.isNotLoggedIn = sessionStorage.getItem('authtoken') === null;

    //alert('here')
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/login.hbs')
    });
}

handlers.loginUser = function(context) {
    let username = context.params.username;
    let password = context.params.passwd;

    servicer.login(username, password)
        .then(function(response) {
            servicer.saveSession(response);
            servicer.showInfo('Successfully loggedIn');
            context.redirect('#/home');
        }).catch(servicer.handleError)
}

handlers.displayRegisterPage = function(context) {
    context.isNotLoggedIn = sessionStorage.getItem('authtoken') === null;
    //alert('here')
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function() {
        this.partial('./templates/register.hbs')
    });
}

handlers.registerUser = function(context) {
    let username = context.params.username;
    let password = context.params.passwd;

    servicer.register(username, password)
        .then(function(response) {
            //console.log(response)
            servicer.saveSession(response);
            servicer.showInfo('Successfully registered');
            context.redirect('#/home');
        }).catch(servicer.handleError)
}

handlers.logoutUser = function(context) {
    servicer.logout()
        .then(function(response) {
            servicer.showInfo("Successfuly logged out");
            sessionStorage.clear();
            context.redirect('#/home');
        }).catch(servicer.handleError);
}

handlers.listAllAdvertisements = function(context) {
    specifics.getAvailableAdds()
        .then(function(response) {
            // forEach will check if the author of the post is the same as current user and will set to true the new attached property isAuthor
            response.forEach((el, i) => {
                el['isAuthor'] = el._acl.creator === sessionStorage.getItem('userId');
            })
            context.ads = response;
            
            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                adBox: './templates/anAdd.hbs'
            }).then(function() {
                this.partial('./templates/listAdds.hbs');
            })
        }).catch(servicer.handleError);
}

handlers.createNewAddForm = function(context) {
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function(response) {
        this.partial('./templates/createAdd.hbs');
    })
}

handlers.createAdd = function(context) {
    let title = context.params.title;
    let description = context.params.description;
    let price = context.params.price;
    let imageUrl = context.params.imageUrl;
    let publisher = sessionStorage.getItem('username');

    let data = {
        title, description, price, imageUrl, publisher
    }
    
    specifics.uploadNewAdd(data)
        .then(function(response) {
            servicer.showInfo("Succesfully uploaded addvertisement!");
            context.redirect('#/listAdds');
        }).catch(servicer.handleError);
}

handlers.editAdd = function(context) {
    let productId = context.params.id;
    productId = productId.substr(1);
    //console.log(context);

    specifics.getSelectedProductData(productId)
        .then(function(response) {
            context.title = response.title;
            context.description = response.description;
            context.price = response.price;
            context.imageUrl = response.imageUrl;

            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function(response) {
                this.partial('./templates/editProduct.hbs');
            })
        }).catch(servicer.handleError);
}

handlers.editInDatabase = function(context) {
    let title = context.params.title;
    let description = context.params.description;
    let price = context.params.price;
    let imageUrl = context.params.imageUrl;

    let id = context.params.id.substr(1);
    let data = {
        title,
        description,
        price,
        imageUrl
    }

    specifics.updateProduct(id, data)
        .then(function(response) {
            servicer.showInfo('Updated successfuly');
            context.redirect('#/listAdds');
        }).catch(servicer.handleError);
}
