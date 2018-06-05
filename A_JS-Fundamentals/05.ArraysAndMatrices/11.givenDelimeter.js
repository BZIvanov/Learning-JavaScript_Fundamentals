function givenDelimeter(arr) {
    let delimeter = arr.pop()
    console.log(arr.join(delimeter))
}

givenDelimeter(["One", "Two", "Three", "Four", "Five", "-"])