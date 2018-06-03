function wordOccurrences(text, item) {
    let re = new RegExp(`\\b${item}\\b`, "gi")
    let result = text.match(re)
    if(result) {
        console.log(result.length)
    } else {
        console.log(0)
    }
}

wordOccurrences("How do you plan on achieving that? How? How can you even think of that?", "how")
wordOccurrences("There was one. Therefore I bought it. I wouldn't buy it otherwise.", "there")
wordOccurrences("The was one. efore I bought it. I wouldn't buy it otherwise.", "there")