function addSticker() {
    let titleBox = $('input[maxlength="11"]');
    let contentBox = $('input[maxlength="102"]');
    let stickerListBox = $('#sticker-list');

    if(titleBox.val() !== "" && contentBox.val() !== "") {
        let liElement = $("<li>").addClass("note-content");

        let aElement = $("<a>").addClass("button").text("x").on("click", removeNote);
        aElement.appendTo(liElement);
        let h2Element = $("<h2>").text(titleBox.val());
        h2Element.appendTo(liElement);
        let hrElement = $("<hr>");
        hrElement.appendTo(liElement);
        let pElement = $("<p>").text(contentBox.val());
        pElement.appendTo(liElement);

        liElement.appendTo(stickerListBox);
    }

    function removeNote() {
        $(this).parent().remove();
    }

    titleBox.val("");
    contentBox.val("");
}