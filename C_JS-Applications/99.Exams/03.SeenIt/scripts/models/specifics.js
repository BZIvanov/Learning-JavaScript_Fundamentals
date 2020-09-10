const specifics = (() => {
  function getAllPosts() {
    // the endpoint means whole collection (query={}) and then sort the property ect in column _kmd, value -1 is for descending sort
    const endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';
    return requester.get('appdata', endpoint, 'kinvey');
  }

  function uploadPostToDatabase(data) {
    return requester.post('appdata', 'posts', 'kinvey', data);
  }

  function getAllMyPosts(username) {
    // get specific username from column author in collection posts and sort descending by column _kmd and property ect
    const endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect":-1}`;
    return requester.get('appdata', endpoint, 'kinvey');
  }

  function calcTime(dateIsoFormat) {
    let diff = new Date() - new Date(dateIsoFormat);
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
      if (value !== 1) return 's';
      else return '';
    }
  }

  return {
    getAllPosts,
    uploadPostToDatabase,
    getAllMyPosts,
    calcTime,
  };
})();
