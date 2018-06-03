function findVariables(str) {
    let result = []
    // create non-capturing group with ?: because we dont need _ in the final result
    let re = /\b(?:_([A-Za-z0-9)]+))\b/g
    let validItem = re.exec(str)
    while(validItem) {
        result.push(validItem[1])
        validItem = re.exec(str)
    }
    console.log(result.join(","))
}

findVariables("The _id and _age variables are both integers.")