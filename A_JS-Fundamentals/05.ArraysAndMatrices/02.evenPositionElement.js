function evenPositionElement(arr) {
    let str = ""
    for(let i = 0; i < arr.length; i+=2) {
        str += arr[i] + " "
    }
    console.log(str)
}

evenPositionElement(['20', '30', '40'])