let servicer = (() => {
  function saveSession(userInfo) {
    const userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authtoken', userAuth);
    const userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    const username = userInfo.username;
    sessionStorage.setItem('username', username);
  }

  function login(username, password) {
    const userData = {
      username,
      password,
    };

    return requester.post('user', 'login', 'basic', userData);
  }

  function register(username, password) {
    const userData = {
      username,
      password,
    };

    return requester.post('user', '', 'basic', userData);
  }

  function logout() {
    const logoutData = {
      authtoken: sessionStorage.getItem('authtoken'),
    };

    return requester.post('user', '_logout', 'kinvey', logoutData);
  }

  $(document).on({
    ajaxStart: () => $('#loadingBox').show(),
    ajaxStop: () => $('#loadingBox').fadeOut(),
  });

  function showInfo(message) {
    const infoBox = $('#infoBox');
    infoBox.find('span').text(message);
    //infoBox.text(message);
    infoBox.show();
    setTimeout(() => infoBox.fadeOut(), 3000);

    infoBox.on('click', function () {
      $(this).hide();
    });
  }

  function showError(message) {
    const errorBox = $('#errorBox');
    errorBox.find('span').text(message);
    //errorBox.text(message);
    errorBox.show();
    setTimeout(() => errorBox.fadeOut(), 3000);

    errorBox.on('click', function () {
      $(this).hide();
    });
  }

  function handleError(reason) {
    showError(reason.responseJSON.description);
  }

  return {
    login,
    register,
    logout,
    saveSession,
    showInfo,
    showError,
    handleError,
  };
})();
