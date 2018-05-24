function DNAHelix(n) {
    let structure = ['A', 'T', 'C', 'G', 'T', 'T', 'A', 'G', 'G', 'G']
    let duplicate = structure.slice(0)
    let result =""

    for(let i = 1; i <= n; i++) {
        if(i % 4 === 1) {
            result += `**${duplicate[0]}${duplicate[1]}**\n`
            duplicate.splice(0, 2)
            if(duplicate.length === 0 ) {
                duplicate = structure.slice(0)
            }
        } 
        if(i % 4 === 2) {
            result += `*${duplicate[0]}--${duplicate[1]}*\n`
            duplicate.splice(0, 2)
            if(duplicate.length === 0 ) {
                duplicate = structure.slice(0)
            }
        } 
        if(i % 4 === 3) {
            result += `${duplicate[0]}----${duplicate[1]}\n`
            duplicate.splice(0, 2)
            if(duplicate.length === 0 ) {
                duplicate = structure.slice(0)
            }
        }
        if(i % 4 === 0) {
            result += `*${duplicate[0]}--${duplicate[1]}*\n`
            duplicate.splice(0, 2)
            if(duplicate.length === 0 ) {
                duplicate = structure.slice(0)
            }
        }
    }
    console.log(result)
}

DNAHelix(10)