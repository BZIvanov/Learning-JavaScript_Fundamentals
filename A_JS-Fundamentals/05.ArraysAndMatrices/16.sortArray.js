function sortArray(input) {
    input.sort((a, b) => a.length - b.length || a.localeCompare(b))
    
    console.log(input.join('\n'))
}

sortArray(["Isacc", "Theodor", "Jack",  "Harrison", "George"])
sortArray(["test", "Deny", "omen",  "Default"])