$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        $.get("03.catTemplate.hbs").then((res) => {
            let template = Handlebars.compile(res);
            $("#allCats").html(template({cats}));

            handleButtons();
        });

        function handleButtons() {
            Array.from($("button")).forEach((button) => $(button).on("click", showHideInfo));

            function showHideInfo() {
                if ($(this).text() === "Show status code") {
                    $(this).text("Hide status code");
                    $(this).next().show();
                } else {
                    $(this).text("Show status code");
                    $(this).next().hide();
                }
            }
        }        
    }
});
