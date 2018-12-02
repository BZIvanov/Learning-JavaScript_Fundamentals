let kinveyRequester = (function() {
    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = '';
    const APP_SECRET = '';
    const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)};

    function registerUser(username, password) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function(res) {
            signInUser(res, 'Registration successful.');
        }).catch(handleError);
    }

    function loginUser(username, password) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/login',
            headers: AUTH_HEADERS,
            data: {username, password}
        }).then(function(res) {
            signInUser(res, 'Login successful.');
        }).catch(handleError);
    }

    function logoutUser() {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/_logout',
            headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')}
        });
        sessionStorage.clear();
    }

    function post() {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'appdata/' + APP_KEY + '/YOUR-COLLECTION-NAME-HERE',
            headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function() {
            
        }).catch(handleError);
    }

    function remove(id) {
        $.ajax({
            method: "DELETE",
            url: BASE_URL + 'appdata/' + APP_KEY + '/YOUR-COLLECTION-NAME-HERE/' + id,
            headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function() {
            
        }).catch(handleError);
    }

    function edit(id) {
        $.ajax({
            method: "PUT",
            url: BASE_URL + 'appdata/' + APP_KEY + '/YOUR-COLLECTION-NAME-HERE/' + id,
            headers: {'Authorization': "Kinvey " + sessionStorage.getItem('authToken')},
            data: {}
        }).then(function() {
            
        }).catch(handleError);
    }

    function signInUser(res, message) {
        saveUserSession(res);
    }

    function saveUserSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('userId', userInfo._id);
    }

    function handleError(err) {
        console.log(err.message);
    }

    return { registerUser, loginUser, logoutUser };
})();