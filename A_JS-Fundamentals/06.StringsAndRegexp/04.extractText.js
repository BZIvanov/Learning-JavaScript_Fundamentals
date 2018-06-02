function extractText(str) {
    let startIndex = str.indexOf('(')
    let endIndex = str.indexOf(')', startIndex)

    let result = []
    while(startIndex > 0) {
        if(endIndex < 0) {
            break;
        }
        result.push(str.substring(startIndex + 1, endIndex))
        startIndex = str.indexOf('(', endIndex)
        endIndex = str.indexOf(')', startIndex)
    }
    console.log(result.join(', '))
}

extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)')