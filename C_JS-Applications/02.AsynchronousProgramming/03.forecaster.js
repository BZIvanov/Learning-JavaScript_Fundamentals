function attachEvents() {
    const weatherSymbols = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "&#176;",
    }
    // possible locations "London", "New York", "Barcelona"
    let location = $("#location");
    let submitButton = $("#submit");

    submitButton.on("click", getWeatherCondition);

    function getWeatherCondition() {
        $.ajax({
            method: "GET",
            url: `https://judgetests.firebaseio.com/locations.json`
        })
        .then(function(codes) {
            $("#forecast").css("display", "block");
            let code = undefined;
            
            for (let loc of codes) {
                if (loc.name === location.val()) {
                    code = loc.code;
                    break;
                }
            }

            // then is called if all promises are resolved and in the then we get an array with resolved items in the order we provided them in promise.all
            Promise.all([
                $.ajax({
                    method: "GET",
                    url: `https://judgetests.firebaseio.com/forecast/today/${code}.json`
                }),
                $.ajax({
                    method: "GET",
                    url: `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`
                })
            ]).then(handleForecast)
            .catch(handleError);

        })
        .catch(handleError)

        function handleForecast([today, upcoming]) {
            const todayDiv = $("#current");

            const htmlSymbol = `<span class="condition symbol">${weatherSymbols[today.forecast.condition]}</span>`;
            const htmlContent = `<span class="condition">
            <span class="forecast-data">${today.name}</span>
            <span class="forecast-data">${today.forecast.low}&#176; / ${today.forecast.high}&#176;</span>
            <span class="forecast-data">${today.forecast.condition}</span>
            </span>`;

            todayDiv.empty();
            todayDiv.append(`<div class="label">Current conditions</div>`);
            todayDiv.append(htmlSymbol);
            todayDiv.append(htmlContent);


            const upcomingDiv = $("#upcoming");
            upcomingDiv.empty();
            upcomingDiv.append(`<div class="label">Three-day forecast</div>`);
            for(let i = 0; i < 3; i++) {
                const upcomingHtml = `<span class="upcoming">
                <span class="forecast-data">${weatherSymbols[upcoming.forecast[i].condition]}</span>
                <span class="forecast-data">${upcoming.forecast[i].low}&#176; / ${upcoming.forecast[i].high}&#176;</span>
                <span class="forecast-data">${upcoming.forecast[i].condition}</span>
                </span>`;
    
                upcomingDiv.append(upcomingHtml);
            }
        }

        function handleError() {
            $("#forecast").text("Error");
            $("#forecast").show();
        }
    }
}