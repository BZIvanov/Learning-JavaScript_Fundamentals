const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
        this.use("Handlebars", "hbs");

        this.get('/index.html', handlers.displayHomePage);
        this.get('#/home', handlers.displayHomePage);

        this.post('#/register', handlers.registerNewUser);
        this.post('#/login', handlers.loginUser);
        this.get('#/logout', handlers.logoutUser);

        this.get('#/catalog', handlers.displayCatalog);
        this.get('#/submitPost', handlers.displayNewPostForm);
        this.post('#/submitPost', handlers.createPost);

        this.get('#/myPosts', handlers.displayMyPosts);

        this.get('#/edit/:id', handlers.displayEditPostView);
        this.post('#/edit/:id', handlers.submitEditPost);
        this.get('#/comments/:id', handlers.displayComments);
        this.get('#/catalog/:id', handlers.deletePost);

        this.post('#/createComment/:id', handlers.createComment);
        this.get('#/deleteComment/:postId/:commentId', handlers.deleteComment);
    });

    app.run();
});