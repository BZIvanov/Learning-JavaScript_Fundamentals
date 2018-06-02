function censorship(text, bannedWords) {
    for(let word of bannedWords) {
        let startIndex = text.indexOf(word)
        while(startIndex > 0) {
            let wordLength = word.length
            text = text.replace(word, '-'.repeat(wordLength))
            startIndex = text.indexOf(word, startIndex)
        }
    }
    console.log(text)
}

censorship('roses are red, violets are blue', [', violets are', 'red'])