function travelTime(arr) {
    let offers = {};

    for (let row of arr) {
        let [country, town, price] = row.split(' > ');
        town = town[0].toUpperCase() + town.substring(1);
        price = +price;
        
        if(!offers.hasOwnProperty(country)) {
            offers[country] = {};
        }
        if(!offers[country].hasOwnProperty(town)) {
            offers[country][town] = Number.POSITIVE_INFINITY;
        }

        if(offers[country][town] > price) {
            offers[country][town] = price
        }
    }

    let sortedKeys = Object.keys(offers).sort()
    for(let key of sortedKeys) {
        let nestedKeys = Object.keys(offers[key]).sort((a, b) => {
            return offers[key][a] - offers[key][b]
        })

        let printRow = key + ' -> ';
        for(let nestKey of nestedKeys) {
            printRow += nestKey + ' -> ' + offers[key][nestKey] + ' ';
        }
        console.log(printRow.trim())
    }
}

travelTime(["Bulgaria > Sofia > 500",
"Bulgaria > Sopot > 800",
"France > Paris > 2000",
"Albania > Tirana > 1000",
"Bulgaria > Sofia > 200",
"Bulgaria > Vraca > 100"])