function concatenateReversed(arr) {
    let result = Array.from(arr.join("")).reverse().join("")
    console.log(result)
}

concatenateReversed(['I', 'am', 'student'])