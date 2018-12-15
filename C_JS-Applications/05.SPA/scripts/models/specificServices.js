let specifics = (() => {
    function getAvailableAdds() {
        return requester.get('appdata', 'advertisements', 'kinvey');
    }
    
    function uploadNewAdd(data) {
        return requester.post('appdata', 'advertisements', 'kinvey', data);
    }

    function getSelectedProductData(productId) {
        return requester.get('appdata', 'advertisements/' + productId, 'kinvey');
    }

    function updateProduct(id, data) {
        return requester.update('appdata', 'advertisements/' + id, 'kinvey', data)
    }

    return {
        getAvailableAdds,
        uploadNewAdd,
        getSelectedProductData,
        updateProduct
    }
})();
