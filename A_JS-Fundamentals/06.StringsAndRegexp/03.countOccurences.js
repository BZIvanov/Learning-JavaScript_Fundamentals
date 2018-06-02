function occurences(item, text) {
    let count = 0
    let startIndex = text.indexOf(item)
    while(startIndex > 0) {
        count++
        startIndex = text.indexOf(item, startIndex + 1)
    }
    console.log(count)
}

occurences('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.')