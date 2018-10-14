function DNAex(arr) {
    let species = {}

    let regex = /([!@#$?a-z]+)=(\d+)--(\d+)<<([a-z]+)/g
    let match = regex.exec(arr)
    while(match) {
        let gene = match[1].replace(/[!@#$?]+/g, '')
        let geneLength = match[2]
        let countOFGenes = match[3]
        let organism = match[4]

        if(gene.length === +geneLength) {
            if(!species.hasOwnProperty(organism)) {
                species[organism] = 0
            }
            species[organism] += +countOFGenes
        }
        match = regex.exec(arr)
    }

    let sortedKeys = Object.keys(species).sort((a, b) => {
        return species[b] - species[a]
    })
    for(let key of sortedKeys) {
        console.log(`${key} has genome size of ${species[key]}`)
    }
}

DNAex(['!@ab?si?di!a@=7--152<<human',
    'b!etu?la@=6--321<<dog',
    '!curtob@acter##ium$=14--230<<dog',
    '!some@thin@g##=9<<human',
    'Stop!'
])