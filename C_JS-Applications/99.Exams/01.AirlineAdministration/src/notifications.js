$( document ).on('ajaxStart', function() {
    $("#loadingBox").show()
});
$( document ).on('ajaxStop', function() {
    $("#loadingBox").hide()
});

function showInfo(message) {
    $("#infoBox > span").text(message)
    $("#infoBox").show()
    setTimeout(function () {
        $("#infoBox").hide()
    }, 3000)
}

function attachBoxesEvents() {
    $('#errorBox').on('click', function () {
        $(this).hide()
    })
    $('#infoBox').on('click', function () {
        $(this).hide()
    })
}

function showError(message) {
    $("#errorBox > span").text(message)
    $("#errorBox").show()
    setTimeout(function () {
        $("#errorBox").hide()
    }, 3000)
}