const handlers = {};

$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('/index.html', handlers.displayHomeView);
    this.get('#/home', handlers.displayHomeView);

    this.get('#/register', handlers.displayRegisterPage);
    this.post('#/register', handlers.registerNewUser);
    this.get('#/login', handlers.displayLoginPage);
    this.post('#/login', handlers.loginUser);
    this.get('#/logout', handlers.logoutUser);

    this.get('#/category/:type', handlers.displayCategory);

    this.get('#/addPet', handlers.displayAddPetPage);
    this.post('#/addPet', handlers.addNewPet);

    this.get('#/myPets', handlers.displayMyPets);
    this.get('#/editMyPet/:id', handlers.displayeditPetPage);
    this.post('#/editMyPet/:id', handlers.editMyPet);
    this.get('#/deleteMyPet/:id', handlers.displayDeletePage);
    this.post('#/deletePet/:id', handlers.deleteMyPet);

    this.get('#/detailsOther/:id', handlers.displayOtherDetails);

    this.get('#/pet/:id', handlers.increasePetCount);
    this.get('#/petDet/:id', handlers.increasePetCountDet);
  });

  app.run();
});
