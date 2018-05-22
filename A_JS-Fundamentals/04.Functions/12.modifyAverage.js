function modifyAverage(n) {
    let str = "" + n
    let sum = 0
    
    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i])
    }
    
    while (sum / str.length <= 5) {
        sum = 0
        for (let i = 0; i < str.length; i++) {
            sum += Number(str[i])
        }
        sum += 9
        str += "9"
    }
    console.log(str)
}

modifyAverage(5835)