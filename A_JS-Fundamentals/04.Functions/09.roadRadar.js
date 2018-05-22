function roadRadar(input) {
    let speed = input[0]
    let area = input[1]

    let getLimit = (zone) => {
        switch(zone) {
            case "residential": return 20; break;
            case "city": return 50; break;
            case "interstate": return 90; break;
            case "motorway": return 130; break;
        }
    }

    let getInfraction = (s, l) => {
        let overspeed = s - l
        if (overspeed <= 0) {
            return false
        }
        else {
            if (overspeed <= 20) {
                return "speeding"
            } else if (overspeed <= 40) {
                return "excessive speeding"
            } else {
                return "reckless driving"
            }
        }
    }

    let infraction = getInfraction(speed, getLimit(area))

    if (infraction) {
        console.log(infraction)
    }
}

roadRadar([21, "residential"])