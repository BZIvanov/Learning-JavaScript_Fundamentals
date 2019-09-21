function increment(root) {
    let fragment = document.createDocumentFragment();
    let textArea = $('<textarea>').addClass("counter").text(0).attr("disabled", "true");
    let  incrementBtn = $('<button>').addClass("btn").attr("id", "incrementBtn").text("Increment");
    incrementBtn.on('click', function() {
        textArea.val(+textArea.val() + 1);
    });
    let  addBtn = $('<button>').addClass("btn").attr("id", "addBtn").text("Add");
    addBtn.on('click', function() {
        $('<li>').text(textArea.val()).appendTo(list);
    });
    let list = $('<ul>').addClass("results");

    textArea.appendTo(fragment);
    incrementBtn.appendTo(fragment);
    addBtn.appendTo(fragment);
    list.appendTo(fragment);
    $(root).append(fragment);
}
