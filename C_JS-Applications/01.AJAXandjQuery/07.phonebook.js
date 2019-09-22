function attachEvents() {
    const baseUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';
    $('#btnLoad').on('click', loadPhonebook);
    $('#btnCreate').on('click', createContact);

    function createContact() {
        let person = $('#person').val();
        let phone = $('#phone').val();
        if (person !== '' && phone !== '') {
            $.ajax({
                method: "POST",
                url: baseUrl + '.json',
                data: JSON.stringify({ person, phone })
            })
            .then(loadPhonebook)
            .catch(displayError);
        }
    }

    function loadPhonebook() {    
        $('#person').val('');
        $('#phone').val('');
        $.ajax({
            method: "GET",
            url: baseUrl + ".json"
        })
        .then(retrivePhonebook)
        .catch(displayError);
    }

    function retrivePhonebook(contacts) {
        $('#phonebook').empty();
        for (let key in contacts) {
            let person = contacts[key]['person'];
            let number = contacts[key]['phone'];
            let li = $(`<li>`).text(`${person}: ${number} `);
            let delBtn = $(`<button>[Delete]</button>`);
            delBtn.on('click', function () {
                $.ajax({
                    method: 'DELETE',
                    url: baseUrl + '/' + key + '.json'
                })
                .then(loadPhonebook)
                .catch(displayError);
            });
            li.append(delBtn);
            $('#phonebook').append(li);
        }
    }

    function displayError(err) {
        $('#phonebook').append($('<li>').text("Error"));
    }
}
