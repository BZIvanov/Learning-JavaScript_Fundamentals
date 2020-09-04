const handlers = {};

$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    // before will execute before any route is called, exceptions for routs can be specified in the first parameter
    this.before({ except: {} }, function () {
      this.isLogged = sessionStorage.getItem('authtoken') !== null;
      this.username = sessionStorage.getItem('username');
      this.currentUser = sessionStorage.getItem('userId');
    });

    this.get('/index.html', handlers.displayHomePage);
    this.get('#/home', handlers.displayHomePage);
    this.get('#/register', handlers.displayRegisterPage);
    this.post('#/register', handlers.registerNewUser);
    this.get('#/login', handlers.displayLoginPage);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);

    this.get('#/create', handlers.displayCreateMemePage);
    this.post('#/create', handlers.uploadNewMeme);
    this.get('#/profile/:id', handlers.displayProfilePage);
    this.get('#/meme/:id', handlers.displayMemeDetails);
    this.get('#/edit/:id', handlers.displayEditPage);
    this.post('#/edit/:id', handlers.editMeme);
    this.get('#/delete/:id', handlers.deleteMeme);

    this.get('#/deleteUser/:id', handlers.deleteUser);
  });

  app.run();
});
