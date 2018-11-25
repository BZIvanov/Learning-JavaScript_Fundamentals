function attachEvents() {
    const baseUrl='https://messenger-ae83c.firebaseio.com/';
    $('#submit').on('click', submitNewMessage);
    $('#refresh').on('click', loadMessages);

    function submitNewMessage() {
        let nameInputField = $('#author');
        let messageInputField = $('#content');

        if (nameInputField.val() !=='' && messageInputField.val() !== ''){
            let author = nameInputField.val();
            let content = messageInputField.val();
            let timestamp = Date.now();
            messageInputField.val('');
            $.ajax({
                method: 'POST',
                url: baseUrl + '.json',
                data: JSON.stringify({author, content, timestamp})
            })
            .then(loadMessages)
            .catch(errorOnLoad)
        }
    }

    function loadMessages() {
        $.ajax({
            method: "GET",
            url: baseUrl + '.json'
        })
        .then(displayMessages)
        .catch(errorOnLoad)
    }

    function displayMessages(messages) {
        $('#messages').empty();
        let orderedMsg = Object.keys(messages).sort((a, b) => messages[a].timestamp  -messages[b].timestamp);
        for (let msg of orderedMsg) {
            let author = messages[msg].author;
            let message = messages[msg].content;
            let textMessage = `${author}: ${message}\n`;
            $('#messages').append(textMessage);
        }
    }

    function errorOnLoad(err) {
        $('#messages').val(err);
    }
}