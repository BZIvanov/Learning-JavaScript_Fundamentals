function addDestination() {
    const city = $(".inputData:eq(0)");
    const country = $(".inputData:eq(1)");
    let season = $("#seasons option:selected").val();
    season = season[0].toUpperCase() + season.substring(1);

    let sum = $("#summer");
    let win = $("#winter");
    let spr = $("#spring");
    let aut = $("#autumn");
    
    if(city.val() !== "" && country.val() !== "") {
        let table = $("#destinations tbody");
        table.append(`<tr><td>${city.val()}, ${country.val()}</td><td>${season}</td></tr>`);
        
        if(season === "Summer") {
            sum.val(+sum.val() + 1);
        } else if(season === "Winter") {
            win.val(+win.val() + 1);
        } else if(season === "Spring") {
            spr.val(+spr.val() + 1);
        } else if(season === "Autumn") {
            aut.val(+aut.val() + 1);
        }
    }

    city.val("");
    country.val("");
}