let specifics = (() => {

    function example(username) {
        // get specific username from column author in collection posts and sort descending by column _kmd and property ect
        const endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect":-1}`
        return requester.get('appdata', endpoint, 'kinvey');
    }

    return {
        example
    }
})();