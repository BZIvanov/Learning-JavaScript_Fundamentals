function startApp() {
  sessionStorage.clear();
  showHideMenuLinks();
  showView('viewHome');

  $('#linkHome').on('click', showHomeView);
  $('#linkLogin').on('click', showLoginView);
  $('#linkRegister').on('click', showRegisterView);
  $('#linkListBooks').on('click', listBooks);
  $('#linkCreateBook').on('click', showCreateBookView);
  $('#linkLogout').on('click', logoutUser);

  $('form').on('submit', function (event) {
    event.preventDefault();
  });

  $('#formLogin').on('submit', loginUser);

  $('#buttonLoginUser').on('click', loginUser);
  $("input[value='Register']").on('click', registerUser);
  $("input[value='Create']").on('click', createBook);
  $('input[value="Edit"]').on('click', editBook);

  $('#infoBox,#errorBox').on('click', function () {
    $(this).fadeOut();
  });

  $(document).on({
    ajaxStart: function () {
      $('input').prop('disabled', true);
      $('#loadingBox').show();
    },
    ajaxStop: function () {
      $('#loadingBox').hide();
      $('input').prop('disabled', false);
    },
  });

  function showHideMenuLinks() {
    $('#linkHome').show();

    if (sessionStorage.getItem('authToken')) {
      //We have logged user
      $('#linkLogin').hide();
      $('#linkRegister').hide();
      $('#linkListBooks').show();
      $('#linkCreateBook').show();
      $('#linkLogout').show();
    } else {
      //Not logged in
      $('#linkLogin').show();
      $('#linkRegister').show();
      $('#linkListBooks').hide();
      $('#linkCreateBook').hide();
      $('#linkLogout').hide();
    }
  }

  function showView(viewName) {
    // Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
  }

  function showHomeView() {
    showView('viewHome');
  }

  function showLoginView() {
    showView('viewLogin');
    $('#formLogin').trigger('reset');
  }

  function showRegisterView() {
    showView('viewRegister');
    $('#formRegister').trigger('reset');
  }

  function showCreateBookView() {
    $('#formCreateBook').trigger('reset');
    showView('viewCreateBook');
  }

  const kinveyBaseUrl = 'https://baas.kinvey.com/';
  const kinveyAppKey = 'kid_Sk4zoCJ14';
  const kinveyAppSecret = 'a263cecdd528431bae790ac66cb32eed';
  const kinveyAppAuthHeaders = {
    Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret),
  };

  function loginUser() {
    let userData = {
      username: $("#formLogin input[name='username']").val(),
      password: $("#formLogin input[name='passwd']").val(),
    };

    $.ajax({
      method: 'POST',
      url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/login',
      headers: kinveyAppAuthHeaders,
      data: userData,
      success: loginSuccess,
      error: handleAjaxError,
    });

    function loginSuccess(userInfo) {
      saveAuthInSession(userInfo);
      showHideMenuLinks();
      listBooks();
      showInfo('Login successful.');
    }
  }

  function logoutUser() {
    let userAuth = sessionStorage.getItem('authToken');
    const logoutHeader = { Authorization: `Kinvey ${userAuth}` };
    $.ajax({
      method: 'POST',
      url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/_logout',
      headers: logoutHeader,
      error: handleAjaxError,
    });

    sessionStorage.clear();
    $('#loggedInUser').text('');
    showHideMenuLinks();
    showView('viewHome');
    showInfo('Logout successful.');
  }

  function registerUser() {
    let userData = {
      username: $("#formRegister input[name='username']").val(),
      password: $("#formRegister input[name='passwd']").val(),
    };

    $.ajax({
      method: 'POST',
      url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/',
      headers: kinveyAppAuthHeaders,
      data: userData,
      success: registerSuccess,
      error: handleAjaxError,
    });

    function registerSuccess(userInfo) {
      saveAuthInSession(userInfo);
      showHideMenuLinks();
      listBooks();
      showInfo('User registration successful');
    }
  }

  function saveAuthInSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    $('#loggedInUser').text('Welcome, ' + username + '!');
  }

  function listBooks() {
    showView('viewBooks');
    $('#books').empty();

    $.ajax({
      method: 'GET',
      url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books',
      headers: getKinveyUserAuthHearders(),
      success: loadBooksSuccess,
      error: handleAjaxError,
    });

    function loadBooksSuccess(books) {
      showInfo('Books loaded.');
      if (books.length === 0) {
        $('#books').text('No books in the library.');
      } else {
        let bookTable = $('<table>').append(
          $('<tr>').append(
            $(
              '<th>Title</th><th>Author</th><th>Description</th><th>Action</th>'
            )
          )
        );

        for (let book of books) {
          appendBookRow(book, bookTable);
          $('#books').append(bookTable);
        }

        function appendBookRow(book, bookTable) {
          let links = [];
          if (book._acl.creator === sessionStorage['userId']) {
            // functions are actually objects and these kind of objects have a special method called bind with which we can set the this
            let delLink = $('<a href="#">[Delete]</a>').on(
              'click',
              deleteBook.bind(this, book)
            );
            let editLink = $('<a href="#">[Edit]</a>').on(
              'click',
              loadBookForEdit.bind(this, book)
            );
            links = [delLink, ' ', editLink];
          }
          bookTable.append(
            $('<tr>')
              .append($('<td>').text(book.title))
              .append($('<td>').text(book.author))
              .append($('<td>').text(book.description))
              .append($('<td>').append(links))
          );
        }
      }
    }
  }

  function getKinveyUserAuthHearders() {
    return {
      Authorization: `Kinvey ${sessionStorage.getItem('authToken')}`,
    };
  }

  function createBook() {
    let bookData = {
      title: $("#formCreateBook input[name='title']").val(),
      author: $("#formCreateBook input[name='author']").val(),
      description: $('#formCreateBook textarea').val(),
    };

    $.ajax({
      method: 'POST',
      url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books',
      headers: getKinveyUserAuthHearders(),
      data: bookData,
      success: createBookSuccess,
      error: handleAjaxError,
    });

    function createBookSuccess(book) {
      listBooks();
      showInfo(`${book.title} created`);
    }
  }

  function deleteBook(book) {
    $.ajax({
      method: 'DELETE',
      url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books/' + book._id,
      headers: getKinveyUserAuthHearders(),
      success: deleteBookSuccess,
      error: handleAjaxError,
    });

    function deleteBookSuccess(respond) {
      listBooks();
      showInfo(`${book.title} deleted.`);
    }
  }

  function loadBookForEdit(book) {
    $.ajax({
      method: 'GET',
      url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/books/' + book._id,
      headers: getKinveyUserAuthHearders(),
      success: loadBookForEditSuccess,
      error: handleAjaxError,
    });

    function loadBookForEditSuccess(book) {
      $('#formEditBook input[name=id]').val(book._id);
      $('#formEditBook input[name=title]').val(book.title);
      $('#formEditBook input[name=author]').val(book.author);
      $('#formEditBook textarea[name=descr]').val(book.description);
      showView('viewEditBook');
    }
  }

  function handleAjaxError(err) {
    let errMsg = JSON.stringify(err);
    if (err.readyState === 0) {
      errMsg = 'Cannot connect due to network error.';
    }
    if (err.responseJSON && err.responseJSON.description) {
      errMsg = err.responseJSON.description;
    }
    showError(errMsg);
  }

  function showInfo(msg) {
    $('#infoBox').text(msg);
    $('#infoBox').show();
    setTimeout(function () {
      $('#infoBox').fadeOut();
    }, 3000);
  }

  function showError(msg) {
    $('#errorBox').text('Error: ' + msg);
    $('#errorBox').show();
  }

  function editBook() {
    let bookData = {
      title: $('#formEditBook input[name=title]').val(),
      author: $('#formEditBook input[name=author]').val(),
      description: $('#formEditBook textarea[name=descr]').val(),
    };
    $.ajax({
      method: 'PUT',
      url:
        kinveyBaseUrl +
        'appdata/' +
        kinveyAppKey +
        '/books/' +
        $('#formEditBook input[name=id]').val(),
      headers: getKinveyUserAuthHearders(),
      data: bookData,
      success: editBookSuccess,
      error: handleAjaxError,
    });

    function editBookSuccess(response) {
      listBooks();
      showInfo(`${response.title} edited.`);
    }
  }
}
