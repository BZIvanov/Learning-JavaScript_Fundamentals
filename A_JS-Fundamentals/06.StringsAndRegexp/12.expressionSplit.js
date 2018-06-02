function expressionSplit(input) {
    let regex = /[\s,;()\t.]+/;
    let result = input.split(regex);
    result.forEach(element => {
        console.log(element)
    });
}

expressionSplit('let sum = 4 * 4,b = "wow";')