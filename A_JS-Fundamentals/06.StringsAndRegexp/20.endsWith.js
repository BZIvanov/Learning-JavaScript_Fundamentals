function checkEndsWith(str, s) {
    let len = s.length * -1

    if(str.substr(len) === s) {
        return true
    } else {
        return false
    }
}

console.log(checkEndsWith("This sentence ends with fun?", "fun?"))