function capitalizeWords(str) {
    str = str.split(' ').map(e => e.toLowerCase()).map(e => e[0].toUpperCase() + e.substr(1)).join(' ')
    console.log(str)
}

capitalizeWords("Was that Easy? tRY thIs onE for SiZe!")