function imperialUnits(n) {
    let main = Math.floor(n / 12, 0)
    let subMain = n % 12
    console.log(`${main}'-${subMain}"`)
}

imperialUnits(55)