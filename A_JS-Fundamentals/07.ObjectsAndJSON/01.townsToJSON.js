function townsToJSON(arr) {
    let result = []
    let headers = arr.shift().split('|').filter(x => x !== '').map(x => x.trim())
    for(let row of arr) {
        row = row.split('|').filter(x => x !== '').map(x => x.trim())
        let data = {}
        data[headers[0]] = row[0]
        data[headers[1]] = Number(row[1])
        data[headers[2]] = Number(row[2])
        result.push(data)
    }
    console.log(JSON.stringify(result))
}

townsToJSON(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |'])