function championsip(arr) {
    let pilots = {}
    for(let row of arr) {
        let [team, pilot, points] = row.split(' -> ');
        if(!pilots.hasOwnProperty(team)) {
            pilots[team] = { "___totalPoints___": 0 };
        }
        if(!pilots[team].hasOwnProperty(pilot)) {
            pilots[team][pilot] = 0;
        }
        pilots[team][pilot] += +points;
        pilots[team]["___totalPoints___"] += +points;
    }

    let sortedKeys = Object.keys(pilots).sort((a, b) => {
        return pilots[b]["___totalPoints___"] - pilots[a]["___totalPoints___"];
    }).slice(0,3)
    for(let key of sortedKeys) {
        console.log(`${key}: ${pilots[key]["___totalPoints___"]}`)
        let sortedInnerKeys = Object.keys(pilots[key]).filter((x) => x !== "___totalPoints___").sort((a, b) => {
            return pilots[key][b] - pilots[key][a]
        })
        for(let innerKey of sortedInnerKeys) {
            console.log(`-- ${innerKey} -> ${pilots[key][innerKey]}`)
        }
    }
}

championsip(["Ferrari -> Kimi Raikonnen -> 25",
    "Ferrari -> Sebastian Vettel -> 18",
    "Mercedes -> Lewis Hamilton -> 10",
    "Mercedes -> Valteri Bottas -> 8",
    "Red Bull -> Max Verstapen -> 6",
    "Red Bull -> Daniel Ricciardo -> 4",
    "Blue Bull -> Mikky Ricciardo -> 10",
])