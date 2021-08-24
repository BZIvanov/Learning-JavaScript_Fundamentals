handlers.displayHomePage = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  context
    .loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      welcome: './templates/common/welcome.hbs',
    })
    .then(function () {
      this.partial('./templates/welcomePage.hbs');
    });
};

handlers.registerNewUser = function (context) {
  let username = context.params.username;
  let password = context.params.password;
  let repeatPassword = context.params.repeatPass;

  let usernameRegex = /[A-Za-z]{3,}/;
  let passwordRegex = /[A-Za-z0-9]{6,}/;
  if (!usernameRegex.test(username)) {
    servicer.showError('Username should contains at least 3 english letters!');
  } else if (password !== repeatPassword) {
    servicer.showError('Both passwords should match');
  } else if (!passwordRegex.test(password)) {
    servicer.showError(
      'Password should contain only letters and digits and at least 6 chars long!'
    );
  } else {
    servicer
      .register(username, password)
      .then(function (response) {
        servicer.saveSession(response);
        servicer.showInfo('User registration successful.');
        context.redirect('#/catalog');
      })
      .catch(servicer.handleError);
  }
};

handlers.loginUser = function (context) {
  let username = context.params.username;
  let password = context.params.password;

  let usernameRegex = /[A-Za-z]{3,}/;
  let passwordRegex = /[A-Za-z0-9]{6,}/;
  if (!usernameRegex.test(username)) {
    servicer.showError('Invalid username!');
  } else if (!passwordRegex.test(password)) {
    servicer.showError('Invalid!');
  } else {
    servicer
      .login(username, password)
      .then(function (response) {
        servicer.saveSession(response);
        servicer.showInfo('Login successful.');
        context.redirect('#/catalog');
      })
      .catch(servicer.handleError);
  }
};

handlers.logoutUser = function (context) {
  servicer.logout().then(function (response) {
    sessionStorage.clear();
    servicer.showInfo('Logout successful.');
    context.redirect('#/home');
  });
};

handlers.displayCatalog = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  specifics
    .getAllPosts()
    .then(function (response) {
      response.forEach((el, i) => {
        el.index = i + 1;
        el.creationTime = specifics.calcTime(el._kmd.ect);
        el.isAuthor = el._acl.creator === sessionStorage.getItem('userId');
      });
      context.posts = response;
      context
        .loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          navigation: './templates/comps/navigation.hbs',
          post: './templates/comps/post.hbs',
        })
        .then(function () {
          this.partial('./templates/catalogPage.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.displayNewPostForm = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  context
    .loadPartials({
      header: './templates/common/header.hbs',
      footer: './templates/common/footer.hbs',
      navigation: './templates/comps/navigation.hbs',
    })
    .then(function () {
      this.partial('./templates/submitPost.hbs');
    });
};

handlers.createPost = function (context) {
  let author = sessionStorage.getItem('username');
  let title = context.params.title;
  let url = context.params.url;
  let imageUrl = context.params.image;
  let description = context.params.comment;

  if (title.length === 0 || url.length === 0) {
    servicer.showError('Title and URL can not be empty string!');
  } else if (!url.startsWith('http')) {
    servicer.showError('Enter valid url please!');
  } else {
    let data = { author, title, url, imageUrl, description };

    specifics
      .uploadPostToDatabase(data)
      .then(function (response) {
        servicer.showInfo('Post created.');
        context.redirect('#/catalog');
      })
      .catch(servicer.handleError);
  }
};

handlers.displayMyPosts = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  specifics
    .getAllMyPosts(sessionStorage.getItem('username'))
    .then(function (response) {
      response.forEach((el, i) => {
        el.index = i + 1;
        el.creationTime = specifics.calcTime(el._kmd.ect);
        el.isAuthor = el._acl.creator === sessionStorage.getItem('userId');
      });
      context.posts = response;

      context
        .loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          navigation: './templates/comps/navigation.hbs',
          post: './templates/comps/post.hbs',
        })
        .then(function () {
          this.partial('./templates/myPosts.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.displayEditPostView = function (context) {
  context.isLogged = sessionStorage.getItem('authtoken') !== null;
  context.username = sessionStorage.getItem('username');

  let id = context.params.id.substr(1);
  const endpoint = `posts/${id}`;

  requester
    .get('appdata', endpoint, 'kinvey')
    .then(function (response) {
      context.url = response.url;
      context.title = response.title;
      context.imageUrl = response.imageUrl;
      context.description = response.description;
      context.id = response._id;

      context
        .loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          navigation: './templates/comps/navigation.hbs',
        })
        .then(function () {
          this.partial('./templates/editPost.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.submitEditPost = function (context) {
  let author = sessionStorage.getItem('username');
  let url = context.params.url;
  let title = context.params.title;
  let imageUrl = context.params.image;
  let description = context.params.description;

  let data = { author, url, title, imageUrl, description };

  let endpoint = `posts/${context.params.id}`;

  requester
    .update('appdata', endpoint, 'kinvey', data)
    .then(function (response) {
      servicer.showInfo('Successfuly updated!');
      context.redirect('#/catalog');
    })
    .catch(servicer.handleError);
};

handlers.displayComments = function (context) {
  let id = context.params.id.substr(1);

  let currentPost = requester.get('appdata', `posts/${id}`, 'kinvey');
  let currentPostComments = requester.get(
    'appdata',
    `comments?query={"postId":"${id}"}&sort={"_kmd.ect":-1}`,
    'kinvey'
  );
  // then is called if all promises are resolved and in the then we get an array with resolved items in the order we provided them in promise.all
  Promise.all([currentPost, currentPostComments])
    .then(function ([post, comments]) {
      context.post = post;
      context.comments = comments;
      context.idPost = post._id;

      context.post.creationTime = specifics.calcTime(post._kmd.ect);
      context.comments.forEach((el, i) => {
        el.creationTime = specifics.calcTime(el._kmd.ect);
        el.isAuthor = sessionStorage.getItem('userId') === el._acl.creator;
      });
      context.id = context.params.id.substr(1);
      context.post.isAuthor =
        sessionStorage.getItem('userId') === post._acl.creator;

      context
        .loadPartials({
          header: './templates/common/header.hbs',
          footer: './templates/common/footer.hbs',
          navigation: './templates/comps/navigation.hbs',
          targetPost: './templates/comps/targetPost.hbs',
          comment: './templates/comps/comment.hbs',
        })
        .then(function () {
          this.partial('./templates/viewPostComments.hbs');
        });
    })
    .catch(servicer.handleError);
};

handlers.deletePost = function (context) {
  let id = context.params.id.substr(1);
  const endpoint = `posts/${id}`;

  requester
    .remove('appdata', endpoint, 'kinvey')
    .then(function () {
      servicer.showInfo('Successfuly deleted!');
      context.redirect('#/catalog');
    })
    .catch(servicer.handleError);
};

handlers.createComment = function (context) {
  let content = context.params.content;
  let author = sessionStorage.getItem('username');
  let postId = context.params.id.substr(1);

  let data = { content, author, postId };
  requester
    .post('appdata', 'comments', 'kinvey', data)
    .then(function (response) {
      servicer.showInfo('Commented successfully');
      context.redirect(`#/comments/:${postId}`);
    })
    .catch(servicer.handleError);
};

handlers.deleteComment = function (context) {
  let commentId = context.params.commentId.substr(1);
  let endpoint = `comments/${commentId}`;

  let postId = context.params.postId;

  requester
    .remove('appdata', endpoint, 'kinvey')
    .then(function (response) {
      servicer.showInfo('Successfuly deleted a comment!');
      context.redirect(`#/comments/${postId}`);
    })
    .catch(servicer.handleError);
};
