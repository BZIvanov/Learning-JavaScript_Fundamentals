function attachEvents() {
  const kinveyAppId = 'kid_rJprOt_0m';
  const serviceUrl = 'https://baas.kinvey.com/appdata/' + kinveyAppId;
  const kinveyUsername = 'peter';
  const kinveyPassword = 'p';
  const base64auth = btoa(kinveyUsername + ':' + kinveyPassword);
  const authHeaders = { Authorization: 'Basic ' + base64auth };

  $('#btnLoadPosts').on('click', loadPostsClicked);
  $('#btnViewPost').on('click', viewPostClicked);

  function loadPostsClicked() {
    $.ajax({
      method: 'GET',
      url: serviceUrl + '/posts',
      headers: authHeaders,
    })
      .then(displayPostsInDropDown)
      .catch(displayError);
  }

  function displayPostsInDropDown(posts) {
    for (let post of posts) {
      let option = $('<option>');
      option.text(post.title);
      option.val(post._id);
      $('#posts').append(option);
    }
  }

  function viewPostClicked() {
    let selectedPostId = $('#posts').val();
    $.ajax({
      method: 'GET',
      url: serviceUrl + '/posts/' + selectedPostId,
      headers: authHeaders,
    })
      .then(function (post) {
        $('#post-title').text(post.title);
        $('#post-body').text(post.body);
      })
      .catch(displayError);

    $.ajax({
      method: 'GET',
      url: serviceUrl + `/comments/?query={"post_id":"${selectedPostId}"}`,
      headers: authHeaders,
    })
      .then(function (comments) {
        for (let comment of comments) {
          $('<li>').text(comment.text).appendTo($('#post-comments'));
        }
      })
      .catch(displayError);
  }

  function displayError(error) {
    let errDiv = $('<div>').text(
      `Error: ${error.status} (${error.statusText})`
    );
    $(document.body).prepend(errDiv);
    setTimeout(function () {
      errDiv.fadeOut(function () {
        errDiv.remove();
      });
    }, 2000);
  }
}
