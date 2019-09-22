function attachEvents() {
    $("#btnLoadTowns").on("click", getTowns);

    function getTowns() {
        let towns = $("#towns").val().split(", ").reduce((acc, cur) => {
            acc.towns.push({'town': cur});
            return acc;
        }, {'towns': []});

        renderTowns(towns);
    }

    async function renderTowns(towns) {
        const source = await $.get("./02.template.hbs");
        let template = Handlebars.compile(source);
        $("#root").html(template(towns));
        $("#towns").val("");
    }
}
